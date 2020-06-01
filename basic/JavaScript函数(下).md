## 目录
1. [callStack调用栈](#callStack调用栈)
2. [factorial阶乘函数](#factorial阶乘函数)
3. [recursion递归函数](#recursion递归函数)
4. [functionHoisting函数提升](#functionHoisting函数提升)
5. [arguments参数](#arguments参数)
6.  [更多信息](#更多信息)

### callStack调用栈
#### 定义
**调用栈其实就是一种解析器去处理程序的机制，它是栈数据结构**。当执行环境中调用了多个函数函数时，通过这种机制，我们能够追踪到哪个函数正在执行，执行的函数体中又调用了哪个函数。
#### 原理
`JS`引擎在调用一个函数前，需要把函数所在的环境`push`到调用栈，等函数执行完了，就会被环境`pop`弹出，然后`return`到之前的环境，继续执行后续的代码。它能追踪子程序的运行状态。
* 每调用一个函数，解释器就会把该函数添加进调用栈并开始执行。
* 正在调用栈中执行的函数还调用了其它函数，那么新函数也将会被添加进调用栈，一旦这个函数被调用，便会立即执行。
* 当前函数执行完毕后，解释器将其清出调用栈，继续执行当前执行环境下的剩余的代码。
* 当分配的调用栈空间被占满时，会引发“堆栈溢出”错误。

#### 实例
* 代码
```
 function boo (a) {
    return a * 3
  }
  function foo (b) {
    return boo(4) * 2
  }
  console.log(foo(3))
```
* 分析代码
![](https://user-gold-cdn.xitu.io/2020/2/16/1704cdd391f7d9e5?w=684&h=500&f=gif&s=402467)
1. 首先调用`console.log(foo(3))`，形成栈帧，放置于调用栈底部，也称为**压栈**，记录`console.log(foo(3))`函数执行后返回的位置。
2. 然后调用`foo(3)`,形成栈帧，放置于`console.log(foo(3))`之上，也称为压栈，记录`foo(3)`函数执行后返回的位置。
3. 接着调用`boo(4)`,形成栈帧，放置于`foo(3)`之上，也称为压栈，记录`foo(4)`函数执行后返回的位置。
4. 当执行完`boo(4)`时候，返回值给`foo`函数之后,`boo(4)`被推出调用栈,也叫**弹栈**,返回原来的位置。`foo`函数继续执行，然后`foo`函数执行完，被推出调用栈，返回值给`console.log(foo(3))`函数，`console.log`得到`foo`函数的返回值，运行，输出结果，最后`console.log`也被推出调用栈，该段程序执行完成。

### factorial阶乘函数
#### 定义
假设`n`为数字，阶乘是`n`前面所有数的乘积(包括`n`)。当`n`为`1`时，阶乘为`1`，当`n`不为`1`时，阶乘为`n x (n-1)`
#### 代码实例
```
function f(n){
    return n !== 1 ? n*f(n-1) : 1
}
```
### recursion递归函数
#### 定义
**本质是一种函数调用自身的操作**，递归被用于处理包含有更小的子问题的一类问题。一个递归函数可以接受两个输入参数：一个最终状态（终止递归）或一个递归状态（继续递归）。
#### 代码实例
先递进，再回归
```
f(4)
= 4 * f(3)
= 4 * (3 * f(2))
= 4 * (3 * (2 * f(1)))
= 4 * (3 * (2 * (1)))
= 4 * (3 * (2))
= 4 * (6)
= 24
```
#### 递归函数的调用栈
**递归函数的调用栈很长**，下面是阶乘`4`的调用栈，一共有`4`次压栈，`4`次弹栈。
![](https://user-gold-cdn.xitu.io/2020/2/16/1704d1f0e57e8d4d?w=935&h=561&f=jpeg&s=52978)
测试调用栈最长有多少
```
function computeMaxCallStackSize(){
    try{
        return 1 + computeMaxCallStackSize();
    } catch(e){
        // 报错说明爆栈了，stack overflow
        return 1
    }
}
* Chrome 12578
* Firefox 26773
* Node 12536
```
#### callstack overflow爆栈
如果调用栈中压入的帧过多，程序就会奔溃

### functionHoisting函数提升
#### 定义
**不管把具名函数放在哪里，它都会跑到语句中的第一行**
#### 代码实例
在这里并不会报错，因`add`函数会跑到第一行，在`add(1,2)`的前面，**申明的具名函数会提升**，称为函数提升
```
add(1,2)
function add(x,y){
    return x + y
}
```
#### 反面实例1-报错的函数提升
因为`let`只准声明一次，所以`add`为变量数字，不能在被赋值，也不会被提升
```
let add = 1
function add(){} // 报错，因为add已经被申明了
```
#### 反面实例2-变量提升
因为`var`可以被重复申明，同时`var`是全局变量，申明的时候会被提升，成为变量提升
```
function add(x,y){}
var add = 1
```
#### 反面实例3-不是函数提升
因为左边的是赋值，右边的匿名函数申明不会提升,不能在函数未被申明的时候，调用函数，结果是会报错
```
add(1,2)
let add = function(x,y){return x + y}
```


### arguments参数
#### arguments定义
由于`JavaScript`允许函数有不定数目的参数，所以需要一种机制，可以在函数体内部读取所有参数。这就是`arguments对象`的由来。**`arguments`对象包含了函数运行时的所有参数。**
`arguments`对象包含了函数运行时的所有参数，`arguments[0]`就是第一个参数，`arguments[1]`就是第二个参数，以此类推。这个对象只有在函数体内部，才可以使用。
```
let f = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}

f(1, 2, 3)
// 1
// 2
// 3
```
#### arguments是array-lik object伪数组
需要注意的是，**虽然`arguments`很像数组，但它是一个对象,也叫做伪数组,拥有`length`属性，没有数组共有的属性**，比如`slice()`和`forEach()`,不能在`arguments`对象上直接使用。
#### 传递实际参数给arguments
在下面的代码中,`fn(1,2,3)`传递了三个实际参数给`arguments`,那么就是`[1,2,3]`的伪数组
```
function fn(){
    console.log(arguments);
}
fn(1,2,3)
```

### 更多信息
>[浅析javascript调用栈](https://segmentfault.com/a/1190000010360316)

>[JavaScript 中的 Hoisting ](https://www.html.cn/archives/7924)

>[call stack 调用栈](https://developer.mozilla.org/zh-CN/docs/Glossary/Call_stack)

>[你不知道的 JS 错误和调用栈常识](https://segmentfault.com/a/1190000008621990)

>[网道 JS函数](https://wangdoc.com/javascript/types/function.html)