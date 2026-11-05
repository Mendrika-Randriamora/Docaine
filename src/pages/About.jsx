import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, iconProps } from '../components/icons.js';
import { languages, firstPagePath } from '../lib/content.js';

export default function About() {
  const pages = languages.reduce((n, l) => n + l.sections.reduce((m, s) => m + s.pages.length, 0), 0);
  const sections = languages.reduce((n, l) => n + l.sections.length, 0);

  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">À propos</p>
        <h1 className="page-title">
          Une doc qu’on lit<br /><strong>d’une traite.</strong>
        </h1>
        <p className="page-lead">
          Docaine est une documentation pour développeurs, écrite pour qu’on comprenne vite
          et qu’on n’ait pas à revenir pour la même question.
        </p>

        <dl className="stats" aria-label="Le projet en chiffres">
          <div><dt>Langages</dt><dd>{languages.length}</dd></div>
          <div><dt>Sections</dt><dd>{sections}</dd></div>
          <div><dt>Pages</dt><dd>{pages}</dd></div>
        </dl>

        <div className="about-grid">
          <section>
            <h2>Pourquoi ce projet</h2>
            <p>
              La documentation officielle d’un langage est une <strong>référence</strong> : elle est
              complète, rigoureuse, et répond à la question « que dit le langage ? ». Mais quand on cherche
              « comment je lis un fichier ? » ou « comment je trie ça ? », on traverse des pages denses,
              pleines de cas rares, avant de tomber sur la ligne utile.
            </p>
            <p>
              Docaine part de ce constat : un développeur veut une réponse <strong>claire</strong>,
              <strong> nette</strong> et <strong>précise</strong>, avec un exemple qu’il peut copier.
            </p>
          </section>

          <section>
            <h2>Le principe</h2>
            <ul className="principles">
              <li><strong>Une idée par page.</strong> Du plus simple au plus fin, sans détour.</li>
              <li><strong>Des exemples qui tournent.</strong> Chaque notion est montrée en code, avec le résultat.</li>
              <li><strong>Les pièges nommés.</strong> Chaque page finit par ce qui surprend le plus souvent.</li>
              <li><strong>La version indiquée.</strong> Quand une fonctionnalité date d’une version précise, on le dit.</li>
            </ul>
          </section>

          <section>
            <h2>Comment c’est fait</h2>
            <p>
              Chaque page est un simple fichier Markdown rangé comme dans le manuel PHP :
              langage, section, page. Le site en tire tout seul le menu, le sommaire, la navigation
              et la recherche. Ajouter une page, c’est ajouter un fichier.
            </p>
            <p><Link to="/contribuer" className="link-arrow">Voir comment contribuer <ArrowRight {...iconProps} /></Link></p>
          </section>

          <section>
            <h2>Ce que Docaine n’est pas</h2>
            <p>
              Docaine ne remplace pas la documentation officielle : pour une spécification exacte ou un
              cas limite, c’est elle qui fait foi. Les pages sont reformulées à partir de la documentation de
              Python 3.15 ; <a className="link-arrow" href="https://docs.python.org/3.15/" target="_blank" rel="noopener noreferrer">la source reste ici <ExternalLink {...iconProps} /></a>.
            </p>
          </section>

          <section>
            <h2>Le nom</h2>
            <p>
              « Docaine », c’est « doc » avec un petit côté dont on a du mal à décrocher : une documentation
              qu’on a envie de relire. La pilule du logo en est le clin d’œil.
            </p>
          </section>

          <section>
            <h2>Et maintenant</h2>
            <p>
              Python 3.15 est le premier langage couvert, mais le projet est pensé pour s’élargir
              à d’autres langages et concepts.
            </p>
            <p><Link className="btn" to={firstPagePath(languages[0]?.slug ?? 'python')}>Lire la documentation</Link></p>
          </section>
        </div>
      </div>
    </div>
  );
}
