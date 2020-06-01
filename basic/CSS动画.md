## 目录
1. [动画原理](#动画原理)
2. [浏览器渲染过程](#浏览器渲染过程)
3. [Transform](#Transform)
4. [Scale缩放](#Scale缩放)
5. [Rotate旋转 ](#Rotate旋转)
6. [倾斜Skew](#倾斜Skew)
7. [Transform多重效果](#Transform多重效果)
8. [Transition过渡](#Transition过渡)
9. [Animation](#Animation)
10. [更多信息](#更多信息)

### 动画原理
动画是由许多静止的画面(帧)以一定的速度连续播放组成，由于人的肉眼因视觉残像产生错觉，而错以为是活动的画面。例如影视画面以每秒`24`帧播放，游戏以每秒`30`帧进行播放。

#### 简单实例
使用`demo.style.left = n / 100 * 300 + 'px'`做动画, 移动`Div`
* 配合使用`SetInterval`每隔一小段时间移动`Div`，知道移动到目的点
* 移动过程中`CSS`一直在绘制`repaint`，耗费性能

使用`transform: translateX(300px)`做动画,移动`Div`
* 需要配合使用`SetTimeout`计时器，因为直接运行，会直接合成
* 并没有`repaint`,性能要比上面的例子好

### 浏览器渲染过程
#### 过程
1. 根据`HTML`构建`HTML`树,为`DOM`
2. 根据`CSS`构建`CSS`树,为`CSSOM`
3. 将上面两棵树合并为一颗树，为`render tree`
4. 进入`Layout`布局，包含构建文档流，盒模型，计算大小和位置
5. 进入`Paint`绘制，绘制边框，文字，背景等等
6. 进入`Composite`合成，根据不同层，和层叠关系组合最终画面展示
![](https://user-gold-cdn.xitu.io/2020/2/4/1700e4367d7d21a9?w=1063&h=495&f=jpeg&s=68247)

#### 三种更新方式
![](https://user-gold-cdn.xitu.io/2020/2/5/17013faf5e78e713?w=725&h=699&f=jpeg&s=102920)
* 第一种, 全过程\
例如`div.remove()`会触发更新，经历布局，绘制，合成全过程
* 第二种\
例如`div.style.background='red`会触发更新跳过布局，直接进入绘制，合成过程
* 第三种
例如改变`transform: translateX(300px)`将触发更新，跳过布局，绘制，直接进入合成过程

#### 使用JS更新样式
* 设置`Div`的背景色`div.style.background='red'`
* 设置`Div`为不展示`div.style.display='none'`
* 修改`Div`类的名称`div.classList.add('red')`
* 移除`Div`节点`div.remove()`

#### CSS动画优化
* `JS`优化
使用`requestAnimationFram`代替`setTimeout`或者`setInterval`
* `CSS`优化
使用`will-change`或者`Translate`

### Transform 
`transform`属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改`CSS`视觉格式化模型的坐标空间来实现的。

#### Translate位移
* `transltateX(<length-percentage>)`
* `translateY(<length-percentage>)`
* `translate(<length-percentage>,<length-percentage>?)`
* `translateZ(<length>)` 父容器为`perspective`
* `translated3d(x,y,z)`
* `top:50%;top:50%,translate(-50%,-50%)`可以做到绝对定位元素的居中

### Scale缩放
#### 用法
* `scaleX(<number>)`
* `scaleY(<number>)`
* `scaleY(<number>,<number>)`
* 容易出现模糊

### Rotate旋转
#### 用法
* `rotate([<angle>|<zero>])`
* `rotateZ([<angle>|<zero>])`
* `rotateX([<angle>|<zero>])`
* `rotateY([<angle>|<zero>])`
* [rotate3D](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotate3d)
* 用来旋转`360`度查看文档

### 倾斜Skew
#### 用法
* `skewX([<angle>|<zero>])`
* `skewY([<angle>|<zero>])`
* `skew([<angle>|<zero>],[<angle>|<zero>])`

### Transform多重效果
* `transform: scale(0.5) translate(-100%,-100%);`
* `transform: none;`

#### 注意事项
* 通常需要配合`transition`过渡
* `inline`元素不支持`transforme`,需要先转化为`block`，再使用

### Transition过渡
`transition`属性是`transition-property`，`transition-duration`，`transition-timing-function` 和`transition-delay`的一个简写属性
#### 用法
用来补充中间帧
#### 语法
* `transition`: (属性名 时长 过渡方式 延迟);
* `transition`: `left 200ms linear`;
* `transition`: `left 200ms, top 400ms`; 使用逗号，分割不同的两个属性
* `transition`: `all 200ms`; 可以用`all`代表所有属性
* 过渡方式有:` linear | ease | ease-in | ease-out | ease-in-out |  cubic-bezier | step-start | step-end | steps` 

#### 注意事项
并不是所有的属性都能过渡
* 当`display:none `转化为`display: block`不能过渡
* 这种情况可以设置`visibility:hidden`转化为`visibility:visible`
* `backgound`的颜色可以过渡
* `opacity`的颜色可以过渡
* 过渡必须要有开始和结束，动画为一次或者两次，例如`hover`和非`hover`的过渡

#### 过渡中间点
除了上述情况，还可以设置过渡的中间点
#### 使用两次transform
* `.a===transform===>.b`
* `.b===transform===>.c`
* 使用`setTimeout`或者监听`transition`事件得知到了中间点

#### 使用animation
* 声明关键帧
* 添加动画

### Animation
#### 语法1
```
@keyframes slidein {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
```
#### 语法2
```
@keyframes identifier {
  0% { top: 0; left: 0; }
  30% { top: 50px; }
  68%, 72% { left: 50px; }
  100% { top: 100px; left: 100%; }
}
```
#### 缩写语法
`animation`: 时长 | 过渡方式 | 延迟 | 次数 | 方向 | 填充模式 | 是否暂停 | 动画;
* 时长: `1s`或者`1000ms`
* 过渡方式: 和`transtion`取值一样，如`linear`
* 次数: `3`或者`2.4`或则和`infinite`
* 方向: `reverse | alternate | alternate-reverse`
* 填充模式: `none | forwards | backwards | both`
* 是否暂停: `paused | running`
* 以上所有属性都有对应的单独属性

#### 让动画停止在最后一帧
* 搜索`css animation stop at end`
* [相关链接1](https://stackoverflow.com/questions/12991164/maintaining-the-final-state-at-end-of-a-css3-animation/12991203#12991203)
* [相关链接2](http://js.jirengu.com/lodoy/1/edit?html,css,output)


### 更多信息
>[CSSOM](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh_cn)

>[CSS render performance](https://developers.google.com/web/fundamentals/performance/rendering/?hl=zh_cn)

>[transform animation](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count?hl=zh_cn)

>[CSS trigger website](https://csstriggers.com/)

>[如何优化css动画 google](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)

>[Transform MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)

>[Transiton MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)

>[timing-function MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function)

