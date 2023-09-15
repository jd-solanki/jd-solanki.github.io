# SQLAlchemy

<br>

### Django like [signals](https://docs.djangoproject.com/en/4.2/topics/signals/) in SQLAlchemy

```py
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)

# Define the function to run after insertion
def after_insert_listener(mapper, connection, target):
    # Your custom logic here
    print("New user added to the DB:", target)

# Attach the event listener to the after_insert event
listens_for(User, 'after_insert', after_insert_listener)
```
