---
title: argparse
description: Construire une interface en ligne de commande avec arguments, options et aide automatique.
order: 7
---

## Description

`argparse` lit `sys.argv`, valide les types, génère l’aide (`--help`) et les messages d’erreur.

```python
import argparse
```

## Exemple complet

```python
import argparse

def main():
    parser = argparse.ArgumentParser(description="Compte les lignes d'un fichier.")
    parser.add_argument("fichier", help="chemin du fichier")
    parser.add_argument("-n", "--max", type=int, default=10, help="limite (défaut : %(default)s)")
    parser.add_argument("-v", "--verbeux", action="store_true", help="détails")

    args = parser.parse_args()
    if args.verbeux:
        print("lecture de", args.fichier)

if __name__ == "__main__":
    main()
```

```bash
python compter.py notes.txt -n 5 -v
python compter.py --help
```

## `add_argument()` — paramètres principaux

| Paramètre | Rôle |
| --- | --- |
| nom (`"fichier"`) | **argument positionnel**, obligatoire |
| `"-n"`, `"--max"` | **option** (facultative par défaut) |
| `type=` | convertit : `int`, `float`, `Path`… |
| `default=` | valeur si absent |
| `required=True` | rend une option obligatoire |
| `choices=[…]` | valeurs autorisées |
| `nargs=` | `"?"` (0 ou 1), `"*"` (0+), `"+"` (1+), ou un entier |
| `action=` | `"store_true"` (drapeau), `"count"`, `"append"`… |
| `help=` | texte d’aide |

La valeur est lue dans `args.nom` (le `--` devient `_` : `--dry-run` → `args.dry_run`).

## Sous-commandes

```python
parser = argparse.ArgumentParser()
sub = parser.add_subparsers(dest="commande", required=True)

ajout = sub.add_parser("ajouter", help="ajoute un élément")
ajout.add_argument("nom")

sub.add_parser("lister", help="liste les éléments")

args = parser.parse_args()
if args.commande == "ajouter":
    ...
```

## Tester sans terminal

```python
args = parser.parse_args(["notes.txt", "-n", "3"])
```

## Pièges courants

- **Argument `type=bool`** : `bool("False")` vaut `True`. Utilisez `action="store_true"`.
- Les erreurs d’utilisation font appeler `sys.exit(2)` : ne pas les attraper avec un `except Exception`.
- Trouvez-vous trop de sous-commandes ? Regardez des bibliothèques comme `click` ou `typer`.
