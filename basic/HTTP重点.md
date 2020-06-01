## 目录
1. [HTTP请求响应过程](#HTTP请求响应过程)
2. [HTTP请求方法](#HTTP请求方法)
3. [发送HTTP请求](#发送HTTP请求)
4. [响应HTTP请求](#响应HTTP请求)
5. [HTTP请求 ](#HTTP请求)
6. [HTTP响应](#HTTP响应)
7. [Curl命令构造HTTP请求](#Curl命令构造HTTP请求)
8. [Node.js读取HTTP请求](#Node.js读取HTTP请求)
9. [Node.js设置HTTP响应](#Node.js设置HTTP响应)
10. [404](#404)
11. [更多信息](#更多信息)

### HTTP请求响应过程
你是不是很好奇，当你在浏览器中输入网址后，到底发生了什么事情？你想要的内容是如何展现出来的？让我们通过一个例子来探讨一下，我们假设访问的 `URL` 地址为 `http://www.someSchool.edu/someDepartment/home.index`，当我们输入网址并点击回车时，浏览器内部会进行如下操作

1. `DNS`服务器会首先进行域名的映射，找到访问`www.someSchool.edu`所在的地址，然后`HTTP` 客户端进程在`80`端口发起一个到服务器`www.someSchool.edu`的`TCP`连接（`80`端口是`HTTP` 的默认端口）。在客户和服务器进程中都会有一个套接字与其相连。
2. `HTTP`客户端通过它的套接字向服务器发送一个`HTTP`请求报文。该报文中包含了路径 `someDepartment/home.index`的资源，我们后面会详细讨论`HTTP`请求报文。
3. `HTTP`服务器通过它的套接字接受该报文，进行请求的解析工作，并从其存储器(`RAM` 或磁盘)中检索出对象`www.someSchool.edu/someDepartment/home.index`，然后把检索出来的对象进行封装，封装到`HTTP`响应报文中，并通过套接字向客户进行发送。
4. `HTTP`服务器随即通知`TCP`断开`TCP`连接，实际上是需要等到客户接受完响应报文后才会断开`TCP` 连接。
5. `HTTP`客户端接受完响应报文后，`TCP`连接会关闭。`HTTP`客户端从响应中提取出报文中是一个 `HTML`响应文件，并检查该`HTML`文件，然后循环检查报文中其他内部对象。
6. 检查完成后，`HTTP`客户端会把对应的资源通过显示器呈现给用户。

至此，键入网址再按下回车的全过程就结束了。上述过程描述的是一种简单的请求-响应全过程，真实的请求-响应情况可能要比上面描述的过程复杂很多。

### HTTP请求方法
`HTTP`请求方法一般分为`8`种，它们分别是

* `GET` 获取资源，`GET` 方法用来请求访问已被`URI` 识别的资源。指定的资源经服务器端解析后返回响应内容。也就是说，如果请求的资源是文本，那就保持原样返回
 * `POST`传输实体，虽然`GET`方法也可以传输主体信息，但是便于区分，我们一般不用`GET` 传输实体信息，反而使用`POST`传输实体信息
* `PUT`传输文件，`PUT`方法用来传输文件。就像`FTP` 协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存到请求`URI`指定的位置。
但是，鉴于`HTTP`的`PUT`方法自身不带验证机制，任何人都可以上传文件 , 存在安全性问题，因此一般的`Web`网站不使用该方法。若配合`Web` 应用程序的验证机制，或架构设计采用`REST`（`REpresentational State Transfer`，表征状态转移）标准的同类 `Web` 网站，就可能会开放使用 `PUT` 方法。
* `HEAD` 获得响应首部，`HEAD` 方法和 `GET` 方法一样，只是不返回报文主体部分。用于确认 `URI` 的有效性及资源更新的日期时间等。
* `DELETE` 删除文件，`DELETE` 方法用来删除文件，是与 `PUT` 相反的方法。`DELETE` 方法按请求 `URI` 删除指定的资源。
* `OPTIONS` 询问支持的方法，`OPTIONS` 方法用来查询针对请求 `URI` 指定的资源支持的方法。
* `TRACE` 追踪路径，`TRACE` 方法是让 `Web` 服务器端将之前的请求通信环回给客户端的方法。
* `CONNECT` 要求用隧道协议连接代理，`CONNECT` 方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行 `TCP` 通信。主要使用 `SSL`（`Secure Sockets Layer`，安全套接层）和 `TLS`（`Transport Layer Security`，传输层安全）协议把通信内容加 密后经网络隧道传输。

我们一般最常用的方法也就是 `GET` 方法和 `POST` 方法，其他方法暂时了解即可。下面是 `HTTP1.0` 和 `HTTP1.1` 支持的方法清单
![](https://user-gold-cdn.xitu.io/2020/2/7/1701d8dfb72a6cf0?w=626&h=341&f=jpeg&s=47924)


### 发送HTTP请求
#### 方法
* 使用`Chrome`地址栏
* 使用`curl`命令`curl -v http://baidu.com` 或者 `curl -s -v -- https://www.baidu.com`

#### User Agent
`User Agent`用户代理是协助用户发送请求的工具

### 响应HTTP请求
#### 初始代码
```
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`二哈`)
    response.end()
  } else if(path === '/x'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`body{color: red;}`)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
```

#### 运行以上代码
* 将以上代码复制到文件夹中，命名`server.js`
* 运行`server.js`, `node server.js`
* 发送`HTTP`请求`curl http://127.0.0.1:8888/x`
* 在服务端可以看到响应

#### 注意事项
* 以上为服务器代码，存放于服务器
* `path`是不带查询参数的路径`/x`
* `pathWithQuery`是带查询参数的路径，一般不用
* `query`是带查询参数的对象形式`{a:'1'}`
* `queryString`是查询参数的字符串形式`?a=1`
* `request`是请求对象
* `response`是响应对象
* `URL`后缀没有作用，`/X.css`不一定是`CSS`文件

#### 代码解析
语法
* `字符串` 里面可以回车，不破坏语法逻辑
* `'字符串'`里面不可以回车，回车为`'字符串\n'`

逻辑
* 首先，收到请求后执行中间的代码
* 然后，使用`if else`判断路径，返回响应
* 查看是否为已知路径，是返回`200`，如果是未知路径，返回`404`
* `Conent-Type`表示内容的`'类型/语法'`，决定了文件类型
* `reponse.write()`可以填写返回的内容
* `reponse.end()`表示发送响应给用户


### HTTP请求
#### 请求内容
* 开头为`GET/HTTP/1.1`，结构为 请求动词/路径加查询参数 协议名/版本
* 接着，为请求代码，具体为
```
host: 域名或者IP
Accept: text/html /*通知服务器可以接受的文件类型*/
Content-Type: 请求体格式 
```
* `>` 这一行为空，回车
* 然后是请求内容

### HTTP响应
#### 响应内容
* 开头为`HTTP/1.1 200 OK`结构为协议名/版本 + 状态码 + 状态字符串
* `Content-Type`: 响应的格式
* `>` 这一行为空，回车
* 然后是响应内容

### Curl命令构造HTTP请求
#### 用法
* `curl -v http://baidu.com`
* `curl -s -v -- https://www.baidu.com`

#### 语法
* 设置请求动词`curl -v -x POST http://****:8888/` 注意大小写
* 设置路径和查询参数`curl -v -x POST http://****:8888/xxx?wd=hi`

* 设置请求头 `curl -v -x POST -H  'Accept: text/html' http: //****:8888/`
* 设置请求体`curl -v -x POST -H  'Accept: text/html' -H 'Content-Type: text/plain;chartset=utf-8'-d '请求体内容' http: //****:8888/`

#### 注意事项
* `url`会被`curl`工具重写，先请求`DNS`获得`IP`
* 先进行`TCP`连接，成功后发送`HTTP`请求
* 相应结束，关闭`TCP`连接，结束

### Node.js读取HTTP请求
#### 读取请求动词
```
var method = request.method
***
console.log("method: ");
```
#### 读取路径
* `request.url`路径，带查询参数
* `path`纯路径，不带查询参数
* `query`只有查询参数

#### 读取请求头
`request.headers['Accept']`

### Node.js设置HTTP响应
* 设置响应状态码`reponse.statusCode=200`
* 设置响应头`reponse.setHeaders('Content-Type'，'text/html')`
* 设置响应体`reponse.write('内容')`，可以分两次写，追加内容

### 404
`404`，是一种`HTTP`状态码，指网页或文件未找到。
`HTTP 404`或`Not Found`错误信息是`HTTP`的其中一种“标准回应信息”（`HTTP`状态码），此信息代表客户端在浏览网页时，服务器无法正常提供信息，或是服务器无法回应且不知原因。
#### console.log()调试错误
* 检测变量是否存在
* 检查条件是否成立

## 更多信息
> [看完这篇HTTP，跟面试官扯皮就没问题了](https://juejin.im/post/5e1870736fb9a02fef3a5dcb)

> [Node.js dev](https://nodejs.dev/)

> [RFC HTTP 1.0](https://tools.ietf.org/html/rfc2616)

> [RFC HTTP Request](https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html)

> [RFC HTTP Reponse](https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html)