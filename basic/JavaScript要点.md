## 目录
1. [什么是闭包？闭包的用途是什么？闭包的缺点是什么？](#什么是闭包？闭包的用途是什么？闭包的缺点是什么？)
2. [call()、apply()、bind()的用法分别是什么？](#call()、apply()、bind()的用法分别是什么？)
3. [请说出至少10个HTTP状态码并描述各状态码的意义](#请说出至少10个HTTP状态码并描述各状态码的意义)
4. [如何实现数组去重？](#如何实现数组去重？)
5. [关于DOM事件](#关于DOM事件)
6. [你如何理解JS的继承？](#你如何理解JS的继承？)
7. [排序算法](#排序算法)
8. [你对Promise的了解？](#你对Promise的了解？)
9. [关于跨域](#关于跨域)
10. [说说你对前端的理解](#说说你对前端的理解)
11. [更多信息](#更多信息)


### 什么是闭包？闭包的用途是什么？闭包的缺点是什么？
#### Closure 闭包
定义

函数与对其状态即词法环境（`lexical environment`）的引用共同构成闭包（`closure`）。也就是说，闭包可以让你从内部函数访问外部函数作用域。**简单来说，闭包 = 函数 + 函数能够访问外部变量** 在`JavaScript`，函数在每次创建时生成闭包。

原理
在下面的实例中，就存在了`closure`闭包, 如果一个函数用到了外部的变量，那在这里，外部变量`a`和`f3`函数就组成了闭包。
```
 function f2(){
        let a  = 2
        function f3(){
            console.log(a)
        }
    }
```

用途
1. 闭包常常用来间接访问一个变量。通过暴露一个函数，让别人可以间接访问
2. 让这些变量的值始终保持在内存中，不会在外部函数被调用后被自动清除。

缺点
1. 闭包会使得函数中的变量都被保存在内存中，使得占用很多内存，所以不能滥用闭包，否则会造成网页的性能问题，在`IE`中可能导致内存泄露。
解决方法是，在退出函数之前，将不使用的局部变量全部删除。

2. 闭包会在父函数外部，改变父函数内部变量的值。
解决方法是, 不要随便改变父函数内部变量的值。

### call()、apply()、bind()的用法分别是什么？
#### call() 方法
定义

`call()`方法可以用来在一个对象调用另一个对象的方法，也可以改变调用方法`this`的指向

语法
```
function.call(thisArg,arg1,arg2,...)
```
实例
```
function a(){
	console.log(this);
}
a();   // this 默认指向window
a.call({name:"西瓜"}); this指向传入的对象{name:"西瓜"}
```
#### apply() 方法
定义

`call()`,`apply()`方法区别是,从第二个参数起,`call()`方法参数将依次传递给借用的方法作参数,而`apply()`直接将这些参数放到一个数组（或类似数组的对象）中再传递, 最后借用方法的参数列表是一样的。

语法
```
function.apply(this,[argumentsArray])
```
实例
```
let array = ['a', 'b'];
let elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```
#### bind() 方法
定义

`bind()`也是函数的方法，作用也是改变`this`执行，同时也是能传多个参数。与`call`和`apply`不同的是`bind`方法不会立即执行，而是**返回一个改变上下文`this`指向后的函数，原函数并没有被改变**

语法
```
function.bind(this,arg1,arg2,arg3,...)
```
实例
```
let person = {
  name: 'Abiel'
}
function sayHi(age,sex) {
  console.log(this.name, age, sex);
}
let personSayHi = sayHi.bind(person, 25)
personSayHi('男') // Abiel 25 男
```

### 请说出至少10个HTTP状态码并描述各状态码的意义
#### 以 `1xx`为开头的表示继续或者切换协议
| 状态码	   | 含义  |
|  ----  | ----  |
|100|继续。客户端应继续其请求|
|101|切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议|

#### 以 `2xx` 为开头的都表示请求成功响应
| 状态码	   | 含义  |
|  ----  | ----  |
|200	  |  成功响应|
|204	  |    请求处理成功，但是没有资源可以返回 |
|206	  |      对资源某一部分进行响应，由Content-Range 指定范围的实体内容 |

#### 以 `3xx` 为开头的都表示需要进行附加操作以完成请求

| 状态码	   | 含义  |
|  ----  | ----  |
|301	  | 永久性重定向，该状态码表示请求的资源已经重新分配  URI，以后应该使用资源现有的 URI|
|302	  | 临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望用户（本次）能使用新的 URI 访问|
|303	  |该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源 |
|304      |该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况 |
|307      |临时重定向。该状态码与 302 Found 有着相同的含义。 |

#### 以 `4xx` 的响应结果表明客户端是发生错误的原因所在
| 状态码	   | 含义  |
|  ----  | ----  |
|400|该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求|
|401|该状态码表示发送的请求需要有通过 HTTP 认证（BASIC 认证、DIGEST 认证）的认证信息 |
|403|该状态码表明对请求资源的访问被服务器拒绝了 |
|404|该状态码表明服务器上无法找到请求的资源 |

#### 以`5xx`为开头的响应标头都表示服务器本身发生错误

| 状态码	   | 含义  |
|  ----  | ----  |
|500|该状态码表明服务器端在执行请求时发生了错误|
|503|该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求 |

### 如何实现数组去重？
假设有数组`array = [1,5,2,3,4,2,3,1,3,4]`。你要写一个函数`unique`，使得`unique(array)` 的值为 `[1,5,2,3,4]`.也就是把重复的值都去掉，只保留不重复的值。

要求写出两个答案：

1. 一个答案不使用 `Set` 实现
2. 一个答案使用 `Set` 
3. 使用了 `Map / WeakMap` 以支持对象去重

#### 答案1：不使用Set去重
新建一个数组，遍历原来的数组，值不在新数组就`push`进该新数组中
缺点:`IE8`以下不支持数组的`indexOf`方法
```
let array = [1,5,2,3,4,2,3,1,3,4]
const unique = (array) =>{ 
  let emptyArray = []
  for(let i=0;i<array.length;i++){
    if(emptyArray.indexOf(array[i]) === -1){
      emptyArray.push(array[i])
    }
  }
  return emptyArray
}
console.log(unique(array))
```
外层循环元素，内层循环时比较值。值相同时，则在数组里删去这个值。
缺点：嵌套循环，占用内存高，速度慢
```
let array = [1,5,2,3,4,2,3,1,3,4]
const unique = (array) =>{ 
  for(let i=0;i<array.length-1;i++){
    for(let j = i+1; j<=array.length-1; j++){
      if(array[i] === array[j]){
       array.splice(i, 1)
       j--
      }
    }
  }
   return array
}
console.log(unique(array))
```
利用`sort()`排序方法，然后根据排序后的结果进行遍历及相邻元素比对
缺点：在开发过程中发现，各个浏览器上的`Array.prototype.sort`内部算法实现机制不一样，导致执行结果有偏差,不兼容`IE8`以下版本
```
let array = [1,5,2,3,4,2,3,5,3,4]
const unique = (array) =>{ 
    let arr = array.sort()
    let firstElement= [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            firstElement.push(arr[i]);
        }
    }
    return firstElement;
}
console.log(unique(array))
```

#### 答案2：使用Set去重
缺点：兼容性问题，有些旧的浏览器不支持
```
let array = [1,5,2,3,4,2,3,5,3,4]
const unique = (array) =>{ 
  return Array.from(new Set(array))
}
console.log(unique(array))
```
#### 答案3：使用Map去重
缺点：兼容性问题，有些旧的浏览器不支持
```
let array = [1,5,2,3,4,2,3,5,3,4]
const unique =(array)=> {
    //定义常量 res,值为一个Map对象实例
    const res = new Map();
    
    //返回arr数组过滤后的结果，结果为一个数组
    //过滤条件是，如果res中没有某个键，就设置这个键的值为1
    return array.filter((a) => !res.has(a) && res.set(a, 1))
}
console.log(unique(array))
```

### 关于DOM事件
1. 什么是事件委托？
2. 怎么阻止默认动作？
3. 怎么阻止事件冒泡？

#### 事件委托
事件委托`Event Delegation`: 又称之为事件委托。是`JavaScript`中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定在子元素的响应事件（`click`、`keydown......`）委托给父元素，让父元素担当事件监听的职务。事件代理的原理是`DOM`元素的事件冒泡。

比如一个宿舍的同学同时快递到了，一种方法就是他们一个个去领取，还有一种方法就是把这件事情委托给宿舍长，让一个人出去拿好所有快递，然后再根据收件人一 一分发给每个宿舍同学。在这里，取快递就是一个事件，每个同学指的是需要响应事件的`DOM` 元素，而出去统一领取快递的宿舍长就是代理的元素，所以真正绑定事件的是这个元素，按照收件人分发快递的过程就是在事件执行中，需要判断当前响应的事件应该匹配到被代理元素中的哪一个或者哪几个。

#### 阻止默认动作
1. `preventDefault()`方法取消浏览器对当前事件的默认行为，无返回值。（`IE8`-浏览器不支持该方法）
2. `returnValue`属性可读写，默认值是`true`，但将其设置为`false`就可以取消事件的默认行为，与`preventDefault()`方法的作用相同。（`firefox`和`IE9+`浏览器不支持）
3. `return false`方法。 `HTML5`规范中有指出在`mouseover`等几种特殊事件情况下，`return false`并不一定能终止事件。所以，在实际使用中，我们需要尽量避免通过`return false`的方式来取消事件的默认行为。

具体代码
```
function cancelHandler(event) {
    var event = event || window.event;//兼容IE        
    //取消事件相关的默认行为    
    if (event.preventDefault)    //标准技术        
        event.preventDefault();
    if (event.returnValue)    //兼容IE9之前的IE        
        event.returnValue = false;
    return false;    //用于处理使用对象属性注册的处理程序
}
```
#### 阻止事件冒泡
1. `e.stopPropagation()`。在支持 `addEventListener()`的浏览器中，可以调用事件对象的一个 `stopPropagation()` 方法已阻止事件的继续传播。如果在同一对象上定义了其他处理程序，剩下的处理程序将依旧被调用，但调用`stopPropagation()`方法可以在事件传播期间的任何时间调用，它能工作在捕获阶段、事件目标本身中和冒泡阶段。

2. `window.event.cancelBubble = true`。`IE9` 之前的`IE`不支持`stopPropagation()` 方法。相反，`IE`事件对象有一个 `cancleBubble` 属性，设置这个属性为 `true`能阻止事件进一步传播。`IE8`及之前版本不支持事件传播的捕获阶段，所以冒泡是唯一待取消的事件传播。


具体代码
```
function stopHandler(event)  
    window.event?window.event.cancelBubble=true:event.stopPropagation();  
}
```

### 你如何理解JS的继承？
1. 答出基于原型的继承
2. 答出基于`class`的继承

**`JS`继承的原理: `A`对象通过继承`B`对象，就能直接拥有`B`对象的所有属性和方法**
#### 原型链继承
子类型的原型为父类型的一个实例对象，子类继承父类的属性和方法是将父类的私有属性和公有方法都作为自己的公有属性和方法。其中寄生组合继承是业内最通用的好方法，这里不做介绍。

实例代码
```
//父类型
function Person(name,age){
    this.name=name,
    this.age=age,
    this.play=[1,2,3]
    this.setName=function(){}
}
Person.prototype.setAge=function(){}
//子类型
function Student(price){
    this.price=price
    this.setScore=function(){}
}
Student.prototype=new Person()//子类型的原型为父类型的一个实例对象
let s1=new Student(15000)
let s2=new Student(14000)
console.log(s1,s2)
```
#### class的继承 
`ES6`继承是通过`class...extends...`关键字来实现继承。子类通过使用`extends`继承父类的方法和变量的形式来实现继承，方式比`ES5`通过原型来继承简单的多。`ES6 class` 实现继承的核心在于使用关键字 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super` 关键字，`super(name)`相当于es5继承实现中的 `SuperType.call(this, name)`

实例代码
```
class Person{
//调用类的构造方法
    constructor(name,age){
        this.name=name
        this.age=age
    }
    showName(){
        console.log("调用父类的方法")
        console.log(this.name,this.age);
    }
}
let p1=new Person('kobe',39)
console.log(p1)
//定义一个子类
class Student extends Person{
    constructor(name,age,salary){
        super(name,age)//通过super调用父类的构造方法
        this.salary=salary
    }
    showName(){
        console.log("调用子类的方法")
        console.log(this.name,this.age,this.salary);
    }
}
let s1=new Student('wade',38,100000)
console.log(s1)
s1.showNmae()
```
#### 总结
* `ES5`中：
1. 利用借用构造函数实现 实例属性和方法的继承 ；
2. 利用原型链或者寄生式继承实现 共享的原型属性和方法的继承 。
* `ES6`中：
1. 利用`class`定义类，`extends`实现类的继承；
2. 子类`constructor`里调用`super()`（父类构造函数）实现 实例属性和方法的继承；
3. 子类原型继承父类原型，实现 原型对象上方法的继承。


### 排序算法
给出正整数数组 `array = [2,1,5,3,8,4,9,5]`
请写出一个函数 `sort`，使得 `sort(array)` 得到从小到大排好序的数组 `[1,2,3,4,5,5,8,9]`
新的数组可以是在 `array` 自身上改的，也可以是完全新开辟的内存。不得使用 `JS` 内置的 `sort API`。任意选择一个排序算法。

#### quickSort快速排序算法
思路
以某个数为基准，比它小的去前面，比它大的去后面，重复操作，就可以得到完整的排序

实例代码 
```
const quickSort = function(arr) {
if (arr.length <= 1) { return arr; }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
           left.push(arr[i]);
        }else{
           right.push(arr[i]);
       }
    }

return  quickSort(left).concat([pivot],  quickSort(right));

};

let array = [2,1,5,3,8,4,9,5]
const resultArray =  quickSort(array)
console.log(resultArray) // 结果为：[1, 2, 3, 4, 5, 5, 8, 9]
```

### 你对Promise的了解？
0. `Promise` 的用途
1. 如何创建一个 `new Promise`
2. 如何使用 `Promise.prototype.then`
3. 如何使用 `Promise.all`
4. 如何使用 `Promise.race`

#### `Promise` 的用途
**`Promise`的出现是对异步和回调函数的一种改良**，使用`promise`,可以解决以下问题
1. 规范回调的名字或者顺序
2. 拒绝回调地狱，让代码的可读性更强
3. 更方便的捕获错误

#### 如何创建一个`new Promise` 

`Promise`的语法

1. `return new Promise((resolve, reject)=>{})`
2. 任务成功则调用`resolve(result)`
3. 任务失败则调用`reject(error)`
4. `resolve`和`reject`会再去调用成功和失败函数
5. 使用`.then(success, fail)`传入成功和失败函数

#### 如何使用`.then`
`Promise`实例具有then方法，`then`方法是定义在原型对象`Promise.prototype上`的。`.then`接受两个回调函数。第一个回调函数是状态改变`fufilled`时调用的，第二个回调函数(可选)是状态改变`rejected`时调用的。

语法

`then`方法的调用方法是写一个回调方法，来执行成功后的回调。`then`方法返回一个的是一个新的`Promise`实例，因此我们可以采用链式写法，即`then`方法后面再调用一个`then`方法。

实例代码
```
new Promise((resolve, reject) => {
  resolve('王小端Coder');
}).then(res => res).then(res => {
  console.log(res); // 王小端Coder
});
```

#### 如何使用 `Promise.all`
`Promise.all`方法用于将多个`Promise`实例，包装成一个新的`Promise`实例。在`all`方法中可以传递多个`Promise`对象，当所有的`Promise`对象状态都返回`fufilled`，才会返回`fulfilled`，否则返回`rejected`。

实例代码
```
const promise1 = new Promise((resolve, reject) => {
  resolve();
})
const promise2 = new Promise((resolve, reject) => {
  resolve();
})
const promise3 = new Promise((resolve, reject) => {
  resolve();
})

const promiseAll = Promise.all([promise1, promise2, promise3]).then(res => {
  console.log('all');
})

```
#### 如何使用 `Promise.race`

`Promise.race`方法同样是将多个`Promise`实例，包装成一个新的`Promise`实例。可以传递多个`Promise`对象作为参数，如果实例中有一个实例率先改变状态，那么`race`的状态就会跟着改变。

实例代码
```
const promise1 = new Promise((resolve, reject) => {
  reject();
})
const promise2 = new Promise((resolve, reject) => {
  resolve();
})
const promise3 = new Promise((resolve, reject) => {
  reject();
})

const promiseRace = Promise.race([promise1, promise2, promise3]).then(res => {
  console.log('race then');
}).catch(error => {
  console.log('race catch');
})
```
### 关于跨域
#### 什么是同源
**同源是指域名，协议，端口完成一致，那么这两个url就是同源**。同源策略是一种约定，它是浏览器最核心也最基本的安全功能，也是浏览器故意设置的一个功能限制。如果缺少了同源策略，浏览器很容易受到`XSS`、`CSFR`等攻击。使用代码`window.origin`或者`location.origin`可以获取当前的源。源 = 协议+域名+端口号。
#### 什么是跨域
跨域`Cross-Domain`：**跨域是指从一个域名的网页去请求另一个域名的资源**。比如从`www.baidu.com`页面去请求`www.google.com` 的资源。但是一般情况下不能这么做，它是由浏览器的同源策略造成的，是浏览器对`JavaScript`施加的安全限制。跨域的严格一点的定义是：**只要协议，域名，端口有任何一个的不同，就被当作是跨域**
#### 什么是JSONP跨域
* 定义

填充式json(JSON with Padding): 是应用`JSON`的一种新方法，只不过是被包含在函数调用中的`JSON`。

`JSONP`由两部分组成：**回调函数**和**数据**。回调函数是当响应到来时应该在页面中调用的函数，而数据就是传入回调函数中的`JSON`数据。
* 原理

**利用 `<script>`标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的`JSON` 数据**。通过`script`标签引入一个`js`文件，这个`js`文件载入成功后会执行我们在`url`参数中指定的函数，并且会把我们需要的`json`数据作为参数传入。所以`jsonp`是需要服务器端的页面进行相应的配合的。（即用`javascript`动态加载一个`script`文件，同时定义一个`callback`函数给`script`执行而已。）在`js`中，我们直接用`XMLHttpRequest`请求不同域上的数据时，是不可以的。但是，在页面上引入不同域上的`js`脚本文件却是可以的，`jsonp`正是利用这个特性来实现的。注意：`JSONP`请求一定需要对方的服务器做支持才可以。
#### 什么是CORS 跨域
* 定义

跨域资源共享`Cross-Origin Resource Sharing`:  定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。`CORS`背后的基本思想就是使用自定义的`HTTP`头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败。

* 原理
  
浏览器会自动进行`CORS`通信，实现`CORS` 通信的关键是后端。只要后端实现了`CORS`，就实现了跨域。如果浏览器检测到相应的设置，就可以允许`Ajax`进行跨域的访问。

**服务端通过设置`Access-Control-Allow-Origin`就可以开启`CORS`**。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

### 说说你对前端的理解
1. 前端学习入门容易，深入难。前端开发的学习曲线是先快后慢。
2. 前端学习广度大，一名优秀的前端开发人员，需要了解，从设计，到服务器，网络协议，浏览器，JS等等知识。比如，优秀的前端开发人员就是一个大厨，需要把炒一碗大杂烩，需要把不同的原料混在一起，翻炒，搭配出绝佳的味道。
3. 前端知识更新速度快，各种各样的框架像是雨后春笋般的冒出，前端开发人员需要坚持学习，与时俱进。
4. 最后，作为和用户距离最近的开发人员，前端就像是手机的屏幕，把后台的传输来的数据图形化后显示给终端用户，接着把用户的操作转化参数再返回给处理器和数据库(后端和服务器)。作为用户最能直接感受，花费时间最多的手机部件，屏幕尤其重要。好的手机，不能缺少一块显示清晰，样式美观，响应速度快的屏幕，互联网产品开发也是如此。

### 更多信息
>[看完这篇HTTP，跟面试官扯皮就没问题了](https://juejin.im/post/5e1870736fb9a02fef3a5dcb#heading-35)

>[JavaScript事件代理（事件委托）](https://blog.csdn.net/qq_38128179/article/details/86293394)

>[你真的理解JS的继承了吗？](https://juejin.im/post/5cb68e18f265da039955d3b4)

>[JavaScript继承理解：ES5继承方式+ES6Class继承对比](https://segmentfault.com/a/1190000015766680)

>[ES6 - 整理一下Promise 的用法](https://juejin.im/post/5cbac4286fb9a068890f2ec3)

