## 目录
1. [设计草图工具](#设计草图工具)
2. [CSS布局分类](#CSS布局分类)
3. [CSS布局思路](#CSS布局思路)
4. [float布局](#float布局)
5. [flex布局 ](#flex布局)
6. [Grid布局](#Grid布局)
7. [更多信息](#更多信息)


### 设计草图工具
* [balsamiq](https://balsamiq.com/)
* [figma](https://www.figma.com/)
* [墨刀](https://modao.cc/)
* [adobe XD](https://www.adobe.com/products/xd.html)

#### 前端戒律
* 没有设计稿，就不能写代码。老板同意设计稿，再写代码。
* 设计师不给设计稿，不做

### CSS布局分类
`CSS`页面布局技术允许我们拾取网页中的元素，并且控制它们相对正常布局流、周边元素、父容器或者主视口/窗口的位置

#### 布局分类
* 固定宽度布局，一般为`960/1000/1024px`
* 不固定宽度布局，和文档流布局类似，自适应布局
* 响应式布局，`PC`为固定宽度，网页根据不同的手机屏幕大小进行适应，也为混合型布局

### CSS布局思路
#### 从大到小
先定下设计稿，完成整个大框架，然后在完成每个部分的小布局
#### 从小到大
先完成小的布局，在组合成完整的网页
#### CSS布局的选择
1. 如果需要兼容`IE 9`, 选择`float`布局。左浮两个,固定高度不要响应式,给父元素添加`clearfix`,必要时候采用负`margin`
2. 如果不需要兼容`IE 9`,兼容最新浏览器,使用`grid`布局
3. 如果即不需要兼容`IE 9`,也不需要兼容最新浏览器，使用`flex`布局，必要时候采用`margin`

### float布局
#### 理论实现
1. 子元素设置为`float:left`和`width`

2. 父元素设置为`.clearfix`(重点)

实例代码
```
// html代码
<body>
    <header class="clearfix">
      <div class="logo">xdml</div>
      <nav>hello world</nav>
    </header>
</body>
```
```
// css代码
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
header{
  border: 1px solid black;
}
.logo{
  border: 1px solid red;
  height: 40px;
  width: 100px;
  float: right;
  margin-top: 5px;
}
nav {
  border: 1px solid green;
  width: 200px;
  height: 50px;
  float: left;
}

```
最终效果图

![](https://user-gold-cdn.xitu.io/2020/2/1/170004ebb8e7d7db?w=434&h=70&f=png&s=2455)

#### 注意事项
* 通常会留一些空间或者最后一个不设`width`
* 该布局适用于`IE`,所以不需要做响应式，手机没有`IE`
* `IE 6/7` 有`double margin`的`bug`，解决方法为：将`margin`减半或者添加`display：inline-block`


#### float布局分类
* 两栏布局，实例为顶部 
* 三栏布局，实例为内容
* 四栏布局，实例为导航
* 平均布局，实例为产品展示区

#### 注意事项 ####
* float应用于IE网页端需求
* float不适用手机端
* float加上头尾，适用于大部分网页端
* float要求程序员自己设计宽度，不够灵活

实例代码
```
// html代码
<body>
  <header class="clearfix">
    <div class="logo">
      <img src="..." alt="">
    </div>
    <ul class="clearfix nav">
      <li>首页</li>
      <li>课程</li>
      <li>优惠</li>
      <li>关于</li>
    </ul>
  </header>

  <div class="content clearfix">
    <aside>一行有六个字</aside>
    <main></main>
    <div class="ad"></div>

  </div>
  <div class="imageList">
    <div class="x  clearfix">
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
    </div>
  </div>
</body>
```
```
// css代码
*{margin:0;padding:0;box-sizing: border-box;}
ul,ol{
  list-style: none;
}

img{max-width: 100%;}
header{display: block;}

.clearfix:after{
  content: '';
  display: block;
  clear: both;
}
.logo{
  background: grey;
  display: inline-block;
  float: left;
  margin-top: 8px;
  margin-left: 10px;
}
.logo>img{
  height: 26px;
  vertical-align: middle;
}
.nav{
  float: right;
  margin-left: 20px;
}
ul > li {
  float: left;
  padding: 4px 0.5em;
  line-height: 32px;
}
ul{
  display: inline-block;
}
header{
  background: grey;
  color: white;
}
.content{
  margin-top: 10px;
}
.content{
  outline: 1px solid red;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.content>aside{
  width: 200px;
  height: 300px;
  float: left;
  background: #999;
}
.content> main{
  height: 300px;
  width: 500px;
  float: left;
  background: #ccc;
}
.content>.ad{
  width: 100px;
  height: 300px;
  float: left;
  background: #000;
}
.imageList{
  outline: 1px solid green;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  
}
.imageList >.x > .image{
  width: 191px;
  height: 191px;
  background: #000;
  border: 50px solid red;
  float: left;
  margin-bottom: 10px;
  margin-right: 12px;
}
.imageList > .x{
  margin-right: -12px;
}
```
最终效果图

![](https://user-gold-cdn.xitu.io/2020/5/27/1725351f22a79ce8?w=826&h=722&f=jpeg&s=48595)

### flex布局
规定了弹性元素如何伸长或缩短以适应`flex`容器中的可用空间。这是一个简写属性，用来设置 `flex-grow`, `flex-shrink`与`flex-basis`

#### flex基础
```
// 设置元素为flex容器
.container{
    display: flex;
    /* or inline-flex*/
}
```
![](https://user-gold-cdn.xitu.io/2020/2/2/17004342e62ff3df?w=737&h=417&f=jpeg&s=42621)
![](https://user-gold-cdn.xitu.io/2020/2/2/17004348f0decd49?w=705&h=442&f=jpeg&s=43712)

```
// 设置items流动方向
.container{
flex-direction: row | row-reverse | column | column-reverse;
 }
```
![](https://user-gold-cdn.xitu.io/2020/2/2/17004390941ff426?w=518&h=267&f=jpeg&s=27249)

```
// 改变拆行
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
![](https://user-gold-cdn.xitu.io/2020/2/2/170043ef899e4f67?w=515&h=289&f=jpeg&s=27669)

```
// 设置主轴对齐方式,一般默认为横轴，改变flex-direction将会改变主轴对齐方式
.container {
 justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
}
```
![](https://user-gold-cdn.xitu.io/2020/2/2/17004448f9b85a74?w=456&h=664&f=jpeg&s=46135)

```
// 设置次轴对齐方式
.container {
  align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
}
```
![](https://user-gold-cdn.xitu.io/2020/2/2/170044913fb939a4?w=504&h=672&f=jpeg&s=53043)

```
// 设置多行内容
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
}
```
![](https://user-gold-cdn.xitu.io/2020/2/2/170044ce1b4c672e?w=491&h=673&f=jpeg&s=61280)


#### flex item属性
`item order`属性
![](https://user-gold-cdn.xitu.io/2020/2/2/17004935437575f5?w=461&h=400&f=jpeg&s=33001)
`item flex-grow`属性
![](https://user-gold-cdn.xitu.io/2020/2/2/170049614d3905d8?w=582&h=234&f=jpeg&s=27497)
`item flex-shrink`属性,默认为`1`，为`0`是防止缩小

`item flex-basis`属性

`align-self` 定制 `align-items`属性
![](https://user-gold-cdn.xitu.io/2020/2/2/17004b6c83c3d843?w=579&h=300&f=jpeg&s=25838)


#### 总结重点代码
* `display: flex`
* `flex-direction: row/column`
* `flex-wrap:wrap`
* `just-content: center/space-between`
* `-align-items: center`

#### 注意事项
* 不能把`width`和`height`写死，除非特殊说明。可以替换采用`min-width/max-width/min-height/max-height`
* `flex`布局可以基本满足所有需求
* `flex`布局和`margin-xxx: auto`配合有意外的效果
代码实例
```
// html代码
<body>
  <header class="header">
    <div class="logo">
      <img src="..." alt="">
    </div>
    <ul>
      <li>首页</li>
      <li>课程</li>
      <li>优惠</li>
      <li>关于</li>
    </ul>
  </header>
  <div class="content">
    <aside>一行有六个字</aside>
    <main></main>
    <div class="ad"></div>
  </div>
  
  <div class="imageList">
    <div class="x">
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
      <div class="image"></div>
    </div>
  </div>
</body>
```
```
// css代码
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
ol {
  list-style: none;
}
img {
  max-width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: grey;
  padding: 4px 0;
}
.logo {
  display: flex;
  align-items: center;
}
.logo>img {
  height: 26px;
  vertical-align: middle;
}
ul {
  display: flex;
}
ul>li {
  padding: 4px;
}
.content {
  display: flex;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.content>aside {
  background: #000;
  width: 200px;
}
.content>main {
  background: #666;
  height: 400px;
  flex-grow: 1;
}
.content>.ad {
  background: #999;
  width: 100px;
}
.imageList{
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
.imageList > .x{
  display: flex;
  flex-wrap: wrap;
  margin-right: -6px;
  margin-left: -6px;
}
.image{
   width: 191px;
  height: 191px;
  background: grey;
  border: 1px solid red;
  margin-right: 6px;
  margin-left: 6px;
  margin-bottom: 10px;
}
```
最终效果

![](https://user-gold-cdn.xitu.io/2020/5/27/1725359ab1b57645?w=769&h=755&f=jpeg&s=35455)

### Grid布局
`grid`是一个`CSS`简写属性，可以用来设置以下属性：
* 显式网格属性`grid-template-rows、grid-template-columns`和`grid-template-areas`，
* 隐式网格属性`grid-auto-rows、grid-auto-columns`和`grid-auto-flow`，
* 间距属性`grid-column-gap`和`grid-row-gap`

#### container容器
```
.container {
  display: grid | inline-grid;
}
```
#### 方法一: row/column行和列
```
.container {
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
```
![](https://user-gold-cdn.xitu.io/2020/2/3/17008a80b154a146?w=712&h=565&f=jpeg&s=42745)

```
// 同时也可以给每行，每列设置名字
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```
![](https://user-gold-cdn.xitu.io/2020/2/3/17008ad928c1ff76?w=698&h=571&f=jpeg&s=40795)
```
// 可以设置一个小grid的范围，计算网格线，从1开始数
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start;
  grid-row-end: 3;
}
```
结果为
![](https://user-gold-cdn.xitu.io/2020/2/3/17008b207705987b?w=682&h=494&f=jpeg&s=35961)

#### 方法二: row/column行和列
将`Grid`设置为一份一份,`The fr unit allows you to set the size of a track as a fraction of the free space of the grid container`
```
.container {
  grid-template-columns: 1fr 1fr 1fr;
}
```

```
 // 或者，在这个例子中fr不包括50像素
.container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}
```
#### 方法三: row/column行和列
使用`grid-template-areas`，给每个分区命名，再进行设置
```
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}
.container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```
结果为

![](https://user-gold-cdn.xitu.io/2020/2/3/17008d50ef18ea7f?w=689&h=488&f=jpeg&s=42325)
#### 设置Grid间隙 
```
.container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}
```
结果为

![](https://user-gold-cdn.xitu.io/2020/2/3/17008dcd847bbf86?w=695&h=564&f=jpeg&s=45871)

实例代码
```
// html代码
<body>
<div class="demo">
  <div class="image bigImage"></div>
  <div class="image smallImage"></div>
  <div class="image smallImage"></div>
  <div class="image smallImage"></div>
  <div class="image middleImage"></div>
  <div class="image middleImage"></div>
  <div class="image middleImage"></div>
</div>
</body>
```
```
// css代码
*{margin:0;padding:0;box-sizing: border-box;}

.demo{
  display: inline-grid;
  border: 1px solid red;
  grid-template-rows: 240px repeat(4, 120px); 
  grid-template-columns: 250px 250px;
  grid-template-areas: 
    "big mid1"
    "big mid2"
    "sm1 mid2"
    "sm2 mid3"
    "sm3 mid3";
}
.demo > .image:first-child{
  grid-area: big;
  border: 1px solid red;
}
.demo > .image:nth-child(2){
  grid-area: sm1;
  border: 1px solid red;
}
.demo > .image:nth-child(3){
  grid-area: sm2;
  border: 1px solid red;
}
.demo > .image:nth-child(4){
  grid-area: sm3;
  border: 1px solid red;
}
.demo > .image:nth-child(5){
  grid-area: mid1;
  border: 1px solid red;
}
.demo > .image:nth-child(6){
  grid-area: mid2;
  border: 1px solid red;
}
.demo > .image:nth-child(7){
  grid-area: mid3;
  border: 1px solid red;
}
```
最终效果

![](https://user-gold-cdn.xitu.io/2020/5/27/17253610a38cdc76?w=485&h=688&f=jpeg&s=25809)

### 更多信息
>[MDN CSS布局](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Introduction)

>[学习CSS布局](http://zh.learnlayout.com/no-layout.html)

>[CSS trick-float](https://css-tricks.com/almanac/properties/f/float/)

>[CSS trick-flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

>[CSS grid布局](https://css-tricks.com/snippets/css/complete-guide-grid/)