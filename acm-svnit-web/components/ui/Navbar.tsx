"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Domains", href: "/domains" },
  { label: "About", href: "/about" },
];

function MagneticLink({ children, href, isActive }: { children: React.ReactNode, href: string, isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={cn(
          "relative px-5 py-2 text-[11px] font-black uppercase tracking-[0.15em] rounded-full transition-colors",
          isActive ? "text-white" : "text-[#111111]/60 hover:text-[#111111]"
        )}
      >
        {isActive && (
          <motion.div
            layoutId="nav-active"
            className="absolute inset-0 rounded-full bg-[#111111] -z-10"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </motion.div>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  const navY = useTransform(scrollY, [0, 100], [20, 10]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      style={{ y: navY, scale: navScale }}
      className={cn(
        "fixed left-0 right-0 z-[100] transition-all duration-500 flex justify-center px-4",
        scrolled ? "top-0" : "top-4"
      )}
    >
      <nav 
        className={cn(
          "glass-nav w-full max-w-4xl px-4 py-2 flex items-center justify-between rounded-full border border-[#111111]/5 shadow-2xl transition-all duration-500",
          scrolled ? "bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-3" : "bg-transparent backdrop-blur-none border-transparent shadow-none"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group pl-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] transition-transform group-hover:scale-110">
            <span className="text-[12px] font-black text-[#A3E635]">A</span>
          </div>
          <span className="text-sm font-black tracking-tighter text-[#111111] uppercase hidden sm:block">
            ACM SVNIT
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <MagneticLink 
              key={link.href} 
              href={link.href} 
              isActive={pathname === link.href}
            >
              {link.label}
            </MagneticLink>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-2 pr-1">
          <Link
            href="/about#contact"
            className="hidden sm:inline-flex items-center px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-[#A3E635] text-[#111111] border border-[#111111]/10 hover:bg-[#111111] hover:text-[#A3E635] hover:scale-105 transition-all duration-300 shadow-sm"
          >
            Join Us
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 text-[#111111] hover:bg-[#111111]/5 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute top-full left-4 right-4 mt-4 p-4 bg-white/90 backdrop-blur-2xl rounded-[32px] border border-[#111111]/5 shadow-2xl md:hidden overflow-hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                    isActive
                      ? "bg-[#111111] text-white"
                      : "text-[#111111]/60 hover:bg-[#111111]/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/about#contact"
              className="mt-2 px-6 py-5 text-center text-[11px] font-black uppercase tracking-widest rounded-2xl bg-[#A3E635] text-[#111111] transition-all active:scale-95"
            >
              Join The Collective
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
