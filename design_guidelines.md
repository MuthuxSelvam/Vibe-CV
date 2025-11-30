# VibeCV Design Guidelines

## Design Approach

**Hybrid System**: Drawing from Linear's precision, Vercel's dark mode excellence, and Stripe's adaptive components. Each persona represents a distinct design language while maintaining cohesive transitions.

## Typography System

**Primary Font**: Inter or DM Sans via Google Fonts
**Code Font**: JetBrains Mono or Fira Code

**Hierarchy**:
- Hero Headlines: text-5xl to text-7xl, font-bold
- Section Titles: text-3xl to text-4xl, font-semibold
- Subsections: text-xl to text-2xl, font-medium
- Body Text: text-base to text-lg, font-normal
- Captions/Metadata: text-sm, font-normal
- Code Snippets: text-sm, font-mono

## Layout System

**Spacing Units**: Tailwind primitives of 2, 4, 6, 8, 12, 16, 20, 24
**Common Patterns**: p-8, gap-6, space-y-12, mb-16, mt-20
**Container**: max-w-7xl with px-6 to px-12 responsive padding

## Component Library

### Identity Selector (Top-Right Fixed)
- Floating pill with 4 persona buttons
- Active state shows filled background with subtle glow
- Smooth morphing indicator slides between selections
- Fixed position with z-50, backdrop-blur-md background
- Size: px-6 py-3, rounded-full

### Hero Section (First Viewport)
- Full-width container with centered content
- Large headline introducing the adaptive concept
- Subheadline explaining "Select your persona to see a personalized view"
- Identity selector embedded or prominently placed
- Minimal background: subtle gradient or grid pattern
- Height: min-h-screen with flex centering

### Persona-Specific Layouts

**Recruiter Mode**:
- Clean two-column grid layout
- Left: Summary, Skills, Certifications
- Right: Experience Timeline, Metrics Panel
- Card-based design with subtle borders
- Monochromatic palette focus

**Tech Lead Mode**:
- Single column with wide code showcases
- Architecture diagrams at full-width
- Tech stack badges in tight grid (grid-cols-4 to grid-cols-6)
- Terminal-style code blocks with syntax highlighting
- Matrix-style subtle background pattern

**Founder Mode**:
- Storytelling vertical flow
- Large project cards with problem-solution-impact sections
- Hero-style imagery for case studies
- Generous whitespace (py-24 between sections)
- Soft shadow elevations

**Visitor Mode**:
- Masonry or bento box grid layout
- Fun fact cards with playful icons
- Hobby showcase with visual elements
- Interactive easter eggs (click reveals, hover effects)
- Colorful accent borders

### Skills Grid
- Grid: grid-cols-2 md:grid-cols-4 lg:grid-cols-6
- Skill pills: px-4 py-2, rounded-lg
- Category groupings with subtle dividers
- Proficiency indicators (dots or bars)

### Metrics Panel
- 3-4 column grid of key statistics
- Large numbers: text-4xl font-bold
- Labels beneath: text-sm uppercase tracking-wide
- Animated counter on persona switch

### Project Cards
- Responsive grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Card structure: image/icon + title + description + tech tags + link
- Hover lift effect (hover:scale-105 transition)
- Border or shadow for depth

### Code Showcase
- Full-width code blocks with line numbers
- Tabbed interface for multiple files
- Copy button in top-right
- Background: slightly darker than page background
- Border-radius: rounded-lg

### Experience Timeline
- Vertical timeline with connector line
- Company logo/icon on timeline node
- Date range + role title prominent
- Expandable achievement bullets
- Spacing: space-y-8 between entries

### ATS Analysis Panel
- Slide-out drawer from right (w-96 to w-[480px])
- Tabbed sections: What is ATS | How it Works | Your Score
- Visual workflow diagram
- Keyword highlighting in resume preview
- Backdrop blur overlay when open

### Job Match Predictor Panel
- Modal or full-screen overlay
- Two-column input: JD textarea (left) | Resume textarea (right)
- Processing state with animated loader
- Results dashboard: circular score gauge + skill matches grid + missing skills list
- Shortlist prediction badge: color-coded (green/yellow/red)
- Recommendation cards below

## Transition Animations

**Persona Switch**:
- Smooth 0.6s ease-in-out transitions
- Layout reflow with staggered delays (0.1s increments)
- Fade out → reorder → fade in pattern
- Background gradient shift
- Component scale and position adjustments

**Component Entrances**:
- Fade-in with slight upward movement (translate-y-4)
- Stagger delay: 0.05s to 0.1s between items
- Duration: 0.4s to 0.6s

## Responsive Behavior

**Mobile (<768px)**:
- Identity selector: horizontal scrollable pills
- Single column layouts for all personas
- Reduced padding: p-4 to p-6
- Smaller typography scale

**Tablet (768px-1024px)**:
- 2-column grids where applicable
- Moderate padding: p-8
- Balanced typography

**Desktop (>1024px)**:
- Full multi-column layouts
- Maximum padding: p-12 to p-16
- Full typography scale

## Images

**Hero Section**: Abstract background pattern or gradient (no large hero image needed - focus on identity selector interaction)

**Project Cards**: Project screenshots or representative visuals (400x250px aspect ratio)

**Founder Mode Case Studies**: Before/after comparisons or impact visualization images (16:9 aspect ratio)

**Visitor Mode**: Personal photos, hobby images in circular frames or playful shapes

All images use object-cover, rounded corners (rounded-lg to rounded-xl), and subtle loading state placeholders.

## Accessibility

- Focus states: ring-2 ring-offset-2 with persona-specific accent
- ARIA labels on all interactive elements
- Keyboard navigation for persona switching (arrow keys)
- High contrast text ratios maintained across all personas
- Screen reader announcements on persona switch

## Visual Distinctions

Each persona maintains distinct visual identity through layout density, typography weight, spacing generosity, and component styling while sharing core design language for seamless transitions.