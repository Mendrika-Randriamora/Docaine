import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import Search from './Search.jsx';
import { PillIcon, Wordmark } from './Brand.jsx';
import { ArrowUp, ExternalLink, Menu, Search as SearchIcon, X, iconProps } from './icons.js';
import { languages, getLanguage } from '../lib/content.js';

const MENU = [
  { to: '/docs', label: 'Documentation' },
  { to: '/contribuer', label: 'Contribuer' },
  { to: '/a-propos', label: 'À propos' },
];

function Header({ over, onMenu, onSearch }) {
  return (
    <header className={`header ${over ? 'header--over' : 'header--solid'}`}>
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Docaine, accueil">
          {over ? <PillIcon className="brand-pill" /> : <Wordmark className="brand-wordmark" />}
        </Link>
        <div className="header-actions">
          {!over && (
            <>
              <button className="search-btn" onClick={onSearch} aria-label="Rechercher">
                <SearchIcon {...iconProps} />
                <span className="search-label">Rechercher</span>
                <kbd>/</kbd>
              </button>
              <ThemeToggle />
            </>
          )}
          <button className="menu-btn" onClick={onMenu} aria-label="Ouvrir le menu" aria-haspopup="dialog">
            <Menu {...iconProps} />
          </button>
        </div>
      </div>
    </header>
  );
}

function MenuOverlay({ open, onClose, onSearch }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="menu" role="dialog" aria-modal="true" aria-label="Menu">
      <button ref={closeRef} className="menu-close" onClick={onClose} aria-label="Fermer le menu">
        <X {...iconProps} />
      </button>
      <nav className="menu-nav" aria-label="Navigation principale">
        {MENU.map((m) => (
          <NavLink key={m.to} to={m.to} onClick={onClose}>{m.label}</NavLink>
        ))}
      </nav>
      <div className="menu-tools">
        <button onClick={() => { onClose(); onSearch(); }}>Rechercher <kbd>/</kbd></button>
        <ThemeToggle labelled />
      </div>
    </div>
  );
}

function Footer() {
  const python = getLanguage('python') ?? languages[0];
  const wanted = ['demarrer', 'bibliotheque-standard', 'nouveautes'];
  const docLinks = (python?.sections ?? [])
    .filter((s) => wanted.includes(s.slug) && s.pages[0])
    .map((s) => ({ to: s.pages[0].path, label: s.title }));

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <p className="footer-tagline">La doc que vous<br /><strong>auriez voulu lire.</strong></p>

        <nav className="footer-col" aria-label="Documentation">
          <h4>Documentation</h4>
          <ul>
            {docLinks.map((l) => (<li key={l.to}><Link to={l.to}>{l.label}</Link></li>))}
            <li><Link to="/docs">Tous les langages</Link></li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Projet">
          <h4>Projet</h4>
          <ul>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/contribuer">Contribuer</Link></li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Ressources utiles">
          <h4>Ressources utiles</h4>
          <ul>
            <li><a href="https://docs.python.org/3.15/" target="_blank" rel="noopener noreferrer">Doc officielle de Python <ExternalLink {...iconProps} /></a></li>
            <li><a href="https://peps.python.org/" target="_blank" rel="noopener noreferrer">PEP, les propositions <ExternalLink {...iconProps} /></a></li>
            <li><a href="https://pypi.org/" target="_blank" rel="noopener noreferrer">PyPI, les paquets <ExternalLink {...iconProps} /></a></li>
            <li><a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Télécharger Python <ExternalLink {...iconProps} /></a></li>
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom-wrap">
        <div className="footer-bottom">
          <span>© 2026 Docaine · Contenu reformulé d’après la documentation officielle de Python 3.15.</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Haut de page <ArrowUp {...iconProps} /></button>
        </div>
      </div>

      <div className="footer-logo" aria-hidden="true">
        <Wordmark />
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(e.target.tagName);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Les pages de doc gèrent elles-mêmes leur défilement (ancres) ; les autres reviennent en haut.
  useEffect(() => {
    setMenuOpen(false);
    if (!pathname.startsWith('/docs/')) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header over={isHome} onMenu={() => setMenuOpen(true)} onSearch={() => setSearchOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} onSearch={() => setSearchOpen(true)} />
      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
