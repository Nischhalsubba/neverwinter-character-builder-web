# Neverwinter Character Builder Web

A clean web calculator generated from `NW Char Builder.xlsx`.

The UI is intentionally not a literal Excel clone. It is organized into web-app sections, but the calculation model still behaves like the workbook: users manually enter ratings, gear bonuses, buffs, class/race toggles, and misc values, then the original formulas recalculate the final results.

## Product Direction

This project should function like the Excel workbook, not visually copy it.

The app keeps the workbook structure underneath:

- Same source sheets
- Same important cell addresses
- Same manual inputs
- Same formula cells
- Same formula dependencies

But the user-facing UI is grouped into clearer sections:

- Final Results
- Manual Gear and Stat Bonuses
- Damage Estimator
- Self and Team Buffs
- Class and Race Toggles
- Misc Values

## Asset System

The app uses `src/assets.js` as the central icon map.

Current icon behavior:

- Uploaded buff, aura, food, and companion icons are embedded as WebP data URIs.
- Class and race icons are mapped through the same asset system.
- Missing labels fall back to readable initials instead of broken image placeholders.
- Icon rendering happens through the `labelWithIcon()` and `iconHtml()` helpers in `src/app.js`.

## Sheets Included

| Sheet | Purpose |
|---|---|
| README | Original workbook instructions |
| DPS Template | Manual DPS stat and damage calculator |
| MSOD DPS Template | Manual MSOD DPS stat and damage calculator |
| HEAL Template | Manual healer stat calculator |
| TANK Template | Manual tank stat calculator |

## Formula Support

The browser calculator currently supports the formula types used by the workbook:

- Cell references like `B4`, `C18`, `R14`
- Ranges like `C4:R4`
- Arithmetic operators
- `SUM()`
- `MIN()`
- `ROUND()`
- Boolean toggles as `1` or `0`

## Local Preview

```bash
python -m http.server 5173
```

Open:

```text
http://localhost:5173
```

## Deploy to GitHub Pages

Go to repository settings and enable Pages:

```text
Settings → Pages → Deploy from branch → main → /root
```

## Important Notes

- Users should manually enter gear and bonus values exactly as they would in the Excel file.
- Yellow formula fields are locked and calculated automatically.
- Click a formula field to view the original Excel formula.
- Use Export JSON / Import JSON to save and reload builds.
- Neverwinter values may change after patches, so constants should be verified before public release.
