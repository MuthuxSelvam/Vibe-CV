import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { jobMatchRequestSchema, jobMatchResultSchema } from "@shared/schema";
import { analyzeJobMatch, analyzeJobMatchFallback } from "./openai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Job Match Prediction API
  app.post("/api/job-match", async (req, res) => {
    try {
      // Validate request body
      const validation = jobMatchRequestSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid request",
          details: validation.error.errors.map(e => e.message)
        });
      }

      const { jobDescription, resume } = validation.data;

      // Check if OpenAI API key is available
      if (!process.env.OPENAI_API_KEY) {
        // Use fallback keyword-based analysis
        console.log("OpenAI API key not configured, using fallback analysis");
        const result = analyzeJobMatchFallback(jobDescription, resume);
        return res.json(result);
      }

      // Use OpenAI for semantic analysis
      const result = await analyzeJobMatch(jobDescription, resume);
      
      // Validate response schema
      const validated = jobMatchResultSchema.safeParse(result);
      if (!validated.success) {
        console.error("Job match result validation failed:", validated.error);
        // Fall back to fallback analysis if OpenAI response doesn't match schema
        const fallbackResult = analyzeJobMatchFallback(jobDescription, resume);
        return res.json(fallbackResult);
      }
      
      return res.json(validated.data);

    } catch (error) {
      console.error("Job match analysis error:", error);
      
      // If OpenAI fails, try fallback
      try {
        const { jobDescription, resume } = req.body;
        if (jobDescription && resume) {
          const result = analyzeJobMatchFallback(jobDescription, resume);
          return res.json(result);
        }
      } catch (fallbackError) {
        console.error("Fallback analysis error:", fallbackError);
      }

      return res.status(500).json({
        error: "Failed to analyze job match",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      openaiConfigured: !!process.env.OPENAI_API_KEY
    });
  });

  return httpServer;
}
