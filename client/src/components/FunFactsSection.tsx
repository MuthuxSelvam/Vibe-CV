import { motion } from "framer-motion";
import { resumeData } from "@/data/resumeData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Mountain, Cat, Cookie, Gamepad2, Music, Camera, Heart, Sparkles, Code2, Globe, Rocket } from "lucide-react";

const iconMap: Record<string, typeof Coffee> = {
  coffee: Coffee,
  hiking: Mountain,
  cat: Cat,
  bread: Cookie,
  gamepad: Gamepad2,
  music: Music,
  camera: Camera,
  heart: Heart,
  sparkles: Sparkles,
  code: Code2,
  globe: Globe,
  rocket: Rocket
};

const colorPalette = [
  { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-600 dark:text-rose-400", icon: "text-rose-500" },
  { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-600 dark:text-amber-400", icon: "text-amber-500" },
  { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", icon: "text-emerald-500" },
  { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-600 dark:text-blue-400", icon: "text-blue-500" },
  { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-600 dark:text-violet-400", icon: "text-violet-500" },
  { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-600 dark:text-pink-400", icon: "text-pink-500" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.4 }
  }
};

export function FunFactsSection() {
  const funFacts = resumeData.funFacts || [];
  const hobbies = resumeData.hobbies || [];

  return (
    <section className="py-16 relative overflow-hidden" data-testid="fun-facts-section">
      {/* Particle effects */}
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

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Beyond the Code
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A few things that make me, well... me.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {funFacts.map((fact, index) => {
            const Icon = iconMap[fact.icon] || Sparkles;
            const color = colorPalette[index % colorPalette.length];

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`h-full hover-elevate group cursor-default ${color.bg} ${color.border}`}
                  data-testid={`fun-fact-card-${index}`}
                >
                  <CardContent className="pt-6">
                    <motion.div
                      className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <Icon className={`w-6 h-6 ${color.icon}`} />
                    </motion.div>
                    <h3 className={`text-lg font-semibold mb-2 ${color.text}`}>
                      {fact.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {fact.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {hobbies.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
              Things I Love
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {hobbies.map((hobby, index) => {
                const color = colorPalette[index % colorPalette.length];
                return (
                  <motion.div
                    key={hobby}
                    whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="outline"
                      className={`px-4 py-1.5 text-sm ${color.bg} ${color.border} ${color.text}`}
                    >
                      {hobby}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-orange-500/10 border border-violet-500/20"
            animate={{
              boxShadow: [
                "0 0 20px rgba(139, 92, 246, 0.1)",
                "0 0 30px rgba(236, 72, 153, 0.15)",
                "0 0 20px rgba(249, 115, 22, 0.1)",
                "0 0 20px rgba(139, 92, 246, 0.1)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-violet-500" />
            <span className="text-sm font-medium">
              Thanks for getting to know me!
            </span>
            <Heart className="w-4 h-4 text-pink-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
