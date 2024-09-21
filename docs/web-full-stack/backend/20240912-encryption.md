

# Encryption, Signature, and Hash

## 加密算法

1. 对称加密
2. 非对称加密
   1. RSA
   1. SHA256

## 签名算法

> TODO

## 哈希摘要算法

>  TODO

## 实践

### HTTP API 内的认证

两个企业的 HTTPS API 对接，主要使用非对称加密。

双方各自生成非对称密钥对、申请证书，双方交换证书（证书中含有公钥）。

当企业 A 请求企业 B 时

1. 加密。如需对内容加密。可以用企业 B 的公钥加密，加密后的内容只有拥有私钥的企业 B 才能够解密。
2. 签名。如需对内容生成校验码。可以用企业 A 的私钥加密，加密后的内容可以用企业 A 的公钥才能够解密，并且可以和传递的内容作对比校验。由于只有企业 A 有私钥，所以其他企业都无法篡改这个校验码。

> TODO

## More

> TODO

- HMAC（AK/SK）认证
- HTTPS SSH 认证
- SSL 证书，letsencrypt get free certificate https://letsencrypt.org/ and auto-refresh tools
- SSH vs SSL？
- SSL 证书之于 HTTPS

