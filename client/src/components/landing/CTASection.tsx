import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { usePersona } from "@/context/PersonaContext";

export function CTASection() {
    const { setPersona } = usePersona();

    const handleResumeMatcherClick = () => {
        setPersona("resumeMatcher");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="py-32 bg-gradient-to-b from-slate-900 to-indigo-950 text-white text-center">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Stop hoping your resume gets noticed.
                        <br />
                        <span className="text-purple-400">Start making sure it does.</span>
                    </h2>

                    <p className="text-xl text-slate-300 mb-12">
                        You've worked hard. Your portfolio should work harder.
                        <br />
                        <span className="text-white font-semibold">Own your story. Show your value. Get results.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-purple-900 hover:bg-slate-100 text-lg h-14 px-10 rounded-full shadow-xl shadow-purple-500/20 transition-all hover:scale-105">
                            Start Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleResumeMatcherClick}
                            className="border-white/30 text-white hover:bg-white/10 text-lg h-14 px-10 rounded-full backdrop-blur-sm transition-all hover:scale-105"
                        >
                            Try Resume Match Predictor
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
