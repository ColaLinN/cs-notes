# Unix Log CLI

check log

-   tail
    -   follow
-   head
-   cat
-   grep
    -   regex search
-   less
    -   scroll
    -   search
    -   regex search
-   awk
    -   regex match and count

Find and Count

-   find
-   wc (word count)

File Comparison

-   diff
-   cmp

String Operatioin

-   printf
-   Sed

## Check Log

可以用 `man [CLI]` to check the offical doc

1. tail 用于显示文件的最后几行内容

    ```shell
    # 基本用法，显示文件最后 10 行
    tail log/info.log 
    # -n (number) 显示指定的最后 n 行
    tail -n 1000 log/info.log
    # -f (follow) 用于动态跟踪文件内容的变化，通常用于监控实时生成的日志文件。
    tail -f log/info.log
    ```

2. head 用于显示文件的开头部分内容

    ```shell
    # 基本用法，显示文件开头 10 行
    head log/info.log 
    # -n (number)，指定显示文件开头的行数
    head -n 20 log/info.log
    ```

3. cat (contatenate) 用于显示文件的内容，或合并多个文件，创建新文件。缺点是会一次性打印文件内容，不适合大文件。

    ```shell
    # 基本用法，显示文件内容
    cat log/info.log
    # 显示带行号的文件内容
    cat -n log/info.log
    # 连接多个文件
    cat file1 file2 > mergedfile
    # 创建文件
    cat > newfile
    ```

4. grep 在文件或输入中搜索符合特定模式的文本行

    ```shell
    # 基本用法，查找带有目标的文本行，逐行打印
    grep 'error' log/info.log
    
    # === 常用 === 
    # 忽略大小写(ignore-case)
    grep -i 'error' log/info.log
    # 匹配整个单词(word)。下面样例只会匹配独立出现的 error 单词，而不会匹配 errors, superror 等包含 error 的单词
    grep -w 'error' log/info.log
    # 显示匹配行的上下文(context)。下面样例会显示匹配 error 行的上下 3 行文本
    grep -C 3 'error' log/info.log
    # 反向匹配，会显示不含有 error 的行
    grep -v 'error' log/info.log
    
    # 组合使用，查找含有独立的 erorr 单词但没有 test_log 的行
    grep -w "error" log/info.log | grep -v "test_log"
    
    # === 正则匹配 ===
    # 使用正则表达式(extended-regexp)，匹配多个模式。下面样例匹配 error 或 warning
    grep -E 'error|warning' log/info.log
    # 匹配开头和结尾。下面样例匹配以 "start" 开头的行
    grep '^start' log/info.log
    # 匹配结尾。下面样例匹配以 "end" 结尾的行
    grep 'end$' log/info.log
    # 匹配字符范围。下面样例匹配包含 "a" 到 "z" 中任意字母的行
    grep '[a-z]' log/info.log
    # 使用反斜杠转义特殊字符。下面样例匹配包含 '.' 的行
    grep '\.' log/info.log
    
    # === 不常用 === 
    # 显示行号
    grep -n 'error' log/info.log
    # 计算匹配的行数
    grep -c 'error' log/info.log
    # 在目录中递归(recursively)搜索所有文件
    grep -r 'error' log/
    ```

5. more 用于分页显示文本文件内容，可用于大文件，但不如 less 强大，除非系统限制只有 more 没有 less，否则不推荐使用。

    ```shell
    # 基本使用
    more log/info.log
    
    # === 常用 === 
    # 逐行查看，按 enter 键
    
    # 向前和向后滚动查看文件
    Space  # 前进一屏
    Enter  # 前进一行
    b  # 返回上一屏
    
    # 搜索文件内容，搜索 keyword，并跳转到匹配处
    /keyword
    n  # 跳转到下一个匹配
    
    # 退出 less
    q  # 退出 less
    
    # === 不常用 === 
    # 显示行号
    cat -n filename | more
    # 查看多个文件
    more file1 file2 file3
    ```

6. less 是 more 的增强版本，性能更好，支持更复杂的搜索和导航，所以更推荐用 less。

    ```shell
    # 基本用法，分页查看文件内容
    less log/info.log
    
    # === 常用 === 
    # 逐行滚动查看
    j 或方向下键 Down Arrow (↓) # 向下滚动一行
    k 或 Up Arrow (↑) # 向上滚动一行。
    
    # 向前和向后滚动查看文件
    f  # 前进一屏
    b  # 后退一屏
    Space  # 前进一屏
    Enter  # 前进一行
    
    # 跳转文件开头、结尾
    G # 跳转末尾
    g # 跳转文件开头
    
    # 搜索文件内容
    /keyword  # 搜索 keyword，并跳转到匹配处
    n  # 跳转到下一个匹配
    N  # 跳转到上一个匹配
    
    # 退出 less
    q  # 退出 less
    
    # === 正则匹配 ===
    # 匹配开头，下面例子搜索以 "start" 开头的行
    /^start
    # 匹配结尾，下面例子搜索以 "end" 结尾的行
    /end$
    # 匹配任意字符，下面例子搜索包含 "a" 到 "z" 中任意字母的行
    /[a-z]/
    # 转义特殊字符，下面例子搜索包含 "." 字符的行
    /\./
    # 组合匹配，下面例子搜索包含 "error" 或 "warning" 的行
    /error\|warning/
    # 搜索包含 "foo" 但不包含 "bar" 的行 (结合正则和 less 的能力)
    ^(?=.*foo)(?!.*bar).*
    
    # === 不常用 === 
    # 显示行号
    less -N log/info.log
    # 查看多个文件，按 :n 切换到下一个文件
    less file1 file2
    # 从特定行开始查看
    less +50 log/info.log  # 从第 50 行开始查看
    ```

