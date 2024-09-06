---
title: Python Logging
tag: python, logging
date: 2024-08-06
---

# {{ $frontmatter.title }}

## Basic Logging

Logging demonstrated below is fine for single module/file logging. But, for larger projects, it's recommended that you create a logger object like in next section.

:::details Resources

- [YouTube Video - Python Tutorial: Logging Basics - Logging to Files, Setting Levels, and Formatting](https://www.youtube.com/watch?v=-ARI4Cz-awo)
:::

## 📚 Cheatsheet

- 5 levels of logging in Python:
  - `DEBUG`: Detailed information, typically of interest only when diagnosing problems.
  - `INFO`: Confirmation that things are working as expected.
  - `WARNING`: An indication that something unexpected happened, or indicative of some problem in the near future (e.g. ‘disk space low’). The software is still working as expected.
  - `ERROR`: Due to a more serious problem, the software has not been able to perform some function.
  - `CRITICAL`: A serious error, indicating that the program itself may be unable to continue running.
- Default logging level is `WARNING`. So, levels having less severity than `WARNING` won't show up.

```py
import logging

logging.debug('This is a debug message') # This won't show up because default level is WARNING
logging.info('This is an info message') # This won't show up because default level is WARNING
logging.warning('This is a warning message') # This will show up
logging.error('This is an error message') # This will show up
logging.critical('This is a critical message') # This will show up

logging.basicConfig(level=logging.DEBUG) # This will set the logging level to DEBUG
logging.debug('This is a debug message') # This will show up now because level is set to DEBUG
```

- By default, logs are written to your console. You can also write logs to a file.

```py
logging.basicConfig(filename='logs/app.log', level=logging.DEBUG)
logging.debug('This is a debug message') # This will be written to logs/app
# Content of log file => DEBUG:root:This is a debug message
# Default format of logging => LEVEL:LOGGER_NAME:MESSAGE

logging.basicConfig(filename='logs/app.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s') # Use format param to change the format of log message

logging.debug('This is a debug message')
# Content of log file => 2024-08-06 12:00:00,000 - DEBUG - This is a debug message
```

## Advanced Logging

- When we log using `logging` it uses root logger and that's the reason why we get `root` in the log message. When using multiple modules/files, if we don't create seperate logger objects, we might get some unwanted behavior. For example, When you import a module and that module configures logging, it will affect the logging configuration of your main program.

```py
import logging

# First get the logger object
# If you're running script then __name__ will be __main__.
# If you're importing this module then __name__ will be the name of the module/file. E.g. If it's in app.py then __name__ will be "app"
logger = logging.getLogger(__name__)

# Now, you can configure & use this logger object
logger.setLevel(logging.DEBUG)

# Let's save logs to file
# First create a file handler
file_handler = logging.FileHandler('logs/app.log')
file_handler.setLevel(logging.ERROR) # This will only log messages with level ERROR or higher

# Let's customize the format of log message for file handler
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter) # Here, we're setting the format of log message for file handler

# Finally, add the file handler to logger object
logger.addHandler(file_handler)

logger.debug('This is a debug message') # This won't show up in file because level is set to ERROR
logger.error('This is an error message') # This will show up in file

# Now, Assume you want to log to console as well along with file
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter) # We can reuse our formatter

# Notice, We haven't set level for stream handler. So, it will fallback to main logger's level which is DEBUG

# Finally, add the stream handler to logger object
logger.addHandler(stream_handler)

logger.debug('This is a debug message') # This will show up in console but not in file
logger.error('This is an error message') # This will show up in both console and file
```

<!-- ## ✨ Tips -->

<!-- ## 📝 Snippets -->

## How I setup logger in large projects

Here's how I setup my logger in large projects. I also create multiple loggers like app logger that just logs execution of application and mail logger that logs all the emails related stuff.

I prefer creating separate directory for all loggers.

```
|- src/
  |- loggers/
    |- app.py
    |- mail.py
```

In production you will preserve logs for 60-90 days and delete old logs. Python logging module provides `RotatingFileHandler` which can be used to rotate logs based on size or time.

```py
# app.py
from paths import project_root_path
from core.settings import settings # I use pydantic settings

app_logger = logging.getLogger(__name__) # Logger name will be "app" because we're using __name__

# Generate log file name
file_name = Path(__file__).stem
logger_file_name = (
    project_root_path / "logs" / file_name / f"{file_name}.log"
) # This means our logs will be saved in <root>/logs/app/app.log

# create handler
handler = TimedRotatingFileHandler(
    filename=logger_file_name,
    when="D",
    interval=1,
    backupCount=90 if settings.ENVIRONMENT == "production" else 1, # Keep logs for 90 days in production and 1 day in development
    encoding="utf-8",
    delay=False,
)

# create formatter and add to handler
formatter = logging.Formatter(
    fmt="%(asctime)s - %(levelname)s - %(message)s"
)
handler.setFormatter(formatter)

# add the handler to logger
app_logger.addHandler(handler)

# set the logging level
app_logger.setLevel(logging.INFO)
```

Now, you can use this logger in your application.

```py
from loggers.app import app_logger

app_logger.info("Application started")
```

Cheers 🥂, We have logger that logs to file and most importantly, it preserves logs for 90 days in production and delete old logs.