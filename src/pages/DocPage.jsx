import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import Markdown from '../components/Markdown.jsx';
import NotFound from './NotFound.jsx';
import { extractToc, flatPages, getLanguage, getPage } from '../lib/content.js';

export default function DocPage() {
  const { lang, section, page } = useParams();
  const { hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  const language = getLanguage(lang);
  const doc = getPage(lang, section, page);
  const toc = useMemo(() => (doc ? extractToc(doc.body) : []), [doc]);

  const pages = flatPages(lang);
  const idx = doc ? pages.findIndex((p) => p.path === doc.path) : -1;
  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx >= 0 && idx < pages.length - 1 ? pages[idx + 1] : null;

  useEffect(() => {
    setMenuOpen(false);
    if (doc) document.title = `${doc.title} — ${language.name} · Docaine`;
    if (hash) {
      setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [doc, hash, language]);

  // Surligne dans le sommaire la section actuellement lue
  useEffect(() => {
    if (!toc.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  if (!language || !doc) return <NotFound />;
  const sectionTitle = language.sections.find((s) => s.slug === section)?.title;

  return (
    <div className="doc-layout">
      <button className="menu-toggle" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen}>
        ☰ Sommaire — {language.name}
      </button>

      <aside className={`sidebar ${menuOpen ? 'open' : ''}`} aria-label="Plan de la documentation">
        <div className="sidebar-head">
          <strong>{language.name}</strong>
          <span className="card-badge">{language.meta.version}</span>
        </div>
        {language.sections.map((s) => (
          <div key={s.slug} className="sidebar-section">
            <h4>{s.title}</h4>
            <ul>
              {s.pages.map((p) => (
                <li key={p.slug}>
                  <NavLink to={p.path}>{p.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      <article className="doc">
        <nav className="breadcrumb" aria-label="Fil d’Ariane">
          <Link to="/docs">Docs</Link> <span>/</span> <span>{language.name}</span> <span>/</span> <span>{sectionTitle}</span>
        </nav>
        <h1>{doc.title}</h1>
        {doc.description && <p className="lead">{doc.description}</p>}
        <Markdown>{doc.body}</Markdown>

        <p className="source">Source de cette page : <code>{doc.file}</code></p>

        <nav className="pager" aria-label="Pages voisines">
          {prev ? (
            <Link to={prev.path} className="prev"><small>← Précédent</small><span>{prev.title}</span></Link>
          ) : <span />}
          {next ? (
            <Link to={next.path} className="next"><small>Suivant →</small><span>{next.title}</span></Link>
          ) : <span />}
        </nav>
      </article>

      <aside className="toc" aria-label="Sur cette page">
        {toc.length > 0 && (
          <>
            <h4>Sur cette page</h4>
            <ul>
              {toc.map((t) => (
                <li key={t.id} className={`l${t.level}`}>
                  <a href={`#${t.id}`} className={activeId === t.id ? 'active' : ''}>{t.text}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}
