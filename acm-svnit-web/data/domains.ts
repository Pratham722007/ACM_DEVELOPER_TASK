import { Domain } from "@/types";

export const domains: Domain[] = [
  {
    id: "web-dev",
    name: "Web Development",
    icon: "Globe",
    description:
      "Building modern, responsive web applications using cutting-edge frameworks and technologies. From full-stack development to progressive web apps, we explore the entire web ecosystem.",
    memberCount: 180,
    color: "#2563EB",
    recentProjects: [
      "ACM SVNIT Official Website Redesign",
      "Event Management Portal",
      "Alumni Network Platform",
      "Campus Navigation PWA",
      "Open Source Contribution Tracker",
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    icon: "Brain",
    description:
      "Exploring artificial intelligence, deep learning, and data science. From neural networks to NLP, we dive deep into the algorithms shaping the future of technology.",
    memberCount: 150,
    color: "#8B5CF6",
    recentProjects: [
      "Campus Sentiment Analyzer",
      "Traffic Flow Prediction Model",
      "Handwriting Recognition System",
      "Smart Attendance using Face Recognition",
      "Research Paper Recommendation Engine",
    ],
  },
  {
    id: "competitive-programming",
    name: "Competitive Programming",
    icon: "Code",
    description:
      "Sharpening algorithmic thinking and problem-solving skills through competitive programming contests, practice sessions, and inter-college challenges.",
    memberCount: 200,
    color: "#EF4444",
    recentProjects: [
      "Weekly CP Contest Series",
      "ICPC Regional Preparation Boot Camp",
      "Algorithm Visualization Tool",
      "CP Problem Archive & Editorials",
      "Inter-College Programming League",
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "Shield",
    description:
      "Understanding and implementing security protocols, ethical hacking, penetration testing, and building secure systems. We make the digital world safer.",
    memberCount: 120,
    color: "#10B981",
    recentProjects: [
      "CTF Competition Hosting Platform",
      "Network Vulnerability Scanner",
      "Security Awareness Workshop Series",
      "Encrypted Messaging Prototype",
      "Web Application Firewall",
    ],
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    icon: "Palette",
    description:
      "Crafting intuitive, beautiful user interfaces and experiences. We focus on design thinking, user research, prototyping, and creating pixel-perfect designs.",
    memberCount: 100,
    color: "#F59E0B",
    recentProjects: [
      "Design System for ACM Products",
      "Mobile App UI Kit",
      "UX Research Case Study — Campus App",
      "Figma Component Library",
      "Brand Identity Refresh",
    ],
  },
  {
    id: "open-source",
    name: "Open Source",
    icon: "GitBranch",
    description:
      "Contributing to and maintaining open-source projects. We believe in the power of collaborative software development and community-driven innovation.",
    memberCount: 100,
    color: "#0EA5E9",
    recentProjects: [
      "Hacktoberfest Participation Drive",
      "Open Source CLI Tools",
      "GitHub Actions Workflow Templates",
      "Community Documentation Initiative",
      "First-Timer Contribution Program",
    ],
  },
];
