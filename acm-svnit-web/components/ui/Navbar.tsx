"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Domains", href: "/domains" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled && "scrolled"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-foreground transition-transform group-hover:rotate-[-4deg]">
              <span className="text-base font-black text-primary">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              ACM SVNIT
            </span>
          </Link>

          {/* Desktop Nav — pill-shaped container */}
          <div className="hidden md:flex items-center gap-0.5 rounded-full border-2 border-foreground px-1.5 py-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-semibold uppercase tracking-wide rounded-full transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/about#contact"
              className="hidden sm:inline-flex items-center px-5 py-2 text-sm font-bold uppercase tracking-wide rounded-full bg-accent text-white border-2 border-foreground hover:shadow-[4px_4px_0px_#1A1A1A] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Join Us
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground hover:bg-foreground/5 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t-2 border-foreground bg-background"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-colors",
                    isActive
                      ? "bg-primary text-foreground"
                      : "text-muted hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/about#contact"
              className="block mt-2 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide rounded-full bg-accent text-white border-2 border-foreground transition-all"
            >
              Join Us
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
