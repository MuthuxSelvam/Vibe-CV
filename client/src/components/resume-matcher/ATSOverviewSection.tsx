import { motion } from "framer-motion";
import { Search, Database, Brain, FileText, Filter } from "lucide-react";

const cards = [
    {
        icon: FileText,
        title: "Parsing",
        desc: "Extracts text from PDF/Docx",
        color: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        icon: Search,
        title: "Keywords",
        desc: "Matches exact hard skills",
        color: "text-purple-400",
        bg: "bg-purple-500/10"
    },
    {
        icon: Brain,
        title: "Semantic",
        desc: "Understands context & intent",
        color: "text-pink-400",
        bg: "bg-pink-500/10"
    },
    {
        icon: Database,
        title: "Scoring",
        desc: "Weighted relevance algorithm",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10"
    },
    {
        icon: Filter,
        title: "Ranking",
        desc: "Sorts candidates by fit",
        color: "text-orange-400",
        bg: "bg-orange-500/10"
    }
];

export function ATSOverviewSection() {
    return (
        <section className="py-8">
            <div className="flex items-center gap-2 mb-4 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">How ATS Works</span>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default overflow-hidden"
                    >
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent via-transparent to-${card.color.split('-')[1]}-500/10`} />

                        <div className={`w-8 h-8 rounded-lg ${card.bg} ${card.color} flex items-center justify-center mb-3`}>
                            <card.icon className="w-4 h-4" />
                        </div>

                        <h3 className="text-sm font-semibold text-slate-200 mb-1">{card.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
