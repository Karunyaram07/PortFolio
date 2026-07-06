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
    id: "edupath",
    title: "EduPath Navigator",
    slug: "edupath-navigator-sih",
    description: "Award-winning all-in-one educational guidance system built to help students make informed career choices.",
    longDescription: "EduPath Navigator is an all-in-one educational guidance system built to help students make informed career choices. Conceived and developed for the Smart India Hackathon (SIH)—where it emerged as the winning solution—it leverages state-of-the-art AI (Google Genkit), beautiful user interfaces, and an extensive database of educational institutions to transform how students approach their future.",
    techStack: [
      "Next.js 15.5", 
      "React 18", 
      "Tailwind CSS", 
      "Radix UI", 
      "Framer Motion", 
      "Google Genkit AI", 
      "Firebase", 
      "React Flow / XYFlow", 
      "React Leaflet", 
      "Recharts", 
      "next-intl"
    ],
    github: "https://github.com/Karunyaram07/SIH-FINAL-IMPS.git",
    demo: "https://sih-final-imps.vercel.app/en",
    image: "/images/projects/edupath.png",
    featured: true,
    status: "Completed",
    category: "AI & EdTech",
    year: 2025,
    highlights: [
      "👤 Contribution: Led the Frontend Development and spearheaded the integration of the CareerMitra AI chatbot.",
      "🧠 AI-Powered Aptitude Quiz & Stream Suggestion: An intelligent quiz assessing students' interests and skills, suggesting the most suitable academic streams tailored to their unique profile.",
      "🗺️ Interactive Course-to-Career Mapping: A highly visual, node-based interactive map tracking academic courses directly to their ultimate career paths.",
      "🏫 Comprehensive College Directory: A rich, unified directory featuring government and private colleges. Filter by location, eligibility, cut-offs, and available courses seamlessly on an interactive map.",
      "🤖 Personalized AI College Recommendations: Driven by Google Genkit AI, the system deeply analyzes a student's profile and location to recommend the most optimal colleges automatically.",
      "📅 Dynamic Timeline Tracker: Never miss a deadline! Built-in tracking for critical admission dates, scholarships, and exam schedules with personalized reminders.",
      "👨👩👦 Multi-Role Access: Dedicated portals for Students and Parents, alongside an easy-to-use Guest Mode.",
      "🌍 Multilingual Support: Accessible to a broader audience across different regions, built with next-intl."
    ],
    futurePlans: [
      "Introduce voice-based chatbot mentors.",
      "Integrate regional scholarship application auto-filling."
    ]
  },
  {
    id: "nexcareer",
    title: "NexCareer",
    slug: "nexcareer-ai-platform",
    description: "NexCareer is a full-stack AI-powered career platform providing automated resume builders, tailored cover letter generators, and career readiness assessments using Gemini models.",
    longDescription: "NexCareer is a comprehensive career accelerator that empowers job seekers. It features an ATS-optimized resume generator, an AI cover letter builder matching specific job profiles, customized industry skill assessments, and detailed performance analytics driven by Gemini AI.",
    techStack: ["Next.js", "React.js", "Clerk", "Tailwind CSS", "Prisma", "PostgreSQL", "Gemini AI"],
    github: "https://github.com/Karunyaram07/NexCareer",
    demo: "https://nexcareer-eight.vercel.app/",
    image: "/images/projects/nexcareer.png",
    featured: true,
    status: "Completed",
    category: "AI & Full Stack",
    year: 2025,
    highlights: [
      "📄 AI Resume Builder: Create markdown formattable resumes and export to PDF format.",
      "✍️ Cover Letter Generator: Tailor professional cover letters using job description context.",
      "🎯 Industry Assessments: Conduct automated quizzes with personalized performance improvement suggestions.",
      "📊 Career Insights Dashboard: Identify active skill gaps and track user learning curves.",
      "⚡ Automated Industry Trends: Fetch weekly demand data in the background using Inngest."
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
    description: "HappySoul is a full-stack AI-powered mental wellness platform helping users log daily moods, practice customized yoga guides, and consult an empathetic chatbot.",
    longDescription: "Create an AI companion that feels like a peaceful digital mentor—not only answering questions, but also understanding the user's mood and delivering personalized content that improves their mental well-being over time.",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "Gemini API", "Supabase", "Clerk", "Framer Motion"],
    github: "https://github.com/Karunyaram07/HappySoul",
    demo: "",
    image: "/images/projects/happysoul.png",
    featured: true,
    status: "In Progress",
    category: "AI & Full Stack",
    year: 2025,
    highlights: [
      "🧘 Yoga Guidance: Follow customized physical routines tailored to your onboarding questionnaire.",
      "💬 Krishna Chatbot: Interact with an empathetic conversational AI mentor using Gemini API.",
      "🎵 Mood Music Recommendations: Discover mood-specific audio tracks matching your daily sentiment logs.",
      "📖 Inspirational Stories: Explore weekly curated stories and movie suggestions for stress relief.",
      "❤️ Personalized Experience: Receive daily motivational thoughts matching your diagnostic telemetry."
    ],
    futurePlans: [
      "Add automated wellness notifications.",
      "Create localized support circles."
    ]
  },
  {
    id: "green-track",
    title: "Green Track",
    slug: "green-track-complaints",
    description: "Green Track is a full-stack civic reporting system enabling citizens to submit ecological complaints, upload evidence, and track verified resolution pipelines.",
    longDescription: "Green Track is a full-stack web platform that enables citizens to report environmental issues and track the progress of their complaints in real time. The system streamlines communication between citizens and authorities by providing secure complaint submission, image evidence uploads, role-based access control, and status tracking. Designed to promote transparency and accountability, Green Track helps organizations efficiently manage environmental concerns while encouraging community participation in building a cleaner and more sustainable environment.",
    techStack: ["Python", "Flask", "SQLAlchemy", "SQLite", "Tailwind CSS"],
    github: "https://github.com/Karunyaram07/Green_track",
    demo: "",
    image: "/images/projects/greentrack.png",
    featured: true,
    status: "In Progress",
    category: "Web Application",
    year: 2024,
    highlights: [
      "🌍 Relational Dashboard: Access role-based platforms for authenticated citizens and administrative teams.",
      "📸 Photographic Evidence: Log ecological complaints securely with image uploads and location tags.",
      "📈 Real-Time Resolution Tracking: Follow resolution pipelines and workflow steps from submission to completion.",
      "🚨 Automatic Priority Alerts: Alert public utility workers when hazardous conditions are reported.",
      "🔒 Relational Mappings: Store structured incident records and work orders securely in PostgreSQL."
    ],
    futurePlans: [
      "Migrate Python/Flask API to Next.js API Routes.",
      "Add geospatial map integration to display localized issues."
    ]
  }
]
