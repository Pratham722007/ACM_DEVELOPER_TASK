"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Asterisk } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Smooth parallax effects
  const yParallax = useTransform(scrollY, [0, 800], [0, 150]);
  const yParallaxReverse = useTransform(scrollY, [0, 800], [0, -100]);
  const smoothY = useSpring(yParallax, { stiffness: 100, damping: 30 });
  const smoothYReverse = useSpring(yParallaxReverse, { stiffness: 100, damping: 30 });
  
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-4 overflow-hidden bg-transparent"
    >

      <div className="relative z-10 w-full max-w-[90rem] px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Editorial Typography & Branding */}
          <div className="flex flex-col items-start">
            
            {/* Branding / Badge Area */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-6 mb-16"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-[#A3E635] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                <Image 
                  src="/assets/acm-logo.png" 
                  alt="ACM Logo" 
                  width={60} 
                  height={60} 
                  className="relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#111111]">
                  Association for Computing Machinery
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#111111]/40">
                  Student Chapter · SVNIT Surat
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <div className="mb-10">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3.5rem,8vw,8.5rem)] font-black text-[#111111] tracking-tighter leading-[0.85] mb-6"
              >
                Where <br/> Innovation <br/> Meets <span className="italic font-serif font-normal text-[#111111]/90">Code.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="max-w-lg text-lg md:text-xl font-medium text-[#111111]/60 leading-relaxed"
              >
                A premium collective of developers, designers, and tech enthusiasts pushing the boundaries of computing at SVNIT.
              </motion.p>
            </div>

            {/* CTAs & Micro Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-8 w-full"
            >
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/events"
                  className="group relative flex items-center gap-3 px-10 py-5 rounded-full bg-[#111111] text-white text-xs font-black uppercase tracking-[0.2em] overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-[#A3E635] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                  <span className="relative z-10 group-hover:text-[#111111] transition-colors">Explore Events</span>
                  <ArrowUpRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#111111]" />
                </Link>
                
                <Link 
                  href="/team"
                  className="group flex items-center gap-3 px-10 py-5 rounded-full border border-[#111111]/10 text-[#111111] text-xs font-black uppercase tracking-[0.2em] hover:bg-[#111111] hover:text-white transition-all duration-300"
                >
                  Meet The Collective
                </Link>
              </div>

              {/* Establishment Micro Detail */}
              <div className="hidden xl:flex items-center gap-4 py-4 px-6 border-l border-[#111111]/10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]">EST. 2011</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#111111]/40">SVNIT CHAPTER</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Side: Cinematic Image Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full lg:w-[115%] lg:-ml-[15%] aspect-[4/3] lg:aspect-[16/10] group"
          >
            {/* Main Image Frame */}
            <div className="relative w-full h-full rounded-[32px] md:rounded-[48px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-[#111111]">
              <motion.div 
                style={{ y: smoothYReverse }}
                className="relative w-full h-full"
              >
                <Image 
                  src="/assets/acm_core.png" 
                  alt="ACM Collective" 
                  fill
                  className="object-cover opacity-95 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  priority
                />
                {/* Subtle vignette/gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div 
              style={{ y: smoothY }}
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#A3E635] flex items-center justify-center p-6 shadow-2xl z-20 rotate-12"
            >
              <div className="w-full h-full rounded-full border border-[#111111]/10 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-[#111111]">850+</span>
                <span className="text-[8px] font-black uppercase tracking-[0.1em] text-[#111111]/40 leading-none mt-1">Builders</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-12 -left-12 p-8 rounded-[32px] bg-white shadow-2xl z-20 max-w-[240px] hidden md:block"
            >
               <div className="flex items-center gap-3 mb-3">
                  <Asterisk size={16} className="text-[#A3E635] animate-spin-slow" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#111111]">The Collective</span>
               </div>
               <p className="text-xs font-medium text-[#111111]/60 leading-relaxed">
                 A community of thinkers and makers dedicated to the pursuit of technical excellence.
               </p>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="[writing-mode:vertical-rl] text-[10px] font-black uppercase tracking-[0.4em] text-[#111111]/40">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#111111]/40 to-transparent" />
      </motion.div>

    </section>
  );
}
