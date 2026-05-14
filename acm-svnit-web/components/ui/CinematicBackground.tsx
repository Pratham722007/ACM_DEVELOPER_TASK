"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

export default function CinematicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 30, damping: 40 });

  // Cursor reactivity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Layer 3: Typographic Ghosts - Parallax Transforms
  const ghostACM_Y = useTransform(smoothProgress, [0, 1], [0, -400]);
  const ghostBUILD_Y = useTransform(smoothProgress, [0, 1], [200, -800]);
  const ghostCOLLECTIVE_Y = useTransform(smoothProgress, [0, 1], [500, -1200]);
  const ghostSVNIT_Y = useTransform(smoothProgress, [0, 1], [800, -1600]);

  // Layer 2: Glow Blobs - Drift & Cursor Reactivity
  const glow1X = useTransform(smoothMouseX, [0, 1920], ["10%", "30%"]);
  const glow1Y = useTransform(smoothMouseY, [0, 1080], ["10%", "40%"]);
  
  const glow2X = useTransform(smoothProgress, [0, 1], ["80%", "20%"]);
  const glow2Y = useTransform(smoothProgress, [0, 1], ["20%", "80%"]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#f5f0e8]"
    >
      {/* LAYER 1: Base Atmospheric Gradient & Texture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(163,230,53,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(139,92,246,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(163,230,53,0.04)_0%,transparent_40%)]" />
        
        {/* Subtle Paper Texture - Slightly more opaque */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* LAYER 4: Architectural Grid & Lines */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#111111_1.5px,transparent_1.5px),linear-gradient(to_bottom,#111111_1.5px,transparent_1.5px)] bg-[size:100px_100px]" />
        
        {/* Vertical Structural Lines - Bolder */}
        <div className="absolute left-[16%] top-0 bottom-0 w-[1.5px] bg-[#111111]/[0.08]" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1.5px] bg-[#111111]/[0.08]" />
        <div className="absolute left-[84%] top-0 bottom-0 w-[1.5px] bg-[#111111]/[0.08]" />
      </div>

      {/* LAYER 2: Ambient Glow Blobs - Intensified */}
      <motion.div
        style={{ left: glow1X, top: glow1Y }}
        className="absolute w-[900px] h-[900px] bg-[#A3E635]/[0.1] blur-[140px] rounded-full"
      />
      <motion.div
        style={{ left: glow2X, top: glow2Y }}
        className="absolute w-[700px] h-[700px] bg-[#8B5CF6]/[0.08] blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-10%", "30%", "-10%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-[#A3E635]/[0.03] blur-[160px] rounded-full"
      />

      {/* LAYER 3: Editorial Typographic Ghosts - Cleaned up to prevent overlapping */}
      <div className="absolute inset-0 z-20">
        <motion.div
          style={{ y: ghostACM_Y }}
          className="absolute top-[15%] -left-10 text-[20rem] md:text-[28rem] font-black text-[#111111]/[0.03] leading-none select-none tracking-tighter"
        >
          ACM
        </motion.div>
        <motion.div
          style={{ y: ghostBUILD_Y }}
          className="absolute top-[60%] -right-20 text-[18rem] md:text-[24rem] font-black text-[#111111]/[0.02] leading-none select-none -rotate-90 tracking-tighter"
        >
          BUILD
        </motion.div>
        <motion.div
          style={{ y: ghostCOLLECTIVE_Y }}
          className="absolute top-[110%] left-[5%] text-[15rem] md:text-[20rem] font-black text-[#111111]/[0.02] leading-none select-none tracking-tighter"
        >
          COLLECTIVE
        </motion.div>
        <motion.div
          style={{ y: ghostSVNIT_Y }}
          className="absolute top-[160%] right-[5%] text-[12rem] md:text-[18rem] font-black text-[#111111]/[0.02] leading-none select-none tracking-tighter"
        >
          SVNIT
        </motion.div>
      </div>

      {/* LAYER 5: Cinematic Lighting & Vignette */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#f5f0e8] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#f5f0e8] to-transparent" />
      </div>
    </div>
  );
}
