import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Rocket, Lightbulb, Code2, ShieldCheck, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Conceptualize",
    desc: "We dive deep into your vision, target audience, and business goals to draft a bulletproof strategy.",
    icon: <Lightbulb className="w-12 h-12" />,
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Design & UX",
    desc: "Crafting intuitive, premium interfaces that resonate with users and define your brand's digital presence.",
    icon: <Rocket className="w-12 h-12" />,
    color: "from-accent-cyan to-blue-500"
  },
  {
    title: "Engineering",
    desc: "Writing clean, scalable code using cutting-edge technologies to bring your product to life.",
    icon: <Code2 className="w-12 h-12" />,
    color: "from-accent-purple to-pink-500"
  },
  {
    title: "Optimization",
    desc: "Rigorous testing and performance tuning to ensure your software is lightning-fast and secure.",
    icon: <ShieldCheck className="w-12 h-12" />,
    color: "from-green-400 to-emerald-600"
  },
  {
    title: "Launch",
    desc: "Deploying your solution with full-scale support and an iterative growth strategy.",
    icon: <CheckCircle2 className="w-12 h-12" />,
    color: "from-blue-400 to-accent-cyan"
  }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.process-step');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => `+=${horizontalRef.current?.offsetWidth}`,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-primary overflow-hidden">
      <div className="h-screen flex items-center justify-start">
        <div className="container mx-auto px-6 mb-20 absolute top-16 left-0 right-0 z-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-accent-cyan mb-4 block text-center lg:text-left"
          >
            How We Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold leading-tight text-center lg:text-left"
          >
            The <span className="text-gradient">Process</span>
          </motion.h2>
        </div>

        <div ref={horizontalRef} className="flex h-full items-center pt-32 pl-[10vw]">
          {steps.map((step, i) => (
            <div 
              key={i}
              className="process-step w-[80vw] lg:w-[45vw] flex-shrink-0 px-8"
            >
              <div className="glass-card p-12 lg:p-16 rounded-[3rem] relative group border-white/5 overflow-hidden">
                {/* Background Number */}
                <span className="absolute -bottom-10 -right-5 text-[15rem] font-display font-black text-white/[0.03] pointer-events-none group-hover:text-accent-cyan/5 transition-colors duration-700">
                  0{i + 1}
                </span>

                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-primary mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {step.icon}
                </div>

                <h3 className="text-3xl lg:text-5xl font-display font-bold mb-6 group-hover:text-accent-cyan transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-lg lg:text-xl text-white/40 leading-relaxed max-w-md">
                  {step.desc}
                </p>

                <div className="mt-10 flex items-center gap-4">
                  <div className="h-px w-12 bg-accent-cyan/30" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-accent-cyan">Step {i + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
