---
title: Exceptions
description: Gérer les erreurs avec try/except, lever ses propres exceptions et les enchaîner.
order: 1
---

## Principe

Quand une opération échoue, Python **lève une exception**. Si personne ne l’attrape, le programme s’arrête avec une trace. `try` / `except` permet de réagir.

```python
try:
    n = int(input("Un nombre : "))
    resultat = 100 / n
except ValueError:
    print("Ce n'est pas un nombre.")
except ZeroDivisionError:
    print("Division par zéro.")
else:
    print("Résultat :", resultat)     # seulement si aucune exception
finally:
    print("Terminé.")                  # toujours exécuté
```

| Bloc | Quand |
| --- | --- |
| `try` | code à surveiller |
| `except Type` | si une exception de ce type est levée |
| `else` | si **aucune** exception n’a eu lieu |
| `finally` | **toujours**, pour libérer des ressources |

## Exceptions courantes

| Exception | Cause typique |
| --- | --- |
| `ValueError` | bonne nature, mauvaise valeur : `int("abc")` |
| `TypeError` | mauvais type : `"a" + 1` |
| `KeyError` | clé de dict absente |
| `IndexError` | indice hors limites |
| `AttributeError` | attribut inexistant (souvent sur `None`) |
| `FileNotFoundError` | fichier introuvable |
| `ZeroDivisionError` | division par zéro |

## Attraper plusieurs types

```python
except (KeyError, IndexError) as e:
    print("Accès invalide :", e)
```

`as e` donne l’objet exception ; `str(e)` en donne le message.

## Lever une exception

```python
def retirer(solde, montant):
    if montant > solde:
        raise ValueError(f"solde insuffisant ({solde} < {montant})")
    return solde - montant
```

Dans un `except`, `raise` seul **relance** l’exception courante.

## Exceptions personnalisées

```python
class ErreurPaiement(Exception):
    """Le paiement a échoué."""

try:
    ...
except OSError as e:
    raise ErreurPaiement("réseau indisponible") from e   # chaîne la cause
```

`raise … from e` conserve l’erreur d’origine dans la trace, très utile pour déboguer.

## Groupes d’exceptions

Depuis Python 3.11, `except*` gère plusieurs erreurs simultanées (typique avec `asyncio.TaskGroup`) :

```python
try:
    ...
except* ValueError as groupe:
    print(groupe.exceptions)
```

## Pièges courants

- **`except:` nu ou `except Exception: pass`** avale toutes les erreurs, bugs compris. Attrapez le type le plus précis possible.
- **Trop de code dans `try`** : limitez-le aux lignes qui peuvent réellement échouer.
- **EAFP** (« demander pardon plutôt que la permission ») est idiomatique : essayez, puis gérez l’erreur, plutôt que de tout vérifier avant.
