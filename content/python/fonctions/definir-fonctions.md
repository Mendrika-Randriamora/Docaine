---
title: Définir des fonctions
description: def, paramètres, valeurs par défaut, *args, **kwargs et valeur de retour.
order: 1
---

## Description

Une fonction regroupe du code réutilisable sous un nom.

```python
def aire(largeur, hauteur):
    """Renvoie l'aire d'un rectangle."""
    return largeur * hauteur

aire(3, 4)      # 12
```

La chaîne en première ligne est la **docstring** : elle documente la fonction (`help(aire)`). Sans `return`, la fonction renvoie `None`.

## Types d’arguments

```python
def accueillir(nom, salutation="Bonjour"):    # valeur par défaut
    return f"{salutation} {nom}"

accueillir("Ada")                         # positionnel
accueillir("Ada", salutation="Salut")     # par mot-clé
accueillir(salutation="Hello", nom="Ada") # ordre libre avec les mots-clés
```

### Arguments variables

```python
def somme(*nombres):          # nombres est un tuple
    return sum(nombres)

def afficher(**options):      # options est un dict
    for cle, val in options.items():
        print(cle, "=", val)

somme(1, 2, 3)                # 6
afficher(couleur="bleu", taille=3)
```

À l’appel, `*` et `**` *dépaquettent* :

```python
args = [1, 2, 3]
somme(*args)
```

### Imposer la façon de passer les arguments

```python
def f(a, b, /, c, *, d):
    ...
# a, b : positionnels uniquement      (avant /)
# c    : positionnel ou mot-clé
# d    : mot-clé uniquement           (après *)
```

## Retourner plusieurs valeurs

```python
def diviser(a, b):
    return a // b, a % b      # un tuple

q, r = diviser(17, 5)
```

## Portée des variables

Une variable créée dans une fonction est **locale**. Lire une variable globale est permis ; la réaffecter demande `global` (à éviter) — préférez passer des paramètres et retourner des résultats.

## Pièges courants

- **Valeur par défaut mutable** : évaluée *une seule fois*, à la définition.

```python
def ajouter(x, liste=[]):      # ❌ la même liste est réutilisée
    liste.append(x)
    return liste

def ajouter(x, liste=None):    # ✅
    if liste is None:
        liste = []
    liste.append(x)
    return liste
```

- **Oublier `return`** : la fonction renvoie `None` sans erreur.
