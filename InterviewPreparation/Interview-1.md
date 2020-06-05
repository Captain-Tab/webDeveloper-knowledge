## 目录
1. [技巧](#技巧)
2. [HTML](#HTML)
3. [CSS](#CSS)
4. [原生JS](#原生JS)
5. [DOM](#DOM)  
6. [HTTP](#HTTP)
7. [Vue框架](#Vue框架)
8. [React框架](#React框架)
9. [TypeScript](#TypeScript)
10. [Webpack](#Webpack)
11. [安全](#安全)
12. [开放题目](#开放题目)
13. [刁钻题目](#刁钻题目)
13. [超纲题](#超纲题)
14. [个性化题目](#个性化题目)


### 技巧
* 遇到比较抽象的题目就具体化（举例），遇到比较具体的题目就抽象化（阐述）
* 抽象题目搜知乎，代码题目搜`Stackoverflow`或博客
* 『XXX 的原理』这种题目一般都是说源代码思路，但你不需要看源码，直接看别人的博客即可（再次强调，不要用百度）

### HTML
- [x] 必考：你是如何理解`HTML`语义化的？
  
  定义：`HTML`语义化是指使用恰当语义的`html`标签、`class`类名等内容，让页面具有良好的结构与含义，从而让人和机器都能快速理解网页内容。

  举例：具体来说就是使用正确的标签，例如段落就写`p`标签,标题就写`h1`标签，文章就写`article`,视频就写`video`标签等等。同时也要尽可能少的使用无语义的标签`div`和`span`等等

  总结：
    * 正确的标签做正确的事情
    * 页面内容结构化
    * 无`CSS`样子时也容易阅读，便于阅读维护和理解
    * 便于浏览器、搜索引擎解析。 利于爬虫标记、利于SEO

- [x] `meta viewport` 是做什么用的，怎么写？
  
  `meta`定义: 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。简单来说`meta`标签主要用于描述页面的一些信息。

  * `charset`: 定义`HTML`文档的字符集
  ```
   <meta charset="UTF-8">
  ```
  * `http-equiv`:可用于模拟`http`请求头，可设置过期时间，缓存，刷新
  ```
   <meta http-equiv="expires" content="wed, 20 Jun 2019 22:33:00 GMT">
  ```
  
  `viewport`定义: `viewport`是`meta`标签的`name`属性中可选值中的一个，指`web`页面上用户可见的区域，用于移动端页面设计

  举例：移动端的`viewport`宽度会从默认的`980px`变成各个设备的 device-width 。
  ```
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
  ```
  属性解释：`content`定义了`viewport`的属性

    | 属性   | 含义 |             实例   |
    |----------|:-------------:|------:|
    | `width`|  `viewport`的宽度 | `width=device-width` 指缩放为 100% 时以 `CSS` 像素计量的屏幕宽度 |
    | `initial-scale` |   初始化缩放比例  |  	`initial-scale=1.0` 初始化不进行缩放 |
    | `maximum-scale` | 用户最大缩放比例 |    `maximum-scale=1.0` 不允许用户缩放 |
    | `user-scalable` | 用户是否可以缩放 |    `user-scale=no` 不允许用户缩放 |
    
- [x] `H5` 是什么？
   * 狭义上：`HTML`的第`5`次修订版。
   * 广义上：新的`Web`技术集
   * `h5`是非专业叫法，现在基本上特指移动端`web`开发，如手机页面、微信小程序、微信页面等


- [x] 你用过哪些 `HTML 5` 标签？
  
  新特性包括：
    * 语义标签: `section、article、nav、header、footer、main、autio、video、figure`
    * 通信技术: `Web Sockets`、服务端推送事件、`WebRTC`
    * 离线存储: `indexedDB、LocalStorage`等
    * 多媒体: 音视频、`WebRTC`、摄像头
    * `2D/3D`绘图: `Canvas、WebGL、SVG`
    * 性能: `Web Workers、xhr level2`、动画优化、History API
    * 设备访问: `Camera API`、触控、定位、设备方向
    * 样式。`CSS3`阴影、边框、动画、形变、过渡、布局
    * 新增表单元素 `type=email、search、range、color、date、url、number`

### CSS
- [x] 必考：两种盒模型分别说一下。
  
  盒模型包括： 内容(`content`)、填充(`padding`)、边界(`margin`)、 边框(`border`)；

  `content-box`, `W3C`标准盒模型：
  * 内容就是盒子的边界
  * 属性`width`,`height`只包含内容`content`，不包含`border`和`padding`
  * `width`=内容宽度
  
  `border-box`, `IE`盒子模型
  * 边框才是盒子的边界
  * 属性`width`,`height`包含`border`和`padding`，指的是`content`+`padding`+`border`。
  * `width` = 内容宽度 + `padding` = `border`

  `CSS`如何设置这两种模型：
  * 设置当前盒子为 标准盒模型（默认）：`box-sizing: content-box`;
  * 设置当前盒子为`IE`盒模型 ：`box-sizing: border-box`;

  比较
  * `border-box` 更好用，比如同时使用`padding,width,border`来测试
- [x] 必考：如何垂直居中？
  
  内联元素, 水平居中设置：

    1. 行内元素
    * 设置`text-align:center`；
    2. `Flex`布局
    * 设置`display:flex;justify-content:center`;(灵活运用,支持`Chroime，Firefox，IE9+`)

   块级元素, 水平居中设置：

    1. 定宽块状元素
    * 设置 左右`margin`值为`auto`；
    2. 不定宽块状元素
    * 在元素外加入 `table` 标签（完整的，包括 `table`、`tbody`、`tr`、`td`），该元素写在`td`内，然后设置`margin`的值为`auto`；
    * 给该元素设置`displa:inine`方法；
    * 父元素设置`position:relative`和`left:50%`，子元素设置`position:relative`和`left:50%`；

  
    内联元素,垂直居中设置：

    1. 父元素高度确定的单行文本（内联元素）
    * 设置`text-align:center`；
    1. 父元素高度确定的多行文本（内联元素）
    * 插入`table`（插入方法和水平居中一样），然后设置 `vertical-align:middle`；
    * 先设置`display:table-cell`再设置 `vertical-align:middle`；

   块级元素,垂直居中设置：

   * 使用`position:absolute（fixed`,设置`left、top、margin-left、margin-top:50%`的属性;
   * 利用`position:fixed（absolute）`属性，`margin:auto`这个必须不要忘记了;
   * 利用`display:table-cell`属性使内容垂直居中;
   * 使用`css3`的新属性`transform:translate(x,y)`属性;
   * 使用`:before`元素;100% 高度的加上`inline block`


- [x] CSS 布局选择
  `CSS`布局的选择
  * 如果需要兼容`IE 9`, 选择`float`布局。左浮两个,固定高度不要响应式,给父元素添加`clearfix`,必要时候采用负`margin`
  * 如果不需要兼容`IE 9`,兼容最新浏览器,使用`grid`布局
  * 如果即不需要兼容`IE 9`,也不需要兼容最新浏览器，使用`flex`布局，必要时候采用`margin`
  
- [x] 必考：flex怎么用，常用属性有哪些？
  
  `flex`规定了弹性元素如何伸长或缩短以适应`flex`容器中的可用空间。这是一个简写属性，用来设置`flex-grow`, `flex-shrink`与`flex-basis`

  
  `flex`布局是`CSS3`新增的一种布局方式，我们可以通过将一个元素的`display`属性值设置为`flex`从而使它成为一个`flex
    `容器，它的所有子元素都会成为它的项目。

  一个容器默认有两条轴，一个是水平的主轴，一个是与主轴垂直的交叉轴。我们可以使用`flex-direction`来指定主轴的方向。
  我们可以使用`justify-content`来指定元素在主轴上的排列方式，使用`align-items`来指定元素在交叉轴上的排列方式。还
  可以使用`flex-wrap`来规定当一行排列不下时的换行方式。

  对于容器中的项目，我们可以使用`order`属性来指定项目的排列顺序，还可以使用`flex-grow`来指定当排列空间有剩余的时候，
  项目的放大比例。还可以使用`flex-shrink`来指定当排列空间不足时，项目的缩小比例。

- [x]  CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？ CSS3新增伪类有那些？
  
    `CSS`选择符有哪些

    * id选择器（ # myid）
    * 类选择器（.myclassname）
    * 标签选择器（div, h1, p）
    * 相邻选择器（h1 + p）
    * 子选择器（ul > li）
    * 后代选择器（li a）
    * 通配符选择器（ * ）
    * 属性选择器（a[rel = "external"]）
    * 伪类选择器（a: hover, li: nth - child）

    可继承的样式：

    * 关于文字排版的属性如：`font,word-break,letter-spacing,text-align,text-rendering,word-spacing,white-space,text-indent,text-transform,text-shadow`
    * `line-height`
    * `color`
    * `visibility`
    * `cursor`

    不可继承的样式：

    `border padding margin width height `

   优先级就近原则,同权重情况下样式定义最近者为准:

    `!important >  id > class > tag (important 比 内联优先级高)`

    CSS选择器优先级 
    * 最高优先级是 (直接在标签中的设置样式，假设级别为1000)
    * 次优先级是（ID选择器 ,假设级别为100） `#myDiv{color:Red;}`
    * 其次优先级是（类选择器，假设级别为10）`.divClass{color:Red;}`
    * 最后优先级是 （标签选择器，假设级别是 1） `div{color:Red;}`
  
   那么后代选择器的优先级就可以计算了啊， 比如

    `.divClass span { color:Red;} 优先级别就是：10+1=11`

    CSS3新增伪类举例：

    * `p:first-of-type`选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
    * `p:last-of-type`  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
    * `p:only-of-type`  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
    * `p:only-child`    选择属于其父元素的唯一子元素的每个 <p> 元素。
    * `p:nth-child(2)`  选择属于其父元素的第二个子元素的每个 <p> 元素。
    * `:enabled  :disabled` 控制表单控件的禁用状态。
    * `:checked`       单选框或复选框被选中。

- [x] 页面导入样式时，使用link和@import有什么区别？

   * `import`是`CSS2.1`提出的，只在`IE5`以上才能被识别，而`link`是`XHTML`标签，无兼容问题;
   * `link`属于`XHTML`标签，除了加载`CSS`外，还能用于定义`RSS`, 定义`rel`连接属性等作用；而`@import`是`CSS`提供的，只能用于加载`CSS`;
   * 页面被加载的时，`link`会同时被加载，而`@import`引用的`CSS`会等到页面被加载完再加载;


- [x] 必考：BFC是什么？

  `W3C CSS` 2.1 规范中的一个概念,它决定了元素如何对其内容进行布局,以及与其他元素的关系和相互作用


  `BFC`,块级格式化上下文,一个创建了新的`BFC`的盒子是独立布局的,盒子里面的子元素的样式不会影响到外面的元素,在同一个`BFC`中的两个毗邻的块级盒在垂直方向（和布局方向有关系）的margin会发生折叠。

  创建规则：
  * 根元素
  * 浮动元素（`float`不是`none`）
  * 绝对定位元素（`position`取值为`absolute`或`fixed`）
  * `display`取值为`inline-block`,`table-cell`, `table-caption`,`flex`, `inline-flex`之一的元素
  * `overflow`不是`visible`的元素

  作用：
  * 可以包含浮动元素
  * 不被浮动元素覆盖
  * 阻止父子元素的`margin`折叠

  [更多信息](https://www.jianshu.com/p/33abfdd57fb8)

- [x] 清除浮动说一下
 
  浮动原理

  * 浮动元素可以左右移动，直到遇到另一个浮动元素或者遇到它外边缘的包含框。浮动框不属于文档流中的普通流，当元素浮动之后，
  不会影响块级元素的布局，只会影响内联元素布局。
  
  清除浮动是为了清除使用浮动元素产生的影响。清除浮动的方式
  
  * 方法一： 父元素添加`clearfix`样式
  ```
   .clearfix:after{
     content: '';
     display: block; /*或者 table*/
     clear: both;
     visibility: 0,
     hight: 0
  }
  .clearfix{
      zoom: 1; /* IE 兼容*/
  }
  ```
  * 方法二：使用`BFC`块级格式化上下文来清除浮动

  
### 原生JS
- [x] 必考：ES6 语法知道哪些，分别怎么用？
  
    1.  `var  let  const`

    *  在`js`中  通常使用`var`会发生变量提升，即脚本开始运行时，变量已经存在了，但是没有值，所以会输出`undefined`
    *  而`let`不会发生变量提升,这表示在声明它之前，变量是不存在的，这时如果用到它，就会抛出一个错误
    *  `var`是函数级作用域，`let`是块级作用域
    *  `const`声明一个只读的常量  一旦声明，常量的值就不能改变
    *  `const`命令声明的常量也是不提升，只能在声明的位置后面使用
    *  对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。
    
    2. 解构赋值
   
    * `ES6`允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构

    3. `Set`和`Map`的使用
   
    * `Set`用法： `ES6`提供了新的数据结构`Set`，它类似于数组，但是成员的值都是唯一的，没有重复的值。
    * `Map`用法：`ES6`提供了`Map`数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
    * `Object`结构和`Map`解构的区别：`Object`结构提供了“字符串—值”的对应,`Map`结构提供了“值—值”的对应，是一种更完善的`Hash`结构实现。如果你需要“键值对”的数据结构，`Map`比`Object`更合适
   
   4. 箭头函数（Arrow Functions）
   
    * `ES6 `中，箭头函数就是函数的一种简写形式，使用括号包裹参数，跟随一个 `=>`，紧接着是函数体
  
   5. Promise
   
   * `ES6` 对 `Promise` 有了原生的支持，一个`Promise`是一个等待被异步执行的对象，当它执行完成后，其状态会变成`resolved`或者`rejected`

   6. 类
   
   * `ES6` 中有 `class` 语法。值得注意是，这里的 `class` 不是新的对象继承模型，它只是原型链的语法糖表现形式
  
  7. export和import
   
   * `ES6` 中有 `export和import` 语法。`ES5`不支持原生的模块化，在`es6`中一个文件可以默认为一个模块，模块通过`export`向外暴露接口，实现模块间交互等功能

- [x] 必考 Promise、Promise.all、Promise.race 分别怎么用？
  
    1. promise
   
     * `Promise`本意是承诺，在程序中的意思就是承诺我过一段时间后会给你一个结果。 什么时候会用到过一段时间？答案是异步操作，异步是指可能比较长时间才有结果的才做，例如网络请求、读取本地文件等
     * `Promise`的三种状态: `Pending---`对象实例创建时的初始状态, `Fulfilled`----可以理解为成功的状态,`Rejected`----可以理解为失败的状态
  
    `Promise`的语法

    * `return new Promise((resolve, reject)=>{})`
    * 任务成功则调用`resolve(result)`
    * 任务失败则调用`reject(error)`
    * `resolve`和`reject`会再去调用成功和失败函数
    * 使用`.then(success, fail)`传入成功和失败函数

   `promise`的代码
   ```
    function fn(){
     return new Promise((resolve, reject)=>{
         成功时调用 resolve(数据)
         失败时调用 reject(错误)
     })
    }
    fn().then(success1, fail1).then(success2, fail2)
   ```
  
  2. promise.all
   
   *  `Promise.all`可以将多个`Promise`实例包装成一个新的`Promise`实例。当两个`promise`成功时，才会调用`success`。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被`reject`失败状态的值。
   *  `Promse.all`在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个`ajax`的数据回来以后才正常显示，在此之前只显示`loading`图标。
   * 需要特别注意的是，`Promise.all`获得的成功结果的数组里面的数据顺序和`Promise.all`接收到的数组顺序是一致的，即`p1`的结果在前，即便`p1`的结果获取的比`p2`要晚。

  `promise.all`代码
  ```
   // promise1和promise2都成功才会调用success1
   Promise.all([promise1, promise2]).then(success1, fail1)
  ```

  3. promise.race
   
   * 顾名思义，`Promse.race`就是赛跑的意思，意思就是说，`Promise.race([p1, p2, p3])`里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

  `promise.race`代码
  ```
  // promise1和promise2只要有一个成功就会调用success1；
  // promise1和promise2只要有一个失败就会调用fail1；
  // 总之，谁第一个成功或失败，就认为是race的成功或失败。
  Promise.race([promise1, promise2]).then(success1, fail1)
  ```


- [x] new操作符
  
      （1）首先创建了一个新的空对象
      （2）设置原型，将对象的原型设置为函数的 prototype 对象。
      （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
      （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象

      ```
      function objectFactory() {
      let newObject = null,
        constructor = Array.prototype.shift.call(arguments),
        result = null;

      // 参数判断
      if (typeof constructor !== "function") {
        console.error("type error");
        return;
      }

      // 新建一个空对象，对象的原型为构造函数的 prototype 对象
      newObject = Object.create(constructor.prototype);

      // 将 this 指向新建对象，并执行函数
      result = constructor.apply(newObject, arguments);

      // 判断返回对象
      let flag =
        result && (typeof result === "object" || typeof result === "function");

      // 判断返回结果
        return flag ? result : newObject;
      }

      // 使用方法
      // objectFactory(构造函数, 初始化参数);
      ```

- [x] 必考：手写函数防抖和函数节流

  throttle-函数节流：一个水龙头在滴水，可能一次性会滴很多滴，但是我们只希望它每隔 500ms 滴一滴水，保持这个频率。即我们希望函数在以一个可以接受的频率重复调用。

  debounce-函数防抖：将一个弹簧按下，继续加压，继续按下，只会在最后放手的一瞬反弹。即我们希望函数只会调用一次，即使在这之前反复调用它，最终也只会调用一次而已。


  1. 函数防抖
   
   * 函数防抖是指在事件被触发`n`秒后再执行回调，如果在这`n`秒内事件又被触发，则重新计时。
   * 这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

   函数防抖代码
   ```
    function debounce(fn, delay){
     let timerId = null
     return function(){
         const context = this
         if(timerId){window.clearTimeout(timerId)}
         timerId = setTimeout(()=>{
             fn.apply(context, arguments)
             timerId = null
         },delay)
     }
    }
    const debounced = debounce(()=>console.log('hi'))
    debounced()
    debounced()
   ```
   1. 函数节流

  * 函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
  * 节流可以使用在`scroll`函数的事件监听上，通过事件节流来降低事件调用的频率。
  
   函数节流代码
   ```
   
    // 节流（一段时间执行一次之后，就不执行第二次）
    function throttle(fn, delay){
        let canUse = true
        return function(){
            if(canUse){
                fn.apply(this, arguments)
                canUse = false
                setTimeout(()=>canUse = true, delay)
            }
        }
     }

    const throttled = throttle(()=>console.log('hi'))
    throttled()
    throttled()
   ```

- [x] 必考：手写AJAX
  
  *  `AJAX`全称`Asynchronous JavaScript and XML` 是让**客户端与服务器，可以在（不必刷新整个浏览器）的情况下，与服务器进行异步通讯的技术**
  
  `AJAX`原理

  * `AJAX`是浏览器上的功能
  * 浏览器可以发送请求，收到响应
  * 浏览器在`window`上加了一个`XMLHttpRequest()`全局函数
  * 通过`XMLHttpRequest()`函数构造出对象
  * 通过这个对象来实现发送请求和收到响应

  `Ajax`步骤
  1. 创建`httpRequest`对象
  2. 调用该对象的`open`方法
  3. 监听对象的`onload` & `onerror`事件
  4. `onload` & `onerror`事件可以改为`onreadystatechange && status`事件，并在这里操作文件内容，写出相应请求。
  5. 调用该对象的`send`方法，发送请求。
   
  优点： 无刷新请求

  缺点： 浏览器限制不能跨域。想要跨越就要用到`JSONP`或`CORS`了

  `ajax`代码实例
  ```
  var request = new XMLHttpRequest()
    request.open('GET', '/a/b/c?name=ff', true);
    request.onreadystatechange = function () {
      if(request.readyState === 4 && request.status === 200) {
        console.log(request.responseText);
      }};
    request.send();
  ```

- [x] 必考：this 是什么？
  
  `this`指向
  1. 第一种是函数调用模式，当一个函数不是一个对象的属性时，直接作为函数来调用时，`this` 指向全局对象。严格模式中`this`都是指向`undefined`
  2. 第二种是方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
  3. 第三种是构造器调用模式，如果一个函数用 new 调用时，函数执行前会新创建一个对象，`this` 指向这个新创建的对象。
  4. 第四种是 `apply` 、 `call` 和 `bind` 调用模式，这三个方法都可以显示的指定调用函数的 `this` 指向。其中 `apply` 方法接收两个参数：一个是 `this` 绑定的对象，一个是参数数组。`call` 方法接收的参数，第一个是 `this` 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 `call()` 方法时，传递给函数的参数必须逐个列举出来。`bind` 方法通过传入一个对象，返回一个 `this` 绑定了传入对象的新函数。这个函数的 `this` 指向除了使用 `new` 时会被改变，其他情况下都不会改变。
 
  `this`实例代码
  ```
  a. fn()
    this => window/global
  b. obj.fn()
    this => obj
  c. fn.call(xx)
    this => xx
  d. fn.apply(xx)
    this => xx
  e. fn.bind(xx)
    this => xx
  f. new Fn()
    this => 新的对象
  g. fn = ()=> {}
    this => 外面的 this
  ```
  [了解this](https://zhuanlan.zhihu.com/p/23804247)

- [X] 必考：闭包/立即执行函数是什么？
    定义

    函数与对其状态即词法环境（`lexical environment`）的引用共同构成闭包（`closure`）。也就是说，闭包可以让你从内部函数访问外部函数作用域。**简单来说，闭包 = 函数 + 函数能够访问外部变量** 在`JavaScript`，函数在每次创建时生成闭包。

    原理

    在下面的实例中，就存在了`closure`闭包, 如果一个函数用到了外部的变量，那在这里，外部变量`a`和`f3`函数就组成了闭包。

    实例代码
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


    立即执行函数
    
    定义：`IIFE(Immediately Invoked Function Expression )` 立即调用函数表达式是一个在定义时就会立即执行的`JavaScript`函数

    1. 声明一个匿名函数
    2. 马上调用这个匿名函数

   实现
 
    1. 首先声明一个匿名函数 `function(){alert('我是匿名函数')}`。
    2. 然后在匿名函数后面接一对括号 `()`，调用这个匿名函数。
   
   作用
   1. 只有一个作用：创建一个独立的作用域。
   2. 这个作用域里面的变量，外面访问不到（即避免「变量污染」）。

- [x] 必考：什么是 JSONP，什么是 CORS，什么是跨域？
    
    跨域Cross-Domain：跨域是指从一个域名的网页去请求另一个域名的资源。比如从www.baidu.com页面去请求www.google.com 的资源。但是一般情况下不能这么做，它是由浏览器的同源策略造成的，是浏览器对JavaScript施加的安全限制。跨域的严格一点的定义是：只要协议，域名，端口有任何一个的不同，就被当作是跨域

    `CORS`
    定义

    跨域资源共享`Cross-Origin Resource Sharing`:  定义了必须在访问跨域资源时，浏览器与服务器应该如何沟通。`CORS`背后的基本思想就是使用自定义的`HTTP`头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败。

    原理

    浏览器会自动进行`CORS`通信，实现`CORS` 通信的关键是后端。只要后端实现了`CORS`，就实现了跨域。如果浏览器检测到相应的设置，就可以允许`Ajax`进行跨域的访问。

    **服务端通过设置`Access-Control-Allow-Origin`就可以开启`CORS`**。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。
    
    * 简单跨域请求：**只服务端设置`Access-Control-Allow-Origin`即可，前端无须设置**。只要同时满足以下两大条件，就属于简单请求:
    ```
    条件1：使用下列方法之一：
    GET
    HEAD
    POST
  
    条件2：`Content-Type`的值仅限于下列三者之一：
    text/plain
    multipart/form-data
    application/x-www-form-urlencoded
    
    ```
    * 复杂跨域请求: **若要带`cookie`请求,那么前后端都需要设置**。话句话说，不符合以上条件的请求就肯定是复杂请求了。
    复杂请求的`CORS`请求，会在正式通信之前，增加一次`HTTP`查询请求，称为”预检”请求,该请求是`option` 方法的，通过该请求来知道服务端是否允许跨域请求。
  
    优点是通过简单的配置就能跨域

    缺点是某些古老浏览器不支持 `CORS` 或不支持 `Credentials`。解决办法是用 `JSONP` 或 `P3P` 等技术

    `JSONP`
    定义

    填充式`json`(`JSON with Padding`): 是应用`JSON`的一种新方法，只不过是被包含在函数调用中的`JSON`。

    `JSONP`由两部分组成：**回调函数**和**数据**。回调函数是当响应到来时应该在页面中调用的函数，而数据就是传入回调函数中的`JSON`数据。

    原理

    **利用 `<script>`标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的`JSON` 数据**。通过`script`标签引入一个`js`文件，这个`js`文件载入成功后会执行我们在`url`参数中指定的函数，并且会把我们需要的`json`数据作为参数传入。所以`jsonp`是需要服务器端的页面进行相应的配合的。（即用`javascript`动态加载一个`script`文件，同时定义一个`callback`函数给`script`执行而已。）在`js`中，我们直接用`XMLHttpRequest`请求不同域上的数据时，是不可以的。但是，在页面上引入不同域上的`js`脚本文件却是可以的，`jsonp`正是利用这个特性来实现的。注意：`JSONP`请求一定需要对方的服务器做支持才可以。

    过程

    * 服务器将数据写到`friend.js`上
    * 请求页面的用`<script>`标签引用`friend.js`
    * `friend.js`执行，执行事先定义好的的`window.xxx`函数
    * 请求页面通过`window.xxx`函数得到jsons数据
    * 事实上，`window.xxx`函数就是一个回调函数
    * 通过设置服务器端的`referer`检查，可以限制为固定网站访问服务器，进行跨域
   
    优点是通过简单的约定就能跨域
          
    缺点是不支持`get`以外的动词，而且存在`csrf`风险
    解决办法是 `CORS` 或 `csrf token`


- [x] 常考：如何实现深拷贝？
  
   * 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。
   * 深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象
    
    [深拷贝和浅拷贝](https://juejin.im/post/5b5dcf8351882519790c9a2e#heading-3)

    实现浅拷贝

    * `Object.assign()` 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 `Object.assign()`进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。
    * 注意：当`object`只有一层的时候，是深拷贝
    ```
    var obj = { a: {a: "kobe", b: 39} };
    var initalObj = Object.assign({}, obj);
    initalObj.a.a = "wade";
    console.log(obj.a.a); //wade
    ```
    实现深拷贝

    * 用`JSON.stringify`将对象转成`JSON`字符串，再用`JSON.parse()`把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝
    * 注意: 这种方法虽然可以实现数组或对象深拷贝,但不能处理函数
    ```
    let arr = [1, 3, {
        username: ' kobe'
    }];
    let arr4 = JSON.parse(JSON.stringify(arr));
    arr4[2].username = 'duncan'; 
    console.log(arr, arr4)

    ```
    * 递归方法实现深度克隆原理：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝
    ```
  // 判断类型
  // 检查环（也叫循环引用）
  // 递归
  // 需要忽略原型
  function deepCopy(object) {
    if (!object || typeof object !== "object") return;

    let newObject = Array.isArray(object) ? [] : {};

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        newObject[key] =
          typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
      }
    }

    return newObject;
  }
  ```

- [x] 常考：如何用正则实现 trim()？
   ```
    String.prototype.trim = function(){
        return this.replace(/^\s+|\s+$/g, '')
    }
    //或者 
    function trim(string){
        return string.replace(/^\s+|\s+$/g, '')
    }
   ```

- [x] 常考：不用class如何实现继承？用class又如何实现？
    1. 答出基于原型的继承
    2. 答出基于`class`的继承

  **`JS`继承的原理: `A`对象通过继承`B`对象，就能直接拥有`B`对象的所有属性和方法**

  原型链继承

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
  `class`的继承 

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
  总结
  * `ES5`中：
  1. 利用借用构造函数实现 实例属性和方法的继承 ；
  2. 利用原型链或者寄生式继承实现 共享的原型属性和方法的继承 。
  * `ES6`中：
  1. 利用`class`定义类，`extends`实现类的继承；
  2. 子类`constructor`里调用`super()`（父类构造函数）实现 实例属性和方法的继承；
  3. 子类原型继承父类原型，实现 原型对象上方法的继承。


- [x] 常考：如何实现数组去重？

  假设有数组`array = [1,5,2,3,4,2,3,1,3,4]`。你要写一个函数`unique`，使得`unique(array)` 的值为 `[1,5,2,3,4]`.也就是把重复的值都去掉，只保留不重复的值。

  要求写出两个答案：

  1. 一个答案不使用 `Set` 实现
  2. 一个答案使用 `Set` 
  3. 使用了 `Map / WeakMap` 以支持对象去重

  答案1：不使用`Set`去重

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

  答案2：使用`Set`去重

  缺点：兼容性问题，有些旧的浏览器不支持
  ```
  let array = [1,5,2,3,4,2,3,5,3,4]
  const unique = (array) =>{ 
    return Array.from(new Set(array))
  }
  console.log(unique(array))
  ```
  答案3：使用`Map`去重

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
   
- [x] 送命题：手写一个 Promise
  
  [手写promise](https://juejin.im/post/5aafe3edf265da238f125c0a#heading-1)
  ```
  function Promise(executor) {
    let self = this;
    self.status = 'pending'; //等待态
    self.value = undefined;  //成功的返回值
    self.reason = undefined; //失败的原因

    function resolve(value){
        if(self.status === 'pending'){
            self.status = 'resolved';
            self.value = value;
        }
    }
    function reject(reason) {
        if(self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
        }
    }
    try{
        executor(resolve, reject);
    }catch(e){
        reject(e);// 捕获时发生异常，就直接失败
    }
  }
  //onFufiled 成功的回调
  //onRejected 失败的回调
  Promise.prototype.then = function (onFufiled, onRejected) {
      let self = this;
      if(self.status === 'resolved'){
          onFufiled(self.value);
      }
      if(self.status === 'rejected'){
          onRejected(self.reason);
      }
  }
  module.exports = Promise;
  ```

- [x] 常考：async/await 怎么用，如何捕获异常？
   
   一句话，async 函数就是 Generator 函数的语法糖。

   async 函数的优点

   （1）内置执行器
    
   （2）更好的语义

   （3）更广的适用性

   async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。

   同 Generator 函数一样，async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

   await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

  [async 函数的含义和用法](https://www.ruanyifeng.com/blog/2015/05/async.html)

### DOM
- [x] 必考：事件委托
   
    定义

    事件委托`Event Delegation`: 又称之为事件委托。是`JavaScript`中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定在子元素的响应事件（`click`、`keydown......`）委托给父元素，让父元素担当事件监听的职务。事件代理的原理是`DOM`元素的事件冒泡。

    原理

    比如一个宿舍的同学同时快递到了，一种方法就是他们一个个去领取，还有一种方法就是把这件事情委托给宿舍长，让一个人出去拿好所有快递，然后再根据收件人一 一分发给每个宿舍同学。在这里，取快递就是一个事件，每个同学指的是需要响应事件的`DOM` 元素，而出去统一领取快递的宿舍长就是代理的元素，所以真正绑定事件的是这个元素，按照收件人分发快递的过程就是在事件执行中，需要判断当前响应的事件应该匹配到被代理元素中的哪一个或者哪几个。


   实例代码
   ```
     // 思路是点击 span 后，递归遍历 span 的祖先元素看其中有没有 ul 里面的 li。

    function delegate(element, eventType, selector, fn) {
     element.addEventListener(eventType, e => {
       let el = e.target
       while (!el.matches(selector)) {
         if (element === el) {
           el = null
           break
         }
         el = el.parentNode
       }
       el && fn.call(el, e, el)
     })
     return element
     }

   ```
- [x] 阻止事件冒泡和事件捕获

    阻止事件的传播：
    * 在`W3c`中，使用`stopPropagation（）`方法
    * 在`IE`下设置`cancelBubble = true`；
    * 在捕获的过程中`stopPropagation（）`；后，后面的冒泡过程也不会发生了


    阻止事件的默认行为，例如`click <a>`后的跳转
    * 在`W3c`中，使用`preventDefault（）`方法；
    * 在`IE`下设置`window.event.returnValue = false`;
- [x] 曾考：用 mouse 事件写一个可拖曳的 div

   [示范代码](https://jsbin.com/munuzureya/edit?html,js,output)
### HTTP
- [x] 必考：HTTP 状态码知道哪些？分别什么意思？
  
    以 `1xx`为开头的表示继续或者切换协议
    | 状态码	   | 含义  |
    |  ----  | ----  |
    |100|继续。客户端应继续其请求|
    |101|切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议|

    以 `2xx` 为开头的都表示请求成功响应
    | 状态码	   | 含义  |
    |  ----  | ----  |
    |200	  |  成功响应|
    |204	  |    请求处理成功，但是没有资源可以返回 |
    |206	  |      对资源某一部分进行响应，由Content-Range 指定范围的实体内容 |

    以 `3xx` 为开头的都表示需要进行附加操作以完成请求

    | 状态码	   | 含义  |
    |  ----  | ----  |
    |301	  | 永久性重定向，该状态码表示请求的资源已经重新分配  URI，以后应该使用资源现有的 URI|
    |302	  | 临时性重定向。该状态码表示请求的资源已被分配了新的 URI，希望用户（本次）能使用新的 URI 访问|
    |303	  |该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源 |
    |304      |该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况 |
    |307      |临时重定向。该状态码与 302 Found 有着相同的含义。 |

    以 `4xx` 的响应结果表明客户端是发生错误的原因所在
    | 状态码	   | 含义  |
    |  ----  | ----  |
    |400|该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求|
    |401|该状态码表示发送的请求需要有通过 HTTP 认证（BASIC 认证、DIGEST 认证）的认证信息 |
    |403|该状态码表明对请求资源的访问被服务器拒绝了 |
    |404|该状态码表明服务器上无法找到请求的资源 |

    以 `5xx` 为开头的响应标头都表示服务器本身发生错误

    | 状态码	   | 含义  |
    |  ----  | ----  |
    |500|该状态码表明服务器端在执行请求时发生了错误|
    |503|该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求 |

- [x] 大公司必考：HTTP 缓存有哪几种？
  
  浏览器缓存(Brower Caching)是浏览器对之前请求过的文件进行缓存，以便下一次访问时重复使用，节省带宽，提高访问速度，降低服务器压力

  http缓存机制主要在http响应头中设定，响应头中相关字段为Expires、Cache-Control、Last-Modified、Etag。
  
  强缓存：浏览器不会像服务器发送任何请求，直接从本地缓存中读取文件并返回Status Code: 200 OK

  优先访问memory cache,其次是disk cache，最后是请求网络资源

  协商缓存: 向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源；

  ETag 是通过对比浏览器和服务器资源的特征值（如MD5）来决定是否要发送文件内容，如果一样就只发送 304（not modified）
  
  服务器会通过某种算法，给资源计算得出一个唯一标志符（比如md5标志），在把资源响应给客户端的时候，会在实体首部加上“ETag: 唯一标识符”一起返回给客户端。例如：
  ```
  Etag: "5d8c72a5edda8d6a:3239"
  ```
  客户端会保留该 ETag 字段，并在下一次请求时将其一并带过去给服务器。服务器只需要比较客户端传来的ETag跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。
  如果服务器发现ETag匹配不上，那么直接以常规GET 200回包形式将新的资源（当然也包括了新的ETag）发给客户端；如果ETag是一致的，则直接返回304知会客户端直接使用本地缓存即可。

  Expires 是设置过期时间（绝对时间），但是如果用户的本地时间错乱了，可能会有问题

  CacheControl: max-age=3600 是设置过期时长（相对时间），跟本地时间无关。

 [HTTP缓存控制小结](https://imweb.io/topic/5795dcb6fb312541492eda8c)

 [http面试必会的：强制缓存和协商缓存](https://juejin.im/post/5ccfccaff265da03ab233bf5)

- [x] 必考：GET 和 POST 的区别
  * `GET` 获取资源，`GET` 方法用来请求访问已被 `URI` 识别的资源。指定的资源经服务器端解析后返回响应内容。也就是说，如果请求的资源是文本，那就保持原样返回；


  * `POST` 传输实体，虽然 `GET` 方法也可以传输主体信息，但是便于区分，我们一般不用 `GET` 传输实体信息，反而使用 `POST` 传输实体信息，


- [x] Cookie V.S. LocalStorage V.S. SessionStorage V.S. Session

  cookie采用的是客户端的会话状态的一种储存机制。它是服务器在本地机器上存储的小段文本或者是内存中的一段数据，并随每一个请求发送至同一个服务器。

  session是一种服务器端的信息管理机制，它把这些文件信息以文件的形式存放在服务器的硬盘空间上（这是默认情况，可以用memcache把这种数据放到内存里面）当客户端向服务器发出请求时，要求服务器端产生一个session时，服务器端会先检查一下，客户端的cookie里面有没有session_id，是否过期。如果有这样的session_id的话，服务器端会根据cookie里的session_id把服务器的session检索出来。如果没有这样的session_id的话，服务器端会重新建立一个。PHPSESSID是一串加了密的字符串，它的生成按照一定的规则来执行。同一客户端启动二次session_start的话，session_id是不一样的。 

  区别：Cookie保存在客户端浏览器中，而Session保存在服务器上。Cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么Session机制就是通过检查服务器上的“客户明细表”来确认客户身份。Session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

  Cookie V.S. LocalStorage
  主要区别是 Cookie 会被发送到服务器，而 LocalStorage 不会
  Cookie 一般最大 4k，LocalStorage 可以用 5Mb 甚至 10Mb（各浏览器不同）

  LocalStorage V.S. SessionStorage
  LocalStorage 一般不会自动过期（除非用户手动清除），而 SessionStorage 在回话结束时过期（如关闭浏览器）

  Cookie V.S. Session
  Cookie 存在浏览器的文件里，Session 存在服务器的文件里
  Session 是基于 Cookie 实现的，具体做法就是把 SessionID 存在 Cookie 里


  [cookie和session常见面试题](https://blog.csdn.net/wuhuagu_wuhuaguo/article/details/78552633)

  [面试题,你真的了解 Cookie 和 Session 吗？](https://zhuanlan.zhihu.com/p/75536009)

### Vue框架
- [x] 必考：watch 和 computed 和 methods 区别是什么？
  
    computed 和 methods 相比，最大区别是 computed 有缓存：如果 computed 属性依赖的属性没有变化，那么 computed 属性就不会重新计算。methods 则是看到一次计算一次。
    watch 和 computed 相比，computed 是计算出一个属性（废话），而 watch 则可能是做别的事情
    
    [watch 和 computed](https://juejin.im/post/5e7028b4e51d4526fc74b7e8#heading-15)

- [x] 必考：Vue 有哪些生命周期钩子函数？分别有什么用？
  
    beforeCreate：创建前，此阶段为实例初始化之后，this指向创建的实例，此时的数据观察事件机制都未形成，不能获得DOM节点。

    data，computed，watch，methods 上的方法和数据均不能访问。
    可以在这加个loading事件。

    created：创建后，此阶段为实例已经创建，完成数据（data、props、computed）的初始化导入依赖项。
    可访问 data computed watch methods 上的方法和数据。
    初始化完成时的事件写在这里，异步请求也适宜在这里调用（请求不宜过多，避免白屏时间太长）。
    可以在这里结束loading事件，还做一些初始化，实现函数自执行。
    未挂载DOM，若在此阶段进行DOM操作一定要放在Vue.nextTick()的回调函数中。

    beforeMount：挂载前，虽然得不到具体的DOM元素，但vue挂载的根节点已经创建，下面vue对DOM的操作将围绕这个根元素继续进行。

    beforeMount这个阶段是过渡性的，一般一个项目只能用到一两次。

    mounted：挂载，完成创建vm.$el，和双向绑定
    完成挂载DOM和渲染，可在mounted钩子函数中对挂载的DOM进行操作。
    可在这发起后端请求，拿回数据，配合路由钩子做一些事情。

    beforeUpdate：数据更新前，数据驱动DOM。
    在数据更新后虽然没有立即更新数据，但是DOM中的数据会改变，这是vue双向数据绑定的作用。
    可在更新前访问现有的DOM，如手动移出添加的事件监听器。

    updated：数据更新后，完成虚拟DOM的重新渲染和打补丁。
    组件DOM已完成更新，可执行依赖的DOM操作。
    注意：不要在此函数中操作数据（修改属性），会陷入死循环。

    activated：在使用vue-router时有时需要使用<keep-alive></keep-alive>来缓存组件状态，这个时候created钩子就不会被重复调用了。
    如果我们的子组件需要在每次加载的时候进行某些操作，可以使用activated钩子触发。

    deactivated：<keep-alive></keep-alive>组件被移除时使用。
    beforeDestroy：销毁前，
    可做一些删除提示，如：您确定删除xx吗？

    destroyed：销毁后，当前组件已被删除，销毁监听事件，组件、事件、子实例也被销毁。
    这时组件已经没有了，无法操作里面的任何东西了。
   
- [x] 必考：Vue 如何实现组件间通信？
  
   `props/$emit`

    父组件 A 通过 props 的方式向子组件 B 传递，B to A 通过在 B 组件中 $emit, A 组件中 v-on 的方式实现。

    父子组件：使用 v-on 通过事件通信

    爷孙组件：使用两次 v-on 通过爷爷爸爸通信，爸爸儿子通信实现爷孙通信

    任意组件：使用 eventBus = new Vue() 来通信，eventBus.$on 和 eventBus.$emit 是主要API

    任意组件：使用 Vuex 通信

    [Vue事件总线（EventBus）使用详细介绍](https://zhuanlan.zhihu.com/p/72777951)

    [Vue组件间通信6种方式](https://www.cnblogs.com/fundebug/p/10884896.html)
    
- [x] 必考：Vue 数据响应式怎么做到的？
  
  使用 Object.defineProperty 把这些属性全部转为 getter/setter

  Vue 不能检测到对象属性的添加或删除，解决方法是手动调用 Vue.set 或者 this.$set
  [Vue-数据响应式](https://juejin.im/post/5e6eef71f265da575918f3cc#heading-11)

- [x] 必考：Vue.set 是做什么用的？
  
  Vue没有办法事先监听和代理，需要使用set来新增key,创建监听和代理，更新UI。推荐提前把属性都写好，不要新增key
  Vue.set和this.$set作用：

  新增key，即对象的键名或者属性名
  如果没有创建过，自动创建代理和监听
  触发UI更新，但不会立刻更新，有延迟



- [x] Vuex 你怎么用的？
  
  Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
  
  Vuex有五个核心概念，分别是state、 getters、 mutations、 actions、 modules。

  state：Vuex的基本数据，用来存储变量。

  getters：从基本数据state派生的数据，相当于state的计算属性。

  mutation：提交更新数据的方法，必须是同步的，如果需要异步使用action。每个 mutation 都有一个字符串的事件类型和一个回调函数handler。通过`this.$store.commit`

  action：和mutation的功能大致相同，不同之处在于action 提交的是mutation，而不是直接变更状态。action 可以包含任意异步操作。通过`this.$store.dispatch`

  modules：模块化Vuex，可以让每一个模块拥有自己的state、mutation、action、getters，使得结构非常清晰，方便管理。

  mapGetters 用来获取属性（数据）

  mapActions 用来获取方法（动作）
  
  [Vuex](https://vuex.vuejs.org/zh/guide/state.html)
- [x] VueRouter 你怎么用的？

    Vue Router 是 Vue.js 官方的路由管理器
  
    History 模式/导航守卫/路由懒加载

    history：利用了HTML5 History Interface 中新增的pushState() 和replaceState() 方法。（需要特定浏览器支持）
    如果url里不想出现丑陋hash值（#），在new VueRouter的时候配置mode值为history来改变路由模式，本质使用H5的histroy.pushState方法来更改url，不会引起刷新。

    懒加载也叫延迟加载，即在需要的时候进行加载，随用随载。在单页应用中，如果没有应用懒加载，运用webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，延时过长，会出现长时间的白屏，即使做了loading也是不利于用户体验，而运用懒加载则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时

  
    [vue router](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)
    
    [vue-router深度解析，全方位搞定路由！](https://www.jianshu.com/p/6b33918d47ef)

- [x] 路由守卫是什么？
  
    vue-router提供了导航钩子:全局前置导航钩子 beforeEach和全局后置导航钩子 afterEach，他们会在路由即将改变前和改变后进行触发。所以判断用户是否登录需要在beforeEach导航钩子中进行判断。

    导航钩子有3个参数：

      1、to:即将要进入的目标路由对象；

      2、from:当前导航即将要离开的路由对象；

      3、next ：调用该方法后，才能进入下一个钩子函数（afterEach）。

        next()//直接进to 所指路由
        next(false) //中断当前路由
        next('route') //跳转指定路由
        next('error') //跳转错误路由

        [5分钟学会vue中的路由守卫(导航守卫)](https://www.cnblogs.com/hgdzjp/p/10143707.html)

### React框架
- [x] 必考：受控组件 V.S. 非受控组件
  
  必考：受控组件

  假设我们现在有一个表单，表单中有一个input标签，input的value值必须是我们设置在constructor构造函数的state中的值，然后，通过onChange触发事件来改变state中保存的value值，这样形成一个循环的回路影响。也可以说是React负责渲染表单的组件仍然控制用户后续输入时所发生的变化

  input中的value值通过state值获取，onChange事件改变state中的value值，input中的value值又从state中获取。

  不受控组件

  表单数据由DOM本身处理。即不受setState()的控制，与传统的HTML表单输入相似，input输入值即显示最新值（使用 ref 从DOM获取表单值）

  [受控组件 V.S. 非受控组件](https://zhuanlan.zhihu.com/p/26511786?from_voters_page=true)

- [x] 必考：React 有哪些生命周期函数？分别有什么用？（Ajax 请求放在哪个阶段？）
  
    | 生命周期函数   |      说明      |
    |----------|:-------------:|
    | constructor |  在这里初始化state |
    | shouldComponentUpdate() | 决定是否更新组件 |
    | render | 创建虚拟DOM |
    | componentDidMount() | 组件已被挂载在DOM |
    | componentDidUpdate() | 组件已被更新 |
    | componentWillUnmount() | 组件被移除DOM, 将消亡 |

- [x] 必考：React 如何实现组件间通信？
   
    父子靠 props 传函数

    爷孙可以穿两次 props

    任意组件用 Redux（也可以自己写一个 eventBus）
- [x] 必考：shouldComponentUpdate 有什么用？
    
    shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。
- [x] JSX
  
     当 Facebook 第一次发布 React 时，他们还引入了一种新的 JS 方言 JSX，将原始 HTML 模板嵌入到 JS 代码中。JSX 代码本身不能被浏览器读取，必须使用Babel和webpack等工具将其转换为传统的JS。很多开发人员就能无意识使用 JSX，因为它已经与 React 结合在一直了。
- [x] 必考：虚拟 DOM 是什么？
    
    Virtual DOM 是一个轻量级的 JavaScript 对象，它最初只是 real DOM 的副本。它是一个节点树，它将元素、它们的属性和内容作为对象及其属性。 React 的渲染函数从 React 组件中创建一个节点树。然后它响应数据模型中的变化来更新该树，该变化是由用户或系统完成的各种动作引起的。

    Virtual DOM 工作过程有三个简单的步骤。
   
   每当底层数据发生改变时，整个 UI 都将在 Virtual DOM 描述中重新渲染。

   然后计算之前 DOM 表示与新表示的之间的差异。

   完成计算后，将只用实际更改的内容更新 real DOM。

- [x] 必考：什么是高阶组件？
  
    高阶组件(HOC)是接受一个组件并返回一个新组件的函数。基本上，这是一个模式，是从 React 的组合特性中衍生出来的，称其为纯组件，因为它们可以接受任何动态提供的子组件，但不会修改或复制输入组件中的任何行为。

    ```
    const EnhancedComponent = higherOrderComponent(WrappedComponent);
    ```
    HOC 可以用于以下许多用例

    代码重用、逻辑和引导抽象
    渲染劫持
    state 抽象和操作
    props 处理
- [x] React diff 的原理是什么？
  
  
    React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；

    React 通过分层求异的策略，对 tree diff 进行算法优化；

    React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；

    React 通过设置唯一 key的策略，对 element diff 进行算法优化；


    把树形结构按照层级分解，只比较同级元素。

    给列表结构的每个单元添加唯一的 key 属性，方便比较。
    
    React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）

    合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.

    选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。
    
    [Diff 算法](https://zhuanlan.zhihu.com/p/20346379)

- [x] 必考 Redux 是什么？
    Redux 是 JavaScript 状态容器，提供可预测化的状态管理。重点是『状态管理』。

    Redux 由以下组件组成：

    Action – 这是一个用来描述发生了什么事情的对象。
    Reducer – 这是一个确定状态将如何变化的地方。
    Store – 整个程序的状态/对象树保存在Store中。
    View – 只显示 Store 提供的数据。

    缺点

    一个组件所需要的数据，必须由父组件传过来，而不能像 flux 中直接从 store 取。

    当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新 render，可能会有效率影响，或者需要写复杂的 shouldComponentUpdate 进行判断。
- [x] React的ref
  
    Refs 提供了一种访问在render方法中创建的 DOM 节点或者 React 元素的方法。在典型的数据流中，props 是父子组件交互的唯一方式，想要修改子组件，需要使用新的pros重新渲染它。凡事有例外，某些情况下咱们需要在典型数据流外，强制修改子代，这个时候可以使用 Refs。

    咱们可以在组件添加一个 ref 属性来使用，该属性的值是一个回调函数，接收作为其第一个参数的底层 DOM 元素或组件的挂载实例。
    [35道值得收藏的React面试题](https://www.html.cn/interview/14282.html)
- [x] redux的中间件
  
    中间件提供第三方插件的模式，自定义拦截 action -> reducer 的过程。变为 action -> middlewares -> reducer 。这种机制可以让我们改变数据流，实现如异步 action ，action 过滤，日志输出，异常报告等功能。

    常见的中间件：

    redux-logger：提供日志输出

    redux-thunk：处理异步操作

    redux-promise：处理异步操作，actionCreator的返回值是promise
- [x] flux
    
    Flux 的最大特点，就是数据的"单向流动"。

    用户访问 View
    View 发出用户的 Action
    Dispatcher 收到 Action，要求 Store 进行相应的更新
    Store 更新后，发出一个"change"事件
    View 收到"change"事件后，更新页面
- [x] connect 的原理是什么？
    react-redux 库提供的一个 API，connect 的作用是让你把组件和store连接起来，产生一个新的组件（connect 是高阶组件）
    
    React-Redux 提供<Provider/>组件，能够使你的整个app访问到Redux store中的数据：

    mapStateToProps, 输入逻辑
    mapDispatchToProps 输出逻辑

    输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数

    输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。
### TypeScript
- [x] never 类型是什么？
  
   never 类型表示的是那些永不存在的值的类型。 例如， never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
   
   没有显式返回值的函数会隐式返回 undefined 。尽管我们通常说这样的函数 “什么也不返回”，但实际上它是会返回的。在这些情况下，我们通常忽略返回值。在 TypeScript 中这些函数的返回类型被推断为 void 。
   具有 never 返回类型的函数 永不返回 。它也不返回 undefined 。该函数没有正常完成，这意味着它可能会抛出异常或根本无法退出执行。

   [TypeScript never 类型](http://www.fly63.com/article/detial/8120?type=3)

- [x] TypeScript 比起 JavaScript 有什么优点？
   
  简单来说 提供了类型约束，因此更可控、更容易重构、更适合大型项目、更容易维护

  1. 静态输入
  静态类型化是一种功能，可以在开发人员编写脚本时检测错误。查找并修复错误是当今开发团队的迫切需求。有了这项功能，就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。

  2. 大型的开发项目
  有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。使用TypeScript工具来进行重构更变的容易、快捷。

  3. 更好的协作
  当发开大型项目时，会有许多开发人员，此时乱码和错误的机也会增加。类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

  4. 更强的生产力
  干净的 ECMAScript 6 代码，自动完成和动态输入等因素有助于提高开发人员的工作效率。这些功能也有助于编译器创建优化的代码。

### Webpack
- [x] 必考：有哪些常见 loader 和 plugin，你用过哪些？
    
    有哪些常见的Loader？他们是解决什么问题的？

    file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件

    url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去

    source-map-loader：加载额外的 Source Map 文件，以方便断点调试

    image-loader：加载并且压缩图片文件

    babel-loader：把 ES6 转换成 ES5

    css-loader：加载 CSS，支持模块化、压缩、文件导入等特性

    style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。

    eslint-loader：通过 ESLint 检查 JavaScript 代码

    有哪些常见的Plugin？他们是解决什么问题的？

    define-plugin：定义环境变量

    commons-chunk-plugin：提取公共代码

    uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码



- [x] 英语题：loader 和 plugin 的区别是什么？
    不同的作用

    Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。

    Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

    loader 通常是1对1，把1个文件打包形成另外一个文件。 plugin是1对n个文件，把多个文件打包合成一个文件。

    不同的用法

    Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）

    Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。


   [webpack 面试题目](https://zhuanlan.zhihu.com/p/44438844)
- [x] 必考：如何按需加载代码？
    为了快速开发前端项目，经常会引入现成的UI组件库如ElementUI、iView等，但是他们的体积和他们所提供的功能一样，是很庞大的。 而通常情况下，我们仅仅需要少量的几个组件就足够了，但是我们却将庞大的组件库打包到我们的源码中，造成了不必要的开销。

    不过很多组件库已经提供了现成的解决方案，如Element出品的babel-plugin-component和AntDesign出品的babel-plugin-import 安装以上插件后，在.babelrc配置中或babel-loader的参数中进行设置，即可实现组件按需加载了。

    单页应用的按需加载 现在很多前端项目都是通过单页应用的方式开发的，但是随着业务的不断扩展，会面临一个严峻的问题——首次加载的代码量会越来越多，影响用户的体验。

    通过import(*)语句来控制加载时机，webpack内置了对于import(*)的解析，会将import(*)中引入的模块作为一个新的入口在生成一个chunk。 当代码执行到import(*)语句时，会去加载Chunk对应生成的文件。import()会返回一个Promise对象，所以为了让浏览器支持，需要事先注入Promise polyfill
- [x] 必考：如何提高构建速度？
  
    多入口情况下，使用CommonsChunkPlugin来提取公共代码

    通过externals配置来提取常用库

    利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。

    使用Happypack 实现多线程加速编译

    使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。 原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度

    使用Tree-shaking和Scope Hoisting来剔除多余代码
- [x] 转义出的文件过大怎么办？
   
   去除不必要的插件

   提取第三方库

   代码压缩, webpack 自带了一个压缩插件 UglifyJsPlugin，

   代码分割

   设置缓存

   [彻底解决 webpack 打包文件体积过大](https://www.jianshu.com/p/a64735eb0e2b)
上面五题请看这个不错的参考：https://zhuanlan.zhihu.com/p/44438844
### 安全
- [x] 必考：什么是 XSS？如何预防？
  
    [「每日一题」XSS 是什么？](https://zhuanlan.zhihu.com/p/22500730)
- [x] 必考：什么是 CSRF？如何预防？
 
    [「每日一题」CSRF 是什么？](https://zhuanlan.zhihu.com/p/22521378)
## 开放题目
- [x] 必考：你遇到最难的问题是怎样的？
  
  一波三折。参考 https://www.zhihu.com/question/35323603
- [x] 你在团队的突出贡献是什么？
  
  把小事说大。
- [x] 最近在关注什么新技术
  
  书、博客、推特、知乎，不要说 CSDN、百度
- [x] 有没有看什么源码，看了后有什么记忆深刻的地方，有什么收获
  
    看过源码说源码，推荐看 underscore.js 的源码
    没看过源码就说同事的代码，代码烂就说哪里烂，代码好就说哪里好
    收获：命名规范、设计模式
### 刁钻题目
- [ ]  代码
(a ==1 && a== 2 && a==3) 可能为 true 吗？
### 超纲题
- [x] JS 垃圾回收机制
   
   什么是垃圾

   如何捡垃圾（遍历和计数，只是不同的算法而已）

   前端又有其特殊性（JS进程和DOM进程）
  

   [垃圾回收](https://zh.javascript.info/garbage-collection)

   [高级进阶](http://newhtml.net/v8-garbage-collection/)
- [x] Eventloop 说一下
  
    肤浅理解：『一会儿』和『尽快』异步任务

    详细理解：Eventloop 是个啥？

    浏览器有 Eventloop 吗？

    [什么是 Event Loop？](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)

    [浅析 JS 中的 EventLoop 事件循环（新手向）](https://segmentfault.com/a/1190000019313028)
## 个性化题目
- [x] PWA
  
     PWA，全称直译过来就是渐进式网页应用（ProgressiveWebApp）。PWA的概念由Chrome项目组在2015年的时候提出，很明显，它是一种基于网页的应用，但它又与传统的Web App又有一些不同

     [请问什么是PWA？](https://www.jiangweishan.com/article/html9234jsldkjflsdjf.html)
- [ ] echarts.js / d3.js
- [x] three.js
  
      three.js是JavaScript编写的WebGL第三方库。提供了非常多的3D显示功能。

      WebGL的第三方库这是重点

      Three.js 是一款运行在浏览器中的 3D 引擎，你可以用它创建各种三维场景，包括了摄影机、光影、材质等各种对象


- [x] flutter

   Flutter是Google一个新的用于构建跨平台的手机App的SDK。写一份代码，在Android 和iOS平台上都可以运行。

  [Flutter是什么？](https://www.jianshu.com/p/51e989500ca3)
- [x] SSR
  
    SSR：Server Side Rendering
    服务端渲染，由服务器进行渲染并返回给客户端渲染完成的html

    优点
    超快的响应速度
    易做SEO
    缺点
    增加服务器压力
    主流框架
    Next.js —— React的SSR方案
    Nuxt.js —— Vue的SSR方案