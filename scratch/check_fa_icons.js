import fs from 'fs';
import path from 'path';

// Check if fa or fa6 directories exist
const checkPack = (packName) => {
  const file = `node_modules/react-icons/${packName}/index.mjs`;
  if (!fs.existsSync(file)) {
    console.log(`${packName} does not exist`);
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  const regex = /export\s+function\s+(\w+)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const name = match[1];
    if (name.toLowerCase().includes('aws') || name.toLowerCase().includes('amazon')) {
      matches.push(name);
    }
  }
  console.log(`${packName} matches:`, matches);
};

checkPack('fa');
checkPack('fa6');
