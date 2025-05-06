# Promising Problems on AI Coding from Cursor

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
    -   Identifying the trickiest bugs require a deeper understanding of the codebase
    -   Benefits of AI Review
        -   user is more tolerant of false-positives
    -   AI Linter
        -   a cheaper, faster model than AI-Review
        -   must be low false-positive rate. 
    -   Smarter Debugging
        -   built a cursor/debug package, tracks runtime information.
        -   Clever dataset curation (likely synthetic data) and RL on frontier code models to improve calibration.
        -   Infinite context and near-perfect codebase understanding.

## 