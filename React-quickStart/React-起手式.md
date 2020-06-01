
## 目录
1. [如何引入React](#如何引入React)
2. [函数的本质是延迟](#函数的本质是延迟)
3. [JSX](#JSX)
4. [条件判断与循环](#条件判断与循环)
5. [更多信息](#更多信息)


### 如何引入React
#### 从CDN引入React
1. 按顺序引入`React`
```
<script src="https://cdn.bootcss.com/react/16.10.2/umd/react.development.js"></script>
```
2. 然后引入`React DOM`
```
<script src="https://cdn.bootcss.com/react-dom/16.10.2/umd/react-dom.development.js"></script>
```
#### Common JS VS UMD
>规范`JavaScript`的模块定义和加载机制,降低了学习和使用各种框架的门槛，能够以一种统一的方式去定义和使用模块，提高开发效率，降低了应用维护成本

CommonJS
* `CommonJS`是一种规范，`NodeJS`是这种规范的实现
* `CommonJS`模块是对象，是运行时加载，运行时才把模块挂载在`exports`之上（加载整个模块的所有），加载模块其实就是查找对象属性。
* `CommonJS`是同步加载（代码在本地，加载时间基本等于硬盘读取时间）

UMD
* `UMD`（`Universal Module Definition`）是`AMD`和`CommonJS`的糅合，兼容`AMD`和`CommonJS`，还支持老式全局变量定义, 是跨平台的解决方案
* `AMD`模块以浏览器第一的原则发展，异步加载模块。
* `CommonJS`模块以服务器第一原则发展，选择同步加载，它的模块无需包装(`unwrapped modules`)。
* `UMD`先判断是否支持`Node.js`的模块（`exports`）是否存在，存在则使用`Node.js`模块模式。再判断是否支持`AMD`（`define`是否存在），存在则使用`AMD`方式加载模块

#### 通过webpack引入React
```
yarn add react-dom
*********
import React from  'react',
import ReactDom from 'react-dom'
```
除了使用`webpack`外，也可以使用`rollup`,`parcel`引入`react`
#### 新手引入VS老手引入
* 新手使用命令行`creat-react-app`
* 老手使用`webpack`,`rollup`

#### 代码实例
```
<script src="https://cdn.bootcss.com/react/16.10.2/umd/react.development.js"></script>
<script src="https://cdn.bootcss.com/react-dom/16.10.2/umd/react-dom.development.js"></script>

<script src="src/index.js"></script>
******************
const React = window.React;
const ReactDOM = window.ReactDOM;

let n = 0;
const App = () =>
  React.createElement("div", null, [
    n,
    React.createElement(
      "button",
      {
        onClick: () => {
          n += 1;
          console.log(n);
          ReactDOM.render(App(), document.querySelector("#app")); // 为什么还是不能重新渲染
        }
      },
      "+1"
    )
  ]);

ReactDOM.render(App(), document.querySelector("#app"));
```

### 函数的本质是延迟
**函数的本质就是延迟执行代码，定义的时候不会被执行，只有在被调用的时候执行**
#### 普通代码和函数
例子
* 普通代码`let a = 1 + 1`
* 函数代码`let f=()=>1 + a; let b=f()`

区别
* 普通代码会立即求值，读取`a`的当前值
* 函数会等到调用该函数的时候再求值，即延迟求值，求值的时候会读取`a`的最新值

#### React元素和函数组件
例子
* `App1` 是一个`React`元素
```
app1 = React.createElement('div', null, n)`
```
* `App2` 是一个`React`函数组件
```
App2 =()=> React.createElement('div', null, n)
```
区别
* 组件是立即求值的代码, 只会运行一次，读取写入属性
* 函数组件是延迟执行的代码，会运行很多次，在被调用的时候执行

#### 虚拟DOM对象和DOM Diff算法
`React`元素\
在`React`元素中`createElement`的返回值`element`可以代表一个`div`, 但是`div`并不是真正的`div`，即真正的`DOM`对象, 一般称为

`React`函数组件\
在`React`函数组件中，如果函数的`createElement`的返回了`element`，也可以代表一个`div`，这个函数可以多次执行，每次得到最新的虚拟`DOM`节点。`React`会对比两个虚拟`DOM`节点，找出不同，局部更新视图。一般称这种算法为`DOM Diff`算法。这种算法节约了资源，加速了视图的更新。

### JSX
**JSX是一种JavaScript的语法扩展，运用于React架构中，其格式比较像是模版语言，但事实上完全是在JavaScript内部实现的, JSX会将XML转译为React.createElement**
#### VueVSReact
`Vue`有`vue-loader`
* `Vue`文件中写`<template>`,`<script>`,`<style>`
*  在`Vue`的非完整版中，可以通过`vue-loader`变成一个构造选项
*  `Vue`通过在`.vue`文件的`<template>`中写入代码，操作`HTML`页面,即`DOM`

`React`有`JSX`
* 下面的代码中，使用到了编译原理
```
// 通过原生DOM来新建button
<button onClick="add"> +1 </button>
// 通过React来新建button
React.createElement('button', {onClick:...}, '+1')
```
* 实际上，`React`通过使用`jsx-loader`完成了编译，而`jsx-loader`被`babel-loader`取代了，而且`babel-loader`被`webpack`内置了
* `React`通过在`JS/JSX`文件中写入代码，操作`HTML`页面，即`DOM`

#### 如何使用JSX
方法一：通过`CDN`引入

1. 引入`bable.min.js`
```
<script src="https://cdn.bootcss.com/babel-standalone/7.0.0-beta.3/babel.min.js"></script>
```
2. 将`<script>`改为`<script type="tex/babel">`
```
<script type="text/babel">
***********
</script>
```
3. `babel-loader`会自动进行转译

注意
1. 不推荐在生产环境中使用该方法，效率低下
2. 因为它要先下载一个`babel.min.js`, 还有在浏览器端把`JSX`编译成`JS`

代码实例
```
<script src="https://cdn.bootcss.com/react/16.10.2/umd/react.development.js"></script>
<script src="https://cdn.bootcss.com/react-dom/16.10.2/umd/react-dom.development.js"></script>
<script src="https://cdn.bootcss.com/babel-standalone/7.0.0-beta.3/babel.min.js"></script>
```
#### 方法二: webpack + babel-loader
通过使用`webpack`搭配`babel-loader`的方法来搭建`React`项目，是老手通常的做法
#### 方法三：create-react-app命令行
原理： 这个方法和`@Vue/cli`用法类似，`App.js`会默认使用了`JSX`语法，因为`webpack`会让`JS`经过`babel-loader`的编译

代码实例
```
yarn global add create-react-app  // 全局安装react
create-react-app react-demo1      // 初始化目录
cd react-demp-1                   // 进入目录
code.                             // 使用编辑器打开
yarn start                        // 本地运行项目
```
#### JSx的注意事项
* 注意`className`

注意写`class`名需要写成`className`
```
<div className="red">n</div> // 因为这行会被转译为
React.createElement('div', {className:'red'}, "n")
```

插入变量, 标签里面所有的`JS`代码都要用`{}`包起来
* 如果需要变量`n`, 就用`{}`把`n`包起来
* 如果需要对象, 就用`{}`把对象包起来，例如`{{name : 'frank'}}`

习惯`return`后面加`()`

### 条件判断与循环
#### VueVSReact
* 在`Vue`里，只能用`Vue`提供的语法写条件判断和循环
* 在`React`里，可以使用`JSX`语法写自由发挥写条件判断和循环

#### if...else..条件控制语句
`Vue`的代码
```
<template>
   <div>
       <div v-if="n%2===0">n是偶数 </div>
       <span v-else>n是奇数</span>
  </div>
</template>
```
`React`的`JSX`语法
```
const Component = () => {
     return n%2===0 ? <div>n是偶数</div> :
<span>n是奇数</span>
}
// 如果需要外面的div来包裹，可以写成
const Component = () => {
     return (
      <div>
         { n%2===0 ? <div>n是偶数</div> : <span>n是奇数</span> }
      </div>
)
}
// 或者这样
const Component = () => {
       const inner = n%2===0 ? <div>n是偶数</div> : <span>n奇数</span>
       const content = (
       <div>
          { inner }
      </div>
    )
return content
}
// 可以这样
const Component = () => {
   const content = (
     <div>
       { n%2===0 ? <div>n是偶数</div> : <span>n是奇数</span> }
    </div>
)
return content
}
// 还可以这样
const Component = () => {
   let inner
   if (n%2===0) {
      inner = <div>n是偶数</div>
   } else {
      inner = <span>n奇数</span>
   }
   const content = (
      <div>
         { inner }
      </div>
    )
    return content
}
```
#### loop循环语句
`Vue`的代码
```
<template>
   <div>
      <div v-for="(n, index) in numbers":key="index">下标{{index}}，值为{{n}}
      </div>
  </div>
</template>
```
`React`的`JSX`语法
```
const Component = (props) => {
   return props.numbers.map((n,index)=>{
       return <div>下标{index}值为{n}</div>
   })
}
// 如果需要div来包裹，可以写为
const Component = (props) => {
   return (<div>
     { props.numbers.map((n,index)=>{return <div> 下标{index}值为{n}</div> }) }
</div>)
}
// 还可以写成这样
const Component = (props) => {
   const array = []
   for(let i=0;i<props.numbers.length;i++){
       array.push(<div>下标{i}值为{props.numbers[i]}</div>)
    }
    return <div>{ array }</div>
}
```
### 更多信息
>[CommonJS规范 ](https://javascript.ruanyifeng.com/nodejs/module.html)

>[AMD , CMD, CommonJS，ES Module，UMD](https://juejin.im/post/5b7d2f45e51d4538826f4c28)

>[新手学习 react 迷惑的点(一)](https://juejin.im/post/5d6be5c95188255aee7aa4e0)

