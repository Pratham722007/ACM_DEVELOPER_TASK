"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight, Asterisk } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#f5f0e8]">
      
      {/* Background Texture */}
      <div className="hero-grid-bg absolute inset-0 pointer-events-none" />
      
      {/* Ambient Decorative Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-40 -left-20 w-96 h-96 bg-[#A3E635]/10 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-40 -right-20 w-96 h-96 bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 lg:px-16 flex flex-col items-start">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111111] text-[#A3E635]">
            <Asterisk size={14} className="animate-spin-slow" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]">
            EST. 2013 • SVNIT CHAPTER
          </span>
        </motion.div>

        {/* Main Heading - Editorial Style */}
        <div className="relative mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#111111] tracking-tighter leading-[0.8] mb-4"
          >
            Where <br/> Curiosity <br/> Meets <span className="italic font-serif font-normal pr-4">Code.</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-0 right-0 hidden lg:block"
          >
             <div className="w-40 h-40 rounded-full border border-[#111111]/10 flex flex-col items-center justify-center rotate-12">
                <span className="text-3xl font-black text-[#111111]">850+</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#111111]/40">Collective</span>
             </div>
          </motion.div>
        </div>

        {/* Bottom Content Row */}
        <div className="flex flex-col lg:flex-row items-end justify-between w-full gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md"
          >
            <p className="text-lg md:text-xl font-medium text-[#111111]/60 leading-relaxed mb-8">
              A premium collective of developers, designers, and tech enthusiasts pushing the boundaries of computing at SVNIT.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/events"
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#111111] text-white text-xs font-black uppercase tracking-widest hover:bg-[#A3E635] hover:text-[#111111] transition-all duration-300"
              >
                Explore Events
                <ArrowDownRight size={18} className="transition-transform group-hover:rotate-45" />
              </Link>
              <Link 
                href="/team"
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-[#111111]/10 text-[#111111] text-xs font-black uppercase tracking-widest hover:bg-[#111111]/5 transition-all duration-300"
              >
                Meet The Team
              </Link>
            </div>
          </motion.div>

          {/* Scrolling Down Hint */}
          <motion.div 
            style={{ opacity }}
            className="hidden md:flex flex-col items-center gap-4"
          >
            <span className="[writing-mode:vertical-rl] text-[9px] font-black uppercase tracking-[0.4em] text-[#111111]/40">
              Scroll To Explore
            </span>
            <div className="w-px h-24 bg-gradient-to-b from-[#111111]/40 to-transparent" />
          </motion.div>

        </div>

      </div>

      {/* Decorative Large Background Text */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden h-40">
        <h2 className="text-[15rem] font-black text-[#111111] opacity-[0.02] tracking-tighter italic leading-none whitespace-nowrap">
          ACM SVNIT COLLECTIVE 2025
        </h2>
      </div>

    </section>
  );
}
