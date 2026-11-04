---
title: Portée des variables
description: Comprendre où une variable existe et comment Python résout les noms.
order: 5
---

> Si vous avez du mal a comprendre c'est quoi une fonction, je vous conseil de lire le doc [ici](/docs/python/fonctions/definir-fonctions) sinon, vous pouvez continuer

## Qu’est-ce que la portée ?

La **portée** (*scope*) est la zone du programme où un nom de variable est accessible. Elle détermine dans quel espace de noms (*namespace*) Python cherche une variable lorsqu’on l’utilise.

Chaque appel de fonction crée un nouvel espace de noms local, détruit à la fin de l’appel. En revanche, les blocs `if`, `for`, `while` ou `try` **ne créent pas de portée** en Python :

```python
for i in range(3):
    derniere = i

print(i, derniere)   # 2 2 : les variables survivent à la boucle
```

Un nom est résolu à l’exécution, mais Python décide dès la compilation s’il est local ou non. C’est ce qui explique l’erreur `UnboundLocalError` vue plus bas.

## Les quatre niveaux : la règle LEGB

Python cherche un nom dans cet ordre, du plus proche au plus général :

| Niveau | Signification | Exemple |
| --- | --- | --- |
| **L**ocal | dans la fonction courante | paramètres, variables affectées dans la fonction |
| **E**nclosing | dans les fonctions englobantes | fonction imbriquée dans une autre |
| **G**lobal | au niveau du module | variable définie hors de toute fonction |
| **B**uilt-in | fourni par Python | `len`, `print`, `range`… |

Dès qu’un nom est trouvé, la recherche s’arrête. Une variable locale peut donc **masquer** une variable globale ou une fonction intégrée.

```python
nom = "globale"

def externe():
    nom = "englobante"

    def interne():
        nom = "locale"
        print(nom)      # locale

    interne()
    print(nom)          # englobante

externe()
print(nom)              # globale
```

## Portée locale

Une variable affectée dans une fonction est **locale par défaut**. Elle n’existe que pendant l’appel et disparaît ensuite. Les paramètres sont eux aussi des variables locales.

```python
def calcul():
    resultat = 42
    return resultat

print(calcul())     # 42
print(resultat)     # NameError : resultat n'existe plus
```

## Portée globale

Les variables définies au niveau du module sont **globales**. Une fonction peut les **lire** sans déclaration particulière :

```python
compteur = 10

def lire():
    return compteur    # lecture d'une globale : autorisé

print(lire())          # 10
```

Mais une **affectation** dans la fonction crée une variable locale, même si un nom identique existe au niveau global :

```python
compteur = 10

def incrementer():
    compteur = compteur + 1   # UnboundLocalError

incrementer()
```

Pour Python, `compteur` est local dans toute la fonction parce qu’il y est affecté. La lecture se fait donc avant que la variable locale ait reçu une valeur.

## Modifier une globale avec `global`

La déclaration `global` indique que les affectations visent le niveau du module :

```python
compteur = 0

def incrementer():
    global compteur
    compteur += 1

incrementer()
print(compteur)    # 1
```

`global` n’est pas nécessaire pour **modifier un objet** global (un `append`, par exemple) : il ne sert qu’à réaffecter le nom.

```python
nombres = []

def ajouter(n):
    nombres.append(n)    # pas besoin de global
```

> **Attention :** `global` rend le code plus difficile à suivre et à tester. Préférez passer les valeurs en paramètres et retourner un résultat. Réservez `global` à des cas très particuliers.

## Portée englobante et closures

Une fonction imbriquée peut lire les variables de la fonction qui la contient. Si elle doit les **réaffecter**, elle utilise `nonlocal` :

```python
def creer_compteur():
    valeur = 0

    def incrementer():
        nonlocal valeur
        valeur += 1
        return valeur

    return incrementer

compteur = creer_compteur()
print(compteur())    # 1
print(compteur())    # 2
```

La fonction interne conserve l’accès à `valeur` après la fin de `creer_compteur()` : c’est une **closure**. `nonlocal` cible la liaison la plus proche dans les fonctions englobantes ; il ne crée pas de nouvelle variable.

```python
def externe():
    def interne():
        nonlocal valeur   # SyntaxError : aucune valeur englobante
        valeur = 1
```

## Portée dans une classe

Le corps d’une classe possède son propre espace de noms, mais les méthodes ne le consultent pas automatiquement. Pour lire un attribut de classe, passez par `self` ou par le nom de la classe :

```python
class Compteur:
    total = 0

    def lire(self):
        return self.total        # ✅

    def lire_classe(self):
        return Compteur.total    # ✅

    def lire_sans_prefixe(self):
        return total             # ❌ NameError
```

Sans préfixe, Python cherche dans la portée locale, puis globale, puis dans les fonctions intégrées — jamais dans le corps de la classe.

## Compréhensions et portée

Depuis Python 3, une compréhension de liste, d’ensemble ou de dictionnaire a sa propre portée. Sa variable ne fuit pas dans le code environnant :

```python
carres = [x * x for x in range(3)]
print(carres)    # [0, 1, 4]
print(x)         # NameError
```

## Bonnes pratiques

- Gardez les fonctions courtes et faites circuler les données par les **paramètres** et les **valeurs de retour**.
- Évitez `global` ; utilisez `nonlocal` uniquement pour un état interne à une closure.
- Ne réutilisez pas un nom global pour une variable locale : le masquage rend la lecture trompeuse.
- Évitez d’écraser des noms intégrés (`sum`, `list`, `id`…).

## Pièges courants

- **`UnboundLocalError`** : une affectation quelque part dans la fonction suffit à rendre le nom local partout. Déclarez `global`/`nonlocal`, ou renommez la variable.
- **Les blocs ne créent pas de portée** : une variable de boucle reste accessible après le `for`.
- **`global` doit précéder l’utilisation** du nom dans la fonction, sinon Python lève une `SyntaxError`.
- **Mutation ≠ réaffectation** : modifier une liste globale ne demande pas `global`, mais `ma_liste = []` en demande un.
- **Compréhension** : la variable de boucle n’existe pas en dehors, sauf avec l’opérateur `:=` qui écrit dans la portée englobante.
