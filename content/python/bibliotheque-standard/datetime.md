---
title: datetime
description: Dates, heures, durées, fuseaux horaires et formatage.
order: 4
---

## Description

```python
from datetime import date, datetime, time, timedelta, timezone, UTC
```

| Classe | Contenu |
| --- | --- |
| `date` | année, mois, jour |
| `time` | heure, minute, seconde |
| `datetime` | date **et** heure |
| `timedelta` | une durée |

## Créer

```python
date(2026, 11, 3)
datetime(2026, 11, 3, 15, 30)
date.today()
datetime.now()                  # heure locale, SANS fuseau (« naïf »)
datetime.now(UTC)               # heure UTC avec fuseau (« aware »)
```

## Calculs

```python
d = date(2026, 11, 3)
d + timedelta(days=30)                       # date(2026, 12, 3)
date(2026, 12, 25) - d                       # timedelta(days=52)
(date(2026, 12, 25) - d).days                # 52
d.weekday()                                  # 0 = lundi … 6 = dimanche
```

## Formater et analyser

```python
dt = datetime(2026, 11, 3, 15, 30)
dt.strftime("%d/%m/%Y %H:%M")                # '03/11/2026 15:30'
dt.isoformat()                               # '2026-11-03T15:30:00'

datetime.strptime("03/11/2026", "%d/%m/%Y")  # texte → datetime
datetime.fromisoformat("2026-11-03T15:30:00")
```

| Code | Sens | Code | Sens |
| --- | --- | --- | --- |
| `%Y` | année (4 chiffres) | `%H` | heure 00–23 |
| `%m` | mois 01–12 | `%M` | minutes |
| `%d` | jour 01–31 | `%S` | secondes |
| `%A` | nom du jour | `%B` | nom du mois |

## Fuseaux horaires

Utilisez `zoneinfo` (bibliothèque standard) :

```python
from zoneinfo import ZoneInfo

tana = ZoneInfo("Indian/Antananarivo")
maintenant = datetime.now(tana)
maintenant.astimezone(ZoneInfo("Europe/Paris"))     # convertir
```

## Pièges courants

- **Comparer ou soustraire un datetime naïf et un datetime « aware »** lève `TypeError`.
- **`datetime.utcnow()` est déprécié** (depuis 3.12) : il renvoie un datetime *naïf*. Écrivez `datetime.now(UTC)`.
- **Stockez en UTC**, convertissez en heure locale uniquement à l’affichage.
- `strptime` est strict : le format doit correspondre exactement au texte.
