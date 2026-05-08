import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trash2, Clock, Star, Search, Filter, ExternalLink, Copy } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { cn } from '../utils/cn';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials', {
        headers: { 'x-auth-token': localStorage.getItem('adminToken') || '' }
      });
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('adminToken') || ''
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setTestimonials(testimonials.map(t => t._id === id ? { ...t, status } : t));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': localStorage.getItem('adminToken') || '' }
      });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t._id !== id));
      }
    } catch (err) {
      console.error('Error deleting testimonial:', err);
    }
  };

  const copyFeedbackLink = () => {
    const link = `${window.location.origin}/feedback`;
    navigator.clipboard.writeText(link);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const filtered = testimonials.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.text.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout title="Testimonials">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Testimonials Management</h1>
          <p className="text-white/40">Review and approve client feedback for the live site.</p>
        </div>
        <button 
          onClick={copyFeedbackLink}
          className="flex items-center gap-3 px-6 py-3 bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan rounded-xl hover:bg-accent-cyan/20 transition-all"
        >
          {copySuccess ? <CheckCircle2 size={18} /> : <Copy size={18} />}
          {copySuccess ? 'Link Copied!' : 'Copy Client Feedback Link'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="Search feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-accent-cyan/50 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-3 rounded-xl border text-sm font-bold transition-all",
                filter === f 
                  ? "bg-accent-cyan border-accent-cyan text-primary" 
                  : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((t) => (
            <motion.div
              key={t._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 rounded-2xl border-white/5 flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <img src={t.image} alt="" className="w-12 h-12 rounded-full border border-white/10" />
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-white/40">{t.jobtitle} {t.company && `@ ${t.company}`}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                  t.status === 'Approved' ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                  t.status === 'Rejected' ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                  "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                )}>
                  {t.status}
                </div>
              </div>

              <div className="relative">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < t.rating ? "fill-accent-cyan text-accent-cyan" : "text-white/10"} />
                  ))}
                </div>
                <p className="text-white/70 italic text-sm leading-relaxed">"{t.text}"</p>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-white/20 font-mono">
                  Submitted: {new Date(t.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  {t.status !== 'Approved' && (
                    <button 
                      onClick={() => updateStatus(t._id, 'Approved')}
                      className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all"
                      title="Approve"
                    >
                      <CheckCircle2 size={18} />
                    </button>
                  )}
                  {t.status !== 'Rejected' && (
                    <button 
                      onClick={() => updateStatus(t._id, 'Rejected')}
                      className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                      title="Reject"
                    >
                      <XCircle size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteTestimonial(t._id)}
                    className="p-2 bg-white/5 text-white/40 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!loading && filtered.length === 0 && (
        <div className="py-20 text-center text-white/20 italic">
          No testimonials found matching your criteria.
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
