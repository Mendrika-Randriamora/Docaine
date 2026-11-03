---
title: Environnements virtuels et pip
description: Isoler les dépendances de chaque projet avec venv et pip.
order: 3
---

## Pourquoi

Sans isolation, tous vos projets partagent les mêmes bibliothèques : une mise à jour pour l’un casse l’autre. Un **environnement virtuel** est un dossier contenant un Python et des paquets propres à *un* projet.

## Créer et activer

```bash
python3 -m venv .venv            # crée le dossier .venv

source .venv/bin/activate        # Linux / macOS
.venv\Scripts\Activate.ps1       # Windows PowerShell
```

L’invite du terminal affiche alors `(.venv)`. Pour sortir : `deactivate`.

## Installer des paquets

```bash
python -m pip install requests
python -m pip install "requests>=2.31,<3"   # avec contrainte de version
python -m pip list                           # voir ce qui est installé
python -m pip uninstall requests
```

## Figer les dépendances

```bash
python -m pip freeze > requirements.txt     # écrire la liste exacte
python -m pip install -r requirements.txt   # la réinstaller ailleurs
```

> Ajoutez `.venv/` à votre `.gitignore` : on versionne `requirements.txt`, jamais l’environnement lui-même.

## Pièges courants

- **Oublier d’activer** l’environnement : les paquets s’installent alors globalement. Vérifiez avec `python -c "import sys; print(sys.prefix)"`.
- **Déplacer ou renommer le dossier** `.venv` le casse. Supprimez-le et recréez-le.
- **`externally-managed-environment`** : votre système refuse `pip` global. C’est voulu — utilisez un `venv`.
