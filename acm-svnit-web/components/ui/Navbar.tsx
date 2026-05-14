"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/", fontClass: "font-[family-name:var(--font-playfair)] italic font-bold tracking-wide capitalize" },
  { label: "Events", href: "/events", fontClass: "font-[family-name:var(--font-playfair)] italic font-bold tracking-wide capitalize" },
  { label: "Team", href: "/team", fontClass: "font-[family-name:var(--font-playfair)] italic font-bold tracking-wide capitalize" },
  { label: "About", href: "/about", fontClass: "font-[family-name:var(--font-playfair)] italic font-bold tracking-wide capitalize" },
];

/* ───────────────────────────────────────────────
   Magnetic Link — subtle cursor-follow effect
   ─────────────────────────────────────────────── */
function MagneticLink({
  children,
  href,
  isActive,
  fontClass,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
  fontClass?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={cn(
          "group relative px-4 sm:px-5 py-2.5 text-[20px] sm:text-[24px] transition-all duration-700 ease-out cursor-pointer",
          fontClass || "font-[family-name:var(--font-playfair)] italic font-bold",
          isActive
            ? "text-[#111111]"
            : "text-[#111111]/50 hover:text-[#111111] hover:tracking-widest"
        )}
      >
        {/* Active indicator — smooth elegant underline */}
        {isActive && (
          <motion.div
            layoutId="nav-active-underline"
            className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#A3E635] origin-center"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {/* Hover underline — smooth expansion */}
        {!isActive && (
          <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#111111]/20 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-[0.22,1,0.36,1]" />
        )}

        <span className="relative z-10">{children}</span>
      </motion.div>
    </Link>
  );
}

/* ───────────────────────────────────────────────
   Main Navbar Component
   ─────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed left-0 right-0 z-[90] flex justify-center px-4 sm:px-8 top-0 pt-6"
      >
        <nav
          className={cn(
            "w-full max-w-6xl px-2 sm:px-4 flex items-center justify-between rounded-[24px] transition-all duration-700 ease-out",
            scrolled
              ? "py-3 bg-white/40 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white/50"
              : "py-4 bg-transparent border border-transparent shadow-none"
          )}
        >
          {/* ─── Brand ─── */}
          <Link href="/" className="flex flex-col pl-4 group">
            <span className="text-[13px] font-black tracking-widest text-[#111111] uppercase leading-none group-hover:opacity-80 transition-opacity">
              ACM SVNIT
            </span>
            <span className="text-[8px] font-bold tracking-[0.4em] text-[#111111]/40 uppercase leading-none mt-1.5">
              EST. 2011
            </span>
          </Link>

          {/* ─── Desktop Navigation ─── */}
          <div className="hidden md:flex items-center gap-2 px-2 py-1">
            {navLinks.map((link) => (
              <MagneticLink
                key={link.href}
                href={link.href}
                isActive={pathname === link.href}
                fontClass={link.fontClass}
              >
                {link.label}
              </MagneticLink>
            ))}
          </div>

          {/* ─── CTA + Mobile Toggle ─── */}
          <div className="flex items-center gap-3 pr-1 sm:pr-2">


            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-transparent border border-[#111111]/10 text-[#111111]"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[5px] w-4">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="block h-[1.5px] w-full bg-[#111111] origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block h-[1.5px] w-full bg-[#111111]"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="block h-[1.5px] w-full bg-[#111111] origin-center"
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Fullscreen Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[80] bg-[#f5f0e8] flex flex-col md:hidden"
          >
            {/* Background texture */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "url('/noise.png')", backgroundSize: "100px" }}
            />

            {/* Navigation Links */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-12 gap-2">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className={cn(
                        "block py-4 text-4xl sm:text-5xl font-black uppercase tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-[#A3E635]"
                          : "text-[#111111]/20 hover:text-[#111111]"
                      )}
                    >
                      <span className="inline-flex items-center gap-4">
                        <span className="text-[10px] font-bold text-[#111111]/20 tabular-nums tracking-widest">
                          0{i + 1}
                        </span>
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}


            </div>

            {/* Bottom Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 px-8 sm:px-12 pb-10 flex items-center justify-between"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#111111]/20">
                ACM SVNIT · EST. 2011
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#111111]/20">
                SVNIT Surat
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
