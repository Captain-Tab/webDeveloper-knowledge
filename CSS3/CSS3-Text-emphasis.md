## 目录
1. [介绍](#介绍)
2. [详情](#详情)
3. [浏览器兼容性](#浏览器兼容性)
4. [更多信息](#更多信息)

### 介绍
通常如果想要对某部分文字进行强调，通常的做法是加粗，或者使用一个高亮的颜色，现在有了新的选择，就是使用`text-emphasis`属性进行强调装饰

`text-emphasis`家族总共有4个`CSS`属性，分别是：

* `text-emphasis`
* `text-emphasis-color`
* `text-emphasis-style`
* `text-emphasis-position`

其中，`text-emphasis`是`text-emphasis-color`和`text-emphasis-style`这两个`CSS`属性的缩写，注意，并不包含`text-emphasis-position`属性，`text-emphasis-position`属性是独立的。

### 详情
1. `text-emphasis-color`

`text-emphasis-color`表示用来强调的字符的颜色，初始值就是当前文字的颜色

2. `text-emphasis-style`

语法有
```
text-emphasis-style: none
text-emphasis-style: [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ]
text-emphasis-style: <string>
```
`text-emphasis-style:none`是默认声明，表示没有任何强调装饰

`text-emphasis-style:<string>`表示使用任意的单个字符作为强调装饰符

示例代码
```
// html代码
宝贝，<span class="emphasis">爱你</span>，<span class="emphasis">比心</span>！
代码

// css代码
.emphasis {
    -webkit-text-emphasis-style: '❤';
    text-emphasis-style: '❤';
}
```

效果为：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f36b48d69fc467588b4a5860712e87b~tplv-k3u1fbpfcp-zoom-1.image)

需要注意的是:

1. 显示的强调装饰符的字号是主文字内容字号的一半，例如假设文字是`16px`大小，则上方的强调字符的大小则是`8px`
2. 如果行高不是很高，则强调装饰符会自动增加当前这一行所占据的高度。
3. 强调装饰符和正文之间的距离是无法通过设置行高等属性进行调节的，距离的大小主要由字体决定
4. 如果指定的是多个字符，则只会使用第`1`个字符作为强调装饰符
```
text-emphasis-style: 'CSS新世界';
// 等价于
text-emphasis-style: 'C';
```
`text-emphasis-style`内置的几个装饰符效果，他们是`dot`（点）、`circle`（圆）、`double-circle`（双层圆）、`triangle`（三角）、`sesame`（芝麻点）。

每一种装饰符都有实心和空心两种字符，是通过`filled`和`open`这两个关键字决定的
```
/* 实心的圆点 */
text-emphasis: filled dot;
/* 空心的圆点 */
text-emphasis: open dot;
```
由于内置字符默认都是使用实心的，因此，`text-emphasis:filled dot`的效果等同于`text-emphasis:dot`

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ca987938b2d4eaab9af7833380bd593~tplv-k3u1fbpfcp-zoom-1.image)

3. `text-emphasis-position`

`text-emphasis-position`属性用来指定强调装饰符的位置，默认位置是在正文的上方，我们可以指定强调装饰符在正文的下方，也可以指定垂直排版的时候强调装饰符是左侧还是右侧。

语法
```
text-emphasis-position: [ over | under ] && [ right | left ]
```
代码示例
```
text-emphasis-position: over left;
text-emphasis-position: under right;
text-emphasis-position: under left;

text-emphasis-position: left over;
text-emphasis-position: right under;
text-emphasis-position: left under;
```
`text-emphasis-position`的初始值是`over right`。`right`定位出现在文字垂直排版的时候，例如设置`writing-mode:vertical-rl`，此时就可以看到强调装饰符在右侧了

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18996c4702fb47388efed170907e102a~tplv-k3u1fbpfcp-zoom-1.image)

4. `text-emphasis`

`text-emphasis`是`text-emphasis-color`和`text-emphasis-style`这两个`CSS`属性的缩写，使用示意：
```
text-emphasis: circle deepskyblue;
```

### 浏览器兼容性

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35efb90217754653bc616132119fbd1a~tplv-k3u1fbpfcp-zoom-1.image)

### 更多信息

> [使用CSS text-emphasis对文字进行强调装饰
](https://www.zhangxinxu.com/wordpress/2020/06/css-text-emphasis/)