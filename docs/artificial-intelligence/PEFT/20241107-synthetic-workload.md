

# Generate Synthetic Workload 

为了对LLM实验中请求模式进行仿真，我们需要构造工作负载轨迹（Workload traces）。

在多租户Adapter的场景下，有以下重要的参数

- Adapter的数量 `n`
- 请求速率 `R`，所有请求的每秒请求数
- 对每个adapter的请求数量
  1. 长尾分布（幂律分布）
- 请求的间隔
  1. 使用Gamma Arrival Process 来建模
  
  2. 如果 `cv` 较小（如 cv=0.1），生成的间隔趋近于均匀，所有间隔时间接近 1。
  
     如果 `cv` 较大（如 cv=2），生成的间隔差异会变得非常显著，可能会有极小和极大的间隔时间。
- 输入输出长度 `len_input|prompt, len_output`
  1. 均匀分布 `U[Il, Iu]` 
  2. 长尾分布（幂律分布）
- 请求时长 `duration`
  - 一般可以设定一个固定值

## Req queue 参数

1. batch_max_tokens，一个batch中最大的的tokens数量，默认为none，必须大于一个req的最大token数量。（看起来是input tokens的限制）
   1. 取`max(int(1 / 6 * args.max_total_token_num), args.max_req_total_len)`
   2. 当前args.max_total_token_num为6000，args.max_req_total_len配置为4096，所以batch_size最大为4096
2. max_total_token_num，GPU可以支持的总tokens数量，`max_batch * (input_len + output_len)`，默认为6000。一个req的input+ouput tokens数量不得多于这个max_total_token_num
3. running_max_req_size，最多的forward的req数量，默认为1000
4. max_req_total_len，一个req最大的tokens数量。一个新的req的总tokens数量（input_len+output_len）不能够大于max_req_total_len
5. max_req_input_len，一个req最大的input_len。一个req的prompt长度不能够大于max_req_input_len

## req_queue的一些规则

1. generate_batch 
   1. 每次都会根据当前的running_batch来生成cache_len_list
   2. 会根据 new_batch_total_tokens + req.input_len <= self.batch_max_tokens 来生成batch
   3. 其中会调用_can_add_new_req()来判断加入这个req后，cache_len_list的长度会不会超过running_max_req_size，需要的tokens数量是否不超过max_total_tokens

在这个情况下，长尾的req的假设

1. 如果同时输入input_len几乎等于batch_max_tokens，此时另一个短req就会等待
2. 会不会在prefilling的时候，一个短input_len的req和一个长input_len的req同时被batch，此时短req会需要等待长req处理完？
3. 会不会在decoding的时候，一个短ouput_len的req和一个长output_len的req同时被batch，此时短req会需要等待长req处理完？

## 模型请求测试

```
BASE_MODEL = {
        "S1": "huggyllama/llama-7b",
        "S2": "huggyllama/llama-7b",
        "S3": "huggyllama/llama-13b",
        "S4": "huggyllama/llama-13b",
        "Real": "huggyllama/llama-7b",
}

LORA_DIR = {
        "S1": ["dummy-lora-7b-rank-8"],
        "S2": ["dummy-lora-7b-rank-64", "dummy-lora-7b-rank-32",
               "dummy-lora-7b-rank-16", "dummy-lora-7b-rank-8"],
        "S3": ["dummy-lora-13b-rank-16"],
        "S4": ["dummy-lora-13b-rank-64",
               "dummy-lora-13b-rank-32", "dummy-lora-13b-rank-16",],
        "Real": ["tloen/alpaca-lora-7b", "MBZUAI/bactrian-x-llama-7b-lora"],
}
```

### dummy adapter

