## 目录
1. [介绍 Vue.JS](#介绍Vue.JS)
2. [MVVM 模式](#MVVM模式)
3. [初始化 Vue 实例](#初始化Vue实例)
4. [文本插值和表达式](#文本插值和表达式)
5. [生命周期钩子函数](#生命周期钩子函数)

### 介绍Vue.JS

`vue.js`是一个轻巧，高性能，可组件化的`MVVM`库，同时拥有容易上手的`API`

`vue.js`是一个构建数据驱动的`web`界面的库

`vue.js`是一套构建用户界面的渐进式框架，与其他框架不同的事，Vue 采用自底向上增量开发的设计。`Vue`的核心在于只关注视图层，轻松上手，同时容易和其他库或者项目兼容。此外，`Vue`完全由能力驱动采用文件组件和`Vue`生态系统支持的库开发复杂的单页应用，是数据驱动+组件化的前端开发

`Vue`的核心是一个响应的数据绑定系统，目标是通过尽可能简单的 API 实现数据的绑定和组合的视图组件

### MVVM模式

![](https://user-gold-cdn.xitu.io/2020/4/22/171a069d0dae858b?w=693&h=288&f=png&s=14194)
`Model`(数据类型)负责操作所有数据。最上面的一层，是直接面向最终用户的"视图层"。它是提供给用户的操作界面，是程序的外壳。

`View`(视图)负责所有 UI 页面。最底下的一层，是核心的"数据层"，也就是程序需要操作的数据或信息。

`ViewModel`(视图数据类型)它负责根据用户从"视图层"输入的指令，选取"数据层"中的数据，然后对其进行相应的操作，产生最终结果。即当属性变更时触发视图和数据对应的操作

### 初始化Vue实例

通过`CDN`引入`Vue`库

```
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

创建`Vue`实例

```
const vm = new Vue({
    el:"#app",
    data:{
     message: "hello world"
    }
})
```

构造属性入门

- `el` ：挂载点, 挂载在`DOM`中，可以用`$smount`代替
- `data`: 内部函数，支持对象和函数，优先用函数，避免数据被两个数据共用，而函数会被调用，产生新的数据。
- `methods`: 方法，事件处理函数或者普通函数，每次更新都会触发重新渲染
- `components`: `Vue`组件，三种引入方式，推荐最后一种

渲染实例

```
<div id="app">
  {{message}}
</div>
```

访问`Vue`实例的属性

```
console.log(app.$el)
console.log(app.$data)
```

访问`data`的属性

```
console.log(app.message)
```

### 文本插值和表达式

使用双括号`{{}}`是最基本的文本插值方法，它会自动将我们双向绑定的数据实时显示出来。`vue.js`只支持单个表达式，不支持语法和流控制

```
{{6+6*3}}             //可以运算
{{6>3 ? msg: a}}      //可以使用三元运算符
{{if(6>3)}}           //不支持书写表达式
{{var a = 6}}         //不支持多个表达式
{{if(ok) return msg}} //不支持流控制
```

### 生命周期钩子函数

![](https://user-gold-cdn.xitu.io/2020/4/22/171a0eb4232e9a24?w=1200&h=3039&f=png&s=77677)

1. `beforeCreate`（创建前）:`beforeCreate`钩子函数，这个时候，`vue`实例的挂载元素`$el`和数据对象`data`都为`undefined`，还未初始化。无法访问到数据和真实的`dom`和`data`中的数据，可以在这里面使用`loading`

2. `created`（创建后）:`created`函数中可以对`data`对象里面的数据进行使用和更改，不会触发其他的钩子函数，一般可以在这里做初始数据的获取，也可以结束`loading`; 这里进行`dom`操作需要使用`vue.nextTick()`方法

3. `beforeMount`（挂载前）：`beforeMount`钩子函数，`vue`实例的`$el`和`data`都初始化了，但还是虚拟的`dom`节点，具体的`data.filter`还未替换。在这里也可以更改数据，不会触发其他的钩子函数，一般可以在这里做初始数据的获取

4. `mounted`（挂载后）：`mounted`钩子函数，此时，组件已经出现在页面中，数据、真实`dom`都已经处理好了,事件都已经挂载好了，`data.filter`成功渲染，可以在这里操作真实`dom`等事情...

5. `beforeUpdate` （更新前）：当组件或实例的数据更改之后，会立即执行`beforeUpdate`，然后`vue`的虚拟`dom`机制会重新构建虚拟`dom`与上一次的虚拟`dom`树利用`diff`算法进行对比之后重新渲染，一般不做什么事儿

6. `updated`（更新后）：当更新完成后，执行`updated`，数据已经更改完成，`dom`也重新`render`完成，可以操作更新后的虚拟`dom`

7. `beforeDestroy`（销毁前）：当经过某种途径调用`$destroy`方法后，立即执行`beforeDestroy`，一般在这里做一些善后工作，例如清除计时器、清除非指令绑定的事件等等

8. `destroyed`（销毁后）：`vue`实例解除了事件监听以及和`dom`的绑定（无响应了），但`DOM`节点依旧存在。这个时候，执行`destroyed`，在这里做善后工作也可以
