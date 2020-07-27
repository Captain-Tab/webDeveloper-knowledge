## 目录
1. [伪类介绍](#伪类介绍)
2. [伪类分类](#伪类分类)
3. [结构伪类选择器](#结构伪类选择器)
4. [伪元素介绍](#伪元素介绍)
5. [伪元素实例](#伪元素实例)
6. [伪元素和伪类的区别](#伪元素和伪类的区别)

### 伪类介绍

核心用途：用于某些选择器添加特殊效果。

主要使用场景：在页面中，有时候同一个元素在不同动作下有不同的样式。比如链接在没有点击的时候有个样式，在鼠标放上去有另外的样式，还有在点击完成以后又会又一个样式。这几种情况下这个链接的标签并没有变化，有变化的只是它的状态，这时候就可以里用伪类来实现这个需求。

语法：浏览器中，伪类的出现是为了向某些选择器添加特殊的效果或限制。伪类是在正常的选择器后面加上伪类名称，中间用冒号(:)隔开。比如我们希望一个超链接在鼠标放上去的时候有一个下划线：
```
a:{
    text-decoration: none;
}
a:hover{
    text-decoration: underline;
}
```
![](https://user-gold-cdn.xitu.io/2020/7/27/1738dbf446957725?w=748&h=682&f=webp&s=25718)
### 伪类分类

动态伪类选择器
```
: link // 超链接点击之前
: visited // 链接被访问过之后
: hover // 鼠标放到标签上的时候
: active // 鼠标点击标签，但是不松手的时候
```
`UI`元素状态伪类选择器
```
: enabled // 可以输入的状态
: disabled // 不可以输入的状态
```
其他伪类选择器
```
: focus // 获取焦点后进行的操作
: selection // 被选定后进行的选择操作
: empty // 选取没有子元素的元素。
```
### 结构伪类选择器
结构伪类选择器，可以根据元素在文档中所处的位置，来动态选择元素，从而减少HTML文档对ID或类的依赖，有助于保持代码干净整洁

需要注意的是：
* 结构伪类选择器很容易遭到误解，需要特别强调。如，`p:first-child`表示选择父元素下的第一个子元素 `p`，而不是选择 `p` 元素的第一个子元素。
* 需要注意的是，结构伪类选择器中，子元素的序号是从 1 开始的，也就是说，第一个子元素的序号是 1，而不是 0。换句话说，当参数 n 的计算结果为 0 时，将不选择任何元素。

结构伪类选择器主要有:
* `:last-child`	选择父元素的倒数第一个子元素E，相当于E:nth-last-child(1)	
* `:nth-child(n)`	选择父元素的第n个子元素，n从1开始计算	
* `:nth-last-child(n)`	选择父元素的倒数第n个子元素，n从1开始计算	
* `:first-of-type`	选择父元素下同种标签的第一个元素，相当于E:nth-of-type(1)	
* `:last-of-type`	选择父元素下同种标签的倒数第一个元素，相当于E:nth-last-of-type(1)	
* `:nth-of-type(n)`	与:nth-child(n)作用类似，用作选择使用同种标签的第n个元素	
* `:nth-last-of-type`	与:nth-last-child作用类似，用作选择同种标签的倒数第一个元素	
* `:only-child`	选择父元素下仅有的一个子元素，相当于E:first-child:last-child或E:nth-child(1):nth-last-child(1)	
* `:only-of-type`	选择父元素下使用同种标签的唯一子元素，相当于E:first-of-type:last-of-type或E:nth-of-type(1):nth-last-of-type(1)	
* `:empty`	选择空节点，即没有子元素的元素，而且该元素也不包含任何文本节点	
* `:root`	选择文档的根元素，对于HTML文档，根元素永远HTML

具体用途：

`: root`
```
:root {
    background-color: var(--blue);
}
```
`:empty`
```
div:empty {
    background-color: var(--red);
}
```
`:target`
```
#first:target {
    background-color: var(--red);
}
#second:target {
    background-color: var(--blue);
}
#third:target {
    background-color: var(--yellow);
}
```
`:first-child`
```
div:first-child {
    background-color: var(--red);
}
```
`last-child`
```
div:last-child {
    background-color: var(--red);
}
```
`:nth-child(n)`
```
div:nth-child(2n) {
    background-color: var(--red);
}
```
`:nth-last-child(n)`
```
div:nth-last-child(2n) {
    background-color: var(--red);
}
```
`:not`
```
div:nth-last-child(2n) {
    background-color: var(--red);
}
```
### 伪元素介绍
核心用途：创建一些不在文档树中的元素，并且为他添加样式。

主要使用场景：比如说，我们可以通过:before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

伪元素的语法:
```
selector:pseudo-element {property:value;}
// CSS 类也可以与伪元素配合使用
selector.class:pseudo-element {property:value;}
```
![](https://user-gold-cdn.xitu.io/2020/7/27/1738dc38b177340d?w=616&h=265&f=webp&s=8712)
### 伪元素实例

`: first-letter`伪元素用于向文本的首字母设置特殊样式
```
p:first-letter
  {
  color:#ff0000;
  font-size:xx-large;
  }
```
`: before`伪元素可以在元素的内容前面插入新内容
```
h1:before
  {
  content:url(logo.gif);
  }
```
`: after`伪元素
```
h1:after
  {
  content:url(logo.gif);
  }
```
`:: selection`用于文档被用户高亮的部分，比如鼠标或者其他设备选中的部分
```
p::selection{
    background-color: #ffeb3b;
}
```
### 伪元素和伪类的区别
* 伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档数外的元素。因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素
* 伪类使用的单冒号`:`,在CSS3中，伪元素使用双冒号`::`