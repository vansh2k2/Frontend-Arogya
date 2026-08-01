const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const dir = 'c:/Users/PC/Desktop/Arogya/next/frontend/src/components/home';
const files = walkDir(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/overflow-x-hidden/g, '');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Removed overflow-x-hidden from', file);
  }
});
