"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { 
  Asterisk, ArrowRight, ArrowLeft, ArrowUp, 
  LayoutGrid, Clock, RotateCcw, Braces, Zap, Trophy 
} from "lucide-react";
import { events } from "@/data/events";
import { getEventStatus, cn, formatDate } from "@/lib/utils";
import type { Event, EventCategory } from "@/types";

type FilterTab = "all" | "upcoming" | "past" | EventCategory;

const tabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "upcoming", label: "UPCOMING" },
  { id: "past", label: "PAST" },
  { id: "workshop", label: "WORKSHOP" },
  { id: "hackathon", label: "HACKATHON" },
  { id: "competition", label: "COMPETITION" },
];

const tabIcons = {
  all: LayoutGrid,
  upcoming: Clock,
  past: RotateCcw,
  workshop: Braces,
  hackathon: Zap,
  competition: Trophy
};

const cardThemes = [
  { bg: "#111111", text: "#ffffff", buttonBg: "#A3E635", buttonText: "#111111", glow: "rgba(163, 230, 53, 0.4)" },
  { bg: "#ffffff", text: "#111111", buttonBg: "#8B5CF6", buttonText: "#ffffff", glow: "rgba(139, 92, 246, 0.3)" },
  { bg: "#1A1A1A", text: "#A3E635", buttonBg: "#ffffff", buttonText: "#1A1A1A", glow: "rgba(255, 255, 255, 0.3)" },
];

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

