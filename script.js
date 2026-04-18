/**
 * Free Fire Brazilian Name Generator — script.js
 * Features: Generate, Copy, Copy All, Favorites (localStorage),
 *           Recently Generated, Sound Toggle, Category Quick-pick,
 *           Animated counters, Scroll reveal, Mobile nav.
 */

'use strict';

/* ================================================
   NAME DATA BANKS
================================================ */

const DATA = {

  // ── Prefixes & suffixes used in composition ──
  prefixPro:       ['FF•', 'ᴮᴿ•', 'BR.', '꧁', 'ꜰꜰ•', 'BR★', '•BR•', 'FF_', 'CLAN•', 'ꜰꜰ_'],
  suffixPro:       ['•FF', '•BR', '★', '.BR', '꧂', '_FF', '•PRO', '_BR', '•GG', '꧂'],
  prefixStylish:   ['꧁༒', '★彡', '꧁⚡', '꧁♛', '꧁『', '꧁༺', '★•', '꧁⚔', '☆彡', '꧁❤'],
  suffixStylish:   ['༒꧂', '彡★', '⚡꧂', '♛꧂', '』꧂', '༻꧂', '•★', '⚔꧂', '彡☆', '❤꧂'],
  prefixCute:      ['✿', '♡', '꒰', '✦', '❀', '°•♡', '꧁✿', '✿•', '♡•', '꒰•'],
  suffixCute:      ['✿', '♡', '꒱', '✦', '❀', '♡•°', '✿꧂', '•✿', '•♡', '•꒱'],
  prefixAggressive:['꧁☠', '⚡', '꧁💀', '☠•', '꧁🔥', '⚔•', '꧁★KILL★', '◤', '▸', '꧁∞'],
  suffixAggressive:['☠꧂', '⚡', '💀꧂', '•☠', '🔥꧂', '•⚔', '★꧂', '◥', '◂', '∞꧂'],

  // ── Core name parts ──
  brazilian: [
    'FÊNIX','AGUIA','GUERREIRO','LENDA','REI','COBRA','TIGRE','LEÃO',
    'BRASA','ONÇA','LOBO','FALCÃO','TUBARÃO','DRAGÃO','TROVÃO',
    'RELÂMPAGO','TEMPESTADE','FURACÃO','VULCÃO','TSUNAMI',
    'CANGACEIRO','JACARÉ','CAPIVARA','PANTANAL','SERTÃO',
    'FAVELA','MORRO','VILA','BOCÃO','BRABÃO','MALANDRO',
    'PIVETE','MULEQUE','CRIA','BONDE','BATE','CHAPÉU'
  ],
  english: [
    'SNIPER','GHOST','SHADOW','WOLF','BLADE','TITAN','STORM','VIPER',
    'PHANTOM','REAPER','STRIKER','HUNTER','KNIGHT','DEMON','ANGEL',
    'NINJA','SAMURAI','WARRIOR','LEGEND','ELITE','MASTER','KING'
  ],
  numbers: ['1','2','7','13','77','99','100','666','777','999','BR','FF','2026','X'],
  separators: ['•','_','-','·','ツ','꙳','ꞁ','ᴵ'],

  // ── Cute specific ──
  cuteWords: [
    'FLORINHA','MEL','DOCE','PRINCESA','FADA','BORBOLETA','ROSA',
    'LILI','BELA','DUDA','NANA','TATA','MIMI','KIKA','LARA',
    'ANJO','GATINHA','FOFA','LINDA','DELÍCIA','URSINHA','ESTRELINHA'
  ],

  // ── Aggressive specific ──
  aggressiveWords: [
    'TERROR','MATADOR','EXTERMINADOR','DESTRUIDOR','ASSASSINO','CARRASCO',
    'INIMIGO','PAVOR','INFERNO','CAOS','MORTE','SANGUINÁRIO',
    'DEVASTADOR','ALGOZ','VERDUGO','PREDADOR','EXECUTOR','DEMÔNIO'
  ],

  // ── Stylish unicode combos ──
  stylishCombos: [
    '꧁FÊNIX꧂','★彡ASTRO彡★','꧁༒DRAGÃO༒꧂','ꦿBRASILꦿ',
    '꧁⚡RELÂMPAGO⚡꧂','★BrBrBr★','꧁∞LENDA∞꧂','☆彡COBRA彡☆',
    '꧁⚔GUERREIRO⚔꧂','꧁♛REI♛꧂','ᴮᴿ彡TIGRE彡','꧁༺VULCÃO༻꧂',
    '★•TROVÃO•★','꧁『FALCÃO』꧂','☆AGUIA☆','꧁❤BRASA❤꧂',
    '꧁ASTRO꧂','★FÊNIX★','꧁⚡BR⚡꧂','꧁LENDA꧂'
  ],
};

