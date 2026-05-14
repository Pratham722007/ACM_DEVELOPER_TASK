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
  Terminal,
  Cpu,
  Asterisk,
  ArrowUpRight
} from "lucide-react";
import { domains } from "@/data/domains";
import { teamMembers } from "@/data/team";
import { cn, stringToColor } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Globe,
  Brain,
  Code,
  Shield,
  Palette,
  GitBranch,
  Terminal,
  Cpu
};

function DomainCard({ domain, index }: { domain: any; index: number }) {
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "group relative rounded-[40px] border transition-all duration-500 overflow-hidden",
        expanded ? "bg-white border-[#111111]/10 shadow-2xl" : "bg-[#111111]/[0.03] border-transparent hover:bg-white hover:border-[#111111]/10 hover:shadow-xl"
      )}
    >
      {/* Background Accent */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
        style={{ backgroundColor: domain.color }}
      />

      <div className="p-8 md:p-10">
        <div className="flex items-start justify-between mb-8">
           <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-[#111111] text-white group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundColor: expanded ? domain.color : "#111111", color: expanded && domain.color === "#ffffff" ? "#111111" : "white" }}
          >
            <Icon size={30} strokeWidth={1.5} />
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black text-[#111111]/20 uppercase tracking-[0.2em] block mb-1">Members</span>
             <span className="text-xl font-black text-[#111111] tabular-nums">{domain.memberCount}</span>
          </div>
        </div>

        <h3 className="text-3xl font-black text-[#111111] tracking-tighter leading-none mb-4">
          {domain.name}
        </h3>
        
        <p className="text-sm md:text-base font-medium text-[#111111]/50 leading-relaxed mb-8 max-w-sm">
          {domain.description}
        </p>

        <div className="flex items-center justify-between">
           <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-[10px] font-black text-[#111111] uppercase tracking-widest hover:text-[#A3E635] transition-colors"
          >
            {expanded ? "Collapse Details" : "View Initiatives"}
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          <div className="flex -space-x-3">
             {domainMembers.slice(0, 3).map((m, i) => (
               <div 
                key={m.id} 
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white overflow-hidden shadow-sm"
                style={{ backgroundColor: stringToColor(m.name) }}
               >
                 {m.name[0]}
               </div>
             ))}
             {domainMembers.length > 3 && (
               <div className="w-8 h-8 rounded-full border-2 border-white bg-[#f5f0e8] flex items-center justify-center text-[10px] font-black text-[#111111] shadow-sm">
                 +{domainMembers.length - 3}
               </div>
             )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[#111111]/5 bg-[#f5f0e8]/30"
          >
            <div className="p-8 md:p-10 space-y-10">
              {/* Projects */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]/30 mb-6 flex items-center gap-2">
                  <Layers size={14} /> Recent Initiatives
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {domain.recentProjects.map((project: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#111111]/5">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 bg-[#A3E635]" />
                      <span className="text-sm font-bold text-[#111111]/70">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Members Grid */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]/30 mb-6">Core Contributors</h4>
                <div className="flex flex-wrap gap-2">
                  {domainMembers.map((member) => (
                    <div
                      key={member.id}
                      className="px-4 py-2 rounded-full border border-[#111111]/10 bg-white text-[11px] font-black text-[#111111] hover:border-[#A3E635] transition-colors"
                    >
                      {member.name} <span className="text-[#111111]/30 ml-2">{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DomainsPageContent() {
  return (
    <div className="bg-[#f5f0e8] min-h-screen pt-40 pb-20 selection:bg-[#111111] selection:text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111111] text-[#A3E635]">
              <Asterisk size={14} className="animate-spin-slow" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40">Verticals</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#111111] tracking-tighter leading-[0.8] mb-10">
            Specialized <br/> Domains.
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[#111111]/60 leading-relaxed max-w-2xl">
            Our collective is structured into six high-performance domains, each dedicated to mastering a specific vertical of the computing landscape.
          </p>
        </motion.div>

        {/* Domain Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {domains.map((domain, index) => (
            <DomainCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 rounded-[48px] bg-[#111111] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Asterisk size={180} strokeWidth={1} className="animate-spin-slow" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">Want to Join <br/> A Collective?</h2>
            <p className="text-lg text-white/50 font-medium max-w-md">Applications open twice a year. Sharpen your craft and get ready for the next cohort.</p>
          </div>

          <div className="relative z-10">
            <button className="group flex items-center gap-4 px-12 py-6 rounded-full bg-[#A3E635] text-[#111111] text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(163,230,53,0.3)]">
              Register Interest
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
