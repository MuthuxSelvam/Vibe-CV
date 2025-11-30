import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, ArrowRight, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PredictorPanelProps {
    onAnalyze: (data: { resumeText: string; jobDescription: string }) => void;
    isAnalyzing: boolean;
}

export function PredictorPanel({ onAnalyze, isAnalyzing }: PredictorPanelProps) {
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [activeTab, setActiveTab] = useState("paste");

    const handleAnalyze = () => {
        if (!resumeText || !jobDescription) return;
        onAnalyze({ resumeText, jobDescription });
    };

    return (
        <>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight">
                AI-Powered Resume Analysis
            </h1>

            <Card className="bg-slate-900/50 border-white/10 p-6 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50" />

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Job Description Input */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs border border-purple-500/30">1</span>
                                Job Description
                            </h3>
                            <span className="text-xs text-slate-500">Paste the JD here</span>
                        </div>

                        <Textarea
                            placeholder="Paste the full job description here (responsibilities, requirements, etc.)..."
                            className="h-64 bg-slate-950/50 border-white/10 focus:border-purple-500/50 text-slate-300 resize-none font-mono text-sm"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    {/* Resume Input */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs border border-blue-500/30">2</span>
                                Your Resume
                            </h3>
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                                <TabsList className="h-7 bg-slate-950/50 border border-white/10">
                                    <TabsTrigger value="paste" className="text-xs h-5 data-[state=active]:bg-slate-800">Paste Text</TabsTrigger>
                                    <TabsTrigger value="upload" className="text-xs h-5 data-[state=active]:bg-slate-800">Upload PDF</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {activeTab === "paste" ? (
                            <Textarea
                                placeholder="Paste your resume content here..."
                                className="h-64 bg-slate-950/50 border-white/10 focus:border-blue-500/50 text-slate-300 resize-none font-mono text-sm"
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                            />
                        ) : (
                            <div className="h-64 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center bg-slate-950/30 hover:bg-slate-950/50 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="w-5 h-5 text-slate-400" />
                                </div>
                                <p className="text-sm text-slate-400 font-medium">Click to upload PDF</p>
                                <p className="text-xs text-slate-600 mt-1">Max file size 5MB</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <Button
                        size="lg"
                        onClick={handleAnalyze}
                        disabled={!resumeText || !jobDescription || isAnalyzing}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20 px-8 h-12 text-base"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Analyzing Match...
                            </>
                        ) : (
                            <>
                                Analyze Match Score
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </Button>
                </div>
            </Card>
        </>
    );
}
