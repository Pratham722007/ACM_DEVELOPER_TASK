"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Brain,
  Code,
  Shield,
  Palette,
  GitBranch,
  Users,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";
import { domains } from "@/data/domains";
import { teamMembers } from "@/data/team";
import Badge from "@/components/ui/Badge";
import type { Domain } from "@/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe,
  Brain,
  Code,
  Shield,
  Palette,
  GitBranch,
};

function DomainCard({ domain }: { domain: Domain }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[domain.icon] || Globe;

  const domainMembers = teamMembers.filter(
    (m) => m.domain === domain.name && m.year === 2025
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card-surface overflow-hidden"
      style={{
        borderColor: expanded ? domain.color : undefined,
      }}
    >
      {/* Main content */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border-2 border-foreground"
            style={{
              backgroundColor: `${domain.color}20`,
              color: domain.color,
            }}
          >
            <Icon size={26} />
          </div>

          {/* Title + count */}
          <div className="flex-1">
            <h3 className="text-xl font-black text-foreground">
              {domain.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default">
                <Users size={10} />
                {domain.memberCount} members
              </Badge>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed mb-4">
          {domain.description}
        </p>

        {/* Recent Projects (first 3) */}
        <div className="mb-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-2 flex items-center gap-1.5">
            <Layers size={12} />
            Recent Projects
          </h4>
          <ul className="space-y-1.5">
            {domain.recentProjects.slice(0, 3).map((project, i) => (
              <li key={i} className="text-sm text-muted flex items-start gap-2">
                <span
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0 border border-foreground"
                  style={{ backgroundColor: domain.color }}
                />
                {project}
              </li>
            ))}
          </ul>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-secondary transition-colors uppercase tracking-wide"
        >
          {expanded ? "Show Less" : "Show More"}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t-2 border-foreground pt-4">
              {/* All projects */}
              {domain.recentProjects.length > 3 && (
                <div className="mb-5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-2">
                    All Projects
                  </h4>
                  <ul className="space-y-1.5">
                    {domain.recentProjects.map((project, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted flex items-start gap-2"
                      >
                        <span
                          className="w-2 h-2 rounded-full mt-1.5 shrink-0 border border-foreground"
                          style={{ backgroundColor: domain.color }}
                        />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Domain team members */}
              {domainMembers.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">
                    2025 Team Members
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {domainMembers.map((member) => (
                      <div
                        key={member.id}
                        className="px-3 py-1.5 rounded-full border-2 border-foreground text-xs font-bold text-foreground bg-background"
                      >
                        {member.name}{" "}
                        <span className="text-muted">· {member.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DomainsPageContent() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="pill-badge pill-badge--secondary mb-4 inline-flex">Custom & Hosted Experiences</span>
          <h1 className="font-serif text-6xl sm:text-7xl text-foreground italic mb-2">
            What We Do
          </h1>
          <p className="text-muted text-lg max-w-2xl">
            Six specialized domains where members build, learn, and innovate
            together across the computing spectrum.
          </p>
        </motion.div>

        {/* Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>
      </div>
    </div>
  );
}