/* ================================================
   STYLISH FONT MAPS
================================================ */
const FONT_MAPS = {
  bold: {a:'𝗮',b:'𝗯',c:'𝗰',d:'𝗱',e:'𝗲',f:'𝗳',g:'𝗴',h:'𝗵',i:'𝗶',j:'𝗷',k:'𝗸',l:'𝗹',m:'𝗺',n:'𝗻',o:'𝗼',p:'𝗽',q:'𝗾',r:'𝗿',s:'𝘀',t:'𝘁',u:'𝘂',v:'𝘃',w:'𝘄',x:'𝘅',y:'𝘆',z:'𝘇'},
  italic: {a:'𝘢',b:'𝘣',c:'𝘤',d:'𝘥',e:'𝘦',f:'𝘧',g:'𝘨',h:'𝘩',i:'𝘪',j:'𝘫',k:'𝘬',l:'𝘭',m:'𝘮',n:'𝘯',o:'𝘰',p:'𝘱',q:'𝘲',r:'𝘳',s:'𝘴',t:'𝘵',u:'𝘶',v:'𝘷',w:'𝘸',x:'𝘹',y:'𝘺',z:'𝘻'},
  small: {a:'ᴬ',b:'ᴮ',c:'ᶜ',d:'ᴰ',e:'ᴱ',f:'ᶠ',g:'ᴳ',h:'ᴴ',i:'ᴵ',j:'ᴶ',k:'ᴷ',l:'ᴸ',m:'ᴹ',n:'ᴺ',o:'ᴼ',p:'ᴾ',q:'Q',r:'ᴿ',s:'ˢ',t:'ᵀ',u:'ᵁ',v:'ᵛ',w:'ᵂ',x:'ˣ',y:'ʸ',z:'ᶻ'},
};

function applyFont(str, fontKey) {
  const map = FONT_MAPS[fontKey];
  if (!map) return str;
  return str.toLowerCase().split('').map(c => map[c] || c.toUpperCase()).join('');
}

/* ================================================
   GENERATOR LOGIC
================================================ */

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateProName(keyword, useSymbols) {
  const word = keyword ? keyword.toUpperCase() : rand(DATA.brazilian.concat(DATA.english));
  const num  = Math.random() > 0.5 ? rand(DATA.numbers) : '';
  const sep  = rand(DATA.separators);
  if (useSymbols) {
    const pre = rand(DATA.prefixPro);
    const suf = rand(DATA.suffixPro);
    return `${pre}${word}${num ? sep + num : ''}${suf}`;
  }
  return `${rand(['BR.','FF.','BR_'])}${word}${num ? num : ''}`;
}

function generateStylishName(keyword, useSymbols) {
  // Sometimes use a ready-made combo
  if (!keyword && Math.random() > 0.45) {
    const combo = rand(DATA.stylishCombos);
    return combo;
  }
  const word = keyword ? keyword.toUpperCase() : rand(DATA.brazilian);
  const fontKey = rand(['bold','italic','small',null,null]);
  const styled  = fontKey ? applyFont(word, fontKey) : word;
  if (useSymbols) {
    return `${rand(DATA.prefixStylish)}${styled}${rand(DATA.suffixStylish)}`;
  }
  return `★${styled}★`;
}

