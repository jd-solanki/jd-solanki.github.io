---
title: Python and Managing Date and Time
description: A comprehensive guide to handling date and time in Python using the datetime module.
---

:::note
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

:::note
`pytz` is third-party module that is recommend by python itself in their docs.
:::

```py
import datetime

import pytz

dt = datetime.datetime(2023, 9, 20, 9, 30, 45, 100000, tzinfo=pytz.UTC)
print(dt) # 2023-09-20 09:30:45.100000+00:00

# Current UTC time that is timezone aware
dt_now = datetime.datetime.now(tz=pytz.UTC) # ℹ️ Recommended
print(dt_now) # 2023-09-20 08:49:21.452949+00:00

dt_uctnow = datetime.datetime.utcnow().replace(tzinfo=pytz.UTC)
print(dt_uctnow) # 2023-09-20 08:49:21.453095+00:00

'''
`dt_now` & `dt-utcnow` is identical because both are timezone aware.
`dt_now` is recommended though.
'''

dt_india = dt_now.astimezone(pytz.timezone('Asia/Kolkata'))
print(dt_india) # 2023-09-20 14:22:36.130913+05:30

```

::accordion

::accordion-item{label="Get All Timezones" icon="i-lucide-code"}

```py
for tz in pytz.all_timezones:
    print(tz)
```

::
::

#### How to make naive datetime, timezone aware

Refer to [this](/blog/python-my-findings.html#how-to-make-naive-datetime-timezone-aware) snippet.

:::tip
Use iso format to pass datetime around or for saving. Refer to [this](/blog/python-my-findings.html#tips-date-time-&-timezones) tip.
:::

## Printing datetime & Converting back

- `strftime` => datetime to string
- `strptime` => string to datetime

### Printing or converting datetime to string

You can use `strftime` method to print datetime in any format you want. Check out all [format codes](https://docs.python.org/3/library/datetime.html#strftime-and-strptime-format-codes) with example in official python docs.

```py
import datetime

import pytz

# local time without timezone info
dt_india = datetime.datetime.now(tz=pytz.timezone('Asia/Kolkata'))
print(dt_india.isoformat())

print(dt_india.strftime('%B %d, %Y')) # September 20, 2023
```

### Convert string datetime to datetime object

```py
import datetime

dt_str = 'September 20, 2023'

# Use `strptime` to convert string datetime to datetime object
# Second argument is what format that string is in
dt = datetime.datetime.strptime(dt_str, '%B %d, %Y')
print(dt) # 2023-09-20 00:00:00
```

::accordion

::accordion-item{label=Credits icon="i-lucide-book"}

- [Corey Schafer - Datetime Module - How to work with Dates, Times, Timedeltas, and Timezones](https://www.youtube.com/watch?v=eirjjyP2qcQ)
::
::
