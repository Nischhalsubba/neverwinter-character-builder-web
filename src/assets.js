// Neverwinter Character Builder asset map
// Stable icon filenames live in /assets/Icons/.
// All paths use lowercase kebab-case to avoid case-sensitivity and URL encoding issues on Vercel.

const ICON_ROOT = 'assets/Icons/';
const CLASS_ROOT = `${ICON_ROOT}classes/`;
const RACE_ROOT = `${ICON_ROOT}races/`;
const COMPANION_ROOT = `${ICON_ROOT}companions/`;

const icon = (file, fallback) => ({ icon: fallback, src: ICON_ROOT + file });
const classIcon = (file, fallback) => ({ icon: fallback, src: CLASS_ROOT + file });
const raceIcon = (file, fallback) => ({ icon: fallback, src: RACE_ROOT + file });
const companionIcon = (file, fallback) => ({ icon: fallback, src: COMPANION_ROOT + file });
const iconCandidates = (fallback, files) => ({
  icon: fallback,
  src: files[0],
  srcCandidates: files
});

window.NW_ASSETS = {
  notes: 'Stable asset map using renamed lowercase kebab-case filenames from assets/Icons. Do not use spaces, uppercase, or typo filenames for new icon uploads.',
  items: {
    // Core stats without uploaded artwork yet
    'POW': { icon: 'POW' },
    'Power': { icon: 'POW' },
    'ACC': { icon: 'ACC' },
    'Accuracy': { icon: 'ACC' },
    'CA': { icon: 'CA' },
    'Combat Advantage': { icon: 'CA' },
    'C STR': { icon: 'CS' },
    'Critical Strike': { icon: 'CS' },
    'C SEV': { icon: 'CV' },
    'Critical Severity': { icon: 'CV' },
    'FOR': { icon: 'FOR' },
    'Forte': { icon: 'FOR' },
    'OGH': { icon: 'OGH' },
    'Outgoing Healing': { icon: 'OGH' },
    'DEF': { icon: 'DEF' },
    'Defense': { icon: 'DEF' },
    'AWARE': { icon: 'AWA' },
    'Awareness': { icon: 'AWA' },
    'C AVOID': { icon: 'CAV' },
    'Critical Avoidance': { icon: 'CAV' },
    'Damage': { icon: 'DMG' },
    'Magnitude': { icon: 'MAG' },

    // Classes
    'Fighter': classIcon('fighter.webp', 'FI'),
    'Barbarian': classIcon('barbarian.webp', 'BA'),
    'Paladin': classIcon('paladin.webp', 'PA'),
    'Cleric': classIcon('cleric.webp', 'CL'),
    'Wizard': classIcon('wizard.webp', 'WI'),
    'Warlock': classIcon('warlock.webp', 'WA'),
    'Rogue': classIcon('rogue.webp', 'RO'),
    'Ranger': classIcon('ranger.webp', 'RA'),
    'Bard': classIcon('bard.webp', 'BD'),

    // Races
    'Dragonborn': raceIcon('dragonborn.webp', 'DB'),
    'Human': raceIcon('human.webp', 'HU'),
    'Half Orc': raceIcon('half-orc.webp', 'HO'),
    'Half-Orc': raceIcon('half-orc.webp', 'HO'),
    'Aasimar': raceIcon('aasimar.webp', 'AS'),
    'Gith': raceIcon('gith.webp', 'GI'),
    'Wood Elf': raceIcon('wood-elf.webp', 'WE'),
    'Half Elf': raceIcon('half-elf.webp', 'HE'),
    'Half-Elf': raceIcon('half-elf.webp', 'HE'),
    'Dwarf': raceIcon('dwarf.webp', 'DW'),
    'Drow': raceIcon('drow.webp', 'DR'),
    'Halfling': raceIcon('halfling.webp', 'HF'),
    'Menzoberranzan Renegade': raceIcon('menzoberranzan-renegade.webp', 'MR'),
    'Metallic Ancestry Dragonborn': raceIcon('metallic-dragonborn.webp', 'MD'),
    'Metallic Dragonborn': raceIcon('metallic-dragonborn.webp', 'MD'),
    'Moon Elf': raceIcon('moon-elf.webp', 'ME'),
    'Sun Elf': raceIcon('sun-elf.webp', 'SE'),
    'Tiefling': raceIcon('tiefling.webp', 'TF'),

    // Food / self buffs / consumables
    'Hot Wings': icon('hot-wings.png', 'HW'),
    'Squash Soup': iconCandidates('SS', [`${ICON_ROOT}squash-soup.png`, `${ICON_ROOT}squash-soup.webp`]),
    'Sorbet': icon('watermelon-sorbet.png', 'WS'),
    'Watermelon Sorbet': icon('watermelon-sorbet.png', 'WS'),
    'Flask': icon('flask-of-potency.png', 'FL'),
    'Flask of Potency': icon('flask-of-potency.png', 'FL'),
    'Wild Storm': icon('wild-storm-elixir.png', 'WS'),
    'Wild Storm Elixir': icon('wild-storm-elixir.png', 'WS'),
    'Forger': icon('forger-box.png', 'FG'),
    'Forger Box': icon('forger-box.png', 'FG'),
    'Totem': icon('spider-totem.png', 'TM'),
    'Spider Totem': icon('spider-totem.png', 'TM'),
    'Sunlord': icon('sunlord-elixir.png', 'SL'),
    'Sunlord Elixir': icon('sunlord-elixir.png', 'SL'),

    // Guild boons
    'Guild Pow': icon('guild-power-boon.png', 'GP'),
    'Guild Power': icon('guild-power-boon.png', 'GP'),
    'Guild Power Boon': icon('guild-power-boon.png', 'GP'),
    'Guild Acc': icon('guild-accuracy-boon.png', 'GA'),
    'Guild Accuracy': icon('guild-accuracy-boon.png', 'GA'),
    'Guild Accuracy Boon': icon('guild-accuracy-boon.png', 'GA'),
    'Guild Crit Str': icon('guild-critical-strike-boon.png', 'GC'),
    'Guild Critical Strike': icon('guild-critical-strike-boon.png', 'GC'),
    'Guild Critical Strike Boon': icon('guild-critical-strike-boon.png', 'GC'),
    'Guild OGH': iconCandidates('GO', [`${ICON_ROOT}guild-ogh-boon.png`, `${ICON_ROOT}guild-outgoing-healing-boon.png`]),
    'Guild Aware': iconCandidates('GW', [`${ICON_ROOT}guild-awareness-boon.png`, `${ICON_ROOT}guild-aware-boon.png`]),

    // Aura / mount / team buffs
    'Mystic Aura': icon('mystic-aura.png', 'MA'),
    'Runic Aura': icon('runic-aura.png', 'RA'),
    'Pack #1': icon('pack-tactics.png', 'P1'),
    'Pack #2': icon('pack-tactics.png', 'P2'),
    'Pack Tactics': icon('pack-tactics.png', 'PT'),
    'Avian Aura(s)': icon('avian-aura.png', 'AA'),
    'Avian Aura': icon('avian-aura.png', 'AA'),
    'Pally Crit Aura': icon('paladin-critical-strike-aura.png', 'PC'),
    'Paladin Critical Strike Aura': icon('paladin-critical-strike-aura.png', 'PC'),
    'Pally Def Aura': iconCandidates('PD', [`${ICON_ROOT}paladin-defense-aura.png`, `${ICON_ROOT}pally-defense-aura.png`]),
    'Paladin Defense Aura': iconCandidates('PD', [`${ICON_ROOT}paladin-defense-aura.png`, `${ICON_ROOT}pally-defense-aura.png`]),
    'Blue Fire Eye': icon('blue-fire-eye.png', 'BE'),
    'Bluefire Eye': icon('blue-fire-eye.png', 'BE'),

    // Companions — prefer main PNGs, then folder WebP versions as fallback
    'Raptor x4': iconCandidates('RP', [`${ICON_ROOT}raptor.png`, `${COMPANION_ROOT}raptor.webp`]),
    'Raptor': iconCandidates('RP', [`${ICON_ROOT}raptor.png`, `${COMPANION_ROOT}raptor.webp`]),
    'Portobello': iconCandidates('PO', [`${ICON_ROOT}portobello.png`, `${COMPANION_ROOT}portobello.webp`]),
    'Tutor': iconCandidates('TU', [`${ICON_ROOT}tutor.png`, `${COMPANION_ROOT}tutor.webp`]),
    'Flapjack': iconCandidates('FJ', [`${ICON_ROOT}flapjack.png`, `${COMPANION_ROOT}flapjack.webp`]),
    'Drizzt': iconCandidates('DZ', [`${ICON_ROOT}drizzt.png`, `${COMPANION_ROOT}drizzt.webp`]),
    'Driz': iconCandidates('DZ', [`${ICON_ROOT}drizzt.png`, `${COMPANION_ROOT}drizzt.webp`]),
    'Etrien': iconCandidates('ET', [`${ICON_ROOT}etrien.png`, `${COMPANION_ROOT}etrien.webp`]),
    'Captain Sartell': icon('captain-sartell.png', 'CS'),
    'Sartell': icon('captain-sartell.png', 'CS'),
    'Minsc': iconCandidates('MI', [`${ICON_ROOT}minsc.png`, `${COMPANION_ROOT}minsc.webp`]),

    // Misc values / collars / master boons
    'Crit Sev Collar': icon('critical-severity-collar.png', 'CSC'),
    'Critical Sev Collar': icon('critical-severity-collar.png', 'CSC'),
    'Critical Severity Collar': icon('critical-severity-collar.png', 'CSC'),
    'Blessed Adv.': icon('blessed-advantage-master-boon.png', 'BA'),
    'Blessed Advantage': icon('blessed-advantage-master-boon.png', 'BA'),
    'Blessed Adv': icon('blessed-advantage-master-boon.png', 'BA'),
    'Max Boons': iconCandidates('MB', [`${ICON_ROOT}max-boons.png`, `${ICON_ROOT}blessed-advantage-master-boon.png`]),
    'Physical Dmg': iconCandidates('PD', [`${ICON_ROOT}physical-damage.png`, `${ICON_ROOT}physical-dmg.png`]),
    'Physical Damage': iconCandidates('PD', [`${ICON_ROOT}physical-damage.png`, `${ICON_ROOT}physical-dmg.png`]),
    'Magical Dmg': iconCandidates('MD', [`${ICON_ROOT}magical-damage.png`, `${ICON_ROOT}magical-dmg.png`]),
    'Magical Damage': iconCandidates('MD', [`${ICON_ROOT}magical-damage.png`, `${ICON_ROOT}magical-dmg.png`]),

    // Extra manual labels
    'Fizzy Brew': iconCandidates('FB', [`${ICON_ROOT}fizzy-brew.png`, `${ICON_ROOT}fizzy-brew.webp`]),
    'Seed Bread': iconCandidates('SB', [`${ICON_ROOT}seed-bread.png`, `${ICON_ROOT}seed-bread.webp`]),
    'Defense Potion': iconCandidates('DP', [`${ICON_ROOT}defense-potion.png`, `${ICON_ROOT}defense-potion.webp`]),
    'Power Potion': iconCandidates('PP', [`${ICON_ROOT}power-potion.png`, `${ICON_ROOT}power-potion.webp`]),
    'Crit Str Potion': iconCandidates('CP', [`${ICON_ROOT}crit-str-potion.png`, `${ICON_ROOT}critical-strike-potion.png`]),
    'Steadfast Elixir': iconCandidates('SE', [`${ICON_ROOT}steadfast-elixir.png`, `${ICON_ROOT}steadfast-elixir.webp`]),
    'Chain': iconCandidates('CH', [`${ICON_ROOT}chain.png`, `${ICON_ROOT}chain.webp`]),
    'Other': { icon: 'OT' }
  }
};
