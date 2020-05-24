## 目录

1. [v-bind 的运用](#v-bind的运用)
2. [如何绑定class](#如何绑定class)
3. [如何绑定style](#如何绑定style)

### v-bind 的运用

链接的 `href` 属性和图片的 `src` 属性都被动态设置了，当数据变化时，就会重新渲
染。
在数据绑定中，最常见的两个需求就是元素的样式名称 `class` 和内联样式`~tyle` 的动
态绑定，它们也是 HTML 的属性，因此可以使用`v-bind` 指令。我们只需要用 `v-bind`
计算出表达式最终的字符串就可以，不过有时候表达式的逻辑较复杂，使用字符串
拼接方法较难阅读和维护，所以 `Vue.js` 增强了对 `class` 和 `style` 的绑定。

应用场景：`在DOM`上动态绑定一些`class`类名或者`style`样式

### 如何绑定class

- 对象语法

给`v-bind:class`设置一个对象，动态切换`class`，值对应`true`和`false`。当`class`的表达式过长或者逻辑复杂，可以绑定一个计算属性，一般当条件多于两个时， 都可以使用`data`或 `computed`

```
<template>
  <div :class="{divStyle:isActive}">你好世界</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isActive: true
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.divStyle {
  border: 1px solid red;
  background: blue;
}
</style>
```

- 数组语法
  当需要应用多个 `class` 时， 可以使用数组语法 ， 给`：class`绑定一个数组，应用一个 `class`列表：数组成员直接对应`className`--类名

```
<template>
  <div :class="[activeClass, errorClass]">你好世界</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeClass: "divStyle",
      errorClass: "errorStyle"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.divStyle {
  border: 1px solid red;
}
.errorStyle {
  background: purple;
}
</style>
```

同时使用数组语法和对象语法

```
<template>
  <div :class="[{divStyle:isAcitve}, errorClass]">你好世界</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isActive: true,
      errorClass: "errorStyle"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.divStyle {
  border: 1px solid red;
}
.errorStyle {
  background: purple;
}
</style>
```

### 如何绑定style

方法：使用 `v-bind:style` （即：`style` ） 可以给元素绑定内联样式，方法与 `：class` 类似，
也有对象语法和数组语法，看起来很像直接在元素上写 `CSS`
注意 `: css` 属性名称使用驼峰命名`aaBc`或短横分隔命名`aa-bc`

- 应用多个样式对象时 ， 可以使用数组语法 ：在实际业务 中,`style` 的数组语法并不常
  用 ， 因为往往可以写在一个对象里面 ： 而较为常用 的应当是计算属性
- 使用 `:style` 时， `Vue .js` 会自动给特殊的 `css` 属性名称增加前缀， 比如 `transform`
- 无需再加前缀属性！！！！

对象语法

```
<template>
  <div :style="{'color':color}">你好世界</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      color: "red"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
```

数组语法, 为不推荐用法

```
<template>
  <div :style="[styleA]">你好世界</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      styleA: {
        color:'red',
        background:'green'
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
```
