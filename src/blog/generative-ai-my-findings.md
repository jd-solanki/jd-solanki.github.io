---
title: Generative AI - My Findings
tag: my-findings, generative ai, ai
---

# {{ $frontmatter.title }}

:::details References

- [Playlist - Foundational Generative AI](https://www.youtube.com/playlist?list=PLmQAMKHKeLZ-iTT-E2kK9uePrJ1Xua9VL)
- [What is Retrieval-Augmented Generation (RAG)?](https://www.youtube.com/watch?v=T-D1OfcDW1M)
- [What are Vector Embeddings?](https://www.youtube.com/watch?v=1EookJWbvQM)
- [LangChain Tutorials](https://www.youtube.com/playlist?list=PLqZXAkvF1bPNQER9mLmDbntNfSpzdDIU5) (_Below is overview videos you shouldn't miss_)
  - [The LangChain Cookbook - Beginner Guide To 7 Essential Concepts](https://www.youtube.com/watch?v=2xxziIWmaSA)
  - [The LangChain Cookbook Part 2 - Beginner Guide To 9 Use Cases](https://www.youtube.com/watch?v=vGP4pQdCocw)
:::

:::details Langchain useful links

- [Concepts](https://python.langchain.com/docs/modules/model_io/concepts)
- [LangChain Crash Course For Beginners](https://www.youtube.com/watch?v=nAmC7SoVLd8)
- [LangChain Expression Language (LCEL) Explained](https://www.youtube.com/watch?v=O0dUOtOIrfs)
- [LangChain Project with explanation of concepts](https://www.youtube.com/watch?v=MoqgmWV1fm8&t=3534s)
:::

:::tip
Watch [this](https://www.youtube.com/watch?v=O0dUOtOIrfs) video on LCEL before starting with Langchain
:::

## 📚 Cheatsheet

### Glossary

<br>

#### General

- AI > Machine Learning > Deep Learning > Generative AI

<br>

#### Prompting

- **Zero Shot Prompting**: No previous data or guidelines given before the prompt.

- **One Shot Prompting**: One piece of data or guideline is given before the prompt.

- **Few Shot Prompting**: Multiple pieces of data or guidelines are given before the prompt.

### Basics

```py
# Imports
from langchain_community.chat_models.ollama import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOllama(model="llama2") # Create language model instance
prompt = ChatPromptTemplate.from_template("Tell me nice story on {topic}") # Create prompt template

chain = prompt | llm | StrOutputParser() # Create chain

response = chain.invoke({"topic": "Space travel"}) # Invoke chain
print(response) # Print response
```

### Prompt Templates

:::info
You can also use [pipeline](https://python.langchain.com/docs/modules/model_io/prompts/pipeline) feature but ATM I'm not aware of its use cases.
:::

```py
from langchain.prompts import PromptTemplate, ChatPromptTemplate, ChatMessagePromptTemplate
from langchain_core.messages import SystemMessage

# `PromptTemplate`
prompt = PromptTemplate(
  input_variables=["country"],
  template="What is the capital of {country}."
)

# `PromptTemplate.from_template`
prompt = PromptTemplate.from_template(
    "What is the capital of {country}."
)

# `ChatPromptTemplate`
# 1. 2-tuple representation of (type, content)
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are world class technical documentation writer."),
    ("user", "{input}")
])
# 2. Using instance of `MessagePromptTemplate` or `BaseMessage`.
prompt = ChatPromptTemplate.from_messages([
    SystemMessage(content="You are world class technical documentation writer."),
    HumanMessagePromptTemplate.from_template("{input}"),
])


# You can invoke the prompt with the following
chain = prompt | llm
chain.invoke({"input": "how can langsmith help with testing?"})

# ---

# `ChatMessagePromptTemplate` - Create `ChatMessage` from template
prompt = "May the {subject} be with you"
chat_message_prompt = ChatMessagePromptTemplate.from_template(
    role="Jedi", template=prompt
)
chat_message_prompt.format(subject="force") # instance of `ChatMessage`
```

#### Partial Prompt Templates

```py
# 1. With strings
prompt = PromptTemplate.from_template("You are expert in {lang}. Help me with {task}.")
prompt_python = prompt.partial(lang="Python")
print(partial_prompt.format(task="Writing retry decorator")) # "You are expert in Python. Help me with Writing retry decorator."
print(partial_prompt.format(task="Debug below query...")) # "You are expert in Python. Help me with Debug below query..."

# 2. With strings +  `partial_variables` parameter
prompt = PromptTemplate(
    template="You are expert in {lang}. Help me with {task}.",
    input_variables=["task"],
    partial_variables={"lang": "python"}
)
print(prompt.format(task="Writing retry decorator")) # "You are expert in Python. Help me with Writing retry decorator."

# 3. With Functions
from datetime import datetime


def _get_datetime():
    now = datetime.now()
    return now.strftime("%m/%d/%Y, %H:%M:%S")

prompt = PromptTemplate(
    template="Tell me a {adjective} joke about the day {date}",
    input_variables=["adjective", "date"],
)
partial_prompt = prompt.partial(date=_get_datetime)
print(partial_prompt.format(adjective="funny")) # "Tell me a funny joke about the day 10/12/2021, 14:30:00"

# 4. With Functions + `partial_variables` parameter
partial_prompt = PromptTemplate(
    template="Tell me a {adjective} joke about the day {date}",
    input_variables=["adjective", "date"],
    partial_variables={"date": _get_datetime}
)
print(partial_prompt.format(adjective="funny")) # "Tell me a funny joke about the day 10/12/2021, 14:30:00"
```

### Chain

<br>

#### Invocation

```py
# 1. Invoke chain to get full response
response = chain.invoke({"topic": "Space travel"})
print(response)

# 2. Stream response in chunks
for chunks in chain.stream({"topic": "Space travel"}):
    print(chunks, end="", flush=True)

# 3. Async stream response in chunks
async for chunks in chain.astream({"topic": "Space travel"}):
    print(chunks, end="", flush=True)
```

### Caching

```py
from langchain.cache import InMemoryCache, SQLiteCache

# 1. In-memory cache
set_llm_cache(InMemoryCache())

# 2. SQLite cache
set_llm_cache(SQLiteCache(database_path=".langchain.db"))

llm.predict("Tell me a joke") # First time so it can take time
llm.predict("Tell me a joke") # Cached response, so it will be faster
```

### Memory

<br>

#### Conversation Buffer

This will store whole the conversation history in memory.

:::warning
It's not recommended for long conversations because as we'll send whole conversation it'll consume more tokens and can be expensive.
:::

```py
from langchain.memory import ConversationBufferMemory


memory = ConversationBufferMemory()
chain = (
    RunnablePassthrough.assign(
        history=RunnableLambda(memory.load_memory_variables) | itemgetter("history")
    )
    | prompt
    | model
)
```

#### Conversation Buffer Window

Only preserves the last `n` messages in memory.

```py
from langchain.memory import ConversationBufferWindowMemory


# Only last 5 messages will be stored in memory
memory = ConversationBufferWindowMemory(k=5)
chain = (
    RunnablePassthrough.assign(
        history=RunnableLambda(memory.load_memory_variables) | itemgetter("history")
    )
    | prompt
    | model
)
```
