/**
 * @typedef {Object} CertificationEntry
 * @property {string} id - Unique identifier
 * @property {string} title - Title of the certification
 * @property {string} issuer - Issuing authority
 * @property {number} year - Year of issue
 * @property {string} credentialLink - Verification link (or empty string)
 * @property {string} description - Details about the certification
 * @property {string} theme - Color theme for the hover card
 * @property {string} icon - React icon name string
 * @property {string} badge - Display tag / category badge
 */

/** @type {CertificationEntry[]} */
export const certifications = [
  {
    id: "anthropic-claude",
    title: "Claude with API Certification",
    issuer: "Anthropic / Skilljar",
    year: 2025,
    credentialLink: "https://verify.skilljar.com/c/872oourmc5e9",
    badge: "AI DEVELOPMENT",
    theme: "theme-purple",
    icon: "SiAnthropic",
    description: "Completed Anthropic Claude platform development and prompt engineering API course."
  },
  {
    id: "ibm-started-ai",
    title: "Getting Started with AI",
    issuer: "IBM / Credly",
    year: 2025,
    credentialLink: "https://www.credly.com/badges/11c2358e-4bc9-4675-9b36-7213f33f9199",
    badge: "FOUNDATIONAL AI",
    theme: "theme-blue",
    icon: "TbCertificate",
    description: "Completed IBM certification badge for foundational AI concepts and models."
  },
  {
    id: "ibm-skillsbuild-intro",
    title: "Intro to AI Certificate",
    issuer: "IBM SkillsBuild",
    year: 2025,
    credentialLink: "https://drive.google.com/file/d/1HNKlcuyL4dv-gXyEixNYlBpC1a9u0BSW/view?usp=sharing",
    badge: "AI CREDENTIAL",
    theme: "theme-blue",
    icon: "TbCertificate",
    description: "Successfully completed IBM SkillsBuild training pathway for artificial intelligence."
  },
  {
    id: "tcs-young-professional",
    title: "TCS Young Professional",
    issuer: "TCS iON",
    year: 2024,
    credentialLink: "https://drive.google.com/file/d/1WdlwFmt19HxhY6AjbVfxGfhcX3MpFFgk/view",
    badge: "PROFESSIONAL",
    theme: "theme-green",
    icon: "FiCode",
    description: "Completed TCS iON Career Edge – Young Professional course covering professional development."
  },
  {
    id: "codechef-daa",
    title: "Design & Analysis of Algorithms",
    issuer: "CodeChef",
    year: 2023,
    credentialLink: "https://www.codechef.com/certificates/public/a5077fe",
    badge: "ALGORITHMS",
    theme: "theme-green",
    icon: "FiCode",
    description: "Awarded to SUNKARA PRABHU RAM KARUNYA 2023-CSE for completing <a href='/learn/course/kl-daa-2025' class='text-accent underline font-bold hover:brightness-110'>Design and Analysis of Algorithms</a> course."
  },
  {
    id: "codechef-dbms",
    title: "Database Management Systems",
    issuer: "CodeChef",
    year: 2023,
    credentialLink: "https://www.codechef.com/certificates/public/2130b9e",
    badge: "DATABASES",
    theme: "theme-orange",
    icon: "FiDatabase",
    description: "Awarded to SUNKARA PRABHU RAM KARUNYA 2023-CSE for completing 212CSE2305: DATABASE MANAGEMENT SYSTEMS course."
  }
]
