

# Generate Synthetic Workload 

为了对LLM实验中请求模式进行仿真，我们需要构造工作负载轨迹（Workload traces）。

在多LoRA Adapter的场景下，有以下重要的参数

- Adapter的数量 `n`
- 请求速率 `R`，所有请求的每秒请求数
- 对每个adapter的请求数量
  1. 长尾分布（幂律分布）
- 请求的间隔
  1. 使用Gamma Arrival Process 来建模
- 输入输出长度 `len_input|prompt, len_output`
  1. 均匀分布 `U[Il, Iu]` 
  2. 长尾分布（幂律分布）
- 请求时长 `duration`
  - 一般可以设定一个固定值（？）



- Adapter的数量 `n`
- Gamma Arrival Process（Gamma到达过程）建模每个Adapter的请求到达间隔。用于控制请求到达的时间模式和波动性。比传统的泊松分布能更准确地描述真实请求分布
  - 变异系数 `cv` = 标准差 / 均值。它描述请求间隔的波动性、请求到达的规律性，cv 越大，间隔时间的波动性越大，cv 越小，请求到达越均匀。
- 幂律分布建模的是所有适配器之间的请求速率的分布，用于描述不同适配器之间的负载差异
  - 设第 i 个 adapter 的请求速率 `λi`
  - 指数 `α` 控制了不均匀性（少数Adapter的请求多，大多数Adapter的请求低。）当 `α` 较小，Adapter之间的差异较大，意味着少数Adapter的请求量会非常高。当 α 较大，请求的分布更加均匀，Adapter之间的差异减小
- 总请求速率 `R`。R 表示系统中所有适配器的总请求速率，单位为每秒请求数
  - 所有适配器的请求速率 `λi` 的总和等于 `R`
- 输入输出长度。每个请求的输入和输出数据长度分别从均匀分布 `U[Il, Iu]` 和 `U[Ol, Ou]` 中抽样
- 默认请求时长（Duration）为 5 分钟



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



