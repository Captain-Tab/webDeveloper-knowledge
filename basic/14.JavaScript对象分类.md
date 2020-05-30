## 目录
1. [对象需要分类吗](#对象需要分类吗)
2. [如何确定对象的原型](#如何确定对象的原型)
3. [练习题目](#练习题目)
4. [对象需要分类](#对象需要分类)
5. [需要分类的理由](#需要分类的理由)
6. [类型VS类](#类型VS类)
7. [对象的不同类](#对象的不同类)
8. [Function函数对象](#Function函数对象)
9. [关于window的解答](#关于window的解答)
10. [ES6引用了class语法](#ES6引用了class语法)
11. [更多信息](#更多信息)


### 对象需要分类吗？
我们可以通过设定一个例子，根据思路写出代码来，得到答案。

正方形拥有三个属性分别为：边长，周长和面积。以下为求正方形的三个属性代码
#### 代码1
```
let square = {
  width: 5,
  getArea(){
      return this.width * this.width
  },
  getLength(){
      return this.width * 4
}
```
如果想求得`12`个正方形的边长和周长，那么需要重复`12`次以上的代码。
```
let square2 = {
  width: 6,
  getArea(){
      return this.width * this.width
  },
  getLength(){
      return this.width * 4
}
*****
```
#### 代码2
上面的方法太笨了，我们可以使用`for`循环来解决，来新建12个对象
```
let squareList = [];

for(let i = 0; i<12 ; i++){
    squareList(i) = {
        width: 5;
        getArea(){
            return this.width * this.width
        },
        getLength(){
            return this.width * 4
        }
    }
}
```
但是如果，正方形的宽度不全都为5，怎么办呢？我们可以继续改进，通过添加一组数组来解决
```
let squareList = [];
let widthList = [5,6,5,6,5,6,5,6,5,6,5,6]

for(let i = 0; i<12 ; i++){
    squareList(i) = {
        width: witdthList[i];
        getArea(){
            return this.width * this.width
        },
        getLength(){
            return this.width * 4
        }
    }
}
```
**代码2占有内存**, 这次的代码比代码`1`更精简，但是也不够好，因为占用了太多内存。因为会有`square[i}`会每次新建一个对象，占有内存，其中含有2个函数`getArea()`和`getLength()`。`12`个新建对象，会产生`24`对`getArea()`和`getLength()`。
![](https://user-gold-cdn.xitu.io/2020/2/14/17042104ba768816?w=924&h=544&f=jpeg&s=63838)

#### 代码3
这次我们可以选择使用原型，将`12`个对象的共有属性放在原型里。代码为：
```
let squareList = [];
let widthList = [5,6,5,6,5,6,5,6,5,6]

// 创建原型
let squarePrototype = {  
    getArea(){
        return this.width * this.width
    },
    getLength(){
        return this.width * 4
}

for(let i = 0; i<12; i++){
    squareList[i] = Object.create(squarePrototype)
    squareList[i].width = widthList[i]
}
```
这次的代码比上次更节省内存，但是问题在于创建`squareList`的代码太分散了。

#### 代码4
这次我们就把代码抽离到一个函数里，然后就调用函数，也叫做封装。代码为：
```
let squareList = [];
let widthList = [5,6,5,6,5,6,5,6,5,6]

// 创建函数封装，这个函数为构造函数
function createSquare(width){
    // 以 squarePrototype 为原型新建空的对象
    let obj = Object.create(squarePrototype);
    obj.with = width;
    return obj
}

let squarePrototype = {
    getArea(){
        return this.width * this.width
    },
    getLength(){
        return this.width * 4
}

for(let i = 0; i<12; i++){
    squareList[i] = createSquare(widthList(i))
 }
```
#### 代码5:
因为`squarePrototype`原型和`createSquare`函数还是分散的，我们可以继续提高，把函数和原型组合在一起。代码为：
```
let squareList = [];
let widthList = [5,6,5,6,5,6,5,6,5,6]

function createSquare(width){
    // 注意：这里不是先使用再定义。这里也属于定义
    let obj = Object.create(createSquare.squarePrototype);
    obj.with = width;
    return obj
}

// 把原型放在函数上，组合起来
createSquare.squarePrototype = {
    getArea(){
        return this.width * this.width
    },
      getLength(){
        return this.width * 4
    },
    // 通过原型找到构造函数
    constructor: createSquare
}

for(let i = 0; i <12; i++){
    squareList[i] = creatSquare(widthList[i]);
    // constructor 可以知道是谁构造了这个对象
    console.log(squareList[i].constructor)
}
```

#### 代码6:
代码到这里就已经完美了，为了最终固定下来，我们来通过使用`new`操作符重写这段代码。
```
let squareList = [];
let widthList = [5,6,5,6,5,6,5,6,5,6]

function Square(width){
    this.width = width
}
Square.prototype.getArea = function(){
    return this.width * this.width
}
Square.prototype.getLength = function(){
    return this.width * 4
}
for(let i = 0; i < 12; i++){
    squareList[i] = new Square(widthList[i]);
    console.log(squareList[i].constructor)
}
```

#### 总结
代码对比
* 最后的代码6和代码5相比，简化了代码，二者唯一的区别是代码6调用了`new`
* 通过以上的代码，可知每个函数都有 `prototype` 属性
* 每个 `prototype` 都有 `constructor`, 而`constructor`为函数自身

`new` 操作符
* 自动创建空对象
* 自动为空对象关联原型，例如`new x()`, 原型地址指定为`x.prototype`
* 自动将空对象作为`this`这个关键字运行构造函数
* 自动返回`return this`

`constructor`构造函数
* 例如构造函数`x`，本身负责给对象本身添加属性
* `x.prototype`对象负责保存对象的共有属性

#### 代码规范
大小写
* 所有构造函数首字母都为大写
* 所有被构造出来的对象，首字母小写

函数命名
* `new`后面的函数命名都为名词，例如`new Person()`,`new Object()`
* 其他函数命名都为动词，例如`createSquare(5)`,`createElement(div)`


### 如何确定对象的原型
`let obj = new Object()`的原型是`Object.prototype`

`let arr = new Array()`的原型是`Array.prototype`

`let square = new Square()`的原型是`Square.prototype`

因为`new`操作符自动为空对象关联原型，原型地址指向`X.prototype`

#### 结论:JS里唯一的公式
**如果`a`对象是被`A`构造的，那么`a`的原型就是`A`的`prototype`属性所对应的对象**
#### 原型公式
`ojbect._proto_ === Object.prototype`\
对象的`_proto_` 等价于其构造函数的`prototype`


### 练习题目
#### 问题1
`let x = {}`
1. 请问`x`的原型是什么？\
答案：`x`的原型是`Object.prototype`对应的对象
2. `x._proto_`的值是什么？\
答案：`x._proto_ === Object.prototype`
3. 上面两个问题答案相等吗？\
答案：相等

#### 问题2
`let square = new Square(5)`
1. 请问`square`的原型是什么？\
答案：`square`的原型是`Square.prototype`对应的对象
2. `square._proto_`的值是什么？\
答案：`square._proto_ === Square.prototype`

#### 问题3
1. `Object.prototype`是哪个构造函数构造的？\
答案：不知道
2. `Object.prototype`的原型是什么？\
答案：`Object.prototype`是`null`,没有原型
3. `Object.prototype._proto_`?\
答案：`Object.prototype._proto_ === null`

### 对象需要分类
#### 代码实例
根据上面学到的知识，我们可以写出更多类似的代码需求
#### Circle圆
```
function Circle(radius){
    this.radius = radius
}
Circle.prototype.getArea = function(){
    return Math.pow(this.radius,2) * Math.PI
}
Circle.prototype.getLength = function(){
    return this.radius * 2 * Math.PI
}

let circle = new Circle(5);
circle.radius;
circle.getArea();
circle.getLength();
```
#### Rectangle 长方形
```
function Rect(width, height){
    this.width = width;
    this.height = height
}
Rect.prototype.getArea = function(){
    return this.width * this.height
}
Rect.prototype.getLength = function(){
    return (this.width + this.height) * 2
}

let rect = new Rect(5);
rect.width;
rect.height;
rect.getArea();
rect.getLength();
```
### 需要分类的理由
#### 理由一：同类
* 当很多对象拥有共同的属性和行为的时候，可以把它们分为同一类。例如对象`square1`和对象`square2`，都基于`Square`对象而创建
* 节省多余的代码，高效的创建新的对象

#### 理由二：不同类
* 当很多对象拥有不同的属性和行为的时候，可以把他们分为不同的类。例如`Square`,`Rect`,`Circle`就是不同的类别。`Array`和`Function`也是不同的类别
* 由`Object`所创建的对象，是最没有特点的对象

### 类型VS类
#### 类型
类型是`JS`数据的分类，分为`7`种，分为`Number`数字, `String`字符串, `Boolean`布尔值, `Symbol`符号, `Undefined`,`NaN`, `Object`对象
#### 类
类则是针对对象的分类，有无数种，分为`Array`,`Function`,`Date`,`RegExp`等等

### 对象的不同类
#### Array数组对象
语法
```
let arr = [];                 // 新建空数组
let arr = new Array(1,2,3);   // 新建数组，分别含有2，3，4
let arr = new Array(3);       // 新建空数组，设置长度为3
```
#### 数组本身的属性
属性名为字符串，例如`'1'`,`'2'`,`'3'`,同时数组也拥有`length`属性

#### 数组共有的属性
例如`push`,`pop`,`shift`,`unshift`,`join`

### Function函数对象
#### 语法
```
function fn(x,u){return x+y}
let fn2 = function fn(x,y){return x + y}
let fn = (x,y) => x + y
let fn = new Function('x','y','return x + y')
```
#### 函数本身的属性
例如`'name'`和`'length'`
#### 函数共有的属性
例如`'call'`,`'apply'`,`'bind'`

### 关于window的解答
#### window 是谁构造的？
答案：由`Window`构造,通过代码我们可以知道
```
window.constructor // 显示为Window()

window.__proto__ === Window.prototype
```
#### window.Object是谁构造的？
答案：由`window.Function`构造,因为所有的函数都是由`window.Function`构造的，通过代码我们可以知道
```
window.Object.constructor // 显示为Function()

window.Object.constructor === window.Function
```
#### window.Function是谁构造的？
答案: 由`window.Function`构造的，因为所有的函数都是由`window.Function`构造的，浏览器和JS引擎构造了`Function`，然后指定了它的构造者是它自己。

### ES6引用了class语法
#### 使用class语法写Square
```
class Square{
   // 变量x在这里无意义，只是显示class语法可以使用Static
    static x = 1;
    width = 0;
    constructor(width){
        this.width = width
    }
    getArea(){
        return this.width * this.width
    }
    getLength:function(){
        return this.width * 4
    }
    // 只读属性
    get area2(){
        return this.width * this.width
    }
}
```

### 更多信息
>[MDN 类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)

>[ES6 新特性列表](https://fangyinghang.com/es-6-tutorials/)

>[MDN 对象初始化](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0)

>[MDN 解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

>[你可以不会 class，但是一定要学会 prototype](https://zhuanlan.zhihu.com/p/35279244)   

>[JS 的 new 到底是干什么的？](https://zhuanlan.zhihu.com/p/23987456)   

>[JS 中 __ proto __ 和 prototype 存在的意义是什么？](https://www.zhihu.com/question/56770432/answer/315342130)   

>[方应航 JS 中 __proto__ 和 prototype 存在的意义是什么？ - 知乎](https://www.zhihu.com/question/56770432)