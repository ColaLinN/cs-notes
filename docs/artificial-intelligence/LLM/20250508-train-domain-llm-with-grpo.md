# Train Domain LLM with GRPO

motivation

-   wanted to try something original and get my hands dirty.

Question

-   can I make a model create a schedule from a list of events and priorities?

would have forced me to think about

-   problem setting, 
-   generate data, 
-   choose the base model, 
-   design reward functions, 
-   run multiple rounds of training, 

hoping that my model would learn something.

## problem

This type of problem falls under [Interval scheduling](https://en.wikipedia.org/wiki/Interval_scheduling).

This specific problem is a variant of the Weighted Interval Scheduling problem, that can be solved efficiently using Dynamic Programming.

That's great because it allows us to easily compute the best possible score for any given input, a target for our model to aim for during training.



In verifiable domains like math, building a dataset for GRPO is often easier.



Given these requirements, writing a dataset generation script is relatively easy.

-   We use event names from different categories (🎶 Music Festival, 🎓 University, 🧑‍💻 Tech Conference, ...).
-   Each example includes a random number of events (between 4 and 8) with varying durations.
-   We make sure some events overlap.
-   We randomly mark some events as priorities.

## Reference

1.   I trained a Language Model to schedule events with GRPO! https://huggingface.co/blog/anakin87/qwen-scheduler-grpo