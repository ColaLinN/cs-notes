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