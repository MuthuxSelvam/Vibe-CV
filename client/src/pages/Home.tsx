import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { IdentitySelector } from "@/components/IdentitySelector";
import { Hero } from "@/components/Hero";
import { SkillsGrid } from "@/components/SkillsGrid";
import { MetricsPanel } from "@/components/MetricsPanel";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsSection } from "@/components/ProjectCard";
import { FunFactsSection } from "@/components/FunFactsSection";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";
import type { Persona } from "@shared/schema";

function RecruiterLayout() {
  return (
    <>
      <MetricsPanel />
      <SkillsGrid />
      <ExperienceTimeline />
      <Certifications />
      <ProjectsSection />
    </>
  );
}

function TechLeadLayout() {
  return (
    <>
      <SkillsGrid />
      <ProjectsSection />
      <ExperienceTimeline />
      <MetricsPanel />
    </>
  );
}

function FounderLayout() {
  return (
    <>
      <ProjectsSection />
      <MetricsPanel />
      <ExperienceTimeline />
      <SkillsGrid />
    </>
  );
}

function VisitorLayout() {
  return (
    <>
      <FunFactsSection />
      <SkillsGrid />
      <ProjectsSection />
    </>
  );
}

const layouts: Record<Persona, () => JSX.Element> = {
  recruiter: RecruiterLayout,
  techLead: TechLeadLayout,
  founder: FounderLayout,
  visitor: VisitorLayout
};

export default function Home() {
  const { persona, isTransitioning } = usePersona();
  const Layout = layouts[persona];

  return (
    <div className="min-h-screen transition-colors duration-500" data-testid="home-page">
      <IdentitySelector />
      <Hero />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={persona}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={isTransitioning ? "pointer-events-none" : ""}
        >
          <Layout />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