function FilterPill({ tab, isActive, onClick }: any) {
  const Icon = tabIcons[tab.id as keyof typeof tabIcons];
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered && !isActive ? 1.03 : 1
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      className={cn(
        "relative flex items-center px-6 py-3 rounded-full overflow-hidden transition-all shadow-sm",
        isActive
          ? "bg-[#111111] text-white border-2 border-[#111111] shadow-[0_5px_15px_rgba(17,17,17,0.3)] shadow-inner font-bold"
          : "bg-transparent text-[#111111] border-2 border-[#111111] hover:bg-[#111111]/5 font-semibold opacity-90"
      )}
    >
      <motion.div
        initial={false}
        animate={{ 
          width: isActive || isHovered ? 18 : 0, 
          opacity: isActive || isHovered ? 1 : 0,
          rotate: isHovered && !isActive ? 10 : 0,
          x: isActive || isHovered ? 0 : -10
        }}
        className="flex items-center justify-start overflow-hidden origin-center text-current"
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Icon size={14} strokeWidth={2.5} />
      </motion.div>

      <motion.span
        animate={{ 
          letterSpacing: isHovered && !isActive ? "0.15em" : "0.1em" 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-[11px] uppercase z-10 whitespace-nowrap"
      >
        {tab.label}
      </motion.span>
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
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[120px] mix-blend-screen"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

function ContinuousOsmoCard({ event, index, scrollRef }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    container: scrollRef,
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.5
  });

  const scale = useTransform(smoothProgress, [0, 0.35, 0.5, 0.65, 1], [0.84, 0.92, 1.08, 0.92, 0.84]);
  const rotate = useTransform(smoothProgress, [0, 0.4, 0.5, 0.6, 1], [-8, -3, 0, 3, 8]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [30, -10, 30]);
  
  const shadeOpacity = useTransform(smoothProgress, [0, 0.45, 0.5, 0.55, 1], [0.5, 0.15, 0, 0.15, 0.5]);
  
  const zIndexRaw = useTransform(smoothProgress, [0, 0.45, 0.5, 0.55, 1], [0, 10, 30, 10, 0]);
  const zIndex = useTransform(zIndexRaw, Math.round);
  
  const shadowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.8, 0]);
  const theme = cardThemes[index % cardThemes.length];
  const boxShadow = useMotionTemplate`0 40px 80px -20px rgba(0,0,0,${shadowOpacity}), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 80px -20px ${theme.glow} inset`;

  const shortDesc = event.description.length > 70 
    ? event.description.slice(0, 70) + "..." 
    : event.description;

  return (
    <div ref={cardRef} className="snap-center shrink-0 flex items-center justify-center py-20 px-2 w-[340px] md:w-[470px]">
      <motion.div
        style={{
          scale,
          rotateZ: rotate,
          y,
          zIndex,
          transformPerspective: 1200,
        }}
        className="w-full flex items-center justify-center will-change-transform"
      >
        <motion.div
          className="relative w-[320px] md:w-[450px] h-[480px] md:h-[600px] rounded-[24px] p-6 md:p-10 flex flex-col items-center text-center overflow-hidden transition-colors"
          style={{
            backgroundColor: theme.bg,
            color: theme.text,
            boxShadow,
          }}
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="absolute inset-0 bg-[#111111] pointer-events-none z-50 mix-blend-multiply"
            style={{ opacity: shadeOpacity }}
          />

          <div className="flex gap-2 mb-auto w-full justify-center">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-current/20 backdrop-blur-md bg-white/5">
              {event.category}
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-current/20 backdrop-blur-md bg-white/5">
              {getEventStatus(event.date)}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 w-full relative z-10 my-6">
            <Asterisk size={48} strokeWidth={1} className="mb-6 opacity-60" />
            
            <h3 
              className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.05] mb-5 w-full"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {event.title}
            </h3>
            
            <p className="text-sm md:text-base font-medium opacity-80 px-4 leading-relaxed max-w-[95%]">
              <span className="block font-bold mb-2 tracking-widest uppercase text-xs opacity-100">{formatDate(event.date)}</span>
              {shortDesc}
            </p>
          </div>

          <div className="w-full flex justify-center mt-auto relative z-10">
            <MagneticButton
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors shadow-2xl hover:scale-105"
              style={{ backgroundColor: theme.buttonBg, color: theme.buttonText }}
            >
              Discover <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function EventsPageContent() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredEvents = useMemo(() => {
    let filtered = [...events];
    if (activeTab === "upcoming") {
      filtered = filtered.filter((e) => getEventStatus(e.date) !== "past");
    } else if (activeTab === "past") {
      filtered = filtered.filter((e) => getEventStatus(e.date) === "past");
    } else if (activeTab !== "all") {
      filtered = filtered.filter((e) => e.category === activeTab);
    }
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeTab]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  }, [activeTab]);

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
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 340 + 16 : 470 + 40; 
      scrollRef.current.scrollBy({ left: direction === 'right' ? offset : -offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f5f0e8] min-h-screen pt-32 pb-0 flex flex-col overflow-hidden relative selection:bg-[#111111] selection:text-white font-sans">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] repeat" />
      <AmbientGlow />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full text-center">
        <h1 className="text-[12rem] md:text-[22rem] font-black text-[#111111] opacity-[0.03] blur-md italic tracking-tighter mix-blend-multiply">
          EVENTS
        </h1>
      </div>
      
      {/* Header Section */}
      <div className="px-4 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto z-20 relative pt-4">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          
          <div>
            <span className="inline-flex px-4 py-1.5 rounded-full bg-[#111111] text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
              Showcase
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight leading-none">
              Discover the <br className="hidden md:block"/> Experiences.
            </h2>
          </div>

          {/* Magnetic Filter Pills */}
          <div className="flex flex-wrap gap-3 lg:justify-end max-w-3xl">
            {tabs.map((tab) => (
              <FilterPill 
                key={tab.id} 
                tab={tab} 
                isActive={activeTab === tab.id} 
                onClick={() => setActiveTab(tab.id)} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Continuous Interpolation Scroll Track */}
      <div className="relative w-full flex-1 flex items-center mt-4 md:mt-10 mb-10 md:mb-20 z-20">
        
        {/* Minimal Scrolling Hint */}
        <div className="absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center justify-center opacity-40 pointer-events-none">
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <ArrowUp size={16} strokeWidth={1.5} className="text-[#111111]" />
          </motion.div>
          <span className="[writing-mode:vertical-rl] text-[9px] font-bold tracking-[0.4em] uppercase text-[#111111] rotate-180">
            Scroll To Explore
          </span>
        </div>

        {/* High-Visibility Floating Navigation Arrows */}
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

        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory px-[calc(50vw-170px)] md:px-[calc(50vw-235px)] scrollbar-none items-center h-[650px] md:h-[750px] w-full pt-10 pb-20 will-change-scroll"
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <ContinuousOsmoCard key={event.id} event={event} index={index} scrollRef={scrollRef} />
            ))
          ) : (
            <div className="w-full text-center text-[#111111]/40 font-bold tracking-widest uppercase text-sm mt-20">
              No events found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
