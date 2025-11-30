import { motion, AnimatePresence } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { resumeData } from "@/data/resumeData";
import { personaConfigs } from "@shared/schema";
import { Mail, MapPin, Github, Linkedin, Globe, ArrowDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const heroVariants = {
  recruiter: {
    gradient: "from-slate-50 via-slate-100 to-slate-50",
    accent: "text-primary"
  },
  techLead: {
    gradient: "from-slate-950 via-slate-900 to-slate-950",
    accent: "text-emerald-400"
  },
  founder: {
    gradient: "from-violet-50 via-purple-50 to-pink-50",
    accent: "text-violet-600"
  },
  visitor: {
    gradient: "from-amber-50 via-orange-50 to-rose-50",
    accent: "text-orange-500"
  },
  resumeMatcher: {
    gradient: "from-purple-500 via-pink-500 to-purple-500",
    accent: "text-white"
  }
};

export function Hero() {
  const { persona } = usePersona();
  const variant = heroVariants[persona];
  const summary = resumeData.summary[persona];
  const config = personaConfigs[persona];

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-700 bg-gradient-to-br ${variant.gradient}`}
      data-testid="hero-section"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {persona === "techLead" && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px"
            }} />
          </div>
        )}
        {persona === "founder" && (
          <motion.div
            className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-br from-violet-200/30 to-pink-200/30 blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        )}
        {persona === "visitor" && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </>
        )}
      </div>

      <motion.div
        className="container max-w-4xl mx-auto px-6 text-center z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Avatar className="w-28 h-28 mx-auto border-4 border-background shadow-xl">
            <AvatarFallback className={`text-3xl font-bold ${variant.accent} bg-muted`}>
              {resumeData.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
              data-testid="text-name"
            >
              {resumeData.name}
            </h1>

            <p className={`text-xl md:text-2xl font-medium mb-6 ${variant.accent}`}>
              {resumeData.title}
            </p>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {summary}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-8 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {resumeData.location && (
            <span className="flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4" />
              {resumeData.location}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-sm">
            <Mail className="w-4 h-4" />
            {resumeData.email}
          </span>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {resumeData.github && (
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <a href={`https://${resumeData.github}`} target="_blank" rel="noopener noreferrer" data-testid="link-github">
                <Github className="w-5 h-5" />
              </a>
            </Button>
          )}
          {resumeData.linkedin && (
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <a href={`https://${resumeData.linkedin}`} target="_blank" rel="noopener noreferrer" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
          )}
          {resumeData.website && (
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <a href={`https://${resumeData.website}`} target="_blank" rel="noopener noreferrer" data-testid="link-website">
                <Globe className="w-5 h-5" />
              </a>
            </Button>
          )}
          <Button variant="outline" size="icon" asChild className="rounded-full">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" title="Download Resume">
              <FileText className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>

        <motion.p
          className="mt-6 text-sm text-muted-foreground italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Viewing as: <span className="font-medium">{config.tone}</span>
        </motion.p>
      </motion.div>

      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        data-testid="button-scroll-down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
