## 目录
1. [类组件创建方式](#类组件创建方式)
2. [props](#props)
3. [state](#state)
4. [生命周期React-lifeCycle](#生命周期React-lifeCycle)
5. [更多信息](#更多信息)

### 类组件创建方式
#### ES5语法
```
import React from 'react'

const A = React.createClass({
    render() {
        return (
          <div>hi</div>
        )
    }
})
export default A
```
#### ES6语法
```
import React from 'react';

class B extends React.Component {
    constructor(props) {
       super(props);
    }
    render() {
       return (
         <div>hi</div>
      )
    }
}
export default B;
```
#### ES5 VS ES6
* `ES 6`方法更好
*  如果浏览器不支持`IE 8`, 可以使用`webpack + babel`将`ES 6`翻译成`ES 5`


### props
#### 定义
`props`是组件对外的数据接口

#### 作用
接受外部数据
* 只能读取不能修改写入
* 外部数据由父组件传递

接受外部函数
* 在子组件调用外部函数
* 该函数一般为父组件的函数

#### 代码实例
初始化`props`
```
// construtor和super可以被省略不写，或者必须写全套
class B extends React.Component {
   constructor(props) {
      super(props);
    }
    render(){}
}

// 通过初始化`props`, this.props就是外部数据对象的地址
```
传入`props`给`B`组件
```
class Parent extends React.Component {
   constructor(props){
   super(props)
   this.state = {name:'frank'}
}
onClick = ()=>{}
   render(){
      return <B name={this.state.name} onClick={this.onClick}>hi</B>
}

// parent组件传入`props`给`B`组件, 外部数据被包装成为一个对象
```
读取`props`
```
class B extends React.Component {
    constructor(props) {
    super(props);
  }
    render(){
      return 
      <div onClick={this.props.onClick}>
         {this.props.name}
         <div>
             {this.props.children}
         </div>
     </div>
   }
}

// `B`组件通过`this.props.xxx`读取`props`
```
**子组件禁止修改写入props**
理由:
* 修改`props`的值，即修改外部数据的地址。例如`this.props = {/*另外一个对象*/}`。既然是外部数据，就应该由外部更新
* 修改`props`的属性，例如`this.props.xxx ='hi`。既然是外部数据，就不应该从内部组件来修改值
* 外部数据就由外部数据的主人，即父组件对其进行修改

#### 相关钩子
`componentWillReceiveProps`
* 当组件接受新的`props`时，会触发特殊的函数，即钩子`hooks`
* 现在更名为`UNSAFE_componentWillReceiveProps`，但是已经被启用。不推荐使用该钩子

### state
#### 定义
`state`是组件对内的数据接口
#### 代码实例
初始化`state`
```
class B extends React.Component {
    constructor(props) {
    super(props);
     this.state = {
       user: {name:'frank', age:18}
    }
  }
render() { /* ... */ }
}
```
读取`state`
```
this.state.user
```
修改`state`：`this.setState(newState或者fn)`
```
this.setState({x: this.state.x+1}) // 或者
this.setState((state)=>({x:state.x+1})) // 推荐这种方法

// setState是异步操作，不会立刻改变`this.state`,会等同步任务执行完，再去更新this.state
// show merge 会将新的state和旧的state进行合并

this.setState((state，props)=> newState,fn)
// 也推荐使用这种方式，更好理解，回调函数fn会在写入成功后执行
```
#### 注意事项
```
this.state.n+=1
this.setState(this.state)

// 这种写法不会报错，但是不推荐使用。因为state为不可变数据immutable data，React不希望我们修改旧的state。所以推荐保留旧的数据的同时新建对象来操作state。例如 setState({n: state.n+1})
```

### 生命周期React-lifeCycle
#### 类似原理
```
let div = document.createElement('div')
// div的create/construct过程

div.textContent = 'hi'
// 初始化state

document.body.appendChild(div)
// 将div mount到body里，即挂载

div.textContent ='hi2'
// div的update过程

div.remove()
// div的unmount过程，即从DOM中移除
```
`React`的组件也有这些过程，称之为生命周期
#### 生命周期

![](https://user-gold-cdn.xitu.io/2020/3/23/17106bd6c03fdb0c?w=640&h=561&f=jpeg&s=26271)

#### 生命周期-必学
| 生命周期函数   |      说明      |
|----------|:-------------:|
| constructor |  在这里初始化state |
| shouldComponentUpdate() | 决定是否更新组件 |
| render | 创建虚拟DOM |
| componentDidMount() | 组件已被挂载在DOM |
| componentDidUpdate() | 组件已被更新 |
| componentWillUnmount() | 组件被移除DOM, 将消亡 |

#### constructor
用途
* 初始化`state`, 但是不能在此时调用`setState`
* 可以省略不写
* 绑定事件
```
constructor(){
    *******
    this.onClick = this.onClick.bind(this)
}
// 或者这样写

   onclick = ()=>{}
   constructor({
       ********
   }
```
#### shouldComponentUpdate
用途
* 返回`true`表示不阻止`UI`更新
* 返回`false`表示阻止`UI`更新
* 它允许开发者手动设置判断语句，来决定组件是否进行更新。根据不同的应用场景设置不同的返回值，避免没有必要的更新

代码实例
```
shouldComponentUpdate(newProps, newState){
    if(newState.n === this.state.n){
        return false
    }else{
        return true
    }
}
```
`React`内置的`React.PureComponent`会在`render` 之前对比新`state`和旧`state`的每一个`key`，以及新` props`和旧`props`的每一个`key`。
如果所有`key`的值全都一样，就不会` render`；如果有任何一个`key`的值不同，就会`render`

#### render
用途
* 渲染虚拟`DOM`,展示视图
* 只能有一个根元素，如果有两个根元素需要使用`<React.Fragment></Fragment>`, 可以缩写为`<></>`

技巧
* `render`里面可以写`if...else...`
* `render`里面可以写`? true: false`表达式
* `render`里面不可以直接写`for`循环，需要用到数组
* `render`里面可以写`array.map`循环

#### componentDidMount
用途
* 首次渲染时会执行这个函数
* 在元素挂载到`DOM`后执行代码
* 比如想获取`div`的高度
* 比如想发起加载数据的`AJAX`请求

#### componentDidUpdate
用途
* 首次渲染时不会执行这个函数
* 在视图更新后执行代码
* 比如在这里也可以发起更新数据的`AJAX`请求，更新数据
* 不能使用`setState()`会引起无线循环，除非放在条件判断语句里
* 比如`reutn false`， 就不会触发这个函数

#### componentWillUnmount
用途
* 组件将要被移除页面时，将要被销毁时执行代码
* 被`unmount`移除挂载的组件不会再次`unmount`移除挂载

注意事项
* 如果在`componentDidMount`中监听了`window scroll`，那么就要在`componentWillUnmount`里取消监听
* 如果在`componentDidMount`中创建了`Timer`，那么就要在`componentWillUnmount`里取消`Timer`
* 如果在`componentDidMount`中创建了`AJAX`请求，那么就要在`componentWillUnmount`里取消`AJAX`请求
* 这样做的目的是节约资源，不影响浏览器性能

### 更多信息
>[React16 生命周期函数深入浅出](https://juejin.im/post/5bc35199e51d450e4b1c52f9)

>[React入门系列（四）组件的生命周期](https://www.jianshu.com/p/ecd1d10ea938)