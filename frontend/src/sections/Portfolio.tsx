import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion';
import { ExternalLink, ArrowRight, ArrowUpRight, CheckCircle2, Star, Zap, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../utils/cn';

gsap.registerPlugin(ScrollTrigger);

function ProjectRow({ project, index }: { project: any; index: number }) {
  const isEven = index % 2 === 0;
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 1], [0.9, 1, 1.05]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={containerRef} className="py-20 lg:py-32 xl:py-48 relative border-b border-white/5 last:border-0">
      <div className={cn(
        "container mx-auto px-4 sm:px-6 flex flex-col gap-8 md:gap-12 lg:gap-20 xl:gap-32 items-center",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}>
        {/* Project Info */}
        <div className="flex-1 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-accent-cyan/50" />
              <span className="text-accent-cyan font-bold uppercase tracking-[0.4em] text-[10px]">
                {project.category}
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-bold leading-[0.9] tracking-tighter text-white">
              {(project.name || project.title).split(' ').map((word: string, i: number) => (
                <span key={i} className="inline-block overflow-hidden mr-3">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h3>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-white/40 text-base md:text-lg leading-relaxed max-w-xl font-medium"
          >
            {project.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {(project.results || []).map((res: string, i: number) => (
                <div key={res} className="flex items-start gap-4 group">
                  <div className="mt-1 w-2 h-2 rounded-full bg-accent-cyan group-hover:scale-150 transition-transform shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
                  <span className="text-sm md:text-base font-bold text-white/70 uppercase tracking-widest">{res}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link to={`/project/${project._id}`}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-cyan group-hover:bg-accent-cyan transition-all duration-500">
                  <ArrowRight size={24} className="text-white group-hover:text-primary group-hover:-rotate-45 transition-all" />
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">
                  View Case Study
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Project Image */}
        <motion.div 
          style={{ scale, opacity }}
          className="flex-1 relative w-full"
        >
          <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden border border-white/5 aspect-[4/3] md:aspect-[3/4] lg:aspect-[5/6] shadow-2xl">
            <motion.img 
              style={{ y: imageY }}
              src={project.image} 
              alt={project.name || project.title}
              className="absolute inset-0 w-full h-[120%] object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-white/5 pointer-events-none" />
          </div>

          {/* Floating Stats */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={cn(
              "absolute hidden md:flex flex-col gap-2 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 z-20",
              isEven ? "-right-6 md:-right-10 top-16 md:top-20" : "-left-6 md:-left-10 top-16 md:top-20"
            )}
          >
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-accent-cyan">Technology Stack</span>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {(project.tags || []).map((tag: string) => (
                <span key={tag} className="text-[10px] md:text-xs font-bold text-white/80">{tag}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ScrollableProjectShowcase({ projects }: { projects: any[] }) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;
      
      // Set up snap scrolling for individual project sections
      const sections = sectionsRef.current.filter(Boolean);
      
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            setCurrentProjectIndex(index);
          },
          onEnterBack: () => {
            setCurrentProjectIndex(index);
          },
          onLeave: () => {
            if (index < sections.length - 1) {
              setCurrentProjectIndex(index + 1);
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              setCurrentProjectIndex(index - 1);
            }
          }
        });
      });
    }, containerRef);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current || 
            sectionsRef.current.includes(trigger.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, [projects.length]);

  const currentProject = projects[currentProjectIndex];
  const progress = ((currentProjectIndex + 1) / projects.length) * 100;

  if (!currentProject) return null;

  return (
    <div ref={containerRef} className="bg-primary relative overflow-hidden">
      {/* Individual Project Sections */}
      {projects.map((project, index) => (
        <div 
          key={project._id || project.title}
          ref={el => { if (el) sectionsRef.current[index] = el; }}
          className="h-screen w-screen flex items-center justify-center relative bg-primary"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/5 blur-[150px] -z-10" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-purple/5 blur-[150px] -z-10" />

          {/* Progress Indicator */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                {index + 1} / {projects.length}
              </span>
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-accent-cyan rounded-full"
                  animate={{ width: `${((index + 1) / projects.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Project Info */}
              <div className="flex-1 text-center lg:text-left space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <span className="w-8 h-px bg-accent-cyan/50" />
                    <span className="text-accent-cyan font-bold uppercase tracking-[0.4em] text-[10px]">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[0.9] tracking-tighter text-white">
                    {project.name || project.title}
                  </h3>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 }}
                  className="text-white/40 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
                >
                  {project.description}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {(project.results || []).slice(0, 4).map((res: string) => (
                      <div key={res} className="flex items-start gap-4 group">
                        <div className="mt-1 w-2 h-2 rounded-full bg-accent-cyan group-hover:scale-150 transition-transform shadow-[0_0_15px_rgba(0,242,255,0.5)]" />
                        <span className="text-sm md:text-base font-bold text-white/70 uppercase tracking-widest">{res}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.8 }}
                >
                  <Link to={`/project/${project._id}`}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-6 group"
                    >
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-cyan group-hover:bg-accent-cyan transition-all duration-500">
                        <ArrowRight size={24} className="text-white group-hover:text-primary group-hover:-rotate-45 transition-all" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">
                        View Case Study
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Project Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4 }}
                className="flex-1 relative w-full"
              >
                <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden border border-white/5 aspect-[4/3] md:aspect-[3/4] lg:aspect-[5/6] shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.name || project.title}
                    className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-white/5 pointer-events-none" />
                </div>

                {/* Technology Tags */}
                {(project.tags && project.tags.length > 0) && (
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.6 }}
                    className="absolute -right-6 md:-right-10 top-16 md:top-20 hidden sm:flex flex-col gap-2 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 z-20"
                  >
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-accent-cyan">Technology</span>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {project.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[10px] md:text-xs font-bold text-white/80">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator - Only shows on non-last projects */}
          {index < projects.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-sm flex items-center gap-2"
            >
              <span>Scroll to next project</span>
              <div className="w-4 h-4 border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white/40 rounded-full" />
              </div>
            </motion.div>
          )}
        </div>
      ))}

      {/* View All Projects Button - Shows after last project */}
      <div className="h-screen w-screen flex items-center justify-center relative bg-primary">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/5 blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-purple/5 blur-[150px] -z-10" />
        
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
              Ready to see <span className="text-gradient">more?</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Explore our complete portfolio of projects and discover how we've helped businesses like yours achieve their goals.
            </p>
            <Link to="/projects">
              <motion.div
                whileHover="hover"
                className="group relative inline-flex items-center justify-center p-1 rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent-cyan/10 group-hover:bg-accent-cyan/30 transition-all duration-500" />
                <div className="relative px-8 sm:px-12 py-4 sm:py-6 bg-primary rounded-full flex items-center gap-3 sm:gap-4 transition-all group-hover:bg-primary/90">
                  <span className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase tracking-widest text-white">
                    View All Projects
                  </span>
                  <motion.div
                    variants={{
                      hover: { x: 5, y: -5 }
                    }}
                  >
                    <ArrowUpRight size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-cyan" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [useScrollableMode, setUseScrollableMode] = useState(true);

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
          const featuredProjects = sorted.slice(0, 4);
          setProjects(featuredProjects);
          setUseScrollableMode(featuredProjects.length >= 2);
        } else {
          console.error('API returned non-array data:', data);
          setProjects([]);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className="bg-primary relative overflow-hidden pt-32 min-h-screen flex items-center justify-center">
        <div className="text-white/20 text-lg">Loading featured projects...</div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="portfolio" className="bg-primary relative overflow-hidden pt-32">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 mb-16 md:mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan mb-4 block"
          >
            Selected Creations
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight text-white"
          >
            Featured <span className="text-gradient">Portfolio</span>
          </motion.h2>
        </div>
        <div className="container mx-auto px-4 sm:px-6 py-20 text-center">
          <p className="text-white/40 text-lg italic">No featured projects yet.</p>
        </div>
      </section>
    );
  }

  // Use scrollable showcase mode for 2+ projects, fallback to grid for 1 project
  if (useScrollableMode && projects.length >= 2) {
    return (
      <section id="portfolio" className="bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-32 pb-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan mb-4 block"
          >
            Selected Creations
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight text-white"
          >
            Featured <span className="text-gradient">Portfolio</span>
          </motion.h2>
        </div>
        <ScrollableProjectShowcase projects={projects} />
      </section>
    );
  }

  // Fallback to original grid layout
  return (
    <section id="portfolio" className="bg-primary relative overflow-hidden pt-32">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/5 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-purple/5 blur-[150px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 mb-16 md:mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan mb-4 block"
        >
          Selected Creations
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight text-white"
        >
          Featured <span className="text-gradient">Portfolio</span>
        </motion.h2>
      </div>

      <div className="relative">
        {projects.map((project, i) => (
          <ProjectRow key={project._id || project.title} project={project} index={i} />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20 flex justify-center">
        <Link to="/projects">
          <motion.div
            whileHover="hover"
            className="group relative inline-flex items-center justify-center p-1 rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent-cyan/10 group-hover:bg-accent-cyan/30 transition-all duration-500" />
            <div className="relative px-8 sm:px-12 py-4 sm:py-6 bg-primary rounded-full flex items-center gap-3 sm:gap-4 transition-all group-hover:bg-primary/90">
              <span className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase tracking-widest text-white">
                View All Projects
              </span>
              <motion.div
                variants={{
                  hover: { x: 5, y: -5 }
                }}
              >
                <ArrowUpRight size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-cyan" />
              </motion.div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}

