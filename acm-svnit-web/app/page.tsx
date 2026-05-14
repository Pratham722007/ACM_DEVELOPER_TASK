import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import EventsPageContent from "@/components/sections/EventsPageContent";
import TeamPageContent from "@/components/sections/TeamPageContent";
import DomainCards from "@/components/sections/DomainCards";
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

      <section id="team" className="pt-20">
        <TeamPageContent />
      </section>

      <section id="domains" className="pt-20">
        <DomainCards />
      </section>

      <section id="about" className="pt-20">
        <AboutPageContent />
      </section>

    </>
  );
}
