/**
 * Image Optimization Script
 * Converts oversized PNGs to WebP & resizes to their actual display size
 * Run: node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'src/assets/icons');
const bannerDir = path.join(__dirname, 'src/assets/banner');
const publicDir = path.join(__dirname, 'public');

// Map: filename → { width, height } in pixels (display size × 2 for retina)
const iconOptimizations = [
  // Small icons displayed at 40×40 → resize to 80×80 retina WebP
  { file: 'c1.png',     w: 80,  h: 80,  quality: 85 },
  { file: 'c31.png',    w: 80,  h: 80,  quality: 85 },
  { file: 'c4.png',     w: 80,  h: 80,  quality: 85 },
  { file: 'c2.png',     w: 80,  h: 80,  quality: 85 },
  // Stats icons displayed at 40×39
  { file: 's1.png',     w: 80,  h: 80,  quality: 85 },
  { file: 's2.png',     w: 80,  h: 80,  quality: 85 },
  { file: 's3.png',     w: 80,  h: 80,  quality: 85 },
  { file: 's4.png',     w: 80,  h: 80,  quality: 85 },
  // Footer icons displayed at ~28×28
  { file: 'foot1.png',  w: 56,  h: 56,  quality: 85 },
  { file: 'foot2.png',  w: 56,  h: 56,  quality: 85 },
  { file: 'foot3.png',  w: 56,  h: 56,  quality: 85 },
  { file: 'foot4.png',  w: 56,  h: 56,  quality: 85 },
  { file: 'foot11.png', w: 56,  h: 56,  quality: 85 },
  { file: 'foot22.png', w: 56,  h: 56,  quality: 85 },
  { file: 'foot33.png', w: 56,  h: 56,  quality: 85 },
  // Vision icon displayed at 32×32
  { file: 'v1.png',     w: 64,  h: 64,  quality: 85 },
  // Ticket displayed at 56×40
  { file: 't1.png',     w: 112, h: 80,  quality: 85 },
  // Decorative elements
  { file: 'gold.png',   w: 360, h: 936, quality: 80 },
  { file: 'footerright.png', w: 360, h: 534, quality: 80 },
  { file: 'footerbot.png',   w: 512, h: 268, quality: 80 },
  { file: 'leafright.png',   w: 320, h: 296, quality: 80 },
  { file: 'leafg.png',       w: 110, h: 298, quality: 80 },
  { file: 'parlia.png',      w: 686, h: 320, quality: 80 },
  { file: 'main22.png',      w: 320, h: 250, quality: 85 },
  { file: 'main.png',        w: 76,  h: 56,  quality: 85 },
  // Notes icon displayed at 36×36
  { file: 'notes.png',  w: 72,  h: 72,  quality: 85 },
  // PDF icon displayed at 36×36
  { file: 'pdf.png',    w: 72,  h: 72,  quality: 85 },
  // Agenda icons displayed at ~40×40
  { file: 'a1.png',     w: 90,  h: 80,  quality: 85 },
  { file: 'a2.png',     w: 78,  h: 80,  quality: 85 },
  { file: 'a3.png',     w: 86,  h: 80,  quality: 85 },
  { file: 'a4.png',     w: 86,  h: 80,  quality: 85 },
  { file: 'a5.png',     w: 108, h: 80,  quality: 85 },
  { file: 'a6.png',     w: 90,  h: 80,  quality: 85 },
  // Feature icons displayed at ~40×40
  { file: 'icon1.png',  w: 84,  h: 80,  quality: 85 },
  { file: 'icon2.png',  w: 92,  h: 80,  quality: 85 },
  { file: 'icon3.png',  w: 156, h: 80,  quality: 85 },
  { file: 'icon4.png',  w: 50,  h: 80,  quality: 85 },
  // Lotus
  { file: 'h1.png',     w: 360, h: 376, quality: 80 },
];

// Public folder images  
const publicOptimizations = [
  { file: 'logo.png',   w: 504, h: 96,  quality: 90, out: 'logo.webp' },
  { file: 'logo1.png',  w: 626, h: 256, quality: 90, out: 'logo1.webp' },
];

let totalOriginal = 0;
let totalOptimized = 0;

async function optimizeFile(inputPath, outputPath, w, h, quality = 85) {
  try {
    const originalSize = fs.statSync(inputPath).size;
    await sharp(inputPath)
      .resize(w, h, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toFile(outputPath);
    const newSize = fs.statSync(outputPath).size;
    totalOriginal += originalSize;
    totalOptimized += newSize;
    const saving = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${saving}% saved)`);
  } catch (err) {
    console.error(`❌ Failed: ${path.basename(inputPath)} — ${err.message}`);
  }
}

async function run() {
  console.log('\n🚀 Arogya Image Optimizer\n' + '='.repeat(40));
  
  console.log('\n📁 Optimizing icons...');
  for (const { file, w, h, quality } of iconOptimizations) {
    const inputPath = path.join(iconsDir, file);
    if (!fs.existsSync(inputPath)) {
      console.log(`⏭️  Skipping (not found): ${file}`);
      continue;
    }
    const outputFile = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const outputPath = path.join(iconsDir, outputFile);
    await optimizeFile(inputPath, outputPath, w, h, quality);
  }

  console.log('\n📁 Optimizing public images...');
  for (const { file, w, h, quality, out } of publicOptimizations) {
    const inputPath = path.join(publicDir, file);
    if (!fs.existsSync(inputPath)) {
      console.log(`⏭️  Skipping (not found): ${file}`);
      continue;
    }
    const outputPath = path.join(publicDir, out || file.replace(/\.(png|jpg)$/i, '.webp'));
    await optimizeFile(inputPath, outputPath, w, h, quality);
  }

  console.log('\n' + '='.repeat(40));
  const totalSaved = totalOriginal - totalOptimized;
  console.log(`📊 Total original: ${(totalOriginal/1024/1024).toFixed(2)} MB`);
  console.log(`📊 Total optimized: ${(totalOptimized/1024/1024).toFixed(2)} MB`);
  console.log(`🎉 Total saved: ${(totalSaved/1024/1024).toFixed(2)} MB (${(totalSaved/totalOriginal*100).toFixed(1)}%)`);
  console.log('\n⚠️  NOTE: Update your import statements to use the new .webp files!');
  console.log('   Example: import c1 from "@/assets/icons/c1.webp"  (instead of c1.png)');
}

run();
