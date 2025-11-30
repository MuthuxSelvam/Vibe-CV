import { motion } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { resumeData } from "@/data/resumeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Lightbulb, Target, TrendingUp, ArrowRight } from "lucide-react";
import { CodeShowcase } from "./CodeShowcase";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export function ProjectsSection() {
  const { persona } = usePersona();
  const projects = resumeData.projects;

  const title = {
    recruiter: "Featured Projects",
    techLead: "Technical Portfolio",
    founder: "Case Studies",
    visitor: "Cool Stuff I Built"
  }[persona];

  return (
    <section className="py-16" data-testid="projects-section">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        <motion.div
          className={persona === "founder" ? "space-y-16" : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              {persona === "founder" ? (
                <FounderProjectCard project={project} index={index} />
              ) : persona === "techLead" ? (
                <TechLeadProjectCard project={project} index={index} />
              ) : (
                <DefaultProjectCard project={project} index={index} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DefaultProjectCard({ project, index }: { project: typeof resumeData.projects[0]; index: number }) {
  return (
    <Card className="h-full hover-elevate group" data-testid={`project-card-${index}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{project.title}</span>
          {project.link && (
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TechLeadProjectCard({ project, index }: { project: typeof resumeData.projects[0]; index: number }) {
  return (
    <Card className="h-full" data-testid={`project-card-${index}`}>
      <CardHeader>
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs font-mono">
              {tech}
            </Badge>
          ))}
        </div>
        {project.codeSnippet && project.codeLanguage && (
          <CodeShowcase 
            code={project.codeSnippet} 
            language={project.codeLanguage} 
            title={project.title}
          />
        )}
      </CardContent>
    </Card>
  );
}

function FounderProjectCard({ project, index }: { project: typeof resumeData.projects[0]; index: number }) {
  return (
    <div className="space-y-8" data-testid={`project-card-${index}`}>
      <div className="grid md:grid-cols-3 gap-8">
        {project.problem && (
          <Card className="hover-elevate">
            <CardHeader>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                <Lightbulb className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wide">The Problem</span>
              </div>
              <CardTitle className="text-lg">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.problem}</p>
            </CardContent>
          </Card>
        )}
        
        {project.solution && (
          <Card className="hover-elevate">
            <CardHeader>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wide">The Solution</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.solution}</p>
            </CardContent>
          </Card>
        )}
        
        {project.impact && (
          <Card className="hover-elevate">
            <CardHeader>
              <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wide">The Impact</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.impact}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Built with:</span>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        {project.link && (
          <a 
            href={project.link}
            className="ml-auto flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View Project <ArrowRight className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
