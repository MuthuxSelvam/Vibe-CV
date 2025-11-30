import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for in-memory storage compatibility
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Persona types
export type Persona = "recruiter" | "techLead" | "founder" | "visitor" | "resumeMatcher";

export const personaSchema = z.enum(["recruiter", "techLead", "founder", "visitor", "resumeMatcher"]);

export interface PersonaConfig {
  priority: string[];
  theme: "light" | "dark" | "gradient" | "vibrant";
  tone: string;
}

export const personaConfigs: Record<Persona, PersonaConfig> = {
  recruiter: {
    priority: ["summary", "metrics", "skills", "experience", "certifications"],
    theme: "light",
    tone: "Professional, concise, ATS-friendly"
  },
  techLead: {
    priority: ["architecture", "codeSamples", "techStack", "problemSolving"],
    theme: "dark",
    tone: "Technical, direct, engineering-focused"
  },
  founder: {
    priority: ["problem", "solution", "impact", "caseStudies"],
    theme: "gradient",
    tone: "Story-driven, visionary, product-focused"
  },
  visitor: {
    priority: ["bio", "funFacts", "hobbies", "easterEggs"],
    theme: "vibrant",
    tone: "Friendly, casual, fun"
  },
  resumeMatcher: {
    priority: ["jobMatch", "analysis", "recommendations"],
    theme: "gradient",
    tone: "Analytical, helpful, precise"
  }
};

export interface Skill {
  name: string;
  category: string;
  proficiency: number;
}

export interface Metric {
  label: string;
  value: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  impact?: string;
  techStack: string[];
  link?: string;
  image?: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  techStack?: string[];
}

export interface FunFact {
  icon: string;
  title: string;
  description: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  instagram?: string;
  avatar?: string;
  summary: {
    default: string;
    recruiter: string;
    techLead: string;
    founder: string;
    visitor: string;
    resumeMatcher: string;
  };
  skills: Skill[];
  metrics: Metric[];
  projects: Project[];
  experience: Experience[];
  certifications?: string[];
  funFacts?: FunFact[];
  hobbies?: string[];
}

export const jobMatchRequestSchema = z.object({
  jobDescription: z.string().min(50, "Job description must be at least 50 characters"),
  resume: z.string().min(50, "Resume must be at least 50 characters")
});

export type JobMatchRequest = z.infer<typeof jobMatchRequestSchema>;

export interface SkillMatch {
  skill: string;
  found: boolean;
  context?: string;
}

// Zod schema for validating job match response
export const skillMatchSchema = z.object({
  skill: z.string(),
  found: z.boolean(),
  context: z.string().optional()
});

export const jobMatchBreakdownSchema = z.object({
  hardSkills: z.number().min(0).max(100),
  softSkills: z.number().min(0).max(100),
  experience: z.number().min(0).max(100),
  keywordMatch: z.number().min(0).max(100),
  semanticMatch: z.number().min(0).max(100)
});

export const jobMatchResultSchema = z.object({
  matchScore: z.number().min(0).max(100),
  shortlistPrediction: z.enum(["likely", "borderline", "unlikely"]),
  matchedSkills: z.array(skillMatchSchema),
  missingSkills: z.array(z.string()),
  experienceFit: z.string(),
  recommendations: z.array(z.string()),
  breakdown: jobMatchBreakdownSchema
});

export interface SkillMatch {
  skill: string;
  found: boolean;
  context?: string;
}

export interface JobMatchResult {
  matchScore: number;
  shortlistPrediction: "likely" | "borderline" | "unlikely";
  matchedSkills: SkillMatch[];
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
