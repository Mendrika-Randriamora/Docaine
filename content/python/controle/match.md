---
title: match / case
description: Le filtrage par motifs (Python 3.10+) pour aiguiller selon la forme d’une donnée.
order: 3
---

## Description

`match` compare une valeur à une série de **motifs** et exécute le premier qui correspond. C’est plus qu’un `switch` : il sait aussi *décomposer* les structures.

```python
def reponse(code):
    match code:
        case 200:
            return "OK"
        case 404:
            return "Introuvable"
        case 500 | 502 | 503:
            return "Erreur serveur"
        case _:
            return "Inconnu"
```

`_` est le motif « joker » : il correspond à tout.

## Décomposer des séquences

```python
match commande.split():
    case ["aller", direction]:
        print("vers", direction)
    case ["prendre", *objets]:
        print("prend", objets)
    case []:
        print("rien")
```

## Décomposer des dictionnaires et des objets

```python
match evenement:
    case {"type": "clic", "x": x, "y": y}:
        print(f"clic en {x},{y}")
    case {"type": "touche", "key": k}:
        print("touche", k)

match point:
    case Point(x=0, y=0):
        print("origine")
    case Point(x=0):
        print("sur l'axe Y")
```

## Gardes

```python
match n:
    case int() if n < 0:
        print("entier négatif")
    case int():
        print("entier")
```

## Pièges courants

- **Un nom seul capture, il ne compare pas.** `case couleur:` accepte *n’importe quoi* et l’affecte à `couleur`. Pour comparer à une constante, utilisez un nom **qualifié** : `case Couleur.ROUGE:`.
- `match` sur un dict ne vérifie pas que *toutes* les clés sont listées : les clés supplémentaires sont ignorées.
