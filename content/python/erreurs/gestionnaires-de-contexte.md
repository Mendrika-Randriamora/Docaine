---
title: Gestionnaires de contexte (with)
description: Garantir la libération des ressources avec with et contextlib.
order: 2
---

## Description

`with` garantit qu’une action de **nettoyage** est exécutée à la sortie du bloc, même si une exception survient : fermer un fichier, libérer un verrou, valider une transaction.

```python
with open("data.txt", encoding="utf-8") as f:
    contenu = f.read()
# f est fermé ici, quoi qu'il arrive
```

Plusieurs ressources dans un seul `with` :

```python
with open("in.txt") as entree, open("out.txt", "w") as sortie:
    sortie.write(entree.read().upper())
```

## Créer le sien avec `contextlib`

La façon la plus simple : un générateur décoré.

```python
from contextlib import contextmanager
import time

@contextmanager
def chrono(nom):
    debut = time.perf_counter()
    try:
        yield                       # le corps du with s'exécute ici
    finally:
        print(f"{nom} : {time.perf_counter() - debut:.2f} s")

with chrono("calcul"):
    sum(range(10_000_000))
```

Pour renvoyer une valeur au `as` : `yield valeur`.

## Avec une classe

```python
class Connexion:
    def __enter__(self):
        print("ouverture")
        return self

    def __exit__(self, type_exc, exc, trace):
        print("fermeture")
        return False          # False : ne pas masquer l'exception
```

`__exit__` reçoit les détails de l’exception éventuelle. Retourner `True` la supprimerait : à faire rarement.

## Utilitaires de `contextlib`

```python
from contextlib import suppress, redirect_stdout, closing
import io

with suppress(FileNotFoundError):       # ignorer une erreur précise
    os.remove("temp.txt")

buffer = io.StringIO()
with redirect_stdout(buffer):           # capter print()
    print("capturé")
```

## Pièges courants

- **Utiliser une ressource après le `with`** : le fichier est fermé, `f.read()` lève `ValueError`.
- **Oublier le `try/finally`** dans un `@contextmanager` : sans lui, le nettoyage est sauté si le corps échoue.
