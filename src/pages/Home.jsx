import { Link } from 'react-router-dom';
import { Wordmark } from '../components/Brand.jsx';
import { languages, firstPagePath } from '../lib/content.js';
import heroUrl from '../assets/hero.jpg';

const countPages = (l) => l.sections.reduce((n, s) => n + s.pages.length, 0);

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero-img" src={heroUrl} alt="" />
        <Wordmark className="hero-wordmark" />
      </section>

      <section className="intro">
        <div className="container intro-inner">
          <h1 className="intro-title">
            La doc que vous
            <strong>auriez voulu lire</strong>
          </h1>
          <div className="intro-bottom">
            <p className="intro-text">
              Comprenez en 2 minutes, pas en 2 heures.<br />
              Docaine explique l’essentiel, avec du code que vous pouvez copier.
            </p>
            <Link className="btn" to={firstPagePath(languages[0]?.slug ?? 'python')}>
              Lire la documentation <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="container langs">
        <h2 className="langs-title">Disponible maintenant</h2>
        <ul className="lang-list">
          {languages.map((l) => (
            <li key={l.slug}>
              <Link to={firstPagePath(l.slug)} className="lang-row">
                <span className="lang-name">{l.name}</span>
                <span className="lang-info">
                  <span className="card-badge">{l.meta.version}</span>
                  {l.meta.tagline}
                </span>
                <span className="lang-count">{countPages(l)} pages</span>
                <Arrow />
              </Link>
            </li>
          ))}
          <li className="lang-row lang-soon">
            <span className="lang-name">Et la suite…</span>
            <span className="lang-info">D’autres langages et concepts, un dossier à la fois.</span>
            <span className="lang-count">bientôt</span>
          </li>
        </ul>
      </section>
    </>
  );
}
