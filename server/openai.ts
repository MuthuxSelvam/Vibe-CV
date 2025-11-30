import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// Lazy initialization to avoid crash when API key is not set
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

export interface ParsedJobDescription {
  requiredSkills: string[];
  preferredSkills: string[];
  experienceYears: number | null;
  seniorityLevel: string;
  responsibilities: string[];
  keywords: string[];
}

export interface ParsedResume {
  skills: string[];
  experienceYears: number | null;
  titles: string[];
  achievements: string[];
  keywords: string[];
}

export interface MatchAnalysis {
  matchScore: number;
  shortlistPrediction: "likely" | "borderline" | "unlikely";
  matchedSkills: { skill: string; found: boolean; context?: string }[];
  missingSkills: string[];
  experienceFit: string;
  recommendations: string[];
  breakdown: {
    hardSkills: number;
    softSkills: number;
    experience: number;
    keywordMatch: number;
    semanticMatch: number;
  };
}

export async function analyzeJobMatch(
  jobDescription: string,
  resume: string
): Promise<MatchAnalysis> {
  const prompt = `You are an expert ATS (Applicant Tracking System) and recruiting AI. Analyze the following job description and resume to determine how well the candidate matches the position.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}

Provide a comprehensive analysis in the following JSON format:
{
  "matchScore": <number 0-100 representing overall match percentage>,
  "shortlistPrediction": <"likely" if score >= 75 and critical skills present, "borderline" if score 50-74 or some skills missing, "unlikely" if score < 50 or major gaps>,
  "matchedSkills": [
    {"skill": "<skill name>", "found": true, "context": "<where in resume>"},
    {"skill": "<skill from JD not found>", "found": false}
  ],
  "missingSkills": ["<list of important skills from JD not found in resume>"],
  "experienceFit": "<brief assessment of experience match, 1-2 sentences>",
  "recommendations": [
    "<actionable suggestion to improve match>",
    "<another suggestion>",
    "<up to 5 total suggestions>"
  ],
  "breakdown": {
    "hardSkills": <0-100 technical skills match>,
    "softSkills": <0-100 soft skills match>,
    "experience": <0-100 experience level match>,
    "keywordMatch": <0-100 keyword overlap>,
    "semanticMatch": <0-100 contextual/semantic similarity>
  }
}

Consider these scoring weights:
- Hard Skills: 45%
- Soft Skills: 15%
- Experience: 20%
- Keyword Match: 10%
- Semantic Match: 10%

Be thorough but fair. Identify transferable skills and related experience. Provide specific, actionable recommendations.`;

  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert ATS system and recruiting AI. Analyze resumes against job descriptions and provide detailed match analysis. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 4096
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const analysis = JSON.parse(content) as MatchAnalysis;

    // Validate and sanitize the response
    return {
      matchScore: Math.max(0, Math.min(100, Math.round(analysis.matchScore || 0))),
      shortlistPrediction: validatePrediction(analysis.shortlistPrediction),
      matchedSkills: Array.isArray(analysis.matchedSkills) ? analysis.matchedSkills : [],
      missingSkills: Array.isArray(analysis.missingSkills) ? analysis.missingSkills : [],
      experienceFit: analysis.experienceFit || "Unable to determine experience fit.",
      recommendations: Array.isArray(analysis.recommendations) 
        ? analysis.recommendations.slice(0, 5) 
        : [],
      breakdown: {
        hardSkills: Math.max(0, Math.min(100, Math.round(analysis.breakdown?.hardSkills || 0))),
        softSkills: Math.max(0, Math.min(100, Math.round(analysis.breakdown?.softSkills || 0))),
        experience: Math.max(0, Math.min(100, Math.round(analysis.breakdown?.experience || 0))),
        keywordMatch: Math.max(0, Math.min(100, Math.round(analysis.breakdown?.keywordMatch || 0))),
        semanticMatch: Math.max(0, Math.min(100, Math.round(analysis.breakdown?.semanticMatch || 0)))
      }
    };
  } catch (error) {
    console.error("OpenAI analysis error:", error);
    throw new Error("Failed to analyze job match. Please try again.");
  }
}

function validatePrediction(prediction: string): "likely" | "borderline" | "unlikely" {
  if (prediction === "likely" || prediction === "borderline" || prediction === "unlikely") {
    return prediction;
  }
  return "borderline";
}

