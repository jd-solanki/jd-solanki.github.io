# Prompts

## Resources

- [OpenAI guide](https://platform.openai.com/docs/guides/prompt-engineering)

:::details Summary of OpenAI guide by SuperhumanAI newsletter

<br>

#### Strategy 1 — Write clear instructions:

- Include details in your prompt to get more relevant answers

- Specify the steps required to complete a task

- Provide examples

####  Strategy 2 — Provide reference text:

- Instruct ChatGPT to answer using a reference text, such as a link to a PDF or a website

- Instruct ChatGPT to answer with citations from a reference text

#### Strategy 3 — Split complex tasks into simpler subtasks:

- Since there is a limit on how much text you can insert into ChatGPT, summarize long documents piece by piece to stay within the limit

- For prompts that involve multiple instructions, try breaking the prompts into smaller chunks

####  Strategy 4 — Give ChatGPT some time to think:

- Instruct ChatGPT to work out its own solution before rushing to a conclusion

- Ask ChatGPT if it missed anything on previous passes

#### Strategy 5 — Use external tools for coding tasks

- Use code execution to perform more accurate calculations or call external APIs

- Give ChatGPT access to specific functions

#### Strategy 6 — Test changes systematically:

- Evaluate ChatGPT’s outputs with reference to gold-standard answers
:::

## Prompts

### Marketing

- Marketing action where you must grab your audience’s attention and convince them to take action

    ```md
    Craft a persuasive and succinct messaging strategy that highlights the key selling points of {product/service} and encourages customers to buy. Keep the content persuasive and to the point.
    ```

### Writing

- Writing about technical concepts for a technical & non-technical audiences

    ```md
    I need to explain {technical_concept} to a developer who has a basic understanding of programming but may be unfamiliar with the specific concept I'm addressing. The explanation should be:

    1. Clear, concise, and easy to understand, avoiding technical jargon or complex language that might confuse someone who isn't an expert in the field.
    Accompanied by two examples:
    a. A simple and minimal example that demonstrates the concept clearly without any extra content or complexities.
    b. A real-world example that is still minimalistic but illustrates how the concept can be applied in practical scenarios. Ensure that this example is relevant to common development tasks and avoids unnecessary details.
    3. Emphasize the practical application of the concept in everyday programming tasks, helping the developer to see the direct relevance and utility of the concept.
    4. Where applicable, offer brief comparisons with similar concepts to provide context and deepen understanding, while keeping these comparisons concise and to the point.
    ```

<br />

👀 more to come...
