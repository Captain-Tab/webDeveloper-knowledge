## 目录
1. [进阶属性](#进阶属性)
2. [computed计算属性](#computed计算属性)
3. [watch监听](#watch监听)
4. [computedVSwatch](#computedVSwatch)
5. [更多信息](#更多信息)


### 进阶属性
* `computed`：计算属性。不需要加括号，它会根据依赖是否变化来进行缓存
* `watch`: 监听。一旦`data`变化，就会执行的函数。需要了解`options.watch`用法，`this.$watch`用法和`deep, immediate`的含义
* `directives`: 指令。内置指令`v-if`,`v-for`,`v-bind`,`v-on`, 还有自定义指令，例如`v-foucs`。指令的目的是减少重复的`DOM`操作
* `mixin`: 混入。重复三次之后的出路，需要了解 混入`vs`全局混入。选项会自动合并，混入的目的就是减少重复的构造选项
* `extends`: 继承。需要了解`Vue.extend`，因为觉得用了`mixin`还是重复，于是自己写了一个`View`，它继承`vue`, 然后可以预先定义其他的构造选项。继承的目的就是减少重复的构造选项，使用了`ES 6`的`extends`
* `provide/inject`: 跨代通信。爷爷想和孙子通信，祖宗想和所有后代通信，一般情况下可以使用全局变量，但是`Vue`不想使用全局变量，使用了局部的全局变量。

### computed计算属性
#### 定义
被计算出来的属性就是计算属性
#### 场景
当需要对`data`的数据进行显示计算时
#### 实例
```
let id = 0;
const createUser = (name, gender) => {
  id += 1;
  return { id: id, name: name, gender: gender };
};
new Vue({
  data() {
    return {
      users: [
        createUser("方方", "男"),
        createUser("圆圆", "女"),
        createUser("小新", "男"),
        createUser("小葵", "女")
      ],
      gender: ""
    };
  },
  computed: {
    displayUsers() {
      const hash = {
        male: "男",
        female: "女"
      };
      const { users, gender } = this;
      if (gender === "") {
        return users;
      } else if (typeof gender === "string") {
        return users.filter(u => u.gender === hash[gender]);
      } else {
        throw new Error("gender 的值是意外的值");
      }
    }
  },
  methods: {
    setGender(string) {
      this.gender = string;
    }
  },

  template: `
    <div>
      <div>
      <button @click="setGender('') ">全部</button>
      <button @click="setGender('male')">男</button>
      <button @click="setGender('female')">女</button></div>
      <ul>
        <li v-for="(u,index) in displayUsers" :key="index">{{u.name}} - {{u.gender}}</li>
      </ul>
      
    </div>
  `
}).$mount("#app");
```
#### 缓存
如果依赖的属性没有变化，就不会重新继续。`getter/setter`默认不会做缓存，`Vue`做了处理，有所改动，就可以缓存，节省资源，避免重复渲染。
#### 计算属性缓存 vs 方法
计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。（不接受新的参数，只是基于`data`里面的数据进行计算）
方法是只要其他数据发生变化，触发重新渲染时，调用方法将总会再次执行函数，性能开销比较大。（可以接受参数）

### watch监听
#### 定义
当数据变化时,执行一个函数
#### 场景
监听到数据的变化，去指定响应的操作, `watch`是异步操作
#### 变化
* 简单的数据类型改变时，查看值
* 复杂的数据类型，查看地址

查看下面的代码，我们可以发现，`obj`原来是`{a:'a'}`, 现在改为`obj={a:'a'}`, **例如：`{a:'a'}` 和 `{a:'a'}` 是两个对象不同地址， 即{a:'a'} === {a:'a'}的值为 false** ,即`obj`会发生变化，因为地址发生了变化，`obj.a`不会发生变化，因为值没有发生变化。

```
new Vue({
  data: {
    n: 0,
    obj: {
      a: "a"
    }
  },
  template: `
    <div>
      <button @click="n += 1">n+1</button>
      <button @click="obj.a += 'hi'">obj.a + 'hi'</button>
      <button @click="obj = {a:'a'}">obj = 新对象</button>
    </div>
  `,
  watch: {
    n() {
      console.log("n 变了");
    },
    obj() {
      console.log("obj 变了");
    },
    "obj.a": function() {
      console.log("obj.a 变了");
    }
  }
}).$mount("#app");
```
#### Deep:true-监听
根据上面的例子，如果改变`obj.a='a'`为`obj.a='b'`,`obj`本身并不会发生变化，如果想改变属性的时候，也改变对象，就需要用到`deep:true`。
* `deep: true`,当`obj.a`变了，`obj`也变化
* `dee[:false`,当`obj.a`变了，`obj`不变化

#### handler和immediate属性
`watch` 的一个特点是，最初绑定的时候是不会执行的，要等到 `firstName` 改变时才执行监听计算。那我们想要一开始就让他最初绑定的时候就执行改怎么办呢？我们需要修改一下我们的 `watch` 写法，使用`immediate`属性,修改过后的 `watch`

在下面的代码中，我们给`firstName`绑定了一个`handler`方法，之前我们写的 `watch` 方法其实默认写的就是这个`handler`，`Vue.js`会去处理这个逻辑，最终编译出来其实就是这个`handler`
 代码如下
* `immediate: true`, 立即执行`handler`方法
* `immediate: false`, 默认设置，并不会立即执行`handler`方法
```
<div>
      <p>FullName: {{fullName}}</p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
</div>

new Vue({
  el: '#root',
  data: {
    firstName: 'Dawei',
    lastName: 'Lou',
    fullName: ''
  },
  watch: {
    firstName(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    },
    // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
    immediate: true
  } 
})

```
#### 语法
语法1：
```
watch {
    o1:()=>{} //不推荐使用这种语法，需要搞懂this指向，箭头函数的this指向外部的全局对象
    o2:function(value,oldvalue){},
    o3(){},
    o4:[f1, f2],
    o5:'methoName',
    o6:{handler:fn, deep: true, immediate:true},
    'object.a':function(){}
}
```
语法2：其中的`'xxx'`可以改为一个返回字符串的函数
```
vm.$watch('xxx', fn, {deep:..., immediate:..})
```
#### 实例
使用`watch`模拟`computed`
```
new Vue({
  data: {
    user: {
      email: "fangfang@qq.com",
      nickname: "方方",
      phone: "13812312312"
    },
    displayName: ""
  },
  watch: {
    "user.email": {
      handler: "changed",
      immediate: true // 第一次渲染是也触发 watch
    },
    "user.nickname": {
      handler: "changed",
      immediate: true // 第一次渲染是也触发 watch
    },
    "user.phone": {
      handler: "changed",
      immediate: true // 第一次渲染是也触发 watch
    }
  },
  // 不如用 computed 来计算 displayName
  template: `
    <div>
       {{displayName}}
       <button @click="user.nickname=undefined">remove nickname</button>
    </div>
  `,
  methods: {
    changed() {
      console.log(arguments);
      const user = this.user;
      this.displayName = user.nickname || user.email || user.phone;
    }
  }
}).$mount("#app");
```
### computedVSwatch
#### computed-计算属性
`computed`看上去是方法，但是实际上是计算属性，它会根据你所依赖的数据动态显示新的计算结果。计算结果会被缓存，`computed`的值在`getter`执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取`computed`的值时才会重新调用对应的`getter`来计算

应用场景：适用于重新计算比较费时不用重复数据计算的环境。所有 `getter` 和 `setter` 的 `this` 上下文自动地绑定为 `Vue` 实例。如果一个数据依赖于其他数据，那么把这个数据设计为`computed`

#### watch-监听
`watche` 更像是一个 `data` 的数据监听回调，当依赖的 `data `的数据变化，执行回调，在方法中会传入 `newVal` 和 `oldVal`。可以提供输入值无效，提供中间值 特场景。`Vue` 实例将会在实例化时调用 `$watch()`，遍历 `watch` 对象的每一个属性。如果你需要在某个数据变化时做一些事情，使用`watch`

#### 总结
* 如果一个数据依赖于其他数据，那么把这个数据设计为`computed`的  

* 如果你需要在某个数据变化时做一些事情，使用`watch`来观察这个数据变化


### 更多信息
>[Vue 中文文档](https://v1-cn.vuejs.org/)

>[Vue watch语法](https://cn.vuejs.org/v2/api/#watch)

>[Vue入门笔记体系（四）computed和watch](https://segmentfault.com/a/1190000015836621)

>[面试题： Vue中的 computed 和 watch的区别](https://juejin.im/post/5c9990d6f265da60ea146d21)