```
get_adapter_dirs input and output 200 ['dummy-lora-13b-rank-64', 'dummy-lora-13b-rank-32', 'dummy-lora-13b-rank-16'] None ['dummy-lora-13b-rank-64-0', 'dummy-lora-13b-rank-32-0', 'dummy-lora-13b-rank-16-0', 'dummy-lora-13b-rank-64-1', 'dummy-lora-13b-rank-32-1', 'dummy-lora-13b-rank-16-1', 'dummy-lora-13b-rank-64-2', 'dummy-lora-13b-rank-32-2', 'dummy-lora-13b-rank-16-2', 'dummy-lora-13b-rank-64-3', 'dummy-lora-13b-rank-32-3', 'dummy-lora-13b-rank-16-3', 'dummy-lora-13b-rank-64-4', 'dummy-lora-13b-rank-32-4', 'dummy-lora-13b-rank-16-4', 'dummy-lora-13b-rank-64-5', 'dummy-lora-13b-rank-32-5', 'dummy-lora-13b-rank-16-5', 'dummy-lora-13b-rank-64-6', 'dummy-lora-13b-rank-32-6', 'dummy-lora-13b-rank-16-6', 'dummy-lora-13b-rank-64-7', 'dummy-lora-13b-rank-32-7', 'dummy-lora-13b-rank-16-7', 'dummy-lora-13b-rank-64-8', 'dummy-lora-13b-rank-32-8', 'dummy-lora-13b-rank-16-8', 'dummy-lora-13b-rank-64-9', 'dummy-lora-13b-rank-32-9', 'dummy-lora-13b-rank-16-9', 'dummy-lora-13b-rank-64-10', 'dummy-lora-13b-rank-32-10', 'dummy-lora-13b-rank-16-10', 'dummy-lora-13b-rank-64-11', 'dummy-lora-13b-rank-32-11', 'dummy-lora-13b-rank-16-11', 'dummy-lora-13b-rank-64-12', 'dummy-lora-13b-rank-32-12', 'dummy-lora-13b-rank-16-12', 'dummy-lora-13b-rank-64-13', 'dummy-lora-13b-rank-32-13', 'dummy-lora-13b-rank-16-13', 'dummy-lora-13b-rank-64-14', 'dummy-lora-13b-rank-32-14', 'dummy-lora-13b-rank-16-14', 'dummy-lora-13b-rank-64-15', 'dummy-lora-13b-rank-32-15', 'dummy-lora-13b-rank-16-15', 'dummy-lora-13b-rank-64-16', 'dummy-lora-13b-rank-32-16', 'dummy-lora-13b-rank-16-16', 'dummy-lora-13b-rank-64-17', 'dummy-lora-13b-rank-32-17', 'dummy-lora-13b-rank-16-17', 'dummy-lora-13b-rank-64-18', 'dummy-lora-13b-rank-32-18', 'dummy-lora-13b-rank-16-18', 'dummy-lora-13b-rank-64-19', 'dummy-lora-13b-rank-32-19', 'dummy-lora-13b-rank-16-19', 'dummy-lora-13b-rank-64-20', 'dummy-lora-13b-rank-32-20', 'dummy-lora-13b-rank-16-20', 'dummy-lora-13b-rank-64-21', 'dummy-lora-13b-rank-32-21', 'dummy-lora-13b-rank-16-21', 'dummy-lora-13b-rank-64-22', 'dummy-lora-13b-rank-32-22', 'dummy-lora-13b-rank-16-22', 'dummy-lora-13b-rank-64-23', 'dummy-lora-13b-rank-32-23', 'dummy-lora-13b-rank-16-23', 'dummy-lora-13b-rank-64-24', 'dummy-lora-13b-rank-32-24', 'dummy-lora-13b-rank-16-24', 'dummy-lora-13b-rank-64-25', 'dummy-lora-13b-rank-32-25', 'dummy-lora-13b-rank-16-25', 'dummy-lora-13b-rank-64-26', 'dummy-lora-13b-rank-32-26', 'dummy-lora-13b-rank-16-26', 'dummy-lora-13b-rank-64-27', 'dummy-lora-13b-rank-32-27', 'dummy-lora-13b-rank-16-27', 'dummy-lora-13b-rank-64-28', 'dummy-lora-13b-rank-32-28', 'dummy-lora-13b-rank-16-28', 'dummy-lora-13b-rank-64-29', 'dummy-lora-13b-rank-32-29', 'dummy-lora-13b-rank-16-29', 'dummy-lora-13b-rank-64-30', 'dummy-lora-13b-rank-32-30', 'dummy-lora-13b-rank-16-30', 'dummy-lora-13b-rank-64-31', 'dummy-lora-13b-rank-32-31', 'dummy-lora-13b-rank-16-31', 'dummy-lora-13b-rank-64-32', 'dummy-lora-13b-rank-32-32', 'dummy-lora-13b-rank-16-32', 'dummy-lora-13b-rank-64-33', 'dummy-lora-13b-rank-32-33', 'dummy-lora-13b-rank-16-33', 'dummy-lora-13b-rank-64-34', 'dummy-lora-13b-rank-32-34', 'dummy-lora-13b-rank-16-34', 'dummy-lora-13b-rank-64-35', 'dummy-lora-13b-rank-32-35', 'dummy-lora-13b-rank-16-35', 'dummy-lora-13b-rank-64-36', 'dummy-lora-13b-rank-32-36', 'dummy-lora-13b-rank-16-36', 'dummy-lora-13b-rank-64-37', 'dummy-lora-13b-rank-32-37', 'dummy-lora-13b-rank-16-37', 'dummy-lora-13b-rank-64-38', 'dummy-lora-13b-rank-32-38', 'dummy-lora-13b-rank-16-38', 'dummy-lora-13b-rank-64-39', 'dummy-lora-13b-rank-32-39', 'dummy-lora-13b-rank-16-39', 'dummy-lora-13b-rank-64-40', 'dummy-lora-13b-rank-32-40', 'dummy-lora-13b-rank-16-40', 'dummy-lora-13b-rank-64-41', 'dummy-lora-13b-rank-32-41', 'dummy-lora-13b-rank-16-41', 'dummy-lora-13b-rank-64-42', 'dummy-lora-13b-rank-32-42', 'dummy-lora-13b-rank-16-42', 'dummy-lora-13b-rank-64-43', 'dummy-lora-13b-rank-32-43', 'dummy-lora-13b-rank-16-43', 'dummy-lora-13b-rank-64-44', 'dummy-lora-13b-rank-32-44', 'dummy-lora-13b-rank-16-44', 'dummy-lora-13b-rank-64-45', 'dummy-lora-13b-rank-32-45', 'dummy-lora-13b-rank-16-45', 'dummy-lora-13b-rank-64-46', 'dummy-lora-13b-rank-32-46', 'dummy-lora-13b-rank-16-46', 'dummy-lora-13b-rank-64-47', 'dummy-lora-13b-rank-32-47', 'dummy-lora-13b-rank-16-47', 'dummy-lora-13b-rank-64-48', 'dummy-lora-13b-rank-32-48', 'dummy-lora-13b-rank-16-48', 'dummy-lora-13b-rank-64-49', 'dummy-lora-13b-rank-32-49', 'dummy-lora-13b-rank-16-49', 'dummy-lora-13b-rank-64-50', 'dummy-lora-13b-rank-32-50', 'dummy-lora-13b-rank-16-50', 'dummy-lora-13b-rank-64-51', 'dummy-lora-13b-rank-32-51', 'dummy-lora-13b-rank-16-51', 'dummy-lora-13b-rank-64-52', 'dummy-lora-13b-rank-32-52', 'dummy-lora-13b-rank-16-52', 'dummy-lora-13b-rank-64-53', 'dummy-lora-13b-rank-32-53', 'dummy-lora-13b-rank-16-53', 'dummy-lora-13b-rank-64-54', 'dummy-lora-13b-rank-32-54', 'dummy-lora-13b-rank-16-54', 'dummy-lora-13b-rank-64-55', 'dummy-lora-13b-rank-32-55', 'dummy-lora-13b-rank-16-55', 'dummy-lora-13b-rank-64-56', 'dummy-lora-13b-rank-32-56', 'dummy-lora-13b-rank-16-56', 'dummy-lora-13b-rank-64-57', 'dummy-lora-13b-rank-32-57', 'dummy-lora-13b-rank-16-57', 'dummy-lora-13b-rank-64-58', 'dummy-lora-13b-rank-32-58', 'dummy-lora-13b-rank-16-58', 'dummy-lora-13b-rank-64-59', 'dummy-lora-13b-rank-32-59', 'dummy-lora-13b-rank-16-59', 'dummy-lora-13b-rank-64-60', 'dummy-lora-13b-rank-32-60', 'dummy-lora-13b-rank-16-60', 'dummy-lora-13b-rank-64-61', 'dummy-lora-13b-rank-32-61', 'dummy-lora-13b-rank-16-61', 'dummy-lora-13b-rank-64-62', 'dummy-lora-13b-rank-32-62', 'dummy-lora-13b-rank-16-62', 'dummy-lora-13b-rank-64-63', 'dummy-lora-13b-rank-32-63', 'dummy-lora-13b-rank-16-63', 'dummy-lora-13b-rank-64-64', 'dummy-lora-13b-rank-32-64', 'dummy-lora-13b-rank-16-64', 'dummy-lora-13b-rank-64-65', 'dummy-lora-13b-rank-32-65', 'dummy-lora-13b-rank-16-65', 'dummy-lora-13b-rank-64-66', 'dummy-lora-13b-rank-32-66', 'dummy-lora-13b-rank-16-66']
```

