---
title: Dictionnaires
description: Associer des clés à des valeurs : accès, itération, fusion.
order: 3
---

## Description

Un `dict` associe des **clés** uniques à des **valeurs**. L’accès par clé est quasi instantané et l’**ordre d’insertion est conservé**.

```python
perso = {"nom": "Ada", "age": 36}
perso["nom"]          # 'Ada'
perso["ville"] = "Londres"     # ajout
perso["age"] = 37              # modification
del perso["ville"]             # suppression
```

Les clés doivent être *hashables* (str, int, tuple de hashables…), pas une liste.

## Lire sans risque

`perso["x"]` lève `KeyError` si la clé manque. Alternatives :

```python
perso.get("ville")             # None
perso.get("ville", "inconnue") # valeur par défaut
"nom" in perso                 # True
perso.setdefault("tags", [])   # crée la clé si absente, renvoie la valeur
```

## Parcourir

```python
for cle in perso: ...                    # les clés
for valeur in perso.values(): ...
for cle, valeur in perso.items():        # les deux (le plus courant)
    print(cle, valeur)
```

## Fusionner

```python
a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}
a | b            # {'x': 1, 'y': 99, 'z': 3}   (b l'emporte en cas de doublon)
a |= b           # fusion sur place
{**a, **b}       # forme équivalente (dépaquetage)
```

## Construire

```python
dict(a=1, b=2)
dict(zip(["x", "y"], [1, 2]))           # {'x': 1, 'y': 2}
{n: n**2 for n in range(4)}             # {0: 0, 1: 1, 2: 4, 3: 9}
```

## Pièges courants

- **Modifier un `dict` pendant qu’on l’itère** lève `RuntimeError`. Itérez sur `list(d)` ou construisez un nouveau dict.
- `d.get("k")` renvoie `None` à la fois si la clé manque et si sa valeur est `None`. Pour les distinguer, utilisez `in`.
- Pour compter ou grouper, voir `collections.Counter` et `defaultdict` dans [collections](/docs/python/bibliotheque-standard/collections).
- Python 3.15 ajoute un type **immuable** : [`frozendict`](/docs/python/nouveautes/frozendict).
