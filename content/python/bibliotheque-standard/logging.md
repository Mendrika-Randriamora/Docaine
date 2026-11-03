---
title: logging
description: Journaliser proprement à la place de print : niveaux, formats, fichiers.
order: 8
---

## Description

`logging` remplace `print()` pour le diagnostic : niveaux de gravité, horodatage, destination configurable (console, fichier…) sans changer le code.

```python
import logging
```

## Niveaux

| Niveau | Valeur | Usage |
| --- | --- | --- |
| `DEBUG` | 10 | détails pour le développeur |
| `INFO` | 20 | déroulement normal |
| `WARNING` | 30 | situation inhabituelle (**défaut**) |
| `ERROR` | 40 | une opération a échoué |
| `CRITICAL` | 50 | arrêt du programme probable |

Seuls les messages **de niveau ≥ au seuil configuré** sont émis.

## Configuration minimale

```python
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s : %(message)s",
    datefmt="%H:%M:%S",
)

log = logging.getLogger(__name__)     # un logger par module

log.info("démarrage")
log.warning("disque à %d%%", 91)
log.error("échec de connexion à %s", hote)
```

Résultat : `15:30:12 INFO __main__ : démarrage`.

## Journaliser une exception

```python
try:
    traiter()
except Exception:
    log.exception("traitement impossible")    # ajoute la trace complète
```

## Écrire dans un fichier

```python
logging.basicConfig(filename="app.log", encoding="utf-8", level=logging.DEBUG)
```

Pour la rotation des fichiers, voir `logging.handlers.RotatingFileHandler`.

## Bonnes pratiques

- **`logging.getLogger(__name__)`** dans chaque module ; **`basicConfig` une seule fois**, au point d’entrée du programme.
- Les **bibliothèques** n’appellent jamais `basicConfig` : c’est à l’application de le faire.

## Pièges courants

- **Formater soi-même** (`log.info(f"x={x}")`) évalue la chaîne même si le niveau est désactivé. Utilisez `log.info("x=%s", x)`.
- **Aucune sortie pour `INFO`** : le seuil par défaut est `WARNING`. Configurez `level`.
- `basicConfig` ne fait rien si le logger racine est déjà configuré.
