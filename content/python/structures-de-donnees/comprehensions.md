---
title: Compréhensions
description: Construire listes, ensembles et dictionnaires en une expression.
order: 5
---

## Compréhension de liste

Forme compacte de « boucle + append » :

```python
carres = [n * n for n in range(5)]            # [0, 1, 4, 9, 16]
pairs = [n for n in range(10) if n % 2 == 0]  # filtre
etiquettes = ["pair" if n % 2 == 0 else "impair" for n in range(3)]
```

Structure : `[expression for variable in iterable if condition]`.

La condition de **filtrage** va à la fin ; le `if/else` de **transformation** va au début.

## Ensembles et dictionnaires

```python
{len(m) for m in ["a", "bb", "cc"]}           # {1, 2}
{m: len(m) for m in ["a", "bb", "cc"]}        # {'a': 1, 'bb': 2, 'cc': 2}
```

## Expressions génératrices

Avec des parenthèses, rien n’est construit en mémoire : les valeurs sont produites à la demande.

```python
somme = sum(n * n for n in range(1_000_000))
```

## Boucles imbriquées

```python
paires = [(x, y) for x in range(2) for y in range(2)]
# [(0, 0), (0, 1), (1, 0), (1, 1)]

aplatie = [x for ligne in [[1, 2], [3]] for x in ligne]   # [1, 2, 3]
```

L’ordre des `for` est celui des boucles imbriquées écrites à la main.

## Nouveau en 3.15 : dépaquetage dans les compréhensions

Python 3.15 permet `*` et `**` directement :

```python
lignes = [[1, 2], [3, 4], [5]]
[*ligne for ligne in lignes]       # [1, 2, 3, 4, 5]
```

Voir [Nouveautés 3.15](/docs/python/nouveautes/nouveautes-3-15).

## Pièges courants

- Au-delà d’un `for` et d’un `if`, la lisibilité s’effondre : écrivez une vraie boucle.
- N’utilisez pas une compréhension pour ses **effets de bord** (`[print(x) for x in l]`) : c’est une boucle déguisée.
