/*
  Runtime icon binder for Neverwinter Character Builder.

  Purpose:
  - Show BOTH old and newly uploaded icons from /assets/Icons/.
  - Do not require every new icon to be manually added to src/assets.js.
  - If a workbook label is "Hot Wings", this script automatically tries:
      assets/Icons/Hot Wings.png
      assets/Icons/Hot Wings Icon.png
      assets/Icons/hot-wings.png
      assets/Icons/hot-wings-icon.png
      and the same in common subfolders.
  - Explicit mappings in window.NW_ASSETS still win first.
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
      .replace(/[.#]/g, '')
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

    // Known naming corrections from the uploaded files and common typos.
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

    const generated = buildGeneratedSources(label);
    if (!explicit) {
      return {
        icon: fallbackText(label),
        srcCandidates: generated,
        generated: true
      };
    }

    return {
      ...explicit,
      srcCandidates: dedupe([
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
    candidatesFor: buildGeneratedSources,
    bindIcons
  };

  scheduleBind();

  const observer = new MutationObserver(scheduleBind);
  observer.observe(document.body, { childList: true, subtree: true });
})();
