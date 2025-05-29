# HTTPs Setup

## CURL看HTTPs的全流程

```
curl -v https://google.com
```

## DNS

如果想要debug域名的DNS配置，可以运行下面的命令

```
dig google.com
```

## Certificate

如果要配置https网站，需要配置SSL/TLS证书，也就是

给网站配置 HTTPS 主要是通过配置 **SSL/TLS 证书** 来实现的。下面是通用的配置步骤，适用于大多数网站和服务器类型：

### 第一步：获取 SSL/TLS 证书

有两种方式：

1. 使用免费证书（推荐）

- **Let's Encrypt**：最流行的免费 SSL 证书提供商，自动续期。
- 工具：`Certbot` 是最常用的自动化工具。

2. 购买商业证书（付费）

- 提供商如：DigiCert、Sectigo、GeoTrust 等。
- 一般提供更高的验证级别（如 OV/EV），适用于企业或电商。

### 第二步：配置服务器（根据你的 Web 服务器类型）

如果你用的是 **Nginx**：

```bash
# 示例配置
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        root /var/www/html;
        index index.html index.htm;
    }
}
```

如果你用的是 **Apache**：

启用 SSL 模块：

```bash
sudo a2enmod ssl
sudo service apache2 restart
```

配置虚拟主机 `/etc/apache2/sites-available/example.conf`：

```apache
<VirtualHost *:443>
    ServerName example.com
    DocumentRoot /var/www/html

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem
</VirtualHost>
```

### 第三步：自动续期（Let’s Encrypt）

如果使用 `certbot`，设置自动续期：

```bash
sudo crontab -e
# 加入这行，每天检查并自动续期
0 3 * * * certbot renew --quiet
```

###  第四步：测试 HTTPS 是否生效

- 访问 `https://yourdomain.com`
  - 使用 SSL 测试工具（如 [SSL Labs](https://www.ssllabs.com/ssltest/)）检查配置是否正确。

### 第五步（可选）：强制使用 HTTPS

- 通过 301 重定向强制 HTTP 自动跳转到 HTTPS（上面已示范）。
- 或在 Web 应用代码中启用 HSTS（HTTP Strict Transport Security）：

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

如果你提供你的服务器环境（如操作系统、Web服务器、是否有控制面板如宝塔、cPanel 等），我可以给你更具体的步骤。需要帮忙配置吗？

## 证书颁发

执行下面命令查看example.com的证书颁发者

```
openssl s_client -connect example.com:443 -showcerts
```

截至目前（2025年），`example.com` 的证书一般是由：

```vbnet
Let's Encrypt Authority X3 或 R3（中间 CA）
```

颁发，根证书通常是：

```mathematica
ISRG Root X1
```

也就是说：

```vbnet
example.com（网站证书）
⬑ Let's Encrypt R3（中间证书）
⬑ ISRG Root X1（根证书，预装在操作系统和浏览器中）
```

## 证书验证

###  验证证书链中的签名
客户端拿到服务器证书后，进行以下验证步骤：

假设这个证书是 `example.com` 的，颁发者是 `DigiCert Inc`：

1. **读取证书的“签名”字段。**
   - 这是一个加密的哈希值，是 DigiCert 用它自己的私钥加密过的。
2. **计算证书本身的数据摘要（哈希值）。**
   - 客户端自己用同样的哈希算法计算证书内容的摘要。
3. **找到 DigiCert 的公钥（在你的 `/etc/ssl/cert.pem` 或系统钥匙串中）。**
4. **用这个公钥解密“签名”。**
   - 得到原来的哈希值。
5. **对比两个哈希值是否一致：**
   - 一致：说明签名有效，证书没有被篡改，且确实是 DigiCert 签发的。
   - 不一致：说明证书不可信，连接中断。

这个过程就叫做 **验证证书链中的签名**。

### 证书链

1. `example.com` 的证书由中间 CA（如 DigiCert SHA2 Secure Server CA）签发。
2. 这个中间 CA 又由根 CA（如 DigiCert Global Root CA）签发。
3. 根 CA 的证书是预先安装在系统里的（例如 `/etc/ssl/cert.pem` 里）。

验证顺序是：

```
example.com → 中间CA → 根CA → 系统信任
```

如果根 CA 不在你的系统信任列表中，整个链条就断了，验证失败。

### 总结一句话

客户端通过“用公钥解密签名”和“自己算 hash 比对”来验证证书是否真的由某个可信的机构签发。这种机制确保了：

- 网站身份真实
- 数据传输加密安全
- 不被中间人伪造或篡改