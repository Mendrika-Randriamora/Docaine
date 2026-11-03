---
title: Classes et objets
description: Définir une classe, __init__, attributs, méthodes et propriétés.
order: 1
---

## Description

Une **classe** est un plan ; un **objet** (ou *instance*) est un exemplaire construit d’après ce plan. Il regroupe des données (*attributs*) et des comportements (*méthodes*).

```python
class Compte:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde

    def deposer(self, montant):
        if montant <= 0:
            raise ValueError("montant positif requis")
        self.solde += montant

c = Compte("Ada", 100)
c.deposer(50)
c.solde        # 150
```

- `__init__` initialise un objet à sa création.
- `self` désigne l’objet courant : c’est **le premier paramètre de toute méthode**, passé automatiquement.

## Attributs d’instance et de classe

```python
class Chat:
    espece = "félin"          # attribut de classe : partagé

    def __init__(self, nom):
        self.nom = nom        # attribut d'instance : propre à chaque objet
```

## Représentation lisible

```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

Point(1, 2)       # Point(1, 2)  au lieu de <Point object at 0x…>
```

## Propriétés : contrôler l’accès

```python
class Cercle:
    def __init__(self, rayon):
        self.rayon = rayon

    @property
    def aire(self):               # utilisé comme un attribut : c.aire
        return 3.14159 * self.rayon ** 2
```

Python n’a pas de `private` : par convention, un nom commençant par `_` signifie « usage interne ».

## Méthodes de classe et statiques

```python
class Date:
    def __init__(self, j, m, a): ...

    @classmethod
    def depuis_texte(cls, texte):      # constructeur alternatif
        j, m, a = map(int, texte.split("/"))
        return cls(j, m, a)

    @staticmethod
    def est_bissextile(a):             # n'utilise ni self ni cls
        return a % 4 == 0 and (a % 100 != 0 or a % 400 == 0)
```

## Pièges courants

- **Oublier `self`** dans la définition : `TypeError: … takes 1 positional argument but 2 were given`.
- **Attribut de classe mutable** (`liste = []` dans le corps de la classe) : partagé par *toutes* les instances. Créez-le dans `__init__`.
- Pour une classe qui ne fait que porter des données, voir [Dataclasses](/docs/python/objets/dataclasses).
