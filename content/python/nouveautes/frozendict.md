---
title: frozendict
description: Le dictionnaire immuable et hashable, intégré à Python 3.15.
order: 3
---

## Description

`frozendict` est un **dictionnaire immuable** (PEP 814), disponible directement, sans import. Une fois créé, on ne peut plus ni ajouter, ni modifier, ni supprimer de clé.

```python
a = frozendict(x=1, y=2)
a                 # frozendict({'x': 1, 'y': 2})
a["x"]            # 1
a["z"] = 3        # TypeError: 'frozendict' object does not support item assignment
```

## Propriétés

- **Hashable** si toutes ses clés et valeurs le sont : utilisable comme **clé de dict** ou élément d’un `set`.
- **Conserve l’ordre d’insertion**, mais la **comparaison l’ignore**.
- **N’est pas une sous-classe de `dict`** : il hérite directement de `object`.

```python
b = frozendict(y=2, x=1)
a == b                      # True  (l'ordre ne compte pas)
hash(a) == hash(b)          # True

cache = {a: "résultat"}     # un dict ordinaire ne pourrait pas servir de clé
```

## Quand l’utiliser

- Configuration ou constantes qu’aucun code ne doit modifier.
- Clés composées (`{frozendict(...): ...}`), mémoïsation d’appels avec options.
- Données partagées entre threads sans risque de modification.

## Compatibilité

Ces modules acceptent `frozendict` : `copy`, `decimal`, `json`, `marshal`, `plistlib` (écriture), `pickle`, `pprint`, `xml.etree.ElementTree`. `eval()` / `exec()` l’acceptent comme *globals*.

## Pièges courants

- **`isinstance(x, dict)` est `False`** pour un `frozendict`. Pour accepter les deux :

```python
isinstance(x, (dict, frozendict))
# ou, plus général (inclut aussi MappingProxyType, etc.) :
from collections.abc import Mapping
isinstance(x, Mapping)
```

- **Immuable ≠ profondément immuable** : si une valeur est une liste, cette liste reste modifiable (et le `frozendict` n’est alors pas hashable).

## Voir aussi

- [Dictionnaires](/docs/python/structures-de-donnees/dictionnaires) pour le `dict` modifiable.
