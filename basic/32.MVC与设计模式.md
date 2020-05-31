## 目录
1. [设计模式定义](#设计模式定义)
2. [设计模式思想](#设计模式思想)
3. [抽象思维](#抽象思维)
4. [MVC](#MVC)
5. [表驱动编程](#表驱动编程)
6. [EventBus](#EventBus)
7. [模块化](#模块化)
8.  [更多信息](#更多信息)


### 设计模式定义
设计模式就是对通用代码写法，模式取名。设计模式是总结得来的，程序员把代码写的优美，简洁的地方，提炼出来，看看符合哪个设计模式。

### 设计模式思想
**核心: Don't Repear Yourself**
#### 避免代码级别的重复
把相同的代码写了两遍，就应该重构
#### 避免页面级别的重复
把类似的页面做了10遍，就应该写出一个万金油的写法
#### 使用MVC来优化代码结构
所有的页面都可以使用`MVC`来优化代码结构
#### 学习MVC可以避免写出面条式代码
老手程序员为了鄙视烂代码，将其统称为意大利面条式代码
#### 学习MVC可以编码成为外包式程序员
不懂得抽象概念，只会重复自己，不会提示自己，只知道调用`API`

### 抽象思维
#### 最小知识原则
引入一个模板需要引入`html`, `css`, `js`,可以简化为引入一个模块只需要`js`,`js`包含所有文件。原理是**你需要知道的知识越少越好**， 模块化代码为这一点奠定了基础。
#### 以不变应万变
既然每个模块都可以使用`MVC`模式，那么每个模板我都这样写就好啦
#### 表驱动编程
当你看到大批类似但不重复的代码，分析哪些才是重要的数码，把重要的数据做出哈希表，这样的代码就简化了，这就是数据结构知识带来的红利。
#### 事不过三
同样的代码写三遍，就应该抽成一个函数。同样的属性写三遍，就应该做成共有属性，或者共有原型，类。同样的原型写三遍，就应该用继承。通过写文档，画类图可以解决代码看不懂的问题。
#### 俯瞰全局
把所有的对象看成点，一个点和一个点怎么通信，一个点和多个点怎么通信，多个点和多个点怎么通信。最终我们找出一个专用的点负责通信，这个点称为事件总线 `event bus`
#### view = render(data)
比起操作`DOM`对象，直接`render`简单多了，只要改变`data`,就可以得到对应的`view`, 虚拟DOM可以解决性能问题。

### MVC
这个模式认为，程序不论简单或复杂，从结构上看，每个模块都可以分为都可以分成三层，分别是`M`,`V`,`C`

1. `Model`(数据类型)负责操作所有数据。最上面的一层，是直接面向最终用户的"视图层"。它是提供给用户的操作界面，是程序的外壳。

2. `View`(视图)负责所有UI页面。最底下的一层，是核心的"数据层"，也就是程序需要操作的数据或信息。

3. `Controller`(控制器)负责其他。中间的一层，就是"控制层"，它负责根据用户从"视图层"输入的指令，选取"数据层"中的数据，然后对其进行相应的操作，产生最终结果。

这三层是紧密联系在一起的，但又是互相独立的，每一层内部的变化不影响其他层。每一层都对外提供接口`Interface`，供上面一层调用。这样一来，软件就可以


例如： 一家商场，完全可以分成三部分。一部分是仓库，负责提供商品，这是"功能层"（或者"数据层"）；另一部分是零售铺面，负责销售商品，这是它的"外观层"；两者之间就是"机制层"，包括柜台和仓库之间一切互动的机制。

这样区分以后，这个商场的结构就变得非常清楚，可以针对不同的层进行优化，提高效率。

#### MVC的进化之路
1. 纯`DOM`操作( 提醒:监听事件，转化状态时，不要使用`jQuery`的`CSS API`，推荐使用`addClass('active')`和`removeClass('active')`)
2. 引入`M`,`V`,`C`三个对象进行操作
3. 引入类
4. 引入继承
5. 引入路由

### 表驱动编程
表驱动法就是一种编程模式，从表里面查找信息而不使用逻辑语句。事实上，凡是能通过逻辑语句来选择的事物，都可以通过查表来选择。对简单的情况而言，使用逻辑语句更为容易和直白。但随着逻辑链的越来越复杂，查表法也就愈发显得更具吸引力。

简单讲是指用查表的方法获取值。 我们平时查字典以及念初中时查《数学用表》找立方根就是典型的表驱动法。在数值不多的时候我们可以用逻辑语句(`if` 或`case`)的方法来获取值,但随着数值的增多逻辑语句就会越来越长,此时表驱动法的优势就显现出来了。

例如：
```
function iGetMonthDays(iMonth) {
  let iDays;
  if(1 == iMonth) {iDays = 31;}
  else if(2 == iMonth) {iDays = 28;}
  else if(3 == iMonth) {iDays = 31;}
  else if(4 == iMonth) {iDays = 30;}
  else if(5 == iMonth) {iDays = 31;}
  else if(6 == iMonth) {iDays = 30;}
  else if(7 == iMonth) {iDays = 31;}
  else if(8 == iMonth) {iDays = 31;}
  else if(9 == iMonth) {iDays = 30;}
  else if(10 == iMonth) {iDays = 31;}
  else if(11 == iMonth) {iDays = 30;}
  else if(12 == iMonth) {iDays = 31;}
  return iDays;
}
```
如果使用表驱动编程
```
const monthDays = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
]
function getMonthDays(month, year) {
  let isLeapYear = (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0) ? 1 : 0
  return monthDays[isLeapYear][(month - 1)];
}
console.log(getMonthDays(2, 2000))
```

### EventBus
`EventBus`又称为事件总线。在`Vue`中可以使用`EventBus`来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件，但也就是太方便所以若使用不慎，就会造成难以维护的灾难，因此才需要更完善的`Vuex`作为状态管理中心，将通知的概念上升到共享状态层次。

#### 初始化
首先需要创建事件总线并将其导出，以便其它模块可以使用或者监听它。我们可以通过两种方式来处理。先来看第一种，新创建一个 `.js` 文件，比如 `event-bus.js`
```
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```
#### 发送事件
假设你有两个`Vue`页面需要通信： `A` 和 `B` ，`A`页面 在按钮上面绑定了点击事件，发送一则消息，想=通知 `B`页面。
```
<!-- A.vue -->
<template>
    <button @click="sendMsg()">-</button>
</template>

<script> 
import { EventBus } from "../event-bus.js";
export default {
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", '来自A页面的消息');
    }
  }
}; 
</script>
```
#### 接收事件
接下来，我们需要在 `B`页面 中接收这则消息。
```
!-- IncrementCount.vue -->
<template>
  <p>{{msg}}</p>
</template>

<script> 
import { 
  EventBus 
} from "../event-bus.js";
export default {
  data(){
    return {
      msg: ''
    }
  },
  mounted() {
    EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
      this.msg = msg;
    });
  }
};
</script>
```
同理我们也可以在 `B`页面 向 `A`页面 发送消息。这里主要用到的两个方法：
```
// 发送消息
EventBus.$emit(channel: string, callback(payload1,…))

// 监听接收消息
EventBus.$on(channel: string, callback(payload1,…))
```
#### 移除事件监听者
通常在`vue`页面销毁时，同时需要移除`EventBus`事件监听
```
import { 
  eventBus 
} from './event-bus.js'
EventBus.$off('aMsg', {})
```
#### 创建全局EventBus
它的工作原理是发布/订阅方法，通常称为 `Pub/Sub` 
```
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
```
在这个特定的总线中使用两个方法`$on`和`$emit`。一个用于创建发出的事件，它就是`$emit`；另一个用于订阅`$on`：
```
var EventBus = new Vue();

this.$bus.$emit('nameOfEvent', { ... pass some event data ...});

this.$bus.$on('nameOfEvent',($event) => {
  // ...
})
```
然后我们可以在某个`Vue`页面使用`this.$bus.$emit("sendMsg", '我是web秀')`;，另一个`Vue`页面使用
```
this.$bus.$on('updateMessage', function(value) {
  console.log(value); // 我是web秀
})
```
### 模块化
模块化主要体现的是一种分而治之的思想。分而治之是软件工程的重要思想，是复杂系统开发和维护的基石。模块化则是前端最流行的分治手段。

分而治之：将一个大问题分解成多个较为独立的与原问题性质相同的小问题，将所有的小问题的解答组合起来即可得到大问题的答案。

模块化的工程意义首先在于分治的思想，对功能进行分治，有利于我们的维护；其次是复用，有利于我们的开发。


### 更多信息
>[谈谈MVC模式](http://www.ruanyifeng.com/blog/2007/11/mvc.html)

>[http://waf2.kingdee.com:6888/waf2help/webviews/webframework/apis/eventbus](http://waf2.kingdee.com:6888/waf2help/webviews/webframework/apis/eventbus)

>[Vue事件总线（EventBus）使用详细介绍](https://zhuanlan.zhihu.com/p/72777951)

>[使用表驱动法替代普通的判断分支语句](https://www.jianshu.com/p/7c67179ed5a5)

>[前端模块化和组件化理解](https://segmentfault.com/a/1190000015437724)

>[前端MVC变形记](https://efe.baidu.com/blog/mvc-deformation/)

