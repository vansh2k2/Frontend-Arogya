const fs = require('fs');

const files = [
  'c:/Users/PC/Desktop/Arogya/next/frontend/src/components/home/VisionMissionSection/index.tsx',
  'c:/Users/PC/Desktop/Arogya/next/frontend/src/components/home/WhyArogyaAndTracks/index.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Fix TS image src errors: src={icon?.src || icon} -> src={(icon as any)?.src || (icon as any)}
  content = content.replace(/\{([a-zA-Z0-9_]+)\?\.src \|\| \1\}/g, '{($1 as any)?.src || ($1 as any)}');
  
  // Fix overflow-hidden for these files
  content = content.replace(/overflow-hidden/g, 'overflow-x-hidden');
  
  // Also fix Framer Motion easing TS errors in WhyArogyaAndTracks
  content = content.replace(/ease: \[([\d\.,\s]+)\]/g, 'ease: [$1] as any');
  content = content.replace(/type: 'spring', stiffness: \d+, damping: \d+, mass: \d+/g, '$& as any');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});
