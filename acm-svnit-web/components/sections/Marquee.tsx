"use client";

import { motion } from "framer-motion";

const items = [
  "1st at HackNITR",
  "Best Project Award 2024",
  "ACM India Recognition",
  "850+ Members",
  "12 Years of Excellence",
  "Ranked Top 5 ACM Chapter",
  "ICPC Regional Qualifiers",
  "100+ Open Source Contributions",
];

export default function Marquee() {
  const content = items.join(" · ");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 overflow-hidden border-y border-border"
    >
      <div className="marquee-track">
        <span className="text-sm font-medium text-muted whitespace-nowrap px-4">
          {content} · {content} ·{" "}
        </span>
        <span className="text-sm font-medium text-muted whitespace-nowrap px-4">
          {content} · {content} ·{" "}
        </span>
      </div>
    </motion.section>
  );
}
