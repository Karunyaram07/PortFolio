import fs from 'fs';

const content = fs.readFileSync('node_modules/react-icons/si/index.mjs', 'utf8');

const regex = /export\s+function\s+(SiAm\w*)/g;
const exports = [];
let match;
while ((match = regex.exec(content)) !== null) {
  exports.push(match[1]);
}
console.log("Matching SiAm exports:", exports);
