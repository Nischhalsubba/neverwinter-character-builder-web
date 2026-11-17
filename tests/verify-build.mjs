import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const buildScript = resolve(dirname(fileURLToPath(import.meta.url)), '../scripts/build.mjs');

async function fixture() {
  const directory = await mkdtemp(join(tmpdir(), 'nw-static-build-'));
  await mkdir(join(directory, 'src'));
  await mkdir(join(directory, 'assets'));
  await writeFile(join(directory, 'styles.css'), 'body { color: black; }');
  return directory;
}

test('missing index.html fails before overwriting existing dist', async (t) => {
  const directory = await fixture();
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(join(directory, 'dist'));
  await writeFile(join(directory, 'dist', 'previous.html'), 'keep');

  const result = spawnSync(process.execPath, [buildScript], { cwd: directory, encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Required build input missing: index\.html/);
  assert.equal(await readFile(join(directory, 'dist', 'previous.html'), 'utf8'), 'keep');
  await assert.rejects(readFile(join(directory, 'src', 'icon-manifest.js')), { code: 'ENOENT' });
});

test('complete required files produce a build without optional files', async (t) => {
  const directory = await fixture();
  t.after(() => rm(directory, { recursive: true, force: true }));
  await writeFile(join(directory, 'index.html'), '<!doctype html><title>Test</title>');

  const result = spawnSync(process.execPath, [buildScript], { cwd: directory, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(await readFile(join(directory, 'dist', 'index.html'), 'utf8'), /Test/);
  assert.match(await readFile(join(directory, 'dist', 'src', 'icon-manifest.js'), 'utf8'), /NW_ICON_MANIFEST/);
});
