"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Asterisk } from "lucide-react";

/* Inline SVG social icons for reliability */
function GithubIcon({ size = 18, strokeWidth = 1.5 }: { size?: number, strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, strokeWidth = 1.5 }: { size?: number, strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 18, strokeWidth = 1.5 }: { size?: number, strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon({ size = 18, strokeWidth = 1.5 }: { size?: number, strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Events", href: "/events" },
      { label: "Team", href: "/team" },
    ],
  },
  {
    title: "Collective",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Join ACM", href: "/about#contact" },
      { label: "Workshops", href: "/events?category=workshop" },
      { label: "Hackathons", href: "/events?category=hackathon" },
    ],
  },
];

const socialLinks = [
  { Icon: GithubIcon, href: "https://github.com/acmsvnit", label: "GitHub" },
  { Icon: LinkedinIcon, href: "https://linkedin.com/company/acmsvnit", label: "LinkedIn" },
  { Icon: TwitterIcon, href: "https://twitter.com/acmsvnit", label: "Twitter" },
  { Icon: InstagramIcon, href: "https://instagram.com/acmsvnit", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#111111] text-white pt-24 pb-12 overflow-hidden selection:bg-[#A3E635] selection:text-[#111111]">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-[#A3E635]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8B5CF6]/10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 relative z-10">
        
        {/* Top Section: Editorial Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.85] mb-8"
            >
              Let&apos;s Build <br/> The Future.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/50 max-w-md leading-relaxed font-medium"
            >
              Join the most active tech collective at SVNIT. We bridge the gap between curiosity and craftsmanship.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <Link 
              href="/about#contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#A3E635] text-[#111111] font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(163,230,53,0.2)]"
            >
              Enter The Collective
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#111111] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-16" />

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          
          {/* Logo & Info */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A3E635]">
                <span className="text-base font-black text-[#111111]">A</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">
                ACM SVNIT
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs font-medium">
              SVNIT Chapter of the Association for Computing Machinery. <br/>
              Surat, Gujarat, India.
            </p>
            <a href="mailto:acm@svnit.ac.in" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-[#A3E635] hover:underline underline-offset-4">
              <Mail size={14} /> acm@svnit.ac.in
            </a>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm font-bold text-white/60 hover:text-[#A3E635] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal / Secondary */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:text-right">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6">
                Crafted By
              </h3>
              <p className="text-sm font-bold text-white/60 mb-2">
                ACM SVNIT Design & Dev Collective
              </p>
              <p className="text-[11px] text-white/30 leading-relaxed">
                A project driven by passion and precision. <br/>
                © 2025 ALL RIGHTS RESERVED.
              </p>
          </div>

        </div>

        {/* Final Branding Line */}
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-[9px] font-black uppercase tracking-[1em] text-white/10">
            WHERE CURIOSITY MEETS CRAFTSMANSHIP
          </p>
        </div>

      </div>
    </footer>
  );
}
