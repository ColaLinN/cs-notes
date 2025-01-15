

# Generate Synthetic Workload 

为了对LLM实验中请求模式进行仿真，我们需要构造工作负载轨迹（Workload traces）。

在多租户Adapter的场景下，有以下重要的参数

- Adapter的数量 `n`
- 请求速率 `R`，所有请求的每秒请求数
- 对每个adapter的请求数量
  1. 长尾分布（幂律分布）
- 请求的间隔
  1. 使用Gamma Arrival Process 来建模
  
  2. 如果 `cv` 较小（如 `cv=0.1`），生成的间隔趋近于均匀，所有间隔时间接近 1。
  
     如果 `cv` 较大（如 `cv=2`），生成的间隔差异会变得非常显著，可能会有极小和极大的间隔时间。
- 输入输出长度 `len_input|prompt, len_output`
  1. 均匀分布 `U[Il, Iu]` 
  2. 长尾分布（幂律分布）
- 请求时长 `duration`
  - 一般可以设定一个固定值

## Req queue 参数

1. batch_max_tokens，一个batch中最大的的tokens数量，默认为none，必须大于一个req的最大token数量。（看起来是input tokens的限制）
   1. 取`max(int(1 / 6 * args.max_total_token_num), args.max_req_total_len)`
   2. 当前args.max_total_token_num为6000，args.max_req_total_len配置为4096，所以batch_size最大为4096
2. max_total_token_num，GPU可以支持的总tokens数量，`max_batch * (input_len + output_len)`，默认为6000。一个req的`input+ouput tokens`数量不得多于这个max_total_token_num
3. running_max_req_size，最多的forward的req数量，默认为1000
4. max_req_total_len，一个req最大的tokens数量。一个新的req的总tokens数量（`input_len+output_len`）不能够大于max_req_total_len
5. max_req_input_len，一个req最大的input_len。一个req的prompt长度不能够大于max_req_input_len

## req_queue的一些规则

1. generate_batch 
   1. 每次都会根据当前的running_batch来生成cache_len_list
   2. 会根据 `new_batch_total_tokens + req.input_len <= self.batch_max_tokens` 来生成batch
   3. 其中会调用_can_add_new_req()来判断加入这个req后，cache_len_list的长度会不会超过running_max_req_size，需要的tokens数量是否不超过max_total_tokens

在这个情况下，长尾的req的假设

1. 如果同时输入input_len几乎等于batch_max_tokens，此时另一个短req就会等待
2. 会不会在prefilling的时候，一个短input_len的req和一个长input_len的req同时被batch，此时短req会需要等待长req处理完？
3. 会不会在decoding的时候，一个短ouput_len的req和一个长output_len的req同时被batch，此时短req会需要等待长req处理完？

## LLaMa params

在使用 LLaMA 模型（或类似的语言生成模型）时，`do_sample` 和 `ignore_eos` 是控制生成输出行为的参数：

这些参数在大语言模型（LLM）中用于控制生成文本的行为，调整输出的多样性和内容。下面是各参数的作用解释：

1. **do_sample (bool)**：  
   - **作用**：决定是否在生成文本时进行采样。
   - **使用方法**：
     - 当 `do_sample=True` 时，模型会从预测的分布中随机选择词语，这通常会产生更具创意的回答。
     - 当 `do_sample=False` 时，模型总是选择概率最高的词，生成的文本较为保守和一致。

2. **presence_penalty (float)**：
   - **作用**：惩罚已生成的词，以避免重复内容。
   - **使用方法**：值越高，模型越不愿重复已出现的词或短语，鼓励更多新内容。

3. **frequency_penalty (float)**：
   - **作用**：对已生成的词频进行惩罚，以减少过多重复。
   - **使用方法**：值越高，模型越不愿重复同一词频出现的词，可以用来减少重复性和“啰嗦”。

4. **temperature (float)**：
   - **作用**：控制输出的随机性。
   - **使用方法**：
     - 值越高（如 1.5），生成的文本越随机和多样化，适合创意内容。
     - 值越低（如 0.2），输出越确定和一致，适合需要精准回答的场景。
   
5. **top_p (float)**：
   - **作用**：设置“核采样”阈值，控制输出词语选择的范围。
   - **使用方法**：
     - 设为 0.9 时，模型只会从累积概率达到 90% 的词汇中采样，适当保持生成内容的合理性和多样性。
     - 设为 1.0 时，则不限制范围。
   
6. **top_k (int)**：
   - **作用**：限制采样时候候选词的数量。
   - **使用方法**：
     - 当 `top_k=50` 时，模型只会从 50 个概率最高的词中选择，适当增强随机性。
     - 设为 -1 时，模型不限制候选词数量。

7. **ignore_eos (bool)**：
   - **作用**：决定模型是否忽略结束符（end-of-sequence, EOS）。
   - **使用方法**：`ignore_eos=True` 会忽略结束符，让模型持续生成新内容。

8. **max_new_tokens (int)**：
   - **作用**：限制生成的最大新词数量。
   - **使用方法**：设定生成内容的长度上限，控制模型不会生成太长的文本。此参数尤其适合在互动场景中避免过长回答。

9. **stop_sequences (Optional[Union[str, List[str]]])**：
   - **作用**：设定生成内容的停止条件。
   - **使用方法**：可以设置一个或多个停用词（如 `[".", "!", "\n"]`），一旦模型生成这些词就会停止生成。适用于自定义回答结尾。

这些参数可综合调整，以控制模型的生成行为，满足不同场景需求。

### generate_stream

```shell
curl -X POST http://localhost:8000/generate_stream \
    -H "Content-Type: application/json" \
    -H "User-Agent: Benchmark Client" \
    -d '{
        "model_dir": "huggyllama/llama-7b",
        "lora_dir": "tloen/alpaca-lora-7b-1",
        "inputs": "hello world",
        "parameters": {
            "do_sample": false,
            "ignore_eos": false,
            "max_new_tokens": 205
        }
    }'
```