7.   awk 用于模式扫描和处理文件中的数据。

     ```shell
     # 1. 按列提取数据：打印文件中的第一列和第三列
     awk '{print $1, $3}' filename
     
     # 2. 基于模式匹配处理：仅打印匹配模式 "pattern" 的行的第二列
     awk '/pattern/ {print $2}' filename
     
     # 3. 计算求和：对文件中的第三列进行求和
     awk '{sum += $3} END {print sum}' filename
     
     # 4. 使用 awk 正则匹配和计数。 统计每个 key（如 key1、key2 等）出现的次数，其中 key 需要从每行中通过正则表达式提取
     awk '/key[0-9]+/ {match($0, /key[0-9]+/, arr); count[arr[0]]++} END {for (key in count) print key, count[key]}' data.txt
     ```

## Find and Count

1.   find 在指定目录中搜索文件和目录搜索文件和目录

     ```shell
     # 基本用法：在当前目录及其子目录中查找名为 filename.txt 的文件
     find . -name "filename.txt"
     
     # === 常用 === 
     # 查找特定类型的文件，例如目录 (-type d) 或普通文件 (-type f)
     find /path/to/search -type d -name "dirname"
     find /path/to/search -type f -name "*.txt"
     ```

2.   wc (word count) 用于统计文件中的行数、字数、字符数等信息

     ```shell
     # 基本用法：统计文件的行数、字数和字节数
     wc filename.txt
     
     # === 常用 === 
     # 只统计行数
     wc -l filename.txt
     
     # 只统计字数
     wc -w filename.txt
     
     # 只统计字符数
     wc -m filename.txt
     
     # 统计多个文件的总数
     wc -l file1.txt file2.txt
     
     # 结合其他命令使用，例如统计目录中所有 .txt 文件的总行数
     find /path/to/search -name "*.txt" -exec wc -l {} +
     ```

## File Comparison

1. diff 逐行比较文件

    ```shell
    # 基本用法，对比两个文件，显示不同的行
    diff file1.txt file2.txt
    
    # === 常用 ===
    # 忽略空白字符的差异
    diff -w file1.txt file2.txt
    
    # 显示上下文行，默认显示 3 行上下文
    diff -C 3 file1.txt file2.txt
    
    # 以侧边对比的方式输出
    diff --side-by-side file1.txt file2.txt
    ```

2. cmp 逐字节比较文件

    ```shell
    # 基本用法，逐字节比较两个文件，如果相同则不输出内容，只返回状态码
    cmp file1.txt file2.txt
    
    # === 常用 ===
    # 显示文件间的第一个不同之处及其字节偏移量
    cmp -b file1.txt file2.txt
    
    # 显示所有不同字节及其字节偏移量
    cmp -l file1.txt file2.txt
    
    # 忽略文件开头的前 n 个字节再进行比较
    cmp -i n file1.txt file2.txt
    ```

## String Operation

1. printf 输出格式化的字符串

    ```shell
    # 基本用法，输出格式化的字符串
    printf "Hello, %s!\n" "World"
    
    # === 常用 ===
    # 输出带有整数和浮点数的格式化字符串
    printf "Integer: %d, Floating Point: %.2f\n" 42 3.14159
    
    # 输出带有特定宽度和填充字符的字符串
    # 下面示例将 "Left" 和 "Right" 分别以宽度为10的格式左对齐和右对齐输出，空位用空格填充
    printf "|%-10s|%10s|\n" "Left" "Right"
    
    # 输出包含特殊字符（如换行符、制表符）
    printf "Line1\nLine2\tTabbed"
    ```

2. sed 用于在文本处理中进行查找、替换、插入、删除等操作

    ```shell
    # 1. 替换文本：将文件中的 "old_text" 替换为 "new_text"
    sed 's/old_text/new_text/g' filename
    
    # 2. 删除匹配的行：删除包含 "pattern" 的行
    sed '/pattern/d' filename
    
    # 3. 只显示匹配的行：打印出包含 "pattern" 的行
    sed -n '/pattern/p' filename
    ```