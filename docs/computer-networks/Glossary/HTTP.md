



HTTP持久连接，keep-alive，

管道化pipelining（并发？），不需要的等待之前的请求结束就能发送下一个请求



编码提高传输效率

- 报文（message）是HTTP通信的基本单位，由8位字节流（octet sequence）组成
- 实体（entity）是请求或响应的有效载荷，由实体头部和实体主体组成

通常报文主体等于实体主体，只有当传输中有编码操作时，才会导致实体主体的内容发生变化，导致其与报文主体产生差异（？）。



压缩传输的内容编码

- gzip（GNU zip）
- compress（UNIX系统标准压缩）
- deflate（zlib）
- identity



分割发送的分块传输编码（Chunked Tansfer Coding），将实体主体分成多个部分，每一块都用十六进制来标记块的大小，而实体主体的最后一块会使用0（CR+LF）





多部分对象集合

MIME（Multipurpose Internet Mail Extensions）

- multipart/form-data
  - Web表单文件上传时使用
- multipart/byteranges
  - 状态码206，响应报文包含了多个范围的内容时使用



活动区部分内容的范围请求（Range Request），可以从之前下载的中断处恢复下载

Request

- GET /tip.jpg HTTP/1.1
- Host: www.usagidesign.jp
- Range: bytes =5001-10000

Response

- HTTP/1.1 206 Partial Content
- Content-Range: bytes 5001-10000/10000
- Content-Length: 5000
- Content-Type: image/jpeg

如果是多重范围，响应会有状态吗206 Partial Content，且会在首部字段Content-Type表明multipart/byteranges后返回响应报文



内容协商（Contnet Negotiation）

- Accept
- Accept-Charset 字符集
- Accept-Encoding 编码
- Accept-Language
- Content-Language

服务器驱动协商（Server-driven Negotiation），以浏览器发送的信息作为判断标准.

客户端驱动协商（Agent-driven Negotiation），用户可以在客户端进行选择。

透明协商（Transparent Negotiation），是服务器驱动和客户端驱动的结合体，服务器和客户端各自进行内容协商的一种办法。



