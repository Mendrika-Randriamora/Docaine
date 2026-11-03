## Le principe

Tout le contenu vit dans le dossier `content/`, en fichiers Markdown. **Il n’y a aucun code à modifier** pour ajouter une page : le site découvre les fichiers, construit le menu, le sommaire, la recherche et les liens « précédent / suivant ».

```text
content/
└── python/
    ├── _language.json            nom, version, ordre, description
    └── fonctions/
        ├── _section.json         titre et ordre de la section
        ├── definir-fonctions.md
        └── decorateurs.md
```

L’adresse d’une page est déduite de son chemin : `content/python/fonctions/decorateurs.md` devient `/docs/python/fonctions/decorateurs`.

## Ajouter une page

1. Choisissez le langage et la section (créez le dossier si besoin, avec son `_section.json`).
2. Créez un fichier `.md` avec cet en-tête :

```markdown
---
title: Décorateurs
description: Ajouter un comportement à une fonction sans la modifier.
order: 3
---

## Principe
…
```

- `title` : le titre affiché et utilisé par la recherche.
- `description` : une phrase, affichée sous le titre et dans les résultats de recherche.
- `order` : la position dans le menu de la section (1, 2, 3…).

## Ajouter un langage ou un concept

Créez `content/<nom>/_language.json` :

```json
{ "name": "JavaScript", "version": "ES2025", "order": 2, "tagline": "Le langage du web, sans détour." }
```

Puis ajoutez des sections et des pages. Le langage apparaît seul sur l’accueil et dans la documentation.

## Comment écrire une page

Docaine vise la clarté. Pour garder le même niveau partout :

- **Une idée par page.** Si la page en couvre deux, faites-en deux.
- **Commencez par ce que ça fait**, puis montrez le code, puis le résultat.
- **Des exemples complets**, qu’on peut copier-coller et exécuter.
- **Finissez par « Pièges courants »** : ce qui surprend réellement.
- **Pour une fonction ou une méthode**, suivez le plan du manuel PHP : *Description*, *Paramètres*, *Valeur de retour*, *Exceptions*, *Exemples*.
- **Indiquez la version** quand une fonctionnalité est récente (« Python 3.12+ »).
- **Liez les pages entre elles** avec des chemins absolus : `[Classes](/docs/python/objets/classes)`.

## Lancer le site en local

```bash
npm install
npm run dev
```

Le site s’ouvre sur `http://localhost:5173` et se met à jour à chaque modification d’un fichier `.md`.
