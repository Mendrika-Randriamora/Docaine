import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import Markdown from '../components/Markdown.jsx';
import NotFound from './NotFound.jsx';
import { ArrowLeft, ArrowRight, ListChevronsUpDown, Minimize2, iconProps } from '../components/icons.js';
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
    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = Math.max(140, Math.min(280, window.innerHeight * 0.26));
      let current = toc[0].id;
      for (const t of toc) {
        const el = document.getElementById(t.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = t.id;
        else break;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = toc[toc.length - 1].id;
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [toc]);

  if (!language || !doc) return <NotFound />;
  const sectionTitle = language.sections.find((s) => s.slug === section)?.title;

  return (
    <div className="doc-layout">
      <aside id="doc-sidebar" className={`sidebar ${menuOpen ? 'open' : ''}`} aria-label="Plan de la documentation">
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

      <button
        className="sidebar-fab"
        onClick={() => setMenuOpen((o) => !o)}
        aria-expanded={menuOpen}
        aria-controls="doc-sidebar"
        aria-label={menuOpen ? 'Fermer le sommaire' : 'Ouvrir le sommaire'}
      >
        {menuOpen ? <Minimize2 {...iconProps} size={24} /> : <ListChevronsUpDown {...iconProps} size={24} />}
      </button>

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
            <Link to={prev.path} className="prev"><small><ArrowLeft {...iconProps} /> Précédent</small><span>{prev.title}</span></Link>
          ) : <span />}
          {next ? (
            <Link to={next.path} className="next"><small>Suivant <ArrowRight {...iconProps} /></small><span>{next.title}</span></Link>
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
