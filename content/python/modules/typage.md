---
title: Annotations de type
description: Documenter les types attendus et laisser mypy ou votre éditeur détecter les erreurs.
order: 2
---

## Description

Les **annotations de type** indiquent les types attendus. Python **ne les vérifie pas** à l’exécution : elles servent à la lecture, à l’éditeur et à des vérificateurs comme `mypy` ou `pyright`.

```python
def saluer(nom: str, fois: int = 1) -> str:
    return (f"Bonjour {nom} ! " * fois).strip()

age: int = 30
noms: list[str] = []
```

## Types composés

```python
scores: dict[str, int] = {"Ada": 12}
point: tuple[float, float] = (1.0, 2.0)
variable: tuple[int, ...] = (1, 2, 3)      # tuple de longueur quelconque
```

Depuis Python 3.9 on écrit `list[int]` (plus besoin de `typing.List`).

## Optionnel et unions

```python
def trouver(nom: str) -> int | None:       # soit un int, soit None
    ...

identifiant: int | str = 42
```

`X | Y` est disponible depuis Python 3.10 (remplace `Optional[X]` et `Union`).

## Callables, littéraux, alias

```python
from collections.abc import Callable, Iterable, Sequence
from typing import Literal

def appliquer(f: Callable[[int], int], valeurs: Iterable[int]) -> list[int]:
    return [f(v) for v in valeurs]

Mode = Literal["r", "w", "a"]      # seules ces valeurs sont acceptées
```

Python 3.12 apporte une syntaxe dédiée pour les alias et les génériques :

```python
type Coordonnees = tuple[float, float]

def premier[T](elements: list[T]) -> T:
    return elements[0]
```

## Dictionnaires typés

```python
from typing import TypedDict

class Utilisateur(TypedDict):
    nom: str
    age: int

u: Utilisateur = {"nom": "Ada", "age": 36}
```

## Vérifier

```bash
python -m pip install mypy
mypy mon_script.py
```

## Pièges courants

- **Croire que les types protègent à l’exécution** : `saluer(42)` s’exécute sans erreur de typage.
- **`Any`** désactive la vérification : à garder pour les cas sans solution.
- Préférez des types abstraits en entrée (`Iterable`, `Sequence`) et concrets en sortie (`list`).
