---
title: Méthodes spéciales
description: Les méthodes __dunder__ qui font réagir vos objets aux opérateurs et fonctions intégrées.
order: 4
---

## Description

Les méthodes dont le nom est entouré de doubles soulignés (`__nom__`, dites *dunder*) sont appelées **par Python** quand vous utilisez une syntaxe ou une fonction intégrée. On ne les appelle presque jamais directement.

| Vous écrivez | Python appelle |
| --- | --- |
| `Classe(...)` | `__init__` |
| `repr(x)`, affichage dans le REPL | `__repr__` |
| `str(x)`, `print(x)` | `__str__` (sinon `__repr__`) |
| `len(x)` | `__len__` |
| `x[i]` | `__getitem__` |
| `x + y` | `__add__` |
| `x == y` | `__eq__` |
| `x < y` | `__lt__` |
| `for a in x` | `__iter__` |
| `a in x` | `__contains__` |
| `x(...)` | `__call__` |
| `with x:` | `__enter__` / `__exit__` |
| `bool(x)` | `__bool__` (sinon `__len__`) |
| `hash(x)` | `__hash__` |

## Exemple : un vecteur

```python
class Vecteur:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Vecteur({self.x}, {self.y})"

    def __add__(self, autre):
        if not isinstance(autre, Vecteur):
            return NotImplemented
        return Vecteur(self.x + autre.x, self.y + autre.y)

    def __eq__(self, autre):
        return isinstance(autre, Vecteur) and (self.x, self.y) == (autre.x, autre.y)

    def __hash__(self):
        return hash((self.x, self.y))

    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

Vecteur(1, 2) + Vecteur(3, 4)    # Vecteur(4, 6)
```

Renvoyer `NotImplemented` (et non lever une erreur) laisse Python essayer l’opération inverse sur l’autre opérande.

## Faire d’un objet une collection

```python
class Playlist:
    def __init__(self):
        self._titres = []

    def __len__(self):
        return len(self._titres)

    def __getitem__(self, i):
        return self._titres[i]
```

`len()`, l’indexation, le tranchage et `for` fonctionnent déjà avec ces deux méthodes.

## Pièges courants

- **Définir `__eq__` sans `__hash__`** rend l’objet non hashable (donc inutilisable comme clé de dict). Définissez les deux.
- `__repr__` vise le **développeur** (idéalement `Classe(...)` exact), `__str__` l’**utilisateur**.
