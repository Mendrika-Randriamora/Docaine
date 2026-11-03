---
title: Nouveautés de Python 3.15
description: Ce qui change pour vous dans Python 3.15 (sorti le 9 octobre 2026), en résumé.
order: 1
---

## En un coup d’œil

| Nouveauté | PEP | En une phrase |
| --- | --- | --- |
| [Imports paresseux](/docs/python/nouveautes/lazy-imports) | 810 | `lazy import x` diffère le chargement jusqu’à la première utilisation. |
| [`frozendict`](/docs/python/nouveautes/frozendict) | 814 | Dictionnaire **immuable** et hashable intégré. |
| `sentinel` | 661 | Crée des valeurs-témoins uniques et lisibles. |
| Dépaquetage dans les compréhensions | 798 | `[*l for l in listes]` et `{**d for d in dicts}`. |
| UTF-8 par défaut | 686 | `open()` sans `encoding` utilise UTF-8 partout. |
| Paquet `profiling` + Tachyon | 799 | Profilage par échantillonnage, sans modifier le code. |

## Dépaquetage dans les compréhensions (PEP 798)

`*` et `**` fonctionnent maintenant dans les compréhensions et expressions génératrices. C’est une alternative directe aux boucles imbriquées ou à `itertools.chain`.

```python
listes = [[1, 2], [3, 4], [5]]
[*l for l in listes]            # [1, 2, 3, 4, 5]
# équivaut à : [x for l in listes for x in l]

ensembles = [{1, 2}, {2, 3}]
{*s for s in ensembles}          # {1, 2, 3}

dicts = [{"a": 1}, {"b": 2}, {"a": 3}]
{**d for d in dicts}             # {'a': 3, 'b': 2}    (le dernier gagne)

list((*l for l in listes))       # expression génératrice : aussi accepté
```

## `sentinel` : des valeurs-témoins uniques (PEP 661)

Pour distinguer « pas de valeur donnée » de `None`, on créait un `object()` anonyme à l’affichage illisible. Le nouveau type intégré `sentinel` règle cela :

```python
MANQUANT = sentinel("MANQUANT")
MANQUANT                          # MANQUANT   (repr lisible)

def lire(cle, defaut=MANQUANT):
    valeur = cache.get(cle, MANQUANT)
    if valeur is MANQUANT:
        if defaut is MANQUANT:
            raise KeyError(cle)
        return defaut
    return valeur
```

- Se compare avec `is` ; égal **uniquement à lui-même**.
- Truthy. Non sous-classable. Conserve son identité en cas de copie.
- Utilisable dans les annotations de type, avec `|` (`int | MANQUANT`).

## UTF-8 par défaut (PEP 686)

Avant, `open("f.txt")` utilisait l’encodage *de la machine* (cp1252 sur Windows, par exemple), source classique de textes corrompus. Désormais, **UTF-8 est l’encodage par défaut sur toutes les plateformes** quand aucun `encoding` n’est précisé.

```python
open("notes.txt").read()                   # UTF-8, partout
open("notes.txt", encoding="locale")       # encodage du système (ancien comportement)
```

> **Recommandation** : continuez à écrire `encoding="utf-8"` explicitement pour que votre code se comporte pareil sur toutes les versions de Python.

Pour revenir à l’ancien comportement : variable `PYTHONUTF8=0` ou option `-X utf8=0`.

## Profilage : paquet `profiling` et Tachyon (PEP 799)

- `profiling.tracing` : le profileur déterministe (anciennement `cProfile`, qui reste disponible comme alias).
- `profiling.sampling` (**Tachyon**) : échantillonne les piles d’appels d’un programme **déjà lancé**, sans le modifier ni le redémarrer, avec une surcharge quasi nulle. Il peut s’attacher à un processus par PID, lancer un script ou un module, ou prendre un instantané (`dump`) utile sur un programme bloqué.
- Le module `profile` est **déprécié** et sera retiré en Python 3.17.

Consultez la documentation du module `profiling.sampling` pour les options de ligne de commande.

## Autres changements notables

- **Compilateur JIT expérimental** nettement amélioré.
- **Messages d’erreur** améliorés et **plus de couleurs** dans l’aide en ligne de commande.
- **Typage** : `TypedDict` avec éléments supplémentaires typés (PEP 728), `TypeForm` (PEP 747), bases disjointes (PEP 800).
- **Fichiers `.pth`** de configuration de démarrage (PEP 829).
- **Binaires officiels** : Windows 64 bits utilise l’interpréteur à appels terminaux ; macOS installe le support *free-threading* par défaut.
- **API C** : nouvelle `PyBytesWriter`, ABI stable pour les builds free-threaded.

## Migrer vers 3.15

- Chassez les `open()` **sans `encoding`** : le comportement a pu changer si votre code tournait sur un système non UTF-8.
- Remplacez les usages de `profile` par `profiling.tracing` / `cProfile`.
- Lisez la section « Porting to Python 3.15 » des notes de version officielles avant de mettre à niveau un gros projet.
