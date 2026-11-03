---
title: Ensembles
description: Collections sans doublon et opérations ensemblistes.
order: 4
---

## Description

Un `set` est une collection **non ordonnée d’éléments uniques et hashables**. Le test d’appartenance (`x in s`) est très rapide.

```python
couleurs = {"rouge", "vert", "rouge"}   # {'rouge', 'vert'}
vide = set()                            # attention : {} est un dict vide !
set([1, 2, 2, 3])                       # {1, 2, 3}
```

## Opérations

```python
a = {1, 2, 3}
b = {3, 4}
a | b       # union          {1, 2, 3, 4}
a & b       # intersection   {3}
a - b       # différence     {1, 2}
a ^ b       # symétrique     {1, 2, 4}
a <= {1, 2, 3, 4}   # inclusion : True
```

## Modifier

```python
a.add(9)
a.discard(42)    # sans erreur si absent
a.remove(42)     # KeyError si absent
```

## Cas d’usage typiques

```python
# Dédoublonner
list(set([3, 1, 3, 2]))         # ordre non garanti

# Dédoublonner en gardant l'ordre
list(dict.fromkeys([3, 1, 3, 2]))   # [3, 1, 2]

# Test d'appartenance rapide
interdits = {"admin", "root"}
if nom in interdits: ...
```

`frozenset` est la version immuable (utilisable comme clé de dict).

## Pièges courants

- `{}` crée un **dict**, pas un set.
- L’ordre d’itération n’est pas garanti : ne vous y fiez pas.
