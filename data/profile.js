/**
 * @typedef {Object} Profile
 * @property {string} fullName - Full name of the user
 * @property {string} shortName - Short or preferred name
 * @property {string} professionalTitle - Professional description or title
 * @property {string} tagline - Catchy subtitle or motto
 * @property {string} location - Current physical location
 * @property {string} email - Primary contact email
 * @property {string} phone - Primary contact phone number
 * @property {string} university - Name of current institution
 * @property {string} degree - Degree title
 * @property {string} specialization - Area of engineering focus
 * @property {number} graduationYear - Expected graduation year
 * @property {number} currentCGPA - CGPA score
 * @property {string} profileImagePath - Relative path to the avatar image
 * @property {string} resumePath - Relative path to the PDF resume
 * @property {string} availability - Employment/work status description
 * @property {string} bio - Detailed self-introduction
 * @property {string[]} bioParagraphs - List of biography paragraphs for layout rendering
 * @property {string} heroDescription - Introductory pitch for the homepage
 */

/** @type {Profile} */
export const profile = {
  fullName: "Prabhu Ram Karunya Sunkara",
  shortName: "Prabhu Ram Karunya Sunkara",
  professionalTitle: "Aspiring AI Engineer & Full Stack Developer",
  tagline: "SIH’25 Winner | CS Final-Year @ KARE | Building AI-Powered Full-Stack Applications",
  location: "Tamil Nadu, India",
  email: "sprkarunya986@gmail.com",
  phone: "+91-9603153719",
  university: "Kalasalingam Academy of Research and Education",
  degree: "B.Tech",
  specialization: "Computer Science and Engineering",
  graduationYear: 2027,
  currentCGPA: 9.51,
  profileImagePath: "/images/hero/avatar.png",
  resumePath: "/my_resume.pdf",
  availability: "Available for Internships, Research Collaborations, and Freelance Projects",
  bio: "I build AI products end-to-end — from the React component someone clicks, through the API call, down to the database that remembers what happened. Most recently that meant shipping NexCareer, a career platform where the AI doesn't just generate generic cover letters; it reads the job description first and grounds its output in that context.",
  bioParagraphs: [
    "I build AI products end-to-end — from the React component someone clicks, through the API call, down to the database that remembers what happened. Most recently that meant shipping NexCareer, a career platform where the AI doesn't just generate generic cover letters; it actually reads the job description first and grounds its output in that context, so what comes out feels relevant instead of templated.",
    "I'm a final-year Computer Science student at Kalasalingam (CGPA 9.51), and I got here by being the person who'd rather break something building it than leave it untouched. That instinct paid off at Smart India Hackathon 2025, where our team won the Grand Finale. It's also what pulled me into research at MulticoreWare, where I've been working with the nuScenes dataset, learning how radar, LiDAR, and camera data get fused together to help a system understand the world around it.",
    "On the stack side: Next.js and React for frontends, Python and Flask for backends, Docker to keep environments consistent, Postgres, and Prisma for data. On the AI side: prompt engineering, context retrieval, and building real pipelines with the Gemini API — not just calling an endpoint, but designing the retrieval step that makes the output actually useful. I primarily build with Next.js, React, Python, Flask, PostgreSQL, Prisma, Supabase, Docker, and modern cloud technologies.",
    "I also co-authored a paper on prompt engineering pedagogy (PEARL, ICTIEE 2026), because I like understanding why something works, not just that it does.",
    "Right now I'm looking for a Full-Stack Developer or AI Engineer role — ideally one where I can keep building things end-to-end and learn from people who've shipped at a scale I haven't yet.",
    "If that sounds like a fit, reach me at sprkarunya986@gmail.com or send a connection request here. I reply."
  ],
  heroDescription: "Final-year Computer Science student specializing in building end-to-end AI products and sensor fusion workflows. Smart India Hackathon 2025 Grand Winner."
}