function generateCuteName(keyword, useSymbols) {
  const word = keyword
    ? (keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase())
    : rand(DATA.cuteWords);
  const fontKey = rand(['bold','small',null,null]);
  const styled  = fontKey ? applyFont(word, fontKey) : word;
  if (useSymbols) {
    return `${rand(DATA.prefixCute)}${styled}${rand(DATA.suffixCute)}`;
  }
  return `✿${styled}✿`;
}

function generateAggressiveName(keyword, useSymbols) {
  const word = keyword ? keyword.toUpperCase() : rand(DATA.aggressiveWords);
  if (useSymbols) {
    return `${rand(DATA.prefixAggressive)}${word}${rand(DATA.suffixAggressive)}`;
  }
  return `☠${word}☠`;
}

const GENERATORS = {
  pro:        generateProName,
  stylish:    generateStylishName,
  cute:       generateCuteName,
  aggressive: generateAggressiveName,
};

const CATEGORY_LABELS = {
  pro: 'Pro', stylish: 'Stylish', cute: 'Cute', aggressive: 'Aggressive',
};

function generateNames(keyword, category, count, useSymbols) {
  const names = [];
  const cats  = category === 'all'
    ? ['pro','stylish','cute','aggressive']
    : [category];

  for (let i = 0; i < count; i++) {
    const cat = rand(cats);
    const name = GENERATORS[cat](keyword, useSymbols);
    names.push({ name, cat });
  }
  return names;
}

/* ================================================
   SOUND EFFECTS (Web Audio API)
================================================ */
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playCopySound() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.18);
  } catch(_) { /* ignore */ }
}

function playGenSound() {
  try {
    const ctx = getAudioCtx();
    [0, 0.06, 0.12].forEach((t, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = [440, 660, 880][i];
      gain.gain.setValueAtTime(0.07, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.1);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.1);
    });
  } catch(_) { /* ignore */ }
}

/* ================================================
   CLIPBOARD
================================================ */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch(_) {
    // fallback
    const el = document.createElement('textarea');
    el.value = text;
    el.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  }
}

/* ================================================
   TOAST
================================================ */
let toastTimer = null;

function showToast(msg, duration = 2200) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ================================================
   FAVORITES (localStorage)
================================================ */
const FAV_KEY = 'ffbr_favorites';

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
  catch(_) { return []; }
}

function saveFavorites(arr) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); }
  catch(_) { /* quota exceeded */ }
}

function toggleFavorite(name) {
  const favs = getFavorites();
  const idx  = favs.indexOf(name);
  if (idx > -1) { favs.splice(idx, 1); }
  else          { favs.unshift(name); if (favs.length > 50) favs.pop(); }
  saveFavorites(favs);
  renderFavorites();
  return idx === -1; // true = added
}

