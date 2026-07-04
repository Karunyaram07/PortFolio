/**
 * @typedef {Object} AchievementEntry
 * @property {string} title - Title of the achievement
 * @property {string} organization - Issuing body or institution
 * @property {number} year - Year of achievement
 * @property {string} description - Details about the milestone
 * @property {string} icon - Name of corresponding Lucide icon
 */

/** @type {AchievementEntry[]} */
export const achievements = [
  {
    title: "Smart India Hackathon 2025 – Grand Finale Winner",
    organization: "Ministry of Education, Government of India",
    year: 2025,
    description: "Won first place in the grand finale of the national hackathon for developing high-impact engineering solutions.",
    icon: "trophy"
  },
  {
    title: "Best Performer 2025",
    organization: "Kalasalingam Academy of Research and Education",
    year: 2025,
    description: "Honored with the university's best performer title for academic distinction and project initiatives.",
    icon: "award"
  },
  {
    title: "ICTIEE 2026 Research Paper Acceptance",
    organization: "ICTIEE 2026 Committee",
    year: 2026,
    description: "Co-authored and published the research paper 'PEARL: Prompt Engineering Pedagogy for Teaching and Learning of Specific Technologies'.",
    icon: "book-open"
  },
  {
    title: "First Rank in B.Tech First Year",
    organization: "Kalasalingam Academy of Research and Education",
    year: 2024,
    description: "Secured the top position in the first year of studies with a Merit Student Award (CGPA: 9.41).",
    icon: "medal"
  },
  {
    title: "3rd Rank CSE Department",
    organization: "Kalasalingam Academy of Research and Education",
    year: 2025,
    description: "Ranked third overall across the entire Computer Science and Engineering department.",
    icon: "star"
  }
]
