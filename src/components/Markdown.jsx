import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import { Link } from 'react-router-dom';
import { Check, Copy, iconProps } from './icons.js';

function CodeBlock({ children }) {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const lang = (children?.props?.className || '').match(/language-([\w-]+)/)?.[1];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(preRef.current?.innerText ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="code">
      <div className="code-bar">
        <span>{lang || 'texte'}</span>
        <button onClick={copy} aria-live="polite" aria-label={copied ? 'Copié' : 'Copier le code'}>
          {copied ? <Check {...iconProps} /> : <Copy {...iconProps} />}
        </button>
      </div>
      <pre ref={preRef}>{children}</pre>
    </div>
  );
}

const heading = (Tag) =>
  function Heading({ id, children }) {
    return (
      <Tag id={id}>
        {children}
        {id && <a className="anchor" href={`#${id}`} aria-label="Lien vers cette section">#</a>}
      </Tag>
    );
  };

function Anchor({ href = '', children }) {
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>;
  if (href.startsWith('#')) return <a href={href}>{children}</a>;
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function Markdown({ children }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={{
          pre: CodeBlock,
          a: Anchor,
          h2: heading('h2'),
          h3: heading('h3'),
          table: ({ children }) => <div className="table-wrap"><table>{children}</table></div>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
