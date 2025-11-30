import { motion, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePersona } from "@/context/PersonaContext";
import { resumeData } from "@/data/resumeData";
import { Card, CardContent } from "@/components/ui/card";

function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const numericPart = value.replace(/[^0-9.]/g, "");
  const prefix = value.replace(/[0-9.+%MKk]/g, "").trim();
  const numericSuffix = value.replace(numericPart, "").replace(prefix, "");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    
    const target = parseFloat(numericPart) || 0;
    let current = 0;
    
    const controls = animate(current, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (target >= 100) {
          setDisplayValue(Math.round(latest).toString());
        } else {
          setDisplayValue(latest.toFixed(target % 1 !== 0 ? 1 : 0));
        }
      }
    });

    return () => controls.stop();
  }, [numericPart]);

  return (
    <span>
      {prefix}{displayValue}{numericSuffix}
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export function MetricsPanel() {
  const { persona } = usePersona();
  const metrics = resumeData.metrics;

  if (persona === "visitor") {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30" data-testid="metrics-section">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {persona === "recruiter" ? "Key Achievements" : 
           persona === "techLead" ? "Engineering Impact" : "By the Numbers"}
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {metrics.map((metric, index) => (
            <motion.div key={metric.label} variants={itemVariants}>
              <Card className="h-full text-center hover-elevate">
                <CardContent className="pt-6 pb-4">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-primary mb-2"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    data-testid={`text-metric-value-${index}`}
                  >
                    <AnimatedCounter value={metric.value} />
                  </motion.div>
                  <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    {metric.label}
                  </p>
                  {metric.description && persona === "recruiter" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.description}
                    </p>
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
