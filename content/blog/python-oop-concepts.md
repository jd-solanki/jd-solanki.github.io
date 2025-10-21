---
title: Python OOP Concepts
description: An introduction to Object-Oriented Programming (OOP) concepts in Python, including Inheritance, Encapsulation, and Polymorphism.
date: 2023-12-20
---

## 👨‍👦 Inheritance

Inheritance is a way of creating a new class by extending a existing class without modifying it. The newly formed class is a derived class (or child class). Similarly, the existing class is a base class (or parent class).

```python
class Person:
    def read(self):
        print("I can read")

class Student(Person): // [!code hl]
    pass

s = Student()

# Student class inherited the read() method from Person class
s.read()

# Output: I can read
```

## 📦 Encapsulation

Encapsulation is used to hide the internal state of an object from the outside, which is known as information hiding. This is achieved by restricting access to certain components of an object, which is typically done using private and public access modifiers.

Consider a class `Employee` in a Human Resources system. The class contains private attributes like `__salary` and `__position`. These are sensitive details that should not be exposed directly.

```py
class Employee:
    def __init__(self, name, position, salary):
        self.__name = name
        self.__position = position
        self.__salary = salary

    def get_salary(self):
        return self.__salary

    def promote(self, new_position, increase):
        self.__position = new_position
        self.__salary += increase
```

Here, encapsulation prevents direct modification of an employee's salary and position. Instead, methods like `get_salary` and `promote` are used to interact with these attributes. This ensures that salary changes are controlled and can include additional logic, like validation or notification.

## 🎭 Polymorphism

Polymorphism lets us define methods in the child class with the same name as defined in their parent class. This concept allows for flexibility and the ability to use different objects interchangeably, even though they may be of different classes.

Imagine a scenario where we have a parent class `Animal` with a method `speak()`. Different child classes (`Dog`, `Cat`) will have their own implementation of `speak()`.

```py
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# Usage
animals = [Dog(), Cat()]
for animal in animals:
    print(animal.speak())
```

Here, when we call `speak()` on a `Dog` or `Cat` object, Python automatically calls the correct method depending on the type of the object. This is polymorphism, the same method name (`speak`) works differently depending on the object it's called on.

### Polymorphism vs Method Overriding vs Method Overloading

Polymorphism allows objects of different classes to respond to the same method call in unique ways, typically implemented through method overriding, where a subclass provides a specific version of a method from its superclass.

Method overloading, creating methods in the same class with the same name but different parameters, isn't supported in Python. Polymorphism and overriding focus on class interactions and hierarchy, while overloading deals with method variations within a class.
