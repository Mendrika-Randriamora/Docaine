---
title: Installer Python
description: Installer Python 3.15 et vérifier que tout fonctionne.
order: 2
---

## Télécharger

Prenez la dernière version stable sur [python.org/downloads](https://www.python.org/downloads/). Sur Linux et macOS, Python est souvent déjà présent, mais pas forcément à jour.

| Système | Méthode recommandée |
| --- | --- |
| Windows | Installateur python.org. **Cochez « Add python.exe to PATH »**. Si vous utiliser [le python install manager](https://www.python.org/downloads/release/pymanager-264/), vous ne devrais pas avoir de problème |
| macOS | Installateur python.org, ou `brew install python`. |
| Linux (Debian/Ubuntu) | `sudo apt install python3 python3-venv python3-pip`. |

> **Plusieurs versions ?** Un outil comme [`uv`](https://docs.astral.sh/uv/) ou `pyenv` permet d’en installer plusieurs côte à côte sans toucher au Python du système.

## Vérifier l’installation

```bash
python3 --version     # Linux / macOS
py --version          # Windows (lanceur « py »)
```

Résultat attendu : `Python 3.15.x`. Si la commande n’est pas trouvée sur Windows, le dossier de Python n’est pas dans le `PATH`.
[Click ici](/docs/python/demarrer/probleme-installation)

## Lancer l’interpréteur

```bash
python3   # Linux / macOs
py        # Windows
```

Vous obtenez l’invite `>>>` (le REPL). Tapez une expression, Python l’évalue et affiche le résultat :

```python
>>> 2 + 3
5
>>> "py" * 3
'pypypy'
```

Quittez avec `exit()` ou `Ctrl+D` (`Ctrl+Z` puis Entrée sous Windows).

## Pièges courants

- **`python` ou `python3` ?** Sur Linux/macOS, `python` peut ne pas exister ou pointer vers un autre Python. Utilisez `python3`.
- **`pip` installe dans le mauvais Python.** Préférez toujours `python3 -m pip …` : il garantit que `pip` correspond à l’interpréteur utilisé. Voir [Environnements virtuels](/docs/python/demarrer/environnements-virtuels).
