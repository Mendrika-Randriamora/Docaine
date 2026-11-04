---
title: Définir des fonctions
description: def, paramètres, valeurs par défaut, *args, **kwargs et valeur de retour.
order: 1
---

## Description

Dans la programmation, une fonction est une sorte de "boîte noire" qui prend des entrées (appelées paramètres), exécute des instructions, et retourne souvent un résultat. Elle te permet de regrouper des portions de code pour effectuer une tâche spécifique, ce qui aide à organiser et à réutiliser ton code.

```python
def aire(largeur, hauteur):
    """Renvoie l'aire d'un rectangle."""
    return largeur * hauteur

aire(3, 4)      # 12
```

La chaîne en première ligne est la **docstring** : elle documente la fonction (`help(aire)`). Sans `return`, la fonction renvoie `None`.

## Qu’est-ce qu’un paramètre ?

Un **paramètre** est une variable déclarée dans la signature d’une fonction. Il reçoit une valeur à chaque appel, ce qui permet à la fonction de travailler avec des données différentes sans réécrire son code.

```python
def aire(largeur, hauteur):
    return largeur * hauteur
```

Ici, `largeur` et `hauteur` sont les paramètres. Ils n’ont pas de valeur tant que la fonction n’est pas appelée, et leur nom n’existe que dans la fonction.

## Paramètre ou argument ?

Le **paramètre** est la variable dans la définition ; l’**argument** est la valeur concrète fournie lors de l’appel.

```python
def saluer(nom):        # nom est un paramètre
    return f"Bonjour {nom}"

saluer("Ada")           # "Ada" est un argument
```

Ici, le paramètre `nom` reçoit l’argument `"Ada"`. Lors d’un autre appel, le même paramètre peut recevoir une autre valeur : c’est l’argument qui change, pas la définition de la fonction.

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
