import { motion } from "framer-motion";
import { Users, Brain, Sparkles, MessageSquare, Zap, ArrowRight } from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Adaptive Personality Engine",
        description: "Your resume changes based on who's viewing.",
        details: [
            "Recruiter View: Results, skills, clarity",
            "Tech Lead View: Architecture, code, stack",
            "Visitor View: Story, journey, personality",
            "Resume Match View: AI-powered job matching"
        ],
        gradient: "from-blue-500 to-cyan-500",
        iconBg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/20"
    },
    {
        icon: Brain,
        title: "AI-Powered Resume Matching",
        description: "Paste a job description → Upload your resume → Get an instant Match Score.",
        details: [
            "Keyword coverage & Skill overlap",
            "Gaps & missing requirements",
            "Experience fit & Semantic similarity",
            "ATS readiness"
        ],
        gradient: "from-purple-500 to-pink-500",
        iconBg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/20"
    },
    {
        icon: Sparkles,
        title: "Crystal-Clean Glassmorphic UI",
        description: "Your portfolio shouldn't feel corporate or boring.",
        details: [
            "Frosted glass layers with depth",
            "3D scenes and motion effects",
            "Soft gradients & hover lighting",
            "Fluid transitions throughout"
        ],
        gradient: "from-pink-500 to-rose-500",
        iconBg: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
        border: "border-pink-500/20"
    },
    {
        icon: MessageSquare,
        title: "Smart Storytelling Engine",
        description: "Your summary is rewritten dynamically in multiple tones.",
        details: [
            "Professional (Recruiter)",
            "Technical (Tech Lead)",
            "Product-thinking (Founder)",
            "Simple & Human (Visitor)"
        ],
        gradient: "from-orange-500 to-amber-500",
        iconBg: "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
        border: "border-orange-500/20"
    },
    {
        icon: Zap,
        title: "Auto-Highlight What Matters",
        description: "Depending on the persona, we highlight different things.",
        details: [
            "Recruiters → achievements + metrics",
            "Tech leads → architecture + repos",
            "Visitors → personality + journey",
            "ATS → skill density + keywords"
        ],
        gradient: "from-emerald-500 to-teal-500",
        iconBg: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
        border: "border-emerald-500/20"
    }
];

export function FeaturesSection() {
    return (
        <section className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-[150px]" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>What Makes VibeCV Different</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        How VibeCV Works
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        VibeCV transforms your plain resume into an{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                            interactive identity system
                        </span>
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`group relative bg-white/5 backdrop-blur-sm border ${feature.border} rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 cursor-default overflow-hidden`}
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient} blur-2xl -z-10`} />

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-all">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Details list */}
                            <ul className="space-y-2.5">
                                {feature.details.map((detail, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${feature.gradient} mt-1.5 shrink-0`} />
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Arrow icon */}
                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowRight className={`w-5 h-5 bg-gradient-to-br ${feature.gradient} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent' }} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
