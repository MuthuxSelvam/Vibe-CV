import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { usePersona } from "@/context/PersonaContext";

export function HeroSection() {
    const { setPersona } = usePersona();

    const handleResumeMatcherClick = () => {
        setPersona("resumeMatcher");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />

                {/* Spline Placeholder / Embed */}
                <div className="absolute inset-0 opacity-40">
                    {/* Replace with actual Spline embed URL if available */}
                    {/* <iframe src="https://my.spline.design/..." className="w-full h-full border-0" /> */}
                    <div className="w-full h-full flex items-center justify-center text-white/10 text-9xl font-bold">
                        3D DEPTH
                    </div>
                </div>
            </div>

            {/* Glassmorphic Content */}
            <div className="container relative z-10 mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-purple-200">
                            <Sparkles className="w-4 h-4" />
                            <span>The Future of Resumes is Here</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                            Hey There! I'm Muthu — <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                And Let Me Guess...
                            </span>
                        </h1>

                        <div className="space-y-4 text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl">
                            <p>
                                Refreshing Gmail… Waiting for that magical subject line…
                                <br />
                                <strong className="text-white">"Congratulations, you've been shortlisted!"</strong>
                                <br />
                                But getting the same silence again and again?
                            </p>
                            <p>
                                Yeah. I know exactly how that feels.
                            </p>
                            <p className="text-2xl font-semibold text-white pt-4">
                                But the good news? That ends today.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="bg-white text-purple-900 hover:bg-slate-100 text-lg h-14 px-8 rounded-full shadow-lg shadow-purple-500/20 transition-all hover:scale-105">
                                Build Your VibeCV
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={handleResumeMatcherClick}
                                className="border-white/30 text-white hover:bg-white/10 text-lg h-14 px-8 rounded-full backdrop-blur-sm transition-all hover:scale-105"
                            >
                                Try Resume Match Predictor
                            </Button>
                        </div>
                    </motion.div>

                    {/* Visual/Hero Image Side (Glass Card) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl" />

                            <div className="space-y-6">
                                <div className="h-4 w-1/3 bg-white/20 rounded-full" />
                                <div className="h-8 w-3/4 bg-white/30 rounded-full" />
                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-white/10 rounded-full" />
                                    <div className="h-4 w-full bg-white/10 rounded-full" />
                                    <div className="h-4 w-2/3 bg-white/10 rounded-full" />
                                </div>

                                <div className="p-4 bg-black/20 rounded-xl border border-white/5 mt-8">
                                    <p className="text-sm text-slate-300 italic">
                                        "Wow. This candidate stands out."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full blur-xl opacity-50 animate-pulse" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
