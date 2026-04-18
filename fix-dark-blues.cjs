/**
 * fix-dark-blues.cjs
 * Unify all dark navy blues to be darker shades of brand blue #004AC6 (hsl 218°)
 * so hero, footer, admin backgrounds all match the brand blue family.
 */
const fs = require('fs');
const path = require('path');

// Map old dark navy blues → brand blue family (same hue ~218°, 100% saturation)
const replacements = [
  // Very dark backgrounds (hero start, footer, admin login)
  ['#04101E', '#001028'],   // hsl(218,100%,8%)
  ['#020617', '#000a1c'],   // hsl(218,100%,5.5%)
  ['#060E1A', '#000e24'],   // hsl(218,100%,7%)
  ['#060E1F', '#000e24'],   // hsl(218,100%,7%)
  
  // Dark backgrounds
  ['#0B1D36', '#001c4a'],   // hsl(218,100%,14.5%)
  ['#0B1929', '#001433'],   // hsl(218,100%,10%)
  ['#0A1128', '#001028'],   // hsl(218,100%,8%)
  ['#0A1628', '#001433'],   // hsl(218,100%,10%)
  
  // Medium dark
  ['#0F2847', '#002b6b'],   // hsl(218,100%,21%)
  ['#0F2044', '#002566'],   // hsl(218,100%,20%)
  ['#0E1E35', '#001f4d'],   // hsl(218,100%,15%)
  
  // Darker medium
  ['#132F52', '#003689'],   // hsl(218,100%,27%)
  ['#162D4D', '#002b6b'],   // hsl(218,100%,21%)
  
  // Premium navy / misc dark blues
  ['#0F172A', '#001433'],   // hsl(218,100%,10%)
  ['#142640', '#001f4d'],   // hsl(218,100%,15%)
  ['#0A1628', '#001433'],   // hsl(218,100%,10%)
  
  // Dark mode gradient blues (Tailwind dark)
  ['#111827', '#001028'],   // hsl(218,100%,8%)
  ['#1E293B', '#001f4d'],   // hsl(218,100%,15%)
];

function walkDir(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
      results = results.concat(walkDir(full));
    } else if (/\.(jsx|css)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const srcDir = path.join(__dirname, 'src');
const files = walkDir(srcDir);
let totalReplacements = 0;
let filesModified = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  let fileReplacements = 0;
  
  for (const [oldVal, newVal] of replacements) {
    // Case-insensitive replacement
    const regex = new RegExp(oldVal.replace('#', '#'), 'gi');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, newVal);
      fileReplacements += matches.length;
    }
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    filesModified++;
    totalReplacements += fileReplacements;
    const rel = path.relative(__dirname, file);
    console.log(`  ✔ ${rel} (${fileReplacements} replacements)`);
  }
}

console.log(`\nDone: ${totalReplacements} replacements in ${filesModified} files`);
