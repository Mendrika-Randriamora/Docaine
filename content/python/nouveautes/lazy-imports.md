---
title: Imports paresseux (lazy)
description: Accélérer le démarrage avec le mot-clé lazy : charger un module seulement quand on s’en sert.
order: 2
---

## Le problème

Un `import` charge immédiatement le module : localisation du fichier, lecture, compilation, exécution du code de haut niveau. Dans une grosse application, des dizaines de modules importés « au cas où » ralentissent le démarrage, même si la plupart ne servent pas à chaque exécution.

On contournait le souci en déplaçant les `import` dans les fonctions, ce qui disperse et alourdit le code.

## La solution : `lazy` (PEP 810, Python 3.15)

```python
lazy import json
lazy from pathlib import Path

print("Démarrage…")                    # json et pathlib ne sont pas encore chargés

data = json.loads('{"cle": "valeur"}') # json est chargé ICI, à la première utilisation
dossier = Path(".")                    # pathlib est chargé ICI
```

Tous les `import` restent en haut du fichier, mais le coût n’est payé que pour les modules réellement utilisés. En coulisses, le nom pointe vers un **objet intermédiaire** qui déclenche le vrai chargement au premier accès.

`lazy` est un *mot-clé souple* : il n’interdit pas d’avoir une variable nommée `lazy` ailleurs.

## Les erreurs arrivent plus tard

Si le module n’existe pas, l’exception est levée **à la première utilisation**, pas à l’`import`. La trace montre à la fois l’endroit de l’usage et la ligne d’`import` d’origine.

```python
lazy import module_inexistant
print("ok")                  # s'affiche quand même
module_inexistant.f()        # ModuleNotFoundError ici
```

## Restrictions

`lazy` n’est permis qu’**au niveau du module**. `SyntaxError` dans :

- une fonction ou un corps de classe ;
- un bloc `try` / `except` / `finally` ;
- `lazy from module import *` ;
- `lazy from __future__ import …`.

## Activer sans modifier le code

| Moyen | Effet |
| --- | --- |
| `python -X lazy_imports=all script.py` | tous les imports deviennent paresseux |
| `PYTHON_LAZY_IMPORTS=all` | idem, par variable d’environnement |
| `…=normal` (défaut) | seul le mot-clé `lazy` compte |
| `sys.set_lazy_imports("all")` / `sys.get_lazy_imports()` | à l’exécution |
| `sys.set_lazy_imports_filter(fonction)` | choisir module par module |

```python
import sys

def filtre(importateur, importe, fromlist):
    return importe.startswith("monapp.")      # True = peut être paresseux

sys.set_lazy_imports_filter(filtre)
sys.set_lazy_imports("all")
```

## Compatibilité avec les versions plus anciennes

Pour du code qui doit aussi tourner avant 3.15 (où le mot-clé serait une erreur de syntaxe), déclarez les modules concernés :

```python
__lazy_modules__ = ["json", "pathlib"]

import json     # traité comme paresseux en 3.15+, normal avant
import os       # reste immédiat
```

## Quand l’utiliser

- Outils en ligne de commande dont le démarrage doit être instantané.
- Gros paquets utilisés dans certains chemins seulement (graphiques, ML, export PDF…).

## Pièges courants

- **Effets de bord à l’import** (enregistrement de plugins, configuration) : retardés, donc potentiellement exécutés dans un autre ordre. Gardez ces modules en import normal.
- Pour détecter un import paresseux par programme : `types.LazyImportType`.