// Fallback function for when OpenAI is not available
export function analyzeJobMatchFallback(
  jobDescription: string,
  resume: string
): MatchAnalysis {
  const jdLower = jobDescription.toLowerCase();
  const resumeLower = resume.toLowerCase();

  // Common tech skills to check
  const techSkills = [
    "javascript", "typescript", "python", "java", "react", "node.js", "nodejs",
    "aws", "docker", "kubernetes", "sql", "postgresql", "mongodb", "redis",
    "graphql", "rest", "api", "git", "ci/cd", "agile", "scrum", "linux",
    "html", "css", "vue", "angular", "express", "django", "flask", "go", "rust"
  ];

  const softSkills = [
    "leadership", "communication", "teamwork", "problem-solving", "analytical",
    "collaboration", "mentoring", "management", "planning", "organization"
  ];

  const matchedSkills: { skill: string; found: boolean; context?: string }[] = [];
  const missingSkills: string[] = [];
  let hardSkillsMatch = 0;
  let softSkillsMatch = 0;
  let techSkillsFound = 0;
  let techSkillsInJD = 0;
  let softSkillsFound = 0;
  let softSkillsInJD = 0;

  // Check tech skills
  techSkills.forEach(skill => {
    const inJD = jdLower.includes(skill);
    const inResume = resumeLower.includes(skill);
    
    if (inJD) {
      techSkillsInJD++;
      if (inResume) {
        techSkillsFound++;
        matchedSkills.push({ skill, found: true, context: "Found in resume" });
      } else {
        missingSkills.push(skill);
        matchedSkills.push({ skill, found: false });
      }
    }
  });

  // Check soft skills
  softSkills.forEach(skill => {
    const inJD = jdLower.includes(skill);
    const inResume = resumeLower.includes(skill);
    
    if (inJD) {
      softSkillsInJD++;
      if (inResume) {
        softSkillsFound++;
      }
    }
  });

  hardSkillsMatch = techSkillsInJD > 0 ? Math.round((techSkillsFound / techSkillsInJD) * 100) : 50;
  softSkillsMatch = softSkillsInJD > 0 ? Math.round((softSkillsFound / softSkillsInJD) * 100) : 50;

  // Simple keyword overlap
  const jdWords = new Set(jdLower.match(/\b\w{4,}\b/g) || []);
  const resumeWords = new Set(resumeLower.match(/\b\w{4,}\b/g) || []);
  const commonWords = [...jdWords].filter(word => resumeWords.has(word));
  const keywordMatch = jdWords.size > 0 ? Math.round((commonWords.length / jdWords.size) * 100) : 50;

  // Experience estimation
  const yearsMatch = resume.match(/(\d+)\+?\s*years?/i);
  const hasExperience = yearsMatch && parseInt(yearsMatch[1]) >= 3;
  const experience = hasExperience ? 75 : 50;

  // Calculate overall score
  const breakdown = {
    hardSkills: hardSkillsMatch,
    softSkills: softSkillsMatch,
    experience,
    keywordMatch: Math.min(100, keywordMatch),
    semanticMatch: Math.round((hardSkillsMatch + keywordMatch) / 2)
  };

  const matchScore = Math.round(
    breakdown.hardSkills * 0.45 +
    breakdown.softSkills * 0.15 +
    breakdown.experience * 0.20 +
    breakdown.keywordMatch * 0.10 +
    breakdown.semanticMatch * 0.10
  );

  let shortlistPrediction: "likely" | "borderline" | "unlikely";
  if (matchScore >= 75 && missingSkills.length <= 2) {
    shortlistPrediction = "likely";
  } else if (matchScore >= 50) {
    shortlistPrediction = "borderline";
  } else {
    shortlistPrediction = "unlikely";
  }

  const recommendations: string[] = [];
  if (missingSkills.length > 0) {
    recommendations.push(`Add or highlight experience with: ${missingSkills.slice(0, 3).join(", ")}`);
  }
  if (breakdown.keywordMatch < 60) {
    recommendations.push("Mirror more keywords from the job description in your resume");
  }
  if (breakdown.experience < 70) {
    recommendations.push("Quantify your experience with specific metrics and achievements");
  }
  recommendations.push("Tailor your summary to directly address this role's requirements");

  return {
    matchScore,
    shortlistPrediction,
    matchedSkills,
    missingSkills,
    experienceFit: hasExperience 
      ? "Your experience level appears to align with the role requirements."
      : "Consider highlighting more years of relevant experience.",
    recommendations,
    breakdown
  };
}
