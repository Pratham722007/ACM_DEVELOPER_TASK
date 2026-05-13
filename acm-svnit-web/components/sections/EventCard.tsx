"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { events } from "@/data/events";
import { formatDate, getEventStatus } from "@/lib/utils";
import type { Event } from "@/types";

function EventTeaser({ event }: { event: Event }) {
  const status = getEventStatus(event.date);

  return (
    <div className="card-surface p-5 flex flex-col h-full">
      {/* Status + Category */}
      <div className="flex items-center gap-2 mb-3">
        {status === "live" && (
          <Badge variant="danger">
            <span className="pulse-dot" />
            Live Now
          </Badge>
        )}
        {status === "upcoming" && <Badge variant="success">Upcoming</Badge>}
        {status === "past" && <Badge variant="default">Past</Badge>}
        <Badge variant="outline">{event.category}</Badge>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
        {event.title}
      </h3>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted mb-3 uppercase tracking-wide">
        <Calendar size={12} />
        {formatDate(event.date)}
      </div>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed line-clamp-2 flex-1">
        {event.description}
      </p>
    </div>
  );
}

export default function RecentEvents() {
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="pill-badge pill-badge--primary mb-4 inline-flex">Recent Events</span>
            <h2 className="font-serif text-5xl sm:text-6xl text-foreground italic">
              What&apos;s Happening
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-foreground hover:gap-2.5 transition-all uppercase tracking-wide"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentEvents.map((event) => (
            <EventTeaser key={event.id} event={event} />
          ))}
        </div>

        {/* Mobile link */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground uppercase tracking-wide"
          >
            View All Events <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
