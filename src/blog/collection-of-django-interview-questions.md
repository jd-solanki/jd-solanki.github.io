---
title: Collection of Django Interview Questions
date: 2023-12-31
---

# {{ $frontmatter.title }}

## Q: Does django have MVC architecture?

Unlike other popular web frameworks such as Ruby on Rails, Django does not have a strict Model-View-Controller (MVC) architecture. Instead, Django uses a Model-View-Template (MVT) architecture, which is a variation of MVC. In this architecture, the controller is replaced by the template, which is a layer between the view and the user. The template is responsible for rendering the view and displaying it to the user.

Read more on this in [this](https://python.plainenglish.io/mvt-architecture-in-django-introduction-and-comparison-with-mvc-37cd617b542e) detailed article.

## Q: Explain the Django project structure

Django uses a specific structure to organize different parts of a web application. Here's a brief overview:

1. **manage.py**: This is a command-line utility that lets you interact with your Django project in various ways, such as starting a development server, interacting with databases, and creating new application components.

2. ****init**.py**: This empty file is required for Python to recognize the directory as a package.

3. **settings.py**: This file contains all the configuration of your Django project.

4. **urls.py**: This file is responsible for mapping the URLs of your website to the views.

5. **wsgi.py**: This file is used to help your Django application communicate with the webserver.

6. **app/**: Each Django project can contain multiple apps, and each app serves a specific function within the overall project. Each app has its own directory and contains models (models.py), views (views.py), and templates (templates/), among other things.

    Below are the possible files you might find in a Django app directory:

    - `init.py`: This empty file is required for Python to recognize the directory as a package.

    - `admin.py`: This file is used to define the admin interface for the app.

    - `apps.py`: This file is used to configure the Django app.

    - `migrations/`: This directory stores migrations files, which Django uses to propagate changes you make to your models (adding a field, deleting a model, etc.) into the database schema.

    - `models.py`: This file defines the data models. Each model typically corresponds to a single database table.

    - `tests.py`: This file is used to write tests for the app.

    - `views.py`: This file contains the logic responsible for processing user requests and returning responses.

    - `urls.py`: This file is responsible for mapping the URLs of your website to the views.

    - `forms.py`: This file is used to define forms (optional).

    - `static/`: This directory is used to store static files like CSS, JavaScript, images, etc (optional).

    - `templates/`: This directory is used to store HTML templates (optional).

## Q: How does Django handle migrations, and why are they important?

Django handles migrations through a built-in framework that manages changes to your database schema. Here's how it works:

1. **Migrations Framework**: Django's migrations framework is a way of propagating changes you make to your models (like adding a field or deleting a model) into your database schema.

2. **Commands**: Django provides several commands to interact with migrations and handle database schema. These include `migrate` (for applying and unapplying migrations), `makemigrations` (for creating new migrations based on model changes), `sqlmigrate` (for displaying the SQL statements for a migration), and `showmigrations` (for listing a project’s migrations and their status).

3. **Version Control**: You can think of migrations as a version control system for your database schema. `makemigrations` is responsible for packaging up your model changes into individual migration files (analogous to commits), and `migrate` is responsible for applying those to your database.

4. **Consistency**: Migrations will run the same way on the same dataset and produce consistent results, meaning that what you see in development and staging is, under the same circumstances, exactly what will happen in production.

Migrations are important for several reasons:

- **Database Schema Changes**: They allow you to make changes to your database schema over time while preserving existing data.

- **Version Control**: They provide a structured and efficient way to evolve your data model, while preserving existing data and maintaining a version history of the schema alterations.

- **Consistency**: They ensure that changes are applied consistently across all environments (development, staging, production).

- **Collaboration**: They make it easier to collaborate with others, as each developer can apply the same set of database schema changes.

## Q: Explain the Django middleware

Django middleware is a framework of hooks into Django’s request/response processing. It's a light, low-level “plugin” system for globally altering Django’s input or output. Each middleware component is responsible for doing some specific function.

Here's a brief overview of how Django middleware works:

1. **Initialization**: When the web server starts, Django initializes your middleware with only the `get_response` argument. This is a one-time configuration and initialization.

2. **Request Processing**: For each request, the middleware is called before the view (and later middleware) are called. This allows the middleware to execute code for each request before the view is called.

3. **Response Processing**: After the view is called, the middleware can also execute code for each request/response. This allows the middleware to execute code after the view is called.

4. **Asynchronous Support**: Middleware can either support only synchronous Python (the default), only asynchronous Python, or both.

Middleware can live anywhere on your Python path. Django provides various built-in middleware and also allows you to write your own middleware. Some of the built-in middleware include `AuthenticationMiddleware`, `SessionMiddleware`, `CommonMiddleware`, and more.

Remember, the order of MIDDLEWARE is important because some middleware depend on other middleware. For example, `AuthenticationMiddleware` stores the authenticated user in the session, so it must run after the session middleware.

## Q: How does Django handle user authentication and authorization?

Django provides a built-in system for user authentication and authorization. Here's how it works:

1. **Authentication**: Django's authentication system verifies a user's identity. It handles user accounts, groups, permissions, and cookie-based user sessions.

2. **Authorization**: Once a user is authenticated, Django's authorization system determines what actions the authenticated user is allowed to perform.

Here are the key components of Django's authentication and authorization system:

- **Users**: Django comes with a user model that includes fields like username, password, email, first_name, last_name, and more.

- **Groups**: Groups are a way to categorize users so you can apply permissions to multiple users at once.

- **Permissions**: Permissions are binary (yes/no) flags that designate whether a user may perform a certain task.

- **Password Management**: Django provides a flexible password storage system and uses PBKDF2 by default.

- **Forms and Views**: Django provides built-in views and forms for user registration, login, and logout.

Django's authentication system is very generic and doesn't provide some features commonly found in web authentication systems. Solutions for some of these common problems have been implemented in third-party packages:

- Password strength checking
- Throttling of login attempts
- Authentication against third-parties (OAuth, for example)
- Object-level permissions

## Q: What are Django signals, and how do they work?

Django signals are a way of sending and receiving messages between different components of your Django app in an asynchronous and decoupled manner. They allow certain senders to notify a set of receivers when specific actions have occurred. They’re especially useful when many pieces of code may be interested in the same events.

Here’s how Django signals work:

- **Define a Receiver Function:** First, you need to define a receiver function. A receiver can be any Python function or method3. This function takes a sender argument, along with wildcard keyword arguments (**kwargs); all signal handlers must take these arguments.

- **Connect the Receiver:** To receive a signal, register a receiver function using the Signal.connect() method3. The receiver function is called when the signal is sent3. All of the signal’s receiver functions are called one at a time, in the order they were registered.

- **Send a Signal:** Django’s built-in signals let user code get notified of certain actions. You can also define and send your own custom signals.

Common example you might use is performing some action after a model instance is saved. For example, you might want to send an email notification to the user after they register on your website. You can do this by connecting a receiver function to the `post_save` signal of the `User` model.

## Q: Discuss the Django template language

Django provides a powerful template language that allows you to define the presentation of your website. It's a simple yet powerful language that allows you to define variables, filters, tags, and more. Here's a brief overview of how it works:

- **Variables**: Variables are surrounded by double curly braces, like {{ variable }}. When the template engine encounters a variable, it evaluates that variable and replaces it with the result.

- **Filters**: Filters transform the values of variables. They're applied to a variable using the pipe character, like {{ variable|filter }}. Filters can be chained together, like {{ variable|filter1|filter2 }}.

- **Tags**: Tags create the logic and control flow for your template. They're surrounded by curly braces and percent signs, like {% tag %}. Tags can accept arguments and can also be nested.

- **Comments**: Comments are surrounded by curly braces and hash marks, like {# comment #}. They're ignored by the template engine.

- **Template Inheritance**: Template inheritance allows you to build a base “skeleton” template that contains all the common elements of your site and defines blocks that child templates can override.

- **Built-in Tags and Filters**: Django provides a number of built-in tags and filters that you can use in your templates.

## Q: Explain the Django ORM

Django’s Object-Relational Mapper (ORM) is a powerful feature of the Django web framework that allows developers to interact with their database, like a bridge between Python and databases1. It allows you to use Python to create, retrieve, update, and delete records in your database, abstracting the SQL commands.

Here are some key points about Django ORM:

- **Object-Relational Mapping (ORM):** This is a technique that connects the rich functionality of a high-level programming language and the robust performance of a relational database. You can manipulate database records using Python objects.
- **Database Support:** Django ORM allows you to use the same Python API to interact with various relational databases including PostgreSQL, MySQL, Oracle, and SQLite.
- **Model:** In Django, a model is a Python class that inherits from the django.db.models.Model class, and each attribute of the class represents a field in the database.
- **QuerySet:** This is the primary source of data retrieval in Django. It’s a list of objects of a given model. QuerySets allow you to read the data from the database, filter it and order it.
- **CRUD Operations:** Django ORM allows you to perform all CRUD (Create, Retrieve, Update, Delete) operations.


## Q: Explain Django's Views and different ways to define them

In Django, views are responsible for processing user requests and returning responses. These responses can be HTML content, JSON data, or any other type of data. There are two common ways to define views in Django:
- Function-Based Views (FBVs)
- Class-Based Views (CBVs).

<br />

#### Function-Based Views (FBVs)

These are written using a function in Python which receives an HttpRequest object as an argument and returns an HttpResponse Object. Here's an example of a function-based view:

```python
from django.http import HttpResponse, HttpRequest
import datetime

def my_view(request: HttpRequest):
    now = datetime.datetime.now()
    html = "Time is {}".format(now)
    return HttpResponse(html)
```

In this example, `my_view` is the view function. Each view function takes an `HttpRequest` object as its first parameter, which is typically named `request`. The view returns an `HttpResponse` object that contains the generated response.

<br />

#### Class-Based Views (CBVs)

These are written as classes and provide a way to structure your views and reuse code by harnessing inheritance and mixins. They are particularly useful when you want to provide a similar view for handling different models. Here's an example of a class-based view:

```python
from django.views.generic import ListView
from .models import Application

class InvoicesList(ListView):
    model = Application
    template_name = "invoices.html"
```

In this example, `InvoicesList` is a class-based view that inherits from Django's `ListView`. It's used to display a list of all `Invoice` objects.
