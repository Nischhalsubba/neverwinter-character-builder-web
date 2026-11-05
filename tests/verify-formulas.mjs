import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

// Verify the actual workbook-based calculator, rather than identifiers from
// a previous prototype that are no longer present in this app.
const app = readFileSync('src/app.js', 'utf8');
const assets = readFileSync('src/assets.js', 'utf8');
for (const symbol of ['function evaluateCell(', 'function evaluateFormula(', 'function recalc(', 'function buildBreakdown(']) {
  assert.ok(app.includes(symbol), `Missing calculator engine: ${symbol}`);
}
const sandbox = { window: { WORKBOOK_SHEETS: [] } };
for (let index = 1; index <= 5; index++) {
  const source = readFileSync(`src/sheet-${index}.js`, 'utf8');
  runInNewContext(source, sandbox, { timeout: 2000, filename: `sheet-${index}.js` });
}
const sheets = sandbox.window.WORKBOOK_SHEETS;
assert.ok(sheets.length >= 5, 'Missing workbook sheets');

for (const name of ['DPS Template', 'MSOD DPS Template', 'HEAL Template', 'TANK Template']) {
  const sheet = sheets.find((item) => item.name === name);
  assert.ok(sheet, `Missing workbook template: ${name}`);
  const cells = Object.values(sheet.cells ?? {});
  assert.ok(cells.some((cell) => typeof cell.f === 'string' && cell.f.length > 0), `Missing editable formula-backed calculations in ${name}`);
  assert.ok(cells.some((cell) => cell.v === 'Ratings %'), `Missing rating column in ${name}`);
  assert.ok(cells.some((cell) => cell.v === 'Final %'), `Missing final percentage in ${name}`);
}
const workbookText = JSON.stringify(sheets);
assert.ok(workbookText.includes('Avg Hit'), 'Missing average-hit calculation label');
for (const aura of ['Mystic Aura', 'Runic Aura', 'Pack Tactics', 'Avian Aura']) {
  assert.ok(workbookText.includes(aura) || assets.includes(aura), `Missing mount aura: ${aura}`);
}
console.log('Formula smoke verification passed: engine, workbook templates, formula cells, ratings, damage, and auras.');
