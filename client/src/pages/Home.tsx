import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { IdentitySelector } from "@/components/IdentitySelector";
import { Hero as ProfileHero } from "@/components/Hero";
import { SkillsGrid } from "@/components/SkillsGrid";
import { MetricsPanel } from "@/components/MetricsPanel";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsSection } from "@/components/ProjectCard";
import { FunFactsSection } from "@/components/FunFactsSection";
import { ATSEducationPanel } from "@/components/ATSEducationPanel";
import { JobMatchPanel } from "@/components/JobMatchPanel";
import { Footer } from "@/components/Footer";
import type { Persona } from "@shared/schema";

// New Landing Page Components
import { HeroSection } from "@/components/landing/HeroSection";
import { StorySection } from "@/components/landing/StorySection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { CTASection } from "@/components/landing/CTASection";

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

function VisitorLayout() {
  return (
    <>
      <FunFactsSection />
      <SkillsGrid />
      <ProjectsSection />
    </>
  );
}

import { ResumePredictorPage } from "@/components/resume-matcher/ResumePredictorPage";

function ResumeMatcherLayout() {
  return <ResumePredictorPage />;
}

function LandingPageLayout() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <FeaturesSection />
      <SocialProofSection />
      <CTASection />
    </>
  );
}

const layouts: Record<Persona, () => JSX.Element> = {
  recruiter: LandingPageLayout, // Mapped to "Home"
  techLead: TechLeadLayout,
  founder: LandingPageLayout, // Fallback
  visitor: VisitorLayout,
  resumeMatcher: ResumeMatcherLayout
};

export default function Home() {
  const { persona, isTransitioning } = usePersona();
  const Layout = layouts[persona] || LandingPageLayout;
  const isLandingPage = persona === 'recruiter' || persona === 'founder';

  return (
    <div className="min-h-screen transition-colors duration-500 bg-slate-950" data-testid="home-page">
      <IdentitySelector />

      {!isLandingPage && <ProfileHero />}

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
