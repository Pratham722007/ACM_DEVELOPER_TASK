# ACM SVNIT Website

The official website of the **ACM Student Chapter at SVNIT Surat** — built with modern web technologies to showcase our events, team, and domains.

> **"Where Curiosity Meets Code"**

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Smooth animations & transitions |
| **Lucide React** | Modern icon library |
| **React Hook Form** | Form handling & validation |

## 🏗 Architecture Decisions

### Why App Router?
Next.js App Router provides native support for:
- Server components by default (better performance)
- File-based routing with layouts
- Built-in SEO with `metadata` exports
- Streaming and Suspense out of the box

### Why Static JSON data?
- No backend dependency → deploys anywhere (Vercel, Netlify, GitHub Pages)
- Fast builds with no API calls
- Type-safe data imports with full IntelliSense
- Easy to migrate to a CMS later (just swap data sources)

### Why Framer Motion over GSAP?
- React-native API (`motion.div`, `AnimatePresence`)
- Built-in `layoutId` for shared layout animations
- `whileInView` for scroll-triggered animations without manual observers
- Better tree-shaking and bundle size for React apps
- Declarative — fits React's mental model

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Hero, stats bar, marquee, domain cards, recent events |
| `/events` | Filterable event grid with modal details |
| `/team` | Year timeline, role hierarchy, animated team cards |
| `/domains` | Expandable domain cards with projects & members |
| `/about` | Timeline, mission/vision, faculty, contact form |

## 🚀 Setup & Run

```bash
# Clone the repository
git clone https://github.com/acmsvnit/website.git
cd website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Home page
│   ├── events/page.tsx     # Events page
│   ├── team/page.tsx       # Team page
│   ├── domains/page.tsx    # Domains page
│   ├── about/page.tsx      # About page
│   └── globals.css         # Global styles & animations
├── components/
│   ├── ui/                 # Reusable UI (Navbar, Footer, Button, Badge)
│   └── sections/           # Page sections & content components
├── data/                   # Static typed data (events, team, domains, about)
├── types/                  # TypeScript type definitions
└── lib/                    # Utility functions
```

## 🔮 Future Scope

- **Member Portal** — Authentication with NextAuth, member profiles, and dashboards
- **Admin CMS** — Content management for events and team data
- **ICPC Tracker** — Track team rankings and contest history
- **Alumni Network** — Connect with past members, mentorship matching
- **MDX Blog** — Technical blog with MDX support for code examples
- **Discord Integration** — Live member count, event notifications
- **Analytics Dashboard** — Event attendance tracking, domain growth metrics
- **Dark/Light Mode Toggle** — User-preferred color scheme

## 🎯 Skills Matrix

| Skill | Application |
|-------|-------------|
| Next.js App Router | Routing, layouts, metadata |
| TypeScript | Full type safety, interfaces |
| Tailwind CSS v4 | Theme tokens, responsive design |
| Framer Motion | Scroll animations, layoutId, AnimatePresence |
| React Hook Form | Contact form validation |
| CSS Animations | Marquee, grid background, shimmer effects |
| IntersectionObserver | Count-up animation trigger |
| Component Architecture | Reusable, composable, <150 LOC each |

---

**© 2025 ACM SVNIT Chapter. All rights reserved.**
