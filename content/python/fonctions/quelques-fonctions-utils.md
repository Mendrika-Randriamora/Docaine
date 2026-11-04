---
title: Quelques fonctions utils
description: Annuaire des fonctions les plus utilisées dans python.
order: 5
---

## Input

La fonction `input()` lit une ligne saisie dans le terminal et la renvoie sous forme de chaîne de caractères. Le programme attend que l'utilisateur valide avec Entrée.

- `prompt` (optionnel) : texte affiché avant la lecture, sans saut de ligne. C'est le message qui indique à l'utilisateur quoi saisir.

Elle renvoie la ligne saisie sans le `\n` final. Si le flux d'entrée est fermé (Ctrl+D, fin de fichier) avant toute saisie, elle lève `EOFError`.

```python
name = input("Entrer votre nom : ")

print(f"Bonjour, {name}")
```

> **Attention :** `input()` renvoie toujours une chaîne de caractères. Pensez à convertir la valeur (`int()`, `float()`…) si vous attendez un nombre.

## Enumerate

`enumerate()` parcourt un itérable en fournissant en même temps l'indice et la valeur. Elle évite d'écrire `for i in range(len(...))` pour accéder à la position des éléments.

- `iterable` : tout objet parcourable (liste, tuple, chaîne, générateur, fichier…).
- `start` (optionnel) : entier de départ des indices, `0` par défaut.

Elle renvoie un itérateur de tuples `(indice, valeur)`, consommé une seule fois et produit au fur et à mesure : les éléments ne sont pas copiés.

```python
fruits = ["pomme", "banane", "cerise"]

for i, fruit in enumerate(fruits, start=1):
    print(i, fruit)
```

> **Attention :** `enumerate()` renvoie un itérateur, pas une liste. Affichez `list(enumerate(fruits))` pour voir son contenu.

## Zip

`zip()` combine plusieurs itérables en un seul en regroupant dans des tuples les éléments de même position.

- `*iterables` : un ou plusieurs itérables à parcourir en parallèle.
- `strict` (Python 3.10+, optionnel) : si `True`, lève `ValueError` lorsque les itérables n'ont pas la même longueur. Par défaut `False`, le parcours s'arrête au plus court.

Elle renvoie un itérateur de tuples `(a, b, …)`. Sans argument, elle renvoie un itérateur vide. Combinée à `*`, elle permet aussi de transposer des paires : `zip(*paires)`.

```python
noms = ["Ada", "Alan", "Grace"]
ages = [36, 41, 45]

for nom, age in zip(noms, ages):
    print(f"{nom} a {age} ans")
```

> **Attention :** sans `strict=True`, les éléments en trop du plus long itérable sont ignorés silencieusement. Utilisez `strict=True` pour détecter une différence de longueur.

## Range

`range()` produit une suite de nombres entiers régulièrement espacés, sans créer toutes les valeurs en mémoire.

- `start` (optionnel) : première valeur, `0` par défaut.
- `stop` (obligatoire) : borne d'arrêt, **exclue**.
- `step` (optionnel) : pas entre deux valeurs, `1` par défaut ; ne peut pas être `0`.

`range(stop)` équivaut à `range(0, stop)`. Elle renvoie un objet `range` immuable, qui est une vraie séquence : `len()`, l'indexation et les tranches fonctionnent, et le test d'appartenance `in` est efficace. Pour obtenir une liste, utilisez `list(range(...))`. Un `step` négatif parcourt à l'envers.

```python
for i in range(1, 10, 2):
    print(i)

print(list(range(5)))       # [0, 1, 2, 3, 4]
print(list(range(3, 0, -1)))  # [3, 2, 1]
```

> **Attention :** la borne `stop` n'est jamais incluse. `range(1, 5)` produit `1, 2, 3, 4`.

## Open

`open()` ouvre un fichier et renvoie un objet fichier permettant de le lire ou de l'écrire. Il faut toujours le fermer ; le plus sûr est d'utiliser un bloc `with`, qui le ferme automatiquement, même en cas d'erreur.

- `file` : chemin du fichier (chaîne ou objet `os.PathLike`) ou descripteur de fichier entier.
- `mode` (optionnel) : `"r"` lecture (défaut), `"w"` écriture avec écrasement, `"a"` ajout à la fin, `"x"` création exclusive. Ajoutez `"b"` pour le mode binaire ou `"t"` pour le mode texte (défaut), et `"+"` pour autoriser lecture et écriture, par exemple `"rb"` ou `"w+"`.
- `buffering` (optionnel) : `-1` pour la taille par défaut, `0` pour désactiver le tampon (binaire seulement), `1` pour un tampon par ligne (texte seulement), ou une valeur supérieure à `1` pour fixer la taille du tampon.
- `encoding` (optionnel) : encodage utilisé en mode texte, par exemple `"utf-8"`. Sans valeur, il dépend du système.
- `errors` (optionnel) : comportement face aux erreurs d'encodage ou de décodage : `"strict"` (défaut), `"ignore"`, `"replace"`, etc. Utilisable en mode texte.
- `newline` (optionnel) : contrôle la traduction des fins de ligne en mode texte (`None` pour le mode universel, `""`, `"\n"` ou `"\r\n"`).
- `closefd` (optionnel) : si `False`, le descripteur de fichier sous-jacent n'est pas fermé avec l'objet. À réserver au cas où `file` est un descripteur.
- `opener` (optionnel) : fonction personnalisée qui renvoie un descripteur de fichier au lieu d'utiliser l'ouverture standard.

Elle renvoie un objet fichier. En mode texte, les données lues sont des `str` ; en mode binaire (`"b"`), des `bytes`. En lecture, un fichier absent lève `FileNotFoundError`. En mode `"x"`, un fichier déjà existant lève `FileExistsError`.

```python
with open("notes.txt", "w", encoding="utf-8") as fichier:
    fichier.write("Bonjour\n")

with open("notes.txt", encoding="utf-8") as fichier:
    print(fichier.read())
```

> **Attention :** sans `with`, vous devez appeler `fichier.close()` vous-même, y compris en cas d'erreur. Précisez `encoding="utf-8"` pour obtenir le même comportement sur tous les systèmes.
