### Vue.JS组件
#### 使用组件的原因
作用：提高代码的复用性
#### 组件的使用方法
##### 方法一：全局注册
优点：所有的`vue`实例都可以用

缺点：权限太大，容错率降低
```
Vue.component('my-component',{
   template:'<div>我是组件的内容</div>'
})
```
##### 方法二：局部注册
```
const vm = new Vue({
  el: "#app",
  components: {
    "my-component": {
      template: "<div>我是组件的内容</div>",  
    },
  },
});
```
##### 注意事项
`vue`组件的模板在某些情况下会受到`html`标签的限制，比如`<table>`中只能 有`<tr>`,`<td>`这些元素，所以直接在`table`中使用组件是无效的，此时可以使用`is`属性来挂载组件
```
<table>
     <tbody is="my-component"></tbody>
</table>
```
#### 组件的使用技巧
1. 推荐使用小写字母加`-`进行命名（必须）类似于`child`, `my-componnet`来命名组件
2. `template`中的内容必须被一个`DOM`元素包括 ，也可以嵌套
3. 在组件的定义中，除了`template`之外的其他选项`data`,`computed`,`methods`
4. `data`必须是一个方法

#### 使用props传递数据
1. 在组件中使用`props`来从父亲组件接收参数，注意，在`props`中定义的属性，都可以在组件中直接使用
2. `props`来自父级，而组件中`data return`的数据就是组件自己的数据，两种情况作用域就是
组件本身，可以在`template`，`computed`，`methods`中直接使用
3. `props`的值有两种，一种是字符串数组，一种是对象，本节先只讲数组
4. 可以使用`v-bind`动态绑定父组件来的内容
```
<div id="app">
    <h5>我是父组件</h5>
    <child-component msg="我来自父组件"></child-component>
</div>
<script>
 const vm = new Vue({
     el: '#app',
     components:{
         'child-component':{
             props:['msg'],
             template:'<div>{{msg}}</div>'
         }
 })
</script>
```
#### 单向数据流
* 解释 : 通过`props`传递数据 是单向的了， 也就是父组件数据变化时会传递给子组
件，但是反过来不行。
* 目的 : 是尽可能将父子组件解稿，避免子组件无意中修改了父组件的状态。
* 应用场景: 业务中会经常遇到两种需要改变 `props` 的情况

##### 实现原理
一种是父组件传递初始值进来，子组件将它作为初始值保存起来，在自己的作用域下可以随意使用和修改。这种情况可以在组件 `data` 内再声明一个数据，引用父组件的 `props`
1. 步骤一：注册组件
2. 步骤二：将父组件的数据传递进来，并在子组件中用`props`接收
3. 步骤三：将传递进来的数据通过初始值保存起来
