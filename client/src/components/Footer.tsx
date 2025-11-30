import { motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";
import { usePersona } from "@/context/PersonaContext";
import { ATSEducationPanel } from "./ATSEducationPanel";
import { JobMatchPanel } from "./JobMatchPanel";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Globe, Mail, Download, Heart } from "lucide-react";

export function Footer() {
  const { persona } = usePersona();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30" data-testid="footer">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a 
                href={`mailto:${resumeData.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="w-4 h-4" />
                {resumeData.email}
              </a>
              {resumeData.github && (
                <a 
                  href={`https://${resumeData.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-github"
                >
                  <Github className="w-4 h-4" />
                  {resumeData.github}
                </a>
              )}
              {resumeData.linkedin && (
                <a 
                  href={`https://${resumeData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-linkedin"
                >
                  <Linkedin className="w-4 h-4" />
                  {resumeData.linkedin}
                </a>
              )}
              {resumeData.website && (
                <a 
                  href={`https://${resumeData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-website"
                >
                  <Globe className="w-4 h-4" />
                  {resumeData.website}
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <div className="flex flex-col gap-3">
              <ATSEducationPanel />
              <JobMatchPanel />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full gap-2" asChild>
                <a href={`mailto:${resumeData.email}`} data-testid="button-contact">
                  <Mail className="w-4 h-4" />
                  Contact Me
                </a>
              </Button>
              <Button variant="outline" className="w-full gap-2" data-testid="button-download-pdf">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <motion.div 
          className="pt-8 border-t text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500" /> using VibeCV
          </p>
          <p className="mt-1">
            &copy; {currentYear} {resumeData.name}. All rights reserved.
          </p>
          <p className="mt-2 text-xs">
            Currently viewing as: <span className="font-medium capitalize">{persona}</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
