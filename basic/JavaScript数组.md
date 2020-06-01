## 目录
1. [Array数组的定义](#Array数组的定义)
2. [Array数组的本质](#Array数组的本质)
3. [Array数组的特殊](#Array数组的特殊)
4. [Array-like-object伪数组](#Array-like-object伪数组)
5. [合并数组](#合并数组)
6. [截取数组](#截取数组)
7. [新建数组](#新建数组)
8. [查看数组的元素](#查看数组的元素)
9. [查看数组的单个元素](#查看数组的单个元素)
10. [删除数组的元素](#删除数组的元素)
11. [增加数组的元素](#增加数组的元素)
12. [修改数组中的元素](#修改数组中的元素)
13. [数组的变换](#数组的变换)
14. [练习题目](#练习题目)
15. [更多信息](#更多信息)


### Array数组的定义
**数组（array）是按次序排列的一组值**。每个值的位置都有编号（从`0`开始），整个数组用方括号表示。下面代码中的`a`、`b`、`c`就构成一个数组，两端的方括号是数组的标志。`a`是`0`号位置，`b`是`1`号位置，`c`是`2`号位置。
```
let arr = ['a', 'b', 'c'];
```
除了在定义时赋值，数组也可以先定义后赋值。
```
let arr = [];

arr[0] = 'a';
arr[1] = 'b';
arr[2] = 'c';
```
任何类型的数据，都可以放入数组。下面数组`arr`的`3`个成员依次是对象、数组、函数。
```
let arr = [
  {a: 1},
  [1, 2, 3],
  function() {return true;}
];

arr[0] // Object {a: 1}
arr[1] // [1, 2, 3]
arr[2] // function (){return true;}

```
如果数组的元素还是数组，就形成了多维数组。
```
let a = [[1, 2], [3, 4]];
a[0][1] // 2
a[1][1] // 4
```
### Array数组的本质
**本质上，数组属于一种特殊的对象。JS其实没有真正的数组，只是用对象模拟数组。** 下面代码表明，`typeof`运算符会返回数组的类型是`object`。
```
typeof [1, 2, 3] // "object
```
### Array数组的特殊
#### 数组的键名
数组的特殊性体现在，它的键名是按次序排列的一组整数（`0，1，2...`）。下面代码中，`Object.keys`方法返回数组的所有键名。可以看到数组的键名就是整数`0、1、2`。由于数组成员的键名是固定的（默认总是`0、1、2...`），因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名。
```
let arr = ['a', 'b', 'c'];

Object.keys(arr)
// ["0", "1", "2"]
```
`JavaScript`语言规定，对象的键名一律为字符串，**所以，数组的键名本质也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串。**
下面代码分别用数值和字符串作为键名，结果都能读取数组。原因是数值键名被自动转为了字符串。
```
let arr = ['a', 'b', 'c'];

arr['0'] // 'a'
arr[0] // 'a'
```
这点在赋值时也成立。一个值总是先转成字符串，再作为键名进行赋值。下面代码中，由于`1.00`转成字符串是`1`，所以通过数字键`1`可以读取值。
```
let a = [];

a[1.00] = 6;
a[1] // 6
```
对象有两种读取成员的方法：点结构`object.key`和方括号结构`object['key']`。但是，对于数值的键名，不能使用点结构。
下面代码中，`arr.0`的写法不合法，因为单独的数值不能作为标识符（`identifier`）。所以，数组成员只能用方括号`arr[0]`表示（方括号是运算符，可以接受数值）
```
var arr = [1, 2, 3];
arr.0 // SyntaxError
```
#### 不是典型的数组
典型的数组
* 元素的数据类型相同
* 使用连续的内存存储
* 通过数字下标获取元素
![](https://user-gold-cdn.xitu.io/2020/2/15/17046c4a8b1e94e9?w=400&h=243&f=jpeg&s=14823)

`JS`的数组
* 元素的数组类型可以不是同一类型
* 内存不一定是连续的，因为对象是随机存储的
* 不能通过数字下标，而是通过字符串下标，意味着数据可以有任意的字符串可属性名`key`,例如`let arr = [1,2,3]; arr['xxx']=1`
![](https://user-gold-cdn.xitu.io/2020/2/15/17046c481bd149d4?w=562&h=254&f=jpeg&s=22576)

### Array-like-object伪数组
#### 伪数组的定义
如果一个对象的所有键名都是正整数或零，并且有`length`属性，那么这个对象就很像数组，语法上称为“类似数组的对象”`array-like object`，也叫伪数组。下面代码中，对象`obj`就是一个类似数组的对象。但是，伪数组并不是数组，因为它们不具备数组特有的方法。对象`obj`没有数组的`push`方法，使用该方法就会报错。**简单地说没有数组共有属性的数组就是伪数组**
```
let obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

obj[0] // 'a'
obj[1] // 'b'
obj.length // 3
obj.push('d') // TypeError: obj.push is not a function
```
伪数组的根本特征，就是具有`length`属性。只要有`length`属性，就可以认为这个对象类似于数组。但是有一个问题，这种`length`属性不是动态值，不会随着成员的变化而变化。下面代码为对象`obj`添加了一个数字键，但是`length`属性没变。这就说明了`obj`不是数组。
```
let obj = {
  length: 0
};
obj[3] = 'd';
obj.length // 0
```
#### 伪数组的存在
典型的“类似数组的对象”是函数的`arguments`对象，以及大多数 `DOM` 元素集，还有字符串。下面代码包含三个例子，它们都不是数组, 因为`instanceof`运算符返回`false`，但是看上去都非常像数组。
```
// arguments对象
function args() { return arguments }
let arrayLike = args('a', 'b');

arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false

// DOM元素集
let elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false

// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false
```
#### 伪数组的操作
* 方法一：转化为真正的数组
数组的`slice`方法可以将“类似数组的对象”变成真正的数组
```
let arr = Array.prototype.slice.call(arrayLike);
```
或者使用`from`方法
```
Array.from({0:'a',1:'b',2: 'c',3: 'd',length:4})
```
* 方法二：使用数组的方法
“类似数组的对象”还有一个办法可以使用数组的方法，就是通过`call()`把数组的方法放到对象上面。下面代码中，`arrayLike`代表一个类似数组的对象，本来是不可以使用数组的`forEach()`方法的，但是通过`call()`，可以把`forEach()`嫁接到`arrayLike`上面调用。
```
function print(value, index) {
  console.log(index + ' : ' + value);
}

Array.prototype.forEach.call(arrayLike, print);
```
下面的例子就是通过这种方法，在`arguments`对象上面调用`forEach`方法。
```
// forEach 方法
function logArgs() {
  Array.prototype.forEach.call(arguments, function (elem, i) {
    console.log(i + '. ' + elem);
  });
}

// 等同于 for 循环
function logArgs() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(i + '. ' + arguments[i]);
  }
}
```
字符串也是类似数组的对象，所以也可以用`Array.prototype.forEach.call`遍历。
```
Array.prototype.forEach.call('abc', function (chr) {
  console.log(chr);
});
// a
// b
// c
```
#### 注意事项
注意，这种方法比直接使用数组原生的`forEach`要慢，所以最好还是先将“类似数组的对象”转为真正的数组，然后再直接调用数组的`forEach`方法。
```
let arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
  console.log(chr);
});
// a
// b
// c
```

### 合并数组
使用`concat()`方法可以合并两个数组，返回一个新的数组
```
let arr1 = [1,2,3,4]
let arr2 = [5,6,7,8]

arr1.concat(arr2)
// 得到新的数组 [1,2,3,4,5,6,7,8]
```
### 截取数组
使用`slice()`方法可以截取一个数组的一部分，返回一个新的数组
```
let arr3 = [1,2,3,4,5]

arr3.slice(2)
// 得到新的数组 [3,4,5]

let arr4 = arr3.slice(0)
// 复制全部属性得到一个新的数组 [1,2,3,4,5], 为浅拷贝
```

### 新建数组
#### 直接新建数组
```
// 方法一
let arr = [1,2,3];

// 方法二
let arr = new Array(1,2,3)

// 方法三,设置新数组的长度
ler arr = new Array(3)
```
#### 转化字符串或者伪数组为数组
```
// 方法一
let arr = '1,2,3'.split(',')

// 方法二
let arr = '1,2,3'.split('')

// 方法二，这个方法也可以把伪数组转换为数组
Array.from('123')
```

#### 深拷贝VS浅拷贝
**JS只提供了浅拷贝**。如何区分深拷贝与浅拷贝，简单点来说，就是假设`B`复制了`A`，当修改`A`时，看`B`是否会发生变化，如果`B`也跟着变了，说明这是浅拷贝，如果`B`没变，那就是深拷贝。

### 查看数组的元素
 * 使用 `Object.keys()`
使用`Object.keys()`查看数组的属性名
```
let arr = [1,2,3,4,5]
Object.keys(arr)
// ["0","1","2","3","4"]
```
* 使用 `Object.values()`
使用`Object.keys()`查看数组的属性值
```
let arr = [1,2,3,4,5]
Object.values(arr)
// [1,2,3,4,5]
```
* 使用`for..in`循环
`for...in`循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象。
```
let arr = [1,2,3,4,5]

for(let i in arr){
    console.log(i)
}
```
但是，`for...in`不仅会遍历数组所有的数字键，还会遍历非数字键。
```
let a = [1, 2, 3];
a.foo = true;

for (let key in a) {
  console.log(key);
}
// 0
// 1
// 2
// foo
```
* 使用`for loop`循环
```
let arr = [1,2,3,4,x]
for(let i = 0 ; i<arr.length; i++){
    console.log(`${i}: ${arr[i]}`)
}
// 0:1
// 1:2
// 2:3
// 3:4
```
* 使用`forEach`方法
```
let arr = [1,2,3,4]
arr.forEach(function(a,b){
    console.log(`${a}: ${b}`)
})
// 0:1
// 1:2
// 2:3
// 3:4
```
如何理解`forEach()`，以下为代码，帮助理解
```
function forEach(array,fn){
    for(let i=0; i<array.length; i++){
        fn(array[i], i, array）
    }
}

forEach(['a','b','c'], function(x,y,z){
    console.log(x,y,z)
})

// a 0 ['a','b','c']
// b 1 ['a','b','c']
// c 2 ['a','b','c']
```
* `forEach()`使用`for`循环遍历`array`的每一项，每一项都调用函数`fn(array[i],i,array)`
* 为什么需要调入第三个参数`array`呢？特别特殊的情况下需要，大多数情况没有作用

#### 注意事项
* 不推荐使用对象的方法`Object.keys()`,`使用Object.values()`,来查看数组的元素
* 不推荐`for..in`循环来遍历数组元素
* 推荐使用`for loop`和`forEach`方法
* `for loop`和`forEach`的区别在于，`for loop`可以在循环种使用`break`和`continue`，功能更强大，而`forEach`不行。`for loop`循环是block块级作业域，而`forEach()`是函数作用域

### 查看数组的单个元素
#### 语法
1. 方法一：`arr[index]`
查看具体元素的值
``` 
let arr = [111,222,333]
arr[0]
```
2. 方法二：`indexof`方法
查看某个元素是否存在于数组,存在返回`index`,不存在返回`-1`
```
let arr = [1,2,3,4]
arr.indexOf(3)
// 4
```
3. 方法三：`find`方法
查看数组是否有偶数,返回第一个找到的元素，比如下面的例子中，偶数有`2`和`4`,但是只返回第一个偶数`2`
```
let arr = [1,2,3,4]

arr.find((x)=>{
  x%2 === 0  
})
// 2
```
4. 方法四：`findIndex`方法
查看数组是否有偶数,返回第一个找到的元素的index索引，比如下面的例子中，偶数有`2`和`4`,但是只返回第一个偶数`2`的index索引，为`1`
```
let arr = [1,2,3,4]

arr.findIndex((x)=>{
  x%2 === 0  
})
// 1
```

#### 注意事项
**`index out of bound array`索引越界**
```
let arr = [1,2,3,4]

for(let i =0; i<arr.length;i++){
    console.log(arr[i].toString())
}
```
这里的代码会报错
```
Cannot read property 'toString' of undefined
```
意思是`undefined`的`property`属性不能读取。因为在这里`arr[arr.length] === undefined`, `arr`的索引最大值永远都是`arr.length-1`,达不到`length`

### 删除数组的元素
#### 语法
1. 方法一：`delete`命令行
这种方法会留下一个`empty`占据位置，该数组长度不变
```
let arr = ['a','b','c']
delete arr[0]
arr
// [empty,'b','c']
```
2. 方法二： 修改`length`
通过修改长度属性，来达到删除该数组元素的目的
```
let arr = ['a','b','c']
arr.length = 1
arr
// ['a']
```
3. 方法三：`shift`命令
删除该数组头部的元素，长度也会随之更新
```
let arr = ['a','b','c']
arr.shift()
arr
// ['b','c']
```
4. 方法四：`pop`命令
删除该数组尾部的元素，长度也会随之更新
```
let arr = ['a','b','c']
arr.pop()
arr
// ['a','b']
```
5. 方法五：`splice`命令
通过使用`splice(index,个数,插入元素)`方法来删除元素,长度也会随之更新
```
let arr = ['a','b','c','d','e']

arr.splice(2,1)
arr
// ['a','b','d','e']

arr.splice(2,1,'x')
arr
// ['a','b','x','d','e']

arr.splice(2,1,'x','y')
arr
// ['a','b','x','y','d','e']
```
#### 注意事项
* 使用`delete`删除某个元素，该数组的长度不变
* 如果删除所有元素，长度不变，则称为'稀疏数组'
* 不推荐使用`delete`和修改`length`来删除元素，容易引起`Bug`
* 推荐使用`splice`方法

### 增加数组的元素
1. 方法一：`push`命令
通过使用`push()`方法在数组尾部添加元素，修改数组，返回新的长度
```
let arr = [1,2,3,4]
arr.push('a','b')
arr
// [1,2,3,4,'a','b']
```
2. 方法二：`unshift`命令
通过使用`unshift()`方法在数组头部添加元素，修改数组，返回新的长度
```
let arr = [1,2,3,4]
arr.unshift('a','b')
arr
// ['a','b'1,2,3,4]
```
3. 方法三：`splice`命令
通过使用`splice(index,个数,插入元素)`方法来添加元素,长度也会随之更新
```
let arr = ['a','b','c','d','e']

arr.splice(2,0,x)
arr
// ['a','b','x','c','d','e']

arr.splice(2,0,'x','y')
arr
// ['a','b','x','y','c','d','e']
```

### 修改数组中的元素
#### 语法
1. `reverse`命令
通过`reverse()`方法来颠倒数组中元素的顺序，该方法会改变原来的数组，而不会创建新的数组。
```
let arr = [1,2,3,4,5,6,7,8]
arr.reverse()
arr
// 8
// 7
// 6
// 5
// 4
// 3
// 2
// 1
```
2. `sort`命令
通过`sort()`方法来对数组的元素进行排序，数组在原数组上进行排序，不会创建新的数组
```
let arr = [5,1,3,4,2]
arr.sort(function(m,n){
  if (m < n) {
    return -1
}else if (m > n){
    return 1
}else 
    return 0
 })
//或者使用ES 6语法
arr
arr.sort(()=>{a-b})
// 1
// 2
// 3
// 4
// 5
```
### 数组的变换
1. `map`命令
`map()`方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
```
let arr = [1,2,3,4,5]
arr.map((item)=>{
  return item*item
})
arr
// 1
// 4
// 9
// 16
// 25
```
2. `filter`命令
`filter()`方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
```
let arr = [1,2,3,4,5]
arr.filter((item)=>{
   return item%2 ===0
})
arr
// 2
// 4
```
3. `reduce`命令
`reduce()`方法对数组中的每个元素执行一个由您提供的`reducer`函数(升序执行)，将其结果汇总为单个返回值。
```
let arr = [1,2,3,4,5]
arr.reduce((sum,item)=>{
    return sum+item
},0)
arr
// 15
```
### 练习题目
1. 第一题：把数字变成星期
```
let arr = [0,1,2,2,3,3,3,4,4,4,4,6];
let arr =arr.map(??);
console.log(arr2)
// ['周日'，'周一'，'周二'，'周二'，'周三','周三','周三',周四','周四','周四','周四',周六']
```
答案为：
```
let arr = [0,1,2,2,3,3,3,4,4,4,4,6]
let arr2 = arr.map((item)=>{
  let week =['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  item=week[item]
  return item 
})
console.log(arr2) // ['周日', '周一', '周二', '周二', '周三', '周三', '周三', '周四', '周四', '周四', '周四','周六']
```
2. 第二题：找到所有大于`60`分的成绩
```
let scores = [95,91,59,55,42,82,72,85,67,66,55,91];
let scores2 = scores.filter(??)
console.log(scores2)
// [95,91,82,72,85,67,66,91]
```
答案为：
```
let scores = [95,91,59,55,42,82,72,85,67,66,55,91]
let scores2 = scores.filter((item)=>{
  return item > 60
})
console.log(scores2) //  [95,91,82,72,85,67,66, 91]
```
3. 第三题：算出所有数组的和
```
let scores = [95,91,59,55,42,82,72,85,67,66,55,91];
let sum = scores.reduce(()=>{??},0);
console.log(sum)
// 奇数之和：598
```
答案为：
```
let scores = [95,91,59,55,42,82,72,85,67,66,55,91]
let sum = scores.reduce((sum, n)=>{
 return n%2===1?sum+n:sum+0
},0)
console.log(sum) // 奇数之和：598 
```
#### 面试题
```
let arr = [
{名称：'动物', id: 1, parent: null},
{名称：'狗', id: 2, parent: 1},
{名称：'猫', id: 3, parent: 1},
]
// 请将以上数组转化为以下对象
{
    id:1,
    名称:'动物',
    children:[
      { id: 2, 名称：'狗', children: null},
      { id: 3, 名称：'猫', children: null},
    ]
}
```
答案为:
```
arr.reduce((result,item)=>{
   if(item.parent === null){
       result.id = item.id;
       result['名称'] = item['名称']
   }else{
       result.children.push[item];
       delete item.parent;
       item.parent = null;
   }
   return result
},{id:null,childen:[]})
```

### 更多信息
>[网道 JS数组](https://wangdoc.com/javascript/types/array.html)

>[浅拷贝和深拷贝](https://www.jianshu.com/p/1c142ec2ca45a)