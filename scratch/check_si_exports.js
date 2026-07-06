import fs from 'fs';

const content = fs.readFileSync('node_modules/react-icons/si/index.mjs', 'utf8');

const checkList = [
  "SiPython", "SiJavascript", "SiTypescript", "SiCplusplus",
  "SiNextdotjs", "SiReact", "SiTailwindcss",
  "SiExpress", "SiFastapi", "SiFlask",
  "SiSupabase", "SiPrisma", "SiMongodb", "SiSqlite",
  "SiTensorflow", "SiKeras", "SiNumpy", "SiPandas",
  "SiDocker", "SiGit", "SiGithub", "SiVercel", "SiNetlify", "SiPostman"
];

checkList.forEach(icon => {
  const exists = content.includes(`export function ${icon}`);
  console.log(`${icon}: ${exists ? "FOUND" : "NOT FOUND"}`);
});
