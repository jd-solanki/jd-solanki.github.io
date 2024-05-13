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

### Middleware

#### Custom Middleware

```py
from django.http import HttpRequest

def simple_middleware(get_response):
    def middleware(request: HttpRequest):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        print("In middleware")
        response = get_response(request)
        return response

    return middleware

# Or use a class-based middleware

class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("In middleware")
        response = self.get_response(request)
        return response

# Finally, add the middleware to the `settings.py`
# 📄 settings.py
MIDDLEWARE = [
    # ...
    "app.middleware.SimpleMiddleware",
]
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