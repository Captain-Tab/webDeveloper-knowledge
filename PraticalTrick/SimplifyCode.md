## 目录
1. [嵌套层级优化](#嵌套层级优化)
2. [多条件分支的优化处理](#多条件分支的优化处理)
3. [使用数组新特性简化逻辑判断](#使用数组新特性简化逻辑判断)
4. [函数默认值](#函数默认值)
5. [更多信息](#更多信息)

### 嵌套层级优化
```
function supply(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  // 条件 1: 水果存在
  if (fruit) {
    // 条件 2: 属于红色水果
    if (redFruits.includes(fruit)) {
      console.log('红色水果');
      // 条件 3: 水果数量大于 10 个
      if (quantity > 10) {
        console.log('数量大于 10 个');
      }
    }
  } else {
    throw new Error('没有水果啦!');
  }
}
```
在这里我们可以提前`return`掉无效条件，减少`if-else`的多层嵌套
```
function supply(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if (!fruit) throw new Error('没有水果啦'); // 条件 1: 当 fruit 无效时，提前处理错误
  if (!redFruits.includes(fruit)) return; // 条件 2: 当不是红色水果时，提前 return
  
  console.log('红色水果');
  
  // 条件 3: 水果数量大于 10 个
  if (quantity > 10) {
    console.log('数量大于 10 个');
  }
}
```
### 多条件分支的优化处理
根据数据进行逻辑判断的时候，我们会使用`if else`
```
function pick(color) {
  // 根据颜色选择水果
  if(color === 'red') {
      return ['apple', 'strawberry']; 
  } else if (color === 'yellow') {
      return ['banana', 'pineapple'];
  } else if (color === 'purple') {
      return ['grape', 'plum'];
  } else {
      return [];
  }
}
```
这里可以使用`switch`对枚举逻辑进行简化
```
function pick(color) {
  // 根据颜色选择水果
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}
```
通过对象的`key:value`的结构，我们可以自将`key`作为索引来获取对应的信息
```
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum'],
};
function pick(color) {
  return fruitColor[color] || [];
}
```
也可以使用`Map`的数据结构，实现真正的`key:value`的结构
```
const fruitColor = new Map()
.set('red', ['apple', 'strawberry'])
.set('yellow', ['banana', 'pineapple'])
.set('purple', ['grape', 'plum']);

function pick(color) {
  return fruitColor.get(color) || [];
}
```
除了上面的这些写法，还可以通过更多语义化的方法定义对象
```
const fruits = [
  { name: 'apple', color: 'red' }, 
  { name: 'strawberry', color: 'red' }, 
  { name: 'banana', color: 'yellow' }, 
  { name: 'pineapple', color: 'yellow' }, 
  { name: 'grape', color: 'purple' }, 
  { name: 'plum', color: 'purple' }
];

function pick(color) {
  return fruits.filter(f => f.color === color);
}
```
### 使用数组新特性简化逻辑判断
* 多条件判断

多个条件的判断下，下面的代码是比较通常的写法
```
function judge(fruit) {
  if (fruit === 'apple' || fruit === 'strawberry' || fruit === 'cherry' || fruit === 'cranberries' ) {
    console.log('red');
  }
}
```
但是如果使用`ES 6`中的`Array.includes`，代码会精简很多
```
// 将判断条件抽取成一个数组
const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
function judge(fruit) {
  if (redFruits.includes(fruit)) {
      console.log('red');
   }
}
```
* 判断数组中是否所有项都满足某条件
```
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function match() {
  let isAllRed = true;

  // 判断条件：所有的水果都必须是红色
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color === 'red');
  }

  console.log(isAllRed); // false
}
```
可以使用`Array.every`方法来实现这个逻辑, 但是请注意，空数组调用该方法会返回`true`
```
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function match() {
  // 条件：所有水果都必须是红色
  const isAllRed = fruits.every(f => f.color === 'red');

  console.log(isAllRed); // false
}
```
* 判断数组中是否有某一项满足条件

使用`Array.some`可以判断数组的某些游戏是否有的满足条件
```
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

// 条件：是否有红色水果 
const isAnyRed = fruits.some(f => f.color == 'red');
```
