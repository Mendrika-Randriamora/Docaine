import Markdown from '../components/Markdown.jsx';
import source from './contribuer.md?raw';

export default function Contribute() {
  return (
    <div className="page">
      <div className="container page-narrow">
        <p className="eyebrow">Contribuer</p>
        <h1 className="page-title">
          Ajoutez une page,<br /><strong>pas une ligne de code.</strong>
        </h1>
        <p className="page-lead">Docaine grandit par fichiers Markdown. Voici tout ce qu’il faut savoir pour écrire le vôtre.</p>
        <Markdown>{source}</Markdown>
      </div>
    </div>
  );
}
