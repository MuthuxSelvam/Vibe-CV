import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Persona } from "@shared/schema";

interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  isTransitioning: boolean;
}

const PersonaContext = createContext<PersonaContextType | null>(null);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>("recruiter");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setPersona = useCallback((newPersona: Persona) => {
    if (newPersona === persona) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPersonaState(newPersona);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  }, [persona]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("persona-recruiter", "persona-techLead", "persona-founder", "persona-visitor");
    root.classList.add(`persona-${persona}`);
    
    if (persona === "techLead") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [persona]);

  return (
    <PersonaContext.Provider value={{ persona, setPersona, isTransitioning }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return context;
}
