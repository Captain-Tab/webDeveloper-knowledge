## 目录
1. [synchronous同步](#synchronous同步)
2. [asynchronous异步](#asynchronous异步)
3. [callback回调定义](#callback回调定义)
4. [代码实例](#代码实例)
5. [异步与回调的关系](#异步与回调的关系)
6. [判断同步异步](#判断同步异步)
7. [异步与回调地狱](#异步与回调地狱)
8. [回调地狱](#回调地狱)
9. [Promise定义](#Promise定义)
10. [Promise的三种状态](#Promise的三种状态)
11. [Promise的语法](#Promise的语法)
12. [Promise代码实例](#Promise代码实例)
13. [promise的链式调用](#promise的链式调用)
14. [AJAX库](#AJAX库)
15. [更多信息](#更多信息)


### synchronous同步
如果在函数返回的时候，调用者就能够得到预期结果(即拿到了预期的返回值或者看到了预期的效果)，那么这个函数就是同步的。**如果能直接拿到结果，就是同步**

举例子：在餐厅排队吃饭，必须要吃到饭你才会离开餐厅，这个等待的过程可能消耗很久也可能很短，总之吃不到饭是不会离开的

### asynchronous异步
如果在函数返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的。**如果不能直接拿到结果，就是异步**

举例子：在餐厅排队吃饭，可以取号，在等待的过程中，你可以离开餐厅，每10分钟取餐厅询问一次，称为轮询，扫码微信得到就餐通知，称为回调。

### callback回调定义
回调函数是异步操作最基本的方法。简单来说，**回调就是自己写了却不调用，给别人调用的函数**

举例：以`AJAX`为例，`request.send()`调用之后，并不能直接得到`response`,必须等到`readyState`变为`4`后,浏览器才开始回头调用`request.onreadystatechange()`, 最终我们才得到`reques.reponse`。
### 代码实例
#### 代码1：函数2调用函数1
1. `f1`函数被声明，却没有被调用
2. 把`f1`函数当成参数传给`f2`函数，
3. `f2`函数调用了`f1`函数，所以`f1`是回调
```
function f1(){}
function f2(fn){
    fn()
}
f2(f1)
```
#### 代码2：
`fn('你好')`中的`fn`就是`f1`, `fn('你好')`中的`你好`会被赋值给参数`x`
```
function f1(x){
    console.log(x)
}
function f2(fn){
    fn('你好')
}
f2(f1)
```
### 异步与回调的关系
#### 关联
异步任务需要在得到结果时通知`JS`来读取结果。等到通知的过程就是异步，通知`JS`读取结果的过程就是回调。具体实现就是让`JS`编写留下函数地址给浏览器(留下电话号码)，异步完成后浏览器调用该函数地址(拨打电话)，同时把参数传给该函数(打电话通知顾客取那桌就餐)，这个函数是用户写给浏览器调用的，所以是回调函数

#### 区别
* 异步任务需要用到回调函数来通知结果
* 回调函数却不一定存在于异步任务中，同步任务中也可以用到回调函数，例如`array.forEach(n=>{console.log(n)})`，其中`n=>{console.log(n)}`就是回调函数

### 判断同步异步
#### 异步
通常来说，如果当一个函数的返回值处于以下三种情况就是异步函数(还有其他情况，这里暂不说明)
* `setTimeout`
* `AJAX(XMLHttpRequest)`
* `AddEventListener`

`AJAX`也可以设置为同步的，例如在`request.open("get", "/style.css", false)`添加`false`。但是在请求期间会让页面卡住，阻止用户其他操作。因此, 异步才是最佳选择。
#### 代码实例
* 代码1

`摇骰子()`没有写`return`,所以返回`return undefined`。`箭头函数`返回真正的结果
```
function 摇骰子(){
    // 异步函数
    setTimeout(()=>{
    return parseInt(Math.random()*6)+1
},1000)
  //return undefined
}

const n = 摇骰子()
console.log(n) // undefined
```
* 代码2

如果拿到异步的结果？使用回调。首先声明函数，然后把函数地址传给`摇骰子()`， 然后`摇骰子()`得到结果后把结果作为参数传给`f1()`
```
function f1(x){console.log(x)}

function 摇骰子(fn){
    // 异步函数
    setTimeout(()=>{
    fn(parseInt(Math.random()*6)+1)
},1000)
  //return undefined
}

摇骰子(f1)
```
可以简化为。但是请注意，如果参数个数不一致，就不能这样简化。例如，函数中一个参数`x`和一个执行参数`x`是一致的,简化成功。
```
摇骰子( x=>{console.log(x)})  // 再简化
摇骰子(console.log)
```
简化失败的情况，参数个数不一致
```
// 输入错误结果，简化失败
const array = ['1','2','3']
array.map(parseInt) //  [1, NaN, NaN]

// 正确运行
const array = ['1','2','3']
array.map((item, i, array) =>{
    return parseInt(item)
}
```
#### 总结
* 异步任务不能拿到结果，所以需要传一个回调给异步任务
* 异步任务完成时调用回调，调用的时候把结果作为参数传给回调函数

### 异步与回调地狱
如果异步任务有两个结果，分别为成功或失败，怎么办？
#### 尝试
* 方法1: 回调接受两个参数
```
fs.readFile('./1.txt', (error, data)=>{
    if(error){ console.log('失败'); return} // 失败
    console.log(data.toString()) // 成功
}
```
* 方法2：设置两个回调
```
// 设置失败回调和成功回调
ajax('get', '/1.json', (data => {}), (error=>{}))
// 设置一个对象，根据对象的key值，来执行失败回调和成功回调
ajax('get', '/1.json', { success: ()=>{}, fail：()=>{} )
```
#### 问题
上述的方法，各自有各自的问题
1. 不规范，有人用`Sucess + error`, 有人用`success + fail`, 有人用`done + fail`
2. 容易出现回调地狱，代码让人看不懂
3. 很难进行错误处理

### 回调地狱
在使用`JavaScript`时，为了实现某些逻辑经常会写出层层嵌套的回调函数，如果嵌套过多，会极大影响代码可读性和逻辑，这种情况也被成为回调地狱。比如说你要把一个函数`A` 作为回调函数，但是该函数又接受一个函数`B`作为参数，甚至 `B`还接受`C`作为参数使用，就这样层层嵌套，人称之为回调地狱，代码阅读性非常差。比如：
```
var sayhello = function (name, callback) {
  setTimeout(function () {
    console.log(name);
    callback();
  }, 1000);
}

sayhello("first", function () {
  sayhello("second", function () {
    sayhello("third", function () {
      console.log("end");
    });
  });
});
//输出： first second third  end
```
#### 回调的相关问题
* 如何规范回调的名字或者顺序
* 如何拒绝回调地狱，让代码的可读性更强
* 如何更方便的捕获错误

### Promise定义
`Promise`本意是承诺，在程序中的意思就是承诺我过一段时间后会给你一个结果。 什么时候会用到过一段时间？答案是异步操作，异步是指可能比较长时间才有结果的才做，例如网络请求、读取本地文件等

### Promise的三种状态
* `Pending`----`Promise`对象实例创建时候的初始状态
* `Fulfilled`----可以理解为成功的状态
* `Rejected`----可以理解为失败的状态
![](https://user-gold-cdn.xitu.io/2020/3/3/1709f26e8beb2a06?w=547&h=294&f=webp&s=7016)

**这个承诺一旦从等待状态变成为其他状态就永远不能更改状态**了，比如说一旦状态变为`resolved` 后，就不能再次改变为`Fulfilled`

### Promise的语法
1. `return new Promise((resolve, reject)=>{})`
2. 任务成功则调用`resolve(result)`
3. 任务失败则调用`reject(error)`
4. `resolve`和`reject`会再去调用成功和失败函数
5. 使用`.then(success, fail)`传入成功和失败函数

### Promise代码实例
```
ajax = (method, url, options) =>{
    return new Promise((resolve, reject)=>{
        const {success, fail} = options
        const request = new XMLHttpRequest()
        request.open(method, url)
        request.onreadystatechange = () =>{
            if(request.readyState === 4){
                if(request.status < 400){
                    resolve.call(null, request.response)
                }else if(request.status >= 400){
                    reject.call(null, request)
                }
            }
        }
        request.send()
    })
}

ajax('get', '/xxx')
    .then((reponse)=>{}, (request, status)=>{})
```
### promise的链式调用

* 每次调用返回的都是一个新的`Promise`实例(这就是`then`可用链式调用的原因)
* 如果`then`中返回的是一个结果的话会把这个结果传递下一次`then`中的成功回调
* 如果`then`中出现异常,会走下一个`then`的失败回调
* 在 `then`中使用了`return`，那么`return` 的值会被`Promise.resolve()`
* `then`中可以不传递参数，如果不传递会透到下一个`then`
* `catch`会捕获到没有捕获的异常

以上代码的缺点
* 无法上传数据，因为`send()`这里没有使用`POST`方法, 上传数据
* 无法设置请求头，没有使用`request.setRequestHeader(key, value)`

### AJAX库
`jQuery.ajax`是目前比较完美的`AJAX`库
* 支持更多形式的参数
* 支持`Promise`
* 支持超多功能

`axios`是目前最新的`AJAX`库
* `JSON`自动处理: `axios`发现响应的`Cotent-Type`是`json`,就会自动调用`JSON.parse`
* 请求拦截器: 用户可以在所有请求里加些东西，比如查询参数
* 响应拦截器: 用户可以自定义所有响应，修改内容
* 可以生成不同对象：不同的实例，可以设置不同的配置，用于复杂场景


### 更多信息
>[Promise MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

>[【翻译】Promises/A+规范](https://www.ituring.com.cn/article/66566)

>[Javascript异步编程的4种方法](https://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)

>[JS 异步编程六种方案](https://juejin.im/post/5c30375851882525ec200027)

>[jQuery API 中文文档](https://www.jquery123.com/)

>[axios中文文档|axios中文网](http://www.axios-js.com/zh-cn/docs/)

>[Axios 作弊表（Cheat Sheet）](https://juejin.im/post/5a9cddb46fb9a028bc2d3c2f)

