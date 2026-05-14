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
    document.body.style.overflow = "hidden";

    // Cinematic pacing — longer holds, intentional breathing room
    const t0 = setTimeout(() => setPhase(1), 300);   // Ambient wake-up
    const t1 = setTimeout(() => setPhase(2), 2200);  // "FOR THE BUILDERS."
    const t2 = setTimeout(() => setPhase(3), 4200);  // "FOR THE COLLECTIVE."
    const t3 = setTimeout(() => setPhase(4), 6200);  // "ACM SVNIT" hero reveal
    const t4 = setTimeout(() => setPhase(5), 8400);  // Light spill + door trigger
    const t5 = setTimeout(() => setPhase(6), 9000);  // Doors open
    const t6 = setTimeout(() => {
      setIsLoaderActive(false);
      document.body.style.overflow = "";
    }, 11000);

    return () => {
      [t0, t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  // Cinematic easing — weighted, physical, elegant
  const easeCinematic = [0.22, 1, 0.36, 1] as const;
  const easeHeavy = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      <AnimatePresence>
        {isLoaderActive && (
          <motion.div
            key="loader-container"
            className="fixed inset-0 z-[100] flex pointer-events-none"
          >
            {/* ─── LEFT DOOR ─── */}
            <motion.div
              initial={{ x: "0%" }}
              animate={phase >= 6 ? { x: "-100%" } : { x: "0%" }}
              transition={{ duration: 2.2, ease: easeHeavy }}
              className="relative w-1/2 h-full bg-[#0a0a0a] z-10 overflow-hidden"
            >
              {/* Subtle noise texture */}
              <div
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", backgroundSize: "200px" }}
              />
              {/* Faint architectural grid on left door */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
            </motion.div>

            {/* ─── RIGHT DOOR ─── */}
            <motion.div
              initial={{ x: "0%" }}
              animate={phase >= 6 ? { x: "100%" } : { x: "0%" }}
              transition={{ duration: 2.2, ease: easeHeavy }}
              className="relative w-1/2 h-full bg-[#0a0a0a] z-10 overflow-hidden"
            >
              {/* Subtle noise texture */}
              <div
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", backgroundSize: "200px" }}
              />
              {/* Faint architectural grid on right door */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
            </motion.div>

            {/* ─── CENTER SEAM LINE ─── */}
            <motion.div
              initial={{ opacity: 0.1, scaleY: 0 }}
              animate={
                phase >= 5
                  ? { opacity: 1, scaleY: 1, boxShadow: "0 0 120px 30px rgba(163,230,53,0.3)" }
                  : phase >= 1
                    ? { opacity: 0.3, scaleY: 1 }
                    : { opacity: 0, scaleY: 0 }
              }
              transition={{ duration: phase >= 5 ? 0.8 : 2, ease: easeCinematic }}
              className="absolute left-1/2 top-0 -translate-x-1/2 w-[1px] h-full bg-white/20 z-20 origin-center"
            />

            {/* ─── AMBIENT BACKGROUND GLOW ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A3E635]/[0.03] blur-[150px] rounded-full" />
              <div className="absolute top-[60%] left-[40%] w-[400px] h-[400px] bg-[#8B5CF6]/[0.02] blur-[120px] rounded-full" />
            </motion.div>

            {/* ─── LIGHT SPILL ON DOOR OPEN ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={
                phase >= 5
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.2, ease: easeCinematic }}
              className="absolute inset-0 z-15 pointer-events-none"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A3E635]/[0.06] blur-[200px] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/[0.05] blur-[80px] rounded-full" />
            </motion.div>

            {/* ─── CENTRAL TYPOGRAPHY ─── */}
            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <div className="relative flex flex-col items-center justify-center w-full h-full">
                <AnimatePresence mode="wait">

                  {/* Phase 1: "FOR THE CURIOUS." — slow awakening */}
                  {phase === 1 && (
                    <motion.div
                      key="phrase-1"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 1.2, ease: easeCinematic }}
                      className="absolute flex flex-col items-center gap-6"
                    >
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-white/30">
                        FOR THE CURIOUS.
                      </span>
                    </motion.div>
                  )}

                  {/* Phase 2: "FOR THE BUILDERS." — slightly bolder */}
                  {phase === 2 && (
                    <motion.div
                      key="phrase-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 1.2, ease: easeCinematic }}
                      className="absolute flex flex-col items-center gap-6"
                    >
                      <span className="text-sm md:text-lg font-black uppercase tracking-[0.4em] text-white/50">
                        FOR THE BUILDERS.
                      </span>
                    </motion.div>
                  )}

                  {/* Phase 3: "FOR THE COLLECTIVE." — full presence */}
                  {phase === 3 && (
                    <motion.div
                      key="phrase-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 1.2, ease: easeCinematic }}
                      className="absolute flex flex-col items-center gap-6"
                    >
                      <span className="text-lg md:text-2xl font-black uppercase tracking-[0.3em] text-white/70">
                        FOR THE COLLECTIVE.
                      </span>
                    </motion.div>
                  )}

                  {/* Phase 4: "ACM SVNIT" — Monumental hero reveal */}
                  {phase === 4 && (
                    <motion.div
                      key="phrase-4"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 1.4, ease: easeCinematic }}
                      className="absolute flex flex-col items-center"
                    >
                      {/* Overline */}
                      <motion.span
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, ease: easeCinematic }}
                        className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.8em] text-[#A3E635]/60 mb-8"
                      >
                        EST. 2011
                      </motion.span>

                      {/* Main Title */}
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-center text-white">
                        ACM
                        <br />
                        <span className="text-[#A3E635]">SVNIT</span>
                      </h1>

                      {/* Underline */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 1.2, ease: easeCinematic }}
                        className="w-24 h-[2px] bg-white/10 mt-10 origin-center"
                      />

                      {/* Tagline */}
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 1, ease: easeCinematic }}
                        className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mt-8"
                      >
                        ENTER THE COLLECTIVE
                      </motion.span>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* ─── EDITORIAL GHOST TYPOGRAPHY (behind doors) ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 3 }}
              className="absolute inset-0 z-5 pointer-events-none select-none overflow-hidden"
            >
              <span className="absolute top-[20%] -left-10 text-[20rem] font-black text-white/[0.015] tracking-tighter leading-none">
                ACM
              </span>
              <span className="absolute bottom-[15%] -right-20 text-[16rem] font-black text-white/[0.01] tracking-tighter leading-none -rotate-12">
                CODE
              </span>
            </motion.div>

            {/* ─── PROGRESS BAR ─── */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
              <div className="w-32 h-[1px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: phase >= 5 ? 1 : phase / 5 }}
                  transition={{ duration: 1.5, ease: easeCinematic }}
                  className="h-full bg-white/30 origin-left"
                />
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── WEBSITE CONTENT ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          phase >= 6
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: 1.8, ease: easeCinematic, delay: 0.3 }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
