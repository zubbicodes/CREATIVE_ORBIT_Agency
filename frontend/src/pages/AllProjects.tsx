import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProjectCard } from '../components/ProjectCard';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';

export function AllProjects({ settings }: { settings: any }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error('API returned non-array data:', data);
          setProjects([]);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();

    return () => {
      // Clean up lenis if needed
    };
  }, []);

  const filteredProjects = projects
    .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    .filter(p => {
      const matchesFilter = filter === 'All' || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  return (
    <main className="min-h-screen bg-primary">
      <Navigation settings={settings} />
      
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-accent-cyan text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 hover:gap-4 transition-all">
              <ArrowLeft size={12} className="sm:w-[14px] sm:h-[14px]" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-display font-bold">
              Project <span className="text-gradient">Archive</span>
            </h1>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <input 
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-9 sm:pl-12 pr-4 sm:pr-6 text-white placeholder:text-white/20 focus:border-accent-cyan/50 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 md:mb-12">
          {categories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border transition-all ${
                filter === cat 
                ? "bg-white/10 border-white/20 text-white" 
                : "bg-transparent border-white/5 text-white/40 hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-[2.5rem] bg-white/5 animate-pulse" />
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-white/40 text-lg italic">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer settings={settings} />
    </main>
  );
}
