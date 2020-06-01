## 目录
1. [AJAX定义](#AJAX定义)
2. [AJAX原理](#AJAX原理)
3. [httpRequest属性](#httpRequest属性)
4. [代码](#代码)
5. [加载CSS](#加载CSS)
6. [加载JS](#加载JS)
7. [加载HTML](#加载HTML)
8. [加载XML](#加载XML)
9. [加载JSON](#加载JSON)
10. [更多信息](#更多信息)


### AJAX定义
 `AJAX`全称`Asynchronous JavaScript and XML` 是让**客户端与服务器，可以在（不必刷新整个浏览器）的情况下，与服务器进行异步通讯的技术**
 
### AJAX原理
**AJAX是浏览器上的功能**
* 浏览器可以发送请求，收到响应
* 浏览器在`window`上加了一个`XMLHttpRequest()`全局函数
* 通过`XMLHttpRequest()`函数构造出对象
* 通过这个对象来实现发送请求和收到响应

### httpRequest属性
 `onreadystatechange`: 请求状态改变的事件触发器（`readyState`变化时会调用此方法），一般用于指定回调函数
 `readyState`：请求状态`readyState`一改变，回调函数被调用，它有`5`个状态。分别为：
 
0. 未初始化
1. `open`方法成功调用以后
2. 服务器已经应答客户端的请求
3. 交互中。`Http`头信息已经接收，响应数据尚未接收。
4. 完成。数据接收完成

 响应信息\
`responseText`：服务器返回的文本内容
`responseXML`：服务器返回的兼容`DOM`的`XML`内容
`status`：服务器返回的状态码
`statusText`：服务器返回状态码的文本信息

### 代码
步骤
1. 创建`httpRequest`对象
2. 调用该对象的`open`方法
3. 监听对象的`onload` & `onerror`事件
4. `onload` & `onerror`事件可以改为`onreadystatechange && status`事件，并在这里操作文件内容，写出相应请求。
5. 调用该对象的`send`方法，发送请求。

### 加载CSS

```
getJS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/2.js");
  request.onreadystatechange = () => {
    // 完成下载，但是不知道是否下载成功
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        // 创建script标签
        const script = document.createElement("script");
        // 通过AJAX的响应修改script标签
        script.innerHTML = request.response;
        // 把script标签插入html的body中
        document.body.appendChild(script);
      } else {
        alert("加载CSS失败");
      }
    }
  };
  request.send();
};
```
### 加载JS
```
getJS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/2.js");
  request.onreadystatechange = () => {
    // 完成下载，但是不知道是否下载成功
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        // 创建script标签
        const script = document.createElement("script");
        // 通过AJAX的响应修改script标签
        script.innerHTML = request.response;
        // 把script标签插入html的body中
        document.body.appendChild(script);
      } else {
        alert("加载CSS失败");
      }
    }
  };
  request.send();
};
```
### 加载HTML
```
getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/3.html");
  request.onreadystatechange = () => {
    // 完成下载，但是不知道是否下载成功
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        // 创建div标签
        const div = document.createElement("div");
        // 通过AJAX的响应修改div标签
        div.innerHTML = request.response;
        // 把div标签插入html的body中
        document.body.appendChild(div);
      } else {
        alert("加载HTML失败");
      }
    }
  };
  request.send();
};
```
### 加载XML
```
getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/4.xml");
  request.onreadystatechange = () => {
    if ((request.readyState = 4 && request.status === 200)) {
      const dom = request.responseXML;
      const text = dom.getElementsByTagName("warning")[0].textContent;
      alert(text);
    }
  };
  request.send();
};
```
### 加载JSON
```
getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/5.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      // 把json数据转化为javasript数据
      //   const object1 = JSON.parse(request.response);

      alert(request.response);
    }
  };
  request.send();
};
```
### 更多信息
>[AJAX入门这一篇就够了](https://juejin.im/post/5a82f6e86fb9a0633f0e1f2a#heading-4)

