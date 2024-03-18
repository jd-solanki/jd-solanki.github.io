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

## 📚 Cheatsheet

- AI > Machine Learning > Deep Learning > Generative AI

### LangChain Prompt Templates

```py
# `PromptTemplate`
from langchain.prompts import PromptTemplate
prompt_template = PromptTemplate(
  input_variables=["country"],
  template="What is the capital of {country}."
)
prompt_template.format(country="India") # "What is the capital of India."

# `PromptTemplate.from_template`
from langchain.prompts import PromptTemplate

prompt_template = PromptTemplate.from_template(
    "What is the capital of {country}."
)
prompt_template.format(country="India") # "What is the capital of India."
```
