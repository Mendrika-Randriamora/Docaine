---
title: Tuples
description: Suites immuables, dépaquetage et affectations multiples.
order: 2
---

## Description

Un `tuple` est une suite **ordonnée et immuable**. Utilisez-le pour regrouper quelques valeurs liées (coordonnées, couple clé/valeur, retour multiple).

```python
point = (3, 4)
un_seul = (5,)        # la virgule fait le tuple, pas les parenthèses
sans_parentheses = 1, 2, 3
```

## Dépaquetage

```python
x, y = point                    # x=3, y=4
a, b = b, a                     # échange sans variable temporaire
premier, *reste = [1, 2, 3, 4]  # premier=1, reste=[2, 3, 4]
*debut, dernier = [1, 2, 3]     # debut=[1, 2], dernier=3
```

## Retourner plusieurs valeurs

```python
def min_max(valeurs):
    return min(valeurs), max(valeurs)    # un tuple

petit, grand = min_max([4, 1, 9])
```

## Tuple nommé

Pour des champs lisibles, voir `collections.namedtuple` ou, mieux, les [dataclasses](/docs/python/objets/dataclasses).

## Pourquoi immuable ?

- Un tuple dont tous les éléments sont hashables peut servir de **clé de dictionnaire** ou d’élément d’ensemble ; pas une liste.
- Il signale à celui qui lit : « ces valeurs ne changeront pas ».

```python
distances = {(0, 0): "origine", (1, 2): "A"}
```

## Pièges courants

- Immuable ne veut pas dire « profondément figé » : un tuple contenant une liste permet de modifier cette liste.
- `(5)` est l’entier 5, pas un tuple : il faut `(5,)`.
