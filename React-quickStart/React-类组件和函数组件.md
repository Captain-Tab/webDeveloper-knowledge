## 目录
1. [Component组件](#Component组件)
2. [props和state](#props和state)
3. [state的注意事项](#state的注意事项)
4. [this](#this)
5. [更多信息](#更多信息)

### Component组件
#### ElementVSComponent
`React`元素，第一个字母小写
```
const div = React.createElement('div', ...)
```
`React`组件，第一个字母大写
```
const Div = () => React.createElement('div'..)
```
组件的定义
* 组件可以理解为页面的一部分，可以和其他组件组合起来形成完成的页面。
* 在`React`里,一个返回`React`元素的函数就是组件。在`Vue`里，一个构造选项就是一个组件

#### React两种组件
定义`Component`组件有两个要求：

1. 组件名称必须以大写字母开头
2. 组件的返回值只能有一个根元素

#### 函数组件
`function Component`函数组件接收一个单一的`props` 对象并返回了一个`React`元素

代码实例
```
function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
}
使用方法：<Welcome name="frank"/>
```

#### 类组件
`class Component`类组件通过`extends`语法生成组件

代码实例
```
class Welcome extends React.Component {
   render() {
       return <h1>Hello, {this.props.name}</h1>
   }
}
使用方法：<Welcome name="frank"/>
```
####  二者区别与共同点
共同点
1. 无论是使用函数或是类来声明一个组件，它决不能修改它自己的 `props`。
2. 所有 `React` 组件都必须是纯函数，并禁止修改其自身 `props` 。
3. `React`是单项数据流，父组件改变了属性，那么子组件视图会更新。
4. 属性 `props` 是外界传递过来的，状态 `state` 是组件本身的，状态可以在组件中任意修改
5. 组件的属性和状态改变都会更新视图

区别
1. 函数组件的性能比类组件的性能要高，因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。
2. 为了提高性能，尽量使用函数组件

| 区别    | 函数组件 | 类组件 |
| ----------- | ----------- | ----------- |
| 是否有 `this`      | 没有      | 有 |
| 是否有状态 `state` | 没有      | 有 |
| 是否有生命周期 | 没有        | 有 |

#### 组件的原理与逻辑
`<Welcome />`会被编译成什么
1. `<div />`会被编译成`React.createElement('div')`
2. `<Wecome />`会被编译成`React.createElement(Welcome)`
3. 通过[babel online](https://babeljs.io/en/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiAJyxDwD4oA7KYAenAlIChGAzAVwpgBcwB7KgOpY4MXtgAUASgDeAX2bAhIsVijYUCAOa48ACzBkAYgQQUA1rSWjs5IA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.7.7&externalPlugins=)可以查询编译后的代码

`React.createElement`的逻辑
1. 如果传入一个字符串`div`,就会创建一个`div`
2. 如果传入一个函数`fn`，就会调用这个函数，获取返回值
3. 如果传入一个类，则在类前面加个`new`, 执行构造函数`constructor`，获取组件对象，然后调用对象的`render`方法，获取返回值

### props和state
#### 二者作用
`props`和 `state` 都是普通的 `JavaScript` 对象。它们都是用来保存信息的。组件内可以引用其他组件，组件之间的引用形成了一个树状结构（组件树），如果下层组件需要使用上层组件的数据或方法，上层组件就可以通过下层组件的`props`属性进行传递，因此`props`是组件对外的接口。组件除了使用上层组件传递的数据外，自身也可能需要维护管理数据，这就是组件对内的接口`state`。根据对外接口`props` 和对内接口`state`，组件计算出对应界面的`UI`
#### props
`props`是组件对外的数据接口

* 类组件读取`props`属性: `this.props.xxx`
* 函数组件读取`props`参数: `props.xxx`

代码实例
```
class Son extends React.Component {
  render() {
    return (
      <div className="Son">
        我是儿子，我爸对我说「{this.props.messageForSon}」
        <Grandson messageForGrandson="孙贼你好" />
      </div>
    );
  }
}

const Grandson = props => {
  return (
    <div className="Grandson">
      我是孙子，我爸对我说「{props.messageForGrandson}」
    </div>
  );
};

```
#### state
`state`是组件对内的数据接口
* 类组件读取`state`: `this.state`, 写入为`this.setState`。推荐写为`this.setState=()=>{****}`, 因为更好理解异步的`setState`
* 函数组件使用`React.useState()`是赋值，它会返回一个新的数组，然后使用解构赋值。数组的第一个元素为赋值，第二项为修改值

代码实例
```
class Son extends React.Component {
  constructor() {
    super();
    this.state = {
      n: 0
    };
  }
  add() {
    // this.state.n += 1 为什么不行
    this.setState({ n: this.state.n + 1 });
  }
  render() {
    return (
      <div className="Son">
        儿子 n: {this.state.n}
        <button onClick={() => this.add()}>+1</button>
        <Grandson />
      </div>
    );
  }
}

const Grandson = () => {
  const [n, setN] = React.useState(0);
  return (
    <div className="Grandson">
      孙子 n:{n}
      <button onClick={() => setN(n + 1)}>+1</button>
    </div>
  );
};
```
#### 复杂的state写法
类组件的写法
```
class Son extends React.Component {
  constructor() {
    super();
    this.state = {
      n: 0,
      m: 0
    };
  }
  addN() {
    this.setState({ n: this.state.n + 1 });
  }
  addM() {
    this.setState({ m: this.state.m + 1 });
  }
  render() {
    return (
      <div className="Son">
        儿子 n: {this.state.n}
        <button onClick={() => this.addN()}>n+1</button>
        m: {this.state.m}
        <button onClick={() => this.addM()}>m+1</button>
        <Grandson />
      </div>
    );
  }
}

const Grandson = () => {
  const [n, setN] = React.useState(0);
  return (
    <div className="Grandson">
      孙子 n:{n}
      <button onClick={() => setN(n + 1)}>+1</button>
    </div>
  );
};

```
函数组件的写法
```
class Son extends React.Component {
  constructor() {
    super();
    this.state = {
      n: 0,
      m: 0
    };
  }
  addN() {
    this.setState({ n: this.state.n + 1 });
  }
  addM() {
    this.setState({ m: this.state.m + 1 });
  }
  render() {
    return (
      <div className="Son">
        儿子 n: {this.state.n}
        <button onClick={() => this.addN()}>n+1</button>
        m: {this.state.m}
        <button onClick={() => this.addM()}>m+1</button>
        <Grandson />
      </div>
    );
  }
}

const Grandson = () => {
  const [n, setN] = React.useState(0);
  const [m, setM] = React.useState(0);
  return (
    <div className="Grandson">
      孙子 n:{n}
      <button onClick={() => setN(n + 1)}>n+1</button>
      m:{m}
      <button onClick={() => setM(m + 1)}>m+1</button>
    </div>
  );
};
```
**小结**
* 类组件的`setState`修改`state`的部分属性，另外未修改的属性会自动沿用之前的属性，二者会自动合并。值得注意的是：第一层的属性会自动合并。如果`n`和`m`里面还有属性，对象中的属性变更，第二层属性并不会自动合并，例如
```
   // 这里的第一层属性name会被合并，而第二层age则不会
   this.state = {
      n: 0,
      m: 0,
      user: {
        name: "frank",
        age: 18
      }
    };
```
* 解决二层属性不会自动合并，可以使用`Object.assign`或者`...`操作符，例如
```
// Ojbect.assign会新建空对象，把之前的数据复制到空对象里
 changeUser() {
    const user = Object.assign({}, this.state.user);
    user.name = "jack";
    this.setState({
      user: user
    });
  }
```
* 函数组件则完全不会自动合并，需要使用操作符`...`进行合并，例如
```
const Grandson = () => {
  const [state, setState] = React.useState({
    n: 0,
    m: 0
  });
  return (
    <div className="Grandson">
      孙子 n:{state.n}
     <button onClick={() => setState({...state, n: state.n + 1 })}>n+1</button>
      m:{state.m}
     <button onClick={() => setState({...state, m:state.m + 1})</button>>
    </div>
  );
};

```

### state的注意事项
1. 不能直接修改`State`

因为组件并不会重新重发`render`。在下面的例子中，其实`n`已经改变了，但是`UI`不会自动更新，只有调用`setState`才会触发`UI`更新。`React`并不像`Vue`一样是数据响应式，监听到数据变化就触发视图更新
```
// 错误的写法
this.state = n +1
// 正确的写法
this.setState = ({n: state.n +1})
```
2. `setState`是异步更新
调用`setState`，组件的`state`并不会立即改变，立马读取`state`会失败。因为`setState`是异步执行的，而且要把修改的状态放入一个队列中，`React`会优化真正的执行时机，并且`React`会出于性能原因，可能会将多次`setState`的状态修改合并成一次状态修改。需要注意的是，同样不能依赖当前的`props`计算下个`state`，因为`props`的更新也是异步的。推荐使用的方式是`setState(fn函数)`

3. `State`的更新是浅合并
当调用`setState`修改组件状态时，只需要传入发生改变的状态变量，而不是组件完整的`state`，因为组件`state`的更新是一个浅合并`Shallow Merge`的过程。

代码实例
```
// 例如，一个组件的state为
this.state = {
  title : 'React',
  content : 'React is an wonderful JS library!'
}

// 当只需要修改状态title时，只需要将修改后的title传给setState
this.setState({title: 'Reactjs'});

// React会合并新的title到原来的组件state中，同时保留原有的状态content，合并后的state为
{
  title : 'Reactjs',
  content : 'React is an wonderful JS library!'
}
```

4. 不推荐使用`this.setState(this.state)`
因为`state`为不可变数据`immutable data`，`React`不希望我们修改旧的`state`。所以推荐保留旧的数据的同时新建对象来操作`state`。例如
`setState({n: state.n+1})`

#### VueVSReact
![](https://user-gold-cdn.xitu.io/2020/3/20/170f5bbeba19e1f1?w=425&h=397&f=jpeg&s=24909)
* `Vue`的编程模型为：一个对象，对应一个虚拟`DOM`，当对象的属性改变时，把属性相关的`DOM`节点全部更新。后来`Vue`才使用了虚拟`DOM`和`DOM diff`算法，之前并没有
* `React`的编程模型为：一个对象，对应一个虚拟`DOM`，然后再生成一个相同的对象，对应另外一个虚拟`DOM`。然后根据`DOM diff`算法，对比两个虚拟`DOM`找出不同，局部更新视图


#### Props VS state
* `props` 是传递给组件的（类似于函数的形参），而 `state` 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）
* `props`是组件的只读属性，组件内部不能直接修改`props`，要想修改`props`，只能在该组件的上层组件中修改
* `state` 是在组件中创建的，一般在 `constructor`中初始化 `state`
* `state`是可变的，是组件内部维护的一组用于反映组件`UI`变化的状态集合
* `state` 是多变的、可以修改，每次`setState`都异步更新的

### 事件绑定
#### 类组件的事件绑定
* 写法一：最安全的写法
```
<button onClick={() => this.addN()}>n+1</button>
// 另外一种写法，命名函数，再传入绑定事件
this._addN =()=>this.addN()
<button onClick={this._addN}>n+1</button>
```
* 写法二: `this`会指向全局变量`window`,不推荐
```
<button onClick={this.addN}>n+1</button>
```
* 写法三：使用`bind`绑定当前`this`的新函数
```
<button onClick={this.addN.bind(this)}>n+1</button>
```
写法四：最终写法, `this`指向正确

```
class Son extends React.Component{
    addN = () => this.setState({n: this.state.n + 1});
    constructor(){
    // 或者这样写，二者相同
    this.addN = ()=> this.setState({n: this.state.n + 1})
  } 
```
写法五：错误写法，`this`会指向`window`
```
class Son extends React.Component{
   addN(){ 
      this.setState({n: this.state.n + 1})
    }
    // 二者写法完全相等
    addN: functioin(){
      this.setState({n: this.state.n + 1})
    }
} 
```
#### 写法四VS写法五
* 写法四的`addN`函数是对象本身的属性，意味着每个`Son`组件都可有自己的`addN`函数，例如，两个`Son`，每个都会有自己的`addN`函数。因为`this`指向`Son`组件
* 写法五的`addN`函数是对象的共有属性，也就是原型上的属性，即`prototype`里面。意味着所有的`Son`组件共用一个`addN`函数。因为`this`指向全局变量`window`
* 所有函数的`this`都是参数，由调用决定，所以可变
* 箭头函数的`this`不变，因为箭头函数不接受`this`

### this
#### this面试题1
```
var a = {
   name:" 里面的name",
   sayName:function(){
       console.log("this.name = " + this.name);
  }
};

var name = "外面的name";
function sayName(){
    var sss = a.sayName;
    sss(); //this.name = ?
    a.sayName(); //this.name = ?
    (a.sayName)(); //this.name = ?
    (b = a.sayName)();//this.name = ?
}
sayName()
```
为了便于理解，代码为
```
var a = {
    name:"里面的name",
    sayName:function(){
    console.log("this.name = " + this.name);
  }
};
var name = "外面的name";
function sayName(){
   var sss = a.sayName;
   sss.call(undefined); //this是undefined
   a.sayName.call(a); //this是a
   (a.sayName).call(a); //this是a
   b.call(undefined);//this是undefined
}
sayName();
```
#### this面试题2
```
var length = 10;
function fn() {
    console.log(this.length);
}
var obj = {
   length: 5,
   method: function(fn) {
     fn();
     arguments[0]();
   }
};

obj.method(fn, 1)
```
为了便于理解，代码为
```
var length = 10;
function fn() {
    console.log(this.length);
}
var obj = {
   length: 5,
   method: function(fn) {
   fn.call(undefined);
   // this是undefined
   arguments[0].call(arguments);
  // this是arguments，也就是[fn,1]
}
};

obj.method.call(obj, fn, 1)
```
#### VueVSReact
相同点
* 都是对视图的封装，`React`是用类和函数表示一个组件，而`Vue`是通过构造选项构造一个组件
* 都提供了`createElement`的`XML`简写，`React`提供的是`JSX`语法，而`Vue`提供的是模板写法，语法很多

不同点
* `Vue`： 能把你做的，都帮你做了
* `React`: 能不做的，我都不做
* `vue`：把`JS`放在`HTML`里写，`JS in HTML`
* `React`: 把`HTML`放在`JS`里写，`HTML in JS`

### 更多信息
>[React函数组件和类组件的区别](https://blog.csdn.net/wu_xianqiang/article/details/91320529)

>[React 深入系列３：Props 和 State](https://juejin.im/post/5ad458c7f265da239c7bd37c)

>[this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)

>[你怎么还没搞懂 this？](https://zhuanlan.zhihu.com/p/25991271)

>[JS 里为什么会有 this](https://zhuanlan.zhihu.com/p/30164164)

