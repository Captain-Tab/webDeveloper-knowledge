## 目录
1. [什么是变化侦测](#什么是变化侦测)
2. [如何收集依赖](#如何收集依赖)
3. [什么是Watcher](#什么是Watcher)
4. [递归侦测所有key](#递归侦测所有key)
5. [相关代码](#相关代码)

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

### 如何收集依赖
如果只是把`Object.defineProperty`进行封装，其实没有什么用处，重点在于收集依赖。我们可以把依赖收集的代码封装成一个`Dep`类，通过这个类收集依赖，删除依赖，或者向依赖发送通知
```
export default class Dep {
    constrcutor () {
        this.subs = []
    }

    addSub (sub) {
        this.subs.push(sub)
    }

    removeSub (sub) {
        remove(this.subs, sub)
    }

    depend () {
        if(window.target) {
            this.addSub(window.target)
        }
    }

    notify () {
        const subs = this.subs.slice()
        for(let i = 0; l = subs.lenght; i < l; i ++) {
            subs[i].update()
        }
    }

    function remove (arr, item) {
        if (arr.length) {
            const index = arr.indexOf(item)
            if (index > -1) {
                return arr.splice(index, 1)
            }
        }
    }
}
```
再改造一下`defineReactive`
```
function defineReactive (data, key, val) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        congfigurable: true,
        get: function () {
            dep.depend()
            return val
        },
        set: function (newVal) {
            if(val === newVal) {
                return
            }
            val = newVal
            dep.notify()
        }
    })
}
```

### 什么是Watcher
`watcher`是一个中介角色，数据发生变化时通知它，然后它再通知其他地方
例如当`a.b.c`变化时，执行对应的函数
```
// kepath
vm.$watch('a.b.c', function(newVal, oldBVal) {
    // do something
})
```
假设当`a.b.c`变化时，我们可以先通知`watcher`, `watcher`再执行对应的函数
```
export default class Watcher {
    constructor(vm, exPorfn, cb) {
        this.vm = vm
        // 执行this.getter(), 就可以读取data.a.b.c内容
        this.getter = parsePath(exPorfn)
        this.cb = cb
        this.value = this.get()
    }

    get() {
        window.target = this
        let value = this.gettter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }

    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}
```
不管是用户执行`vm.$watch('a.b.c', (value, oldValue) => {})`还是模板中用到的`data`, 都是通过`watcher`来通知自己是否需要发生变化。

`parsePath`函数先将`keypath`用，分割成数组，然后循环数组一层一层读取数据，然后返回`obj`
```
// 解析简单路径

const bailRE = /[^\w.$]/
export function parsePath (path) {
    if(bailRE.test(path)) {
        return
    }
    const segements = path.split('.')
    return function (obj) {
        for(let i = 0; i < segements.length; i++) {
            if(!obj) return
            obj = obj[segements[i]]
        }
        return obj
    }
}
```
### 递归侦测所有key
现在，其实已经可以实现变化监测的功能，我们希望把数据的所有属性，包括子属性都检测到，所以要封装一个`Observer`类。这个类的作用是将一个数据内的所有属性，包括子属性都换成`getter/setter`的形式，然后去追踪它们的变化

```
/*
* Observer类会附加到每一个被检测的object上
* 一旦附加上就会将object的所有属性转化为getter/setter的形式
*/

export class Observer {
    constructor (value) {
        this.value = value

        if(!Array.isArray(value)) {
            this.walk(value)
        }
    }

  
    // 将每一个属性转化为getter/setter的形式来侦听变化
    walk(obj) {
        const keys = Object.kes(obj)
        for(let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
    
    function defineReactive(data, key, val) {
        // 新增，递归子属性
        if(typeof val === 'object') {
            new Observer(val
        }
        let dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function(){
                dep.depend()
                return val
            },
            set: function(newVal){
                if(val === newVal) {
                    return
                }
                val = newVal
                dep.notify()
            }
        })
    }
}
```
在上面的代码中，我们定义了`Observer`类，用来将一个正常的`Object`转换为被侦测的`Ojbect`.然后判断数据的类型，只有`Object`类型的数据才会调用`walk`, 将每一个属性转换成`getter/setter`形式来监听变化
最后`defineReactive`中新增`new Observer`来递归子属性，这样将所有`data`中所有属性，包括子属性都转换成`getter/setter`的形式来监听变化



### 相关代码
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
<h2 id="test"></h2>
<button id="but">+1</button>
<script>
    class Watcher { //
        constructor(vm, exp, cb) {
            this.vm = vm
            this.exp = exp
            this.cb = cb
            this.value = this.get() //在watcher被实例化的时候调用下文的get方法
        }
        get() {
            Dep.target = this //缓存当前的this，this是一个watcher对象
            const value = this.vm.data[this.exp] //这段是精髓，通过获取对应属性的值，调用了被监听数据的get方法，由此调用了dep.depend()方法。由于Dep.target是存在的，于是往Dep实例中的subs数组添加了一个依赖，也就是watcher对象。
            Dep.target = null
            return value
        }
        update() { //在data发生改变的时候，监听数据的set方法被调用，dep实例调用notify方法，通知subs数组中的每一个依赖调用update方法，update方法会调用回调函数，更新元素的内容。
            const value = this.vm.data[this.exp]
            this.cb.call(this.vm,value)
        }
    }

    class Dep { //dep实例的作用是收集依赖
        constructor() {
            this.subs = []
        }
        addSub(sub) {
            this.subs.push(sub)
        }
        depend() {
            if (Dep.target) {
                this.addSub(Dep.target)
            }
        }
        notify() {
            const subs = this.subs.slice()
            for (let i = 0; i < subs.length; i++) {
                subs[i].update()
            }
        }
    }

    class Observer {
        defineReactive(data) {
            if (!data || typeof data != 'object') return
            let dep = new Dep()
            Object.keys(data).forEach(key => {
                let value = data[key]

                typeof value === 'object' && this.defineReactive(value)  //如果value还是对象，则对该对象递归继续使用defineReactive方法，实现深度绑定
                Object.defineProperty(data, key, { //使用该方法监听对象属性的变化
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        console.log(data, value, 'get method')
                        dep.depend()
                        return value
                    },
                    set: function (newValue) {
                        console.log(value, 'set method')
                        if (value === newValue) return
                        value = newValue
                        dep.notify()
                    }
                })
            })
        }
    }

    class Vue {
        constructor(options = {}) {
            this.el = options.el
            this.exp = options.exp
            this.data = options.data
            el.innerHTML = this.data[this.exp]
            let observer = new Observer()
            observer.defineReactive(this.data)
            new Watcher(this, this.exp, function(val) {
                el.innerHTML = val
            })
            return this
        }
    }
    let el = document.getElementById("test")
    let vue = new Vue({
        el: el,
        exp: 'count',
        data: {
            count: 123
        }
    })
    let but = document.getElementById("but")
    but.addEventListener('click', () => {
        vue.data.count += 1
    })

</script>
</body>

</html>

```