```
get_adapter_dirs input and output 200 ['dummy-lora-13b-rank-64', 'dummy-lora-13b-rank-32', 'dummy-lora-13b-rank-16'] None ['dummy-lora-13b-rank-64-0', 'dummy-lora-13b-rank-32-0', 'dummy-lora-13b-rank-16-0', 'dummy-lora-13b-rank-64-1', 'dummy-lora-13b-rank-32-1', 'dummy-lora-13b-rank-16-1', 'dummy-lora-13b-rank-64-2', 'dummy-lora-13b-rank-32-2', 'dummy-lora-13b-rank-16-2', 'dummy-lora-13b-rank-64-3', 'dummy-lora-13b-rank-32-3', 'dummy-lora-13b-rank-16-3', 'dummy-lora-13b-rank-64-4', 'dummy-lora-13b-rank-32-4', 'dummy-lora-13b-rank-16-4', 'dummy-lora-13b-rank-64-5', 'dummy-lora-13b-rank-32-5', 'dummy-lora-13b-rank-16-5', 'dummy-lora-13b-rank-64-6', 'dummy-lora-13b-rank-32-6', 'dummy-lora-13b-rank-16-6', 'dummy-lora-13b-rank-64-7', 'dummy-lora-13b-rank-32-7', 'dummy-lora-13b-rank-16-7', 'dummy-lora-13b-rank-64-8', 'dummy-lora-13b-rank-32-8', 'dummy-lora-13b-rank-16-8', 'dummy-lora-13b-rank-64-9', 'dummy-lora-13b-rank-32-9', 'dummy-lora-13b-rank-16-9', 'dummy-lora-13b-rank-64-10', 'dummy-lora-13b-rank-32-10', 'dummy-lora-13b-rank-16-10', 'dummy-lora-13b-rank-64-11', 'dummy-lora-13b-rank-32-11', 'dummy-lora-13b-rank-16-11', 'dummy-lora-13b-rank-64-12', 'dummy-lora-13b-rank-32-12', 'dummy-lora-13b-rank-16-12', 'dummy-lora-13b-rank-64-13', 'dummy-lora-13b-rank-32-13', 'dummy-lora-13b-rank-16-13', 'dummy-lora-13b-rank-64-14', 'dummy-lora-13b-rank-32-14', 'dummy-lora-13b-rank-16-14', 'dummy-lora-13b-rank-64-15', 'dummy-lora-13b-rank-32-15', 'dummy-lora-13b-rank-16-15', 'dummy-lora-13b-rank-64-16', 'dummy-lora-13b-rank-32-16', 'dummy-lora-13b-rank-16-16', 'dummy-lora-13b-rank-64-17', 'dummy-lora-13b-rank-32-17', 'dummy-lora-13b-rank-16-17', 'dummy-lora-13b-rank-64-18', 'dummy-lora-13b-rank-32-18', 'dummy-lora-13b-rank-16-18', 'dummy-lora-13b-rank-64-19', 'dummy-lora-13b-rank-32-19', 'dummy-lora-13b-rank-16-19', 'dummy-lora-13b-rank-64-20', 'dummy-lora-13b-rank-32-20', 'dummy-lora-13b-rank-16-20', 'dummy-lora-13b-rank-64-21', 'dummy-lora-13b-rank-32-21', 'dummy-lora-13b-rank-16-21', 'dummy-lora-13b-rank-64-22', 'dummy-lora-13b-rank-32-22', 'dummy-lora-13b-rank-16-22', 'dummy-lora-13b-rank-64-23', 'dummy-lora-13b-rank-32-23', 'dummy-lora-13b-rank-16-23', 'dummy-lora-13b-rank-64-24', 'dummy-lora-13b-rank-32-24', 'dummy-lora-13b-rank-16-24', 'dummy-lora-13b-rank-64-25', 'dummy-lora-13b-rank-32-25', 'dummy-lora-13b-rank-16-25', 'dummy-lora-13b-rank-64-26', 'dummy-lora-13b-rank-32-26', 'dummy-lora-13b-rank-16-26', 'dummy-lora-13b-rank-64-27', 'dummy-lora-13b-rank-32-27', 'dummy-lora-13b-rank-16-27', 'dummy-lora-13b-rank-64-28', 'dummy-lora-13b-rank-32-28', 'dummy-lora-13b-rank-16-28', 'dummy-lora-13b-rank-64-29', 'dummy-lora-13b-rank-32-29', 'dummy-lora-13b-rank-16-29', 'dummy-lora-13b-rank-64-30', 'dummy-lora-13b-rank-32-30', 'dummy-lora-13b-rank-16-30', 'dummy-lora-13b-rank-64-31', 'dummy-lora-13b-rank-32-31', 'dummy-lora-13b-rank-16-31', 'dummy-lora-13b-rank-64-32', 'dummy-lora-13b-rank-32-32', 'dummy-lora-13b-rank-16-32', 'dummy-lora-13b-rank-64-33', 'dummy-lora-13b-rank-32-33', 'dummy-lora-13b-rank-16-33', 'dummy-lora-13b-rank-64-34', 'dummy-lora-13b-rank-32-34', 'dummy-lora-13b-rank-16-34', 'dummy-lora-13b-rank-64-35', 'dummy-lora-13b-rank-32-35', 'dummy-lora-13b-rank-16-35', 'dummy-lora-13b-rank-64-36', 'dummy-lora-13b-rank-32-36', 'dummy-lora-13b-rank-16-36', 'dummy-lora-13b-rank-64-37', 'dummy-lora-13b-rank-32-37', 'dummy-lora-13b-rank-16-37', 'dummy-lora-13b-rank-64-38', 'dummy-lora-13b-rank-32-38', 'dummy-lora-13b-rank-16-38', 'dummy-lora-13b-rank-64-39', 'dummy-lora-13b-rank-32-39', 'dummy-lora-13b-rank-16-39', 'dummy-lora-13b-rank-64-40', 'dummy-lora-13b-rank-32-40', 'dummy-lora-13b-rank-16-40', 'dummy-lora-13b-rank-64-41', 'dummy-lora-13b-rank-32-41', 'dummy-lora-13b-rank-16-41', 'dummy-lora-13b-rank-64-42', 'dummy-lora-13b-rank-32-42', 'dummy-lora-13b-rank-16-42', 'dummy-lora-13b-rank-64-43', 'dummy-lora-13b-rank-32-43', 'dummy-lora-13b-rank-16-43', 'dummy-lora-13b-rank-64-44', 'dummy-lora-13b-rank-32-44', 'dummy-lora-13b-rank-16-44', 'dummy-lora-13b-rank-64-45', 'dummy-lora-13b-rank-32-45', 'dummy-lora-13b-rank-16-45', 'dummy-lora-13b-rank-64-46', 'dummy-lora-13b-rank-32-46', 'dummy-lora-13b-rank-16-46', 'dummy-lora-13b-rank-64-47', 'dummy-lora-13b-rank-32-47', 'dummy-lora-13b-rank-16-47', 'dummy-lora-13b-rank-64-48', 'dummy-lora-13b-rank-32-48', 'dummy-lora-13b-rank-16-48', 'dummy-lora-13b-rank-64-49', 'dummy-lora-13b-rank-32-49', 'dummy-lora-13b-rank-16-49', 'dummy-lora-13b-rank-64-50', 'dummy-lora-13b-rank-32-50', 'dummy-lora-13b-rank-16-50', 'dummy-lora-13b-rank-64-51', 'dummy-lora-13b-rank-32-51', 'dummy-lora-13b-rank-16-51', 'dummy-lora-13b-rank-64-52', 'dummy-lora-13b-rank-32-52', 'dummy-lora-13b-rank-16-52', 'dummy-lora-13b-rank-64-53', 'dummy-lora-13b-rank-32-53', 'dummy-lora-13b-rank-16-53', 'dummy-lora-13b-rank-64-54', 'dummy-lora-13b-rank-32-54', 'dummy-lora-13b-rank-16-54', 'dummy-lora-13b-rank-64-55', 'dummy-lora-13b-rank-32-55', 'dummy-lora-13b-rank-16-55', 'dummy-lora-13b-rank-64-56', 'dummy-lora-13b-rank-32-56', 'dummy-lora-13b-rank-16-56', 'dummy-lora-13b-rank-64-57', 'dummy-lora-13b-rank-32-57', 'dummy-lora-13b-rank-16-57', 'dummy-lora-13b-rank-64-58', 'dummy-lora-13b-rank-32-58', 'dummy-lora-13b-rank-16-58', 'dummy-lora-13b-rank-64-59', 'dummy-lora-13b-rank-32-59', 'dummy-lora-13b-rank-16-59', 'dummy-lora-13b-rank-64-60', 'dummy-lora-13b-rank-32-60', 'dummy-lora-13b-rank-16-60', 'dummy-lora-13b-rank-64-61', 'dummy-lora-13b-rank-32-61', 'dummy-lora-13b-rank-16-61', 'dummy-lora-13b-rank-64-62', 'dummy-lora-13b-rank-32-62', 'dummy-lora-13b-rank-16-62', 'dummy-lora-13b-rank-64-63', 'dummy-lora-13b-rank-32-63', 'dummy-lora-13b-rank-16-63', 'dummy-lora-13b-rank-64-64', 'dummy-lora-13b-rank-32-64', 'dummy-lora-13b-rank-16-64', 'dummy-lora-13b-rank-64-65', 'dummy-lora-13b-rank-32-65', 'dummy-lora-13b-rank-16-65', 'dummy-lora-13b-rank-64-66', 'dummy-lora-13b-rank-32-66', 'dummy-lora-13b-rank-16-66']
```

