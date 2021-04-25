### 功能

- 负载均衡

  当一台服务器宕机，Nginx的**负载均衡**功能就会把其他的服务器分给用户访问。配置如下：

  #### nginx.conf:

  ```js
  user root	// 此处必须和当前登录用户相同，否则会报错，403——forbidden
  http{
  	...
  	
  	#本地配置分流器switcher
  	upstream switcher{
  		server localhost:3000;
  		server localhost:3001;
  	}
  	
  	server {
          #监听端口80
          listen 80;
          
          
          #nginx服务器地址
          server_name  39.100.26.51;
          
          #默认从目录寻找文件，根目录设置
          root /root/www/;
  
  		#负载均衡策略配置
          location / {
              #默认访问页面，index.html
              index index.html;
  
              # 本地代理
              # 转发到本地端口3000，pm2 start 300.js 启动文件
              # 当访问/prefix时，nginx会自动把prefix拼接在localhost:3000后访问服务，实际上最终访问的是http://localhost:3000/prefix
              # proxy_pass http://localhost:3000;
  
  
              # 负载均衡策略，调用本地配置的分流器switcher
              # proxy_pass http://switcher;
          }
          
          location /image/ {
              #为目录文件设置别名
              alias /root/www
          }
  }
  ```

  分流器可以决定访问服务器的方式，配置有如下几种：

  ```js
  #默认轮询
  switcher{
  		server localhost:3000;
  		server localhost:3001;
  	}
  #权重weight，IP的访问比与权重成正比
  switcher{
  		server localhost:3000 weight=1;
  		server localhost:3001 weight=9;
  	}
  #响应时间分配，公平竞争，谁响应快谁处理，但需要第三方插件nginx-upstream-fair
  switcher{
  		server localhost:3000;
  		server localhost:3001;
      	fair;
  	}
  ```

- 反向代理

  反向代理是把**nginx**当成一个中间处理人，可以过滤某些请求或实现负载均衡。

- Https配置

  配置server信息块中的服务器证书文件（ ssl_certificate）和私钥（ ssl_certificate_key）
  
- server模块中location规则：

  ```
  语法规则： location [=|~|~*|^~] 正则表达式 { … }
  
  =	表示精确匹配
  
  ^~	表示uri以某个常规字符串开头，理解为匹配 url路径即可。nginx不对url做编码，因此请求为/static/20%/aa，可以被规则^~ /static/ /aa匹配到（注意是空格）。以xx开头
  
  ~	表示区分大小写的正则匹配                     以xx结尾
  
  ~*	表示不区分大小写的正则匹配                以xx结尾
  
  !~和!~*分别为区分大小写不匹配及不区分大小写不匹配 的正则
  
  /	通用匹配，任何请求都会匹配到。
  
  
  
  匹配顺序：
  首先匹配 =，其次匹配^~, 其次是按文件中顺序的正则匹配，最后是交给 / 通用匹配。当有匹配成功时候，停止匹配，按当前匹配规则处理请求。
  ```

  

