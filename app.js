/**
 * app.js — 渲染 + 筛选 + 搜索
 */

const state = {
  data: [],
  filtered: [],
  level: 'ALL',
  type: 'ALL',
  q: '',
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function renderCards() {
  const container = $('#cards');
  const empty = $('#empty');

  if (state.filtered.length === 0) {
    container.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  container.innerHTML = state.filtered.map(item => {
    const typeLabel = window.JLPT_DATA.TYPE_LABEL[item.type] || item.type;
    const example = (item.example_jp || item.example_cn) ? `
      <div class="card-example">
        ${item.example_jp ? `<span class="ex-jp">${escapeHtml(item.example_jp)}</span>` : ''}
        ${item.example_cn ? `<span class="ex-cn">${escapeHtml(item.example_cn)}</span>` : ''}
      </div>` : '';

    return `
      <article class="card" data-type="${escapeHtml(item.type)}">
        <div class="card-header">
          <span class="card-level">${escapeHtml(item.level)}</span>
          <span class="card-type">${escapeHtml(typeLabel)}</span>
        </div>
        <div class="card-jp">${escapeHtml(item.jp)}</div>
        ${item.romaji ? `<div class="card-romaji">${escapeHtml(item.romaji)}</div>` : ''}
        <div class="card-meaning">
          <strong>${escapeHtml(item.meaning || '')}</strong>
          ${item.note ? `<div style="margin-top:6px;font-size:13px;color:var(--color-ink-soft);">${escapeHtml(item.note)}</div>` : ''}
        </div>
        ${example}
      </article>`;
  }).join('');
}

function applyFilters() {
  const q = state.q.trim().toLowerCase();
  state.filtered = state.data.filter(item => {
    if (state.level !== 'ALL' && item.level !== state.level) return false;
    if (state.type !== 'ALL' && item.type !== state.type) return false;
    if (q) {
      const hay = [item.jp, item.romaji, item.meaning, item.example_jp, item.example_cn, item.note]
        .filter(Boolean).join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  renderCards();
  updateStats();
}

function updateStats() {
  const total = state.data.length;
  const vocab = state.data.filter(x => x.type === 'vocab').length;
  const grammar = state.data.filter(x => x.type === 'grammar').length;
  const translation = state.data.filter(x => x.type === 'translation').length;
  $('#stat-total').textContent = total;
  $('#stat-vocab').textContent = vocab;
  $('#stat-grammar').textContent = grammar;
  $('#stat-translation').textContent = translation;
}

function setupChipGroup(containerId, key) {
  const container = $(`#${containerId}`);
  container.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    state[key] = btn.dataset[key === 'level' ? 'level' : 'type'];
    applyFilters();
  });
}

async function init() {
  setupChipGroup('level-chips', 'level');
  setupChipGroup('type-chips', 'type');

  $('#search').addEventListener('input', e => {
    state.q = e.target.value;
    applyFilters();
  });

  try {
    state.data = await window.JLPT_DATA.loadAll();
    applyFilters();
  } catch (e) {
    console.error('加载数据失败', e);
    $('#empty').hidden = false;
    $('#empty').innerHTML = `<div class="empty-icon">⚠️</div><p>数据加载失败,请刷新页面重试</p>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
