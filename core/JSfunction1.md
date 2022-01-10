## 目录
1. [函数是什么](#函数是什么)
2. [闭包](#闭包)
3. [柯里化函数](#柯里化函数)
4. [总结](#总结)


### 函数
特性
* 由一个或多个语句组成
* 完成特定任务
* 相对独立


使用场景
* 函数-function 有返回值
* 过程-procedure 没有返回值
* 方法-method 存在于对象或者类中

函数的返回值由什么确定
* 定义函数时的变量 environment
* 调用时传入的参数 params

### 闭包
特点
* 能让一个函数维持住一个变量
* 不能维持这个变量的值，变量的值会变化

对象是穷人的闭包
* 对象也可以维持住一个变量
* 如果一门语言不支持闭包，可以使用对象代码

闭包是穷人的对象
* 如果一门语言不支持对象，可以用闭包代理


### 柯里化函数
把多参数函数，变成单参数函数


1. 如何把三参数函数`add(1, 2, 3)`变成`curriedAdd(1)(2)(3)`形式
```
const add = (number1, number2, number3)=> {
  console.log('total', number1 + number2 + number3)
}

const curriedAdd = a => b => c => add(1, 2, 3)
```

2. 假设`addTwo`接受两个参数，`addThree`接受三个参数，`addFour`接受四个参数，请写出一个`currify`参数，使得他们分别接受`2, 3, 4`次参数。`currify`能任意接受固定个参数的函数转化为单一参数的函数
```
currify(addTwo)(1)(2)
currify(addThree)(1)(2)(3)
currify(addFour)(1)(2)(3)(4)
```
```
const currify = (fn, params = [])=> (...args) => 
  params.length+args.length === fn.length
    ? fn(...params, ...args)
    : currify(fn, [...params, ...args])

  

addTwo = (a,b)=>a+b
addThree = (a,b,c)=>a+b+c

newAddTwo = currify(addTwo)
newAddThree = currify(addThree)

newAddTwo(1)(2)
newAddThree(1)(2)(3)
```