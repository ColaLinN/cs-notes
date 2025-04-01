

# Chat Template



https://github.com/openai/openai-python/blob/release-v0.28.0/chatml.md

Traditionally, GPT models consumed unstructured text. ChatGPT models instead expect a structured format, called Chat Markup Language (ChatML for short).

```
[
 {"token": "<|im_start|>"},
 "system\nYou are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-03-01",
 {"token": "<|im_end|>"}, "\n", {"token": "<|im_start|>"},
 "user\nHow are you",
 {"token": "<|im_end|>"}, "\n", {"token": "<|im_start|>"},
 "assistant\nI am doing well!",
 {"token": "<|im_end|>"}, "\n", {"token": "<|im_start|>"},
 "user\nHow are you now?",
 {"token": "<|im_end|>"}, "\n"
]
```

could also represent it in the classic "unsafe raw string" format. However, this format inherently allows injections from user input containing special-token syntax, similar to SQL injections:

```
<|im_start|>system
You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.
Knowledge cutoff: 2021-09-01
Current date: 2023-03-01<|im_end|>
<|im_start|>user
How are you<|im_end|>
<|im_start|>assistant
I am doing well!<|im_end|>
<|im_start|>user
How are you now?<|im_end|>
```



## Reference

1. Chat Templates https://huggingface.co/docs/transformers/main/en/chat_templating?template=Mistral#templates-for-chat-models
2. 