---
title: Listes
description: Suites ordonnées et modifiables : créer, parcourir, trier, copier.
order: 1
---

## Description

Une `list` est une suite **ordonnée** et **modifiable** d’éléments, de types éventuellement différents.

```python
nombres = [3, 1, 2]
vide = []
mixte = [1, "deux", 3.0, [4, 5]]
```

## Accéder et trancher

```python
nombres[0]       # 3
nombres[-1]      # 2 (derniere element de la liste)
nombres[0:2]     # [3, 1]   (de l'element a l'indice 0 a 2 non inclus)
nombres[::2]     # [3, 2]   (un sur deux)
len(nombres)     # 3
```

## Modifier

| Méthode | Effet | Retour |
| --- | --- | --- |
| `l.append(x)` | ajoute à la fin | `None` |
| `l.extend(iter)` | ajoute plusieurs éléments | `None` |
| `l.insert(i, x)` | insère à l’indice `i` | `None` |
| `l.remove(x)` | retire la première occurrence (`ValueError` si absente) | `None` |
| `l.pop(i=-1)` | retire et **renvoie** l’élément | l’élément |
| `l.sort()` | trie **sur place** | `None` |
| `l.reverse()` | inverse sur place | `None` |

```python
l = [3, 1, 2]
l.append(4)          # [3, 1, 2, 4]
l.sort()             # [1, 2, 3, 4]
dernier = l.pop()    # 4
```

## Trier : `sort()` ou `sorted()`

`l.sort()` modifie la liste ; \
`sorted(iterable)` en renvoie une **nouvelle** et accepte tout itérable. \
Les deux prennent `key` et `reverse` :

```python
mots = ["pomme", "kiwi", "banane"]
sorted(mots, key=len)                  # ['kiwi', 'pomme', 'banane']
sorted(mots, key=len, reverse=True)    # ['banane', 'pomme', 'kiwi']
```

## Copier

```python
a = [1, 2, 3]
b = a            # MÊME liste : modifier b modifie a
c = a.copy()     # copie superficielle (aussi : a[:] ou list(a))
```

Une copie *superficielle* duplique la liste mais pas les objets qu’elle contient. Pour une liste de listes, utilisez `copy.deepcopy`.

## Parcourir

```python 
for i in ["a", "b"]:
    print(i)
```

Avec `enumerate`
```python
for i, valeur in enumerate(["a", "b"], start=1):
    print(i, valeur)          # 1 a / 2 b
```
Comprendre [`enumerate()`](/docs/python/fonctions/quelques-fonctions-utils#enumerate)

## Pièges courants

- **`l.sort()` renvoie `None`** : `l = l.sort()` détruit votre liste.
- **Multiplier une liste de listes** partage les sous-listes :

```python
grille = [[0] * 3] * 2     # ❌ deux fois LA MÊME ligne
grille = [[0] * 3 for _ in range(2)]   # ✅
```

- **Modifier une liste pendant qu’on la parcourt** saute des éléments : bouclez sur une copie ou construisez une nouvelle liste.
