<div align="center">

# ACM SVNIT — Chapter Website

**A cinematic, editorial-grade website for the ACM Student Chapter at Sardar Vallabhbhai National Institute of Technology, Surat.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

</div>

---

## 🌐 Live Demo

> **Deployed Link:** _Coming soon — link will be added here._

---

## 📖 Project Description

This is a complete ground-up redesign of the ACM SVNIT chapter website, built to compete at the national level for ACM India's **"Outstanding Chapter Website"** award. The site is architected as a **high-end, editorial-style single-page application** — drawing design inspiration from premium digital experiences while maintaining a clean, professional, and corporate aesthetic.

The project prioritizes **cinematic aesthetics**, **micro-interactions**, and **typography-first design** to convey the technical excellence and community strength of the SVNIT ACM chapter. Every section is a self-contained, animated unit that contributes to a cohesive scrolling narrative about the chapter's identity, achievements, events, and people.

### Architecture Overview

The project follows a **modular, scalable Next.js App Router architecture**:

- **Separation of concerns** — component logic, data, and types are cleanly separated into dedicated directories.
- **Static data layer** — all content (team members, events, stats) lives in `/data`, making future updates zero-touch on component logic.
- **Type safety** — centralized TypeScript interfaces in `/types` enforce consistency across every layer of the app.
- **Performance-first** — Next.js Image optimization, code splitting via the App Router, and Lenis smooth scroll are configured out of the box.

### Design Decisions

- **Glassmorphism + atmospheric gradients** were chosen over flat design to create depth and premium feel without sacrificing readability.
- **Framer Motion** was selected over CSS animations for its declarative API, which makes complex sequenced reveals and parallax effects maintainable.
- **Tailwind CSS v4** was adopted for its new high-performance engine and closer-to-CSS configuration model, enabling a custom design system without the overhead of a component library.
- **MDX for events** allows non-developer team members to author event content in Markdown while still rendering rich components.

---

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion, Lenis |
| Icons | Lucide React |
| Forms | React Hook Form |
| Content | MDX |
| Package Manager | npm |

---

## 📂 Project Structure

