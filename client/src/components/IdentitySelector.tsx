import { motion } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import type { Persona } from "@shared/schema";
import { Briefcase, Code2, Rocket, Sparkles, Target } from "lucide-react";

const personas: { id: Persona; label: string; icon: typeof Briefcase; description: string }[] = [
  { id: "recruiter", label: "Home", icon: Briefcase, description: "Professional overview" },
  { id: "resumeMatcher", label: "Resume Matching Predictor", icon: Target, description: "AI-powered match analysis" },
  { id: "techLead", label: "Tech Lead", icon: Code2, description: "Technical deep-dive" },
  { id: "visitor", label: "Visitor", icon: Sparkles, description: "Fun & personal" }
];

export function IdentitySelector() {
  const { persona, setPersona, isTransitioning } = usePersona();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50"
      data-testid="identity-selector"
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg">
        {personas.map((p) => {
          const Icon = p.icon;
          const isActive = persona === p.id;

          return (
            <motion.button
              key={p.id}
              onClick={() => setPersona(p.id)}
              disabled={isTransitioning}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover-elevate"
                }
              `}
              data-testid={`button-persona-${p.id}`}
              whileHover={{ scale: isActive ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activePersona"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{p.label}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