## LLaMa 模型参数

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
        "inputs": "你好，世界",
        "parameters": {
            "do_sample": false,
            "ignore_eos": false,
            "max_new_tokens": 205
        }
    }'
```

2

```
curl -X POST http://localhost:8000/generate_stream \
    -H "Content-Type: application/json" \
    -H "User-Agent: Benchmark Client" \
    -d '{
        "model_dir": "huggyllama/llama-13b",
        "inputs": "你好，世界",
        "parameters": {
            "do_sample": true,
            "presence_penalty": 0.0,
            "frequency_penalty": 0.0,
            "temperature": 0.7,
            "top_p": 0.9,
            "top_k": 50,
            "ignore_eos": false,
            "max_new_tokens": 10
        }
    }'
```

### completions

```
curl -X POST http://localhost:8000/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "huggyllama/llama-13b",
        "messages": [{"role": "user", "content": "你的问题或内容"}],
        "do_sample": true,
        "presence_penalty": 0.0,
        "frequency_penalty": 0.0,
        "temperature": 0.7,
        "top_p": 0.9,
        "top_k": 50,
        "ignore_eos": false,
        "max_tokens": 100,
        "stop": ["\n"]
    }'

```

### token embedding idx

你好，世界，今天你想听什么？",

```
loop_for_netio_req recv_req (None, [1, 29871, 30919, 31076, 30214, 30793, 30967, 30214, 31482, 30408, 30919, 31522, 232, 147, 175, 231, 190, 131, 31882, 30882], <slora.server.sampling_params.SamplingParams object at 0x152abee1b1f0>, '799421e13f3240d19ed00ce30ebc0e06')
```

你好世界

```
loop_for_netio_req recv_req (None, [1, 29871, 30919, 31076, 30214, 30793, 30967], <slora.server.sampling_params.SamplingParams object at 0x152abee1b220>, '9f84e519dba94d8ca48de5a526998076')
```

### S4 model-setting

```
{'dummy-lora-13b-rank-64-0': 64, 'dummy-lora-13b-rank-32-0': 32, 'dummy-lora-13b-rank-16-0': 16, 'dummy-lora-13b-rank-64-1': 64, 'dummy-lora-13b-rank-32-1': 32, 'dummy-lora-13b-rank-16-1': 16, 'dummy-lora-13b-rank-64-2': 64, 'dummy-lora-13b-rank-32-2': 32, 'dummy-lora-13b-rank-16-2': 16, 'dummy-lora-13b-rank-64-3': 64, 'dummy-lora-13b-rank-32-3': 32, 'dummy-lora-13b-rank-16-3': 16, 'dummy-lora-13b-rank-64-4': 64, 'dummy-lora-13b-rank-32-4': 32, 'dummy-lora-13b-rank-16-4': 16, 'dummy-lora-13b-rank-64-5': 64, 'dummy-lora-13b-rank-32-5': 32, 'dummy-lora-13b-rank-16-5': 16, 'dummy-lora-13b-rank-64-6': 64, 'dummy-lora-13b-rank-32-6': 32, 'dummy-lora-13b-rank-16-6': 16, 'dummy-lora-13b-rank-64-7': 64, 'dummy-lora-13b-rank-32-7': 32, 'dummy-lora-13b-rank-16-7': 16, 'dummy-lora-13b-rank-64-8': 64, 'dummy-lora-13b-rank-32-8': 32, 'dummy-lora-13b-rank-16-8': 16, 'dummy-lora-13b-rank-64-9': 64, 'dummy-lora-13b-rank-32-9': 32, 'dummy-lora-13b-rank-16-9': 16, 'dummy-lora-13b-rank-64-10': 64, 'dummy-lora-13b-rank-32-10': 32, 'dummy-lora-13b-rank-16-10': 16, 'dummy-lora-13b-rank-64-11': 64, 'dummy-lora-13b-rank-32-11': 32, 'dummy-lora-13b-rank-16-11': 16, 'dummy-lora-13b-rank-64-12': 64, 'dummy-lora-13b-rank-32-12': 32, 'dummy-lora-13b-rank-16-12': 16, 'dummy-lora-13b-rank-64-13': 64, 'dummy-lora-13b-rank-32-13': 32, 'dummy-lora-13b-rank-16-13': 16, 'dummy-lora-13b-rank-64-14': 64, 'dummy-lora-13b-rank-32-14': 32, 'dummy-lora-13b-rank-16-14': 16, 'dummy-lora-13b-rank-64-15': 64, 'dummy-lora-13b-rank-32-15': 32, 'dummy-lora-13b-rank-16-15': 16, 'dummy-lora-13b-rank-64-16': 64, 'dummy-lora-13b-rank-32-16': 32, 'dummy-lora-13b-rank-16-16': 16, 'dummy-lora-13b-rank-64-17': 64, 'dummy-lora-13b-rank-32-17': 32, 'dummy-lora-13b-rank-16-17': 16, 'dummy-lora-13b-rank-64-18': 64, 'dummy-lora-13b-rank-32-18': 32, 'dummy-lora-13b-rank-16-18': 16, 'dummy-lora-13b-rank-64-19': 64, 'dummy-lora-13b-rank-32-19': 32, 'dummy-lora-13b-rank-16-19': 16, 'dummy-lora-13b-rank-64-20': 64, 'dummy-lora-13b-rank-32-20': 32, 'dummy-lora-13b-rank-16-20': 16, 'dummy-lora-13b-rank-64-21': 64, 'dummy-lora-13b-rank-32-21': 32, 'dummy-lora-13b-rank-16-21': 16, 'dummy-lora-13b-rank-64-22': 64, 'dummy-lora-13b-rank-32-22': 32, 'dummy-lora-13b-rank-16-22': 16, 'dummy-lora-13b-rank-64-23': 64, 'dummy-lora-13b-rank-32-23': 32, 'dummy-lora-13b-rank-16-23': 16, 'dummy-lora-13b-rank-64-24': 64, 'dummy-lora-13b-rank-32-24': 32, 'dummy-lora-13b-rank-16-24': 16, 'dummy-lora-13b-rank-64-25': 64, 'dummy-lora-13b-rank-32-25': 32, 'dummy-lora-13b-rank-16-25': 16, 'dummy-lora-13b-rank-64-26': 64, 'dummy-lora-13b-rank-32-26': 32, 'dummy-lora-13b-rank-16-26': 16, 'dummy-lora-13b-rank-64-27': 64, 'dummy-lora-13b-rank-32-27': 32, 'dummy-lora-13b-rank-16-27': 16, 'dummy-lora-13b-rank-64-28': 64, 'dummy-lora-13b-rank-32-28': 32, 'dummy-lora-13b-rank-16-28': 16, 'dummy-lora-13b-rank-64-29': 64, 'dummy-lora-13b-rank-32-29': 32, 'dummy-lora-13b-rank-16-29': 16, 'dummy-lora-13b-rank-64-30': 64, 'dummy-lora-13b-rank-32-30': 32, 'dummy-lora-13b-rank-16-30': 16, 'dummy-lora-13b-rank-64-31': 64, 'dummy-lora-13b-rank-32-31': 32, 'dummy-lora-13b-rank-16-31': 16, 'dummy-lora-13b-rank-64-32': 64, 'dummy-lora-13b-rank-32-32': 32, 'dummy-lora-13b-rank-16-32': 16, 'dummy-lora-13b-rank-64-33': 64, 'dummy-lora-13b-rank-32-33': 32, 'dummy-lora-13b-rank-16-33': 16, 'dummy-lora-13b-rank-64-34': 64, 'dummy-lora-13b-rank-32-34': 32, 'dummy-lora-13b-rank-16-34': 16, 'dummy-lora-13b-rank-64-35': 64, 'dummy-lora-13b-rank-32-35': 32, 'dummy-lora-13b-rank-16-35': 16, 'dummy-lora-13b-rank-64-36': 64, 'dummy-lora-13b-rank-32-36': 32, 'dummy-lora-13b-rank-16-36': 16, 'dummy-lora-13b-rank-64-37': 64, 'dummy-lora-13b-rank-32-37': 32, 'dummy-lora-13b-rank-16-37': 16, 'dummy-lora-13b-rank-64-38': 64, 'dummy-lora-13b-rank-32-38': 32, 'dummy-lora-13b-rank-16-38': 16, 'dummy-lora-13b-rank-64-39': 64, 'dummy-lora-13b-rank-32-39': 32, 'dummy-lora-13b-rank-16-39': 16, 'dummy-lora-13b-rank-64-40': 64, 'dummy-lora-13b-rank-32-40': 32, 'dummy-lora-13b-rank-16-40': 16, 'dummy-lora-13b-rank-64-41': 64, 'dummy-lora-13b-rank-32-41': 32, 'dummy-lora-13b-rank-16-41': 16, 'dummy-lora-13b-rank-64-42': 64, 'dummy-lora-13b-rank-32-42': 32, 'dummy-lora-13b-rank-16-42': 16, 'dummy-lora-13b-rank-64-43': 64, 'dummy-lora-13b-rank-32-43': 32, 'dummy-lora-13b-rank-16-43': 16, 'dummy-lora-13b-rank-64-44': 64, 'dummy-lora-13b-rank-32-44': 32, 'dummy-lora-13b-rank-16-44': 16, 'dummy-lora-13b-rank-64-45': 64, 'dummy-lora-13b-rank-32-45': 32, 'dummy-lora-13b-rank-16-45': 16, 'dummy-lora-13b-rank-64-46': 64, 'dummy-lora-13b-rank-32-46': 32, 'dummy-lora-13b-rank-16-46': 16, 'dummy-lora-13b-rank-64-47': 64, 'dummy-lora-13b-rank-32-47': 32, 'dummy-lora-13b-rank-16-47': 16, 'dummy-lora-13b-rank-64-48': 64, 'dummy-lora-13b-rank-32-48': 32, 'dummy-lora-13b-rank-16-48': 16, 'dummy-lora-13b-rank-64-49': 64, 'dummy-lora-13b-rank-32-49': 32, 'dummy-lora-13b-rank-16-49': 16, 'dummy-lora-13b-rank-64-50': 64, 'dummy-lora-13b-rank-32-50': 32, 'dummy-lora-13b-rank-16-50': 16, 'dummy-lora-13b-rank-64-51': 64, 'dummy-lora-13b-rank-32-51': 32, 'dummy-lora-13b-rank-16-51': 16, 'dummy-lora-13b-rank-64-52': 64, 'dummy-lora-13b-rank-32-52': 32, 'dummy-lora-13b-rank-16-52': 16, 'dummy-lora-13b-rank-64-53': 64, 'dummy-lora-13b-rank-32-53': 32, 'dummy-lora-13b-rank-16-53': 16, 'dummy-lora-13b-rank-64-54': 64, 'dummy-lora-13b-rank-32-54': 32, 'dummy-lora-13b-rank-16-54': 16, 'dummy-lora-13b-rank-64-55': 64, 'dummy-lora-13b-rank-32-55': 32, 'dummy-lora-13b-rank-16-55': 16, 'dummy-lora-13b-rank-64-56': 64, 'dummy-lora-13b-rank-32-56': 32, 'dummy-lora-13b-rank-16-56': 16, 'dummy-lora-13b-rank-64-57': 64, 'dummy-lora-13b-rank-32-57': 32, 'dummy-lora-13b-rank-16-57': 16, 'dummy-lora-13b-rank-64-58': 64, 'dummy-lora-13b-rank-32-58': 32, 'dummy-lora-13b-rank-16-58': 16, 'dummy-lora-13b-rank-64-59': 64, 'dummy-lora-13b-rank-32-59': 32, 'dummy-lora-13b-rank-16-59': 16, 'dummy-lora-13b-rank-64-60': 64, 'dummy-lora-13b-rank-32-60': 32, 'dummy-lora-13b-rank-16-60': 16, 'dummy-lora-13b-rank-64-61': 64, 'dummy-lora-13b-rank-32-61': 32, 'dummy-lora-13b-rank-16-61': 16, 'dummy-lora-13b-rank-64-62': 64, 'dummy-lora-13b-rank-32-62': 32, 'dummy-lora-13b-rank-16-62': 16, 'dummy-lora-13b-rank-64-63': 64, 'dummy-lora-13b-rank-32-63': 32, 'dummy-lora-13b-rank-16-63': 16, 'dummy-lora-13b-rank-64-64': 64, 'dummy-lora-13b-rank-32-64': 32, 'dummy-lora-13b-rank-16-64': 16, 'dummy-lora-13b-rank-64-65': 64, 'dummy-lora-13b-rank-32-65': 32, 'dummy-lora-13b-rank-16-65': 16, 'dummy-lora-13b-rank-64-66': 64, 'dummy-lora-13b-rank-32-66': 32, 'dummy-lora-13b-rank-16-66': 16, None: 0}
```

