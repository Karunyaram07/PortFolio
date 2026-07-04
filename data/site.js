/**
 * @typedef {Object} SiteConfig
 * @property {string} name - Website name
 * @property {string} title - Default browser title
 * @property {string} description - Search engine description
 * @property {string[]} keywords - SEO tags
 * @property {string} author - Owner's name
 * @property {string} defaultTheme - Theme preference (e.g. system, dark, light)
 * @property {string} locale - Main language locale (e.g. en-US)
 * @property {string} url - Base URL of the website
 * @property {string} ogImagePath - Default OpenGraph metadata image path
 * @property {string} faviconPath - Path to site favicon
 */

/** @type {SiteConfig} */
export const siteConfig = {
  name: "Sunkara Prabhu Ram Karunya Portfolio",
  title: "Sunkara Prabhu Ram Karunya | Software Engineer",
  description: "Personal website and portfolio of Sunkara Prabhu Ram Karunya, highlighting AI integrations, research projects, and full-stack software development experience.",
  keywords: [
    "Sunkara Prabhu Ram Karunya",
    "Karunya Portfolio",
    "Full Stack Developer Portfolio",
    "AI Developer Portfolio",
    "Next.js 16 Portfolio",
    "MulticoreWare Research Student",
    "Kalasalingam University CSE"
  ],
  author: "Sunkara Prabhu Ram Karunya",
  defaultTheme: "system",
  locale: "en-US",
  url: "https://karunya.dev", // Live deployment placeholder URL
  ogImagePath: "/images/og-image.jpg",
  faviconPath: "/favicons/favicon.ico"
}
