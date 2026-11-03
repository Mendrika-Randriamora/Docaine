---
title: Lambdas, closures et fonctions d’ordre supérieur
description: Fonctions anonymes, fonctions qui en renvoient d’autres, map/filter, functools.
order: 2
---

## Les fonctions sont des valeurs

On peut les stocker, les passer en argument et les renvoyer :

```python
def doubler(x):
    return x * 2

operations = {"double": doubler, "carre": lambda x: x * x}
operations["carre"](5)       # 25
```

## `lambda`

Une fonction anonyme limitée à **une expression** :

```python
sorted(personnes, key=lambda p: p["age"])
max(mots, key=lambda m: len(m))
```

Dès que la logique dépasse une ligne, utilisez un `def` nommé.

## `map`, `filter` et leurs équivalents

```python
list(map(str.upper, ["a", "b"]))           # ['A', 'B']
list(filter(None, [0, 1, "", "x"]))        # [1, 'x']
```

En pratique, une [compréhension](/docs/python/structures-de-donnees/comprehensions) est plus lisible : `[m.upper() for m in mots]`.

## Closures : une fonction qui se souvient

Une fonction interne garde accès aux variables de la fonction qui l’a créée :

```python
def multiplicateur(facteur):
    def appliquer(x):
        return x * facteur
    return appliquer

triple = multiplicateur(3)
triple(5)        # 15
```

Pour *modifier* une variable de la fonction englobante, déclarez-la `nonlocal` :

```python
def compteur():
    n = 0
    def incrementer():
        nonlocal n
        n += 1
        return n
    return incrementer
```

## `functools.partial`

Fixer certains arguments d’une fonction existante :

```python
from functools import partial

int_binaire = partial(int, base=2)
int_binaire("1010")      # 10
```

## Pièges courants

- **Closure dans une boucle** : toutes les lambdas partagent la *même* variable.

```python
fs = [lambda: i for i in range(3)]
[f() for f in fs]                     # [2, 2, 2]  ❌
fs = [lambda i=i: i for i in range(3)]
[f() for f in fs]                     # [0, 1, 2]  ✅
```
