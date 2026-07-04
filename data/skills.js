/**
 * @typedef {Object} SkillCategory
 * @property {string} category - Name of the technical category
 * @property {string[]} items - Skills under the category
 */

/** @type {SkillCategory[]} */
export const skills = [
  {
    category: "Languages",
    items: ["JavaScript (ES2024)", "TypeScript", "Python", "C++"]
  },
  {
    category: "Frontend",
    items: ["React 19", "Next.js 16 (App Router)", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Flask"]
  },
  {
    category: "Databases & ORMs",
    items: ["PostgreSQL", "Supabase", "SQL", "Prisma", "SQLAlchemy", "SQLite"]
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Vercel", "VS Code", "PyCharm", "Clerk"]
  },
  {
    category: "AI & APIs",
    items: ["Gemini API", "OpenAI API", "Prompt Engineering (PEARL)", "Generative AI"]
  },
  {
    category: "Other & Research",
    items: ["Web Development", "Software Engineering", "Sensor Fusion (nuScenes, LiDAR)", "Coordinate Transformations"]
  }
]
