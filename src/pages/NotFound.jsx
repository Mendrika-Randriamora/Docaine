import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container narrow center-page">
      <p className="eyebrow">Erreur 404</p>
      <h1>Cette page n’existe pas.</h1>
      <p className="lead">Elle a peut-être été déplacée. Essayez la recherche (touche <kbd>/</kbd>) ou retournez au sommaire.</p>
      <Link className="btn primary" to="/docs">Voir la documentation</Link>
    </div>
  );
}
