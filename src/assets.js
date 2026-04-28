function nwIcon(label, bg = '#2b2417', fg = '#ead29b') {
  const safeLabel = String(label || 'NW').slice(0, 3).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="#11110f"/></linearGradient></defs><rect width="80" height="80" rx="14" fill="url(#g)"/><rect x="5" y="5" width="70" height="70" rx="11" fill="none" stroke="#c99a3d" stroke-opacity=".45" stroke-width="2"/><circle cx="40" cy="40" r="25" fill="#000" fill-opacity=".18"/><text x="40" y="47" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="22" font-weight="900" fill="${fg}">${safeLabel}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const C = {
  stat: '#273245', damage: '#4a2d2d', class: '#283a52', race: '#343622', buff: '#4a351a', aura: '#243d3b', comp: '#352642', food: '#4a2c1d', guild: '#263a28', misc: '#2b2417'
};

window.NW_ASSETS = {
  notes: 'Inline icon map. Every used workbook label now has a valid data-URI icon so the live app does not depend on missing uploaded files or broken asset paths.',
  items: {
    // Stats
    'POW': { icon: 'P', src: nwIcon('POW', C.stat) },
    'ACC': { icon: 'A', src: nwIcon('ACC', C.stat) },
    'CA': { icon: 'CA', src: nwIcon('CA', C.stat) },
    'C STR': { icon: 'CS', src: nwIcon('CS', C.stat) },
    'C SEV': { icon: 'CV', src: nwIcon('CV', C.stat) },
    'FOR': { icon: 'F', src: nwIcon('FOR', C.stat) },
    'OGH': { icon: 'OH', src: nwIcon('OGH', C.stat) },
    'DEF': { icon: 'D', src: nwIcon('DEF', C.stat) },
    'AWARE': { icon: 'AW', src: nwIcon('AWR', C.stat) },
    'C AVOID': { icon: 'AV', src: nwIcon('AVD', C.stat) },
    'Damage': { icon: 'DMG', src: nwIcon('DMG', C.damage) },
    'Magnitude': { icon: 'MAG', src: nwIcon('MAG', C.damage) },

    // Classes
    'Fighter': { icon: 'FT', src: nwIcon('FIG', C.class) },
    'Barbarian': { icon: 'BB', src: nwIcon('BAR', C.class) },
    'Paladin': { icon: 'PL', src: nwIcon('PAL', C.class) },
    'Cleric': { icon: 'CL', src: nwIcon('CLR', C.class) },
    'Wizard': { icon: 'WZ', src: nwIcon('WIZ', C.class) },
    'Warlock': { icon: 'WL', src: nwIcon('WLK', C.class) },
    'Rogue': { icon: 'RO', src: nwIcon('ROG', C.class) },
    'Ranger': { icon: 'RG', src: nwIcon('RNG', C.class) },
    'Bard': { icon: 'BD', src: nwIcon('BRD', C.class) },

    // Races
    'Dragonborn': { icon: 'DB', src: nwIcon('DRG', C.race) },
    'Human': { icon: 'HU', src: nwIcon('HUM', C.race) },
    'Half Orc': { icon: 'HO', src: nwIcon('ORC', C.race) },
    'Half-Orc': { icon: 'HO', src: nwIcon('ORC', C.race) },
    'Aasimar': { icon: 'AS', src: nwIcon('AAS', C.race) },
    'Gith': { icon: 'GI', src: nwIcon('GTH', C.race) },
    'Wood Elf': { icon: 'WE', src: nwIcon('WEL', C.race) },
    'Half Elf': { icon: 'HE', src: nwIcon('HEL', C.race) },
    'Half-Elf': { icon: 'HE', src: nwIcon('HEL', C.race) },
    'Dwarf': { icon: 'DW', src: nwIcon('DWF', C.race) },
    'Drow': { icon: 'DR', src: nwIcon('DRW', C.race) },
    'Halfling': { icon: 'HF', src: nwIcon('HFL', C.race) },
    'Menzoberranzan Renegade': { icon: 'MR', src: nwIcon('MR', C.race) },
    'Metallic Ancestry Dragonborn': { icon: 'MD', src: nwIcon('MDB', C.race) },
    'Moon Elf': { icon: 'ME', src: nwIcon('MEL', C.race) },
    'Sun Elf': { icon: 'SE', src: nwIcon('SEL', C.race) },
    'Tiefling': { icon: 'TF', src: nwIcon('TFL', C.race) },

    // Self buffs / consumables
    'Hot Wings': { icon: 'HW', src: nwIcon('HW', C.food) },
    'Squash Soup': { icon: 'SS', src: nwIcon('SS', C.food) },
    'Sorbet': { icon: 'SB', src: nwIcon('SB', C.food) },
    'Watermelon Sorbet': { icon: 'SB', src: nwIcon('SB', C.food) },
    'Flask': { icon: 'FL', src: nwIcon('FLK', C.buff) },
    'Wild Storm': { icon: 'WS', src: nwIcon('WS', C.buff) },
    'Forger': { icon: 'FG', src: nwIcon('FRG', C.buff) },
    'Totem': { icon: 'TM', src: nwIcon('TOT', C.buff) },
    'Sunlord': { icon: 'SL', src: nwIcon('SUN', C.buff) },
    'Fizzy Brew': { icon: 'FB', src: nwIcon('FB', C.food) },
    'Seed Bread': { icon: 'SB', src: nwIcon('SB', C.food) },
    'Defense Potion': { icon: 'DP', src: nwIcon('DP', C.buff) },
    'Power Potion': { icon: 'PP', src: nwIcon('PP', C.buff) },
    'Crit Str Potion': { icon: 'CP', src: nwIcon('CP', C.buff) },
    'Steadfast Elixir': { icon: 'SE', src: nwIcon('SE', C.buff) },
    'Chain': { icon: 'CH', src: nwIcon('CH', C.buff) },

    // Guild boons
    'Guild Pow': { icon: 'GP', src: nwIcon('GP', C.guild) },
    'Guild Power': { icon: 'GP', src: nwIcon('GP', C.guild) },
    'Guild Acc': { icon: 'GA', src: nwIcon('GA', C.guild) },
    'Guild Accuracy': { icon: 'GA', src: nwIcon('GA', C.guild) },
    'Guild Crit Str': { icon: 'GC', src: nwIcon('GC', C.guild) },
    'Guild OGH': { icon: 'GO', src: nwIcon('GO', C.guild) },
    'Guild Aware': { icon: 'GW', src: nwIcon('GW', C.guild) },

    // Mount / aura icons
    'Mystic Aura': { icon: 'MA', src: nwIcon('MA', C.aura) },
    'Runic Aura': { icon: 'RA', src: nwIcon('RA', C.aura) },
    'Pack #1': { icon: 'P1', src: nwIcon('P1', C.aura) },
    'Pack #2': { icon: 'P2', src: nwIcon('P2', C.aura) },
    'Pack Tactics': { icon: 'PT', src: nwIcon('PT', C.aura) },
    'Avian Aura(s)': { icon: 'AA', src: nwIcon('AA', C.aura) },
    'Avian Aura': { icon: 'AA', src: nwIcon('AA', C.aura) },
    'Pally Crit Aura': { icon: 'PC', src: nwIcon('PC', C.aura) },
    'Pally Def Aura': { icon: 'PD', src: nwIcon('PD', C.aura) },
    'Blue Fire Eye': { icon: 'BE', src: nwIcon('BE', C.aura) },

    // Companions
    'Raptor x4': { icon: 'RP', src: nwIcon('RAP', C.comp) },
    'Raptor': { icon: 'RP', src: nwIcon('RAP', C.comp) },
    'Portobello': { icon: 'PO', src: nwIcon('POR', C.comp) },
    'Tutor': { icon: 'TU', src: nwIcon('TUT', C.comp) },
    'Flapjack': { icon: 'FJ', src: nwIcon('FLP', C.comp) },
    'Drizzt': { icon: 'DZ', src: nwIcon('DRZ', C.comp) },
    'Driz': { icon: 'DZ', src: nwIcon('DRZ', C.comp) },
    'Etrien': { icon: 'ET', src: nwIcon('ETR', C.comp) },
    'Captain Sartell': { icon: 'CS', src: nwIcon('CS', C.comp) },
    'Minsc': { icon: 'MI', src: nwIcon('MIN', C.comp) },

    'Other': { icon: 'OT', src: nwIcon('OT', C.misc) }
  }
};
