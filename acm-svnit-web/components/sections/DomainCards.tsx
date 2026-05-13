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
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">
            Our Domains
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
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
                  <div
                    className="card-surface rounded-xl p-6 h-full group"
                    style={{
                      ["--domain-color" as string]: domain.color,
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-colors"
                      style={{
                        backgroundColor: `${domain.color}15`,
                        color: domain.color,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    {/* Name & Count */}
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {domain.name}
                    </h3>
                    <p className="text-xs text-muted mb-3">
                      {domain.memberCount} members
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                      {domain.description}
                    </p>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
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
