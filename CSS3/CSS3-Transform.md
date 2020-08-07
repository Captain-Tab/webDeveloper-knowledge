## 目录
1. [Transform](#Transform)
2. [Translate位移](#Translate位移)
3. [Scale缩放](#Scale缩放)
4. [Rotate旋转](#Rotate旋转)
5. [倾斜Skew](#倾斜Skew)
6. [Transform多重效果](#Transform多重效果)
7. [Transition过渡](#Transition过渡)

### Transform 
`transform`属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改`CSS`视觉格式化模型的坐标空间来实现的。

`transform`有4个方法，分别是`translate`平移、`rotate`旋转、`scale`缩放、`skew`斜切

`transition`有`4`个值（默认是前`2`个值）：`property`(指定`css`属性的`name`)、`duration`（动画持续时间）、`timing-function`(切换动画的速度)、`delay`(动画执行前的延迟时间)


### Translate位移
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

#### 可以使用animation的用途
* 声明关键帧
* 添加动画

