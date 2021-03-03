## 目录
0. [介绍Reduce函数](#介绍Reduce函数)
1. [获取对象属性之和](#获取对象属性之和)
2. [按比例获取属性之和](#按比例获取属性之和)
3. [获取字符出现的次数](#获取字符出现的次数)
4. [数组去重](#数组去重)
5. [将二维数组转为一维](#将二维数组转为一维)
6. [将多维数据转为一维](#将多维数据转为一维)
7. [找到最大值](#找到最大值)
8. [链式调用promise](#链式调用promise)

### 介绍Reduce函数
`reduce`为数组中的每一个元素依次执行`callback`函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：

* `accumulator` 累计器
* `currentValue` 当前值
* `currentIndex` 当前索引
* `array` 数组

回调函数第一次执行时，`accumulator` 和`currentValue`的取值有两种情况：如果调用`reduce()`时提供了`initialValue`，`accumulator`取值为`initialValue`，`currentValue`取数组中的第一个值；如果没有提供`initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。

注意：如果没有提供`initialValue`，`reduce`会从索引1的地方开始执行`callback`方法，跳过第一个索引。如果提供`initialValue`，从索引0开始。

### 获取对象属性之和
```
const data = [
    { times: 2, round: 3 },
    { times: 1, round: 4 },
    { times: 6, round: 8 },
]

// 方法1，先算单项，再合并
const keys = Object.keys(data[0])
const sum = {}
keys.forEach((item) => {
    const subSum = data.reduce((prev, cur)=> {
       return prev + cur[item] 
    }, 0)
    sum[item] = subSum
})
console.log('sum', sum)

// 方法2，先给初始值，再累加
const result = data.reduce((prev, cur) => {
  for (const i in cur) {
    if (!prev[i]) {
      prev[i] = 0
    }
    prev[i] += cur[i]
  }
  return prev
}, {})
console.log('result', result)
```
### 按比例获取属性之和
```
const data = [
  {
    subject: 'math',
    score: 88
  },
  {
    subject: 'chinese',
    score: 95
  },
  {
    subject: 'english',
    score: 80
  }
] 

const proportion = {
    math: 0.5,
    chinese: 0.3,
    english: 0.2
}

const result = data.reduce((prev, cur) => {
  return prev + cur['score'] * proportion[cur['subject']]
}, 0)
console.log('result', result)
```
### 获取字符出现的次数
```
const arrStr = 'abcdaabc';

const result = arrStr.split('').reduce((prev, cur)=>{
    prev[cur] ? prev[cur]++ : prev[cur] = 1
    return prev
}, {})

console.log('result', result)
```
### 数组去重
```
const arr = [1,2,4,4,1]

const result = arr.reduce((prev, cur)=>{
    if(Array.isArray(prev) && !prev.includes(cur)) {
        prev.push(cur)
    }
    return prev
}, [])

console.log('result', result)
```
### 将二维数组转为一维
```
const data = [[0, 1], [2, 3], [4, 5]]

const result = data.reduce((prev, cur)=>{
    if (Array.isArray(prev)) {
        return prev.concat(cur)
    }
}, [])

console.log('result', result)
```
### 将多维数据转为一维
```
const data = [[0, 1], [2, 3], [4, [5, 6, 7]]]

// 方法1， 遍历
const result = data.reduce((prev, cur)=> {
    if (Array.isArray(prev)) {
        for (const i of cur) {
            if (Array.isArray(i)) {
                prev = prev.concat(i)
            } else {
                prev.push(i)
            }
        }
    }
    return prev
}, [])

console.log('result', result)

// 方法2，递归
const newArr = (arr) => {
   return arr.reduce((pre,cur)=>
    pre.concat(Array.isArray(cur)?newArr(cur):cur)
,[])}
console.log(newArr(data))
```
### 找到最大值
```
const dates = [
  '2019/06/01',
  '2018/06/01',
  '2019/09/01', 
  '2018/09/01'
].map(v => new Date(v));

const result = dates.reduce((prev, cur)=> {
    return prev > cur ? prev : cur
}, dates[0])

console.log('result', result)
```
### 链式调用promise
```
const functions = [
  async function() { return 1; },
  async function() { return 2; },
  async function() { return 3; }
]

const result = await functions.reduce((promise, fn)=> {
    return promise.then(fn)
}, Promise.resolve())

console.log('result', result)
```

