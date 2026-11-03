---
title: re (expressions régulières)
description: Chercher, extraire et remplacer du texte avec des motifs.
order: 3
---

## Description

Une **expression régulière** décrit un motif de texte. Utilisez toujours des **chaînes brutes** `r"…"` pour ne pas doubler les antislashs.

```python
import re
```

## Fonctions principales

| Fonction | Rôle | Renvoie |
| --- | --- | --- |
| `re.search(p, s)` | premier match **n’importe où** | `Match` ou `None` |
| `re.match(p, s)` | match **au début** seulement | `Match` ou `None` |
| `re.fullmatch(p, s)` | toute la chaîne doit correspondre | `Match` ou `None` |
| `re.findall(p, s)` | tous les matchs | liste de `str` |
| `re.finditer(p, s)` | tous les matchs | itérateur de `Match` |
| `re.sub(p, repl, s)` | remplace | `str` |
| `re.split(p, s)` | découpe | liste |
| `re.compile(p)` | précompile le motif | objet motif |

## Syntaxe essentielle

| Motif | Sens |
| --- | --- |
| `.` | n’importe quel caractère (sauf saut de ligne) |
| `\d` `\w` `\s` | chiffre, caractère de mot, espace |
| `[abc]` `[^abc]` | l’un de / aucun de |
| `*` `+` `?` | 0 ou plus / 1 ou plus / 0 ou 1 |
| `{2,4}` | entre 2 et 4 répétitions |
| `^` `$` | début / fin |
| `(…)` | groupe capturant |
| `(?P<nom>…)` | groupe nommé |
| `a\|b` | a ou b |

## Exemples

```python
m = re.search(r"(\d{4})-(\d{2})-(\d{2})", "Le 2026-11-03 à Tana")
m.group(0)      # '2026-11-03'
m.group(1)      # '2026'
m.groups()      # ('2026', '11', '03')

m = re.search(r"(?P<annee>\d{4})-(?P<mois>\d{2})", "2026-11")
m["annee"]      # '2026'
```

```python
re.findall(r"\b\w+@\w+\.\w+\b", "ada@x.org, bob@y.com")
# ['ada@x.org', 'bob@y.com']

re.sub(r"\s+", " ", "trop    d'espaces   ")      # "trop d'espaces "
re.sub(r"(\w+) (\w+)", r"\2 \1", "bonjour monde")  # 'monde bonjour'
```

## Options (flags)

```python
re.search(r"python", texte, re.IGNORECASE)
re.compile(r"""
    (\d+)   # entier
    \.      # point
    (\d+)   # décimales
""", re.VERBOSE)
```

## Pièges courants

- **`match` ≠ `search`** : `re.match("b", "abc")` renvoie `None`.
- **Tester le résultat avant `.group()`** : `None.group` lève `AttributeError`.
- **Quantificateurs gourmands** : `<.*>` avale tout jusqu’au dernier `>`. Utilisez `<.*?>` (non gourmand).
- Pour du HTML ou du JSON, n’utilisez pas de regex : prenez un vrai analyseur.