```
acm-svnit-web/
├── app/
│   ├── api/                    # API route handlers
│   ├── favicon.ico
│   ├── globals.css             # Global styles and Tailwind base
│   ├── layout.tsx              # Root layout: fonts, SEO metadata, wrappers
│   └── page.tsx                # Main entry point — assembles all sections
│
├── components/
│   ├── sections/               # High-level page sections (each is self-contained)
│   │   ├── Hero.tsx            # Cinematic landing with CTA buttons
│   │   ├── Stats.tsx           # Animated key metrics
│   │   ├── Marquee.tsx         # Moving typographic ribbon
│   │   ├── EventCard.tsx       # Individual event card component
│   │   ├── EventsPageContent.tsx  # Horizontal-scroll events showcase
│   │   ├── TeamCard.tsx        # Profile card with hover effects
│   │   ├── TeamPageContent.tsx # Filtered team showcase
│   │   └── AboutPageContent.tsx   # Timeline, mission, faculty advisors
│   │
│   └── ui/                     # Reusable low-level components
│       ├── Badge.tsx
│       ├── Button.tsx          # Magnetic button with hover effect
│       ├── CinematicBackground.tsx
│       ├── Footer.tsx
│       ├── Loader.tsx
│       ├── Navbar.tsx
│       └── SmoothScroll.tsx    # Lenis wrapper
│
├── data/
│   ├── allteams/
│   │   └── allteams.js         # All past core teams archive
│   ├── authors/                # Blog/event author profiles
│   ├── events/
│   │   ├── newevents/          # Event images (JPEG)
│   │   ├── dotslash.mdx        # Individual event MDX files
│   │   ├── epiphany.mdx
│   │   ├── hourofcode.mdx
│   │   ├── inception.mdx
│   │   ├── sihideathon.mdx
│   │   ├── summerchallenge.mdx
│   │   └── workshop.mdx
│   ├── about.ts                # About section content
│   ├── events.ts               # Events metadata & types
│   ├── eventsData.js           # Events static data
│   ├── headerNavLinks.js       # Navigation link definitions
│   ├── projectsData.js         # Projects/initiatives data
│   ├── siteMetadata.js         # SEO & site-wide metadata
│   └── team.ts                 # Current team data
│
├── frames/                     # Animation frame assets
├── lib/                        # Shared utility functions (clsx, tailwind-merge, etc.)
├── public/
│   ├── assets/                 # Static assets
│   ├── static/                 # Public static files
│   └── teams/                  # Team-related public images
│
├── scripts/                    # Build/utility scripts
├── types/
│   └── index.ts                # Centralized TypeScript interfaces
│
├── .env.local                  # Environment variables (not committed)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🖥️ Page Sections

The website is a single-page experience divided into the following narrative sections:

**1. Hero** — Cinematic landing with the chapter's brand, a bold typographic mission statement, and primary CTA buttons.

**2. Stats** — Animated counters showcasing key chapter metrics: Builders, Events hosted, and Years of Excellence.

**3. Marquee** — A continuously moving typographic ribbon reinforcing the chapter's brand and technical keywords.

**4. Events (Experiences)** — A horizontal-scrolling showcase of chapter events — hackathons, workshops, and competitions — each with interactive "Discover" cards.

**5. Team (The Collective)** — A sophisticated, filterable display of the ACM Core and Domain teams featuring hover-reactive profile cards with social links.

**6. About** — Three sub-sections:
- *Evolution Timeline* — A vertical history of the chapter's key milestones.
- *Mission & Vision* — Atmospheric glassmorphism cards.
- *Faculty Advisors* — Recognition of the chapter's academic mentors.

**7. Contact** — A validated inquiry form with a cinematic success feedback animation.

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) — **v18.17 or higher** (v20+ recommended)
- [npm](https://www.npmjs.com/) — v9 or higher (comes with Node.js)
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/<your-username>/acm-svnit-web.git
cd acm-svnit-web
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Copy the example environment file and fill in the required values:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and configure any required keys (e.g., contact form API, analytics).

**4. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot-reload |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server (run after `build`) |
| `npm run lint` | Run ESLint to check for code issues |

### Production Build

To build and preview the production version locally:

```bash
npm run build
npm run start
```

---

## 🔮 Future Scope

The following features and improvements are planned for future iterations:

**Content & Features**
- [ ] **Blog / Publications section** — A full MDX-powered blog for technical articles and chapter announcements, using the existing `/data/authors` and `/data/blog` structure.
- [ ] **Project Showcase page** — A dedicated gallery for chapter-built projects and open-source contributions, leveraging `projectsData.js`.
- [ ] **Alumni Network page** — Profiles of notable alumni with links to their current work.
- [ ] **Dark / Light mode toggle** — User-selectable theme with system preference detection.
- [ ] **Internationalization (i18n)** — Multi-language support for broader accessibility.

**Performance & Infrastructure**
- [ ] **CMS Integration** — Connect to a headless CMS (e.g., Sanity, Contentlayer) to allow non-technical members to update content without code changes.
- [ ] **Contact form backend** — Server-side form handling with email delivery via Resend or Nodemailer, replacing the current client-side stub.
- [ ] **Analytics** — Integrate privacy-friendly analytics (e.g., Plausible or Vercel Analytics) to track engagement.
- [ ] **OG Image generation** — Dynamic Open Graph images for each page/event using `@vercel/og`.

**Design & UX**
- [ ] **Cursor effects** — Custom cursor with magnetic attraction to interactive elements.
- [ ] **Advanced scroll animations** — GSAP ScrollTrigger integration for more complex parallax and scrubbing effects on the timeline section.
- [ ] **3D elements** — Three.js / React Three Fiber accent elements in the Hero section for a next-level visual impact.
- [ ] **Skeleton loaders** — Content skeleton screens for improved perceived performance on slower connections.

---

## 🛠️ Skills Matrix

| Domain | Technologies / Frameworks / Tools |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Framer Motion, HTML5, CSS3 |
| Backend | Node.js, Next.js API Routes, REST APIs |
| AI | — |
| ML | — |
| DevOps | Git, GitHub, Vercel, npm |
| Other | MDX, Figma, ESLint, Lenis, React Hook Form, Lucide React |

---

## 🤝 Contributing

This project is maintained by the ACM SVNIT development team. If you are a chapter member and wish to contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is the intellectual property of ACM Student Chapter, SVNIT Surat. All rights reserved.

---

<div align="center">

Built with ❤️ by the ACM SVNIT Development Team

</div>
