import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');
const svgPath = join(publicDir, 'icon.svg');

const svgBuffer = readFileSync(svgPath);

const sizes = [
  { name: 'favicon.ico', size: 32 },
  { name: 'icon-48.png', size: 48 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-icon-180.png', size: 180 },
];

async function generateIcons() {
  for (const { name, size } of sizes) {
    const outputPath = join(publicDir, name);

    if (name.endsWith('.ico')) {
      // For favicon, just create a 32x32 PNG (browsers accept PNG as favicon)
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath.replace('.ico', '.png'));

      // Also create the actual favicon.ico as PNG renamed
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✓ ${name} (${size}x${size})`);
    } else {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✓ ${name} (${size}x${size})`);
    }
  }

  console.log('\n아이콘 생성 완료!');
}

generateIcons().catch(console.error);
