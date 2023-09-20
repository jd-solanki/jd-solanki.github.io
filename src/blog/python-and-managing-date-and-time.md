---
title: Python and Managing Date and Time
tags: [python]
---

# {{ $frontmatter.title }}

<br>

:::info Naive vs timezone aware datetime
Naive datetime doesn't have any timezone information. Aware datetime has timezone information.
:::

## `datetime.date`

```py
import datetime

d = datetime.date(2023, 9, 20) # (year, month, date) 20th September 2023
# ❗ Leading zero may give error: datetime.date(2023, 09, 20) => Error

# get today
today = datetime.date.today()
print(today) # 2023-09-20
print(today.year) # 2023
print(today.month) # 9
print(today.day) # 20

'''
Week day

(on 2023-09-20 it's Wednesday)

`weekday` => Monday = 0, Sunday = 6
`isoweekday` =>  Monday = 1, Sunday = 7
'''
print(today.weekday()) # 2
print(today.isoweekday()) # 3

```

## `datetime.timedelta`

```py
import datetime

today = datetime.date.today()
delta_1_day = datetime.timedelta(days=1)

print(today + delta_1_day) # 2023-09-21

'''
date - date = timedelta
date + timedelta = date
date - timedelta = date
timedelta + timedelta = timedelta
'''

my_birthday_next_year = datetime.date(2024, 1, 28)
delta_till_birthday = my_birthday_next_year - today
print(delta_till_birthday) # 130 days, 0:00:00 (130 days left in my birthday)
print(delta_till_birthday.days) # 130
```

## `datetime.time`

> _Less used compared to others_

```py
import datetime

t = datetime.time(9, 30, 45, 100000)
print(t.hour) # 9
```

## `datetime.datetime`

```py
import datetime

dt = datetime.datetime(2023, 9, 20, 9, 30, 45, 100000)

print(dt) # 2023-09-20 09:30:45.100000
print(dt.date()) # 2023-09-20
print(dt.time()) # 09:30:45.100000
print(dt.year) # 2023

delta_1_day = datetime.timedelta(days=1)
print(dt + delta_1_day) # 2023-09-21 09:30:45.100000

delta_12_hours = datetime.timedelta(hours=12)
print(dt + delta_12_hours) # 2023-09-20 21:30:45.100000
```

#### `today` vs `now` vs `utcnow`

```py
import datetime

dt_today = datetime.datetime.today()
dt_now = datetime.datetime.now()
dt_utcnow = datetime.datetime.utcnow()



print(dt_today)  # 2023-09-20 09:04:31.564997
print(dt_now)    # 2023-09-20 09:04:31.565011
print(dt_utcnow) # 2023-09-20 03:34:31.565013

'''
`dt_today` & `dt_now` are almost same because execute at same time.
The difference: `.today()` returns current local datetime with timezone set to `None` whereas `.now()` allows us to pass timezone.
Hence, if you leave timezone empty for both they will be same.
'''

# `dt_utcnow` is still naive datetime. It doesn't have timezone information.
```

#### `pytz` and timezone aware datetime

:::info
`pytz` is third-party module that is recommend by python itself in their docs.
:::

```py
import datetime

import pytz

dt = datetime.datetime(2023, 9, 20, 9, 30, 45, 100000, tzinfo=pytz.UTC)
print(dt) # 2023-09-20 09:30:45.100000+00:00

# Current UTC time that is timezone aware
# WIP....
```

<br>

---

<br>

:::details Credits

- [Corey Schafer - Datetime Module - How to work with Dates, Times, Timedeltas, and Timezones](https://www.youtube.com/watch?v=eirjjyP2qcQ)
:::
