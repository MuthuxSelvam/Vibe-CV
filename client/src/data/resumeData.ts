import type { ResumeData } from "@shared/schema";

export const resumeData: ResumeData = {
  name: "Muthu Selvam",
  title: "Final-year CSE Student & Code Enthusiast",
  email: "muthu@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/muthuselvam",
  github: "github.com/muthuselvam",
  website: "muthuselvam.dev",
  summary: {
    default: "Final-year CSE student and code enthusiast who loves turning ideas into interactive experiences.",
    recruiter: "That's why I created VibeCV — a smart portfolio that adapts to each visitor and delivers the perfect first impression every time. I'm a results-driven CSE student with a passion for building high-impact solutions.",
    techLead: "Passionate about building elegant, scalable systems. Deep experience with distributed architectures, event-driven design, and performance optimization. Love mentoring engineers and establishing best practices.",
    founder: "I believe technology should solve real human problems. I thrive at the intersection of product thinking and technical excellence, building products that transform how people work.",
    visitor: "Hey there! I'm Muthu — a final-year CSE student and code enthusiast who loves turning ideas into interactive experiences. When I'm not building cool tech or exploring AI, I'm figuring out how resumes truly get shortlisted.",
    resumeMatcher: "Upload a job description and let the AI analyze how well your resume matches the role. Get a detailed score and actionable recommendations."
  },
  skills: [
    { name: "TypeScript", category: "Languages", proficiency: 95 },
    { name: "Python", category: "Languages", proficiency: 88 },
    { name: "Rust", category: "Languages", proficiency: 75 },
    { name: "Go", category: "Languages", proficiency: 70 },
    { name: "React", category: "Frontend", proficiency: 95 },
    { name: "Next.js", category: "Frontend", proficiency: 90 },
    { name: "Vue.js", category: "Frontend", proficiency: 80 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 92 },
    { name: "Node.js", category: "Backend", proficiency: 93 },
    { name: "PostgreSQL", category: "Database", proficiency: 88 },
    { name: "MongoDB", category: "Database", proficiency: 82 },
    { name: "Redis", category: "Database", proficiency: 85 },
    { name: "AWS", category: "Cloud", proficiency: 88 },
    { name: "Docker", category: "DevOps", proficiency: 90 },
    { name: "Kubernetes", category: "DevOps", proficiency: 78 },
    { name: "GraphQL", category: "API", proficiency: 87 },
    { name: "System Design", category: "Architecture", proficiency: 90 },
    { name: "Team Leadership", category: "Soft Skills", proficiency: 88 }
  ],
  metrics: [
    { label: "Years Experience", value: "4+", description: "Academic & Personal Projects" },
    { label: "Projects Built", value: "20+", description: "Full-stack applications" },
    { label: "Users Impacted", value: "1K+", description: "Across deployed apps" },
    { label: "Performance Gain", value: "40%", description: "Average latency reduction" },
    { label: "Code Reviews", value: "100+", description: "PRs reviewed annually" },
    { label: "Open Source", value: "500+", description: "GitHub contributions" }
  ],
  projects: [
    {
      id: "1",
      title: "Real-time Collaboration Engine",
      description: "Built a WebSocket-based collaboration system enabling real-time document editing for 50K+ concurrent users.",
      problem: "Teams were losing hours to version conflicts and slow feedback loops when working on shared documents.",
      solution: "Designed an operational transformation engine with conflict-free replicated data types (CRDTs), enabling seamless real-time collaboration with offline support.",
      impact: "Reduced team sync time by 65%, enabled async-first workflows, and grew to 50K daily active users within 6 months.",
      techStack: ["TypeScript", "WebSocket", "Redis", "PostgreSQL", "React"],
      codeSnippet: `// CRDT-based document sync
interface Operation {
  type: 'insert' | 'delete';
  position: number;
  value?: string;
  timestamp: number;
  userId: string;
}

class DocumentCRDT {
  private operations: Operation[] = [];
  
  apply(op: Operation): string {
    this.operations.push(op);
    this.operations.sort((a, b) => 
      a.timestamp - b.timestamp || 
      a.userId.localeCompare(b.userId)
    );
    return this.rebuild();
  }
  
  private rebuild(): string {
    let doc = '';
    for (const op of this.operations) {
      if (op.type === 'insert') {
        doc = doc.slice(0, op.position) + 
              op.value + 
              doc.slice(op.position);
      }
    }
    return doc;
  }
}`,
      codeLanguage: "typescript"
    },
    {
      id: "2",
      title: "ML-Powered Analytics Platform",
      description: "Architected a data pipeline processing 100K+ events/second with real-time ML inference for user behavior prediction.",
      problem: "Companies had data but couldn't act on it fast enough - insights came days after user behavior changed.",
      solution: "Built a streaming analytics platform with Apache Kafka, real-time ML models, and instant dashboards that surface actionable insights within seconds.",
      impact: "Enabled clients to respond to user behavior 48x faster, increasing conversion rates by an average of 23%.",
      techStack: ["Python", "Apache Kafka", "TensorFlow", "ClickHouse", "React"],
      codeSnippet: `# Real-time event processing pipeline
from kafka import KafkaConsumer
import tensorflow as tf

class EventProcessor:
    def __init__(self, model_path: str):
        self.model = tf.saved_model.load(model_path)
        self.consumer = KafkaConsumer(
            'user-events',
            bootstrap_servers=['kafka:9092'],
            group_id='ml-inference'
        )
    
    async def process_stream(self):
        async for message in self.consumer:
            event = self.parse_event(message)
            features = self.extract_features(event)
            
            # Real-time prediction
            prediction = self.model.predict(features)
            
            if prediction['churn_risk'] > 0.8:
                await self.trigger_alert(event.user_id)`,
      codeLanguage: "python"
    },
    {
      id: "3",
      title: "Distributed Task Scheduler",
      description: "Created a fault-tolerant job scheduler handling millions of scheduled tasks with sub-second precision.",
      problem: "Existing solutions couldn't scale beyond 10K jobs without performance degradation and missed executions.",
      solution: "Designed a distributed scheduler using consistent hashing, leader election, and time-wheel algorithms for O(1) job scheduling.",
      impact: "Now powers scheduling for 3 enterprise clients, handling 5M+ daily jobs with 99.99% execution accuracy.",
      techStack: ["Rust", "etcd", "gRPC", "TimescaleDB"],
      codeSnippet: `// Time-wheel based scheduler in Rust
use std::collections::HashMap;
use tokio::time::{Duration, Instant};

pub struct TimeWheel {
    slots: Vec<Vec<Task>>,
    current_slot: usize,
    tick_duration: Duration,
    wheel_size: usize,
}

impl TimeWheel {
    pub fn schedule(&mut self, task: Task, delay: Duration) {
        let ticks = delay.as_millis() / 
                    self.tick_duration.as_millis();
        let slot = (self.current_slot + ticks as usize) 
                   % self.wheel_size;
        self.slots[slot].push(task);
    }
    
    pub async fn tick(&mut self) -> Vec<Task> {
        self.current_slot = (self.current_slot + 1) 
                            % self.wheel_size;
        std::mem::take(&mut self.slots[self.current_slot])
    }
}`,
      codeLanguage: "rust"
    }
  ],
  experience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      role: "Software Engineer Intern",
      startDate: "2023",
      endDate: "Present",
      description: "Contributing to platform engineering initiatives and learning from senior engineers.",
      achievements: [
        "Reduced API latency by 40% through caching strategies and query optimization",
        "Designed and implemented microservices architecture serving 2M+ users",
        "Established engineering best practices adopted across 5 product teams",
        "Led migration from monolith to microservices with zero downtime"
      ],
      techStack: ["TypeScript", "React", "Node.js", "AWS", "Kubernetes"]
    },
    {
      id: "2",
      company: "StartupXYZ",
      role: "Full-Stack Developer Intern",
      startDate: "2022",
      endDate: "2023",
      description: "Core member of the founding engineering team, built the product from 0 to 1.",
      achievements: [
        "Built real-time collaboration features used by 50K+ daily active users",
        "Implemented CI/CD pipeline reducing deployment time by 70%",
        "Grew engineering team from 3 to 12 engineers",
        "Architected event-driven system handling 100K+ events/second"
      ],
      techStack: ["Python", "React", "PostgreSQL", "Redis", "Docker"]
    }
  ],
  certifications: [
    "AWS Certified Cloud Practitioner",
    "Google Cloud Associate Cloud Engineer"
  ],
  funFacts: [
    { icon: "coffee", title: "Coffee Enthusiast", description: "3 cups minimum to function. Home-roasted beans are non-negotiable." },
    { icon: "hiking", title: "Weekend Hiker", description: "Conquered 15 peaks in the Bay Area. Yosemite is my happy place." },
    { icon: "cat", title: "Cat Parent", description: "Sir Whiskers III supervises all code reviews from his perch." },
    { icon: "bread", title: "Sourdough Baker", description: "My starter is 3 years old and has a name (Gerald)." },
    { icon: "gamepad", title: "Retro Gamer", description: "Still chasing that high score on Tetris. Current PB: 423,689." },
    { icon: "music", title: "Playlist Curator", description: "200+ hours of coding playlists. Lo-fi beats are proven to increase productivity." }
  ],
  hobbies: ["Hiking", "Coffee Roasting", "Sourdough Baking", "Retro Gaming", "Open Source Contributing", "Photography"]
};