function renderFavorites() {
  const list    = document.getElementById('favoritesList');
  const empty   = document.getElementById('emptyFav');
  const clearBtn = document.getElementById('clearFavBtn');
  const favs    = getFavorites();

  if (favs.length === 0) {
    list.innerHTML = '';
    list.appendChild(empty);
    empty.style.display = '';
    clearBtn.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  clearBtn.style.display = '';

  list.innerHTML = '';
  favs.forEach(name => {
    const chip = document.createElement('div');
    chip.className = 'fav-chip';
    chip.innerHTML = `
      <span>${name}</span>
      <button title="Copy" aria-label="Copy ${name}">📋</button>
      <button title="Remove" aria-label="Remove ${name}" data-remove>🗑</button>`;
    chip.querySelector('[title="Copy"]').addEventListener('click', async () => {
      await copyText(name);
      showToast(`✅ Copied: ${name}`);
    });
    chip.querySelector('[data-remove]').addEventListener('click', () => {
      toggleFavorite(name);
      // Update heart buttons in grid
      document.querySelectorAll('.name-btn[data-fav]').forEach(btn => {
        if (btn.closest('.name-card')?.dataset.name === name) {
          btn.classList.remove('faved');
          btn.textContent = '♡';
        }
      });
    });
    list.appendChild(chip);
  });
}

/* ================================================
   RECENT NAMES (sessionStorage)
================================================ */
const RECENT_KEY = 'ffbr_recent';

function getRecent() {
  try { return JSON.parse(sessionStorage.getItem(RECENT_KEY)) || []; }
  catch(_) { return []; }
}

function addToRecent(name) {
  const arr = getRecent();
  if (!arr.includes(name)) {
    arr.unshift(name);
    if (arr.length > 12) arr.pop();
  }
  try { sessionStorage.setItem(RECENT_KEY, JSON.stringify(arr)); }
  catch(_) { /* ignore */ }
}

function renderRecent() {
  const wrap = document.getElementById('recentWrap');
  const list = document.getElementById('recentList');
  const arr  = getRecent();
  if (arr.length === 0) { wrap.style.display = 'none'; return; }
  wrap.style.display = '';
  list.innerHTML = '';
  arr.forEach(name => {
    const tag = document.createElement('button');
    tag.className = 'recent-tag';
    tag.textContent = name;
    tag.title = `Copy ${name}`;
    tag.addEventListener('click', async () => {
      await copyText(name);
      showToast(`✅ Copied: ${name}`);
    });
    list.appendChild(tag);
  });
}

/* ================================================
   RENDER NAMES GRID
================================================ */
function renderNames(namesArr) {
  const grid = document.getElementById('namesGrid');
  const placeholder = document.getElementById('outputPlaceholder');
  const favs = getFavorites();

  placeholder.style.display = 'none';
  grid.innerHTML = '';

  namesArr.forEach(({ name, cat }, i) => {
    const card = document.createElement('div');
    card.className = 'name-card';
    card.setAttribute('role', 'listitem');
    card.dataset.name = name;
    card.style.animationDelay = `${i * 0.04}s`;

    const isFaved = favs.includes(name);
    card.innerHTML = `
      <span class="name-text" title="${name}">${name}</span>
      <span class="name-cat-badge badge-${cat}">${CATEGORY_LABELS[cat]}</span>
      <div class="name-actions">
        <button class="name-btn" data-copy title="Copy name" aria-label="Copy ${name}">📋</button>
        <button class="name-btn ${isFaved ? 'faved' : ''}" data-fav title="Favorite" aria-label="Add to favorites">${isFaved ? '♥' : '♡'}</button>
      </div>`;

    // Copy button
    card.querySelector('[data-copy]').addEventListener('click', async function() {
      const ok = await copyText(name);
      if (ok) {
        this.textContent = '✅';
        this.classList.add('copied');
        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle.checked) playCopySound();
        showToast(`✅ Copied: ${name}`);
        setTimeout(() => {
          this.textContent = '📋';
          this.classList.remove('copied');
        }, 1500);
      }
    });

    // Fav button
    card.querySelector('[data-fav]').addEventListener('click', function() {
      const added = toggleFavorite(name);
      this.textContent = added ? '♥' : '♡';
      this.classList.toggle('faved', added);
      showToast(added ? `❤️ Saved to favorites!` : `💔 Removed from favorites`);
    });

    grid.appendChild(card);

    // Add to recent (first 3 generated)
    if (i < 3) addToRecent(name);
  });

  grid.classList.add('visible');
  renderRecent();
}

/* ================================================
   MAIN GENERATE HANDLER
================================================ */
let lastGenerated = [];

