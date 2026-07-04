/**
 * @typedef {Object} EducationEntry
 * @property {string} institution - Name of school, college, or university
 * @property {string} degree - Degree or certification obtained
 * @property {string} duration - Period of attendance (e.g. '2023 - 2027')
 * @property {string} location - Location of the institution
 * @property {string} score - Grade, CGPA, or percentage achieved
 * @property {string} description - Details about the focus of study and achievements
 */

/** @type {EducationEntry[]} */
export const education = [
  {
    institution: "Kalasalingam Academy of Research and Education",
    degree: "B.Tech in Computer Science and Engineering",
    duration: "2023 - 2027",
    location: "Tamil Nadu, India",
    score: "CGPA: 9.52",
    description: "Active research student focusing on Software Engineering, Web Development, and Artificial Intelligence. Recipient of Merit Student Award."
  },
  {
    institution: "Sri Chaitanya Junior College",
    degree: "Higher Secondary Education (Class XII)",
    duration: "2021 - 2023",
    location: "Amalapuram, Andhra Pradesh, India",
    score: "Percentage: 97.4%",
    description: "Completed higher secondary curriculum specializing in Mathematics, Physics, and Chemistry (MPC)."
  },
  {
    institution: "Z.P.P.H.S",
    degree: "Secondary Education (Class X)",
    duration: "2020 - 2021",
    location: "Ainapuram, Andhra Pradesh, India",
    score: "CGPA: 10.0",
    description: "Completed secondary education with a perfect grade point average."
  }
]
