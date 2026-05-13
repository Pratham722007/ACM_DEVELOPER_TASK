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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dot pattern background */}
      <div className="hero-grid-bg absolute inset-0" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 w-full"
      >
        {/* Eyebrow badge */}
        <motion.div variants={item} className="mb-8">
          <span className="pill-badge pill-badge--accent">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Level Up Your Tech Skills
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={item}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-normal tracking-tight leading-[0.95] mb-6 max-w-4xl"
        >
          Welcome to{" "}
          <span className="block">
            <span className="text-shimmer">ACM SVNIT</span>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-muted max-w-xl mb-10 leading-relaxed"
        >
          At ACM SVNIT, we believe in building community through code. Discover
          amazing events, workshops, hackathons, and connect with fellow tech
          enthusiasts.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <Button href="/events" size="lg">
            Explore Events →
          </Button>
          <Button href="/team" variant="outline" size="lg">
            Meet The Team
          </Button>
        </motion.div>

        {/* Floating stat badge */}
        <motion.div
          variants={item}
          className="absolute top-24 right-8 lg:right-16 hidden lg:flex"
        >
          <div className="w-28 h-28 rounded-full bg-accent border-2 border-foreground flex flex-col items-center justify-center text-white rotate-6 hover:rotate-0 transition-transform">
            <span className="text-2xl font-black">850+</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Members</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
