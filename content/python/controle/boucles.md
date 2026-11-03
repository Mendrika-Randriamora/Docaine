---
title: Boucles
description: for, while, range, break, continue et le else des boucles.
order: 2
---

## `for` : parcourir un itérable

```python
for lettre in "abc":
    print(lettre)

for i in range(3):          # 0, 1, 2
    print(i)
```

`range(debut, fin, pas)` : la fin est **exclue**. `range(5, 0, -1)` compte à rebours.

## Utilitaires de boucle

```python
for i, v in enumerate(["a", "b"]):          # indice + valeur
    ...
for nom, age in zip(noms, ages):            # deux listes en parallèle
    ...
for x in reversed(liste): ...
for x in sorted(liste): ...
```

`zip(..., strict=True)` lève une erreur si les longueurs diffèrent (au lieu de tronquer silencieusement).

## `while`

```python
n = 0
while n < 3:
    n += 1
```

Pour une boucle « jusqu’à ce qu’on dise stop » :

```python
while True:
    saisie = input("> ")
    if saisie == "q":
        break
```

## `break`, `continue`, `else`

- `break` : sort de la boucle.
- `continue` : passe à l’itération suivante.
- `else` : s’exécute **si la boucle s’est terminée sans `break`**.

```python
for n in [4, 6, 8]:
    if n % 2 == 1:
        print("impair trouvé")
        break
else:
    print("que des pairs")
```

## Pièges courants

- **Boucle infinie** : oublier de modifier la variable testée par `while`.
- **Modifier la liste parcourue** : voir [Listes](/docs/python/structures-de-donnees/listes).
- **Variable de boucle conservée** : après `for i in range(3)`, `i` vaut encore 2.
