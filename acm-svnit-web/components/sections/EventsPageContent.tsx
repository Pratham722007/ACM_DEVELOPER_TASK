"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { Asterisk, ArrowRight } from "lucide-react";
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

const cardThemes = [
  { bg: "#111111", text: "#ffffff", buttonBg: "#A3E635", buttonText: "#111111", glow: "rgba(163, 230, 53, 0.5)" }, // Dark + Lime
  { bg: "#ffffff", text: "#111111", buttonBg: "#8B5CF6", buttonText: "#ffffff", glow: "rgba(139, 92, 246, 0.4)" }, // White + Purple
  { bg: "#1A1A1A", text: "#A3E635", buttonBg: "#ffffff", buttonText: "#1A1A1A", glow: "rgba(255, 255, 255, 0.4)" }, // Dark + Neon
];

const staticRotations = [-6, 6, -4, 4, -5, 5, -3, 3];

function MagneticButton({ children, className, style }: any) {
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
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px] mix-blend-screen"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

export default function EventsPageContent() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [activeIndex, setActiveIndex] = useState(0);
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
    // Reset index on tab change
    setActiveIndex(0);
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        root: scrollRef.current,
        threshold: 0.6, // Fire when 60% of the card is visible in the container
      }
    );

    const cards = document.querySelectorAll(".event-card-wrapper");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredEvents]);

  return (
    <div className="bg-[#f5f0e8] min-h-screen pt-24 pb-0 flex flex-col overflow-hidden relative selection:bg-black selection:text-white font-sans">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] repeat" />
      <AmbientGlow />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full text-center">
        <h1 className="text-[12rem] md:text-[20rem] font-black text-black opacity-5 blur-sm italic tracking-tighter mix-blend-overlay">
          EVENTS
        </h1>
      </div>
      
      {/* Header Section */}
      <div className="px-4 sm:px-8 lg:px-16 w-full max-w-7xl mx-auto z-20 relative pt-4">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex px-4 py-1.5 rounded-full bg-[#111111] text-[#A3E635] text-[10px] font-black tracking-widest uppercase mb-4 shadow-[2px_2px_0px_#A3E635]">
              Showcase
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#111111] tracking-tight leading-none mb-2">
              Discover the <br className="hidden md:block"/> Experiences.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 md:justify-end max-w-md">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 text-[10px] font-black tracking-widest uppercase rounded-full transition-all border border-[#111111]/10",
                  activeTab === tab.id
                    ? "bg-[#111111] text-white shadow-lg scale-105"
                    : "bg-white/50 text-[#111111] hover:bg-white backdrop-blur-sm"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Coverflow Gallery */}
      <div className="relative w-full flex-1 flex items-center mt-4 mb-20 z-20">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-10 overflow-x-auto snap-x snap-mandatory px-[calc(50vw-160px)] md:px-[calc(50vw-225px)] scrollbar-none items-center h-[650px] w-full pt-10 pb-20"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => {
              const isCenter = index === activeIndex;
              const theme = cardThemes[index % cardThemes.length];
              const staticRotation = staticRotations[index % staticRotations.length];
              
              const shortDesc = event.description.length > 70 
                ? event.description.slice(0, 70) + "..." 
                : event.description;

              return (
                <div
                  key={event.id}
                  data-index={index}
                  className="event-card-wrapper snap-center shrink-0 flex items-center justify-center py-10"
                >
                  <motion.div
                    className="relative w-[320px] md:w-[450px] h-[480px] md:h-[600px] rounded-[24px] p-6 md:p-10 flex flex-col items-center text-center overflow-hidden"
                    style={{
                      backgroundColor: theme.bg,
                      color: theme.text,
                    }}
                    animate={{
                      scale: isCenter ? 1.05 : 0.85,
                      rotate: isCenter ? 0 : staticRotation,
                      filter: isCenter ? "blur(0px) grayscale(0%)" : "blur(4px) grayscale(40%)",
                      opacity: isCenter ? 1 : 0.6,
                      y: isCenter ? -10 : 0,
                      boxShadow: isCenter 
                        ? `0 30px 60px -10px ${theme.glow}, 0 0 0 1px rgba(255,255,255,0.1) inset` 
                        : "0 10px 30px -10px rgba(0,0,0,0.2)",
                      zIndex: isCenter ? 20 : 10,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                      mass: 1.2
                    }}
                  >
                    {/* Top Pills */}
                    <motion.div 
                      className="flex gap-2 mb-auto w-full justify-center"
                      animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : -10 }}
                    >
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-current/20 backdrop-blur-md">
                        {event.category}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-current/20 backdrop-blur-md">
                        {getEventStatus(event.date)}
                      </span>
                    </motion.div>

                    {/* Center Content */}
                    <div className="flex flex-col items-center justify-center flex-1 w-full relative z-10 my-6">
                      <Asterisk size={48} strokeWidth={1} className="mb-4 opacity-50" />
                      
                      <h3 
                        className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] mb-4 w-full"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {event.title}
                      </h3>
                      
                      <p className="text-sm md:text-base font-medium opacity-70 px-4 leading-relaxed max-w-[90%]">
                        <span className="block font-bold mb-2 tracking-widest uppercase text-xs opacity-100">{formatDate(event.date)}</span>
                        {shortDesc}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="w-full flex justify-center mt-auto">
                      <MagneticButton
                        className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-colors shadow-xl"
                        style={{ backgroundColor: theme.buttonBg, color: theme.buttonText }}
                      >
                        Discover <ArrowRight size={14} />
                      </MagneticButton>
                    </div>

                    {/* Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />
                  </motion.div>
                </div>
              );
            })
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
