<div align="center">

<img src="./docs/assets/neverwinter-character-builder-thumbnail.svg" width="100%" alt="Neverwinter Character Builder Web branded thumbnail" />

# Neverwinter Character Builder Web

<!-- interactive-readme-standard:start -->

> [!NOTE]
> **Branch-specific documentation:** this section is maintained for [`main`](https://github.com/Nischhalsubba/neverwinter-character-builder-web/tree/main). It is generated from the files present on this branch and preserves the project-authored README below.

<details open>
<summary><strong>Interactive repository guide</strong></summary>

## Branch overview

| Item | Value |
|---|---|
| Repository | [`Nischhalsubba/neverwinter-character-builder-web`](https://github.com/Nischhalsubba/neverwinter-character-builder-web) |
| Branch | [`main`](https://github.com/Nischhalsubba/neverwinter-character-builder-web/tree/main) |
| Detected stack | JavaScript, HTML, CSS |
| Detected manifests | package.json |
| Documentation policy | Every maintained branch must explain purpose, setup, structure, architecture, flows, testing, delivery, security, and ownership. |

## Repository structure

```mermaid
flowchart TD
    ROOT["neverwinter-character-builder-web / main"]
    ROOT --> P0[".github/"]
    ROOT --> P1["assets/"]
    ROOT --> P2["docs/"]
    ROOT --> P3["scripts/"]
    ROOT --> P4["src/"]
    ROOT --> P5["tests/"]
    ROOT --> P6[".gitignore"]
    ROOT --> P7[".nojekyll"]
    ROOT --> P8["AGENTS.md"]
    ROOT --> P9["index.html"]
    ROOT --> P10["llms.txt"]
    ROOT --> P11["package.json"]
    ROOT --> P12["robots.txt"]
    ROOT --> P13["styles.css"]
    ROOT --> P14["vercel.json"]
```

The diagram is generated from the branch's actual top-level files and directories. Use the branch link above for complete source navigation.

## Website or application structure

```mermaid
flowchart TD
    APP["neverwinter-character-builder-web"]
    APP --> SOURCE["No conventional route directory detected"]
    SOURCE --> VERIFY["Inspect the project-specific documentation below"]
```

## Application and responsibility flow

```mermaid
flowchart LR
    ACTOR["User / contributor"]
    ACTOR --> A0["Interface: src"]
    A0 --> A1["Quality: tests"]
    A1 --> A2["Documentation: docs"]
    A2 --> A3["Delivery: .github, scripts"]
    A3 --> DELIVERY["Delivery: vercel.json, GitHub Actions"]
```

## Change-to-delivery flow

```mermaid
flowchart LR
    CHANGE["Change on main"]
    CHECK["Validate: npm run start, npm run build, npm run test"]
    REVIEW["Review documentation and architecture impact"]
    RELEASE["Merge, release, or deploy according to this branch"]
    CHANGE --> CHECK --> REVIEW --> RELEASE
```

## README requirements for this branch

- Explain what this branch contains and how it differs from the default branch.
- Keep installation, configuration, usage, testing, deployment, security, support, and license information accurate.
- Document repository, website or application, API, data, authentication, background-job, and deployment flows when they exist.
- Prefer Mermaid diagrams and expandable `<details>` sections for visual navigation.
- Link diagrams and modules to real source paths; never invent missing components.
- Preserve project-specific documentation and update diagrams whenever architecture or major paths change.
- Treat secrets, private infrastructure, customer data, and credentials as prohibited README content.

</details>

<!-- interactive-readme-standard:end -->

### Workbook-driven stat and damage calculator with a clearer browser interface

A static web calculator generated from `NW Char Builder.xlsx`. It preserves the workbook's manual inputs, source sheets, important cell addresses, and formula dependencies while organizing them into web-friendly sections.

![Static app](https://img.shields.io/badge/App-Static%20Browser%20Calculator-111827?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-Formula%20Engine-F7DF1E?style=flat-square&logo=javascript&logoColor=111111)
![Stars](https://img.shields.io/github/stars/Nischhalsubba/neverwinter-character-builder-web?style=flat-square)
![Forks](https://img.shields.io/github/forks/Nischhalsubba/neverwinter-character-builder-web?style=flat-square)
![Issues](https://img.shields.io/github/issues/Nischhalsubba/neverwinter-character-builder-web?style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/Nischhalsubba/neverwinter-character-builder-web?style=flat-square)

[Repository instructions](./AGENTS.md)

</div>

## Product direction

The project should behave like the Excel workbook without visually cloning it.

The user manually enters ratings, gear bonuses, buffs, class and race toggles, and miscellaneous values. The browser formula engine then recalculates derived results and lets the user inspect the original formula behind calculated fields.

## Main sections

- Final Results
- Manual Gear and Stat Bonuses
- Damage Estimator
- Self and Team Buffs
- Class and Race Toggles
- Misc Values

## Workbook templates

| Sheet | Purpose |
|---|---|
| README | Original workbook instructions |
| DPS Template | General DPS ratings and damage calculation |
| MSOD DPS Template | MSOD-specific DPS calculation |
| HEAL Template | Healer stat calculation |
| TANK Template | Tank stat calculation |

## Formula support

The browser calculator currently supports:

- cell references such as `B4`, `C18`, and `R14`
- ranges such as `C4:R4`
- arithmetic operators
- `SUM()`
- `MIN()`
- `ROUND()`
- Boolean toggles represented as `1` or `0`

Calculated fields remain locked and can expose the original workbook formula for traceability.

## Asset system

`src/assets.js` is the central icon map.

- buff, aura, food, and companion icons can be embedded as WebP data URIs
- class and race icons use the same map
- unknown labels fall back to readable initials
- `labelWithIcon()` and `iconHtml()` render icon-enhanced labels

## Run locally

```bash
python -m http.server 5173
```

Open:

```text
http://localhost:5173
```

## GitHub Pages

The project can be served directly from the repository root:

```text
Settings → Pages → Deploy from branch → main → /root
```

Verify asset paths after deployment.

## Current status

| Area | Status |
|---|---|
| Workbook-derived templates | Present |
| Manual stat inputs | Implemented |
| Formula evaluation | Implemented for documented formula types |
| Formula inspection | Implemented |
| Icon mapping and fallbacks | Implemented |
| JSON import/export | Documented |
| Automated workbook regression tests | Not confirmed |
| Current-patch data verification | Required |
| Fresh browser screenshot | Not captured in this pass |

The repository thumbnail is a designed presentation asset based on the actual calculator workflow. It is not a browser screenshot.

## Important limitations

- Neverwinter ratings, buffs, classes, races, and item effects can change after patches.
- The web calculator is independent and is not affiliated with the game's rights holders.
- Unsupported workbook formulas must be identified explicitly.
- Results should be compared against known workbook fixtures before release.

## Recommended next work

1. Add regression fixtures from each workbook template.
2. Test formula parser edge cases.
3. Add source and patch-verification dates to game constants.
4. Add accessibility labels and keyboard review.
5. Capture real desktop and mobile screenshots after deployment verification.

## Author

Maintained by Nischhal Raj Subba.
