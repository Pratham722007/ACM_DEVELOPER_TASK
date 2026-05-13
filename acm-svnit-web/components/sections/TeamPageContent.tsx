"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUp } from "lucide-react";
import { teamMembers } from "@/data/team";
import TeamCard from "@/components/sections/TeamCard";
import { cn } from "@/lib/utils";

// Get unique years (descending so newest is first)
const allYears = Array.from(new Set(teamMembers.map((m) => m.year))).sort((a, b) => b - a);

function MagneticButton({ children, className, style, onClick }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      style={style}
    >
      {children}
    </motion.button>
  );
}

function AmbientGlow() {
  const mouseX = useSpring(0, { stiffness: 100, damping: 30, mass: 1 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30, mass: 1 });

  useEffect(() => {
    const moveGlow = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full bg-[#A3E635]/5 blur-[120px] mix-blend-multiply"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

// Ensure the scroll progress is calculated uniquely per card if needed, 
// but since this is just a standard continuous row, CSS snap + Framer Motion whileInView on cards is sufficient.
// We will use native CSS snap-x mandatory for the track.

export default function TeamPageContent() {
  const [selectedYear, setSelectedYear] = useState(allYears[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter and safely sort members. Leadership first, then Domain Experts, then Core Members.
  const filteredMembers = useMemo(() => {
    const members = teamMembers.filter((m) => m.year === selectedYear);
    
    const roleOrder = [
      "Chairperson",
      "Vice-Chairperson",
      "Secretary",
      "Treasurer",
      "Developer",
      "Designer",
      "Problem Setter",
      "Editor",
      "Community Head",
      "Core Member",
    ];

    return members.sort((a, b) => {
      const indexA = roleOrder.indexOf(a.role);
      const indexB = roleOrder.indexOf(b.role);
      // Fallback if role is missing from list
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [selectedYear]);

  const totalMembers = teamMembers.length;
  const totalYears = allYears.length;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  }, [selectedYear]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY, behavior: 'auto' });
      }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // 320px (desktop width) + 24px (gap-6) = 344px offset
      // 280px (mobile width) + 16px (gap-4) = 296px offset
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 296 : 344; 
      scrollRef.current.scrollBy({ left: direction === 'right' ? offset : -offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f5f0e8] min-h-screen pt-32 pb-0 flex flex-col overflow-hidden relative selection:bg-[#111111] selection:text-white font-sans">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] repeat" />
      <AmbientGlow />
      
      {/* Top Asymmetrical Section */}
      <div className="px-4 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto z-20 relative">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
          
          {/* Left Side: Heading */}
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex px-4 py-1.5 rounded-full bg-[#111111] text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-6 shadow-sm"
            >
              Creative Collective
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-[6rem] font-black text-[#111111] tracking-tighter leading-[0.9] mb-6"
            >
              Meet The <br className="hidden md:block"/> Collective.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl font-medium text-[#111111]/70 leading-relaxed max-w-lg"
            >
              A modern collective of developers, designers, and innovators building the future of computing at SVNIT.
            </motion.p>
          </div>

          {/* Right Side: Animated Stats & Year Filter */}
          <div className="flex flex-col gap-10 lg:pt-4 w-full lg:w-auto lg:items-end">
            
            {/* Animated Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-8 md:gap-16 items-center lg:justify-end"
            >
              <div className="text-left lg:text-right">
                <p className="text-[10px] font-black tracking-[0.2em] text-[#111111]/40 uppercase mb-1">Legacy</p>
                <div className="text-4xl md:text-5xl font-black text-[#111111] tabular-nums tracking-tighter">
                  {totalYears}
                </div>
                <p className="text-xs font-bold text-[#111111]/60 uppercase">Years</p>
              </div>
              <div className="w-[1px] h-12 bg-[#111111]/10" />
              <div className="text-left lg:text-right">
                <p className="text-[10px] font-black tracking-[0.2em] text-[#111111]/40 uppercase mb-1">Network</p>
                <div className="text-4xl md:text-5xl font-black text-[#111111] tabular-nums tracking-tighter">
                  {totalMembers}+
                </div>
                <p className="text-xs font-bold text-[#111111]/60 uppercase">Members</p>
              </div>
            </motion.div>

            {/* Premium Sticky Year Filter Pill container */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap lg:justify-end gap-2 max-w-md"
            >
              {allYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={cn(
                    "relative px-6 py-2.5 rounded-full overflow-hidden transition-all shadow-sm group",
                    selectedYear === year
                      ? "bg-[#111111] text-white border-2 border-[#111111] shadow-[0_5px_15px_rgba(17,17,17,0.3)] shadow-inner"
                      : "bg-transparent text-[#111111] border-2 border-[#111111] hover:bg-[#111111]/5 opacity-90"
                  )}
                >
                  <span className={cn(
                    "text-[11px] uppercase z-10 whitespace-nowrap font-bold transition-all",
                    selectedYear === year ? "tracking-[0.15em]" : "tracking-[0.1em] group-hover:tracking-[0.15em]"
                  )}>
                    {year}
                  </span>
                </button>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Horizontal Cinematic Gallery Engine */}
      <div className="relative w-full mt-10 md:mt-24 flex-1 flex items-center mb-10 md:mb-20 z-20">
        
        {/* Minimal Scrolling Hint */}
        <div className="absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center justify-center opacity-40 pointer-events-none">
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <ArrowUp size={16} strokeWidth={1.5} className="text-[#111111]" />
          </motion.div>
          <span className="[writing-mode:vertical-rl] text-[9px] font-bold tracking-[0.4em] uppercase text-[#111111] rotate-180">
            Scroll To Meet
          </span>
        </div>

        {/* High-Visibility Floating Navigation Arrows (Matching Events Page) */}
        <div className="absolute top-1/2 left-2 sm:left-4 md:left-6 lg:left-12 -translate-y-1/2 z-[100] flex pointer-events-auto">
          <MagneticButton 
            onClick={() => scrollByAmount('left')}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#111111]/80 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] text-white hover:border-[#A3E635]/60 hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] hover:scale-105 transition-all group flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Scroll Left"
          >
            <ArrowLeft size={24} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
          </MagneticButton>
        </div>
        
        <div className="absolute top-1/2 right-2 sm:right-4 md:right-6 lg:right-12 -translate-y-1/2 z-[100] flex pointer-events-auto">
          <MagneticButton 
            onClick={() => scrollByAmount('right')}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#111111]/80 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] text-white hover:border-[#A3E635]/60 hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] hover:scale-105 transition-all group flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Scroll Right"
          >
            <ArrowRight size={24} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </div>

        {/* Scroll Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-[10vw] xl:px-[15vw] scrollbar-none items-center w-full py-10 will-change-scroll"
        >
          {filteredMembers.map((member, index) => (
            <div key={member.id} className="snap-center shrink-0 perspective-1000">
              <TeamCard member={member} index={index} />
            </div>
          ))}
          {filteredMembers.length === 0 && (
            <div className="w-full text-center text-[#111111]/40 font-bold tracking-widest uppercase text-sm mt-20">
              No team members found for {selectedYear}.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
