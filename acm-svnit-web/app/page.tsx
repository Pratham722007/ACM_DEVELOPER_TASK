import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Marquee from "@/components/sections/Marquee";
import RecentEvents from "@/components/sections/EventCard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Marquee />
      <RecentEvents />
    </>
  );
}
