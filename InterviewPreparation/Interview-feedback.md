## 目录
1. [面试一](#面试一)
2. [面试二](#面试二)
3. [面试三](#面试三)
4. [面试四](#面试四)

### 面试一

问题1. `Img`标签的`title`和`alt`有什么区别

相同之处在于: 都会出现一个小浮层，显示图片相关内容

不同之处在于: 

* 图片没有成功显示出来，`alt`就会显示文字给未加载出来的照片提供信息
* 搜索引擎可以通过这个`alt`属性的文字描述获取图片
* `alt`属性只用于`img`元素
* 当鼠标移动到元素的时候，就会出现`title`的内容，对图片起到说明作用
* `title`属性可以用在任何元素上

问题2. 简述`box-sizing`属性的常见用法

盒模型包括： 内容(`content`)、填充(`padding`)、边界(`margin`)、 边框(`border`)；

`content-box`, `W3C`标准盒模型：
* 内容就是盒子的边界
* 属性`width`,`height`只包含内容`content`，不包含`border`和`padding`
* `width`=内容宽度
  
`border-box`, `IE`盒子模型
* 边框才是盒子的边界
* 属性`width`,`height`包含`border`和`padding`，指的是`content`+`padding`+`border`。
* `width` = 内容宽度 + `padding` + `border`

`CSS`如何设置这两种模型：
* 设置当前盒子为 标准盒模型（默认）：`box-sizing: content-box`;
* 设置当前盒子为`IE`盒模型 ：`box-sizing: border-box`;

  比较
* `border-box` 更好用，比如同时使用`padding,width,border`来测试


问题3. 简述伪类与伪元素的定义区别

伪类: 用于某些选择器添加特殊效果

伪类选择器有
* `:link`向未被访问的链接添加样式
* `:visited`向已被访问过的链接添加样式
* `:hover`当鼠标悬浮在元素上方时，给元素添加样式
* `:focus`当向拥有键盘输入焦点的元素添加样式

伪元素: 创建一些不在文档树中的元素，并且为他添加样式

伪元素有
* `:first-letter`用于文本中的第一个字母添加样式
* `:first-line`向文本的首行添加样式
* `:before`在元素之前添加内容
* `:after`在元素之后添加内容


区别
* 伪类和伪元素的区别就是伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档树以外的元素
* 伪类使用的单冒号`:`,在`CSS3`中，伪元素使用双冒号`::`


问题4. 针对前端性能优化，你做过哪些尝试？
* 减少`HTTP`请求次数。尽量合并图片、CSS、JS。比如加载一个页面，如果有5个css文件的话，那么会发出5次http请求，这样会让用户第一次访问你的页面的时候会长时间等待。而如果把这个5个文件合成一个的话，就只需要发出一次http请求，节省网络请求时间，加快页面的加载
* 使用`CDN`。CDN缓存，CDN作为静态资源文件的分发网络，本身就已经提升了，网站静态资源的获取速度，加快网站的加载速度，同时也给静态资源做好缓存工作，有效的利用已缓存的静态资源，加快获取速度
* 减小资源体积。使用gzip压缩html文件。然后精简JS代码，压缩图片的尺寸和大小
* 优化网页渲染。`CSS`的文件放在头部，`JS`文件放在尾部或者异步。减少不必要的`div+css`，嵌套样式。尽量避免內联样式
* `DOM`操作优化。避免在document上直接进行频繁的DOM操作。使用事件代理

问题5. 请输入输出结果
```
let str = true
console.log(str + 0) 
console.log(str + "xyz")
console.log(str + true)
console.log(str + false)
console.log([str].map(Number))
```
```
// 1 
// truexyz
// 2
// 1
// [1]
```
问题6. 
输入为：`["abc","bac","acb","acg","acz"]`
输出为：`["bac","abc","acb","acg","acz"]`

排序的规则为：按照从第二个字符的字母表进行排序，例如`“abc”`中第二个字符为`Gb`，`“bac”`第二个字符为`a`，那么`“bac”`排在`“abc”`的前面；如果第二个字符大小也相同，则按照第三个字符的大小进行排序，以此类推，直至比较出大小；如果两个字符完全相同则顺序不变。
```
const array = ['abc', 'bac', 'acb', 'acg', 'acz', 'aca']

const compare = function (string1, string2) {
  for (let i = 1; i < string1.length; i++) {
    const val1 = string1[i]
    const val2 = string2[i]
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    }
  }
  return 0
}
console.log((array.sort(compare)))
```

问题7. 
声明一个函数add，使得add(2,3,4) 和add(2)(3)(4)都输出9

```
const add = (...arg) => {
  let args = []

  const getResult = () => {
    const result = arg.reduce((sum, current) => {
      return sum + current
    }, 0)
    args = []
    return result
  }
  const addInner = () => {
    if (arguments.length === 0) {
      return getResult
    } else {
      Array.prototype.push.apply(args, Array.prototype.splice.call(arg, 0, 1))
      return add
    }
  }

  addInner.valueOf = () => {
    return getResult()
  }

  addInner.toString = () => {
    return getResult() + ''
  }
  return addInner
}

    function add (...argument) {
      const args = Array.prototype.slice.call(argument)
      const resultFun = () => {
        const subArgs = Array.prototype.slice.call(argument)
        // eslint-disable-next-line prefer-spread
        return add.apply(null, args.concat(subArgs))
      }
      resultFun.toString = () => {
        return args.reduce((sum, cur) => {
          return sum + cur
        }, 0)
      }
      return resultFun
    }

 console.log(add(1, 2))
console.log(add(1, 2, 3, 7))
```
### 面试二

问题1: 一只青蛙一次可以跳上`1`级台阶，也可以跳上`2`级台阶。求该青蛙跳上一个`n`级的台阶总共：有多少种跳法。
使用斐波那契数列来解决，即fn= f(n-1) + f(n-2), 从第三项开始，第n项等于前两项之和
```
const jumpFloor = (n)=>{
  if(n<=0)  return 0;
  if(n ==1 ) return 1;
  if( n==2 ) return 2;
  return jumpFloor(n-1) + jumpFloor(n-2)
}
```
当递归为50的时候，会卡在不动，推荐使用迭代来解决问题
```
jumpFloor = (n)=> {
  let target = 0;
  let number1 = 1;
  let number2 = 2；

  if(n<=0) return 0;
  if(n==1) return 1;
  if(n==2) return 2;

  for(let i=3;i<=n；i++){
   target = number1 + number2
   number1 = number2
   number2 = target
  }
 return target
}
```


问题2: 浏览器输入`url`到网页渲染的过程

从输入URL到渲染出整个页面的过程包括三个部分：


 1. DNS解析URL的过程

      DNS解析的过程就是寻找哪个服务器上有请求的资源。因为ip地址不容易记忆，一般会使用URL域名（如www.baidu.com）作为网址。DNS解析就是将域名翻译成IP地址的过程。

具体过程：

       1）浏览器缓存：浏览器会按照一定的频率 缓存DNS记录

 　　2）操作系统缓存：如果浏览器缓存中找不到需要的DNS记录，就会取操作系统中找

　　 3）路由缓存：路由器也有DNS缓存

　　 4）ISP的DNS服务器：ISP有专门的DNS服务器应对DNS查询请求

　　 5）根服务器：ISP的DNS服务器找不到之后，就要向根服务器发出请求，进行递归查询

2. 浏览器与服务器交互过程

　　1）首先浏览器利用tcp协议通过三次握手与服务器建立连接

　　http请求包括header和body。header中包括请求的方式（get和post）、请求的协议 （http、https、ftp）、请求的地址ip、缓存cookie。body中有请求的内容。

　　2）浏览器根据解析到的IP地址和端口号发起http的get请求.

　　3）服务器接收到http请求之后，开始搜索html页面，并使用http返回响应报文

　　4）若状态码为200显示响应成功，浏览器接收到返回的html页面之后，开始进行页面的渲染

3. 浏览器页面渲染过程

　　1）浏览器根据深度遍历的方式把html节点遍历成dom 树

　　2）将css解析成CSS DOM树

　　3）将dom树和CSS DOM树构造成render树

　　4）JS根据得到的render树 计算所有节点在屏幕中的位置，进行布局（回流）

　　5）遍历render树并调用硬件API绘制所有节点（重绘）

问题3: 你之前的工作经历


问题4: `React`的`hooks`和类组件的区别
 
* 在组件之间复用状态逻辑很难, 你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。

* 复杂组件变得难以理解,为了解决这个问题，Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测
* 难以理解的 class,为了解决这些问题，Hook 使你在非 class 的情况下可以使用更多的 React 特性。 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术
  
* 函数组件和类组件当然是有区别的，而且函数组件的性能比类组件的性能要高，

* 因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。

* 为了提高性能，尽量使用函数组件。

* 函数组件没有this,没有生命周期，没有状态state

* 类组件有this,有生命周期，有状态state

  > [Hook 简介](https://zh-hans.reactjs.org/docs/hooks-intro.html)

问题5: `Vue`和`React`的区别
* 数据是不是可变的,react整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在react中，是单向数据流，推崇结合immutable来实现数据不可变
* 通过js来操作一切，还是用各自的处理方式,react的思路是all in js，通过js来生成html，所以设计了jsx，还有通过js来操作css，社区的styled-component、jss等.vue是把html，css，js组合到一起，用各自的处理方式，vue有单文件组件，可以把html、css、js写到一个文件中，html提供了模板引擎来处理。
* react是类式的写法，api很少.而vue是声明式的写法，通过传入各种options，api和参数都很多。所以react结合typescript更容易一起写，vue稍微复杂。
react可以通过高阶组件（Higher Order Components--HOC）来扩展，而vue需要通过mixins来扩展
* 什么功能内置，什么交给社区去做,react做的事情很少，很多都交给社区去做，vue很多东西都是内置的，写起来确实方便一些，

> [vue和react的区别](https://www.cnblogs.com/diffx/p/11852904.html)

问题6:怎么提高`React`的渲染性能

* 使用生产版本
* webpack
* 使用开发者工具中的分析器对组件进行分析
* 虚拟化长列表
* 避免调停
* shouldComponentUpdate 的作用
* 不可变数据的力量
  
> [性能优化](https://zh-hans.reactjs.org/docs/optimizing-performance.html)

### 面试三

问题1: `Promise`的用法


 
问题2: `ES 6`语法
 

问题3: `const, let,var`作用和原理


问题4: 跨域的方法和原理
 

问题5: `webpack`的用法，用过哪些`loader`
 

问题6: `React`数据通信，父子组件通信，兄弟组件通信


问题7: `React`hooks的原理和用法

问题8: 实现深拷贝，深拷贝函数

### 面试四
问题1: 怎么理解面向对象式编程

  面向对象编程：Object-oriented Programming，OOP，面向对象程序设计。

  面向对象编程是一种计算机编程架构，他的一条基本原则是计算机程序是由单个能够起到子程序作用的单元或对象组合而成。

  OOP使得程序更有重用性、灵活性和扩展性。OOP的核心思想是：封装、继承、多态（重点是类和对象）。

  不同于POP（面向过程编程）的以过程为中心的编程思想，面向对象编程的中心思想是通过调用对象来实现想要实现的目的。

  面向对象的思想：

  是一种更符合我们思想习惯的思想；
  可以将复杂的事情简单化；
  将我们从执行者变成了指挥者。
  二. OOP的特点
  1. 封装
  封装，简单来说就是将重复的代码通过一种方法，编程一个新的可以被我们直接调用的类，省去了繁复的编程过程。封装可以使得代码实现“高内聚、低耦合”，这种状态也是封装的基本目标。对用户来说，用户并不需要知道对象是如何进行各种操作的，用户只需要通过调用封装后类的对象来进行想要的操作即可。封装这种思想，大大简化了操作步骤，代码变得更加有效，复用性也更高。

  封装还有另外一个目的，就是将不需要对外提供的内容都隐藏起来；把属性隐藏（private关键字），提供公共方法对其访问。这使得用户不能直接访问程序的详细细节，从而使得代码的安全性的到提高。

  2. 继承
  继承是两者或两者以上的类之间的关系。顾名思义，继承就是子类包含父类所有的特点，但子类自身还可以有自己的特有方法（子类对象 is a 父类对象）。继承可以分为单继承和所继承：单继承是说，一个对象仅仅从另外一个对象中继承其相应的特点；多继承意思是，一个对象可以同时从另外两个或者两个以上的对象中继承所需要的特点与能力，并且不会发生冲突等现象。在Java代码中，只能实现单继承，其他的编程语言中有些可以实现多继承（Java中可以通过extends修饰子类，使子类可以继承父类的非私有成员）。

  继承在实现代码的复用性和维护性的同时，也使得类和类之间更加依赖，就是说继承也增加了代码的耦合性（一个类要完成某项功能要依靠另外的某些类叫耦合）。而软件设计原则是：高内聚（一个类单独完成某项功能的能力），低耦合。

  在java程序中，object是所有类的顶层父类，所有类都直接或间接继承它。并且父类私有的成员子类无法继承（父类中被private关键字修饰的内容）。另外构造方法不参与继承，子类虽不继承父类的构造方法，但是可以用super关键字访问父类的构造方法；如果父类有构造，因为子类继承父类的时候要继承或使用父类的数据，所以在子类初始化前让父类的构造先执行。创建子类对象的时候先执行父类的构造再执行子类的构造。

  3. 多态
  继承是多态的前提

  多态就是指调用相同名字的方法，但是得到的结果是不同的。多态是作用在方法上的，不作用在类或对象，也不是对象中的属性。多态的产生是因为我们需要程序能够分别应对各种情况，多态在增加代码灵活性的同时满足用户的需求。

  要使得多态产生就必须实现方法重写（子类中出现了和父类中一模一样的方法声明(方法名,参数列表,返回值类型)，就会发生方法重写，子类的方法覆盖父类的方法），或方法重载（允许一个类中，出现多个同名方法，只要参数个数或参类型不同即可）。

  多态在提高代码扩展性的同时也拥有继承的特点（复用性和维护性）


  > [面向对象编程](https://www.cnblogs.com/a-xia/p/11320358.html)


问题2: 介绍JavaScript的设计模式

问题3: `setState()`是异步的吗

问题4： 介绍一下websocket
目的：即时通讯，替代轮询

网站上的即时通讯是很常见的，比如网页的QQ，聊天系统等。按照以往的技术能力通常是采用轮询、Comet技术解决。

HTTP协议是非持久化的，单向的网络协议，在建立连接后只允许浏览器向服务器发出请求后，服务器才能返回相应的数据。当需要即时通讯时，通过轮询在特定的时间间隔（如1秒），由浏览器向服务器发送Request请求，然后将最新的数据返回给浏览器。这样的方法最明显的缺点就是需要不断的发送请求，而且通常HTTP request的Header是非常长的，为了传输一个很小的数据 需要付出巨大的代价，是很不合算的，占用了很多的宽带。

缺点：会导致过多不必要的请求，浪费流量和服务器资源，每一次请求、应答，都浪费了一定流量在相同的头部信息上

然而WebSocket的出现可以弥补这一缺点。在WebSocket中，只需要服务器和浏览器通过HTTP协议进行一个握手的动作，然后单独建立一条TCP的通信通道进行数据的传送。

原理
WebSocket同HTTP一样也是应用层的协议，但是它是一种双向通信协议，是建立在TCP之上的。

连接过程 —— 握手过程
1. 浏览器、服务器建立TCP连接，三次握手。这是通信的基础，传输控制层，若失败后续都不执行。
2. TCP连接成功后，浏览器通过HTTP协议向服务器传送WebSocket支持的版本号等信息。（开始前的HTTP握手）
3. 服务器收到客户端的握手请求后，同样采用HTTP协议回馈数据。
4. 当收到了连接成功的消息后，通过TCP通道进行传输通信。

WebSocket与HTTP的关系
相同点
1. 都是一样基于TCP的，都是可靠性传输协议。
2. 都是应用层协议。
  
不同点
1. WebSocket是双向通信协议，模拟Socket协议，可以双向发送或接受信息。HTTP是单向的。
2. WebSocket是需要握手进行建立连接的

联系
WebSocket在建立握手时，数据是通过HTTP传输的。但是建立之后，在真正传输时候是不需要HTTP协议的。


> [谈下WebSocket介绍，与Socket的区别](https://www.cnblogs.com/phpper/p/9152902.html)

