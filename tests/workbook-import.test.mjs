import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const window = {};
runInNewContext(readFileSync('src/workbook-import.js', 'utf8'), { window }, { timeout: 2000 });
const validate = window.NW_VALIDATE_WORKBOOK;
const valid = { sheets: [{ name: 'DPS Template', maxRow: 20, maxCol: 4, cells: {
  A1: { v: 'Power' }, B1: { v: 100 }, C1: { f: '=SUM(B1:B2)', v: null },
} }] };

test('imports real workbook-shaped sheets and cells', () => {
  assert.equal(validate(valid), true);
});

test('rejects empty, malformed, oversized or unsafe workbook shapes', () => {
  for (const candidate of [
    null, {}, { sheets: [] }, { sheets: 'not-an-array' },
    { sheets: [{ name: 'Broken', cells: {} }] },
    { sheets: [{ name: 'Broken', maxRow: 20, maxCol: 4, cells: null }] },
    { sheets: [{ name: 'Broken', maxRow: 20, maxCol: 4, cells: { A1: null } }] },
    { sheets: [{ name: 'Broken', maxRow: 20, maxCol: 4, cells: { A1: { f: {} } } }] },
    { sheets: [{ name: 'Broken', maxRow: 20, maxCol: 4, cells: { A1: { v: Infinity } } }] },
    { sheets: Array.from({ length: 21 }, (_, i) => ({ name: String(i), maxRow: 1, maxCol: 1, cells: {} })) },
  ]) {
    assert.equal(validate(candidate), false, JSON.stringify(candidate));
  }
});

test('rejects duplicate worksheet identities without mutating the input', () => {
  const duplicate = { sheets: [valid.sheets[0], { ...valid.sheets[0] }] };
  assert.equal(validate(duplicate), false);
  assert.equal(valid.sheets.length, 1);
});
