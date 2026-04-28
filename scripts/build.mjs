import { cp, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const iconRoot = join(root, 'assets', 'Icons');
const manifestPath = join(root, 'src', 'icon-manifest.js');

const imageExtensions = new Set(['.png', '.webp', '.jpg', '.jpeg', '.gif', '.svg']);

const entriesToCopy = [
  'index.html',
  'styles.css',
  'src',
  'assets'
];

function normaliseSlashes(value) {
  return value.split(sep).join('/');
}

function removeExtension(filename) {
  return filename.replace(/\.[^.]+$/, '');
}

function normaliseName(value) {
  return String(value || '')
    .replace(/\.[^.]+$/, '')
    .replace(/&/g, 'and')
    .replace(/\(s\)/gi, 's')
    .replace(/\b(icon|icons|boon|aura icon|boon icon)\b/gi, ' ')
    .replace(/\b(exlier|elixir)\b/gi, 'elixir')
    .replace(/[.#_\-]+/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase();
}

async function pathExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function walkImages(dir) {
  const found = [];

  async function walk(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      const lower = entry.name.toLowerCase();
      const extension = lower.slice(lower.lastIndexOf('.'));
      if (!imageExtensions.has(extension)) continue;

      const repoPath = normaliseSlashes(relative(root, absolutePath));
      const relativeIconPath = normaliseSlashes(relative(iconRoot, absolutePath));
      const baseName = removeExtension(entry.name);

      found.push({
        path: repoPath,
        file: entry.name,
        folder: normaliseSlashes(relative(iconRoot, currentDir)),
        relative: relativeIconPath,
        name: baseName,
        normalised: normaliseName(baseName),
        compact: normaliseName(baseName).replace(/\s+/g, '')
      });
    }
  }

  if (await pathExists(dir)) await walk(dir);
  return found.sort((a, b) => a.path.localeCompare(b.path));
}

const icons = await walkImages(iconRoot);
const manifestContent = `// Auto-generated during build by scripts/build.mjs.\n// Do not edit manually. Upload icons into assets/Icons/ and rebuild.\nwindow.NW_ICON_MANIFEST = ${JSON.stringify(icons, null, 2)};\n`;
await writeFile(manifestPath, manifestContent, 'utf8');
console.log(`Generated src/icon-manifest.js with ${icons.length} uploaded icon(s).`);

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
