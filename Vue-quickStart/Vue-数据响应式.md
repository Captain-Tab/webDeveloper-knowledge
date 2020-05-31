## 目录
1. [Vue的Data](#Vue的Data)
2. [数据响应式](#数据响应式)
3. [响应式网页](#响应式网页)
4. [对象中新增的key](#对象中新增的key)
5. [数组中新增的key](#数组中新增的key)
6. [更多信息](#更多信息)



### Vue的Data
#### ES 6的setter和getter
对象属性也可以是一个函数、`getter`、`setter`方法。
语法
```
var o = {
  property: function ([parameters]) {},
  get property() {},
  set property(value) {},
};

```
#### Object.defineProperty
作用：
* 可以给对象添加属性`value`
* 可以给对象添加`getter/setter`, `getter/setter`用来对属性的读写进行监控

语法:
```
var o = {}; // 创建一个新对象

// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
  value : 37,
  writable : true,
  enumerable : true,
  configurable : true
});
```

#### 代理模式
代理的设计模式，意思为`vm`实例负责对`myData`对象属性的读写。即`vm`就是`myData`的代理,类似于房屋中介，住户通过中介和房东交流。例如通常`vm.n`来操作`myData.n`,而不是直接操作`myData.n`
#### 原理

![](https://user-gold-cdn.xitu.io/2020/3/16/170e291e01ac8d25?w=971&h=601&f=jpeg&s=50075)
`const vm = new Vue({data: myData})`
作用：
* **核心目的：对于data的任何变动，都得知情，从而重新进行渲染**
* 会让`vm`成为`myData`的代理，即`proxy`
* 同时会对`myData`的所有属性进行监控
* 监控的原因是，为了防止`myData`属性改变的时候，`vm`不知情。如果通知`vm`了，就可以进行操作，然后调用`render(data)`方法，渲染视图，即`UI=render(data)`
* 全程对`data`进行修改，并没有复制和生成新的`data`，只有覆盖修改
* 如果`data`有多个属性,`n`,`m`,`k`,那么就会有`get n/get m /get k`等

#### 实例
下面的例子是类似原理，已经很完善了，但是不通过设置`vm`,通过设置另外一个引用，可以直接修改`data`的值。
```
let data3 = proxy({data:{n:0}})

function proxy({data}){ // 解构赋值
  const obj = {}
  // 这里的n进行了简化，理论上需要遍历data的所有key
  Object.defineProperty(obj, 'n', {
   get(){
       return data.n
   },
   set(value){
       if(value<0) return
       data.n = value
   }
  })
  return obj  // obj就是代理
 }
```
这是最终的类似原理实现，实现了对`data`的监听和代理
```
let myData5 = {n: 0}
let data5 = proxy2({myData5})

function proxy2({data}){ // 解构赋值
  let value = data.n
  delete data.n     //这行可以省略，下面的代码会覆盖data.n
  
  // 这里的n进行了简化，理论上需要遍历data的所有key
  Object.defineProperty(data, 'n', {
   get(){
       return value
   },
   set(newValue){
       if(value<0) return
       value = newValue 
   }
  }) // 这里是监听逻辑
  
  Object.defineProperty(obj, 'n', {
   get(){
       return data.n
   },
   set(value){
       data.n = value
   }
  })
  return obj // obj就是代理
 }
 
 const vm = new Vue({data:{n:0}) // 等价于let data5 = proxy2({myData5})
```
### 数据响应式
数据响应式是指当数据改变时，`UI`或者视图能够做出相应的反应。
#### data属于响应式
在`const vm = new Vue({data:{n:0}})`中，如果修改`vm.n`,那么`UI`中的`n`就会做出响应
#### Vue的数据响应式
`Vue`响应式系统即对数据进行修改时，视图会进行更新；
当把`JS`对象传入`Vue`实例作为 `data` 选项，`Vue`将遍历此对象所有的属性，并使用 `Object.defineProperty` 把这些属性全部转为 `getter/setter`，`getter/setter` 对用户不可见，但是在内部它们让 `Vue` 能够追踪依赖，在属性被访问和修改时通知变更。
### 响应式网页
响应式网页是指当用户改变窗口大小，网页内容会做出响应
#### Vue的Bug
* `Object.defineProperty`有问题

在`Object.definePropery(obj, 'n', {...})`时，必须要有一个`'n'`,才能监听和代理`obj.n`。如果没有设置`n`,`Vue`会给出一个警告或者只会检查第一层属性 ，此时如果使用`set`方法，不会奏效，因为`Vue`没有办法监听一开始就不存在的属性。页面会显示空白

* 解决办法

1. 事先声明`key`,然后不再添加属性
2. 使用`vue.set`或者`this.$set`

### 对象中新增的key
`Vue`没有办法事先监听和代理，需要使用`set`来新增`key`,创建监听和代理，更新`UI`。推荐提前把属性都写好，不要新增`key`
#### Vue.set和this.$set
作用：
* 新增`key`，即对象的键名或者属性名
* 如果没有创建过，自动创建代理和监听
* 触发`UI`更新，但不会立刻更新，有延迟
实例：
```
methods:{
    add({
        vue.set(this.obj, 'b', 1)
        // 或者
        this.$set(this.obj, 'b', 1)
    }
}

```
### 数组中新增的key
由于数组的长度可以一直增加，没有办法提前把数组的`key`都声明出来，`Vue`也不能检测新增的下标。可以使用`set`来新增`key`, 但不会自动添加监听和代理，然后更新`UI`。 但是尤雨溪纂改了`7`个`API`来对数组进行操作，这`7`个`API`会自动处理监听和代理，并更新`UI`。

推荐使用这`7`个`API`来新增数组`key`:
* `push()`
* `pop()`
* `shift()`
* `unshift()`
* `splice()`
* `sort()`
* `reverse()`

使用代码模拟类似原理
```
class VueArray extends Array {
  push(...args) {
    const oldLength = this.length; // this
    super.push(...args);
    console.log(" push ");
    for (let i = oldLength; i < this.length; i++) {
      Vue.set(this, i, this[i]);
      // key Vue
    }
  }
}
```

### 更多信息
>[Vue 深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

>[ES 6更新特性](https://fangyinghang.com/es-6-tutorials/)

>[MDN 对象初始化](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0)

>[MDN Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

>[Vue 变异方法 (mutation method)](https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95-mutation-method)

>[《Vue 自测题》中答错率最高的题的解释](https://zhuanlan.zhihu.com/p/39421405)
