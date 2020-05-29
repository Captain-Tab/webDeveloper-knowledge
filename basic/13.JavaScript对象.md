## 目录
1. [Object对象](#Object对象)
2. [原型与对象](#原型与对象)
3. [对象属性的操作](#对象属性的操作)
4. [赋值属性(修改属性)](#赋值属性(修改属性))
5. [修改共有属性](#修改共有属性)
6. [更多信息](#更多信息)


### Object对象
#### 定义
对象（`object`）是 `JavaScript` 语言的核心概念，也是最重要的数据类型。
* 无序的数据集合
* 键值对的集合

#### 写法
```
let obj = {
    'name': 'frank', 
    'age': 18
}
```
```
let obj = new Object({'name': 'frank'})
```
```
console.log({'name': 'frank', 'age': 18})
```
#### key 键名
1. **对象的所有键名都是字符串**（`ES6` 又引入了 `Symbol` 值也可以作为键名），所以加不加引号都可以。
2. 如果键名是数值，会被自动转为字符串
3. 可以省略引号，省略之后就只能写标识符

#### property属性名
每个`key` 键名都是对象的`property`属性名
各种奇怪的属性名:
```
let obj = {
    1:'a',
    3.2:'b',
    1e2:true,
    1e-2:true,
    .234:true,
    0xFF:true
};
```
使用`Object.keys`得到`obj`的所有`key`
```
Object.keys(obj) => ["1","100","255","3.2","0.01","0.234"]
```
`Symbol`也能够做属性名，学习迭代的时候会起到作用
```
let a = Symbol();
let obj = { [a]: 'hello'}
```
#### 对象的引用
如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。
```
var o1 = {};
var o2 = o1;

o1.a = 1;
o2.a // 1

o2.b = 2;
o1.b // 2
```
上面代码中，`o1`和`o2`指向同一个对象，因此为其中任何一个变量添加属性，另一个变量都可以读写该属性。

此时，如果取消某一个变量对于原对象的引用，不会影响到另一个变量。
```
var o1 = {};
var o2 = o1;

o1 = 1;
o2 // {}
```
上面代码中，`o1`和`o2`指向同一个对象，然后`o1`的值变为`1`，这时不会对`o2`产生影响，`o2`还是指向原来的那个对象。

但是，这种引用只局限于对象，如果两个变量指向同一个原始类型的值。那么，变量这时都是值的拷贝。
```
var x = 1;
var y = x;

x = 2;
y // 1
```
上面的代码中，当`x`的值发生变化后，`y`的值并不变，这就表示`y`和`x`并不是指向同一个内存地址。


#### value属性值
每个`value`都是对象的属性值，`value`可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为`Function`“方法”，它可以像函数那样调用。

#### 变量做属性名
方法为：
```
var obj = {};
obj[a] = 1234;
```
或者
```
let a = 'xxx';
var obj = {
    [a] : 1111
}
```
#### 注意事项
* 不加`[]`的属性名会自动变成字符串
* 加了`[]`的则会当作变量取值
* 值如果不是字符串，则会自动变成字符串

### 原型与对象

#### 对象的隐藏属性
JS中每一个对象都有一个隐藏的属性`_proto_`，这个隐藏的属性储存**其共有属性组成的对象**的地址，这个**共有属性组成的对象**叫做原型。简单的说，隐藏属性储存这原型的地址。
例如
```
var obj = {}
obj.toString() // 不会报错
```
因为`obj`的隐藏属性对应的对象上有`toString()`

#### 每个对象都有原型
* 原型里存着对象的共有属性,例如`obj`的原型就是一个对象，假设为`a`
* `obj._proto_`就存着这个对象`a`的地址
* 这个`a`对象里有`toString`,`valueOf`等属性

#### 对象的原型也是对象
* 对象`obj`的原型是对象`a`,对象`a`也有原型
* `obj = {}`的原型对象`a`为所有对象的原型，这个原型包含所有对象的**共有属性**，是**对象的根**。对象`a`的原型，是**null**, 为空。

### 对象属性的操作
#### 查看属性
查看一个对象本身的所有属性，可以使用`Object.keys`方法。

* 方法一：
```
var obj2 = {name: 'frank', age:18};
Object.keys(obj2) // 查看属性名
["name","age"]
```
* 方法二：
```
  object['name']  // 查看具体某一个属性
  "frank"
  
  object.name  // 查看具体某一个属性
  "frank"
```
特别需要注意的是！！！：

1. 第一：
```
obj.name === obj['name'] // 二者等价, 因为['name']为字符串name
obj.name ≠≠≠ obj[name] // 二者不等价,因为[name]为变量name
```
2. **谁记错了，谁带绿帽子!!!**  第二：
```
let name = 'frank';
obj[name] === obj['frank'] // 二者等价
```
**代码问题**：
```
let list = ['name','age','gender'];
let person = {
    name: 'frank',
    age: '18',
    gender: 'man'
}
for(let i = 0; i < list.length ; i++){
     let name = list[i];
     console.log(person_???_)
}
```
选项为：
```
1.console.log(person.name)  // 错误，因为只打印字符串'name'
2.console.log(person[name])  // 正确，因为打印变量name
```
读对象的属性时，
如果使用 `[ ]` 语法，那么`JS`会先求`[ ]`中表达式的值，注意区分表达式是变量还是常量。
如果使用点语法，那么点后面一定是`string`常量。

3. 方法三：
```
Object.values[obj2] // 查看属性值
["frank","18"]
```
4. 方法四：
```
Object.entries(obj2) // 返回一个数组，包含属性名和属性值
["name","frank"]
["age","18"]
```
5. 方法五：
```
console.dir(obj2) // 以目录的形式打印出本身的属性和隐藏的属性
```
#### 查看属性是自身的还是共有的
```
obj2.hasOwnProperty('toString')
```
#### 注意事项：
```
obj[console.log('name')] // console.log 最后返回 undefined
name                     
undefined
```

#### in运算符
1. `in`运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回`true`，否则返回`false`。
```
var obj = { p: 1 };
'p' in obj // true
```
2. `in`运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。下面的代码中，`toString`方法不是对象`obj`自身的属性，而是继承的属性。但是，`in`运算符不能识别，对继承的属性也返回`true`。
```
var obj = {};
'toString' in obj // true
```
3. `'xxx' in obj && obj.xxx === undefined` 意思为含有属性名，但是值为`undefined`
4. 注意当`obj.xxx === undefined`的时候，不能判断`'xxx'`是否为`obj`的属性

#### for…in循环
语法, `for...in`循环用来遍历一个对象的全部属性
```
var obj = {
  x: 1,
  y: 2
};
var props = [];
var i = 0;

for (var p in obj) {
  props[i++] = p
}

props // ['x', 'y']
```

注意事项
1. 它遍历的是对象所有可遍历（`enumerable`）的属性，会跳过不可遍历的属性。
2. 它不仅遍历对象自身的属性，还遍历继承的属性。

如果继承的属性是可遍历的，那么就会被`for...in`循环遍历到。但是，一般情况下，都是只想遍历对象自身的属性，所以使用`for...in`的时候，应该结合使用`hasOwnProperty`方法，在循环内部判断一下，某个属性是否为对象自身的属性。例如
```
var person = { name: '老张' };

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
// name
```
####  with语句
它的作用是操作同一个对象的多个属性时，提供一些书写的方便。

语法
```
// 例一
var obj = {
  p1: 1,
  p2: 2,
};
with (obj) {
  p1 = 4;
  p2 = 5;
}
// 等同于
obj.p1 = 4;
obj.p2 = 5;

// 例二
with (document.links[0]){
  console.log(href);
  console.log(title);
  console.log(style);
}
// 等同于
console.log(document.links[0].href);
console.log(document.links[0].title);
console.log(document.links[0].style);
```
**注意事项**，如果`with`区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量。
```
var obj = {};
with (obj) {
  p1 = 4;
  p2 = 5;
}

obj.p1 // undefined
p1 // 4
```
上面代码中，对象`obj`并没有`p1`属性，对`p1`赋值等于创造了一个全局变量`p1`。正确的写法应该是，先定义对象`obj`的属性`p1`，然后在`with`区块内操作它。

这是因为`with`区块没有改变作用域，它的内部依然是当前作用域。这造成了`with`语句的一个很大的弊病，就是绑定对象不明确。所以**不建议使用with语句**

#### 删除属性
`delete`命令用于删除对象的属性，删除成功后返回`true`。

语法为:`delete obj.xxx`或者`delete obj['xxx']`

注意事项
1. `delete`命令删除对象`obj`的`xxx`属性。删除后，再读取`xxx`属性就会返回`undefined`，而且`Object.keys`方法的返回值也不再包括该属性。
2. 注意，删除一个不存在的属性，`delete`不报错，而且返回`true`。所以不能根据`delete`命令的结果，认定某个属性是存在的。
3. 有一种情况，`delete`命令会返回`false`，那就是该属性存在，且不得删除。例如
```
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  configurable: false
});

obj.p // 123
delete obj.p // false
```
4. `delete`命令只能删除对象本身的属性，无法删除继承的属性

### 赋值属性(修改属性)
如果对象本身有该属性为修改，没有该属性为增加(赋值)

语法
1. 方法一：
点运算符和方括号运算符，不仅可以用来读取值，还可以用来赋值。例如：
```
let obj = {};

obj.name = 'frank';  // name 是字符串
obj['name'] = 'frank'; // 'name' 是字符串
```
2. 方法二：
`JavaScript` 允许属性的“后绑定”，也就是说，你可以在任意时刻新增属性，没必要在定义对象的时候，就定义好属性。例如：
```
var obj = { name: 'frank' };

// 等价于
var obj = {};
obj.name = 'frank';
```
3. 方法三：
```
let key = 'name';
obj[key] = 'frank'   // 这里的key为变量，先得到key的值，再转化为字符串
```
4. 错误实例

* 实例1：
```
obj[name] = 'frank' // 错误，因为name是变量，值不确定
```
* 实例2：
```
let key = 'name';
obj.key = 'frank' // 错误，因为字符串'key'不存在，只有变量key存在
```
5. 批量赋值
通过使用`Object.assign()`来进行一次给多个属性赋值
```
Object.assign(obj,{name: 'frank', age: 18, gender: 'man'})
```

### 修改共有属性
**不推荐使用_proto_代码来编写程序，以下为教学示例**
1. 注意事项1

在`JS`中无论无法通过添加，修改`object`本身共有属性的行为，来修改共有属性。例如：
```
let obj = {} 
obj.toString = 'xxx' // 修改obj的本身的共有属性toString

let obj2 = {}
obj2.toString // obj2的共有属性不受影响，地址还是指向原型
```
2. 注意事项2

以下方法可以修改原型上的共有属性
```
obj._proto_.toString = 'xxx'  // 不推荐使用_proto_，不推荐修改原型，会引起很多问题
```
或者
```
Object.prototype.toString = 'xxx' // 不推荐修改原型，会引起很多问题
```
3. 注意事项3
* 方法一：
```
obj._proto_ = null  // 该对象将失去共有属性，不指向原型，只有自己本身的属性
```
* 方法二：
```
let obj  = { name: 'frank' }
let common = { kind: 'human'}
obj._proto_ = common  // 将obj的原型设置为common，obj将拥有common的共有属性
```
* 方法三：
`Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`
``` 
let common = { kind: human }
let obj = Object.create(common) // 以Common对象为原型来新建对象obj
```

### 更多信息
>[JavaScript 标准参考教程（alpha）阮一峰](https://javascript.ruanyifeng.com/grammar/object.html)
