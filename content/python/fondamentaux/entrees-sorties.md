---
title: Entrées et sorties
description: Afficher avec print, lire avec input, ouvrir des fichiers avec open.
order: 4
---

## `print()` — Description

Affiche des valeurs sur la sortie standard.

```python
print(*objets, sep=" ", end="\n", file=sys.stdout, flush=False)
```

### Paramètres

- `*objets` : valeurs à afficher, converties avec `str()`.
- `sep` : séparateur entre les valeurs.
- `end` : texte ajouté à la fin (par défaut un retour à la ligne).
- `file` : destination (`sys.stderr` pour les erreurs, un fichier ouvert…).
- `flush` : force l’écriture immédiate.

### Exemples

```python
print("a", "b", "c")                  # a b c
print("a", "b", sep="-")              # a-b
print("chargement", end="… ")         # pas de retour à la ligne
print("erreur !", file=__import__("sys").stderr)
```

## `input()` — Description

Lit une ligne au clavier et la renvoie **toujours sous forme de `str`**. \
[`plus sur input ->`](/docs/python/fonctions/quelques-fonctions-utils#input)

```python
age = int(input("Votre âge ? "))     # convertir soi-même
```

Si la saisie n’est pas un nombre valide, `int()` lève `ValueError` : voir [Exceptions](/docs/python/erreurs/exceptions).

## `open()` — Lire et écrire des fichiers

```python
open(file, mode="r", encoding=None, newline=None)
```

| Mode | Signification |
| --- | --- |
| `"r"` | lecture (défaut) |
| `"w"` | écriture, **écrase** le fichier |
| `"a"` | ajout à la fin |
| `"x"` | création, échoue si le fichier existe |
| `"b"` (ajouté) | mode binaire : `"rb"`, `"wb"` |

Utilisez toujours `with` : le fichier est fermé automatiquement, même en cas d’erreur.

```python
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("première ligne\n")

with open("notes.txt", encoding="utf-8") as f:
    for ligne in f:                  # lit ligne par ligne, économe en mémoire
        print(ligne.rstrip())

with open("notes.txt", encoding="utf-8") as f:
    tout = f.read()                  # tout le contenu d'un coup
```

## Pièges courants

- **Mode `"w"` détruit le contenu existant** sans avertissement.
- **Oublier `\n`** avec `write()` : contrairement à `print()`, il n’ajoute pas de retour à la ligne.
- Pour manipuler des chemins, préférez [`pathlib`](/docs/python/bibliotheque-standard/pathlib).
