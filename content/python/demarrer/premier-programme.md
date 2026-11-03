---
title: Votre premier programme
description: Écrire, enregistrer et exécuter un script Python.
order: 2
---

## Un script, c’est un fichier texte

Créez un fichier `bonjour.py` :

```python
nom = input("Votre prénom ? ")
print(f"Bonjour {nom} !")
```

Exécutez-le depuis un terminal ouvert dans le même dossier :

```bash
python3 bonjour.py
```

## Ce qu’il faut savoir tout de suite

- **L’indentation fait partie de la syntaxe.** Un bloc (après `if`, `for`, `def`…) est délimité par le décalage de ses lignes, de **4 espaces** par convention. Pas d’accolades.
- **Les commentaires** commencent par `#`.
- **Pas de point-virgule** en fin de ligne.
- **Le texte est en UTF-8.** Les accents et émojis fonctionnent dans les chaînes et les noms de fichiers.

```python
# Un bloc se reconnaît à son indentation
age = 20
if age >= 18:
    print("majeur")      # 4 espaces
else:
    print("mineur")
```

## Le point d’entrée `__main__`

Quand un fichier est lancé directement, Python met `__name__` à `"__main__"`. Quand il est *importé*, `__name__` vaut le nom du module. Cela permet d’écrire du code réutilisable **et** exécutable :

```python
def saluer(nom):
    return f"Bonjour {nom} !"

if __name__ == "__main__":
    print(saluer("monde"))
```

## Lire un message d’erreur

Python affiche une *trace* (traceback) : lisez-la **de bas en haut**. La dernière ligne donne le type et la cause ; les lignes au-dessus montrent le chemin pour y arriver.

```text
Traceback (most recent call last):
  File "bonjour.py", line 2, in <module>
    print(f"Bonjour {prenom}")
NameError: name 'prenom' is not defined
```

Ici : on utilise une variable `prenom` jamais définie (faute de frappe sur `nom`).
