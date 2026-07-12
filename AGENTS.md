# Repository Instructions

## Setup

This is a static browser application.

```bash
python -m http.server 5173
```

Open `http://localhost:5173`.

## Product scope

The application translates the formulas and manual-input model of `NW Char Builder.xlsx` into a web interface. It is not intended to visually copy Excel. It must preserve workbook behavior while organizing inputs and results into clearer sections.

## Key files

- `index.html`: application shell.
- `src/app.js`: interface rendering, input behavior, formula display, import, and export.
- `src/assets.js`: label-to-icon mapping and embedded assets.
- workbook-derived data/formula files: source cells, formulas, and template definitions.
- `NW Char Builder.xlsx`: original reference workbook when present.

## Formula rules

- Preserve original source-sheet and cell references.
- Keep manual inputs distinct from calculated fields.
- Do not silently change formula semantics.
- Add a regression fixture whenever a formula parser rule changes.
- Treat unsupported Excel functions explicitly rather than returning plausible-looking values.
- Keep Boolean toggles compatible with workbook `1` and `0` behavior.

## Game-data rules

- Neverwinter ratings, caps, buffs, classes, races, and item effects can change after patches.
- Record the source and verification date for constants.
- Do not describe calculated output as officially endorsed or guaranteed accurate.
- Avoid using copyrighted game assets beyond legitimate reference or community-tool use.

## Verification

Before meaningful changes:

1. Serve the static app locally.
2. Compare representative DPS, MSOD DPS, healer, and tank inputs against the workbook.
3. Test cell references, ranges, arithmetic, `SUM`, `MIN`, and `ROUND`.
4. Test Boolean toggles.
5. Test import and export JSON.
6. Test missing icons and readable fallbacks.
7. Test narrow screens and keyboard access.
8. Verify that locked formula fields cannot be overwritten accidentally.

## Do not

- Do not alter workbook formulas without documenting the change.
- Do not claim current-patch accuracy without verification.
- Do not present the repository thumbnail as a runtime screenshot.
- Do not remove source-cell traceability merely to simplify the UI.