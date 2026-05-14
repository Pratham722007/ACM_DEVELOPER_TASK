"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

const stats: StatItem[] = [
  { label: "Members", value: 850, suffix: "+" },
  { label: "Legacy Years", value: 14, suffix: "" },
  { label: "Experiences", value: 42, suffix: "" },
  { label: "Domains", value: 6, suffix: "" },
];

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const count = useMotionValue(0);
  const springValue = useSpring(count, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, stat.value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1], // Custom cinematic ease
      });
      return animation.stop;
    }
  }, [isInView, count, stat.value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center lg:items-start px-6 py-10 lg:py-16 first:pl-0 last:pr-0"
    >
      <div className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#111111] tracking-tighter tabular-nums mb-3 flex items-baseline">
        <motion.span>{displayValue}</motion.span>
        <span className="text-[#A3E635] ml-1">{stat.suffix}</span>
      </div>
      <div className="text-[10px] font-black text-[#111111]/30 uppercase tracking-[0.3em]">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="bg-transparent pt-0 pb-20 overflow-hidden relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        {/* Top Boundary Line */}
        <div className="w-full h-px bg-[#111111]/5 mb-4" />
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]/5">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom Boundary Line */}
        <div className="w-full h-px bg-[#111111]/5 mt-4" />
      </div>
    </section>
  );
}
