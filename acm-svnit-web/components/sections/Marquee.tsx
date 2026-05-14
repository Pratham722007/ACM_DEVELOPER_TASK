"use client";

import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

const items = [
  "1st at HackNITR",
  "Best Project Award 2024",
  "ACM India Recognition",
  "850+ Members Collective",
  "12 Years of Craftsmanship",
  "Ranked Top 5 ACM Chapter",
  "ICPC Regional Qualifiers",
  "100+ Open Source Contributions",
];

export default function Marquee() {
  return (
    <div className="py-12 bg-[#111111] overflow-hidden flex whitespace-nowrap border-y border-white/5 relative z-20">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        className="flex items-center gap-10 pr-10"
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter italic">
              {item}
            </span>
            <Asterisk size={24} className="text-[#A3E635] animate-spin-slow" />
          </div>
        ))}
      </motion.div>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        className="flex items-center gap-10 pr-10"
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter italic">
              {item}
            </span>
            <Asterisk size={24} className="text-[#A3E635] animate-spin-slow" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
