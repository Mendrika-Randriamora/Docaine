---
title: Modules et packages
description: Découper son code en fichiers, importer, et comprendre où Python cherche.
order: 1
---

## Module = un fichier `.py`

```python
# utils.py
def double(x):
    return x * 2
```

```python
# main.py
import utils
utils.double(4)
```

## Les formes d’`import`

```python
import math                     # math.sqrt(4)
import numpy as np              # alias
from math import sqrt, pi       # noms importés directement
from math import *              # ❌ à éviter : pollue l'espace de noms
```

Préférez `import module` ou `from module import nom` explicite : on voit d’où vient chaque nom.

## Package = un dossier de modules

```text
monprojet/
├── main.py
└── app/
    ├── __init__.py       # peut être vide
    ├── modeles.py
    └── outils/
        ├── __init__.py
        └── texte.py
```

```python
from app.modeles import Utilisateur
from app.outils.texte import slugifier
```

Au sein d’un package, les **imports relatifs** désignent des voisins :

```python
# dans app/modeles.py
from .outils.texte import slugifier      # . = ce package
from . import autre_module
```

## Où Python cherche-t-il ?

Dans l’ordre : modules intégrés, dossier du script, puis les chemins de `sys.path` (dont `site-packages`).

```python
import sys
sys.path          # liste des dossiers de recherche
import json
json.__file__     # où se trouve ce module
```

## Lancer un module comme programme

```bash
python -m app.main       # exécute app/main.py en tant que module du package
```

## Imports paresseux (3.15)

Pour accélérer le démarrage, Python 3.15 ajoute `lazy import`. Voir [Imports paresseux](/docs/python/nouveautes/lazy-imports).

## Pièges courants

- **Nommer son fichier comme un module standard** (`random.py`, `json.py`) : il masque le vrai module. `import random` importe alors *votre* fichier.
- **Imports circulaires** (A importe B qui importe A) : déplacez le code partagé dans un troisième module, ou importez à l’intérieur de la fonction.
- `ModuleNotFoundError` : mauvais environnement virtuel, paquet non installé, ou lancement depuis le mauvais dossier.
