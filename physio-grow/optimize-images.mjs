import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';

const PUBLIC_DIR = './public/assets';
const MAX_WIDTH = 800;
const QUALITY = 75;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const info = await stat(filePath);
  const originalSize = info.size;
  const tmpPath = join(dirname(filePath), `_tmp_${basename(filePath)}`);

  try {
    const buffer = await sharp(filePath).toBuffer();
    let pipeline = sharp(buffer);
    const metadata = await sharp(buffer).metadata();

    // Resize if wider than MAX_WIDTH
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    }

    await pipeline.toFile(tmpPath);
    const tmpInfo = await stat(tmpPath);

    if (tmpInfo.size < originalSize) {
      await unlink(filePath);
      await rename(tmpPath, filePath);
      const saved = ((1 - tmpInfo.size / originalSize) * 100).toFixed(1);
      console.log(`✅ ${filePath}: ${(originalSize / 1024).toFixed(0)}KB → ${(tmpInfo.size / 1024).toFixed(0)}KB (${saved}% saved)`);
    } else {
      await unlink(tmpPath);
      console.log(`⏭️  ${filePath}: Already optimized`);
    }
  } catch (err) {
    try { await unlink(tmpPath); } catch {}
    console.error(`❌ ${filePath}: ${err.message}`);
  }
}

async function main() {
  console.log('🔧 Optimizing images...\n');
  const files = await getFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} images to optimize\n`);

  for (const file of files) {
    await optimizeImage(file);
  }

  console.log('\n✅ Done!');
}

main();
