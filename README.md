# Neverwinter Character Builder Web

A web-based Neverwinter character builder generated from an Excel workbook.

This project converts the original spreadsheet formulas into a cleaner, interactive web experience for DPS, MSOD DPS, Heal, and Tank builds.

## What This App Does

- Preserves the formula logic from `NW Char Builder.xlsx`.
- Supports four starter templates:
  - DPS Template
  - MSOD DPS Template
  - HEAL Template
  - TANK Template
- Lets players edit:
  - Item Level
  - Raw ratings
  - Gear/slot percent bonuses
  - Buff toggles
  - Mount aura toggles
  - Class/race/misc toggles
  - Attributes and aura stack counts
- Shows:
  - Rating %
  - Final %
  - Formula trace
  - Build recommendations
  - DPS average-hit estimate
  - Heal/Tank readiness helper scores

## Formula Coverage

The source workbook contains `103` formula cells.

| Sheet | Formula Cells |
|---|---:|
| README | 0 |
| DPS Template | 28 |
| MSOD DPS Template | 28 |
| HEAL Template | 21 |
| TANK Template | 26 |

See [`docs/FORMULA_AUDIT.md`](docs/FORMULA_AUDIT.md) for every formula cell.

## Project Structure

```text
.
├── index.html
├── styles.css
├── src
│   ├── app.js
│   ├── data
│   │   ├── classesRaces.js
│   │   ├── mountAuras.js
│   │   └── presets.js
│   └── engine
│       └── formulas.js
├── tests
│   └── verify-formulas.mjs
└── docs
    ├── FORMULA_AUDIT.md
    ├── PRD.md
    └── REQUIREMENTS.md
```

## Local Preview

Because this app uses ES modules, preview it through a local server.

```bash
python -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

## Run Formula Verification

```bash
npm test
```

The verification script checks that the web formula engine matches the cached Excel outputs for the starting templates.

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload/push all files.
3. Go to `Settings → Pages`.
4. Select:
   - Source: `Deploy from branch`
   - Branch: `main`
   - Folder: `/root`
5. Save.

## Important Data Notes

- The current version uses workbook-preserved formula constants.
- NW-Hub/class/race/mount data should be rechecked before public release.
- Mount aura values are stored in `src/data/mountAuras.js`.
- Do not copy third-party game/NW-Hub images into this repo unless you have permission.

## Recommended Next Improvements

- Add full gear database.
- Add companion database.
- Add mount/insignia database.
- Add dungeon/trial presets.
- Add shareable build links.
- Add full combat log parser integration.
- Add “what should I change first?” optimization engine.
