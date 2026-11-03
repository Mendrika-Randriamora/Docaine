import { Link } from 'react-router-dom';
import { languages, firstPagePath } from '../lib/content.js';

export default function DocsIndex() {
  return (
    <div className="container">
      <p className="eyebrow">Documentation</p>
      <h1>Choisissez un langage</h1>
      <p className="lead">Une collection par langage ou concept. D’autres arriveront : il suffit d’ajouter un dossier dans <code>content/</code>.</p>
      <div className="card-grid">
        {languages.map((l) => (
          <Link key={l.slug} to={firstPagePath(l.slug)} className="card">
            <span className="card-badge">{l.meta.version}</span>
            <h2>{l.name}</h2>
            <p>{l.meta.tagline}</p>
            <span className="card-meta">
              {l.sections.length} sections · {l.sections.reduce((n, s) => n + s.pages.length, 0)} pages
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
