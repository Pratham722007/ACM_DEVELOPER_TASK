"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

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

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Smoother quintic ease
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(stat.value, 2000, inView);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setInView(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.2,
    });
    const current = ref.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersect]);

  return (
    <div ref={ref} className="flex flex-col items-center lg:items-start px-6 py-10 lg:py-16 first:pl-0 last:pr-0">
      <div className="text-5xl sm:text-7xl font-black text-[#111111] tracking-tighter tabular-nums mb-3">
        {count}{stat.suffix}
      </div>
      <div className="text-[10px] font-black text-[#111111]/30 uppercase tracking-[0.2em]">
        {stat.label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#f5f0e8] pt-0 pb-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <div className="w-full h-px bg-[#111111]/5 mb-10" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]/5">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
        <div className="w-full h-px bg-[#111111]/5 mt-10" />
      </div>
    </section>
  );
}
