export interface JobDescription {
    rawText: string;
    skills: string[];
    seniority?: string;
    location?: string;
    tokens?: string[];
}

export interface Resume {
    rawText: string;
    parsed: {
        name?: string;
        contact?: {
            email?: string;
            phone?: string;
            linkedin?: string;
        };
        experience?: {
            company: string;
            role: string;
            start: string;
            end: string;
            bullets: string[];
        }[];
        skills: string[];
        education?: any[];
    };
    ocrPages?: any[];
}

export interface MatchResult {
    score: number; // 0-100
    prediction: "likely" | "borderline" | "unlikely";
    matchedSkills: { skill: string; confidence: number }[];
    missingSkills: { skill: string; priority: "high" | "medium" | "low" }[];
    semanticScore: number; // 0-1
    experienceFit: {
        yearsMatching: number;
        roleMatchScore: number; // 0-1
    };
    explain?: {
        weights: Record<string, number>;
        details: string[];
    };
    suggestions: string[];
    timestamp: string;
}
