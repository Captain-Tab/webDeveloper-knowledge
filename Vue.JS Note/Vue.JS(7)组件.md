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