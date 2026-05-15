"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { 
  Asterisk, ArrowRight, ArrowLeft, ArrowUp, 
  LayoutGrid, Clock, RotateCcw, Braces, Zap, Trophy 
} from "lucide-react";
import { events } from "@/data/events";
import Image from "next/image";
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

// Personality Themes & Art Direction
const personalityThemes: Record<string, any> = {
  "echelon": {
    glow: "rgba(139, 92, 246, 0.4)",
    accent: "#8B5CF6",
    overlay: "from-[#8B5CF6]/20 via-transparent to-[#111111]/95"
  },
  "codecraft": {
    glow: "rgba(255, 255, 255, 0.2)",
    accent: "#ffffff",
    overlay: "from-white/10 via-white/40 to-white/95"
  },
  "dotslash-9": {
    glow: "rgba(163, 230, 53, 0.6)",
    accent: "#A3E635",
    overlay: "from-[#A3E635]/20 via-transparent to-[#111111]/95"
  },
  "hour-of-ai": {
    glow: "rgba(56, 189, 248, 0.4)",
    accent: "#38BDF8",
    overlay: "from-[#38BDF8]/10 via-transparent to-[#111111]/95"
  },
  "n8n-workshop": {
    glow: "rgba(244, 63, 94, 0.4)",
    accent: "#F43F5E",
    overlay: "from-[#F43F5E]/10 via-transparent to-[#111111]/95"
  },
  "summer-challenge-2024": {
    glow: "rgba(250, 204, 21, 0.6)",
    accent: "#FACC15",
    overlay: "from-orange-500/10 via-transparent to-[#111111]/95"
  }
};

// Atmosphere personality helper
function personalityAtmosphere(id: string, isLight: boolean) {
  switch (id) {
    case "hour-of-ai":
      return (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
      );
    case "n8n-workshop":
      return (
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_24%,rgba(244,63,94,0.3)_25%,rgba(244,63,94,0.3)_26%,transparent_27%,transparent_74%,rgba(244,63,94,0.3)_75%,rgba(244,63,94,0.3)_76%,transparent_77%)] [background-size:60px_60px]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(0deg,transparent_24%,rgba(244,63,94,0.3)_25%,rgba(244,63,94,0.3)_26%,transparent_27%,transparent_74%,rgba(244,63,94,0.3)_75%,rgba(244,63,94,0.3)_76%,transparent_77%)] [background-size:60px_60px]" />
        </div>
      );
    case "dotslash-9":
      return (
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#A3E635]/10 pointer-events-none" />
      );
    default:
      return null;
  }
}

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



function ContinuousOsmoCard({ event, index, scrollRef }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    container: scrollRef,
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.8
  });

  // Perspective Depth Transforms
  const scale = useTransform(smoothProgress, [0, 0.4, 0.5, 0.6, 1], [0.85, 0.95, 1.12, 0.95, 0.85]);
  const rotateY = useTransform(smoothProgress, [0, 0.4, 0.5, 0.6, 1], [25, 10, 0, -10, -25]);
  const opacity = useTransform(smoothProgress, [0, 0.4, 0.5, 0.6, 1], [0.8, 0.9, 1, 0.9, 0.8]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [20, 0, 20]);
  
  const shadowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.6, 0]);
  
  const theme = personalityThemes[event.id] || {
    glow: "rgba(163, 230, 53, 0.3)",
    accent: "#A3E635",
    overlay: "from-black/40 via-transparent to-black/95"
  };

  const isLight = event.id === "codecraft";
  const isHighlight = event.id === "dotslash-9";

  const boxShadow = useMotionTemplate`0 50px 100px -20px rgba(0,0,0,${shadowOpacity}), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 100px -20px ${theme.glow} inset`;

  return (
    <div ref={cardRef} className="snap-center shrink-0 flex items-center justify-center py-20 px-8 w-[340px] md:w-[500px]">
      <motion.div
        style={{
          scale,
          rotateY,
          opacity,
          y,
          transformPerspective: 1500,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="w-full flex items-center justify-center will-change-transform"
      >
        <motion.div
          className={cn(
            "relative w-[320px] md:w-[480px] h-[500px] md:h-[650px] rounded-[48px] p-8 md:p-12 flex flex-col items-center overflow-hidden transition-all duration-700 group shadow-2xl",
            isLight ? "bg-white" : "bg-[#111111]"
          )}
          style={{ boxShadow }}
          whileHover={{ y: -10, scale: 1.03 }}
        >
          {/* Background Image Layer */}
          {event.image && (
            <div className="absolute inset-0 z-0">
              <Image 
                src={event.image} 
                alt={event.title}
                fill
                className={cn(
                  "object-cover transition-transform duration-1000 group-hover:scale-110",
                  isLight ? "opacity-30 grayscale contrast-125" : "opacity-60"
                )}
              />
              {/* Art-Directed Multi-Stop Gradient Overlays */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-b",
                theme.overlay
              )} />
              
            </div>
          )}

          {/* Massive Editorial Background Ghost */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span 
              className={cn(
                "text-[12rem] md:text-[18rem] font-black tracking-tighter transition-all duration-700 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110",
                isLight ? "text-black" : "text-white"
              )}
            >
              {event.title.split(' ')[0]}
            </span>
          </div>

          {/* Card Content */}
          <div className="relative z-20 flex flex-col h-full w-full">
            
            {/* Top Metadata Section */}
            <div className="flex justify-between items-start mb-auto">
              <div className="flex flex-col gap-1">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border",
                  isLight ? "border-black/10 bg-black/5 text-black" : "border-white/10 bg-white/5 text-white"
                )}>
                  {event.category}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest",
                  isLight ? "text-black/40" : "text-white/40"
                )}>
                  {getEventStatus(event.date)}
                </span>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest",
                  isLight ? "text-black" : "text-white"
                )}>
                  {formatDate(event.date)}
                </span>
              </div>
            </div>

            {/* Main Branding / Typography Area */}
            <div className="flex flex-col items-start justify-center flex-1 w-full my-8">
              <div className="flex items-center gap-4 mb-8">
                <div className={cn(
                  "w-12 h-px transition-all duration-700 group-hover:w-20",
                  isLight ? "bg-black" : "bg-white"
                )} />
                <Asterisk 
                  size={24} 
                  className={cn(
                    "animate-spin-slow",
                    isLight ? "text-black" : "text-white"
                  )} 
                />
              </div>
              
              <h3 
                className={cn(
                  "text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-8 w-full transition-all duration-500",
                  isLight ? "text-black" : "text-white",
                  isHighlight && "italic"
                )}
              >
                {event.title}
              </h3>
              
              <p className={cn(
                "text-sm md:text-base font-medium leading-relaxed max-w-[85%] transition-all duration-500",
                isLight ? "text-black/60" : "text-white/60",
                "group-hover:opacity-100"
              )}>
                {event.description.length > 120 
                  ? event.description.slice(0, 120) + "..." 
                  : event.description}
              </p>
            </div>

            {/* Bottom Interaction Area */}
            <div className="w-full flex items-center justify-between mt-auto pt-8 border-t border-white/10">
               <div className="flex flex-col">
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-widest mb-1 opacity-40",
                    isLight ? "text-black" : "text-white"
                  )}>Venue</span>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    isLight ? "text-black" : "text-white"
                  )}>{event.venue.split('—')[0]}</span>
               </div>
               
                <MagneticButton
                  onClick={() => window.open(event.registrationLink, '_blank')}
                  className={cn(
                    "flex items-center gap-4 px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-2xl hover:scale-105 active:scale-95 overflow-hidden group/btn",
                  )}
                  style={{ 
                    backgroundColor: isLight ? "#111111" : theme.accent, 
                    color: isLight ? "#ffffff" : "#111111" 
                  }}
                >
                  <span className="relative z-10">Discover</span>
                  <ArrowRight size={16} strokeWidth={3} className="relative z-10 transition-transform group-hover/btn:translate-x-2" />
                </MagneticButton>
            </div>
          </div>

          {/* Atmospheric Details */}
          {personalityAtmosphere(event.id, isLight)}

        </motion.div>
      </motion.div>
    </div>
  );
}



