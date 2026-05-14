"use client";

import { motion } from "framer-motion";
import { Braces, Palette, Cpu, Globe, Terminal, Shield } from "lucide-react";

const domains = [
  {
    id: "cp",
    title: "Competitive Programming",
    description: "Master algorithms, data structures, and problem-solving to excel in global coding competitions.",
    icon: Terminal,
    color: "#A3E635",
  },
  {
    id: "dev",
    title: "Web & App Development",
    description: "Build modern, scalable applications using the latest frameworks and industry-best practices.",
    icon: Globe,
    color: "#8B5CF6",
  },
  {
    id: "design",
    title: "UI/UX & Creative Design",
    description: "Craft immersive digital experiences through thoughtful design and user-centric interfaces.",
    icon: Palette,
    color: "#ffffff",
  },
  {
    id: "systems",
    title: "Systems & Security",
    description: "Dive into low-level programming, operating systems, and cybersecurity fundamentals.",
    icon: Shield,
    color: "#A3E635",
  },
  {
    id: "hardware",
    title: "Hardware & IoT",
    description: "Explore the intersection of software and hardware through robotics and embedded systems.",
    icon: Cpu,
    color: "#8B5CF6",
  },
  {
    id: "ai",
    title: "AI & Data Science",
    description: "Unlock the power of data through machine learning, neural networks, and predictive modeling.",
    icon: Braces,
    color: "#ffffff",
  },
];

function DomainCard({ domain, index }: { domain: typeof domains[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative h-[400px] w-full rounded-[32px] bg-[#111111] p-8 overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-[#111111]/40"
    >
      {/* Accent Background Glow */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-20 transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: domain.color }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundColor: domain.color === "#ffffff" ? "#ffffff" : "transparent" }}
          >
            <domain.icon 
              size={28} 
              strokeWidth={1.5} 
              style={{ color: domain.color === "#ffffff" ? "#111111" : domain.color }} 
            />
          </div>
          <h3 className="text-2xl font-black text-white tracking-tighter leading-tight mb-4 pr-10">
            {domain.title}
          </h3>
          <p className="text-sm font-medium text-white/50 leading-relaxed max-w-[240px]">
            {domain.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">
          Explore Domain <Braces size={12} />
        </div>
      </div>

      {/* Large Decorative Number */}
      <div className="absolute -bottom-8 -right-4 text-[12rem] font-black text-white/[0.03] italic leading-none pointer-events-none select-none">
        0{index + 1}
      </div>
    </motion.div>
  );
}

export default function DomainCards() {
  return (
    <section className="py-32 bg-[#f5f0e8] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40 block mb-6"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl font-black text-[#111111] tracking-tighter leading-[0.9]"
            >
              Domains of <br/> Excellence.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium text-[#111111]/60 max-w-sm lg:text-right"
          >
            A multidisciplinary collective focused on the core pillars of modern computing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, index) => (
            <DomainCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
