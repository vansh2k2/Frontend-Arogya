const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace \`url(\${Variable})\` with \`url(\${Variable?.src || Variable})\`
  // We need to capture the variable name inside \${}
  const regex = /`url\(\$\{([^}]+)\}\)`/g;
  
  content = content.replace(regex, (match, p1) => {
    // If it already has .src or ||, skip
    if (p1.includes('.src') || p1.includes('||')) {
      return match;
    }
    changed = true;
    return `\`url(\${${p1}?.src || ${p1}})\``;
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated bg images in ${file}`);
  }
});
