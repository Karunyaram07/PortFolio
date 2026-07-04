/**
 * @typedef {Object} Project
 * @property {string} id - Unique identifier
 * @property {string} title - Project title
 * @property {string} slug - URL friendly identifier
 * @property {string} description - Brief summary of the project
 * @property {string} longDescription - Detailed overview
 * @property {string[]} techStack - Tech stack used
 * @property {string} github - Repository link
 * @property {string} demo - Live demo link
 * @property {string} image - Path to preview image
 * @property {boolean} featured - Is featured on homepage
 * @property {string} status - Current state (Completed, In Progress)
 * @property {string} category - Work category (AI, Full Stack, Web)
 * @property {number} year - Year of creation
 * @property {string[]} highlights - Key achievements or features
 * @property {string[]} futurePlans - Next milestones
 */

/** @type {Project[]} */
export const projects = [
  {
    id: "nexcareer",
    title: "NexCareer",
    slug: "nexcareer-ai-platform",
    description: "AI-powered career development platform offering ATS-friendly resumes and AI cover letter creators.",
    longDescription: "NexCareer is a comprehensive career accelerator that empowers job seekers. It features an ATS-optimized resume generator, an AI cover letter builder matching specific job profiles, customized industry skill assessments, and detailed performance analytics driven by Gemini AI.",
    techStack: ["Next.js", "React.js", "Clerk", "Tailwind CSS", "Prisma", "PostgreSQL", "Gemini AI"],
    github: "https://github.com/sprkarunya986/nexcareer",
    demo: "",
    image: "/images/projects/nexcareer.jpg",
    featured: true,
    status: "Completed",
    category: "AI & Full Stack",
    year: 2025,
    highlights: [
      "Built real-time ATS-friendly resume scoring and formatting models.",
      "Utilized Gemini API to automate tailored cover letter generation.",
      "Integrated secure authentication and session management via Clerk."
    ],
    futurePlans: [
      "Add interactive voice-based mock interviews.",
      "Incorporate real-time salary negotiation insights."
    ]
  },
  {
    id: "happysoul",
    title: "HappySoul",
    slug: "happysoul-mental-health",
    description: "Mental wellness platform using conversational AI and mood tracking.",
    longDescription: "HappySoul is a mental wellness platform designed to facilitate mindful living. It integrates an empathetic conversational agent using LLMs, real-time mood logging, and breathing exercises supported by micro-animations. It uses Supabase for database state.",
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "Gemini API", "Supabase", "Clerk", "Framer Motion"],
    github: "https://github.com/sprkarunya986/happysoul",
    demo: "",
    image: "/images/projects/happysoul.jpg",
    featured: true,
    status: "In Progress",
    category: "AI & Full Stack",
    year: 2025,
    highlights: [
      "Designed clean micro-animations for stress-relief breathing elements.",
      "Implemented daily sentiment analysis tracking and charts.",
      "Configured lightweight database storage with Supabase PostgreSQL."
    ],
    futurePlans: [
      "Create localized anonymous support forums.",
      "Add automated wellness reminder notifications."
    ]
  },
  {
    id: "pearl-tutor",
    title: "PEARL Tutor",
    slug: "pearl-tutor-prompt-engineering",
    description: "Interactive AI tutor designed for prompt engineering pedagogy.",
    longDescription: "PEARL Tutor is an educational system implementing prompt engineering pedagogies. Built as a companion application to a co-authored research paper accepted at ICTIEE 2026, it walks students through prompt formatting rules, monitors variables, and tests results.",
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "OpenAI API", "Supabase", "Clerk"],
    github: "https://github.com/sprkarunya986/pearl-tutor",
    demo: "",
    image: "/images/projects/pearl-tutor.jpg",
    featured: true,
    status: "Completed",
    category: "EdTech & Research",
    year: 2026,
    highlights: [
      "Direct implementation of the PEARL pedagogy structure.",
      "Interactive coding-like playground for prompts evaluation.",
      "Validated in academic settings with detailed user research metrics."
    ],
    futurePlans: [
      "Open-source the underlying prompt validator SDK.",
      "Incorporate visual diagramming for multi-agent workflows."
    ]
  },
  {
    id: "green-track",
    title: "Green Track",
    slug: "green-track-complaints",
    description: "Environmental complaint tracking platform with public and administrative dashboards.",
    longDescription: "Green Track allows citizens to log local environmental issues, upload images as evidence, and trace the status of complaints. Administrators receive visual alerts, allocate tasks to public workers, and publish resolution steps.",
    techStack: ["Python", "Flask", "SQLAlchemy", "SQLite", "Tailwind CSS"],
    github: "https://github.com/sprkarunya986/green-track",
    demo: "",
    image: "/images/projects/greentrack.jpg",
    featured: false,
    status: "Completed",
    category: "Web Application",
    year: 2024,
    highlights: [
      "Configured role-based access control for citizens and admins.",
      "Implemented secure local image uploads and relational mappings.",
      "Created lightweight and responsive dashboard layouts using Tailwind."
    ],
    futurePlans: [
      "Migrate Python/Flask API to Next.js API Routes.",
      "Add geospatial map integration to display localized issues."
    ]
  }
]
