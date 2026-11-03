---
title: Nombres et opérateurs
description: Arithmétique, division, arrondis et précision des flottants.
order: 2
---

## Opérateurs arithmétiques

| Opérateur | Rôle | Exemple | Résultat |
| --- | --- | --- | --- |
| `+` `-` `*` | addition, soustraction, produit | `7 * 3` | `21` |
| `/` | division **réelle** | `7 / 2` | `3.5` |
| `//` | division **entière** (vers le bas) | `7 // 2` | `3` |
| `%` | reste (modulo) | `7 % 2` | `1` |
| `**` | puissance | `2 ** 10` | `1024` |

```python
-7 // 2     # -4  (arrondi vers -∞, pas vers 0)
-7 % 2      # 1   (le signe suit le diviseur)
divmod(7, 2)   # (3, 1)  quotient et reste d'un coup
```

## Entiers : pas de limite de taille

Les `int` ont une précision arbitraire : `2 ** 200` fonctionne et reste exact. Les séparateurs `_` rendent les grands nombres lisibles : `1_000_000`.

## Flottants : précision limitée

Les `float` sont des binaires approchés (IEEE 754) :

```python
0.1 + 0.2            # 0.30000000000000004
0.1 + 0.2 == 0.3     # False !
```

Comparez avec une tolérance, et utilisez `decimal` pour l’argent :

```python
import math
from decimal import Decimal

math.isclose(0.1 + 0.2, 0.3)                       # True
Decimal("0.10") + Decimal("0.20")                   # Decimal('0.30')
```

## Arrondir

```python
round(2.567, 2)    # 2.57
round(2.5)         # 2   ← arrondi au pair le plus proche (« banquier »)
round(3.5)         # 4
```

`math.floor()` arrondit vers le bas, `math.ceil()` vers le haut, `math.trunc()` vers zéro.

## Opérateurs d’affectation composée

```python
n = 10
n += 5      # n = n + 5
n //= 2     # n = n // 2
```

## Pièges courants

- `/` renvoie **toujours** un `float`, même pour `4 / 2` (→ `2.0`). Utilisez `//` pour un entier.
- Ne comparez jamais deux `float` avec `==`.
