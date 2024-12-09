



Req queue exp

```
Logging|2024-11-20 22:13:42|INFO|inside_func: ReqQueue._can_add_new_req|to_check_req: <bound method Req.__repr__ of request_id(n=3d417501e2424e12ad136ecfbd82a240, adapter_dir=dummy-lora-13b-rank-32-0, >|cache_len_list: [[2103, 1992], [11, 7]]|has_run_len_array: [2103   11]|left_out_len_array: [1992    7]|cum_run_len_array: [2103 2114]|size_array: [1 2]|need_max_token_num: 4095|max_total_tokens: 14000|adapter_size: 128|batch_max_tokens: 4096|running_max_req_size: 1000|
can add new req <bound method Req.__repr__ of request_id(n=3d417501e2424e12ad136ecfbd82a240, adapter_dir=dummy-lora-13b-rank-32-0, >
```

所以关键在于max_total_tokens，max_total_tokens越大，我们的req.queue越能够处理多个req

一般来说我们也不能够减少这个max_total_tokens，我们可以考虑构造req去够到这个高度





