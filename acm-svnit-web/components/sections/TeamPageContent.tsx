"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronRight, Award } from "lucide-react";
import { teamMembers, yearHighlights } from "@/data/team";
import TeamCard from "@/components/sections/TeamCard";
import Badge from "@/components/ui/Badge";

const years = [2020, 2021, 2022, 2023, 2024, 2025];
const latestYear = 2025;

const roleOrder = [
  "President",
  "Vice President",
  "Developer Lead",
  "Designer Lead",
  "ML Lead",
  "CP Lead",
  "Secretary",
  "Core Member",
];

export default function TeamPageContent() {
  const [selectedYear, setSelectedYear] = useState(latestYear);

  const filteredMembers = useMemo(() => {
    const members = teamMembers.filter((m) => m.year === selectedYear);
    return members.sort(
      (a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role)
    );
  }, [selectedYear]);

  const totalMembers = teamMembers.length;
  const highlights = yearHighlights[selectedYear] || [];

  // Separate leads and core members
  const leads = filteredMembers.filter(
    (m) =>
      m.role === "President" ||
      m.role === "Vice President" ||
      m.role.includes("Lead") ||
      m.role === "Secretary"
  );
  const coreMembers = filteredMembers.filter(
    (m) => m.role === "Core Member"
  );

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
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground mb-2">
            Our Team
          </h1>
          <p className="text-muted text-lg">
            The people who make ACM SVNIT what it is — past, present, and
            future.
          </p>
        </motion.div>

        {/* Year Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className="relative px-5 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2"
              >
                {selectedYear === year && (
                  <motion.div
                    layoutId="year-bg"
                    className="absolute inset-0 rounded-lg bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    selectedYear === year
                      ? "text-white"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {year}
                </span>
                {year === latestYear && (
                  <span className="relative z-10">
                    <Badge
                      variant={selectedYear === year ? "default" : "primary"}
                      className="text-[10px] py-0 px-1.5"
                    >
                      Current
                    </Badge>
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Legacy Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="card-surface rounded-xl p-4 mb-8 flex flex-wrap items-center gap-4 justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Total members across all years
              </p>
              <p className="text-xs text-muted">
                {totalMembers} members · {years.length} years of legacy
              </p>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary tabular-nums">
            {totalMembers}+
          </div>
        </motion.div>

        {/* Year Highlights (Alumni toggle) */}
        <AnimatePresence mode="wait">
          {highlights.length > 0 && (
            <motion.div
              key={`highlights-${selectedYear}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="card-surface rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award size={16} className="text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {selectedYear === latestYear
                      ? "This year's highlights"
                      : `What the ${selectedYear} team built`}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <ChevronRight
                        size={14}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Role Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 flex-wrap text-xs text-muted">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
              President
            </span>
            <ChevronRight size={12} />
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
              Vice President
            </span>
            <ChevronRight size={12} />
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-medium">
              Domain Leads
            </span>
            <ChevronRight size={12} />
            <span className="px-2.5 py-1 rounded-full bg-white/[0.06] text-muted font-medium">
              Core Members
            </span>
          </div>
        </motion.div>

        {/* Team Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Leadership */}
            {leads.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                  Leadership
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {leads.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Core Members */}
            {coreMembers.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                  Core Members
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {coreMembers.map((member, i) => (
                    <TeamCard
                      key={member.id}
                      member={member}
                      index={i + leads.length}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
