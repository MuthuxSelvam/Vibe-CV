import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ScanText, 
  Brain, 
  Filter, 
  Target, 
  FileSearch, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Zap,
  Database,
  ChevronRight
} from "lucide-react";

const atsSteps = [
  {
    icon: FileSearch,
    title: "1. Document Parsing",
    description: "ATS extracts structured data from your resume: contact info, work history, skills, education, and dates.",
    tip: "Use standard section headers and avoid complex formatting that might confuse parsers."
  },
  {
    icon: Target,
    title: "2. Keyword Matching",
    description: "System compares your resume against required keywords from the job description.",
    tip: "Mirror exact phrases from the job posting—'project management' may not match 'managing projects'."
  },
  {
    icon: Brain,
    title: "3. Semantic Analysis",
    description: "Advanced AI systems understand context and meaning, not just exact keyword matches.",
    tip: "Provide context for your skills: 'Led team of 5 engineers using React' is better than just 'React'."
  },
  {
    icon: Filter,
    title: "4. Scoring & Ranking",
    description: "Candidates are scored and ranked. Auto-filters may reject applications below thresholds.",
    tip: "Match at least 60-70% of required skills to pass initial screening."
  }
];

const commonMistakes = [
  { issue: "Fancy formatting", impact: "Columns, tables, and graphics confuse parsers" },
  { issue: "Image-based text", impact: "Text in images cannot be read by ATS" },
  { issue: "Uncommon file types", impact: "Stick to .pdf or .docx formats" },
  { issue: "Missing keywords", impact: "Skills not mentioned = skills not matched" },
  { issue: "Acronyms only", impact: "Write both: 'Search Engine Optimization (SEO)'" }
];

const optimizationTips = [
  "Use standard section headers: Experience, Education, Skills",
  "Include both spelled-out terms and acronyms",
  "Quantify achievements with specific metrics",
  "Match job title variations the company uses",
  "Keep formatting simple—single column preferred",
  "Use standard bullet points, not symbols",
  "Save as .pdf or .docx from a word processor"
];

export function ATSEducationPanel() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2" data-testid="button-open-ats-panel">
          <ScanText className="w-4 h-4" />
          How ATS Works
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto" data-testid="ats-education-panel">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Brain className="w-5 h-5 text-primary" />
            Understanding ATS & AI Resume Screening
          </SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="what" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="what" data-testid="tab-what-is-ats">What is ATS?</TabsTrigger>
            <TabsTrigger value="how" data-testid="tab-how-it-works">How it Works</TabsTrigger>
            <TabsTrigger value="optimize" data-testid="tab-optimize">Optimize</TabsTrigger>
          </TabsList>

          <TabsContent value="what" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Applicant Tracking Systems</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  An ATS is software that companies use to manage job applications. It stores, 
                  organizes, and filters resumes before a human ever sees them.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Database className="w-6 h-6 text-emerald-500 mb-2" />
                    <h4 className="font-medium mb-1">Stores & Organizes</h4>
                    <p className="text-sm text-muted-foreground">Keeps all applications in one searchable database</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Filter className="w-6 h-6 text-blue-500 mb-2" />
                    <h4 className="font-medium mb-1">Filters & Ranks</h4>
                    <p className="text-sm text-muted-foreground">Auto-rejects non-matching applications</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <span className="font-medium">Key Insight</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Up to 75% of resumes are rejected by ATS before reaching a human recruiter. 
                    Your resume must be optimized for both machines AND humans.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI-Powered Screening</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Modern systems use AI and Natural Language Processing (NLP) to understand 
                  context, not just match keywords.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm">Understands synonyms and related skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm">Evaluates career progression patterns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm">Identifies transferable skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm">Predicts job fit probability</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="how" className="space-y-4">
            <div className="space-y-4">
              {atsSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{ backgroundColor: isActive ? "hsl(var(--muted))" : "transparent" }}
                  >
                    <button
                      onClick={() => setActiveStep(index)}
                      className="w-full text-left p-4 rounded-lg border hover-elevate"
                      data-testid={`ats-step-${index}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isActive ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 p-3 rounded bg-primary/10 border border-primary/20"
                              >
                                <div className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-primary" />
                                  <span className="font-medium">Tip:</span>
                                  <span className="text-muted-foreground">{step.tip}</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isActive ? "rotate-90" : ""}`} />
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 p-4 rounded-lg bg-muted/50">
              <ArrowRight className="w-5 h-5 text-primary" />
              <span className="text-sm">
                <span className="font-medium">Result:</span> Only top-ranked candidates reach human review
              </span>
            </div>
          </TabsContent>

          <TabsContent value="optimize" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  Common Mistakes to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {commonMistakes.map((mistake, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10"
                    >
                      <span className="font-medium text-sm">{mistake.issue}</span>
                      <span className="text-sm text-muted-foreground">{mistake.impact}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Optimization Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {optimizationTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
