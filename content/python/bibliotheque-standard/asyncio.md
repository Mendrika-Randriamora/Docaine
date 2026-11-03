---
title: asyncio
description: Programmation asynchrone : coroutines, tâches concurrentes, timeouts.
order: 9
---

## Description

`asyncio` permet de gérer **beaucoup d’opérations d’attente** (réseau, disque, timers) dans un seul thread : quand une tâche attend, une autre s’exécute. Il ne rend **pas** le calcul plus rapide : pour du calcul intensif, voir `multiprocessing`.

## Coroutines : `async def` et `await`

```python
import asyncio

async def saluer(nom, delai):
    await asyncio.sleep(delai)        # cède la main pendant l'attente
    print(f"Bonjour {nom}")
    return nom.upper()

resultat = asyncio.run(saluer("Ada", 1))   # point d'entrée du programme
```

- `async def` définit une **coroutine** : l’appeler ne l’exécute pas, elle renvoie un objet à *attendre*.
- `await` suspend la coroutine jusqu’au résultat. Il n’est permis que dans une `async def`.
- `asyncio.run()` démarre la boucle d’événements : à appeler **une fois**, au sommet.

## Exécuter en parallèle : `TaskGroup` (3.11+)

```python
async def main():
    async with asyncio.TaskGroup() as groupe:
        t1 = groupe.create_task(saluer("Ada", 2))
        t2 = groupe.create_task(saluer("Bob", 1))
    print(t1.result(), t2.result())      # total ≈ 2 s, pas 3 s

asyncio.run(main())
```

Si l’une des tâches échoue, les autres sont annulées et l’erreur est propagée (en `ExceptionGroup`, voir [Exceptions](/docs/python/erreurs/exceptions)).

## Autre façon : `gather`

```python
resultats = await asyncio.gather(saluer("Ada", 2), saluer("Bob", 1))
# ['ADA', 'BOB'], dans l'ordre des arguments
```

## Délais

```python
try:
    async with asyncio.timeout(3):
        await operation_lente()
except TimeoutError:
    print("trop long")
```

## Limiter la concurrence

```python
sem = asyncio.Semaphore(5)          # 5 tâches à la fois

async def telecharger(url):
    async with sem:
        ...
```

## Code bloquant dans un programme async

```python
contenu = await asyncio.to_thread(Path("gros.bin").read_bytes)
```

## Pièges courants

- **Oublier `await`** : la coroutine n’est jamais exécutée (`RuntimeWarning: coroutine was never awaited`).
- **`time.sleep()` dans une coroutine** bloque *toute* la boucle : utilisez `await asyncio.sleep()`.
- **Appeler `asyncio.run()` depuis du code déjà asynchrone** (ex. notebook Jupyter) échoue : utilisez `await` directement.
- Les bibliothèques doivent être **compatibles async** (`httpx`, `aiohttp`…) ; `requests` bloque.
