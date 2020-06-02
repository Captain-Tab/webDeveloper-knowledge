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
  
  内联元素居中方案

    水平居中设置：

    1. 行内元素
    * 设置`text-align:center`；
    2. `Flex`布局
    * 设置`display:flex;justify-content:center`;(灵活运用,支持`Chroime，Firefox，IE9+`)
  
    垂直居中设置：
    1. 父元素高度确定的单行文本（内联元素）
    * 设置`text-align:center`；
    2. 父元素高度确定的多行文本（内联元素）
    * `a`:插入`table`（插入方法和水平居中一样），然后设置 `vertical-align:middle`；
    * `b`:先设置`display:table-cell`再设置 `vertical-align:middle`；

  块级元素居中方案

    水平居中设置：
    1. 定宽块状元素
    * 设置 左右`margin`值为`auto`；
    2. 不定宽块状元素
    * `a`:在元素外加入 `table` 标签（完整的，包括 `table`、`tbody`、`tr`、`td`），该元素写在`td`内，然后设置`margin`的值为`auto`；
    * `b`:给该元素设置`displa:inine`方法；
    * `c`:父元素设置`position:relative`和`left:50%`，子元素设置`position:relative`和`left:50%`；

   垂直居中设置：
   * 使用`position:absolute（fixed`,设置`left、top、margin-left、margin-top`的属性;
   * 利用`position:fixed（absolute）`属性，`margin:auto`这个必须不要忘记了;
   * 利用`display:table-cell`属性使内容垂直居中;
   * 使用`css3`的新属性`transform:translate(x,y)`属性;
   * 使用`:before`元素;


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
- [ ] 必考：ES 6 语法知道哪些，分别怎么用？
- [ ] 必考 Promise、Promise.all、Promise.race 分别怎么用？
- [ ] 必考：手写函数防抖和函数节流
- [ ] 必考：手写AJAX
- [ ] 必考：这段代码里的 this 是什么？
- [ ] 必考：闭包/立即执行函数是什么？
- [ ] 必考：什么是 JSONP，什么是 CORS，什么是跨域？
- [ ] 常考：async/await 怎么用，如何捕获异常？
- [ ] 常考：如何实现深拷贝？
- [ ] 常考：如何用正则实现 trim()？
- [ ] 常考：不用 class 如何实现继承？用 class 又如何实现？
- [ ] 常考：如何实现数组去重？
- [ ] 放弃：== 相关题目（反着答）
- [ ] 送命题：手写一个 Promise
### DOM
- [ ] 必考：事件委托
- [ ] 曾考：用 mouse 事件写一个可拖曳的 div
### HTTP
- [ ] 必考：HTTP 状态码知道哪些？分别什么意思？
- [ ] 大公司必考：HTTP 缓存有哪几种？
- [ ] 必考：GET 和 POST 的区别
- [ ] Cookie V.S. LocalStorage V.S. SessionStorage V.S. Session
### Vue框架
- [ ] 必考：watch 和 computed 和 methods 区别是什么？
- [ ] 必考：Vue 有哪些生命周期钩子函数？分别有什么用？
必考：Vue 如何实现组件间通信？
必考：Vue 数据响应式怎么做到的？
必考：Vue.set 是做什么用的？
Vuex 你怎么用的？
VueRouter 你怎么用的？
路由守卫是什么？
### React框架
- [ ] 必考：受控组件 V.S. 非受控组件
- [ ] 必考：React 有哪些生命周期函数？分别有什么用？（Ajax 请求放在哪个阶段？）
- [ ] 必考：React 如何实现组件间通信？
- [ ] 必考：shouldComponentUpdate 有什么用？
- [ ] 必考：虚拟 DOM 是什么？
- [ ] 必考：什么是高阶组件？
- [ ] React diff 的原理是什么？
- [ ] 必考 Redux 是什么？
- [ ] connect 的原理是什么？
### TypeScript
- [ ] never 类型是什么？
- [ ] TypeScript 比起 JavaScript 有什么优点？
### Webpack
- [ ] 必考：有哪些常见 loader 和 plugin，你用过哪些？
- [ ] 英语题：loader 和 plugin 的区别是什么？
- [ ] 必考：如何按需加载代码？
- [ ] 必考：如何提高构建速度？
- [ ] 转义出的文件过大怎么办？
上面五题请看这个不错的参考：https://zhuanlan.zhihu.com/p/44438844
### 安全
- [ ] 必考：什么是 XSS？如何预防？
- [ ] 必考：什么是 CSRF？如何预防？
## 开放题目
- [ ] 必考：你遇到最难的问题是怎样的？
- [ ] 你在团队的突出贡献是什么？
- [ ] 最近在关注什么新技术
- [ ] 有没有看什么源码，看了后有什么记忆深刻的地方，有什么收获
### 刁钻题目
- [ ]  代码
(a ==1 && a== 2 && a==3) 可能为 true 吗？
### 超纲题
- [ ] JS 垃圾回收机制
- [ ] Eventloop 说一下
## 个性化题目
- [ ] PWA
- [ ] echarts.js / d3.js
- [ ] three.js
- [ ] flutter
- [ ] SSR