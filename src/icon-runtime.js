/*
  Runtime icon binder for Neverwinter Character Builder.

  Goal:
  - Use every old/new uploaded icon from assets/Icons and its subfolders.
  - Match icons to workbook labels by exact name, compact name, aliases, and word overlap.
  - Example: "Pally Crit Aura" can match "Paladin Crtical Strike Aura.png".
  - Example: "Blue Fire Eye" can match "Bluefire Eye Icon.png".
*/
(function () {
  const ROOTS = [
    'assets/Icons/',
    'assets/Icons/Buffs/',
    'assets/Icons/Buff/',
    'assets/Icons/Auras/',
    'assets/Icons/Aura/',
    'assets/Icons/Companions/',
    'assets/Icons/Companion/',
    'assets/Icons/Mounts/',
    'assets/Icons/Mount/',
    'assets/Icons/Food/',
    'assets/Icons/Foods/',
    'assets/Icons/Guild/',
    'assets/Icons/Guilds/',
    'assets/Icons/Misc/',
    'assets/icons/',
    'assets/icons/buffs/',
    'assets/icons/companions/',
    'assets/icons/mounts/'
  ];

  const EXTENSIONS = ['png', 'webp', 'jpg', 'jpeg', 'gif', 'svg', 'PNG', 'WEBP', 'JPG', 'JPEG', 'GIF', 'SVG'];
  const IGNORED_LABELS = new Set(['', 'Stat', 'Value', 'Class', 'Enable', 'Misc', 'Used?', 'Buff']);
  const GENERIC_WORDS = new Set(['icon', 'icons', 'boon', 'boons', 'aura', 'auras', 'the', 'of']);
  const failedSrc = new Set();
  const loadedSrc = new Set();

  const TOKEN_ALIASES = {
    pally: 'paladin',
    pali: 'paladin',
    pal: 'paladin',
    crtical: 'critical',
    critcal: 'critical',
    crit: 'critical',
    c: '',
    str: 'strike',
    sev: 'severity',
    pow: 'power',
    acc: 'accuracy',
    aware: 'awareness',
    avoid: 'avoidance',
    exlier: 'elixir',
    elixer: 'elixir',
    potecy: 'potency',
    bluefire: 'blue fire',
    wildstrom: 'wild storm',
    startel: 'sartell',
    portebelo: 'portobello',
    driz: 'drizzt'
  };

  function normalizeLabel(value) {
    let text = String(value || '')
      .trim()
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\(s\)/g, 's')
      .replace(/[.#_\-]+/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();

    Object.entries(TOKEN_ALIASES).forEach(([from, to]) => {
      text = text.replace(new RegExp(`\\b${from}\\b`, 'g'), to);
    });

    return text.replace(/\s+/g, ' ').trim();
  }

  function titleCase(value) {
    return String(value || '')
      .trim()
      .split(/\s+/)
      .map((word) => word ? word[0].toUpperCase() + word.slice(1) : '')
      .join(' ');
  }

  function kebab(value) {
    return normalizeLabel(value).replace(/\s+/g, '-');
  }

  function compact(value) {
    return normalizeLabel(value).replace(/\s+/g, '');
  }

  function dedupe(list) {
    return [...new Set(list.filter(Boolean))];
  }

  function words(value) {
    return normalizeLabel(value)
      .split(/\s+/)
      .map((word) => TOKEN_ALIASES[word] || word)
      .flatMap((word) => String(word).split(/\s+/))
      .filter((word) => word && !GENERIC_WORDS.has(word));
  }

  function wordSet(value) {
    return new Set(words(value));
  }

  function intersectionSize(a, b) {
    let count = 0;
    a.forEach((item) => {
      if (b.has(item)) count += 1;
    });
    return count;
  }

  function filenameBases(label) {
    const raw = String(label || '').trim();
    const noPluralMark = raw.replace(/\(s\)/gi, 's');
    const noHash = raw.replace(/#/g, '').replace(/\s+/g, ' ').trim();
    const normalizedTitle = titleCase(normalizeLabel(label));
    const lower = normalizeLabel(label);
    const keb = kebab(label);
    const cmp = compact(label);

    const bases = [
      raw,
      noPluralMark,
      noHash,
      normalizedTitle,
      lower,
      keb,
      cmp,
      `${raw} Icon`,
      `${noPluralMark} Icon`,
      `${noHash} Icon`,
      `${normalizedTitle} Icon`,
      `${lower} icon`,
      `${keb}-icon`,
      `${cmp}icon`
    ];

    const aliases = {
      'Sorbet': ['Watermelon Sorbet', 'Watermelon Sorbet Icon'],
      'Wild Storm': ['Wildstrom Exlier', 'Wildstrom Exlier Icon', 'Wildstorm Exlier', 'Wild Storm Elixir', 'Wild Storm Icon'],
      'Flask': ['Flask of potecy', 'Flask of potecy Icon', 'Flask of potency', 'Flask of potency Icon'],
      'Forger': ['Forger Box', 'Forger Box Icon'],
      'Totem': ['Spider totem', 'Spider totem icon', 'Spider Totem', 'Spider Totem Icon'],
      'Sunlord': ['Sunlord exlier', 'Sunlord exlier Icon', 'Sunlord Elixir', 'Sunlord Elixir Icon'],
      'Guild Pow': ['Guild Power Boon', 'Guild Power Boon Icon'],
      'Guild Power': ['Guild Power Boon', 'Guild Power Boon Icon'],
      'Guild Acc': ['Guild Accuracy Boon', 'Guild Accuracy Boon Icon'],
      'Guild Accuracy': ['Guild Accuracy Boon', 'Guild Accuracy Boon Icon'],
      'Runic Aura': ['Runic Aura Icon'],
      'Pack #1': ['Pack Tactics', 'Pack Tactics Icon'],
      'Pack #2': ['Pack Tactics', 'Pack Tactics Icon'],
      'Pack Tactics': ['Pack Tactics Icon'],
      'Avian Aura(s)': ['Avian Aura', 'Avian Aura Icon'],
      'Pally Crit Aura': ['Paladin Crtical Strike Aura', 'Paladin Critical Strike Aura', 'Pally Critical Strike Aura', 'Pally Crit Aura Icon'],
      'Pally Def Aura': ['Paladin Defense Aura', 'Pally Def Aura Icon'],
      'Blue Fire Eye': ['Bluefire Eye', 'Bluefire Eye Icon', 'Blue Fire Eye Icon'],
      'Raptor x4': ['Raptor', 'Raptor Icon'],
      'Raptor': ['Raptor Icon'],
      'Portobello': ['Portebelo', 'Portebelo Icon', 'Portobello Icon'],
      'Tutor': ['Tutor Icon'],
      'Drizzt': ['Driz', 'Driz Icon', 'Drizzt Icon'],
      'Driz': ['Driz Icon', 'Drizzt', 'Drizzt Icon'],
      'Captain Sartell': ['Startel', 'Startel Icon', 'Sartell', 'Sartell Icon', 'Captain Sartell Icon'],
      'Minsc': ['minsc Icon', 'Minsc Icon']
    };

    (aliases[raw] || []).forEach((alias) => {
      bases.push(alias, `${alias} Icon`, titleCase(alias), kebab(alias), compact(alias));
    });

    return dedupe(bases);
  }

  function buildGeneratedSources(label) {
    const bases = filenameBases(label);
    const sources = [];

    ROOTS.forEach((root) => {
      bases.forEach((base) => {
        EXTENSIONS.forEach((ext) => {
          sources.push(`${root}${base}.${ext}`);
        });
      });
    });

    return dedupe(sources).map((src) => encodeURI(src));
  }

  function scoreManifestItem(label, item) {
    const labelNorm = normalizeLabel(label);
    const labelCompact = compact(label);
    const itemName = item.name || item.file || item.path || '';
    const itemNorm = normalizeLabel(item.normalised || itemName);
    const itemCompact = item.compact || itemNorm.replace(/\s+/g, '');

    const labelWords = wordSet(label);
    const itemWords = wordSet(itemName);
    const common = intersectionSize(labelWords, itemWords);
    const labelWordCount = Math.max(labelWords.size, 1);
    const itemWordCount = Math.max(itemWords.size, 1);

    let score = 0;

    // Exact and compact name matches should always win.
    if (itemNorm === labelNorm) score += 200;
    if (itemCompact === labelCompact) score += 190;

    // Generated base names and known aliases.
    const wanted = new Set(filenameBases(label).map(normalizeLabel));
    const wantedCompact = new Set([...wanted].map((value) => value.replace(/\s+/g, '')));
    if (wanted.has(itemNorm)) score += 170;
    if (wantedCompact.has(itemCompact)) score += 160;

    // Substring match, useful for names like Bluefire Eye vs Blue Fire Eye.
    if (itemNorm.includes(labelNorm) || labelNorm.includes(itemNorm)) score += 75;
    if (itemCompact.includes(labelCompact) || labelCompact.includes(itemCompact)) score += 70;

    // Word-by-word match requested by user.
    // This is the important part: if image filename words overlap with workbook label words, use it.
    if (common > 0) {
      const labelCoverage = common / labelWordCount;
      const itemCoverage = common / itemWordCount;

      // Strong overlap: all or most label words are present in image filename.
      if (labelCoverage >= 1) score += 120;
      else if (labelCoverage >= 0.66) score += 90;
      else if (labelCoverage >= 0.5 && common >= 2) score += 70;
      else if (common >= 2) score += 45;
      else if (labelWordCount === 1 && itemWords.has([...labelWords][0])) score += 65;

      // Prefer shorter filenames when the match is otherwise similar.
      score += Math.round((labelCoverage + itemCoverage) * 25);
    }

    // Avoid very weak one-word matches for generic labels.
    if (common === 1 && labelWordCount > 1 && score < 80) score = 0;

    return score;
  }

  function getManifestMatches(label) {
    const manifest = Array.isArray(window.NW_ICON_MANIFEST) ? window.NW_ICON_MANIFEST : [];
    if (!manifest.length) return [];

    return manifest
      .map((item) => ({ item, score: scoreManifestItem(label, item) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.path.localeCompare(b.item.path))
      .map((entry) => entry.item.path);
  }

  function getAssetMap() {
    const source = (window.NW_ASSETS && window.NW_ASSETS.items) || {};
    const map = new Map();

    Object.entries(source).forEach(([label, asset]) => {
      map.set(label, asset);
      map.set(normalizeLabel(label), asset);
    });

    return map;
  }

  function resolveAsset(label) {
    if (!label || IGNORED_LABELS.has(label)) return null;

    const map = getAssetMap();
    const explicit = map.get(label) || map.get(normalizeLabel(label));
    const manifestMatches = getManifestMatches(label);
    const generated = buildGeneratedSources(label);

    if (!explicit) {
      return {
        icon: fallbackText(label),
        srcCandidates: dedupe([...manifestMatches, ...generated]),
        generated: true
      };
    }

    return {
      ...explicit,
      srcCandidates: dedupe([
        ...manifestMatches,
        ...(Array.isArray(explicit.srcCandidates) ? explicit.srcCandidates : []),
        explicit.src,
        ...generated
      ])
    };
  }

  function fallbackText(label) {
    return String(label || 'NW')
      .split(/\s+/)
      .map((word) => word[0])
      .join('')
      .slice(0, 3)
      .toUpperCase() || 'NW';
  }

  function createFallback(label, asset) {
    const node = document.createElement('span');
    node.className = 'field-icon nw-runtime-fallback';
    node.setAttribute('aria-hidden', 'true');
    node.textContent = (asset && asset.icon) || fallbackText(label);
    node.title = `No uploaded icon matched for: ${label}`;
    return node;
  }

  function assetSources(asset) {
    if (!asset) return [];
    return dedupe([
      ...(Array.isArray(asset.srcCandidates) ? asset.srcCandidates : []),
      asset.src
    ]).map((src) => encodeURI(src));
  }

  function createIcon(label, asset) {
    const sources = assetSources(asset).filter((src) => !failedSrc.has(src));
    if (!sources.length) return createFallback(label, asset);

    const wrap = document.createElement('span');
    wrap.className = 'field-art-icon';
    wrap.title = label;

    const img = document.createElement('img');
    img.alt = `${label} icon`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.dataset.sourceIndex = '0';

    img.onload = function () {
      loadedSrc.add(img.currentSrc || img.src);
      wrap.classList.add('is-loaded');
    };

    img.onerror = function () {
      failedSrc.add(img.src);
      const nextIndex = Number(img.dataset.sourceIndex || '0') + 1;
      if (nextIndex < sources.length) {
        img.dataset.sourceIndex = String(nextIndex);
        img.src = sources[nextIndex];
      } else {
        wrap.replaceWith(createFallback(label, asset));
      }
    };

    img.src = sources[0];
    wrap.appendChild(img);
    return wrap;
  }

  function bindIcons() {
    document.querySelectorAll('.label-with-icon').forEach((labelRow) => {
      const copyNode = labelRow.querySelector('.label-copy');
      const label = copyNode ? copyNode.textContent.trim() : labelRow.textContent.trim();
      if (IGNORED_LABELS.has(label)) return;

      const asset = resolveAsset(label);
      const existing = labelRow.querySelector('.field-art-icon, .field-icon-img, .field-icon');
      if (existing) existing.remove();

      labelRow.prepend(createIcon(label, asset));
    });
  }

  function scheduleBind() {
    window.requestAnimationFrame(() => window.requestAnimationFrame(bindIcons));
  }

  window.NW_BIND_ICONS = bindIcons;
  window.NW_ICON_DEBUG = {
    failedSrc,
    loadedSrc,
    candidatesFor: (label) => dedupe([...getManifestMatches(label), ...buildGeneratedSources(label)]),
    scoreFor: (label) => (window.NW_ICON_MANIFEST || [])
      .map((item) => ({ path: item.path, score: scoreManifestItem(label, item), words: words(item.name || item.file || item.path) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score),
    manifest: () => window.NW_ICON_MANIFEST || [],
    bindIcons
  };

  scheduleBind();

  const observer = new MutationObserver(scheduleBind);
  observer.observe(document.body, { childList: true, subtree: true });
})();
