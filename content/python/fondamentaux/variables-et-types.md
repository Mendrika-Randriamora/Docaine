---
title: Variables et types
description: Nommer des valeurs, comprendre le typage dynamique et les types de base.
order: 1
---

## Une variable est une étiquette

En Python, `x = 5` ne **range** pas 5 dans une boîte : il **attache le nom `x` à l’objet `5`**. Le type appartient à la *valeur*, pas au nom.

```python
x = 5          # x désigne un int
x = "cinq"     # x désigne maintenant une str : autorisé
```

C’est le **typage dynamique** : le type est vérifié à l’exécution. Python reste **fortement typé** : `"5" + 5` lève une `TypeError` au lieu de convertir silencieusement.

## Les types de base

| Type | Exemple | Mutable ? |
| --- | --- | --- |
| `int` | `42`, `1_000_000` | non |
| `float` | `3.14`, `1e-3` | non |
| `bool` | `True`, `False` | non |
| `str` | `"texte"` | non |
| `NoneType` | `None` | non |
| `list` | `[1, 2]` | **oui** |
| `dict` | `{"a": 1}` | **oui** |

```python
type(42)        # <class 'int'>
isinstance(42, int)   # True  (préférer isinstance à type() ==)
```

## `None` : l’absence de valeur

`None` est un objet unique. On le teste avec `is`, pas `==` :

```python
resultat = None
if resultat is None:
    print("pas encore de résultat")
```

## Conversions explicites

```python
int("42")        # 42
int("3.5")       # ValueError : passer par float("3.5") puis int(...)
float("3.5")     # 3.5
str(42)          # "42"
bool("")         # False  (vide → False)
```

## Noms de variables

- Lettres, chiffres, `_` ; ne commence pas par un chiffre ; sensible à la casse.
- Convention (PEP 8) : 
  - `snake_case` pour variables et fonctions
  - `MAJUSCULES` pour les constantes
  - `PascalCase` pour les classes.
- Évitez d’écraser des noms intégrés : `list`, `dict`, `str`, `id`, `input`…

## Pièges courants

- **Valeurs « fausses »** (`False`, `None`, `0`, `""`, `[]`, `{}`) : toutes évaluées comme `False` dans un `if`. Pratique, mais `if x:` ne distingue pas `0` de `None`.
- **Affectation ≠ copie** : `b = a` donne *deux noms pour le même objet*. Voir [Listes](/docs/python/structures-de-donnees/listes).
