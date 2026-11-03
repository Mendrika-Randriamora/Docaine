---
title: Dataclasses
description: Déclarer des classes de données sans écrire le code répétitif.
order: 3
---

## Description

`@dataclass` génère automatiquement `__init__`, `__repr__` et `__eq__` à partir des annotations de champs.

```python
from dataclasses import dataclass

@dataclass
class Produit:
    nom: str
    prix: float
    stock: int = 0

p = Produit("Stylo", 1.5)
p                      # Produit(nom='Stylo', prix=1.5, stock=0)
p == Produit("Stylo", 1.5)    # True
```

Les annotations ne sont **pas vérifiées** à l’exécution : elles déclarent les champs et aident les outils de typage.

## Options utiles

```python
@dataclass(frozen=True)              # immuable, devient hashable
class Coordonnee:
    lat: float
    lon: float

@dataclass(slots=True, kw_only=True) # moins de mémoire, arguments nommés obligatoires
class Config:
    hote: str
    port: int = 8080

@dataclass(order=True)               # génère <, <=, >, >=
class Version:
    majeur: int
    mineur: int
```

## Valeurs par défaut mutables

```python
from dataclasses import dataclass, field

@dataclass
class Panier:
    articles: list[str] = field(default_factory=list)    # jamais `= []`
```

## Logique après initialisation

```python
@dataclass
class Rectangle:
    largeur: float
    hauteur: float
    aire: float = field(init=False)

    def __post_init__(self):
        self.aire = self.largeur * self.hauteur
```

## Utilitaires

```python
from dataclasses import asdict, replace
asdict(p)                     # {'nom': 'Stylo', 'prix': 1.5, 'stock': 0}
replace(p, stock=10)          # copie avec un champ modifié
```

## Pièges courants

- `articles: list = []` lève `ValueError` : utilisez `field(default_factory=list)`.
- Un champ avec défaut ne peut pas précéder un champ sans défaut (sauf avec `kw_only=True`).
