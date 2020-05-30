## 目录
1. [JS基本知识点](#JS基本知识点)
2. [JS难点](#JS难点)
3. [问题](#问题)
4. [JS世界的构造顺序](#JS世界的构造顺序)

### JS基本知识点
#### 基本概念
* 内存，变量,数据变量
* 对象，作用域，运算符..

#### 控制语句
* `if...else..`
* `while, switch`
* `for...`

#### 对象
* 原型，原型链
* 对象分类
* `new`一个新对象
* 构造函数
* `this`的隐式传递和显示传递

### JS难点
#### `JS`三座大山
* 原型
* `this`
* `Ajax`
* 如果还没理解，也没关系，没问题，反复学反复理解，突破这三座大山

#### JS唯一的公式
 * `对象._proto_ === 其构造函数.prototype`

* `JS`根公理`Object.prototype`是所有对象(直接或间接)的原型

#### 函数公理
* 所有的函数都是由`Function`构造的
* `任何函数._proto_ === Function.prototype`
* `任何函数都有Ojbect/Array/Function`

### 问题
#### 原型问题
* `{name: 'frank'}`的原型\
答：`Object.prototype`
* `[1,2,3]`的原型\
答：`Array.prototype`
* `Object`的原型\
答：`Function.prototype`
* `Object`的原型是`Object._proto_`\
答：对
* `Object`的原型是`Ojbect.prototype`\
答： 错

原因: [`xxx`的原型]等价于[`._proto_`]

#### 疑惑问题1
`[1,2,3]`的原型是`Array.prototype`, `Object.prototype`是不是所有对象的原型? 如果是，那么为什么`Object._proto_`不是`[1,2,3]`的原型

原因
* 原型分为两种：直接原型和间接原型
* 对于普通对象来说，`Objetc.prototype`是直接原型
* 对应数字，函数来说，`Object.prototype`是间接原型


#### 疑惑问题2
为什么`Ojbect.prototype`不是根对象

疑惑的理由
* `Oject.prototype`是所有对象的原型
* `Object`是`Function`构造出来的
* 因此，`Function`构造了`Object.prototype`,`Function`才是根对象

产生疑惑的原因
1. `Object.prototype`和`Object.prtototype`对象的区别，`Object.prototype`可以指的是地址，地址包含在了`Ojbect.prototype`对象里。**实质上，Function 构造了Object.prototype的地址，而非对象**
2. 对象里面从来都不会包含另外一个对象,只包含了对象的地址

3. 为什么`只有函数有prototype`属性? 因为`JS`通过`new`来生成对象，但是仅靠构造函数，每次生成的对象都不一样。
有时候需要在两个对象之间共享属性，由于`JS`在设计之初没有类的概念，所以JS使用函数的`prototype`来处理这部分需要被共享的属性，通过函数的`prototype`来模拟类：
当创建一个函数时，`JS`会自动为函数添加`prototype`属性，值是一个有`constructor`的对象。

### JS世界的构造顺序
#### 构造顺序1
1. 创建根对象`#101`(`toString`), 根对象没有名字 
2. 创建函数的原型`#208`(`call/apply`), 原型`_p`为`#101`
3. 创建数组的原型`#404`(`push/pop`), 原型`_p`为`#101`
4. 创建`Function`,`#342`, 原型`_p`为`#208`
5. 使用`Function.prototype`存储函数的原型，等于`#208`
6. 发现`Function`的`_proto_`和`prototype`都是`#208`
7. 使用`Function`创建`Object`
8. 使用`Object.prototype`存储对象的原型，等于`#101`
9. 使用`Function`创建`Array`
10. 使用`Array.prototype`存储数组的原型，等于`#404`
11. 创建`window`对象(之前都没有名字)
12. 使用`window`的`'Object'`,`'Array'`属性将7和9中的函数命名
13. `JS`创建一个对象时，不会给这个对象名字

#### 构造顺序2
1. 使用`new Object()`创建`obj1`
2. `new`会将`obj1`的原型`_p`设置为`Object.prototype`, 也就是`#101`
3. 使用`new Array()`创建`arr1`
4. `new`会将`arr1`的原型`_p`设置为`Array.prototype`, 也就是`#404`
5. 使用`new Function`创建`1`
6. `new`会将`f1`的原型`_p`设置为`Function.prototype`, 也就是`#208`

#### 构造顺序3
1. 自己定义构造函数`Person`, 函数里给`this`加属性
2. `Person`自动创建`prototype`属性和对应的对象`#502`
3. 在`Person.prototype`, `#502`上面加属性
4. 使用`new Person()`创建对象
5. `new`会将`p`的原型`_p`设为 `#502`

#### 原型图表
![](https://user-gold-cdn.xitu.io/2020/2/19/1705def9b7377bdd?w=770&h=772&f=jpeg&s=77158)

#### 总结
**构造函数**
* 构造函数是用来构造对象的，会预先存好对象的原型，原型的原型是根
* `new`的时候将对象的`_p`指向原型

**对象**
* 所有的对象都直接或间接的指向根对象
* 如果对象想要分类，就在原型链上加一环，用构造对象可以加这一环

**思考**

如果加了一环，想再加一环怎么办？

