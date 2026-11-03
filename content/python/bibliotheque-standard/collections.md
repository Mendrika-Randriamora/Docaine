---
title: collections
description: Counter, defaultdict, deque, namedtuple et autres conteneurs spécialisés.
order: 5
---

## Description

Conteneurs complémentaires de `list`, `dict`, `set` et `tuple`.

```python
from collections import Counter, defaultdict, deque, namedtuple, ChainMap
```

## `Counter` — compter

```python
c = Counter("abracadabra")
c                       # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
c["a"]                  # 5
c["z"]                  # 0 (jamais KeyError)
c.most_common(2)        # [('a', 5), ('b', 2)]
c.update("aaa")         # ajoute au décompte

Counter(mots.split()).most_common(10)    # mots les plus fréquents
```

## `defaultdict` — dictionnaire avec valeur par défaut

Le premier argument est une fonction appelée pour créer la valeur d’une clé absente.

```python
groupes = defaultdict(list)
for mot in ["pomme", "poire", "kiwi"]:
    groupes[mot[0]].append(mot)

dict(groupes)      # {'p': ['pomme', 'poire'], 'k': ['kiwi']}

compteur = defaultdict(int)
compteur["a"] += 1        # pas de KeyError
```

## `deque` — file à deux extrémités

Ajout et retrait en O(1) des deux côtés (une `list` est lente en tête).

```python
d = deque([1, 2, 3], maxlen=3)
d.append(4)          # deque([2, 3, 4])  : le plus ancien est éjecté
d.appendleft(0)      # deque([0, 2, 3])
d.pop()              # 3
d.popleft()          # 0
d.rotate(1)
```

Idéal pour les files d’attente et les « N derniers éléments ».

## `namedtuple` — tuple avec noms de champs

```python
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
p.x, p[1]            # 3, 4
p._replace(x=10)     # Point(x=10, y=4)
```

Pour de nouveaux projets, les [dataclasses](/docs/python/objets/dataclasses) sont souvent préférables.

## `ChainMap`

Regroupe plusieurs dictionnaires en une vue unique : la première correspondance gagne.

```python
config = ChainMap(options_cli, options_fichier, valeurs_par_defaut)
config["port"]
```

## Pièges courants

- **`defaultdict` crée la clé à la lecture** : `d["x"]` ajoute `"x"` même si vous ne faisiez que regarder. Utilisez `d.get("x")` ou `"x" in d` pour tester.
- Un `deque` ne supporte pas les tranches (`d[1:3]`).
