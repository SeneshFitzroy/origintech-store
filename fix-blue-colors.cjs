const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else if (item.name.endsWith('.jsx') || item.name.endsWith('.css')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getAllFiles(srcDir);

// Replacement rules: [regex, replacement]
const replacements = [
  // Primary action blues → brand blue #004AC6
  [/#2563EB/gi, '#004AC6'],
  [/#3B82F6/gi, '#004AC6'],

  // Darker/hover blues → brand hover #003a9d
  [/#1D4ED8/gi, '#003a9d'],
  [/#1E40AF/gi, '#003a9d'],
  [/#0369A1/gi, '#003a9d'],

  // Lighter accent blues
  [/#60A5FA/gi, '#4d94ff'],
  [/#93C5FD/gi, '#80b3ff'],

  // Light background tints (badge bgs etc)
  [/#BFDBFE/gi, '#99c2ff'],
  [/#DBEAFE/gi, '#b3d1ff'],
  [/#EFF6FF/gi, '#e6f0ff'],
  [/#E0F2FE/gi, '#e6f0ff'],
  [/#F0F9FF/gi, '#f0f5ff'],

  // RGBA values - map to rgb(0,74,198) = #004AC6
  [/rgba\(37\s*,\s*99\s*,\s*235/g, 'rgba(0,74,198'],
  [/rgba\(59\s*,\s*130\s*,\s*246/g, 'rgba(0,74,198'],
  [/rgba\(96\s*,\s*165\s*,\s*250/g, 'rgba(0,74,198'],
  [/rgba\(100\s*,\s*160\s*,\s*255/g, 'rgba(0,74,198'],
  [/rgba\(30\s*,\s*64\s*,\s*175/g, 'rgba(0,60,157'],
];

let totalChanges = 0;
let changedFiles = [];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let fileChanges = 0;

  for (const [pattern, replacement] of replacements) {
    const matches = content.match(pattern);
    if (matches) {
      content = content.replace(pattern, replacement);
      fileChanges += matches.length;
    }
  }

  if (fileChanges > 0) {
    fs.writeFileSync(file, content, 'utf8');
    const rel = path.relative(__dirname, file);
    console.log(`  ${rel} (${fileChanges} replacements)`);
    changedFiles.push(rel);
    totalChanges += fileChanges;
  }
}

console.log(`\nDone: ${totalChanges} replacements across ${changedFiles.length} files`);
