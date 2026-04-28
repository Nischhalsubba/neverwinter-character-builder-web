// Neverwinter Character Builder asset map
// Real uploaded icon files live in /assets/Icons/.
// Do not embed base64 here. The app should load normal image files so Vercel/GitHub can serve them reliably.

const ICON_ROOT = 'assets/Icons/';
const icon = (file, fallback) => ({ icon: fallback, src: ICON_ROOT + file });
const iconCandidates = (fallback, files) => ({ icon: fallback, src: ICON_ROOT + files[0], srcCandidates: files.map((file) => ICON_ROOT + file) });

window.NW_ASSETS = {
  notes: 'Uses real uploaded image files from assets/Icons. Workbook labels are mapped to the exact uploaded filenames, including existing spelling such as Portebelo, Startel, Wildstrom, potecy, and Crtical.',
  items: {
    // Core stats
    'POW': { icon: 'POW' },
    'ACC': { icon: 'ACC' },
    'CA': { icon: 'CA' },
    'C STR': { icon: 'C S' },
    'C SEV': { icon: 'C S' },
    'FOR': { icon: 'FOR' },
    'OGH': { icon: 'OGH' },
    'DEF': { icon: 'DEF' },
    'AWARE': { icon: 'AWA' },
    'C AVOID': { icon: 'C A' },
    'Damage': { icon: 'DAM' },
    'Magnitude': { icon: 'MAG' },

    // Classes from NW-Hub asset URLs
    'Fighter': { icon: 'FI', src: 'https://nw-hub.com/assets/classes/emblems/fighter.webp' },
    'Barbarian': { icon: 'BA', src: 'https://nw-hub.com/assets/classes/emblems/barbarian.webp' },
    'Paladin': { icon: 'PA', src: 'https://nw-hub.com/assets/classes/emblems/paladin.webp' },
    'Cleric': { icon: 'CL', src: 'https://nw-hub.com/assets/classes/emblems/cleric.webp' },
    'Wizard': { icon: 'WI', src: 'https://nw-hub.com/assets/classes/emblems/wizard.webp' },
    'Warlock': { icon: 'WA', src: 'https://nw-hub.com/assets/classes/emblems/warlock.webp' },
    'Rogue': { icon: 'RO', src: 'https://nw-hub.com/assets/classes/emblems/rogue.webp' },
    'Ranger': { icon: 'RA', src: 'https://nw-hub.com/assets/classes/emblems/ranger.webp' },
    'Bard': { icon: 'BA', src: 'https://nw-hub.com/assets/classes/emblems/bard.webp' },

    // Races from NW-Hub asset URLs
    'Dragonborn': { icon: 'D', src: 'https://nw-hub.com/assets/classes/races/dragonborn.webp' },
    'Human': { icon: 'H', src: 'https://nw-hub.com/assets/classes/races/human.webp' },
    'Half Orc': { icon: 'HO', src: 'https://nw-hub.com/assets/classes/races/half-orc.webp' },
    'Half-Orc': { icon: 'HO', src: 'https://nw-hub.com/assets/classes/races/half-orc.webp' },
    'Aasimar': { icon: 'A', src: 'https://nw-hub.com/assets/classes/races/aasimar.webp' },
    'Gith': { icon: 'G', src: 'https://nw-hub.com/assets/classes/races/gith.webp' },
    'Wood Elf': { icon: 'WE', src: 'https://nw-hub.com/assets/classes/races/wood-elf.webp' },
    'Half Elf': { icon: 'HE', src: 'https://nw-hub.com/assets/classes/races/half-elf.webp' },
    'Half-Elf': { icon: 'HE', src: 'https://nw-hub.com/assets/classes/races/half-elf.webp' },
    'Dwarf': { icon: 'D', src: 'https://nw-hub.com/assets/classes/races/dwarf.webp' },
    'Drow': { icon: 'D', src: 'https://nw-hub.com/assets/classes/races/drow.webp' },
    'Halfling': { icon: 'H', src: 'https://nw-hub.com/assets/classes/races/halfling.webp' },
    'Menzoberranzan Renegade': { icon: 'MR', src: 'https://nw-hub.com/assets/classes/races/menzoberranzan-renegade.webp' },
    'Metallic Ancestry Dragonborn': { icon: 'MAD', src: 'https://nw-hub.com/assets/classes/races/metallic-ancestry-dragonborn.webp' },
    'Moon Elf': { icon: 'ME', src: 'https://nw-hub.com/assets/classes/races/moon-elf.webp' },
    'Sun Elf': { icon: 'SE', src: 'https://nw-hub.com/assets/classes/races/sun-elf.webp' },
    'Tiefling': { icon: 'T', src: 'https://nw-hub.com/assets/classes/races/tiefling.webp' },

    // Uploaded food / self buff icons
    'Hot Wings': icon('Hot Wings.png', 'HW'),
    'Squash Soup': iconCandidates('SS', ['Squash Soup.png', 'Squash Soup Icon.png']),
    'Sorbet': icon('Watermelon Sorbet Icon.png', 'S'),
    'Watermelon Sorbet': icon('Watermelon Sorbet Icon.png', 'S'),
    'Flask': iconCandidates('F', ['Flask of potecy Icon.png', 'Flask of potency Icon.png', 'Flask.png']),
    'Wild Storm': iconCandidates('WS', ['Wildstrom Exlier.png', 'Wildstorm Exlier.png', 'Wild Storm.png', 'Wild Storm Icon.png']),
    'Forger': iconCandidates('F', ['Forger Box Icon.png', 'Forger.png', 'Forger Icon.png']),
    'Totem': iconCandidates('T', ['Spider totem icon.png', 'Spider Totem Icon.png', 'Totem.png', 'Totem Icon.png']),
    'Sunlord': iconCandidates('S', ['Sunlord exlier Icon.png', 'Sunlord Elixir Icon.png', 'Sunlord.png', 'Sunlord Icon.png']),

    // Uploaded guild boon icons
    'Guild Pow': icon('Guild Power Boon Icon.png', 'GP'),
    'Guild Power': icon('Guild Power Boon Icon.png', 'GP'),
    'Guild Acc': icon('Guild Accuracy Boon Icon.png', 'GA'),
    'Guild Accuracy': icon('Guild Accuracy Boon Icon.png', 'GA'),
    'Guild Crit Str': iconCandidates('GC', ['Guild Crit Str Boon Icon.png', 'Guild Critical Strike Boon Icon.png', 'Guild Crit Str.png']),
    'Guild OGH': iconCandidates('GO', ['Guild OGH Boon Icon.png', 'Guild OGH.png']),
    'Guild Aware': iconCandidates('GW', ['Guild Awareness Boon Icon.png', 'Guild Aware.png']),

    // Uploaded aura / team buff icons
    'Mystic Aura': icon('Mystic Aura.png', 'MA'),
    'Runic Aura': iconCandidates('RA', ['Runic Aura Icon.png', 'Runic Aura.png']),
    'Pack #1': iconCandidates('P1', ['Pack Tactics Icon.png', 'Pack Tactics.png']),
    'Pack #2': iconCandidates('P2', ['Pack Tactics Icon.png', 'Pack Tactics.png']),
    'Pack Tactics': iconCandidates('PT', ['Pack Tactics Icon.png', 'Pack Tactics.png']),
    'Avian Aura(s)': icon('Avian Aura.png', 'AA'),
    'Avian Aura': icon('Avian Aura.png', 'AA'),
    'Pally Crit Aura': iconCandidates('PC', ['Paladin Crtical Strike Aura.png', 'Paladin Critical Strike Aura.png', 'Pally Crit Aura.png']),
    'Pally Def Aura': iconCandidates('PD', ['Paladin Defense Aura.png', 'Pally Def Aura.png']),
    'Blue Fire Eye': iconCandidates('BF', ['Bluefire Eye Icon.png', 'Blue Fire Eye Icon.png', 'Blue Fire Eye.png', 'Bluefire Eye.png']),

    // Uploaded companion icons
    'Raptor x4': iconCandidates('RX', ['Raptor Icon.png', 'Raptor.png']),
    'Raptor': iconCandidates('RX', ['Raptor Icon.png', 'Raptor.png']),
    'Portobello': iconCandidates('P', ['Portebelo Icon.png', 'Portobello Icon.png', 'Portobello.png']),
    'Tutor': iconCandidates('T', ['Tutor Icon.png', 'Tutor.png']),
    'Flapjack': iconCandidates('FJ', ['Flapjack Icon.png', 'Flapjack.png']),
    'Drizzt': iconCandidates('D', ['Driz Icon.png', 'Drizzt Icon.png', 'Drizzt.png']),
    'Driz': iconCandidates('D', ['Driz Icon.png', 'Drizzt Icon.png', 'Drizzt.png']),
    'Etrien': iconCandidates('ET', ['Etrien Icon.png', 'Etrien.png']),
    'Captain Sartell': iconCandidates('CS', ['Startel Icon.png', 'Sartell Icon.png', 'Captain Sartell Icon.png', 'Captain Sartell.png']),
    'Minsc': iconCandidates('M', ['minsc Icon.png', 'Minsc Icon.png', 'Minsc.png']),

    // Extra manual labels
    'Fizzy Brew': iconCandidates('FB', ['Fizzy Brew.png', 'Fizzy Brew Icon.png']),
    'Seed Bread': iconCandidates('SB', ['Seed Bread.png', 'Seed Bread Icon.png']),
    'Defense Potion': iconCandidates('DP', ['Defense Potion.png', 'Defense Potion Icon.png']),
    'Power Potion': iconCandidates('PP', ['Power Potion.png', 'Power Potion Icon.png']),
    'Crit Str Potion': iconCandidates('CP', ['Crit Str Potion.png', 'Crit Str Potion Icon.png']),
    'Steadfast Elixir': iconCandidates('SE', ['Steadfast Elixir.png', 'Steadfast Elixir Icon.png']),
    'Chain': iconCandidates('CH', ['Chain.png', 'Chain Icon.png']),
    'Other': { icon: 'OT' }
  }
};
