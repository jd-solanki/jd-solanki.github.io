---
title: Collection of FastAPI Interview Questions
date: 2023-12-20
---

# {{ $frontmatter.title }}

## Q: What is FastAPI, and how does it differ from other web frameworks in Python?

FastAPI is a modern, high-performance web framework for building APIs with Python 3.7+ based on standard Python type hints. It has quickly gained popularity due to its speed, simplicity, and developer-friendly features. Some of the key features and differences from other web frameworks in FastAPI are:

- **Automatic Documentation**: FastAPI generates interactive API documentation automatically using the OpenAPI standard1.
- **Python Type Hints**: FastAPI uses Python-type hints for automatic data validation, improving code readability and enabling automatic validation of incoming data1.
- **Data Validation**: FastAPI uses Pydantic models for data validation1.
- **Asynchronous Support**: FastAPI fully embraces asynchronous operations, allowing you to use Python’s async and await keywords to write asynchronous endpoints1.
- **Dependency Injection**: FastAPI supports dependency injection, allowing you to declare dependencies for your endpoints1.
- **Security Features**: FastAPI includes various security features out of the box, such as support for OAuth2, JWT (JSON Web Tokens), and automatic validation of request data1.

## Q: Explain dependency injection in FastAPI and its benefits

As the name suggest, dependency injection allow FastAPI route to declare things that is needed to run or enhance the route functionality.

Common uses of dependencies include sharing connections to databases, implementing authorization and authentication, debugging and monitoring, and injecting configuration settings.

A dependency provider is a function or class responsible for supplying dependencies to FastAPI route. FastAPI also support nested or sub dependencies.

Here are some benefits of using Dependency Injection in FastAPI:

- **Isolation of Code**: Dependencies enable the isolation of code by passing them to route, rather than instantiating them directly. This isolation enhances code reusability, maintainability, and testability.
- **Improved Code Readability**: Dependencies make code more readable by encapsulating complex logic and clearly specifying the requirements of dependent functions and classes.
- **Reduced Code Duplication**: Dependencies minimize code duplication by facilitating the sharing of dependencies among different routes.
- **Facilitated Testing**: Dependencies simplify the testing of code by allowing the simulation of dependencies in tests, making it easier to verify the functionality of the code.

## Q: How does FastAPI handle asynchronous programming, and what are the advantages?

FastAPI is designed with built-in support for asynchronous programming. It allows you to use Python's `async` and `await` keywords to write asynchronous endpoints. This is particularly useful for handling I/O-bound tasks and improving the overall responsiveness of your application.

Here are some advantages of asynchronous programming in FastAPI:

- **Efficient Use of Server Resources:** Using async in FastAPI leads to more efficient use of server resources, as the server can handle other tasks while waiting for I/O operations to complete.
- **Faster Response Times:** This efficiency translates into faster response times for applications.
- **Handling Multiple Requests:** By using asynchronous programming, FastAPI is able to handle multiple requests at the same time without blocking. This means the application can continue doing other work while it’s waiting for the response from an external API, leading to more efficient use of resources and faster response times.
- **Well-suited for Real-time Applications:** This asynchronous support is particularly valuable for real-time applications, such as chat applications, IoT devices, or systems that demand rapid data processing.

Overall, the asynchronous capabilities of FastAPI allow developers to create low-latency and scalable web applications that can handle concurrent requests efficiently5.

## Q: Explain the purpose of Pydantic in a FastAPI project

Pydantic is a Python library designed for data validation and parsing. It offers a straightforward way to define data models and ensures that incoming data adheres to those models. This validation and parsing process simplifies the task of guaranteeing that your application receives data in the correct format, promoting robustness and data integrity.

FastAPI seamlessly incorporates Pydantic models to carry out request and response validation, a critical aspect of any API development. This integration equips you with the means to ensure the safety and reliability of API.

## Q: How can you handle authentication and authorization in a FastAPI application

FastAPI provides built-in support for handling user authentication and authorization, using JSON Web Tokens (JWT). This support is implemented through the OAuth2 specification, which is an open standard for authorization. FastAPI also supports OAuth2 scopes, which allow you to limit what each token can do. Moreover, FastAPI provides built in helper dependencies like `OAuth2PasswordRequestForm` to handle authentication seamlessly.

Here are the general steps involved in setting up authentication and authorization in FastAPI:

- **Password Hashing:** Before storing a user’s password in your database, you should hash the password. This adds a layer of security and ensures that user passwords remain confidential.

- **Token Creation:** When a user logs in with their username and password, you should verify their credentials and then create a JWT token that can be used for subsequent requests.

- **Token Verification:** With each request, the user should send their token (usually in the Authorization header). You should verify the token and check if the user is allowed to perform the requested operation.

- **Dependency Injection:** FastAPI uses dependency injection to handle authentication. You can declare dependencies in your path operation functions to enforce that the user must be authenticated to access certain routes.

- **OAuth2 Scopes:** FastAPI allows you to declare scopes in your routes, like Depends(get_current_user, scopes=["items:read"]). Scopes let you protect data and limit what each token can do, providing a way to authorize the user.

## Q: Explain how FastAPI handles background tasks

FastAPI provides a way to run time-consuming tasks asynchronously in the background of a FastAPI web application. These tasks are defined as functions that run after being triggered by the main application.

Here’s how FastAPI handles background tasks:

- **Define a Task Function:** Create a function to be run as the background task. It can be a regular def function or an async def function.

- **Add the Background Task:** Inside your path operation function, pass your task function to the BackgroundTasks object with the method `.add_task()`. This schedules the task to be run in the background after the response is sent.

- **Return a Response:** The path operation function can then return a response to the client. The background task will continue to run in the background.

Here’s a simple example:

```py
from fastapi import BackgroundTasks, FastAPI

app = FastAPI()

def write_notification(email: str, message=""):
    with open("log.txt", mode="w") as email_file:
        content = f"notification for {email}: {message}"
        email_file.write(content)

@app.post("/send-notification/{email}")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_notification, email, message="some notification") // [!code hl]
    return {"message": "Notification sent in the background"}
```

In this example, the `write_notification` function is a task that writes a notification to a file. This task is added to the `background_tasks` in the `send_notification` path operation function. The `send_notification` function then returns a response, and the `write_notification` task continues to run in the background.
