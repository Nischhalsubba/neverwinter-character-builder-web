const fs = await import('node:fs');
const app = fs.readFileSync('src/app.js', 'utf8');
const required = [
  'DPS Template',
  'MSOD DPS Template',
  'HEAL Template',
  'TANK Template',
  'ratingPercent',
  'finalPercent',
  'averageHit',
  'Mystic Aura',
  'Runic Aura',
  'Pack Tactics',
  'Avian Aura'
];
const missing = required.filter((item) => !app.includes(item));
if (missing.length) {
  console.error('Missing required app fragments:', missing.join(', '));
  process.exit(1);
}
console.log('Formula smoke verification passed. Core templates, formulas, and mount auras are present.');
