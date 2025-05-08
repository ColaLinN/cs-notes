

# Speculative Decoding

Speculative decoding uses two models:

-   A smaller, faster “draft” model to quickly generate several possible next tokens.

-   A larger, more accurate “main” model to verify and accept or reject those tokens.

How it works (simplified):

1.   The draft model guesses a few future tokens very quickly (e.g., 5–10 tokens ahead).

2.   The main model then checks those guesses:

     1.   If it agrees with the predictions, those tokens are accepted.

     2.   If not, it discards the wrong guesses and regenerates from the correct spot.

3. This process repeats, letting the main model skip many steps when the draft model is correct.

Benifits:

-   fast, saving time in inference
-   maintain same output quality
-   useful for deployment