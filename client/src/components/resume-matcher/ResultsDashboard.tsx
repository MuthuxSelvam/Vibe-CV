import { motion } from "framer-motion";
import { Check, X, AlertTriangle, ArrowRight, Download, Share2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { MatchResult } from "./types";

interface ResultsDashboardProps {
    result: MatchResult;
    onReset: () => void;
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 75) return "text-emerald-400";
        if (score >= 50) return "text-amber-400";
        return "text-red-400";
    };

    const getScoreGradient = (score: number) => {
        if (score >= 75) return "from-emerald-500 to-teal-500";
        if (score >= 50) return "from-amber-500 to-orange-500";
        return "from-red-500 to-pink-500";
    };

    return (
        <div className="space-y-6">
            {/* Top Score Card */}
            <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="md:col-span-1 bg-slate-900/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(result.score)} opacity-10`} />

                    <div className="relative z-10 text-center">
                        <h3 className="text-sm font-medium text-slate-400 mb-2">Match Score</h3>
                        <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                            {result.score}%
                        </div>
                        <Badge variant="outline" className={`capitalize ${result.prediction === 'likely' ? 'border-emerald-500/50 text-emerald-400' :
                                result.prediction === 'borderline' ? 'border-amber-500/50 text-amber-400' :
                                    'border-red-500/50 text-red-400'
                            }`}>
                            {result.prediction} to Shortlist
                        </Badge>
                    </div>
                </motion.div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                        <h4 className="text-sm font-medium text-slate-400 mb-4">Breakdown</h4>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-300">Hard Skills</span>
                                    <span className="text-slate-500">85%</span>
                                </div>
                                <Progress value={85} className="h-1.5 bg-slate-800" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-300">Experience Fit</span>
                                    <span className="text-slate-500">60%</span>
                                </div>
                                <Progress value={60} className="h-1.5 bg-slate-800" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-300">Semantic Match</span>
                                    <span className="text-slate-500">92%</span>
                                </div>
                                <Progress value={92} className="h-1.5 bg-slate-800" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Quick Actions</h4>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start text-xs h-8 border-white/10 hover:bg-white/5">
                                <Download className="w-3 h-3 mr-2" /> Export Report
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-xs h-8 border-white/10 hover:bg-white/5">
                                <Share2 className="w-3 h-3 mr-2" /> Share Result
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={onReset}
                                className="w-full justify-start text-xs h-8 text-slate-400 hover:text-white hover:bg-white/5"
                            >
                                <RefreshCw className="w-3 h-3 mr-2" /> Analyze Another
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-400" />
                        Matched Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {result.matchedSkills.map((item, i) => (
                            <Badge key={i} variant="secondary" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20">
                                {item.skill}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {result.missingSkills.map((item, i) => (
                            <Badge key={i} variant="outline" className="border-red-500/30 text-red-400 bg-red-500/5">
                                {item.skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Improvement Suggestions</h3>
                <ul className="space-y-3">
                    {result.suggestions.map((suggestion, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
