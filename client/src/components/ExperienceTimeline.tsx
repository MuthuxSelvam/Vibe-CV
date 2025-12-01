import { motion } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { resumeData } from "@/data/resumeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, CheckCircle2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
};

export function ExperienceTimeline() {
  const { persona } = usePersona();
  const experiences = resumeData.experience;

  return (
    <section className="py-16 relative overflow-hidden" data-testid="experience-section">
      {/* Particle effects for visitor/About Me persona */}
      {persona === "visitor" && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {persona === "recruiter" ? "Professional Experience" :
            persona === "techLead" ? "Engineering Journey" : "Career Path"}
        </motion.h2>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative pl-12 pb-12 last:pb-0"
              data-testid={`experience-item-${index}`}
            >
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                <Building2 className="w-4 h-4 text-primary-foreground" />
              </div>

              <Card className="hover-elevate">
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">{exp.role}</CardTitle>
                      <p className="text-muted-foreground font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {exp.startDate} — {exp.endDate}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  {(persona === "recruiter" || persona === "techLead") && (
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.techStack && persona === "techLead" && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
