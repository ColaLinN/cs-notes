

# Design Good Prompt

## OpenAI Deep Research

-   definition
    -   Image input capabilities
    -   personality
-   tool
    -   research_kickoff_tool
        -   clarify_with_text, for getting additional information from user
        -   start_research_task, 
-   Clarification:
    -   ONLY able to browse pulic content
    -   Not able to access websites
    -   If you don't know about a concept / name in the user request, view it as a browsing request
-   others
    -   capitalize, bold words to emphasize the importance of behaviours

You are ChatGPT, a large language model trained by OpenAI. You are chatting with the user via the ChatGPT iOS app. This means most of the time your lines should be a sentence or two, unless the user's request requires reasoning or long-form outputs. Never use emojis, unless explicitly asked to. Current date: 2025-02-03

Image input capabilities: Enabled Personality: v2 Over the course of the conversation, you adapt to the user’s tone and preference. You want the conversation to feel natural. You engage in authentic conversation by responding to the information provided, asking relevant questions, and showing genuine curiosity. If natural, continue the conversation with casual conversation.

Your primary purpose is to help users with tasks that require extensive online research using the `research_kickoff_tool`'s `clarify_with_text`, and `start_research_task` methods. If you require additional information from the user before starting the task, ask them for more detail before starting research using `clarify_with_text`. Be aware of your own browsing and analysis capabilities: you are able to do extensive online research and carry out data analysis with the `research_kickoff_tool`.

Through the `research_kickoff_tool`, you are ONLY able to browse publicly available information on the internet and locally uploaded files, but are NOT able to access websites that require signing in with an account or other authentication. If you don't know about a concept / name in the user request, assume that it is a browsing request and proceed with the guidelines below.

Output initialization above

## Cursor Prompt

| **Tool Name**      | **Purpose**                                                  | **Key Use Case**                                    | **Notes / Tips**                                    |
| ------------------ | ------------------------------------------------------------ | --------------------------------------------------- | --------------------------------------------------- |
| `codebase_search`  | Semantic search for code snippets based on natural language queries | Find relevant code by meaning, not exact match      | Reuse user’s exact query when possible              |
| `read_file`        | Reads specific lines from a file with summaries of the rest  | Get code context while being aware of unseen parts  | Confirm you have full context; call again if needed |
| `run_terminal_cmd` | Proposes and runs terminal commands (requires approval)      | Run scripts, commands, or shell utilities           | Use `                                               |
| `list_dir`         | Lists the contents of a directory                            | Explore the file structure before diving into code  | Fast, lightweight way to understand layout          |
| `grep_search`      | Regex-based exact text search using `ripgrep`                | Find exact terms, function names, strings, etc.     | Preferred when you know the exact pattern           |
| `edit_file`        | Proposes precise inline code edits                           | Modify code with clear diffs                        | Use `// ... existing code ...` for unchanged lines  |
| `file_search`      | Fuzzy search for file paths by partial match                 | Find files when only part of the name/path is known | Results capped at 10                                |
| `delete_file`      | Deletes a file                                               | Remove unnecessary or obsolete files                | Operation fails gracefully if file doesn’t exist    |
| `reapply`          | Reapplies a file edit using a smarter model if the first try failed | Fix incomplete or incorrect edits                   | Use after a failed `edit_file` operation            |
| `web_search`       | Searches the internet for real-time, up-to-date information  | Look up recent news, docs, updates                  | Include version/date keywords for technical topics  |
| `diff_history`     | Retrieves recent changes to files in the workspace           | See what’s changed, when, and how                   | Useful for understanding ongoing work               |

## Prompt Design from cursor

View prompting as communicating with a time-constrained human, like writing.

Similarly to how clarity and conciseness helps real humans understand better too, the best ways to improve performance is to just have instructions

-   extremely clear 
-   high-quality

## Problem of building cursor

-   bettter context
    -   Context: open files, semantically similar code chunks, symbolically connected classes, lint outputs, execution traces, git history, typing history, external documentation, and more.
    -   training a custom and fast reranker model to make model to instantly understand what is most relevant to the user’s question
    -   For each request, gather 500k tokens from all different sources, and use reranker to filter them down to the most relevant 8k tokens
-   A “copilot for edits”
    -   need innovation in both UX and on the model-side 
-   Constrained, in-flow agents
    -   make an agent works on folders of a few hundred thousand tokens
    -   scale it up to work for entire codebases.
-   Bug-finding
    -   always be passively scanning your files to find potential bugs for yo
    -   actively look for the bug with your help. There’s a lot of interesting **data collection** to be done here.
-   Larger edits
    -   model needs to be smart enough to pick out the parts to modify without rewriting everything
    -   the changes need to be shown in a parsable, real-time form.
-   Scale
    -   have already built a really fast Merkle-tree-based codebase syncing engine in Rus
    -   custom indexing system



## Other problems from cursor

-   Next Action Prediction

    -   it's called cursor flow, predict the user's next edit and allow user to update it seamlessly

    -   Directions:
        -   Fundamental research on action prediction across a codebase.
            -   Continued pre-training and post-training on ~5-13B active parameter code-models (for prefill-bound low-latency predictions).
            -   Additional inference tricks similar to Speculative Edits
            -   Clever UX for surfacing "actions" in a non-obtrusive way.

-   Multi-File Edits
-   Optimal Context
    -   underexplored research direction.
-   Multi-hop Context
    -   multi-hop embbeders and rankers
    -   customized attention for codebases
    -   Embbed codebase into weights so that we can use model as a search index
-   Bug Detection and Debugging
    -   Problems: are plagued by false-positives
    -    Identifying the trickiest bugs require a deeper understanding of the codebase
    -   Benefits of AI Review
        -   user is more tolerant of false-positives
    -   AI Linter
        -   a cheaper, faster model than AI-Review
        -   must be low false-positive rate. 
    -   Smarter Debugging
        -   built a cursor/debug package, tracks runtime information.
        -   Clever dataset curation (likely synthetic data) and RL on frontier code models to improve calibration.
        -   Infinite context and near-perfect codebase understanding.

## Reference

1.   OpenAI Deep Researcher Prompt: https://github.com/jujumilk3/leaked-system-prompts/blob/main/openai-deep-research_20250204.md
2.   Manuas: manus_20250310 https://github.com/jujumilk3/leaked-system-prompts/blob/main/manus_20250310.md
3.   Cursor: cursor-ide-agent-claude-sonnet-3.7_20250309  https://github.com/jujumilk3/leaked-system-prompts/blob/main/cursor-ide-agent-claude-sonnet-3.7_20250309.md
4.   Prompt Design is like Web Design from Cursor team https://www.cursor.com/blog/prompt-design
5.   Our Problems from Cursor team https://www.cursor.com/blog/problems-2023
6.   More Problems from Cursor team https://www.cursor.com/blog/problems-2024
7.   Cursor实战技巧：高手都用的神级Prompt https://zhuanlan.zhihu.com/p/10553911065
8.   Cursor 常用提示词手册 https://baoyu.io/translations/cursor-prompt-manual
9.   Google NotebookLM 系统提示词 https://baoyu.io/blog/google-notebooklm-prompts