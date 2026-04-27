# Product Requirements Document

## Product

Neverwinter Character Builder Web

## Goal

Convert the original Excel workbook into a guided web app that is easier for players to understand, edit, and share.

## Primary Users

- DPS players optimizing damage.
- Healers balancing Power, Outgoing Healing, Critical Strike, Critical Severity, and Forte.
- Tanks balancing Defense, Awareness, Critical Avoidance, and Forte.
- Party leaders checking mount aura and buff coverage.

## Core Requirements

1. Preserve the Excel formula outputs for:
   - DPS Template
   - MSOD DPS Template
   - HEAL Template
   - TANK Template
2. Support live editing of:
   - Item Level
   - Raw ratings
   - Manual gear/slot percentage bonuses
   - Buff toggles
   - Party aura toggles
   - Class/race/misc toggles
   - Attribute and stack-count fields
3. Show:
   - Rating %
   - Capped rating contribution
   - Gear %
   - Buff %
   - Misc %
   - Forte bonus
   - Final %
4. Add formula trace for every stat.
5. Add web-only UX helpers:
   - Recommendations
   - Build export/import as JSON
   - Mount aura explanation cards
6. Keep the app static and deployable through GitHub Pages.

## Non-goals for v1

- Full NW-Hub data scraping.
- Login/accounts.
- Automatic Best-in-Slot optimizer.
- Combat log parsing.
- Exact healing output or EHP simulation beyond the formulas in the workbook.

## Data Warning

Neverwinter values may change after patches. All constants should be verified against the current game tooltip or trusted public reference before a public production launch.
