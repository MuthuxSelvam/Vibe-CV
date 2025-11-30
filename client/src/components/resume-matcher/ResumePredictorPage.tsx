import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlobalStatusBar } from "./GlobalStatusBar";
import { ATSOverviewSection } from "./ATSOverviewSection";
import { PredictorPanel } from "./PredictorPanel";
import { ResultsDashboard } from "./ResultsDashboard";
import type { MatchResult } from "./types";

export function ResumePredictorPage() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<MatchResult | null>(null);

    const handleAnalyze = async (data: { resumeText: string; jobDescription: string }) => {
        setIsAnalyzing(true);

        // Simulate API call
        setTimeout(() => {
            // Mock result
            const mockResult: MatchResult = {
                score: 78,
                prediction: "likely",
                matchedSkills: [
                    { skill: "React", confidence: 0.9 },
                    { skill: "TypeScript", confidence: 0.9 },
                    { skill: "Node.js", confidence: 0.8 },
                    { skill: "Tailwind CSS", confidence: 0.85 },
                    { skill: "Git", confidence: 0.95 }
                ],
                missingSkills: [
                    { skill: "GraphQL", priority: "medium" },
                    { skill: "AWS", priority: "high" },
                    { skill: "Docker", priority: "medium" }
                ],
                semanticScore: 0.82,
                experienceFit: {
                    yearsMatching: 3,
                    roleMatchScore: 0.85
                },
                suggestions: [
                    "Add more quantifiable metrics to your 'Senior Developer' role.",
                    "Include 'AWS' and 'Docker' in your skills section to match the JD requirements.",
                    "Expand on your experience with 'GraphQL' if applicable."
                ],
                timestamp: new Date().toISOString()
            };

            setResult(mockResult);
            setIsAnalyzing(false);
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-purple-500/30 pb-20">
            <GlobalStatusBar />

            <div className="container max-w-5xl mx-auto px-6 pt-8">
                {/* Main Content */}
                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-12"
                        >
                            <PredictorPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
                            <ATSOverviewSection />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ResultsDashboard result={result} onReset={() => setResult(null)} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
