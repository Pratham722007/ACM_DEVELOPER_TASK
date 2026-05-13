import type { Metadata } from "next";
import DomainsPageContent from "@/components/sections/DomainsPageContent";

export const metadata: Metadata = {
  title: "Domains",
  description:
    "Discover the six specialized domains at ACM SVNIT — Web Development, Machine Learning, Competitive Programming, Cybersecurity, UI/UX Design, and Open Source.",
};

export default function DomainsPage() {
  return <DomainsPageContent />;
}
