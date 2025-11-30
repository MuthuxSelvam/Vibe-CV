import { motion } from "framer-motion";
import { usePersona } from "@/context/PersonaContext";
import { resumeData } from "@/data/resumeData";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BadgeCheck } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export function Certifications() {
  const { persona } = usePersona();
  const certifications = resumeData.certifications || [];

  if (persona !== "recruiter" || certifications.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30" data-testid="certifications-section">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Award className="w-8 h-8 text-primary" />
          Certifications
        </motion.h2>

        <motion.div
          className="grid gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover-elevate">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BadgeCheck className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{cert}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
