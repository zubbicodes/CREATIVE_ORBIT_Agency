import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle2, User, Briefcase, Building, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function FeedbackSubmission() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    jobtitle: '',
    company: '',
    text: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rating }),
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navigation settings={{}} />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan mb-4 block">Client Feedback</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Share Your <span className="text-gradient">Experience</span></h1>
            <p className="text-white/40 text-lg">Your insights help us refine our orbit and continue delivering excellence.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 rounded-[2.5rem] border-white/10 text-center space-y-8"
              >
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 mx-auto">
                  <CheckCircle2 className="w-12 h-12 text-green-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-display font-bold text-white">Thank You, {formData.name.split(' ')[0]}!</h2>
                  <p className="text-white/40 text-lg leading-relaxed">
                    Your testimonial has been received and is being reviewed by our team. 
                    Once approved, it will be added to our digital journal.
                  </p>
                </div>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-accent-cyan transition-colors"
                >
                  Return to Home
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8"
              >
                {/* Rating Selection */}
                <div className="flex flex-col items-center gap-4 mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/30">Overall Satisfaction</span>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="transition-all hover:scale-125 active:scale-95"
                      >
                        <Star 
                          size={40} 
                          className={star <= (hoverRating || rating) ? "fill-accent-cyan text-accent-cyan shadow-[0_0_20px_rgba(0,242,255,0.3)]" : "text-white/10"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4 flex items-center gap-2">
                      <User size={12} /> Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Jane Cooper"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-cyan/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4 flex items-center gap-2">
                      <Briefcase size={12} /> Job Title
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.jobtitle}
                      onChange={(e) => setFormData({...formData, jobtitle: e.target.value})}
                      placeholder="Marketing Director"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-cyan/50 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4 flex items-center gap-2">
                      <Building size={12} /> Company Name
                    </label>
                    <input 
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="TechCorp Inc."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-cyan/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4 flex items-center gap-2">
                      <ImageIcon size={12} /> Profile Image URL
                    </label>
                    <input 
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-cyan/50 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4 flex items-center gap-2">
                    <MessageSquare size={12} /> Your Testimonial
                  </label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    placeholder="Tell us about your project success..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-cyan/50 outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-accent-cyan text-primary font-bold rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(0,242,255,0.2)]"
                >
                  {loading ? 'Submitting...' : (
                    <>
                      Submit Feedback <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <Footer settings={{}} />
    </div>
  );
}
