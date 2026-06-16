/**
 * data-loader.js — 加载所有等级的语料
 *
 * 数据格式：
 *   data/N5/vocab.json, data/N5/grammar.json, data/N5/translation.json
 *   每个文件是一个数组,每项:
 *   {
 *     "jp": "日本語",         // 必填 - 日语原文
 *     "romaji": "nihongo",    // 可选 - 罗马音
 *     "meaning": "日语",       // 必填 - 中文释义
 *     "example_jp": "...",    // 可选 - 例句日文
 *     "example_cn": "...",    // 可选 - 例句中文
 *     "note": "..."           // 可选 - 备注
 *   }
 *
 * 直接编辑 GitHub 仓库里的 JSON 文件就行,1 分钟内自动生效。
 */

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const TYPES = ['vocab', 'grammar', 'translation'];

const TYPE_LABEL = {
  vocab: '生词',
  grammar: '语法',
  translation: '翻译',
};

const FALLBACK = {
  N5: { vocab: [], grammar: [], translation: [] },
  N4: { vocab: [], grammar: [], translation: [] },
  N3: { vocab: [], grammar: [], translation: [] },
  N2: { vocab: [], grammar: [], translation: [] },
  N1: { vocab: [], grammar: [], translation: [] },
};

async function loadJson(path) {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.warn(`Failed to load ${path}:`, e);
    return [];
  }
}

async function loadAll() {
  const tasks = [];
  for (const level of LEVELS) {
    for (const type of TYPES) {
      tasks.push(
        loadJson(`data/${level}/${type}.json`).then(items => {
          // 给每条加上 level / type
          items.forEach(it => { it.level = level; it.type = type; });
          return items;
        })
      );
    }
  }
  const results = await Promise.all(tasks);
  const all = results.flat();
  // 按 level 排序,同 level 按 jp 拼音/字符序
  all.sort((a, b) => {
    if (a.level !== b.level) return a.level.localeCompare(b.level);
    return (a.jp || '').localeCompare(b.jp || '');
  });
  return all;
}

window.JLPT_DATA = { loadAll, TYPE_LABEL, LEVELS, TYPES };
