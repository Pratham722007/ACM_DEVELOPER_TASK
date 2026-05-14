"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  children: React.ReactNode;
}

export default function Loader({ children }: LoaderProps) {
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Lock scroll immediately on mount
    document.body.style.overflow = "hidden";

    // Sequence timing
    const t1 = setTimeout(() => setPhase(1), 100);  // "FOR THE CURIOUS"
    const t2 = setTimeout(() => setPhase(2), 1600); // "HACK. CREATE. COMPETE."
    const t3 = setTimeout(() => setPhase(3), 3200); // "MORE THAN A CLUB — A COLLECTIVE"
    const t4 = setTimeout(() => setPhase(4), 4800); // "ENTER THE COLLECTIVE"
    const t5 = setTimeout(() => setPhase(5), 6400); // Fade out text
    const t6 = setTimeout(() => setPhase(6), 6800); // Open doors & reveal site
    const t7 = setTimeout(() => {
      setIsLoaderActive(false);
      document.body.style.overflow = ""; // Unlock scroll
    }, 8500); // Sequence complete

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      document.body.style.overflow = "";
    };
  }, []);

  // Premium easing curves
  const easeLux = [0.22, 1, 0.36, 1] as const;
  const easeInOut = [0.65, 0, 0.35, 1] as const;

  return (
    <>
      <AnimatePresence>
        {isLoaderActive && (
          <motion.div
            key="loader-container"
            className="fixed inset-0 z-[100] flex pointer-events-none"
          >
            {/* Left Door - Matte Black */}
            <motion.div
              initial={{ x: 0 }}
              animate={phase >= 6 ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: 1.8, ease: easeLux }}
              className="relative w-1/2 h-full bg-[#111111] shadow-[10px_0_50px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
            >
               {/* Noise Overlay */}
               <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url('/noise.png')", backgroundSize: "100px" }} />
            </motion.div>

            {/* Right Door - Cream */}
            <motion.div
              initial={{ x: 0 }}
              animate={phase >= 6 ? { x: "100%" } : { x: 0 }}
              transition={{ duration: 1.8, ease: easeLux }}
              className="relative w-1/2 h-full bg-[#f5f0e8] shadow-[-10px_0_50px_rgba(0,0,0,0.1)] z-10 overflow-hidden"
            >
               {/* Noise Overlay */}
               <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: "url('/noise.png')", backgroundSize: "100px" }} />
            </motion.div>

            {/* Central Typography & Light Glow */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              
              {/* Center Glow right before opening */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  phase === 5 ? { opacity: 1, scale: 1 } : 
                  phase >= 6 ? { opacity: 0, scale: 2, filter: "blur(20px)" } : 
                  { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 1.2, ease: easeInOut }}
                className="absolute w-[2px] h-screen bg-[#A3E635] shadow-[0_0_80px_20px_#A3E635]"
              />

              <div className="relative flex flex-col items-center justify-center text-[#111111] w-full h-full">
                <AnimatePresence mode="wait">
                  
                  {/* Phase 1: Small elegant typography */}
                  {phase === 1 && (
                    <motion.div
                      key="text-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.8, ease: easeLux }}
                      className="absolute text-xs md:text-sm font-black uppercase tracking-[0.4em] text-[#A3E635] drop-shadow-[0_0_10px_rgba(163,230,53,0.3)]"
                    >
                      FOR THE CURIOUS.
                    </motion.div>
                  )}

                  {/* Phase 2: Kinetic Text but calmer */}
                  {phase === 2 && (
                    <motion.div
                      key="text-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, ease: easeLux }}
                      className="absolute text-4xl md:text-7xl font-black italic tracking-tighter leading-none text-[#A3E635] drop-shadow-[0_0_15px_rgba(163,230,53,0.4)]"
                    >
                      HACK. CREATE. COMPETE.
                    </motion.div>
                  )}

                  {/* Phase 3: Brand statement */}
                  {phase === 3 && (
                    <motion.div
                      key="text-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, ease: easeLux }}
                      className="absolute text-2xl md:text-4xl font-black uppercase tracking-tight text-[#111111] bg-[#f5f0e8] px-8 py-4 rounded-sm shadow-xl"
                    >
                      MORE THAN A CLUB — A COLLECTIVE
                    </motion.div>
                  )}

                  {/* Phase 4: Massive editorial text */}
                  {phase === 4 && (
                    <motion.div
                      key="text-4"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 1.2, ease: easeLux }}
                      className="absolute flex flex-col items-center w-full px-4"
                    >
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-[#8B5CF6] mb-8"
                      >
                        ACM SVNIT — EST. 2011
                      </motion.div>

                      <motion.h1 
                        initial={{ letterSpacing: "-0.02em" }}
                        animate={{ letterSpacing: "0.05em" }}
                        transition={{ duration: 2, ease: easeLux }}
                        className="text-6xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none text-center text-[#A3E635] drop-shadow-[0_0_40px_rgba(163,230,53,0.4)]"
                      >
                        ENTER THE<br/>COLLECTIVE
                      </motion.h1>

                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#A3E635] mt-12 flex items-center gap-6 bg-[#111111] px-10 py-4 rounded-full shadow-[0_0_40px_rgba(163,230,53,0.15)]"
                      >
                        <span>WORKSHOPS</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
                        <span>HACKATHONS</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
                        <span>EVENTS</span>
                      </motion.div>
                    </motion.div>
                  )}
                  
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Content Wrapper */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0, filter: "blur(10px)" }}
        animate={
          phase >= 6 
            ? { scale: 1, opacity: 1, filter: "blur(0px)" } 
            : { scale: 1.05, opacity: 0, filter: "blur(10px)" }
        }
        transition={{ duration: 1.4, ease: easeLux }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
