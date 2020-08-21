## 目录
1. [嵌套层级优化](#嵌套层级优化)
2. [多条件分支的优化处理](#多条件分支的优化处理)
3. [使用数组新特性简化逻辑判断](#使用数组新特性简化逻辑判断)
4. [函数默认值](#函数默认值)
5. [策略模式](#策略模式)

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
### 函数默认值
* 使用默认参数
```
const buyFruit = (fruit,amount) => {
 if(!fruit){
    return
  }
  amount = amount || 1;
  console.log(amount)
}
```
在这里可以在传输参数的时间设置默认参数, 在这里，只有`fruit`为`undefined`的时候，才有有默认参数
```
const buyFruit = (fruit,amount = 1) => {
 if(!fruit){
        return
  }
  console.log(amount,'amount')
}
```
* 使用解构与默认参数
没有使用解构对象的情况
```
const buyFruit = (fruit,amount) => {
  fruit = fruit || {};
  if(!fruit.name || !fruit.price){
      return;
  }
  ...
  amount = amount || 1;
  console.log(amount)
}
```
使用解构结合默认参数可以简化逻辑
```
const buyFruit = ({ name,price }={},amount) => {
  if(!name || !prices){
    return;
  }
  console.log(amount)
}
```
* 复杂数据解构
在复杂的数据对象下，解构和默认参数会降低代码的可读性
```
const oneComplexObj = {
  firstLevel: {
    secondLevel: [{
      name: '',
      price: '',
    }],
  },
};
```
如果使用解构来获取对象里的值
```
const {
  firstLevel: {
    secondLevel: [{ name, price }] = [],
  } = {},
} = oneComplexObj;
```
可以使用`lodash`库来实现需求
```
import lodashGet from 'lodash/get';

const { name,price } = lodashGet(oneComplexObj,'firstLevel.secondLevel[0]',{});
```
### 策略模式
策略模式：定义一系列的算法，把它们一个个封装起来， 并且使它们可相互替换。

使用场景：策略模式属于对象行为模式，当遇到具有相同行为接口、行为内部不同逻辑实现的实例对象时，可以采用策略模式；或者是一组对象可以根据需要动态的选择几种行为中的某一种时，也可以采用策略模式；这里以第二种情况作为示例：
```
const TYPE = {
  JUICE: 'juice',
  SALAD: 'salad',
  JAM: 'jam',
};
function enjoy({ type = TYPE.JUICE, fruits }) {
  if (!fruits || !fruits.length) {
    console.log('请先采购水果！');
    return;
  }
  if (type === TYPE.JUICE) {
    console.log('榨果汁中...');
    return '果汁';
  }
  if (type === TYPE.SALAD) {
    console.log('做沙拉中...');
    return '拉沙';
  }
  if (type === TYPE.JAM) {
    console.log('做果酱中...');
    return '果酱';
  }
}

enjoy({ type: 'juice', fruits });
```
使用思路：定义策略对象封装不同行为、提供策略选择接口，在不同的规则时调用相应的行为。
```
const TYPE = {
  JUICE: 'juice',
  SALAD: 'salad',
  JAM: 'jam',
};

const strategies = {
  [TYPE.JUICE](fruits) {
    console.log('榨果汁中...');
    return '果汁';
  },
  [TYPE.SALAD](fruits) {
    console.log('做沙拉中...');
    return '沙拉';
  },
  [TYPE.JAM](fruits) {
    console.log('做果酱中...');
    return '果酱';
  },
};

function enjoy({ type = TYPE.JUICE, fruits }) {
  if (!type) {
    console.log('请直接享用！');
    return;
  }
  if (!fruits || !fruits.length) {
    console.log('请先采购水果！');
    return;
  }
  return strategies[type](fruits);
}

enjoy({ type: 'juice', fruits });
```