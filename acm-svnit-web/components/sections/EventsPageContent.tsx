"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink, X } from "lucide-react";
import { events } from "@/data/events";
import { formatDate, getEventStatus, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Event, EventCategory } from "@/types";

type FilterTab = "all" | "upcoming" | "past" | EventCategory;

const tabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "workshop", label: "Workshop" },
  { id: "hackathon", label: "Hackathon" },
  { id: "talk", label: "Talk" },
];

const categoryColors: Record<EventCategory, string> = {
  workshop: "#8B5CF6",
  hackathon: "#EF4444",
  talk: "#0EA5E9",
  competition: "#10B981",
};

function EventModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const status = getEventStatus(event.date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="card-surface rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {status === "live" && (
              <Badge variant="danger">
                <span className="pulse-dot" />
                Live Now
              </Badge>
            )}
            {status === "upcoming" && <Badge variant="primary">Upcoming</Badge>}
            {status === "past" && <Badge variant="default">Past</Badge>}
            <Badge variant="outline">{event.category}</Badge>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/[0.06] transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Gradient banner */}
        <div
          className="h-32 rounded-xl mb-5"
          style={{
            background: `linear-gradient(135deg, ${categoryColors[event.category]}20 0%, ${categoryColors[event.category]}05 100%)`,
            borderBottom: `2px solid ${categoryColors[event.category]}30`,
          }}
        />

        {/* Title */}
        <h2 className="text-xl font-bold text-foreground mb-3">{event.title}</h2>

        {/* Meta */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Calendar size={14} className="text-primary" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={14} className="text-primary" />
            {event.venue}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-6">
          {event.description}
        </p>

        {/* CTA */}
        {event.registrationLink && status !== "past" && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="md" className="w-full">
              Register Now <ExternalLink size={14} />
            </Button>
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

function EventGridCard({
  event,
  onClick,
}: {
  event: Event;
  onClick: () => void;
}) {
  const status = getEventStatus(event.date);

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="card-surface rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Gradient header */}
      <div
        className="h-28 relative"
        style={{
          background: `linear-gradient(135deg, ${categoryColors[event.category]}15 0%, transparent 100%)`,
        }}
      >
        <div className="absolute bottom-3 left-4 flex gap-2">
          {status === "live" && (
            <Badge variant="danger">
              <span className="pulse-dot" />
              Live
            </Badge>
          )}
          {status === "upcoming" && <Badge variant="primary">Upcoming</Badge>}
          {status === "past" && <Badge variant="default">Past</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Badge variant="outline" className="mb-3">
          {event.category}
        </Badge>
        <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-1">
          {event.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted mb-1.5">
          <Calendar size={12} />
          {formatDate(event.date)}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted mb-3">
          <MapPin size={12} />
          {event.venue}
        </div>
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function EventsPageContent() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    if (activeTab === "upcoming") {
      filtered = filtered.filter(
        (e) => getEventStatus(e.date) !== "past"
      );
    } else if (activeTab === "past") {
      filtered = filtered.filter(
        (e) => getEventStatus(e.date) === "past"
      );
    } else if (activeTab !== "all") {
      filtered = filtered.filter((e) => e.category === activeTab);
    }

    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [activeTab]);

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-2">
            <h1 className="font-serif text-5xl sm:text-6xl text-foreground">
              Events
            </h1>
            <Badge variant="primary" className="text-sm">
              {events.length}
            </Badge>
          </div>
          <p className="text-muted text-lg">
            Workshops, hackathons, talks, and competitions — all in one place.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredEvents.map((event) => (
              <EventGridCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 text-muted">
            No events found for this filter.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