## LLaMa 模型

### 参数

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

### 请求测试

这两个参数可以配合使用来调整输出的长度和多样性，以适应不同的应用需求。

```shell
curl -X POST http://localhost:8000/generate_stream \
    -H "Content-Type: application/json" \
    -H "User-Agent: Benchmark Client" \
    -d '{
        "model_dir": "huggyllama/llama-13b",
        "lora_dir": "dummy-lora-13b-rank-64-49",
        "inputs": "你好，世界，今天你想听什么？",
        "parameters": {
            "do_sample": false,
            "ignore_eos": true,
            "max_new_tokens": 72
        }
    }'
```

the default max_len is 3072

```shell
    parser.add_argument("--max_req_total_len", type=int, default=2048 + 1024,
                        help="the max value for req_input_len + req_output_len")
```



completion

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





```shell
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





req queue

```python
    # @calculate_time(show=True, min_cost_ms=0.1)
    def _can_add_new_req(self, req, lora_ranks):
        # lora_ranks is a dict: {'dummy-lora-13b-rank-64-0': 64, 'dummy-lora-13b-rank-32-0': 32}
        print("add new req", req, "rank is", lora_ranks[req.adapter_dir])
        self.cache_len_list.append((req.input_len + 1, req.max_output_len - 1)) # hard to analysis
        self.cache_len_list.sort(key=lambda x: -x[1])
        if req.adapter_dir not in self.adapters:
            self.adapter_size += lora_ranks[req.adapter_dir] * 4
            self.adapters.add(req.adapter_dir)
        
        left_out_len_array = np.array([e[1] for e in self.cache_len_list])
        # assert left_out_len_array.min() >= 0
        has_run_len_array = np.array([e[0] for e in self.cache_len_list])
        cum_run_len_array = np.cumsum(has_run_len_array)
        size_array = np.arange(1, len(self.cache_len_list) + 1, 1)
        
        need_max_token_num = (left_out_len_array * size_array + cum_run_len_array).max()
        if (need_max_token_num < self.max_total_tokens - self.adapter_size and
            len(self.cache_len_list) <= self.running_max_req_size):
            return True
        else:
            return False
```

