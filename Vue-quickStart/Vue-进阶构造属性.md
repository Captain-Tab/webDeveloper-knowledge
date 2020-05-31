## 目录
1. [directives指令](#directives指令)
2. [mixins混入](#mixins混入)
3. [extends继承/扩展](#extends继承/扩展)
4. [provide/inject提供和注入](#provide/inject提供和注入)
5. [小结](#小结)
6. [更多信息](#更多信息)

### directives指令
#### 作用
用于`DOM`操作
* `Vue`实例/组件用于数据绑定，事件监听，`DOM`更新
* `Vue`指令的目的就是进行`DOM`操作

减少重复代码
* 如果某个`DOM`操作比较频繁使用，就可以封装为`Vue`指令
* 如果某个`DOM`操作比较复杂，也可以封装为`Vue`指令

#### 自定义指令
常规指令有`v-if`,`v-for`,`v-html`等，其实也可以自定义指令
#### 自定义指令写法
写法一：声明全局指令，可以在任何组件里使用`v-x`
```
Vue.directive('x', directiveOptions)
```
代码实例:\
点击图片，打印`'y'`，可以添加到任何组件，全局使用
```
 <div id="app">
    <img v-y width="25%" src="./assets/logo.png">
    <HelloWorld msg="Hello Vue in CodeSandbox!"/>
 </div>
**************
Vue.directive("y", {
  inserted: function(el) {
    el.addEventListener("click", () => {
      console.log("y");
    });
  }
});
```
写法二：声明局部指令，只能在该实例中使用
```
new Vue({
    ...,
    directives:{
        "x":directiveOptions
    }
})
```
代码实例:\
点击`div`,打印出`'x'`, 只能在声明的`Vue`实例中使用
```
 <div v-x class="hello">
    <h1>{{ msg }}</h1>
    <h3>Installed CLI Plugins</h3>
 </div>
********
<script>
export default {
  name: "HelloWorld",
  directives: {
    x: {
      inserted: function(el) {
        el.addEventListener("click", () => {
          console.log("x");
        });
      }
    }
  },
  props: {
    msg: String
  }
};
</script>
```
#### directiveOptions
函数属性
* `bind(el, vnode, oldVnode)`-类似于`created`
* `inserted(el, vnode, oldVnode)`-类似于`mounted`
* `update(el, vnode, oldVnode)`-类似于`updated`
* `upbind(el, vnode, oldVnode)`-类似于`destoryed`
* `componentUpdated(el, vnode, oldVnode)`-不常用属性


代码实例：实现`v-on`
```

new Vue({
  directives: {
    on2: {
      // bind 可以改为 inserted
      bind(el, info) {
        el.addEventListener(info.arg, info.value);
        // Vue 自带的 v-on 并不是这样实现的，它更复杂，用了事件委托
      },
      unbind(el, info) {
        el.removeEventListener(info.arg, info.value);
      }
    }
  },
  template: `
    <button v-on2:click="hi">点我</button>
  `,
  methods: {
    hi() {
      console.log("hi");
    }
  }
}).$mount("#app");
```
#### 缩写
在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写：
```
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```


### mixins混入
**`mixins`混入本质上就是复制**
#### 作用
* `directives`的作用是减少重复的`DOM`操作
* `mixins`的作用是减少`data`, `methods`, 钩子的重复

#### 代码实例
该项目一共有`5`个组件，假设开发者需要在每个组件上添加`name`和`time`，并且在`created`时和`destroyed`时，打出提示，报出存活时间。
* 选项一：给每个组件添加`data`和钩子，一共五次
* 选项二：使用`mixins`来完成

`Mixins`文件代码
```
const log = {
  data() {
    return {
      name: undefined,
      time: undefined
    };
  },
  created() {
    if (!this.name) {
      throw new Error("need name");
    }
    this.time = new Date();
    console.log(`${this.name}出生了`);
  },
  beforeDestroy() {
    const now = new Date();

    console.log(`${this.name}快死了，共生存了 ${now - this.time} ms`);
  }
};

export default log;
```
通过使用`mixins`将代码传入子组件中
```
<template>
  <div>Child1</div>
</template>

<script>
import log from "../mixins/log.js";
export default {
  data() {
    return {
      name: "Child1"
    };
  },
  created() {
    console.log("Child 1 的 created");
  },
  mixins: [log]
};
</script>
```
#### 其他信息
* `Vue`的`mixins`会自动选项合并： 当`mixins`传入相同的`data`属性或者方法,会智能合并或自动安排不同的执行顺序
* `Vue.mixin`是全局的`mixins`: 不推荐使用，容易出错

### extends继承/扩展
#### 原理
`extends`与`mixins`有同样的需求，都是为了减少重复。但是`extends`是比`mixins`更抽象的封装，如果开发者已经写了`7`次`mixins`, 为了避免重复, 可以使用`Vue.extends`或者`options.extends`。实际工作中，使用很少

#### 代码实例
```
新建对象，导出
const MyVue = Vue.extend({
  data(){ return {name:'',time:undefined} },
  created(){
      if(!this.name){console.error('no name!')}
      this.time = new Date()
  },
  beforeDestroy(){
      const duration = (new Date()) - this.time
      console.log(`${this.name}存活时间 ${duration}`)
  }
})

export default myVue
******
// 继承对象
<script>
export MyVue from '../MyVue.js'
export default {
    extends: MyVue,
    data:(){
        name: "tab"
    };
  }
};
</script>
```
### provide/inject提供和注入
#### 作用
组件之间共有大范围的`data`和`method`
#### 原理
祖先组件提供自身属性`data`或者方法`method`，子孙组件获取属性或者方法进行操作。
* 特别注意的是：当祖先组件提供了属性和方法时，子组件需要利用传递过来的方法来操作传过来的属性，因为属性是被复制的属性，不是原本的属性
* 不推荐以传输引用的方式(以对象的形式包裹属性)传输属性，然后子组件对其进行操作，因为容易失控


#### 代码实例
```
// 祖先组件提供属性和方法
<template>
   <div :class="`app theme-${themeName} fontSize-${fontSizeName}`">
</template>

export default {
  name: "App",
  provide() {
    return {
      themeName: this.themeName,
      fontSizeNmae: this.fontSizeName,
      changeTheme: this.changeTheme
      changeFontSize: this.changeFontSize
    };
  },
  data() {
    return {
      themeName: "blue", // 'red'
      fontSizeName: "normal" // 'big' | 'small'
    };
  },
  methods: {
    changeTheme() {
      if (this.themeName === "blue") {
        this.themeName = "red";
      } else {
        this.themeName = "blue";
      }
    },
    changeFontSize(size) {
      if (["normal", "big", "small"].indexOf(size) === -1) {
        throw new Error(`wront size: ${size}`);
      }
      this.fontSizeName = size;
    }
  },
  components: {
    Child1,
    Child2,
    Child3,
    Child4,
    Child5
  }
};
</script>
*******************************
// 子孙组件使用该属性和方法，进行操作
<template>
  <div>
    <button @click="changeTheme">换肤</button>
    <button @click="changeFontSize('big')">大字</button>
    <button @click="changeFontSize('small')">小字</button>
    <button @click="changeFontSize('normal')">正常字</button>
  </div>
</template>
<script>
export default {
  inject: ["themeName", "changeTheme", "changeFontSize"]
};
</script>
```
### 小结
#### directive 指令
* 全局使用`Vue.directive('x',{...})`
* 局部使用`options.directives`
* 作用是减少`DOM`操作相关的重复代码

#### mixins 混入
* 全局使用`Vue.mixin({...})`
* 局部使用`options.mixins:[mixin1, mixin2]`
* 作用是减少`options`里的重复

#### extends 继承/扩展
* 全局使用`Vue.extend({...})`
* 局部使用`options.extends:{...}`
* 作用和`mixins`差不多，只是使用形式不一样

#### provide/inject 提供和注入
* 祖先提供东西，后代注入东西
* 作用是大范围，隔`N`代共享信息

### 更多信息
>[Vue中文文档](https://cn.vuejs.org/)

>[Vuedirective](https://cn.vuejs.org/v2/api/#Vue-directive)

>[Vue自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

>[Vue选项合并](https://cn.vuejs.org/v2/guide/mixins.html#%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6)

>[Vue.mixin](https://cn.vuejs.org/v2/api/#Vue-mixin)

>[Vue钩子函数](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0)