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

  // Replace src={Variable} with src={Variable?.src || Variable}
  // Be careful not to replace already fixed ones, or strings src="...", or complex template literals if not needed, 
  // but it's mostly src={icon1} we want to fix.
  
  // Regex to match src={identifier}
  content = content.replace(/src=\{([a-zA-Z0-9_]+)\}/g, (match, p1) => {
    changed = true;
    return `src={${p1}?.src || ${p1}}`;
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated images in ${file}`);
  }
});
