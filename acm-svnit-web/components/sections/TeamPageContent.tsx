"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronRight, Award } from "lucide-react";
import { teamMembers, yearHighlights } from "@/data/team";
import TeamCard from "@/components/sections/TeamCard";
import Badge from "@/components/ui/Badge";

// Get unique years from team data and sort them ascending
const allYears = Array.from(new Set(teamMembers.map((m) => m.year))).sort(
  (a, b) => a - b
);

const roleOrder = [
  "Chairperson",
  "Vice-Chairperson",
  "Secretary",
  "Treasurer",
  "Developer",
  "Designer",
  "Problem Setter",
  "Editor",
  "Community Head",
  "Core Member",
];

export default function TeamPageContent() {
  const latestYear = allYears[allYears.length - 1];
  const [selectedYear, setSelectedYear] = useState(latestYear);

  const filteredMembers = useMemo(() => {
    const members = teamMembers.filter((m) => m.year === selectedYear);
    return members.sort(
      (a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role)
    );
  }, [selectedYear]);

  const totalMembers = teamMembers.length;
  const highlights = yearHighlights[selectedYear] || [];

  const leads = filteredMembers.filter(
    (m) =>
      m.role === "Chairperson" ||
      m.role === "Vice-Chairperson" ||
      m.role === "Secretary" ||
      m.role === "Treasurer" ||
      m.role === "Community Head"
  );
  
  const specialized = filteredMembers.filter(
    (m) =>
      m.role === "Developer" ||
      m.role === "Designer" ||
      m.role === "Problem Setter" ||
      m.role === "Editor"
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
          <span className="pill-badge pill-badge--accent mb-4 inline-flex">Our People</span>
          <h1 className="font-serif text-6xl sm:text-7xl text-foreground italic mb-2">
            The Team
          </h1>
          <p className="text-muted text-lg">
            The people who make ACM SVNIT what it is — past, present, and future.
          </p>
        </motion.div>

        {/* Year Timeline — pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {allYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className="relative px-5 py-2.5 text-sm font-bold rounded-full whitespace-nowrap transition-all border-2 border-foreground flex items-center gap-2"
              >
                {selectedYear === year && (
                  <motion.div
                    layoutId="year-bg"
                    className="absolute inset-0 rounded-full bg-primary border-2 border-foreground"
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
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {year}
                </span>
                {year === latestYear && (
                  <span className="relative z-10">
                    <Badge
                      variant="success"
                      className="text-[9px] py-0 px-1.5"
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
          className="card-surface p-5 mb-8 flex flex-wrap items-center gap-4 justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary border-2 border-foreground flex items-center justify-center">
              <Users size={18} className="text-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                Total members across all years
              </p>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">
                {totalMembers} members · {allYears.length} years of legacy
              </p>
            </div>
          </div>
          <div className="text-3xl font-black text-foreground tabular-nums">
            {totalMembers}+
          </div>
        </motion.div>

        {/* Year Highlights */}
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
              <div className="card-surface p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award size={16} className="text-secondary" />
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
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
                        className="text-secondary mt-0.5 shrink-0"
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
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="pill-badge pill-badge--primary py-1">
              Leadership
            </span>
            <ChevronRight size={14} className="text-foreground" />
            <span className="pill-badge py-1" style={{ background: "#FCD34D" }}>
              Domain Experts
            </span>
            <ChevronRight size={14} className="text-foreground" />
            <span className="pill-badge py-1">
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
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
                  Leadership
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {leads.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Specialized Roles (Dev, Design, etc) */}
            {specialized.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
                  Domain Experts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {specialized.map((member, i) => (
                    <TeamCard
                      key={member.id}
                      member={member}
                      index={i + leads.length}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Core Members */}
            {coreMembers.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">
                  Core Members
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {coreMembers.map((member, i) => (
                    <TeamCard
                      key={member.id}
                      member={member}
                      index={i + leads.length + specialized.length}
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
