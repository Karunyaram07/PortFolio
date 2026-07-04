/**
 * @typedef {Object} ExperienceEntry
 * @property {string} company - Name of the organization
 * @property {string} role - Position held
 * @property {string} duration - Period of work (e.g. 'Jul 2025 - Present')
 * @property {string} location - Physical location or Remote
 * @property {string[]} description - Core responsibilities and deliverables
 * @property {string[]} technologies - Tools, frameworks, and languages utilized
 */

/** @type {ExperienceEntry[]} */
export const experience = [
  {
    company: "MulticoreWare Inc",
    role: "Research Student",
    duration: "Jul 2025 - Present",
    location: "Chennai, India (Remote)",
    description: [
      "Explored the nuScenes autonomous driving dataset, including its radar, LiDAR, camera, and metadata annotations.",
      "Studied 3D sensor fusion concepts and radar-to-camera mapping coordinate transformation workflows using Python tools."
    ],
    technologies: ["Python", "OpenCV", "NumPy", "Matplotlib", "LiDAR Tools", "Coordinate Transformations"]
  }
]
