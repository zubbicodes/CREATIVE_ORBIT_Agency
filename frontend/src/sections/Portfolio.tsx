import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../utils/cn';

gsap.registerPlugin(ScrollTrigger);

export function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          const sorted = data.sort((a: any, b: any) => {
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setProjects(sorted.slice(0, 5)); // Show top 5
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
        // CRITICAL: Refresh ScrollTrigger so pinning heights are recalculated
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (loading || projects.length === 0) return;

    const ctx = gsap.context(() => {
      const horizontal = horizontalRef.current;
      if (!horizontal) return;
      
      gsap.to(horizontal, {
        x: () => -(horizontal.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${horizontal.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading, projects]);

  return (
    <section ref={containerRef} id="portfolio" className="bg-primary relative overflow-hidden">
      <div className="min-h-screen flex flex-col justify-center py-20">
        {/* Section Header - Absolute at top */}
        <div className="container mx-auto px-6 absolute top-16 md:top-24 left-0 right-0 z-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan mb-3 md:mb-4 block"
          >
            Selected Creations
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-7xl font-display font-bold leading-tight text-white"
          >
            Featured <span className="text-gradient">Portfolio</span>
          </motion.h2>
        </div>

        {/* Horizontal Content */}
        <div ref={horizontalRef} className="flex flex-row flex-nowrap w-max h-full items-center pl-6 md:pl-[10vw] pr-[20vw] gap-10 md:gap-24 pt-32 md:pt-48">
          {loading ? (
            <div className="w-screen flex items-center justify-center text-white/20 italic">Loading masterpieces...</div>
          ) : projects.length === 0 ? (
            <div className="w-screen flex items-center justify-center text-white/20 italic">No featured projects yet.</div>
          ) : (
            projects.map((project, i) => (
              <div 
                key={project._id || i}
                className="w-[85vw] md:w-[70vw] lg:w-[60vw] flex-shrink-0"
              >
                <div className="group relative glass-card rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-white/5 flex flex-col lg:flex-row h-full">
                  {/* Image Container */}
                  <div className="w-full lg:w-1/2 aspect-video lg:aspect-square relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-white/5 pointer-events-none" />
                  </div>

                  {/* Info Container */}
                  <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-6 md:space-y-10">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-px bg-accent-cyan/50" />
                      <span className="text-accent-cyan font-bold uppercase tracking-[0.4em] text-[10px]">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-display font-bold leading-tight text-white group-hover:text-accent-cyan transition-colors">
                      {project.name}
                    </h3>
                    
                    <p className="text-white/40 text-sm md:text-lg leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {(project.tags || []).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link to={`/project/${project._id}`} className="inline-block">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-4 group/btn"
                      >
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-accent-cyan group-hover/btn:bg-accent-cyan transition-all duration-500">
                          <ArrowRight size={20} className="text-white group-hover/btn:text-primary group-hover/btn:-rotate-45 transition-all" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 group-hover/btn:text-white transition-colors">
                          View Case Study
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* View More Card at the end */}
          {!loading && projects.length > 0 && (
            <div className="w-[40vw] md:w-[30vw] flex-shrink-0 flex items-center justify-center">
              <Link to="/projects">
                <motion.div
                  whileHover="hover"
                  className="group relative inline-flex items-center justify-center p-1 rounded-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-accent-cyan/10 group-hover:bg-accent-cyan/30 transition-all duration-500" />
                  <div className="relative px-12 py-12 md:px-16 md:py-16 bg-primary border border-white/5 rounded-full flex flex-col items-center gap-4 transition-all group-hover:bg-primary/90">
                    <ArrowUpRight size={48} className="text-accent-cyan" />
                    <span className="text-xl md:text-2xl font-display font-bold uppercase tracking-widest text-white text-center max-w-[150px]">
                      View All Projects
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


