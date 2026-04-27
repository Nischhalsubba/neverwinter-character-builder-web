# Formula Audit Summary

Source workbook: NW Char Builder.xlsx

## Workbook Coverage

| Sheet | Formula Cells |
|---|---:|
| README | 0 |
| DPS Template | 28 |
| MSOD DPS Template | 28 |
| HEAL Template | 21 |
| TANK Template | 26 |
| Total | 103 |

## Main Formula Families

Rating percentage:

Rating percent equals 50 plus raw rating plus bonus rating minus item level, divided by 1000.

Final percentage:

Final percent equals capped rating contribution plus gear percent, buff percent, misc percent, and Forte-derived bonuses.

DPS average hit:

The DPS sheets estimate average damage using base damage, magnitude, Power, Critical Strike, Critical Severity, Combat Advantage, Accuracy, and additional multipliers.

## Sheet Purpose

DPS Template: general DPS stat and average-hit calculator.

MSOD DPS Template: DPS variant tuned for MSOD-style content assumptions.

HEAL Template: healing-focused stat calculator using Power, Outgoing Healing, Critical Strike, Critical Severity, and Forte.

TANK Template: tank-focused stat calculator using Defense, Awareness, Critical Avoidance, Forte, and supporting offensive stats.

## Risks

- Workbook formulas are direct cell-reference based.
- Game values may change after Neverwinter patches.
- Buff constants should be validated against current in-game tooltips before production launch.
- Mount aura values should be treated as configurable data.

## Recommended Refactor

- Move constants to data files.
- Add full item database later.
- Add source links and patch verification dates.
- Add unit tests for every role template.
- Add build share links after formula stabilization.
