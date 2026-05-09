import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Rocket, Lightbulb, Code2, ShieldCheck, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Strategic Discovery",
    desc: "We dive deep into your brand DNA, market positioning, and core objectives to architect a roadmap for success.",
    icon: <Lightbulb />,
    color: "from-yellow-400/20 to-orange-500/20",
    iconColor: "text-orange-400",
    border: "border-orange-500/20"
  },
  {
    title: "Technical Blueprint",
    desc: "Our engineers and designers collaborate to create a robust structural foundation and high-fidelity prototypes.",
    icon: <Rocket />,
    color: "from-accent-cyan/20 to-blue-500/20",
    iconColor: "text-accent-cyan",
    border: "border-accent-cyan/20"
  },
  {
    title: "Precision Build",
    desc: "Agile development cycles where your vision transforms into a high-performance digital reality with clean, scalable code.",
    icon: <Code2 />,
    color: "from-accent-purple/20 to-pink-500/20",
    iconColor: "text-accent-purple",
    border: "border-accent-purple/20"
  },
  {
    title: "Quality Assurance",
    desc: "Rigorous stress-testing and refinement to ensure your ecosystem is flawless, secure, and ready for peak performance.",
    icon: <ShieldCheck />,
    color: "from-green-400/20 to-emerald-600/20",
    iconColor: "text-green-400",
    border: "border-green-500/20"
  },
  {
    title: "Global Launch",
    desc: "Seamless deployment followed by continuous optimization and support to ensure your brand remains at the digital frontier.",
    icon: <CheckCircle2 />,
    color: "from-blue-400/20 to-accent-cyan/20",
    iconColor: "text-blue-400",
    border: "border-accent-cyan/20"
  }
];

export function Process() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = container.scrollWidth;
    const viewWidth = window.innerWidth;
    const xDistance = -(totalWidth - viewWidth);

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: xDistance,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="bg-primary overflow-hidden">
      <div className="h-[100dvh] flex flex-col relative">
        {/* Header Content */}
        <div className="pt-20 md:pt-40 px-6 md:px-20 z-20 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2 md:space-y-4 text-left"
          >
            <div className="flex items-center justify-start gap-4">
              <span className="h-px w-8 md:w-12 bg-accent-cyan" />
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] text-accent-cyan">
                Strategic Framework
              </span>
            </div>
            <h2 className="text-3xl md:text-6xl lg:text-8xl font-display font-bold leading-none tracking-tighter">
              The <span className="text-gradient">Orbit</span> Process
            </h2>
          </motion.div>
        </div>

        {/* Horizontal Container for all screen sizes */}
        <div 
          ref={containerRef} 
          className="flex flex-row h-full items-center pl-6 md:pl-20 pr-[20vw] md:pr-[30vw] gap-4 md:gap-10 mt-[-5vh]"
        >
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-[65vw] md:w-[30vw] lg:w-[22vw] h-[35vh] md:h-[45vh] flex-shrink-0"
            >
              <div className={`relative h-full glass-card p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border ${step.border} overflow-hidden group hover:bg-white/[0.03] transition-colors duration-500 flex flex-col justify-between`}>
                {/* Large Background Step Number */}
                <span className="absolute top-0 right-0 text-[5rem] md:text-[10rem] font-display font-black text-white/[0.02] leading-none select-none pointer-events-none transition-all duration-700 group-hover:text-white/[0.05] group-hover:-translate-y-4">
                  {i + 1}
                </span>

                <div className="relative z-10 space-y-2.5 md:space-y-4">
                  <div className={`w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${step.color} border ${step.border} flex items-center justify-center ${step.iconColor} group-hover:scale-110 transition-transform duration-700 shadow-2xl`}>
                    {React.cloneElement(step.icon as React.ReactElement<{ size?: number }>, { size: window.innerWidth < 768 ? 16 : 24 })}
                  </div>
                  
                  <div className="space-y-1 md:space-y-3">
                    <h3 className="text-base md:text-2xl font-display font-bold group-hover:text-accent-cyan transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[9px] md:text-sm text-white/40 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>


                
                {/* Bottom decorative bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple w-0 group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Progress Line (Bottom) */}
        <div className="absolute bottom-10 md:bottom-20 left-6 md:left-20 right-6 md:right-20 h-[1px] bg-white/5 z-20">
          <motion.div 
            className="h-full bg-accent-cyan w-0"
            style={{ 
              width: "100%", 
              transformOrigin: "left",
              scaleX: 0
            }}
          />
        </div>
      </div>
    </section>
  );
}
