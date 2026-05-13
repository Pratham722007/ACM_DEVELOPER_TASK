import type { Metadata } from "next";
import TeamPageContent from "@/components/sections/TeamPageContent";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the ACM SVNIT team — our leaders, domain experts, and core members across years of excellence in computing.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}
