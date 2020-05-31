## 目录
1. [template模板写法](#template模板写法)
2. [template模板语法](#template模板语法)
3. [绑定属性](#绑定属性)
4. [显示/隐藏](#显示/隐藏)
5. [directive指令](#directive指令)
6. [更多信息](#更多信息)


### template模板写法
我们把`HTML`模板叫做`template`
#### 写法一：Vue完整版，写在HTML里
```
<div id=xxx>
    {{n}}
   <button @click="add">+1</button>
</div>
**************
new Vue({
  el: '#xxx',
  data:{n:0}, // data
  methods:{add(){}}
})
```
#### 写法二：Vue完整版，写在选项里
请注意，在下面的代码中`div#app`会被替代
```
<div id=app></div>
***************
new Vue({
  template: `
    <div>
      {{n}}
      <button @click="add">+1</button>
    </div>`,
  data:{n:0}, // data
  methods:{add(){ this.n += 1 }}
}).$mount('#app')
```
#### 写法三: Vue非完整版，配合xxx.vue文件
```
// xxx.vue文件代码
<template> 
  <div> // template里面的为XML文件
  {{n}}
   <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
   data(){ return {n:0} },
  // data 必须为函数
  methods:{add(){ this.n += 1 }}
}
</script>

<style>
  div{
     background:#ffff
  }
</style>
```
然后在另外一个地方导入`xxx.vue`文件，进行渲染
```
import Xxx from './xxx.vue'
// Xxx 是一个options对象
new Vue({
   render: h => h(Xxx)
}).$mount('#app') 
```
### template模板语法
#### 展示内容
表达式
* `{{ object.a }}`： 表达式的语法
* `{{ n+1 }}`： 进行运算的表达式
* `{{ fn(n) }}`： 进行调用函数的表达式
* 如果表达式的值为`undefined`或者`null`，页面就不会显示
* 也可以写为`<div v-text='表达式></div>'`

`HTML`内容
* 如果设置`data.x`值为`<strong>hi</strong>`，可以写为`<div v-html='x'></div>`等价于`div.innerHTML = x`, 页面显示为粗体的`hi`
* 如果设置`<div v-pre>{{ n }}</div>`, 因为`v-pre`不会对模板进行编译，页面显示为`{{ n }}`
### 绑定属性
* 绑定`src`
```
<img v-bind:src="x">
// 等价于 img.src = x
```
* 简写`v-bind`的形式:`<img :src='x>`: 
* 绑定对象
```
<div>
  :style="{
      boder: '1px solid red';
      height: 100 // 等价于'100px'
  }"
</div>
```
#### 绑定事件
语法为：使用`v-on：事件名`

实例:
```
// 点击之后，Vue会运行add()
<button v-on:click="add">+1</button>
// 点击之后，Vue会运行xxx(1)
<button v-on:click="xxx(1)">xxx</button>
// 点击之后，Vue会运行n+=1
<button v-on:click="n+=1">xxx</button>

// 缩写
<button @click="add">+1</button>
```

原理：发现函数就有括号调用，否则就直接运行代码。
特别注意的是：不推荐使用执行一个函数，函数执行后再返回一个函数的形式来绑定事件

#### 条件判断
语法: 使用`v-if`和`v-else`

实例：
```
// 如果x大于0，就显示
<div v-if='x>0'>
  x大于0
</div>

// 如果x等于0，就显示
<div v-else-if='x===0'>
  x为0
</div>

// 如果x小于0，就显示
<div v-else='x<0'>
  X小于0
</div>
```

#### 循环
语法：使用`for(value, key) in Array or Object`

实例：每个`v-for`必须写绑定`key`
```
<ul>
  <li v-for="(u,index) in users" :key="index">
      索引:{{index}} 值:{{u.name}}
  </li>
</ul>

<ul>
   <li v-for="(value, name) in obj" :key="name">
      属性名:{{name}},属性值:{{name}}
   </li>
</ul
```
特别值得注意的是`:key="inex"`存在`bug`
### 显示/隐藏
语法：`v-show`

实例:

```
<div v-show="n%2===0"> n是偶数 </div> 
// 等价于
<div :style="{display:n%2===0?'block':'none'}"> n是偶数 </div>
```
特别值得注意的是，如果想让元素`display`看的见，不只有`block`, 例如在`table`中`display:table`,在`li`中`display:list-item`, 这两者都能被显示出来
#### 小结
`Vue`模板的主要特点
* 使用`XML`语法，必须使用`</>`
* 使用`{{}}`语法插入表达式
* 使用`v-html`,`v-on`,`v-bind`等指令操作`DOM`, 为声明式编程, `div.innerHTML = x`为命令式编程。
* 使用`v-if`,`v-for`等指令来实现条件判断和循环

其他指令
* `v-model`
* `v-slot`
* `v-once`
* `v-cloak`

### directive指令
#### 定义
在下面的代码中，以`v-`开头的就是指令
```
<div v-text="x"></div>
<div v-html="x"></div>
```
#### 语法
* 如果值里没有特殊字符，可以不加`()`括号
* 有些指令没有参数和值，例如`v-pre`
* 有些指令没有值，例如`v-on:click.prevent`
```
指令名:参数=值
v-on:click=add
```
#### 修饰符
部分指令支持修饰符

下面的代码中，`.stop`之类的就是修饰符
```
@click.stop="add"         //表示阻止事件传播/冒泡
@click.prevent="add"      //表示阻止默认动作
@click.stop.prevent="add" //表示阻止默认动作和事件冒泡
```
部分指令的修饰符
* `v-on`支持的有: `.{keycode | keyAlias}`, 例如`<input @keypress.13 = "y"/>`当用户按下回车，执行`y`函数, 其他的还有:`.stop`,`.prevent`,`.capture`,`.self`,`.once`,`passive`,`native`, 快捷键相关的有:`.ctrl`,`.alt`,`.shift`,`.meta`,`.exact`。鼠标相关的有:`.left`,`.right`,`middle`
* `v-bind`支持的有`.pop`,`.camel`,`.sync`
* `v-model`支持的有`.lazy`,`.number`,`.trim`

#### .sync修饰符
原理\
`.sync`修饰符本质上是语法糖，将代码进行了简化。核心原理是对子组件， 对父组件的`pros`进行监听并且更新。先把父组件的`props`传入子组件，如果子组件触发事件，对父组件的`props`进行修改,`.sync`就会监听该事件并且更新父组件的`props`

`Vue`规则
* 组件不能修改外部数据`props`，只能触发事件，通知父组件的`props`进行修改
* `this.$emit`可以触发事件，并且传递参数
* `$event`可以获取`$emit`的参数

场景\
爸爸有`1w`块钱，儿子打电话请求爸爸传钱(触发事件)，然后进行花费

代码实例
```
// 儿子组件，从爸爸组件那里请求钱，然后消费
<template>
  <div class="child">
    {{money}}
    // 点击按钮，触发事件
    <button @click="$emit('update:money', money-100)">
      <span>花钱</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["money"]
};
</script>

<style>
.child {
  border: 3px solid green;
}
</style>
```
```
// 爸爸组件，传钱给儿子，并监听儿子动态
<template>
  <div class="app">
    App.vue 我现在有 {{total}}
    <hr>
    <Child :money.sync="total"/>
    // 等价于<Child :money="total" v-on:update:money="total = $event"/>
  </div>
</template>

<script>
import Child from "./Child.vue";
export default {
  data() {
    return { total: 10000 };
  },
  components: { Child: Child }
};
</script>

<style>
.app {
  border: 3px solid red;
  padding: 10px;
}
</style>
```
#### 小结
主要的修饰符有
* `@click.stop = xxx`
* `@click.prevent = xxx` 
* `@keypresess.enter = xxx`
* `:money.sync="total"`

### 更多信息
>[Vue 中文文档](https://v1-cn.vuejs.org/)

>[Vue 修饰符](https://cn.vuejs.org/v2/guide/forms.html#%E4%BF%AE%E9%A5%B0%E7%AC%A6)

>[深入理解vue 修饰符sync](https://www.jianshu.com/p/6b062af8cf01)

>[如何理解Vue的.sync修饰符](https://segmentfault.com/a/1190000010700521)