export default function EventsPageContent() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

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

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (scrollRef.current) {
      if (filteredEvents.length >= 3) {
        const isMobile = window.innerWidth < 768;
        const offset = isMobile ? 340 : 470;
        scrollRef.current.scrollTo({ 
          left: offset, 
          behavior: isInitialMount.current ? 'auto' : 'smooth' 
        });
      } else {
        scrollRef.current.scrollTo({ 
          left: 0, 
          behavior: isInitialMount.current ? 'auto' : 'smooth' 
        });
      }
      isInitialMount.current = false;
    }
  }, [activeTab, filteredEvents.length]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 340 : 470; 
      scrollRef.current.scrollBy({ left: direction === 'right' ? offset : -offset, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-transparent pt-8 pb-0 flex flex-col overflow-hidden relative selection:bg-[#111111] selection:text-white font-sans">
      
      {/* Header Section */}
      <div className="px-4 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto z-20 relative pt-4">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex px-4 py-1.5 rounded-full bg-[#111111] text-[#A3E635] text-[10px] font-black tracking-[0.3em] uppercase mb-6 shadow-xl"
            >
              Exhibition
            </motion.span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#111111] tracking-tighter leading-[0.85]">
              Curated <br className="hidden md:block"/> Experiences.
            </h2>
          </div>

          {/* Magnetic Filter Pills */}
          <div className="flex flex-wrap gap-3 lg:justify-end max-w-2xl bg-white/50 p-2 rounded-[32px] border border-black/5">
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
      <div className="relative w-full flex-1 flex items-center mt-10 mb-10 md:mb-16 z-20">
        
        {/* Navigation Arrows - Premium Styling */}
        <div className="absolute top-1/2 left-4 md:left-8 lg:left-12 -translate-y-1/2 z-[100] flex pointer-events-auto">
          <MagneticButton 
            onClick={() => scrollByAmount('left')}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/80 backdrop-blur-xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-[#111111] hover:bg-[#111111] hover:text-white transition-all group flex items-center justify-center cursor-pointer active:scale-90"
            aria-label="Scroll Left"
          >
            <ArrowLeft size={28} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
          </MagneticButton>
        </div>
        
        <div className="absolute top-1/2 right-4 md:right-8 lg:right-12 -translate-y-1/2 z-[100] flex pointer-events-auto">
          <MagneticButton 
            onClick={() => scrollByAmount('right')}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/80 backdrop-blur-xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-[#111111] hover:bg-[#111111] hover:text-white transition-all group flex items-center justify-center cursor-pointer active:scale-90"
            aria-label="Scroll Right"
          >
            <ArrowRight size={28} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-hidden snap-x snap-mandatory px-[calc(50vw-170px)] md:px-[calc(50vw-235px)] scrollbar-none items-center h-[700px] md:h-[850px] w-full pt-10 pb-20 will-change-scroll perspective-[2000px]"
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <ContinuousOsmoCard key={event.id} event={event} index={index} scrollRef={scrollRef} />
            ))
          ) : (
            <div className="w-full text-center text-[#111111]/40 font-black tracking-[0.4em] uppercase text-xs mt-20">
              No experiences found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
