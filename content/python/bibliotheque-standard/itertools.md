---
title: itertools
description: Assembler, regrouper et combiner des itérables de façon efficace et paresseuse.
order: 6
---

## Description

Des briques pour travailler sur des itérables **sans construire de listes intermédiaires**. La plupart renvoient des itérateurs : enveloppez avec `list()` pour voir le contenu.

```python
import itertools as it
```

## Enchaîner et découper

```python
list(it.chain([1, 2], [3], [4, 5]))          # [1, 2, 3, 4, 5]
list(it.chain.from_iterable([[1, 2], [3]]))  # [1, 2, 3]
list(it.islice(it.count(10), 3))             # [10, 11, 12]   (count est infini)
list(it.islice("ABCDEF", 1, 5, 2))           # ['B', 'D']
```

## `batched()` — par paquets (3.12+)

```python
for lot in it.batched(range(7), 3):
    print(lot)       # (0, 1, 2) / (3, 4, 5) / (6,)
```

`strict=True` (3.13+) lève `ValueError` si le dernier lot est incomplet.

## `pairwise()` — éléments consécutifs (3.10+)

```python
list(it.pairwise([1, 4, 9, 16]))     # [(1, 4), (4, 9), (9, 16)]
```

## Combinatoire

```python
list(it.product("AB", [1, 2]))
# [('A', 1), ('A', 2), ('B', 1), ('B', 2)]

list(it.permutations([1, 2, 3], 2))    # arrangements ordonnés (6)
list(it.combinations([1, 2, 3], 2))    # sans ordre : (1,2) (1,3) (2,3)
```

## Regrouper : `groupby()`

Groupe les éléments **consécutifs** ayant la même clé : **triez d’abord** par cette clé.

```python
mots = sorted(["pomme", "poire", "kiwi", "kaki"], key=lambda m: m[0])
for lettre, groupe in it.groupby(mots, key=lambda m: m[0]):
    print(lettre, list(groupe))
# k ['kiwi', 'kaki']
# p ['pomme', 'poire']
```

## Accumuler

```python
list(it.accumulate([1, 2, 3, 4]))                    # [1, 3, 6, 10]
list(it.accumulate([3, 1, 4], max))                  # [3, 3, 4]
list(it.takewhile(lambda n: n < 3, [1, 2, 5, 1]))    # [1, 2]
```

## Pièges courants

- **`groupby` sans tri préalable** donne des groupes fragmentés.
- **Un itérateur ne se rejoue pas** ; `it.tee()` en duplique mais consomme de la mémoire.
- Depuis Python 3.15, `[*l for l in listes]` remplace souvent `chain.from_iterable` : voir [Nouveautés](/docs/python/nouveautes/nouveautes-3-15).
