"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Asterisk, Calendar } from "lucide-react";
import { events } from "@/data/events";
import { formatDate, getEventStatus, cn } from "@/lib/utils";
import type { Event } from "@/types";

function EventTeaser({ event, index }: { event: Event; index: number }) {
  const status = getEventStatus(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white border border-[#111111]/5 rounded-[32px] p-8 overflow-hidden hover:shadow-2xl hover:shadow-[#111111]/5 transition-all duration-500"
    >
      <div className="flex justify-between items-start mb-6">
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
          status === "live" ? "bg-red-500 text-white border-red-500" : "bg-[#f5f0e8] text-[#111111]/40 border-transparent"
        )}>
          {status}
        </span>
        <Asterisk size={20} className="text-[#111111]/10 group-hover:text-[#A3E635] group-hover:rotate-45 transition-all duration-500" />
      </div>

      <h3 className="text-2xl font-black text-[#111111] tracking-tight mb-3 line-clamp-2 leading-none">
        {event.title}
      </h3>

      <div className="flex items-center gap-2 text-[10px] font-black text-[#111111]/40 uppercase tracking-widest mb-6">
        <Calendar size={12} />
        {formatDate(event.date)}
      </div>

      <p className="text-sm font-medium text-[#111111]/50 leading-relaxed mb-8 line-clamp-2">
        {event.description}
      </p>

      <Link 
        href={`/events`}
        className="inline-flex items-center gap-2 text-[10px] font-black text-[#111111] uppercase tracking-widest group-hover:text-[#A3E635] transition-colors"
      >
        View Experience <ArrowUpRight size={14} />
      </Link>
    </motion.div>
  );
}

export default function RecentEvents() {
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-32 bg-[#f5f0e8] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
          <div className="max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40 block mb-6">Latest Updates</span>
            <h2 className="text-5xl md:text-7xl font-black text-[#111111] tracking-tighter leading-[0.9]">
              What&apos;s <br/> Happening.
            </h2>
          </div>
          <Link
            href="/events"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#A3E635] hover:text-[#111111] transition-all duration-300"
          >
            View All Events
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentEvents.map((event, index) => (
            <EventTeaser key={event.id} event={event} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
