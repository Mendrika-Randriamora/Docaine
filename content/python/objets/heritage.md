---
title: Héritage et polymorphisme
description: Réutiliser une classe, super(), redéfinition et héritage multiple.
order: 2
---

## Description

Une classe **fille** hérite des attributs et méthodes de sa classe **mère** et peut les redéfinir.

```python
class Animal:
    def __init__(self, nom):
        self.nom = nom

    def parler(self):
        return "..."

class Chien(Animal):
    def parler(self):               # redéfinition
        return "Wouf"

class Chat(Animal):
    def __init__(self, nom, couleur):
        super().__init__(nom)       # appelle le __init__ de la mère
        self.couleur = couleur

    def parler(self):
        return "Miaou"

for a in [Chien("Rex"), Chat("Tom", "gris")]:
    print(a.nom, a.parler())        # polymorphisme
```

`super()` donne accès à la classe mère : indispensable pour ne pas dupliquer l’initialisation.

## Tester l’appartenance

```python
isinstance(Chien("Rex"), Animal)     # True
issubclass(Chien, Animal)            # True
```

## Héritage multiple et MRO

Une classe peut avoir plusieurs mères. L’ordre de recherche des méthodes est le **MRO** :

```python
class A: ...
class B(A): ...
class C(A): ...
class D(B, C): ...

D.__mro__     # (D, B, C, A, object)
```

## Classes abstraites

Imposer qu’une fille implémente une méthode :

```python
from abc import ABC, abstractmethod

class Forme(ABC):
    @abstractmethod
    def aire(self): ...

Forme()     # TypeError : classe abstraite
```

## Composition ou héritage ?

Héritez pour dire « **est un** » (un chien *est un* animal). Pour « **a un** » (une voiture *a un* moteur), mettez l’objet en attribut. La composition est souvent plus souple.

## Pièges courants

- **Oublier `super().__init__()`** : les attributs de la mère ne sont pas créés.
- L’héritage multiple complique vite le raisonnement : réservez-le aux *mixins* simples.
