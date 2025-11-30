import { motion } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { resumeData } from "@/data/resumeData";
import { Badge } from "@/components/ui/badge";

const categoryColors: Record<string, string> = {
  Languages: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  Frontend: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  Backend: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  Database: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  Cloud: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
  DevOps: "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20",
  API: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
  Architecture: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  "Soft Skills": "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20"
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export function SkillsGrid() {
  const { persona } = usePersona();
  const skills = resumeData.skills;
  
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const showProficiency = persona === "techLead";

  return (
    <section className="py-16" data-testid="skills-section">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {persona === "recruiter" ? "Technical Skills & Expertise" : 
           persona === "techLead" ? "Tech Stack Proficiency" :
           persona === "founder" ? "Tools & Technologies" : "Things I Work With"}
        </motion.h2>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="group relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Badge
                      variant="outline"
                      className={`px-3 py-1.5 text-sm font-medium border ${categoryColors[category] || "bg-muted"}`}
                      data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {skill.name}
                      {showProficiency && (
                        <span className="ml-2 text-xs opacity-70">{skill.proficiency}%</span>
                      )}
                    </Badge>
                    {showProficiency && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-current opacity-30"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: skill.proficiency / 100 }}
                        style={{ transformOrigin: "left" }}
                        viewport={{ once: true }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
