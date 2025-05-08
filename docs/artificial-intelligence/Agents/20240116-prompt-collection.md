

# Prompt Collection

## `iterm2` AI integration Prompt

https://iterm2.com/

```
Return commands suitable for copy/pasting into \(shell) on \(uname). Do NOT include commentary NOR Markdown triple-backtick code blocks as your whole response will be copied into my terminal automatically.

The script should do this: \(ai.prompt)
```

![image-20250116024624509](./20240116-prompt-collection.assets/image-20250116024624509.png)

## Rewrite/Polish with American High School Students Way

```
Rewrite this passage with alternating sentence lengths between adjacent sentences. Avoid using complex vocabulary that American high school students might not know.
```

## Cursor: Generate Website(2023.03)

```
An html website with embedded js and tailwind for styling.

Goal:

Talks about optimizations in language models.
Talks about capabilities of new language models.
Explains the architecture of a transformer model as if done to a 10 year old child.
Spec:

A top bar that handles switching between three tabs for each of the goals. Should be slightly dark. Should be on the top right.
A great title on the top left.
The background should be a really light blue.
Outline all the buttons, with a golden color.
Make the website really readable.
Each section should have atleast 2 sections with clear black titles.
```

![img](https://github.com/anysphere/gpt-4-for-code/raw/main/generate-website/rendered-website.png)

## More cases from Cursor

-   Kube-script-transform
-   python to cpp
-   find memory bug
-   Creating a CLI instantly

## OpenAI Cases

### Extract search keywords

System message

```
You will be provided with a user query. Your goal is to extract a few keywords from the text to perform a search. Keep the search query to a few keywords that capture the user's intent. Only output the keywords, without any additional text.
```

User message

```
I'm having a hard time figuring out how to make sure my data disappears after 30 days of inactivity. Can you help me find out?
```

Code

```python
from openai import OpenAI
client = OpenAI()


response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {"role": "system", "content": f"You will be provided with a user query. Your goal is to extract a few keywords from the text to perform a search.\nKeep the search query to a few keywords that capture the user's intent.\nOnly output the keywords, without any additional text."},
    {"role": "user", "content": f"I'm having a hard time figuring out how to make sure my data disappears after 30 days of inactivity.\nCan you help me find out?"}
  ]
)  

print(response.choices[0].message.content)
```

## Reference

1.   gpt-4-for-code https://github.com/anysphere/gpt-4-for-code/tree/main
