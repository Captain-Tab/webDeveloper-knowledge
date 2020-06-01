## 目录
1. [useState原理和源码](#useState原理和源码)
2. [useRef和useContext](#useRef和useContext)
3. [更多信息](#更多信息)

### useState原理和源码
#### useState的运行过程
```
function App() {
  const [n, setN] = React.useState(0);
  return (
    <div className="App">
      <p>{n}</p>
      <p>
        <button onClick={() => setN(n + 1)}>+1</button>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, rootElement);
```
运行过程：
1. 首次渲染 `render<App/>`
2. 调用`App()`，得到虚拟`Div`对象, 创建真实`DIV`
3. 当用户点击`button`时，调用`setN(n+1)`，再次`render<App/>`

分析
* `setN`一定会修改数据`x`, 将`n+1`存入`x`
* `setN`一定会触发`<App/>`，进行重新渲染
* `useState`肯定会从`x`读取`n`的最新值
* 每个数据都有自己的数据`x`, 我们将其命名为`state`

#### 手动实现React.useState
```
let _state;

// 类似render原理实现
const render = () => ReactDOM.render(<App />, rootElement);

function myUseState(initialValue) {
  _state = _state === undefined ? intialValue : _state 
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}

function App() {
  const [n, setN] = myUseState(0);
  return (
    <div className="App">
      <p>{n}</p>
      <p>
        <button onClick={() => setN(n + 1)}>+1</button>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, rootElement);
```
#### 实现两个useState
改进思路
1. 试着把`_state`做成一个对象，比如`_state= {n:0, m :0}`。但是这样做的话，`useState(0)`就不知道变量叫`n`还是`m`
2. 试着把`_state`做成数组，比如`_state= [0,0]`, 这种方法似乎可行

代码实例
```
let _state = [];
let index = 0;

function myUseState(initialValue) {
  const currentIndex = index;
  index += 1;
  _state[currentIndex] = _state[currentIndex] || initialValue;
  const setState = newState => {
    _state[currentIndex] = newState;
    render();
  };
  return [_state[currentIndex], setState];
}

// 类似render原理实现
const render = () => {
  index = 0;
  ReactDOM.render(<App />, rootElement);
};

function App() {
  const [n, setN] = myUseState(0);
  const [m, setM] = myUseState(0);
  console.log(_state);
  return (
    <div className="App">
      <p>{n}</p>
      <p>
        <button onClick={() => setN(n + 1)}>+1</button>
      </p>
      <p>{m}</p>
      <p>
        <button onClick={() => setM(m + 1)}>+1</button>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, rootElement);
```
`_state`数组方案的缺点:
* `useState`调用顺序。如果第一次渲染是`n`是第一个，`m`是第二个，`k`是第三个。则要求第二次渲染时必须保障顺序一致。也就是不能使用`if...else`打乱顺序。
* `App`用了`_sate`和`index`，其他组件用什么? 解决方法: 给每个组件创建一个`_state`和`index`
* `_state`和`index`放在全局作用域重名了怎么办? 解决方法：放在组件对应的虚拟节点对象上

![](https://user-gold-cdn.xitu.io/2020/3/24/1710a7a629a3f579?w=1148&h=359&f=jpeg&s=43277)
#### 小结
* 每个函数组件对应一个`React`节点, 即`FiberNode`
* 每个节点保存着`state`和`index`, `state`即`memorizedState`, `index`的实现使用了链表结构
* `useState`会读取`state[index]`
* `index`由`useState`调用的顺序决定
* `setState`会修改`state`，并触犯更新


### useRef和useContext
#### 代码实例
```
unction App() {
  const [n, setN] = React.useState(0);
  const log = () => setTimeout(() => console.log(`n: ${n}`), 3000);
  return (
    <div className="App">
      <p>{n}</p>
      <p>
        <button onClick={() => setN(n + 1)}>+1</button>
        <button onClick={log}>log</button>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, rootElement);
```
上面的代码出现了问题
* 点击`+1`再点击`log` 没有`bug`
* 点击`log`再点击`+1`,出现`bug`，为什么`log`打印的是上一次的数据

疑惑解答： 因为有多个`n`

![](https://user-gold-cdn.xitu.io/2020/3/24/1710a852b825d812?w=578&h=374&f=jpeg&s=23924)
改进思路: 希望有一个贯穿始终的状态
* 使用全局变量，比如`window.xxx`
* 使用`useRef`，`useRef`不仅可以用于`div`，还能用于任意数据。但是`useRef`不会在属性变动时自动触发更新，只能手动设置更新，但是不推荐使用手动更新
```
function App() {
  const nRef = React.useRef(0);
  const log = () => setTimeout(() => console.log(`n: ${nRef.current}`), 1000);
  return (
    <div className="App">
      <p>{nRef.current} 这里并不能实时更新</p>
      <p>
        <button onClick={() => (nRef.current += 1)}>+1</button>
        <button onClick={log}>log</button>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, rootElement);
```
* 使用`useContext`, `useContext`不仅可以贯穿始终，还可以贯穿不同组件
```
function App() {
  const [theme, setTheme] = React.useState("red");
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <div className={`App ${theme}`}>
        <p>{theme}</p>
        <div>
          <ChildA />
        </div>
        <div>
          <ChildB />
        </div>
      </div>
    </themeContext.Provider>
  );
}

function ChildA() {
  const { setTheme } = React.useContext(themeContext);
  return (
    <div>
      <button onClick={() => setTheme("red")}>red</button>
    </div>
  );
}

function ChildB() {
  const { setTheme } = React.useContext(themeContext);
  return (
    <div>
      <button onClick={() => setTheme("blue")}>blue</button>
    </div>
  );
}

ReactDOM.render(<App />, rootElement);
```
#### 小结
* 每次重新渲染，函数组件就会执行
* 函数组件对应的所有`state`就会被重新复制
* 如果不想出现复制的`state`，可以使用`useRef`,或者`useContext`解决

### 更多信息
>[阅读源码后，来讲讲React Hooks是怎么实现的](https://juejin.im/post/5bdfc1c4e51d4539f4178e1f)
