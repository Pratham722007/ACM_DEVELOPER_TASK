import type { Metadata } from "next";
import EventsPageContent from "@/components/sections/EventsPageContent";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore all ACM SVNIT events — hackathons, workshops, tech talks, and coding competitions. Stay updated and register for upcoming events.",
};

export default function EventsPage() {
  return <EventsPageContent />;
}
