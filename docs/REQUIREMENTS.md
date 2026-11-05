# Technical Requirements

## Stack

- Static HTML
- CSS
- Vanilla JavaScript
- No framework required
- No build step required for GitHub Pages

## Folder Structure

```text
.
├── index.html
├── styles.css
├── src
│   └── app.js
├── tests
│   └── verify-formulas.mjs
└── docs
    ├── FORMULA_AUDIT.md
    ├── PRD.md
    └── REQUIREMENTS.md
```

## Formula Engine Rules

- Calculation logic should stay separate from visual styling.
- Preserve the original Excel formula behavior where possible.
- Show formula trace clearly in the UI.
- Document all workbook-preserved constants.
- Any future NW-Hub/imported data must include a source URL and verification date.

## UX Rules

- Do not copy the spreadsheet layout directly.
- Make final stats scannable first.
- Make formula trace available second.
- Make raw spreadsheet-style editing available only when needed.
- Mobile should work as a stacked layout.

## Deployment

This project can be deployed directly with GitHub Pages:

1. Push files to a public GitHub repo.
2. Go to Settings → Pages.
3. Source: Deploy from branch.
4. Branch: `main`.
5. Folder: `/root`.
