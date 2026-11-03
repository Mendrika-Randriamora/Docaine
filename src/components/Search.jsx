import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniSearch from 'minisearch';
import { allPages, getLanguage, plainText } from '../lib/content.js';

const normalize = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function buildIndex() {
  const docs = allPages().map((p) => ({
    id: p.path,
    title: p.title,
    description: p.description,
    text: plainText(p.body),
    lang: getLanguage(p.lang)?.name ?? p.lang,
    section: getLanguage(p.lang)?.sections.find((s) => s.slug === p.section)?.title ?? p.section,
  }));
  const index = new MiniSearch({
    fields: ['title', 'description', 'text'],
    storeFields: ['title', 'description', 'lang', 'section'],
    processTerm: normalize,
    searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 4, description: 2 } },
  });
  index.addAll(docs);
  return index;
}

export default function Search({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => (query.trim() ? index.search(query).slice(0, 8) : []), [query, index]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const go = (id) => {
    onClose();
    navigate(id);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter' && results[active]) go(results[active].id);
  };

  return (
    <div className="search-overlay" onMouseDown={onClose} role="dialog" aria-modal="true" aria-label="Recherche">
      <div className="search-box" onMouseDown={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Rechercher dans la documentation…"
          aria-label="Rechercher"
        />
        <ul className="search-results">
          {results.map((r, i) => (
            <li key={r.id}>
              <button className={i === active ? 'active' : ''} onMouseEnter={() => setActive(i)} onClick={() => go(r.id)}>
                <span className="sr-title">{r.title}</span>
                <span className="sr-meta">{r.lang} · {r.section}</span>
                <span className="sr-desc">{r.description}</span>
              </button>
            </li>
          ))}
          {query.trim() && results.length === 0 && <li className="sr-empty">Aucun résultat pour « {query} »</li>}
          {!query.trim() && <li className="sr-empty">Tapez un mot-clé : « dict », « async », « f-string »…</li>}
        </ul>
        <div className="search-foot"><kbd>↑</kbd><kbd>↓</kbd> naviguer <kbd>↵</kbd> ouvrir <kbd>Échap</kbd> fermer</div>
      </div>
    </div>
  );
}
