# VibeCV - Intelligent Adaptive Resume

## Overview

VibeCV is an interactive, persona-driven resume website that dynamically transforms its layout, content, tone, and visuals based on the viewer's identity. The application features four distinct personas (Recruiter, Tech Lead, Founder, Visitor), each presenting the same underlying resume data in optimized ways for different audiences. It includes AI-powered job matching analysis and ATS (Applicant Tracking System) education features to help users understand resume screening processes.

**Core Concept**: A single-page application that morphs its entire presentation based on who is viewing it, creating personalized experiences while maintaining a unified data source.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and bundler.

**State Management**:
- **Persona Context**: Custom React Context (`PersonaContext`) manages the current viewer persona and handles smooth transitions between persona views. The persona state drives all UI transformations across the application.
- **TanStack Query**: Handles server state management for API calls, particularly the job matching feature.

**Routing**: Wouter for lightweight client-side routing with a simple single-page structure (Home + 404).

**UI Component System**: 
- **shadcn/ui Components**: Comprehensive component library built on Radix UI primitives with Tailwind CSS styling
- **Design System**: Based on "new-york" style with customized color schemes supporting four distinct persona themes (light, dark, gradient, vibrant)
- **Animation**: Framer Motion for sophisticated transitions and persona-switching animations

**Styling Strategy**:
- Tailwind CSS with extensive customization via CSS variables for dynamic theming
- Persona-specific CSS classes applied to root element (`persona-recruiter`, `persona-techLead`, etc.)
- Dark mode support specifically for Tech Lead persona
- Custom spacing, typography, and color systems defined in design guidelines

**Layout Patterns**:
- **Adaptive Layouts**: Each persona receives different component ordering and presentation priorities
- **Recruiter**: Metrics-first, ATS-optimized clean layout
- **Tech Lead**: Dark theme with code showcases and technical deep-dives
- **Founder**: Story-driven pitch-deck style with impact narratives
- **Visitor**: Casual, fun presentation with personal touches

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js.

**API Structure**: RESTful endpoints with a primary focus on the job matching analysis feature at `/api/job-match`.

**Request Processing**:
- JSON body parsing with raw body preservation for webhook compatibility
- URL-encoded form data support
- Request/response logging middleware with duration tracking

**Static File Serving**: Production builds serve pre-built client assets from `dist/public` with SPA fallback routing.

**Development Environment**: Vite dev server integration with HMR (Hot Module Replacement) over custom WebSocket path.

### Data Architecture

**Resume Data**: Single source of truth stored in `client/src/data/resumeData.ts` as a typed TypeScript object conforming to the `ResumeData` schema.

**Schema Design** (`shared/schema.ts`):
- Persona configurations defining priorities, themes, and tones
- Resume data structures (skills, metrics, projects, experience, certifications)
- Job matching request/response types
- Zod validation schemas for runtime type safety

**Data Flow**:
1. Resume data is imported statically throughout React components
2. Persona context determines which subset of data and presentation style to show
3. No database persistence - application is stateless for resume display
4. Optional user storage interface (currently in-memory) for potential future features

### AI Integration

**OpenAI Integration**:
- **Primary Analysis**: GPT-based semantic analysis of job descriptions vs. resumes
- **Fallback System**: Keyword-based analysis when OpenAI API key is unavailable
- **Lazy Initialization**: OpenAI client only instantiated when needed to prevent crashes without API keys

**Job Match Analysis Process**:
1. Parse job description for required/preferred skills, seniority, responsibilities
2. Parse resume for skills, experience, achievements
3. Perform semantic matching using AI or fallback to keyword matching
4. Generate match score, shortlist prediction, skill gaps, and recommendations
5. Return detailed breakdown across multiple dimensions (hard skills, soft skills, experience, etc.)

### Build System

**Development**:
- `npm run dev`: Runs TypeScript server with Vite dev middleware
- File watching and hot reloading for rapid development
- Custom error overlays and dev banners via Replit plugins

**Production Build**:
- `npm run build`: Custom build script (`script/build.ts`)
- Vite builds client to `dist/public`
- esbuild bundles server with selective dependency bundling (allowlist for faster cold starts)
- External dependencies excluded from bundle to reduce size
- Output: Single CJS file at `dist/index.cjs`

**Database Management** (prepared but not active):
- Drizzle ORM configured for PostgreSQL
- Schema defined in `shared/schema.ts`
- Migration support via `drizzle-kit push`
- Currently using in-memory storage; database integration ready for deployment

## External Dependencies

### Core Frontend Libraries
- **React 18**: UI library with concurrent features
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across entire codebase
- **Wouter**: Lightweight routing (~1.2KB)
- **Framer Motion**: Animation and transition library
- **TanStack Query v5**: Server state management

### UI Component Libraries
- **Radix UI**: 20+ headless accessible component primitives
- **shadcn/ui**: Pre-styled component system built on Radix
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **clsx & tailwind-merge**: Conditional className utilities

### Backend Dependencies
- **Express**: Web server framework
- **OpenAI SDK**: AI-powered job matching analysis
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Runtime type validation and schema definition
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments

### Build Tools
- **esbuild**: Fast JavaScript bundler for server code
- **tsx**: TypeScript execution for development
- **PostCSS**: CSS processing with Autoprefixer

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error overlay
- **@replit/vite-plugin-cartographer**: Code mapping
- **@replit/vite-plugin-dev-banner**: Development indicator

### Optional/Future Integrations
- Session management prepared with `express-session` and `connect-pg-simple`
- Database connection ready via Neon PostgreSQL serverless
- Google Fonts integration for Inter, DM Sans, Fira Code, JetBrains Mono, Geist Mono, Architects Daughter

### Configuration Files
- `components.json`: shadcn/ui configuration with path aliases
- `tailwind.config.ts`: Extended theme with custom colors, spacing, and typography
- `tsconfig.json`: TypeScript with path mapping for `@/*` and `@shared/*`
- `vite.config.ts`: Vite with React plugin and custom aliases
- `drizzle.config.ts`: Database configuration pointing to `DATABASE_URL`