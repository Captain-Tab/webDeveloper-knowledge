## 目录
1. [介绍动态组件](#介绍动态组件)
2. [使用动态组件](#使用动态组件)
3. [使用keep-alive](#使用keep-alive)
4. [更多信息](#更多信息)

### 介绍动态组件
通常来说，当用户点击按钮切换至显示不同的组件，我们可以通过使用`Vue Router`来实现。简单来说，就是通过加载不同的`URL`来加载对应的组件。但是还有一种方法，在不使用`Vue Router`的情况下， 也可以实现不同组件的切换，例如组件的挂载和卸载，这种方法就是使用动态组件。使用动态组件可以让你的代码更加简洁，同时也可以使用条件指令，例如`v-if`和`v-else`来搭配实现动态组件的需求。

### 使用动态组件
动态组件的语法
```
<component :is="currentComponet"/>
```
实例1：

我们先新建两个组件`Robot1`和`Robot2`，两个组件的代码基本相同
```
<template>
  <div>{{msg}}</div>
</template>

<script>
export default {
  name: "Robot1",
  data() {
    return {
      msg: "我是机器人1号"
    };
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```
接着想俩个组件引入根组件`APP.vue`来使用
```
<template>
  <div id="app">
    <Robot1 />
    <Robot2 />
  </div>
</template>

<script>
import Robot1 from "./components/Robot1";
import Robot2 from "./components/Robot2";

export default {
  name: "App",
  components: {
    Robot1,
    Robot2
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>

```
这样的话，两个组件都会被显示在页面上，但是我们只想挂载其中的一个组件。我们使用`v-bind`来绑定动态组件的属性。修改绑定的`currentComponent`为`Robot2`后，页面会挂载`Robot2`组件。
```
<template>
  <div id="app">
    <component :is="currentComponent" />
  </div>
</template>

<script>
import Robot1 from "./components/Robot1";
import Robot2 from "./components/Robot2";

export default {
  name: "App",
  components: {
    Robot1,
    Robot2
  },
  data() {
    return {
      currentComponent: "Robot2"
    };
  }
};
</script>
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2dbe830d8ce40a69276eeadeff2b203~tplv-k3u1fbpfcp-zoom-1.image)

实例2：上面的例子我们完成了动态组件的初步使用，我们还可以添加点击事件`switchComponent`来修改`currentComponent`的值，从而真正达到两个组件之间的切换状态
```
<template>
  <div id="app">
    <component :is="currentComponent"/>
    <button @click="switchComponent">切换</button>
  </div>
</template>

<script>
import Robot1 from "./components/Robot1";
import Robot2 from "./components/Robot2";

export default {
  name: "App",
  components: {
    Robot1,
    Robot2
  },
  data() {
    return {
      currentComponent: "Robot2"
    };
  },
  methods: {
    switchComponent() {
      if (this.currentComponent === Robot1) {
        this.currentComponent = Robot2;
      } else {
        this.currentComponent = Robot1;
      }
    }
  }
};
</script>
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a1ee2e1bf5c4255abcb6bffbbcc5ea1~tplv-k3u1fbpfcp-zoom-1.image)

### 使用keep-alive
`Vue`开发团队还提供了`keep-alive`特性，目的是当组件切换的时候，各自组件中的状态依然保存。例如，当你在`Robot1`组件的表单中输入信息的时候，你进行了切换，然后你再返回`Robot1`组件的时候，你输入的文字信息会被重置。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/113062b54f2e421799d876a2aff996be~tplv-k3u1fbpfcp-zoom-1.image)

如果使用了`keep-alive`进行包裹，那么组件中的数据状态会被保留。
```
<keep-alive>
   component :is="currentComponent"/>
</keep-alive>
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8232460559a4b56beb394cb708de7db~tplv-k3u1fbpfcp-zoom-1.image)

### 更多信息
> [动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)

> [How to make your components dynamic in Vue.js](https://blog.logrocket.com/how-to-make-your-components-dynamic-in-vue-js/)