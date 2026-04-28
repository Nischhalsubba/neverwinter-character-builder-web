/*
  Runtime icon binder for Neverwinter Character Builder.

  It combines two strategies:
  1. Exact/explicit paths from window.NW_ASSETS.
  2. Auto-scanned upload manifest from window.NW_ICON_MANIFEST, generated during build from assets/Icons.

  Result: old and newly uploaded icons are matched to workbook labels by image filename.
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

  const EXTENSIONS = ['png', 'webp', 'jpg', 'jpeg', 'PNG', 'WEBP', 'JPG', 'JPEG'];
  const IGNORED_LABELS = new Set(['', 'Stat', 'Value', 'Class', 'Enable', 'Misc', 'Used?', 'Buff']);
  const failedSrc = new Set();
  const loadedSrc = new Set();

  function normalizeLabel(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\(s\)/g, 's')
      .replace(/\b(icon|icons|boon|aura icon|boon icon)\b/g, ' ')
      .replace(/\b(exlier|elixer|elixir)\b/g, 'elixir')
      .replace(/\b(crtical|critcal)\b/g, 'critical')
      .replace(/\b(potecy)\b/g, 'potency')
      .replace(/[.#_\-]+/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
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

  function getManifestMatches(label) {
    const manifest = Array.isArray(window.NW_ICON_MANIFEST) ? window.NW_ICON_MANIFEST : [];
    if (!manifest.length) return [];

    const wanted = new Set(filenameBases(label).map(normalizeLabel));
    wanted.add(normalizeLabel(label));
    wanted.add(compact(label));

    const labelNorm = normalizeLabel(label);
    const labelCompact = compact(label);

    const scored = manifest.map((item) => {
      const itemNorm = item.normalised || normalizeLabel(item.name || item.file || item.path);
      const itemCompact = item.compact || itemNorm.replace(/\s+/g, '');
      let score = 0;

      if (itemNorm === labelNorm) score += 100;
      if (itemCompact === labelCompact) score += 90;
      if (wanted.has(itemNorm)) score += 80;
      if (wanted.has(itemCompact)) score += 75;
      if (itemNorm.includes(labelNorm) || labelNorm.includes(itemNorm)) score += 35;
      if (itemCompact.includes(labelCompact) || labelCompact.includes(itemCompact)) score += 30;

      return { item, score };
    })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.path.localeCompare(b.item.path));

    return scored.map((entry) => entry.item.path);
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
    manifest: () => window.NW_ICON_MANIFEST || [],
    bindIcons
  };

  scheduleBind();

  const observer = new MutationObserver(scheduleBind);
  observer.observe(document.body, { childList: true, subtree: true });
})();
