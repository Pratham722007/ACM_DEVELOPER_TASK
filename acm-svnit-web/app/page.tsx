import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import EventsPageContent from "@/components/sections/EventsPageContent";
import TeamPageContent from "@/components/sections/TeamPageContent";
import AboutPageContent from "@/components/sections/AboutPageContent";
import Marquee from "@/components/sections/Marquee";

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
        <Stats />
        <Marquee />
      </section>

      <section id="events">
        <EventsPageContent />
      </section>

      <section id="team" className="scroll-mt-20">
        <TeamPageContent />
      </section>

      <section id="about" className="scroll-mt-20">
        <AboutPageContent />
      </section>

    </>
  );
}
