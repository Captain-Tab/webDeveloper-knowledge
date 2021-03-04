## 目录
1. [this定义](#this定义)
2. [不同情况下的this指向](#不同情况下的this指向)
3. [假设没有this](#假设没有this)
4. [this的出现在JS中](#this的出现在JS中)
5. [call()方法](#call()方法)
6. [apply()方法](#apply()方法)
7. [bind()方法](#bind()方法)
8. [this的两种使用方法](#this的两种使用方法)
9. [ArrowFunction箭头函数](#ArrowFunction箭头函数)
10. [立即执行函数](#立即执行函数)
11. [更多信息](#更多信息)


### this定义

**面向对象语言中 `this` 表示当前对象的一个引用，但在 `JavaScript` 中 `this` 不是固定不变的，它会随着执行环境的改变而改变**

### 不同情况下的this指向
#### this指向window
不给任何条件，`this`默认指向`window`,`window` 就是该全局对象为`[object Window]`
```
function fn(){
    console.log(this)
}

fn()
// winow object
```
#### this为undefined
在严格模式下，如果`this`没有被`execution context`执行环境定义，那它将保持为`undefined`。
```
function f2(){
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true
```
#### this指向所属对象
如果要想把`this`的值从一个环境传到另一个，就要用`call()` 或者`apply()`方法。
```
// 将一个对象作为call和apply的第一个参数，this会被绑定到这个对象。
var obj = {a: 'Custom'};

// 这个属性是在global对象定义的。
var a = 'Global';

function whatsThis(arg) {
  return this.a;  // this的值取决于函数的调用方式
}

whatsThis();          // 'Global' 指向全局对象
whatsThis.call(obj);  // 'Custom'  指向所属对象
whatsThis.apply(obj); // 'Custom'  指向所属对象
```
#### this绑定特定对象
当一个函数在其主体中使用`this` 关键字时，可以通过使用函数继承自`Function.prototype`的 `call()`或 `apply()`方法将`this` 值绑定到调用中的特定对象。
```
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 第一个参数是作为‘this’使用的对象
// 后续参数作为参数传递给函数调用
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// 第一个参数也是作为‘this’使用的对象
// 第二个参数是一个数组，数组里的元素用作函数调用中的参数
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
```


### 假设没有this
#### 代码实例一：引用变量
```
let person = { 
    name: 'frank',
    sayHi(){
        console.log(`你好，我叫`+ person.name)
    }
}
person.sayHi()
```
这种方法称为引用,通过对象地址的变量来获取`name`

#### 代码实例一的问题
```
let sayHi = function(){
    console.log(`你好，我叫`+ person.name)
}
let person = {
    name：‘frank,
    'sayHi':sayHi
}
person.sayHi === ???
```
在上面的代码里面`person`如果改名，`sayHi`函数就挂了。同时，`sayHi`函数可能在另外一个文件里面，出现`person`指定不清楚的问题
#### 代码实例二：使用class的问题
```
class Person{
    constructor(name){
        this.name = name
        // 这里的this是new强制指定的
    }
    sayHi(){
        console.log(???)
    }
}
```
在上面的代码中，只有类，还没有创建对象，也不可能得到对象的`name`。存在逻辑上的矛盾，不能对未生成的事物，进行操作

#### 代码实例二：使用class的解答
* 通过用`arguments`传给对象,使用对象的`name`
```
let person = {
    name: 'frank',
    sayHi(p){
        console.log(`你好，我叫` + p.name)
    }
}
person.sayHi(person)
```
* 通过用`arguments`传给类,使用类的`name`
```
class Person{
    constructor(name){
        this.name = name
    }
    sayHi(p){
        console.log(`你好，我叫`+p.name)
    }
}
```
#### 代码实例三：python的解答
怎么样让类，对还没有出现的实例进行操作呢？
`python`的思路是新建对象`person`，通过赋值属性给这个新的`person`, 属性得到了保存，然后再从新对象这里调用。这样就完成立对未出现对象的操作。打个比方说，你的孩子还没出生，但是你有东西想给他，然后你把东西放在一个地方，等他出生了就可以给他了。在这里，孩子就是新的实例`person`,这个地方就是`self`
```
class Person:
  def_init_(self, name): # 构造函数
    self.name = name
  
  def sayHi(self):
    print('Hi,I am' + self.name)
  
  person = Person('frank')
  person.sayHi()
```
1. 每个函数都接受一个额外的`self`，这个`self`就是传进来的对象，等于`person`
2. 只不过`Python`会偷偷的把你传递对象,`person.sayHi() === person.sayHi(person)`。这样，`person`就传给`self`

### this的出现在JS中
#### 用this获取未出现的对象
```
let person = {
    name: 'frank',
    sayHi(){
        console.log(`你好，我叫` + this.name)
    }
}
```
在这里，`person.sayHi()`相对于`person.sayHi(person)`,然后`person`被传给`this`(`person`是个地址)。这样，每个函数都能用`this`获取一个未知对象的引用了。`person.sayHi()会隐式`的把`person`作为`this`传给`sayHi`,这样做就方便`sayHi`获取`person`对应的对象

#### 小结
* 我们想让函数获取对象的引用，但是并不想通过变量名做到
* `python`通过额外的`self`参数做到
* `javaScript`通过额外的`this`做到，`this`就是最终调取`sayHi()`的对象。

#### this的调用方法
* 第一种，`person.sayHi()`会自动把`person`传到`this`里
* 第二种，`person.sayHi.call(person)`,需要手动把`person`传递函数里，作为`this`
* 推荐第二种，深入学习运用，理解概念


### call()方法
#### 定义
**`call()`方法可以用来在一个对象调用另一个对象的方法，也可以改变调用方法`this`的指向**
```
function a(){
	console.log(this);
}
a();   // this 默认指向window
a.call({name:"西瓜"}); // this指向传入的对象{name:"西瓜"}
```
#### 语法
```
function.call(thisArg,arg1,arg2,...)
```
#### 原理
手动来实现一个`call()`方法
```
Function.prototype.MyCall = function(obj){
	var newObj = obj || window;
	newObj.fn = this;
	var params = [...arguments].slice(1);
	var result = newObj.fn(...params);
	delete newObj.fn;
	return result;
}
```
1. 首先定义一个新的对象，若传入对象的`obj`存在，则新对象等于`obj`,若`obj`不存在，则等于`window`；
2. 然后把`this`挂在到当前定义的新对象上(`this`即为调用的函数)
3. 第`4`行代码得到了函数附带的参数
4. 然后执行创建的新对象`newObj`的`fn`函数
5. 最后在执行了以后，把这个挂载的`fn`函数删除
6. 返回结果`result`

#### 问题
```
function test(){
	console.log(this);
}
test();
test.MyCall({name:"西瓜"});
```
所以在这里 结果为
```
window{****}
{name:"西瓜"}
```
#### 进阶问题
```
function f1(a){
	console.log(1);
	console.log(this);
}
function f2(){
	console.log(2);
	console.log(this);
}

f1.call(f2);
f1.call.call(f2);
```
答案为：
```
1
f2(){console.log(2);console.log(this);}

2
window{*****}
```
第二个结果返回为`window`对象是因为在这里，可以最终简化为`f2.call()`,没有传入对象，所以指向`window`
```
var newObj = f2;
f2.fn = Function.prototype.MyCall;
```
* `this`还是指向`f2()`
* `f1.call()`就是`Function.prototype.MyCall`
* 最终就是`f2()`调用`call()`得出结果
* `f1.call.call(f2) === Function.prototype.call(f2) === f2.call()`

### apply()方法
`call()`,`apply()`方法区别是,从第二个参数起,`call()`方法参数将依次传递给借用的方法作参数,而`apply()`直接将这些参数放到一个数组中再传递, 最后借用方法的参数列表是一样的。

语法
```
function.apply(this,[argumentsArray])
```

手动来实现一个`apply()`方法
```
Function.prototype.newApply = function(context, parameter) {
  if (typeof context === 'object') {
    context = context || window
  } else {
    context = Object.create(null)
  }
  let fn = Symbol()
  context[fn] = this
  context[fn](parameter);
  delete context[fn]
}
```

应用：
```
let array = ['a', 'b'];
let elements = [0, 1, 2];
array.push.newApply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```
### bind()方法
`bind()`也是函数的方法，作用也是改变`this`执行，同时也是能传多个参数。与`call`和`apply`不同的是`bind`方法不会立即执行，而是**返回一个改变上下文`this`指向后的函数，原函数并没有被改变**

`bind()` 方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入`bind()`方法的第一个参数作为 `this`，第二个以及以后的参数，加上绑定函数运行时本身的参数，按照顺序作为原函数的参数来调用原函数。

语法
```
function.bind(this,arg1,arg2,arg3,...)
```
手动实现`bind()`方法
```
Function.prototype.bind = function (context,...innerArgs) {
  var me = this
  return function (...finnalyArgs) {
    return me.call(context,...innerArgs,...finnalyArgs)
  }
}
```
应用：
```
let person = {
  name: 'Abel'
}
function sayHi(age,sex) {
  console.log(this.name, age, sex);
}
let personSayHi = sayHi.bind(person, 25)
personSayHi('男')
```

#### 实例
* 没有用到`this`
```
function add(x,y){
    return x + y
}
add.call(undefined,1,2)
// 3
```
上面的代码种，为什么要多写一个`undefined`是因为代码没有传入对象，用`undefined`或者`null`都可以
* 使用到`this`
```
let array = [1,2,3]
Array.prototype.forEach2 = function(fn){
    for(let i = 0; i < this.length; i++){
        fn(this[i],i,this)
    }
}
array.forEach2.call(array,(item)=>console.log(item))
```
**this是什么?** 这里的`this`指的的是`array`

**this 一定是数组吗?**
不一定，也可以是对象，例如`array.forEach2.call({0:'a',1:'b'},(item)=>console.log(item))`

### this的两种使用方法
#### 隐式传递
`fn(1,2)`其实等价于`fn.call(undefined,1,2)`
`obj.child.fn(1)`其实等价于`obj.child.fn.call(obj.child,1)`

#### 显示传递
`fn.call(undefined,1,2)`\
`fn.apply(undefined,[1,2])`

#### bind() 绑定this
1. 使用`bind()`可以让`this`不被改变
```
function f1(p1, p2){
    console.log(this,p1,p2)
}

let f2 =  f1.bind({name:'frank'}) // f2就是f1绑定之this之后的新函数
f2() // 等价于f1.call({name:'frank'})
```
2. 使用`bind()`还可以绑定其他参数
```
let f3 = f1.bind({name: 'frank')}, 'hi')
f3() // 等价于f1.call({name: 'frank'}, hi)
```

### ArrowFunction箭头函数
#### 箭头函数里面的`this`就是外面的`this`
```
let fn = () => console.log(this)
// window{****}
```
#### call()方法指定this也不起作用
```
let fn2 = () => console.log(this)
fn.call(2)
// window{****}
```
#### 没有arguments
```
let fn3 = () => console.log(arguments)
fn3(1,2,3)
// 报错，arguments is not defined
```
### 立即执行函数
#### 定义
`IIFE(Immediately Invoked Function Expression )` 立即调用函数表达式是一个在定义时就会立即执行的`JavaScript`函数
```
(function () {
    statements
})();
```
* 第一部分是包围在 圆括号运算符`()`里的一个匿名函数，这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此`IIFE`中的变量，而且又不会污染全局作用域
* 第二部分再一次使用`()`创建了一个立即执行函数表达式，`JavaScript`引擎到此将直接执行函数

#### 原理
1. 在`ES 5`时代，为了得到局部变量，必须引入一个具名函数，这样做就多余了
```
var a = 1;     // 申明全局变量a
function fn(){  // 申明全局函数，其中包含局部变量a
    var a = 2
}
```
2. 于是，这个函数必须是匿名函数，在函数后面加个`()`执行这个函数
```
function (){
    var a = 2
    console.log(a)
}()
```
3. 但是`JS`认为这个语法不规范，于是程序员尝试了很多方法，发现匿名函数前面加个运算符就可以解决，`!, ~, (), +, -`都可运行,这样就可以形成局部作用域(推荐使用`!`运算符)。`ES 6`使用`{}`包括代码就可以解决。
```
! function (){
    var a = 2
    console.log(a)
}()
// 2
// true
```
以下情况需要加分号`;`
```
console.log('hi') //这里需要加;分号，。(推荐使用`!`运算符)
(function (){
    var a = 2
    console.log(a)
}())
```
因为`console.log`返回`undefined`,不加分号，下面的匿名函数就会往上顶，和上一句合并，变为`console.log(undefined(function(){**})`

### 更多信息
>[javascript call方法的用处及原理](https://juejin.im/post/5d3eae1cf265da03ce39b04a)

>[如何在 JavaScript 中使用 apply(💅)，call(📞)，bind(➰)](https://juejin.im/post/5c8617d86fb9a049e93d8e4a#heading-15)

>[call、apply和bind的原生实现](https://segmentfault.com/a/1190000015724112)

>[IIFE 立即调用函数表达式 MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)
