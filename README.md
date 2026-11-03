# Docaine

Documentation **claire, nette et précise** pour développeurs (« La doc que vous auriez voulu lire »). Première collection : **Python 3.15**, en français (39 pages).

## Lancer le site

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # génère dist/
npm run preview    # teste le build
```

Prérequis : Node.js 18+.

## Design

Basé sur la maquette fournie (`docs/maquette.jpg`).

| Élément | Valeur |
| --- | --- |
| Police | **URW Gothic** (Book + Demi), dans `src/assets/fonts/` |
| Logo pied de page | `#9C9286` |
| Gris menu / boutons / accents | `#868781` |
| Fond de la section d'intro | `#D9D9D9` (tel que sur la maquette) |
| Logo sur l'illustration | `#FFEEEE` |

- Les couleurs sont des variables CSS en tête de `src/styles.css` (`--taupe`, `--gris`, `--pale`, `--rose`) ; mode sombre inclus.
- Images : illustration d'accueil `src/assets/hero.jpg`, logotype `public/docaine-wordmark.svg` (intégré en composant dans `src/components/Brand.jsx`, pour changer sa couleur), icônes `public/favicon.svg`, `icon-180.png`, `icon-512.png`.
- Menu plein écran (hamburger), accueil, pied de page avec liens utiles, pages **À propos** et **Contribuer**.
- La police a été convertie depuis les fichiers Type 1 de la famille URW Gothic L fournis avec TeX Live. Vérifiez sa licence (URW++, AGPL avec exception pour les polices) avant une diffusion publique.

## Stack

- **Vite + React 18 + React Router 6** (SPA statique)
- **react-markdown** + `remark-gfm` + `rehype-slug` + `rehype-highlight` pour afficher les `.md`
- **MiniSearch** pour la recherche (index construit au chargement, insensible aux accents)

## Comment le contenu est organisé

Même principe que les *content collections* d'Astro, avec une arborescence inspirée du manuel PHP
(langage → section → page) :

```
content/
└── python/
    ├── _language.json            { "name", "version", "order", "tagline" }
    └── fonctions/
        ├── _section.json         { "title", "order" }
        ├── definir-fonctions.md
        └── decorateurs.md
```

Chaque page est un fichier Markdown avec un en-tête :

```markdown
---
title: Décorateurs
description: Ajouter un comportement à une fonction sans la modifier.
order: 3
---
## Principe
…
```

- L'URL est déduite du chemin : `/docs/python/fonctions/decorateurs`.
- Le menu, le sommaire de droite, la navigation précédent/suivant et la recherche sont générés automatiquement.
- **Aucun code à modifier pour ajouter une page** : créez le fichier `.md`.
- Gabarit de page (style manuel PHP : Description, Paramètres, Valeur de retour, Exceptions, Exemples) : `docs/MODELE-PAGE.md`.
- Liens entre pages : chemin absolu `[texte](/docs/python/objets/classes)`.

### Ajouter un nouveau langage ou concept

1. Créez `content/javascript/_language.json`.
2. Ajoutez des dossiers de sections avec leur `_section.json`.
3. Ajoutez des pages `.md`. Le langage apparaît seul sur l'accueil et dans `/docs`.

## Structure du code

```
src/
├── App.jsx                 routes (/, /docs, /docs/:lang, /docs/:lang/:section/:page)
├── lib/content.js          lecture des .md, arbre langage → section → page, sommaire
├── components/
│   ├── Layout.jsx          en-tête, menu plein écran, pied de page, raccourcis (/ et Ctrl+K)
│   ├── Brand.jsx           logotype Docaine et pilule
│   ├── Markdown.jsx        rendu Markdown, coloration, bouton « Copier », liens
│   ├── Search.jsx          recherche plein texte
│   └── ThemeToggle.jsx     clair / sombre (mémorisé)
├── pages/                  Home, About, Contribute (+ contribuer.md), DocsIndex, DocPage, NotFound
└── styles.css              design system (variables CSS clair/sombre)
```

## Déploiement

`npm run build` produit un site statique dans `dist/` (Netlify, Vercel, GitHub Pages, nginx…).
Le routage étant côté client, le serveur doit renvoyer `index.html` pour toute URL
(`public/_redirects` le fait pour Netlify). Sous-dossier (GitHub Pages) : changer `base` dans `vite.config.js`.

## Source du contenu

Pages rédigées à partir de la documentation officielle de Python 3.15
(<https://docs.python.org/3.15/>), reformulées et réorganisées.
