/**
 * @typedef {Object} AchievementEntry
 * @property {string} id - Unique identifier
 * @property {string} title - Title of the achievement
 * @property {string} organization - Issuing body or institution
 * @property {number} year - Year of achievement
 * @property {string} description - Details about the milestone
 * @property {string} icon - React icon name string
 * @property {string} link - Verification link (or empty string)
 * @property {string} theme - Color theme for hover card
 * @property {string} badge - Category/badge tag
 * @property {number} [priority] - Display priority sorting value
 */

/** @type {AchievementEntry[]} */
export const achievements = [
  {
    id: "sih-cert",
    title: "SIH Winner Certificate",
    organization: "Ministry of Education, Government of India",
    year: 2025,
    description: "National grand finale winner certificate for EduPath Navigator system.",
    icon: "FiAward",
    link: "https://drive.google.com/file/d/1znPwMZmT7DUVx2oHK8r5FffWq8639ogn/view?usp=sharing",
    theme: "theme-orange",
    badge: "NATIONAL LAUREL",
    priority: 1
  },
  {
    id: "best-performer",
    title: "Best Performer & SIH Appreciation",
    organization: "Kalasalingam Academy of Research and Education",
    year: 2025,
    description: "Honored with the university's best performer title for academic distinction and project initiatives. Also presented with the SIH Appreciation Award (School of Computing, CSE) during the Parent-Teacher Meeting on March 1, 2026, for outstanding innovation and winning SIH 2025.",
    icon: "FiAward",
    link: "https://drive.google.com/file/d/1rNRg7K2FMXCQemSPuIv4WkeBuPNlDHyY/view?usp=sharing",
    theme: "theme-purple",
    badge: "ACADEMIC EXCELLENCE",
    priority: 2
  },
  {
    id: "ictiee-paper",
    title: "ICTIEE 2026 Research Presentation",
    organization: "ICTIEE 2026 Committee",
    year: 2026,
    description: "Co-authored and published the research paper 'PEARL: Prompt Engineering Pedagogy for Teaching and Learning of Specific Technologies'.",
    icon: "FiAward",
    link: "https://www.linkedin.com/posts/prabhu-ram-karunya-sunkara-11986528a_ictiee-2026-research-presentation-certificate-ugcPost-7438313456425996288-oMWl/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZACGUBSbOVF3d8v7dfFeeCVlr0uy_0aNw",
    theme: "theme-blue",
    badge: "RESEARCH",
    priority: 4
  },
  {
    id: "gpa-first-year",
    title: "1st Year Academic Excellence",
    organization: "Kalasalingam Academy of Research and Education",
    year: 2024,
    description: "Awarded to Sunkara Prabhu Ram Karunya (99230040170) for securing the 1st Rank with a CGPA of 9.41 in the I year B.Tech. Computer Science and Engineering programme during the academic year 2023–2024.",
    icon: "TbCertificate",
    link: "https://drive.google.com/file/d/1bhJIAkHRDmGwLT0p03ON_zmgNwcAKReT/view",
    theme: "theme-green",
    badge: "ACADEMIC RANK",
    priority: 5
  },
  {
    id: "gpa-third-year",
    title: "3rd Year Academic Excellence",
    organization: "Kalasalingam Academy of Research and Education",
    year: 2025,
    description: "Issued by the School of Computing, Department of CSE (KARE). Awarded to Sunkara Prabhu Ram Karunya (99230040170) for securing a top academic rank with a CGPA of 9.41 during the odd semester of the 2025–2026 academic year, presented at the Parent-Teacher Meeting on March 1, 2026.",
    icon: "TbCertificate",
    link: "https://drive.google.com/file/d/1O1bAE7jCffH4o8K5KuKoqQO8r3GgJwql/view?usp=sharing",
    theme: "theme-green",
    badge: "ACADEMIC RANK",
    priority: 6
  }
]
