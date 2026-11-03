/**
 * Chargement du contenu — principe « content collections » d'Astro.
 *
 *   content/
 *   └── <langage>/                 ex. python
 *       ├── _language.json         { name, tagline, version, order }
 *       └── <section>/             ex. fonctions
 *           ├── _section.json      { title, order }
 *           └── <page>.md          frontmatter (title, description, order) + Markdown
 *
 * Ajouter une page = ajouter un fichier .md. Aucun code à modifier.
 */
import GithubSlugger from 'github-slugger';

const files = import.meta.glob('/content/**/*.{md,json}', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (/^(".*"|'.*')$/.test(value)) value = value.slice(1, -1);
    else if (/^-?\d+$/.test(value)) value = Number(value);
    data[key] = value;
  }
  return { data, body: m[2] };
}

function build() {
  const langs = {};
  for (const [path, src] of Object.entries(files)) {
    const parts = path.replace(/^\/content\//, '').split('/');
    const [langSlug, a, b] = parts;
    const lang = (langs[langSlug] ??= { slug: langSlug, meta: {}, sections: {} });

    if (parts.length === 2 && a === '_language.json') {
      lang.meta = JSON.parse(src);
    } else if (parts.length === 3) {
      const section = (lang.sections[a] ??= { slug: a, title: a, order: 999, pages: [] });
      if (b === '_section.json') {
        Object.assign(section, JSON.parse(src));
      } else if (b.endsWith('.md')) {
        const { data, body } = parseFrontmatter(src);
        const slug = b.replace(/\.md$/, '');
        section.pages.push({
          slug,
          title: data.title ?? slug,
          description: data.description ?? '',
          order: data.order ?? 999,
          body,
          file: `content${path.slice('/content'.length)}`,
          path: `/docs/${langSlug}/${a}/${slug}`,
          lang: langSlug,
          section: a,
        });
      }
    }
  }
  return Object.values(langs)
    .map((l) => ({
      ...l,
      name: l.meta.name ?? l.slug,
      sections: Object.values(l.sections)
        .sort((x, y) => x.order - y.order)
        .map((s) => ({ ...s, pages: s.pages.sort((x, y) => x.order - y.order) })),
    }))
    .sort((x, y) => (x.meta.order ?? 999) - (y.meta.order ?? 999));
}

export const languages = build();

export const getLanguage = (slug) => languages.find((l) => l.slug === slug);

export const flatPages = (langSlug) =>
  (getLanguage(langSlug)?.sections ?? []).flatMap((s) => s.pages);

export function getPage(langSlug, sectionSlug, pageSlug) {
  const section = getLanguage(langSlug)?.sections.find((s) => s.slug === sectionSlug);
  return section?.pages.find((p) => p.slug === pageSlug);
}

export const firstPagePath = (langSlug) => flatPages(langSlug)[0]?.path ?? '/docs';

export const allPages = () => languages.flatMap((l) => flatPages(l.slug));

/** Sommaire (h2/h3) extrait du Markdown, en ignorant les blocs de code. */
export function extractToc(body) {
  const slugger = new GithubSlugger();
  const toc = [];
  let inCode = false;
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) inCode = !inCode;
    if (inCode) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*$/);
    if (!m) continue;
    const text = m[2].replace(/[`*_]/g, '');
    toc.push({ level: m[1].length, text, id: slugger.slug(text) });
  }
  return toc;
}

export function plainText(body) {
  return body
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```\w*/g, ' '))
    .replace(/[#>*_`|\[\]()-]/g, ' ')
    .replace(/\s+/g, ' ');
}
