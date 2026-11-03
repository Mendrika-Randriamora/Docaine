---
title: Chaînes de caractères
description: Créer, formater, découper et transformer du texte.
order: 3
---

## Créer une chaîne

```python
a = "guillemets doubles"
b = 'guillemets simples'
c = """texte
sur plusieurs lignes"""
d = r"C:\dossier\nouveau"      # chaîne brute : \ n'est pas spécial
```

Les chaînes sont **immuables** : aucune opération ne modifie la chaîne d’origine, chacune en renvoie une nouvelle.

## f-strings : le formatage à utiliser

```python
nom, prix = "café", 2.5
f"{nom} coûte {prix:.2f} €"        # 'café coûte 2.50 €'
f"{prix * 3 = }"                   # 'prix * 3 = 7.5'  (débogage)
f"{1234567:,}"                     # '1,234,567'
f"{0.256:.1%}"                     # '25.6%'
f"{42:>8}|{42:<8}|{42:^8}"         # alignement droite/gauche/centre
```

La syntaxe est `{expression:format}`. Le format `.2f` signifie « 2 décimales » ; `>8` « aligné à droite sur 8 caractères ».

## Indexer et trancher

```python
s = "Python"
s[0]       # 'P'
s[-1]      # 'n'   (depuis la fin)
s[1:4]     # 'yth' (début inclus, fin exclue)
s[::-1]    # 'nohtyP' (inversé)
```

## Méthodes essentielles

| Méthode | Effet | Exemple |
| --- | --- | --- |
| `s.strip()` | retire espaces aux extrémités | `"  a ".strip()` → `'a'` |
| `s.split(sep)` | découpe en liste | `"a,b".split(",")` → `['a','b']` |
| `sep.join(liste)` | assemble | `"-".join(["a","b"])` → `'a-b'` |
| `s.replace(a, b)` | remplace | `"aab".replace("a","x")` → `'xxb'` |
| `s.startswith(p)` / `endswith` | teste un préfixe/suffixe | |
| `s.lower()` / `upper()` | casse | |
| `s.find(x)` | indice ou `-1` | |
| `x in s` | contient ? | `"th" in "Python"` → `True` |

```python
", ".join(str(n) for n in range(4))   # '0, 1, 2, 3'
```

## Texte et octets

Une `str` est du texte Unicode ; `bytes` est une suite d’octets. On convertit avec un **encodage** :

```python
"é".encode("utf-8")        # b'\xc3\xa9'
b"\xc3\xa9".decode("utf-8")  # 'é'
```

> Depuis Python 3.15, l’encodage par défaut est UTF-8 sur toutes les plateformes. Précisez tout de même `encoding="utf-8"` dans vos `open()` pour du code portable.

## Pièges courants

- **Concaténer dans une boucle** (`s += x`) est lent sur de gros volumes : accumulez dans une liste puis `"".join(liste)`.
- `len("é")` vaut 1, mais `len("é".encode())` vaut 2 : texte ≠ octets.
