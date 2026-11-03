---
title: Décorateurs
description: Ajouter un comportement à une fonction sans la modifier.
order: 3
---

## Principe

Un décorateur est une fonction qui **reçoit une fonction et en renvoie une autre**. La syntaxe `@nom` est un raccourci :

```python
@mon_decorateur
def f(): ...

# équivaut à :
def f(): ...
f = mon_decorateur(f)
```

## Écrire un décorateur

```python
import functools
import time

def chronometrer(fonction):
    @functools.wraps(fonction)          # conserve le nom et la docstring
    def enveloppe(*args, **kwargs):
        debut = time.perf_counter()
        try:
            return fonction(*args, **kwargs)
        finally:
            duree = time.perf_counter() - debut
            print(f"{fonction.__name__} : {duree:.3f} s")
    return enveloppe

@chronometrer
def calcul(n):
    return sum(range(n))

calcul(1_000_000)      # calcul : 0.012 s
```

`*args, **kwargs` permet à l’enveloppe d’accepter n’importe quels arguments ; `functools.wraps` évite de perdre l’identité de la fonction décorée.

## Décorateur avec paramètres

Il faut un niveau de plus : une fonction qui renvoie le décorateur.

```python
def repeter(fois):
    def decorateur(fonction):
        @functools.wraps(fonction)
        def enveloppe(*args, **kwargs):
            for _ in range(fois):
                resultat = fonction(*args, **kwargs)
            return resultat
        return enveloppe
    return decorateur

@repeter(3)
def saluer():
    print("salut")
```

## Décorateurs utiles de la bibliothèque standard

| Décorateur | Rôle |
| --- | --- |
| `functools.cache` | mémoïse le résultat selon les arguments |
| `functools.lru_cache(maxsize=…)` | idem avec taille de cache bornée |
| `@property` | transforme une méthode en attribut calculé |
| `@staticmethod`, `@classmethod` | méthodes de classe |
| `@dataclass` | génère `__init__`, `__repr__`… |

```python
from functools import cache

@cache
def fibonacci(n):
    return n if n < 2 else fibonacci(n - 1) + fibonacci(n - 2)

fibonacci(80)     # instantané
```

## Pièges courants

- **Oublier `functools.wraps`** : `help()` et les traces d’erreur montrent `enveloppe` partout.
- **Empiler plusieurs décorateurs** : ils s’appliquent de bas en haut (le plus proche de `def` d’abord).
- `@cache` exige des arguments hashables.
