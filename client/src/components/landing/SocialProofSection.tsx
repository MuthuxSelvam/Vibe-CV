import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function SocialProofSection() {
    return (
        <section className="py-24 bg-slate-950 text-white relative">
            <div className="container mx-auto px-6">

                {/* Why It Matters */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Because hiring is unfair — unless you upgrade the way you present yourself.
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-8 text-left text-slate-400">
                        <ul className="space-y-2">
                            <li>• ATS bots decide before humans do</li>
                            <li>• Recruiters skim</li>
                            <li>• Tech leads judge depth</li>
                        </ul>
                        <ul className="space-y-2">
                            <li>• HR checks personality fit</li>
                            <li>• PDFs can’t adapt</li>
                            <li>• Templates all look the same</li>
                        </ul>
                    </div>
                    <p className="text-xl font-semibold text-purple-400 mt-8">
                        VibeCV solves everything traditional resumes fail at.
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "VibeCV is the first portfolio I’ve ever seen that adapts to me. I wish every candidate had this.",
                            author: "Senior Recruiter, SaaS Company"
                        },
                        {
                            quote: "Finally a portfolio where I don’t have to dig to understand a candidate.",
                            author: "Engineering Manager"
                        },
                        {
                            quote: "This is the future of resumes.",
                            author: "Product Designer"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white/5 p-8 rounded-2xl border border-white/10 relative"
                        >
                            <Quote className="w-8 h-8 text-purple-500/30 mb-4" />
                            <p className="text-lg text-slate-300 mb-6 italic">"{item.quote}"</p>
                            <p className="text-sm font-semibold text-white">— {item.author}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
