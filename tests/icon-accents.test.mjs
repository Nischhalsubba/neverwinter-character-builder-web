import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

test('icon matching gives accented and unaccented labels equal match quality', () => {
  const source = readFileSync('src/icon-runtime.js', 'utf8');
  const window = {
    NW_ICON_MANIFEST: [{
      path: 'assets/Icons/elite-dragon.png',
      file: 'elite-dragon.png',
      name: 'Elite Dragon',
      normalised: 'elite dragon',
      compact: 'elitedragon',
    }],
    NW_ASSETS: { items: {} },
    requestAnimationFrame: () => {},
  };
  const document = { body: {}, querySelectorAll: () => [] };
  class MutationObserver { observe() {} }
  runInNewContext(source, { window, document, MutationObserver, encodeURI }, { timeout: 2000 });
  const accented = window.NW_ICON_DEBUG.scoreFor('Élite Dragon');
  const unaccented = window.NW_ICON_DEBUG.scoreFor('Elite Dragon');
  assert.equal(accented[0].path, 'assets/Icons/elite-dragon.png');
  assert.equal(accented[0].score, unaccented[0].score);
});
