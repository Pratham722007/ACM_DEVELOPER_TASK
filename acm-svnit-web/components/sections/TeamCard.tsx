"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { TeamMember } from "@/types";

/* Inline SVG social icons */
function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  // If no image is provided, we generate a highly aesthetic gradient based on name length
  const hash = member.name.length;
  const gradient = `linear-gradient(${hash * 40}deg, #111111, #222222, #050510)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative w-[280px] md:w-[320px] h-[380px] md:h-[440px] rounded-[24px] overflow-hidden shrink-0 flex flex-col justify-end p-6 border border-[#111111]/10 bg-white cursor-pointer"
    >
      {/* Background Image / Placeholder */}
      <div className="absolute inset-0 z-0 bg-[#f5f0e8] overflow-hidden">
        {member.image ? (
          <motion.img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover opacity-95 brightness-[0.97] group-hover:scale-[1.04] group-hover:opacity-100 group-hover:brightness-105 transition-all duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]"
          />
        ) : (
          <div 
            className="w-full h-full opacity-60 group-hover:scale-[1.04] group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]" 
            style={{ background: gradient }}
          />
        )}
        
        {/* Soft shadow gradient overlay for text readability (classic editorial dark card) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col w-full translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        
        {/* Domain Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 text-[9px] font-black tracking-[0.2em] uppercase rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-sm">
            {member.domain}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none mb-2 drop-shadow-sm">
          {member.name}
        </h3>
        
        <p className="text-[#A3E635] text-xs font-black uppercase tracking-[0.2em] mb-4">
          {member.role}
        </p>

        {/* Socials & Interaction Line */}
        <div className="flex items-center justify-between w-full pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
          <div className="flex gap-4">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all">
                <LinkedinIcon size={18} />
              </a>
            )}
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all">
                <GithubIcon size={18} />
              </a>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center -translate-x-4 group-hover:translate-x-0 transition-transform duration-500 border border-white/20">
            <ArrowUpRight size={14} className="text-[#A3E635]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
