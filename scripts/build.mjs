import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

const entriesToCopy = [
  'index.html',
  'styles.css',
  'src',
  'assets'
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of entriesToCopy) {
  try {
    await stat(join(root, entry));
    await cp(join(root, entry), join(dist, entry), { recursive: true });
    console.log(`Copied ${entry} -> dist/${entry}`);
  } catch (error) {
    console.warn(`Skipped ${entry}: ${error.message}`);
  }
}

console.log('Static build completed. Output directory: dist');
