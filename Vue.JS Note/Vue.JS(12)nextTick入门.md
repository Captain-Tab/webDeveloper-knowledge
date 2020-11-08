## 目录
 1. [事件循环](#事件循环)
 2. [nextTick](#nextTick)
 4. [代码实例](#代码实例)
 5. [更多信息](#更多信息)
 
 ### 事件循环
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18db4f37a3b24691b158a647ac190463~tplv-k3u1fbpfcp-watermark.image)
  1. JS的运行机制是单线程的，主线程的执行过程就是一个`tick`。如果有一个线程是增加元素，另外一个线程是删除元素，这样的操作是很蠢的。
  2. 单线程的是串行的，一个任务完成后，另外一个任务接着继续执行，如此循环。但是在Ajax网页请求，setTimout等事件发生时，这些事件如果还是同步执行，一个接着一个执行，那么网页很有可能会出现长时间卡顿，出现效率低下的问题
  3. 因此出现了异步事件，意思是这个函数隔一段时间才会拿到结果。但是如何处理和处理异步和同步任务的处理顺序呢，这里，由此出现了任务队列和事件循环。
  4. 简单来说，事件循环(Event loop)的顺序为：同步任务(代码)执行-> 查找异步队列，推入执行栈，执行可能存在的回调(callback). 这里的过程就是一个事件循环，如果查找到异步队列还有任务，就会继续推入执行栈，执行可能存在的callback, 这个过程就是另外一个事件循环。
  5. 执行栈(Stack)是先进后出的规则，意思是最后添加的函数会被最先执行，而最开始添加的函数会在最后被执行，函数执行后从栈中移除的过程，称为弹栈
  6. 任务队列(Queue)是先进先出的数据结构。同步的任务在调用栈中执行,异步任务例如ajax的请求获得的结果后，会将ajax的回调函数推入任务队列，当执行栈为空的时间，就会去查询任务队列，如果有就将任务队列第一个任务推入执行栈，执行，如此循环。
  7. 此外，这里其实还有(microTask)微任务和(macroTask)宏任务, 以上的内容我只是做简单的介绍，更多的信息可以查询文章尾部的链接
  
 ### nextTick
 1. 定义： 由于Vue的数据更新驱动视图是异步的，修改数据后，并不会立即进行视图更新，而是等同一事件循环的所有数据变化完成之后，再统一进行视图更新
 2. 触发时机： 同一事件循环的数据变化完成->DOM完成更新->执行callback(nextTick里的回调函数)
 3. 应用场景： 在新的视图更新之后，基于新的视图进行更新
 4. 简单总结： 同步代码执行->查找异步队列，推入执行栈->执行callback【事件循环1】-> 查找异步队列，推入执行栈->执行callback【事件循环2】
 5. 这小节均指macroTask宏任务，更多的信息可以查询文章尾部的链接
 
 ### 代码实例
```
<template>
  <div>
    <ul>
      <li v-for="item in list1" :key="item">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="item in list2" :key="item">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="item in list3" :key="item">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="item in list4" :key="item">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="item in list5" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
    };
  },
  created() {
    this.composeList12();
    this.composeList34();
    this.composeList5();
    this.$nextTick(function () {
      // DOM 更新了
      console.log("猜猜我在哪里");
      console.log("li元素的数量是:" + document.querySelectorAll("li").length);
    });
  },
  methods: {
    composeList12() {
      let me = this;
      let count = 3;

      for (let i = 0; i < count; i++) {
        Vue.set(me.list1, i, "测试" + i);
      }
      console.log("完成同步代码，列表1的循环");

      for (let i = 0; i < count; i++) {
        Vue.set(me.list2, i, "测试信息" + i);
      }
      console.log("完成同步代码，列表2的循环");

      this.$nextTick(function () {
        // DOM 更新了
        console.log("Dom更新后的tick1和tick2");
        console.log("li元素的数量是:" + document.querySelectorAll("li").length);
      });
    },
    composeList34() {
      let me = this;
      let count = 4;

      for (let i = 0; i < count; i++) {
        Vue.set(me.list3, i, "测试信息啦啦啦" + i);
      }
      console.log("完成同步代码，列表3的循环");

      this.$nextTick(function () {
        // DOM更新了
        console.log("Dom更新后的tick3");
        console.log("li元素的数量是:" + document.querySelectorAll("li").length);
      });

      setTimeout(me.setTimeout1, 0);
    },
    setTimeout1() {
      let me = this;
      let count = 5;

      for (let i = 0; i < count; i++) {
        Vue.set(me.list4, i, "测试信息啦啦啦啦" + i);
      }
      console.log("完成同步代码，列表4的循环");

      me.$nextTick(function () {
        // DOM 更新了
        console.log("Dom更新后的tick4");
        console.log("li元素的数量是:" + document.querySelectorAll("li").length);
      });
    },
    composeList5() {
      let me = this;

      this.$nextTick(function () {
        // DOM 更新了
        console.log("Dom更新后的tick3.5");
        console.log("li元素的数量是:" + document.querySelectorAll("li").length);
      });

      setTimeout(me.setTimeout2, 0);
    },
    setTimeout2() {
      let me = this;
      let count = 6;

      for (let i = 0; i < count; i++) {
        Vue.set(me.list5, i, "测试信息～～啦啦啦" + i);
      }
      console.log("完成同步代码，列表5的循环");

      me.$nextTick(function () {
        // DOM 更新了
        console.log("Dom更新后的tick5-1");
        console.log("li元素的数量是:" + document.querySelectorAll("li").length);
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
函数执行顺序：
  * [事件循环1]：执行同步代码，更新DOM, 执行nextTick的回调函数
  * [事件循环2]：查询异步函数任务队列，推入执行栈，执行异步函数，执行nextTick的回调函数
  * [事件循环3]：查询异步函数任务队列，推入执行栈，执行异步函数，执行nextTick的回调函数
 
推断执行顺序：
 * 【事件循环1】：updatelist1 -> updatelist2 -> updatelist3 -> DOM更新 -> nextTick触发 ->  执行回调函数 -> Dom更新后的tick1和tick2 -> Dom更新后的tick3 
 -> DOM更新后的tick3.5 -> 猜猜我在哪里
 * 【事件循环2】：updatelist4 -> DOM更新 -> nextTick触发 ->  执行回调函数 ->  DOM更新后的tick4
 * 【事件循环3】: updatelist5 -> DOM更新 -> nextTick触发 ->  执行回调函数 ->  DOM更新后的tick5

实际执行顺序：
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8674fac30e814a518413c620165d04bf~tplv-k3u1fbpfcp-watermark.image)

执行顺序总结：
 * 在同一事件循环中，只有所有数据更新完毕，才会更新DOM
 * 在同一事件循环中，如果存在多个nextTick，将会按顺序执行
 * 在同一事件循环中，nextTick的视图是相同的
 * 每个异步的callback回调都存在于一个独立的时间循环，有自己的nextTick
 

### 更多信息
> [访问实例代码](https://codesandbox.io/s/silly-tesla-y0gwx)

> [一次弄懂Event Loop（彻底解决此类面试问题](https://juejin.im/post/6844903764202094606)

> [NextTick](https://cn.vuejs.org/v2/api/index.html#Vue-nextTick)

> [vue nextTick深入理解－vue性能优化、DOM更新时机、事件循环机制](https://www.cnblogs.com/hity-tt/p/6729118.html)

> [JS 事件循环机制 - 任务队列、web API、JS主线程的相互协同](https://www.cnblogs.com/hity-tt/p/6733062.html)
