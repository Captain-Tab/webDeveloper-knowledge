## 目录
1. [什么是变化侦测](#什么是变化侦测)

### 什么是变化侦测
通常在运行网页项目的时候，状态不停改变， 需要不停的重新渲染。但是如果确定什么时候该进行渲染呢?
变化侦测就是用来解决这个问题的，分为两种类型，一种是"推", 一种是"拉"

`Angular`和`React`的变化都属于拉，当状态发生变化的时候，不知道哪个状态变了，只知道状态有可能变化了，然后就发送信号给框架，框架在使用方法来找到哪些`DOM`节点需要更新。
`Angular`使用的是脏检查的流程，`React`使用的是虚拟`DOM`。

`Vue`的变化侦测属于推，当状态发生变化的时候，`Vue.js`马上就知道了，而且知道是哪些状态变化了。当获取的信息越多，就可以进行更细粒度的更新。

粒度更新指的是一个状态绑定好多个依赖，每个依赖代表一个具体的`DOM`节点，如果这个状态更新了，就会向依赖发送更新的信息，从而更新`DOM`。但是这样也存在问题，因为粒度更细，需要绑定的依赖越多，依赖所消耗的内存也就越高了。
所以从`Vue2`开始，引入了虚拟`DOM`，将粒度调整为中等粒度，即一个状态所依赖的不再是具体的`DOM`节点，而是一个组件。这样状态变化时，可以降低依赖数量，减少内存。

由于`Vue`使用了"推"的变化侦测策略，可以随意调整粒度。

#### 如何追踪变化
那么如何在`JavaScript`中监听对象的变化呢？通常有两种原生的方法，分别为`Ojbect.defineProperty`和`Proxy`。
`Vue2`使用的为`Ojbect.defineProperty`,`Vue3`使用的为`Proxy`

下面的函数使用`Ojbect.defineProperty`来封装一个对象，每当读取`data`的`key`的数据时，执行`get`函数，修改`data`的`key`时，`set`函数触发
```
function defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val
        },
        set: function (newVal) {
            if(val === newVal) {
                return 
            }
              val = newVal
        }
    })
}
```
