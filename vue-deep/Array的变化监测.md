## 目录
1. [和Object的区别](#和Object的区别)
2. [如何追踪变化](#如何追踪变化)
3. [拦截器](#拦截器)

### 和Object的区别
`Array`的检测方式和`Object`的不同, 例如
```
this.list.push(1)
```
如果说`Object`是通过`getter/setter`来实现监听，但是我们可通过`Array`的原型上的方法来修改数据内容，所以以上的实现方式就行不通了

### 如何追踪变化
数组追踪变化的原理是使用一个拦截器覆盖`Array.prototype`，之后，每当使用使用`Array`原型上的方法操作数组时，其实执行的都是拦截器中提供的方法。
然后在拦截器中使用原生`Array`的原型方法去操作数组。这样通过拦截器，我们就可以追踪到`Array`的变化

<img src="../assets/img/vue/array-data-listen.png" width="900px" hight="231px">

### 拦截器
拦截器其实就是和`Array.prototype`一样的`Object`, 里面包含的属性一模一样，只不过这个`Object`中某些可以改变数据自身内容的方法是处理过的。
例如`push, pop, shift, unshift, splice, sort，reverse`

```
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
['push', 'pop', 'shift', 'unshift'， 'splice', 'sort', 'reverse'].forEach((method)=> {
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function mutator(...args) {
            return original.apply(this, args)
        },
        enumerable: false,
        writable: true,
        configurable: true
    }
})
```

上面的代码逻辑为
* 创建变量`arrayMethods`, 继承`Array.prototype`
* 接着使用`Object.defineProperty`将那些可以改变数组自身的方法进行封装
* 使用`push`方法的时候，其实调用的是`arrayMethods.push`， 即函数`mutator`
* 在`mutator`函数里面我们执行了原生事件，也可以做其他的事，例如发送变化通知
