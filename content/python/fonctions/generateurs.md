---
title: Itérateurs et générateurs
description: Produire des valeurs à la demande avec yield, sans tout charger en mémoire.
order: 4
---

## Itérable et itérateur

- Un **itérable** peut être parcouru par `for` (liste, str, dict, fichier…).
- Un **itérateur** fournit les éléments un par un avec `next()` et s’épuise : après le dernier, `StopIteration`.

```python
it = iter([10, 20])
next(it)     # 10
next(it)     # 20
next(it)     # StopIteration
```

## Générateur : une fonction avec `yield`

`yield` renvoie une valeur **et met la fonction en pause** jusqu’au prochain `next()`. L’état local est conservé.

```python
def compte_a_rebours(n):
    while n > 0:
        yield n
        n -= 1

for i in compte_a_rebours(3):
    print(i)        # 3, 2, 1
```

Rien n’est calculé tant qu’on ne le demande pas : on peut représenter des suites énormes, voire infinies.

```python
def entiers():
    n = 0
    while True:
        yield n
        n += 1

from itertools import islice
list(islice(entiers(), 5))     # [0, 1, 2, 3, 4]
```

## Expression génératrice

```python
total = sum(len(ligne) for ligne in open("gros.txt", encoding="utf-8"))
```

Même syntaxe qu’une compréhension de liste, avec des parenthèses : une seule ligne en mémoire à la fois.

## `yield from`

Délègue à un autre itérable :

```python
def aplatir(listes):
    for l in listes:
        yield from l

list(aplatir([[1, 2], [3]]))     # [1, 2, 3]
```

## Pièges courants

- **Un générateur ne se rejoue pas.** Une seconde boucle sur le même générateur ne produit rien ; recréez-le.
- **`len()` et l’indexation** ne fonctionnent pas sur un générateur : convertissez avec `list()` si nécessaire.
- Voir aussi le module [`itertools`](/docs/python/bibliotheque-standard/itertools).
