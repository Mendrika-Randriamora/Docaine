---
title: pathlib
description: Manipuler chemins, fichiers et dossiers avec des objets plutôt que des chaînes.
order: 1
---

## Description

`pathlib` représente un chemin par un objet `Path`, indépendant du système (`/` ou `\`). C’est l’alternative moderne à `os.path`.

```python
from pathlib import Path
```

## Construire un chemin

```python
dossier = Path("projet") / "data" / "notes.txt"   # l'opérateur / assemble
Path.home()                                        # dossier personnel
Path.cwd()                                         # dossier courant
```

## Examiner un chemin

| Attribut / méthode | Exemple pour `Path("a/b/rapport.tar.gz")` |
| --- | --- |
| `.name` | `'rapport.tar.gz'` |
| `.stem` | `'rapport.tar'` |
| `.suffix` | `'.gz'` |
| `.suffixes` | `['.tar', '.gz']` |
| `.parent` | `Path('a/b')` |
| `.parts` | `('a', 'b', 'rapport.tar.gz')` |

```python
p.with_suffix(".zip")        # change l'extension
p.with_name("autre.txt")     # change le nom
p.resolve()                  # chemin absolu, liens résolus
```

## `Path.exists()`, `is_file()`, `is_dir()`

Renvoient un booléen, sans lever d’erreur si le chemin n’existe pas.

## `Path.read_text()` / `write_text()`

```python
Path.read_text(encoding=None, errors=None) -> str
Path.write_text(data, encoding=None, errors=None, newline=None) -> int
```

- **Paramètres** : `encoding` (précisez `"utf-8"`), `data` (str à écrire).
- **Valeur de retour** : le contenu (`str`), ou le nombre de caractères écrits.
- **Exceptions** : `FileNotFoundError`, `PermissionError`.

```python
notes = Path("notes.txt")
notes.write_text("bonjour\n", encoding="utf-8")
notes.read_text(encoding="utf-8")          # 'bonjour\n'
notes.read_bytes()                         # contenu binaire
```

## Parcourir un dossier

```python
for f in Path(".").iterdir():              # contenu direct
    print(f.name)

list(Path("src").glob("*.py"))             # motif dans un dossier
list(Path("src").rglob("*.py"))            # récursif

for dossier, sous_dossiers, fichiers in Path("src").walk():   # Python 3.12+
    ...
```

## Créer, renommer, supprimer

```python
Path("a/b/c").mkdir(parents=True, exist_ok=True)   # comme mkdir -p
Path("old.txt").rename("new.txt")
Path("temp.txt").unlink(missing_ok=True)           # supprime un fichier
Path("vide").rmdir()                               # dossier vide uniquement
```

Pour supprimer un dossier non vide : `shutil.rmtree(chemin)`.

## Pièges courants

- **Mélanger `Path` et `str`** : `"dossier" + Path(...)` échoue ; utilisez `/` ou `str(path)`.
- **Chemins relatifs** : ils dépendent du dossier de lancement, pas de l’emplacement du script. Pour viser un fichier proche du script : `Path(__file__).parent / "data.json"`.
- **`write_text` écrase** le fichier existant.
