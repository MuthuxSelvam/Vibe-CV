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
import { ATSEducationPanel } from "@/components/ATSEducationPanel";
import { JobMatchPanel } from "@/components/JobMatchPanel";
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

function ResumeMatcherLayout() {
  return (
    <>
      <section className="py-12 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-3">AI-Powered Resume Analysis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understand how ATS systems work and predict your job match score with AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ATSEducationPanel />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <JobMatchPanel />
            </motion.div>
          </div>
        </div>
      </section>
      <MetricsPanel />
      <SkillsGrid />
      <ExperienceTimeline />
      <ProjectsSection />
    </>
  );
}

const layouts: Record<Persona, () => JSX.Element> = {
  recruiter: RecruiterLayout,
  techLead: TechLeadLayout,
  founder: FounderLayout,
  visitor: VisitorLayout,
  resumeMatcher: ResumeMatcherLayout
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
