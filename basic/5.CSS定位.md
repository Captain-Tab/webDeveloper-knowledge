## 目录
1. [Div分层](#Div分层)
2. [层叠上下文](#层叠上下文)
3. [Position定义](#Position定义)
4. [static属性](#static属性)
5. [relative属性 ](#relative属性)
6. [absolute属性](#absolute属性)
7. [fixed属性](#fixed属性)
8. [sticky属性](#sticky属性)
9. [更多信息](#更多信息)


### Div分层
`div`的分层结构是：由下到上分别是，`background`，`border`，块级元素，浮动元素，内联元素。后面添加的的浮动元素会覆盖之前的内联元素
![](https://user-gold-cdn.xitu.io/2020/2/3/17009ce481f5a235?w=1177&h=469&f=jpeg&s=59198)

### 层叠上下文
层叠上下文(`stacking context`)，是`HTML`中一个三维的概念。在`CSS2.1`规范中，每个盒模型的位置是三维的，分别是平面画布上的`X`轴，`Y`轴以及表示层叠的`Z`轴。一般情况下，元素在页面上沿`X`轴`Y`轴平铺，我们察觉不到它们在`Z`轴上的层叠关系。而一旦元素发生堆叠，这时就能发现某个元素可能覆盖了另一个元素或者被另一个元素覆盖。
![](https://user-gold-cdn.xitu.io/2020/2/4/1700da8189f47191?w=1184&h=721&f=jpeg&s=73374)

#### 注意事项
* 每个层叠上下文就是一个新的小世界(可以理解为作用域)
* 这个小世界里面的`z-index`只和同在小世界的`z-index`进行比较，跟外界的`z-index`无关
* 在`MDN`文档中可以找到不正交的属性创造层叠上下文
* 需要注意的有`z-index/flex/opacity/transform`
* `CSS`应该单独创建一个属性做这个事

### Position定义
定位允许您从正常的文档流布局中取出元素，并使它们具有不同的行为，例如放在另一个元素的上面，或者始终保持在浏览器视窗内的同一位置。 本文解释的是定位的各种不同值，以及如何使用它们。

`postion`属性
* `static`
* `relative`
* `absolute`
* `fixed`
* `sticky`

### static属性
该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时`top`, `right`, `bottom`, `left`和`z-index`属性无效。(默认值，待在文档流里)
### relative属性
该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。`position:relative` 对 `table-*-group, table-row, table-column, table-cell, table-caption`元素无效。(相对定位，不脱离文档流，改变在文档流中的位置)

#### 使用场景
* 用于做位移
* 用于设置`absolute`的祖先元素

#### 配合z-index
* `z-index:auto`默认值，不创建层叠上下文
* `z-index: 0/1/2`
* `z-index: -1/-2`

#### 注意事项
* 学会管理`z-index`
* 不写`z-index: 9999`

### absolute属性
元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非`static` 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（`margins`），且不会与其他边距合并。(绝对定位，定位基准是祖先里的非`static`)

#### 使用场景
* 脱离原来的位置，创建新的一层，例如对话框的关闭按钮
* 鼠标提示

#### 注意事项
* 不要认为`absolute`是相对于`relative`定位的
* 某些浏览器不写`top`和`left`会位置错乱
* 学会使用`left: 100%`
* 学会使用`left: 50%`; 加负`margin`

### fixed属性
元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（`viewport`）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。`fixed`属性会创建新的层叠上下文。当元素祖先的`transform`,`perspective`或`filter`属性非`none` 时，容器由视口改为该祖先。(固定定位，定位基准是`Viewport`)

#### 使用场景
* 烦人的广告
* 回到顶部的导航栏或者按钮

#### 注意事项
* 尽量不在移动端上用这个属性，很多问题
* 例如`transform: scale(1.1)`会造成`fixed`的`BuG`

### sticky属性
元素根据正常文档流进行定位，然后相对它的最近滚动祖先（`nearest scrolling ancestor`）和 `containing block` (最近块级祖先 `nearest block-level ancestor`)，包括`table-related`元素，基于`top`, `right`, `bottom`, 和 `left`的值进行偏移。偏移值不会影响任何其他元素的位置。
该值总是创建一个新的层叠上下文（`stacking context`）。注意，一个`sticky`元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的`overflow`是`hidden`,`scroll`,`auto`, 或 `overlay`时），即便这个祖先不是真的滚动祖先。这个阻止了所有`sticky`行为。(粘滞定位)

#### 注意事项
* 如果写了`absolute`,一般都需要补一个`relative`
* 如果写了`absolute`或者`fixed`，必须要补`top`和`left`
* `sticky`兼容性很差

### 更多信息
>[CSS position MDN中文](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/%E5%AE%9A%E4%BD%8D)

>[CSS position属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

>[CSS定位详解](https://blog.csdn.net/weixin_38055381/article/details/81558288)

>[层叠代码](http://js.jirengu.com/gewob/1/edit?html,css,output)

>[负z-index逃不出小世界](http://js.jirengu.com/modez/1/edit?html,css,output)

>[CSS 层叠](https://juejin.im/post/5b876f86518825431079ddd6)

>[张鑫旭的博客](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

>[CSS 层叠详解](https://blog.towavephone.com/CSS-world-stacking-rule/)

>[CSS absolute详解](https://www.jianshu.com/p/a3da5e27d22b)