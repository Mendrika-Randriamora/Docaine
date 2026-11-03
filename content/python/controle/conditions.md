---
title: Conditions
description: if, elif, else, comparaisons et opérateurs logiques.
order: 1
---

## Syntaxe

```python
note = 14
if note >= 16:
    mention = "très bien"
elif note >= 12:
    mention = "bien"
else:
    mention = "à améliorer"
```

Seul le premier bloc dont la condition est vraie est exécuté.

## Comparaisons

| Opérateur | Sens |
| --- | --- |
| `==` `!=` | égal / différent (valeur) |
| `<` `<=` `>` `>=` | ordre |
| `is` / `is not` | **même objet** (pour `None`, `True`, `False`) |
| `in` / `not in` | appartenance |

Les comparaisons s’enchaînent : `0 <= x < 10` équivaut à `0 <= x and x < 10`.

## Opérateurs logiques

`and`, `or`, `not`. Ils sont **paresseux** (court-circuit) et renvoient l’un de leurs opérandes, pas forcément un booléen :

```python
nom = saisie or "anonyme"        # saisie vide → "anonyme"
user and user.profil              # n'évalue .profil que si user est vrai
```

## Expression conditionnelle

```python
statut = "majeur" if age >= 18 else "mineur"
```

## Valeur de vérité

Sont **faux** : `False`, `None`, `0`, `0.0`, `""`, `[]`, `{}`, `set()`. Tout le reste est vrai.

```python
if liste:            # liste non vide
    ...
if valeur is not None:   # à préférer quand 0 ou "" sont des valeurs valides
    ...
```

## Pièges courants

- **`=` au lieu de `==`** : `if x = 3:` est une erreur de syntaxe (heureusement).
- **`x == None`** fonctionne mais écrivez `x is None`.
- `if x == 1 or 2:` est **toujours vrai** (`2` est vrai). Écrivez `x in (1, 2)`.
