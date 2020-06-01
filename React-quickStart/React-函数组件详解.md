## 目录
1. [函数组件的创建方式](#函数组件的创建方式)
2. [函数组件代替类组件](#函数组件代替类组件)

### 函数组件的创建方式
```
const Hello = (props) => {
    return <div>{props.message}</div>
}
// 或者这样写
const Hello = props => <div>{props.message}</div>

function Hello(props){
    return <div>{props.message}</div>
}
```
### 函数组件代替类组件
函数组件可以代替类组件，因为函数组件语法更加简单易懂，但是也面临以下两个问题
* 没有`state`
* 没有生命周期

没有`state`的解决方法

`React v16.8.0`推出`Hooks API`，其中的`useState`可以解决这个问题

代码实例
```
const App = props =>{
    const [n, setN] = React.useState(0)
    const onClick = () => {
        setN(n+1)
    }
    return {
        <div>
        {n},
        <button onClick = {onClick}>+1</button>
        </div>
    }
}

```
没有生命周期的解决方法

`React v16.8.0`推出`Hooks API`，其中的`useEffect`可以解决这个问题

模拟`componentDidMount`
```
useEffect(()=>{ console.log('第一次渲染') },[])
```
模拟 `componentDidUpdate`
```
useEffect(()=>{ console.log(console.log('n变了')})
// 或者这样写
useEffect(()=>{ console.log('任意属性变更')}，[n])
```
模拟 `componentWillUnmount`
```
useEffect(()=>{
  console.log('第一次渲染')
  return ()=>{
  console.log('组件要死了')
   }
})
```
自定义`Hook`

初始化不会触发自定义`hook`，只有更新值的时候会触发
```
const useUpdate  = (fn, dep) =>{
    const [count, setCount] = useState(0)
    useEffect(()=>{
      setCount(x=> x + 1)  
    }, [dep]);
    
    useEffect(()=>{
    if(count > 1){
        fn()
      }
    }, [count, fn]); 
}

  useUpdate(()=>{
    console.log('变了')
  }，n)
```

模拟其他生命周期

* `constructor`: 函数组件执行的时候，就相当于`constructor`, 即`return`之前的代码都属于`constructor`
* `shouldComponentUpdate`: 使用`React.memo`和`useMemo`可以解决
* `render`: 函数组件`return`返回值就是`render`的返回值
* 推荐使用函数组件，如果理解不了,就使用类组件

