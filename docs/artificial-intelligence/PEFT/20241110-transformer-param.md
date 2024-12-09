



# LLM Concept

1. rank_id(tp_rank)，向量并行的GPU的id标识
2. world_size，向量并行的GPU数量



常见参数

1. n_embed（hidden_size，n_embd），输入大小 
2. num_attention_heads（n_head），注意力头数量 
3. num_hidden_layers（n_layer，layer_num），transformer层数
4. vocab_size，词汇表大小
5. max_total_token_num，最大的总token数量
6. mem_adapter_size，adapter的内存大小
7. key_size, query_size, value_size
8. num_key_value_heads
   1. 其实和 num_attention_heads 一样？只不过 llama2 用的是num_key_value_heads而llama用的是num_attention_heads
9. `head_num`（`tp_k_head_num_`，`tp_v_head_num_`）
   1. `head_num=self.config["num_key_value_heads"] // self.world_size_`
10. head_dim
    1. `head_dim=self.config["hidden_size"] // self.config["num_attention_heads"]`
11. dtype
    1. torch.float16
12. 



Slora

1. tot_size = max_total_token_num + mem_adapter_size
2. cache_size = max_total_token_num