async function handleGenerate(overrideCategory) {
  const keyword    = document.getElementById('keyword-input').value.trim();
  const category   = overrideCategory || document.getElementById('category-select').value;
  const count      = parseInt(document.getElementById('count-select').value, 10);
  const useSymbols = document.getElementById('symbols-toggle').checked;
  const btn        = document.getElementById('generateBtn');
  const copyAllBtn = document.getElementById('copyAllBtn');
  const clearBtn   = document.getElementById('clearBtn');

  // Loading state
  btn.classList.add('loading');
  btn.disabled = true;
  document.getElementById('namesGrid').classList.remove('visible');

  // Simulate async feel (also gives CSS animation time)
  await new Promise(r => setTimeout(r, 450));

  const names = generateNames(keyword, category, count, useSymbols);
  lastGenerated = names;

  renderNames(names);

  // Play sound
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle.checked) playGenSound();

  btn.classList.remove('loading');
  btn.disabled = false;
  copyAllBtn.disabled = false;
  clearBtn.disabled = false;

  // If overrideCategory, also update the select UI
  if (overrideCategory) {
    document.getElementById('category-select').value = overrideCategory;
    // Smooth scroll to tool
    document.getElementById('tool').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ================================================
   COPY ALL
================================================ */
async function handleCopyAll() {
  if (!lastGenerated.length) return;
  const text = lastGenerated.map(n => n.name).join('\n');
  const ok = await copyText(text);
  if (ok) showToast(`✅ Copied all ${lastGenerated.length} names!`);
}

/* ================================================
   CLEAR
================================================ */
function handleClear() {
  const grid = document.getElementById('namesGrid');
  const placeholder = document.getElementById('outputPlaceholder');
  grid.innerHTML = '';
  grid.classList.remove('visible');
  placeholder.style.display = '';
  document.getElementById('copyAllBtn').disabled = true;
  document.getElementById('clearBtn').disabled = true;
  lastGenerated = [];
}

/* ================================================
   ANIMATED COUNTERS
================================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const step = 16;
  const increments = Math.ceil(duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += Math.ceil(target / increments);
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = current.toLocaleString();
    }
  }, step);
}

/* ================================================
   SCROLL REVEAL
================================================ */
function initScrollReveal() {
  // Add data-reveal to sections
  document.querySelectorAll('.benefit-card, .step-card, .cat-card, .faq-item, .link-card')
    .forEach(el => el.setAttribute('data-reveal', ''));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  // Counter observer
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num[data-count]').forEach(el => counterObserver.observe(el));
}

/* ================================================
   MOBILE NAV
================================================ */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('mainNav');

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    nav.setAttribute('aria-hidden', !open);
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

/* ================================================
   CATEGORY QUICK-PICK BUTTONS
================================================ */
function initCatButtons() {
  document.querySelectorAll('.btn-cat[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      handleGenerate(btn.dataset.cat);
    });
  });
}

/* ================================================
   KEYBOARD SHORTCUT: Enter in input field
================================================ */
function initKeyboard() {
  document.getElementById('keyword-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleGenerate();
  });
}

/* ================================================
   INIT
================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Button event listeners
  document.getElementById('generateBtn').addEventListener('click', () => handleGenerate());
  document.getElementById('copyAllBtn').addEventListener('click', handleCopyAll);
  document.getElementById('clearBtn').addEventListener('click', handleClear);
  document.getElementById('clearFavBtn').addEventListener('click', () => {
    saveFavorites([]);
    renderFavorites();
    // Remove faved class from all heart buttons
    document.querySelectorAll('.name-btn.faved').forEach(btn => {
      btn.classList.remove('faved');
      btn.textContent = '♡';
    });
    showToast('🗑️ Favorites cleared');
  });

  // Init modules
  initMobileNav();
  initCatButtons();
  initKeyboard();
  initScrollReveal();

  // Render existing favorites
  renderFavorites();
  renderRecent();

  // Generate initial batch on page load for demo
  setTimeout(() => handleGenerate(), 600);
});
