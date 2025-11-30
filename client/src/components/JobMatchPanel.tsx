import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { JobMatchResult } from "@shared/schema";
import { 
  Target, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  BarChart3,
  Loader2,
  ArrowRight,
  FileText,
  Briefcase
} from "lucide-react";

const predictionConfig = {
  likely: { 
    color: "bg-emerald-500", 
    textColor: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    icon: CheckCircle2, 
    label: "Likely to be Shortlisted" 
  },
  borderline: { 
    color: "bg-amber-500", 
    textColor: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    icon: AlertTriangle, 
    label: "Borderline - Could Go Either Way" 
  },
  unlikely: { 
    color: "bg-red-500", 
    textColor: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    icon: XCircle, 
    label: "Unlikely to be Shortlisted" 
  }
};

function CircularProgress({ value, size = 160 }: { value: number; size?: number }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  const getColor = (score: number) => {
    if (score >= 75) return "#22c55e";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/30"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className="text-4xl font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}
        </motion.span>
        <span className="text-sm text-muted-foreground">Match Score</span>
      </div>
    </div>
  );
}

export function JobMatchPanel() {
  const [open, setOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (data: { jobDescription: string; resume: string }) => {
      const response = await apiRequest("POST", "/api/job-match", data);
      return response as JobMatchResult;
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze job match. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleAnalyze = () => {
    if (jobDescription.length < 50) {
      toast({
        title: "Job Description Too Short",
        description: "Please provide a more detailed job description (at least 50 characters).",
        variant: "destructive"
      });
      return;
    }
    if (resume.length < 50) {
      toast({
        title: "Resume Too Short",
        description: "Please provide more resume content (at least 50 characters).",
        variant: "destructive"
      });
      return;
    }
    analyzeMutation.mutate({ jobDescription, resume });
  };

  const resetAnalysis = () => {
    setResult(null);
    setJobDescription("");
    setResume("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" data-testid="button-open-job-match">
          <Target className="w-4 h-4" />
          Job Match Predictor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="job-match-panel">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Job Match Predictor
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <p className="text-muted-foreground">
                Paste a job description and resume to get an AI-powered match analysis 
                with skills gap identification and shortlist prediction.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Briefcase className="w-4 h-4" />
                    Job Description
                  </label>
                  <Textarea
                    placeholder="Paste the complete job description here..."
                    className="min-h-[250px] resize-none"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    data-testid="input-job-description"
                  />
                  <p className="text-xs text-muted-foreground">
                    {jobDescription.length} characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    Resume
                  </label>
                  <Textarea
                    placeholder="Paste your resume content here..."
                    className="min-h-[250px] resize-none"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    data-testid="input-resume"
                  />
                  <p className="text-xs text-muted-foreground">
                    {resume.length} characters
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleAnalyze}
                  disabled={analyzeMutation.isPending || jobDescription.length < 50 || resume.length < 50}
                  className="gap-2"
                  data-testid="button-analyze"
                >
                  {analyzeMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Analyze Match
                    </>
                  )}
                </Button>
              </div>

              {analyzeMutation.isPending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <span>AI is analyzing your match...</span>
                  </div>
                  <div className="mt-4 max-w-sm mx-auto">
                    <Progress value={33} className="h-1" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Extracting skills, matching keywords, calculating semantic similarity...
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={resetAnalysis} data-testid="button-new-analysis">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  New Analysis
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col items-center justify-center">
                  <CircularProgress value={result.matchScore} />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 w-full"
                  >
                    {(() => {
                      const config = predictionConfig[result.shortlistPrediction];
                      const Icon = config.icon;
                      return (
                        <div className={`p-4 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
                          <div className="flex items-center gap-2 justify-center">
                            <Icon className={`w-5 h-5 ${config.textColor}`} />
                            <span className={`font-medium ${config.textColor}`}>
                              {config.label}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                </div>

                <div className="md:col-span-2">
                  <Tabs defaultValue="breakdown" className="w-full">
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="breakdown" data-testid="tab-breakdown">Breakdown</TabsTrigger>
                      <TabsTrigger value="matched" data-testid="tab-matched">Matched</TabsTrigger>
                      <TabsTrigger value="missing" data-testid="tab-missing">Missing</TabsTrigger>
                      <TabsTrigger value="tips" data-testid="tab-tips">Tips</TabsTrigger>
                    </TabsList>

                    <TabsContent value="breakdown" className="space-y-4 mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Score Breakdown
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {[
                            { label: "Hard Skills", value: result.breakdown.hardSkills, weight: "45%" },
                            { label: "Soft Skills", value: result.breakdown.softSkills, weight: "15%" },
                            { label: "Experience Match", value: result.breakdown.experience, weight: "20%" },
                            { label: "Keyword Match", value: result.breakdown.keywordMatch, weight: "10%" },
                            { label: "Semantic Match", value: result.breakdown.semanticMatch, weight: "10%" }
                          ].map((item) => (
                            <div key={item.label} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{item.label}</span>
                                <span className="text-muted-foreground">
                                  {item.value}% <span className="text-xs">({item.weight})</span>
                                </span>
                              </div>
                              <Progress value={item.value} className="h-2" />
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Experience Fit
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{result.experienceFit}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="matched" className="mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Matched Skills ({result.matchedSkills.filter(s => s.found).length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {result.matchedSkills
                              .filter(skill => skill.found)
                              .map((skill, i) => (
                                <Badge 
                                  key={i} 
                                  variant="outline" 
                                  className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                                >
                                  {skill.skill}
                                </Badge>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="missing" className="mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            Missing Skills ({result.missingSkills.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {result.missingSkills.map((skill, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          {result.missingSkills.length === 0 && (
                            <p className="text-muted-foreground text-sm">
                              Great! No critical skills are missing.
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="tips" className="mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {result.recommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <span className="text-sm">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
