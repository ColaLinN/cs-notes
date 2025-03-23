

QA

1. how many query in memory nteworks? 
   1. One, but transformer has multiples
2. what's the limitation of memory network?
   1. not ground-breaking
3. what does transformer improve?
   1. multiple queries
   2. Multi-heads attention(MHA)
   3. Self-attention layer
4. what does self-attention do?
   1. allow to dynamically change the word representation according to its context
5. what is the computational cost of RNN, ConvNet, and transformer? Assuming L is the len of sequence, d is the dimension of hidden layer and k is the kernal size
   1. RNN, `O(L*d^2)`
   2. ConvNet, `O(L*d^2*k)`
   3. Transformer, `O(L^2*d)`
6. Why do we divide by `√d/H`?
   1. because the q, k, and v are `d/H`