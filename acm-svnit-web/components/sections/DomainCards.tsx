"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { domains } from "@/data/domains";
import {
  Globe,
  Brain,
  Code,
  Shield,
  Palette,
  GitBranch,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe,
  Brain,
  Code,
  Shield,
  Palette,
  GitBranch,
};

export default function DomainCards() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14">
          <span className="pill-badge pill-badge--secondary mb-4 inline-flex">Our Domains</span>
          <h2 className="font-serif text-5xl sm:text-6xl text-foreground mb-4 italic">
            What We Build
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            Six specialized domains driving innovation and learning across the
            computing landscape.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain) => {
            const Icon = iconMap[domain.icon] || Globe;
            return (
              <motion.div
                key={domain.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link href={`/domains`} className="block">
                  <div className="card-surface p-6 h-full group">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 border-foreground"
                      style={{
                        backgroundColor: `${domain.color}20`,
                        color: domain.color,
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Name & Count */}
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {domain.name}
                    </h3>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                      {domain.memberCount} members
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                      {domain.description}
                    </p>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground group-hover:gap-2.5 transition-all uppercase tracking-wide">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
