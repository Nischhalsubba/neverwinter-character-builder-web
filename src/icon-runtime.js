/*
  Runtime icon binder for Neverwinter Character Builder.
  Runs after app.js and re-binds icons from window.NW_ASSETS to every rendered label.
  Supports direct src and srcCandidates so uploaded files with spaces/typos can be tried safely.
*/
(function () {
  const IGNORED_LABELS = new Set(['', 'Stat', 'Value', 'Class', 'Enable', 'Misc', 'Used?', 'Buff']);

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

  function getAssetMap() {
    const source = (window.NW_ASSETS && window.NW_ASSETS.items) || {};
    const map = new Map();

    Object.entries(source).forEach(([label, asset]) => {
      map.set(label, asset);
      map.set(normalizeLabel(label), asset);
    });

    const aliases = {
      'watermelon sorbet': 'Sorbet',
      'wildstrom exlier': 'Wild Storm',
      'wildstorm exlier': 'Wild Storm',
      'wild storm elixir': 'Wild Storm',
      'sunlord exlier': 'Sunlord',
      'sunlord elixir': 'Sunlord',
      'flask of potecy': 'Flask',
      'flask of potency': 'Flask',
      'forger box': 'Forger',
      'spider totem': 'Totem',
      'bluefire eye': 'Blue Fire Eye',
      'blue fire eye': 'Blue Fire Eye',
      'pally crit aura': 'Pally Crit Aura',
      'paladin crtical strike aura': 'Pally Crit Aura',
      'paladin critical strike aura': 'Pally Crit Aura',
      'pack tactics': 'Pack Tactics',
      'pack 1': 'Pack #1',
      'pack 2': 'Pack #2',
      'avian aura': 'Avian Aura',
      'avian auras': 'Avian Aura(s)',
      'captain sartell': 'Captain Sartell',
      'startel': 'Captain Sartell',
      'sartell': 'Captain Sartell',
      'portebelo': 'Portobello',
      'portobello': 'Portobello',
      'driz': 'Drizzt',
      'drizzt': 'Drizzt',
      'minsc icon': 'Minsc',
      'raptor icon': 'Raptor',
      'guild power boon': 'Guild Power',
      'guild accuracy boon': 'Guild Accuracy',
      'guild pow': 'Guild Pow',
      'guild acc': 'Guild Acc'
    };

    Object.entries(aliases).forEach(([alias, target]) => {
      const asset = source[target];
      if (asset) map.set(normalizeLabel(alias), asset);
    });

    return map;
  }

  function resolveAsset(label) {
    if (!label || IGNORED_LABELS.has(label)) return null;
    const map = getAssetMap();
    return map.get(label) || map.get(normalizeLabel(label)) || null;
  }

  function createFallback(label, asset) {
    const fallback = (asset && asset.icon) || String(label || 'NW').split(/\s+/).map((word) => word[0]).join('').slice(0, 3).toUpperCase();
    const node = document.createElement('span');
    node.className = 'field-icon nw-runtime-fallback';
    node.setAttribute('aria-hidden', 'true');
    node.textContent = fallback || 'NW';
    return node;
  }

  function assetSources(asset) {
    if (!asset) return [];
    const list = [];
    if (Array.isArray(asset.srcCandidates)) list.push(...asset.srcCandidates);
    if (asset.src) list.unshift(asset.src);
    return [...new Set(list.filter(Boolean))];
  }

  function createIcon(label, asset) {
    const sources = assetSources(asset);
    if (!sources.length) return createFallback(label, asset);

    const wrap = document.createElement('span');
    wrap.className = 'field-art-icon';
    wrap.title = label;

    const img = document.createElement('img');
    img.alt = `${label} icon`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.dataset.sourceIndex = '0';

    img.onerror = function () {
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
      const asset = resolveAsset(label);

      const existing = labelRow.querySelector('.field-art-icon, .field-icon-img, .field-icon');
      if (existing) existing.remove();

      if (!asset && IGNORED_LABELS.has(label)) return;
      labelRow.prepend(createIcon(label, asset));
    });
  }

  function scheduleBind() {
    window.requestAnimationFrame(() => window.requestAnimationFrame(bindIcons));
  }

  window.NW_BIND_ICONS = bindIcons;
  scheduleBind();

  const observer = new MutationObserver(scheduleBind);
  observer.observe(document.body, { childList: true, subtree: true });
})();
