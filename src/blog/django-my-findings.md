---
title: Django - My Findings
tag: my-findings, django
---

# {{ $frontmatter.title }}

## 📚 Cheatsheet

### Views

```py
from django.http import HttpRequest
from django.shortcuts import render

def index(request: HttpRequest):
    print(request.GET) # Query parameters
    request.GET.get("q", "default") # Get query parameter

    print(request.POST) # Form data
    request.POST.get("key", "default") # Get form data

    request.body # Raw data in bytes

    request.FILES # Uploaded files

    request.COOKIES # Cookies

    return render(request, "app/index.html")
```

### Models

<br>

#### Fields

_I recommend directly checking out the [docs](https://docs.djangoproject.com/en/5.0/ref/models/fields) as it's pretty straightforward._

### Templates

```html
<a href="{% url 'app_name:view_name' %}">Link</a>
```

#### Extending Templates

```html
<!-- app/templates/app/base.html -->
<head>
    <title>
        {% block title %}
        Fallback Title
        {% endblock title %} | The Great App
    </title>
</head>
<body>
    {% block content %}
    {% endblock %}
</body>

<!-- index.html -->
{% extends 'app/base.html' %}

<!-- As we didn't provided title block it'll render "Fallback Title" -->

{% block content %}
    <h1>Hello, World!</h1>
{% endblock %}
```

### URLs

```py
# 📄 app/urls.py
from django.urls import path

from .views import details

# Namespace for the app
app_name = "item"

urlpatterns = [
    path("<int:pk>/", details, name="details")
]

# 📄 project/urls.py
from django.urls import path, include

urlpatterns = [
    path("item/", include("item.urls")),
]

# In templates
# {% url 'item:details' pk=1 %}
```

### Commands

```bash
# Create a new project
django-admin startproject <project_name>
django-admin startproject <project_name> . # Create in the current directory

# Create a new app
python manage.py startapp <app_name>

# Run the server
python manage.py runserver

# Create superuser
python manage.py createsuperuser

# Create migrations
python manage.py makemigrations

# Run migrations
python manage.py migrate
```

### ORM

```py
from django.db import models

class Product(models.Model):
    # Fields


# Create
Product.objects.create(title="Denim Jeans", price=1000) # Create a new product

# Read
Product.objects.all() # Get all products
Product.objects.get(id=1) # Get product with id 1
Product.objects.first() # Get the first product
Product.objects.last() # Get the last product
Product.objects.count() # Get the count of products

# Filter
Product.objects.filter(name="Product 1") # Get products with name "Product 1"
Product.objects.exclude(name="Product 1") # Get products without name "Product 1"

# Sort
Product.objects.order_by("price") # Sort by price
Product.objects.order_by("-price") # Sort by price in descending order
```

## ✨ Tips

### Queryset

<br>

#### Use a Model Manager to filter queryset by default in Django

```py
class BookManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted=False)

class Book(models.Model):
    # ...
    deleted = models.BooleanField(default=False)
    objects = BookManager()
```
