import { motion } from "framer-motion";

export function StorySection() {
    return (
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                        You’re better than what your old PDF shows.
                        <br />
                        <span className="text-purple-400">VibeCV finally reveals the real you.</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-red-400 mb-4">The Old Way</h3>
                            <ul className="space-y-3 text-slate-400">
                                <li className="flex items-start gap-2">❌ Traditional resumes hide your strengths.</li>
                                <li className="flex items-start gap-2">❌ ATS bots ignore your impact.</li>
                                <li className="flex items-start gap-2">❌ Recruiters skim for 6 seconds.</li>
                                <li className="flex items-start gap-2">❌ Tech leads can’t see your depth.</li>
                            </ul>
                        </div>

                        <div className="bg-purple-500/10 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-green-400 mb-4">The VibeCV Way</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-start gap-2">✅ VibeCV adapts — intelligently.</li>
                                <li className="flex items-start gap-2">✅ Speaks the right language.</li>
                                <li className="flex items-start gap-2">✅ To the right person.</li>
                                <li className="flex items-start gap-2">✅ At the right moment.</li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-2xl font-medium text-slate-200">
                        Your PDF never could.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
