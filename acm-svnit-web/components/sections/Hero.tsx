"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="hero-grid-bg absolute inset-0" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)]" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Eyebrow badge */}
        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-muted bg-surface/50">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Association for Computing Machinery
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={item}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight leading-[0.9] mb-6"
        >
          <span className="text-shimmer">ACM SVNIT</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={item}
          className="text-xl sm:text-2xl text-muted font-light max-w-xl mx-auto mb-10"
        >
          Where Curiosity Meets Code
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/events" size="lg">
            Explore Events
          </Button>
          <Button href="/team" variant="outline" size="lg">
            Meet The Team
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
