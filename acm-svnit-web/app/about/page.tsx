import type { Metadata } from "next";
import AboutPageContent from "@/components/sections/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ACM SVNIT — our history, mission, vision, faculty advisors, and how to get involved in one of India's top ACM student chapters.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
