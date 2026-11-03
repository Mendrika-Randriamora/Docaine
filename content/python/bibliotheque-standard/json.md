---
title: json
description: Lire et écrire du JSON : dumps, loads, dump, load et pièges de types.
order: 2
---

## Description

Convertit des données Python en texte JSON, et inversement.

```python
import json
```

## Correspondance des types

| Python | JSON |
| --- | --- |
| `dict` | objet `{}` |
| `list`, `tuple` | tableau `[]` |
| `str` | chaîne |
| `int`, `float` | nombre |
| `True` / `False` / `None` | `true` / `false` / `null` |

## `json.dumps()` — objet → texte

```python
json.dumps(obj, *, indent=None, ensure_ascii=True, sort_keys=False, default=None) -> str
```

- `indent` : nombre d’espaces pour un rendu lisible.
- `ensure_ascii=False` : conserve les accents au lieu de `é`.
- `sort_keys` : trie les clés.
- `default` : fonction appelée pour les types non sérialisables.

```python
data = {"nom": "Zoé", "age": 30, "actif": True, "note": None}
print(json.dumps(data, indent=2, ensure_ascii=False))
```

```text
{
  "nom": "Zoé",
  "age": 30,
  "actif": true,
  "note": null
}
```

## `json.loads()` — texte → objet

```python
json.loads('{"x": [1, 2, 3]}')     # {'x': [1, 2, 3]}
```

**Exceptions** : `json.JSONDecodeError` (sous-classe de `ValueError`) si le texte est invalide.

## `json.dump()` / `json.load()` — avec des fichiers

```python
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open("data.json", encoding="utf-8") as f:
    data = json.load(f)
```

La lettre **s** (« string ») distingue `dumps`/`loads` (texte) de `dump`/`load` (fichier).

## Sérialiser des types non JSON

```python
from datetime import datetime

def convertir(o):
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(f"non sérialisable : {type(o).__name__}")

json.dumps({"quand": datetime.now()}, default=convertir)
```

## Pièges courants

- **Clés non-chaînes** : `{1: "a"}` devient `{"1": "a"}` ; relire donne des clés `str`.
- **Tuples** reviennent en **listes**.
- **`NaN` / `Infinity`** : produits par défaut mais invalides en JSON strict (`allow_nan=False` pour refuser).
- Les simples quotes ne sont pas du JSON valide : `{'a': 1}` échoue.
