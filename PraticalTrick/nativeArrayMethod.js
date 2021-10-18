'use strict';

/*****************Native Pop*********************/
Array.prototype.myPop = function () {
  let arr = this
  const returnValue = arr[arr.length - 1]
  arr.length--
  return returnValue
}

const arr = [1, 2]
console.log(arr.myPop(), arr)


/*****************Native Push*********************/
Array.prototype.myPush = function (...args) {
  let arr = this
  for (let el of args) {
    arr[arr.length] = el
  }
  return arr.length
}

const arr = [1, 2, 3]
arr.myPush(4, 5)


/*****************Native Shift*********************/
Array.prototype.myShift = function () {
  let arr = this
  const returnValue = arr[0]
  for (let i = 1; i < arr.length; i++) {
    arr[i-1] = arr[i]
  }
  arr.length--
  return returnValue
}

const arr = [1, 2]
console.log(arr.myShift(), arr)

/*****************Native Unshift*********************/
Array.prototype.myUnshift = function (...args) {
  //创建一个新数组接收添加的元素
  const len = args.length
  for (let i = this.length + len - 1; i >= len; i--) {
    this[i] = this[i - 1];
  }
  for (const index in args) {
    this[index] = args[index];
  }
  return this.length;
}

let arr = [3, 4, 5]
console.log(arr.myUnshift(1, 2), arr)

/*****************Native Reverse*********************/
Array.prototype.myReverse = function () {
  let k = this.length - 1
  for (let i = 0; i < Math.floor(this.length / 2); i++) {
    let temp = this[i]
    this[i] = this[k]
    this[k--] = temp
  }
  return this
}
console.log('result', [1, 2, 3].myReverse())

/*****************Native Sort*********************/

// sort 不接受参数或者接受的参数为 undefined 时，默认的排序规则是：将每个元素转化为字符串，再将它们按照 Unicode 编码从小到大排序。其中，null 会转化为 "null"，undefined 固定排在数组最后
// sort 接受参数且为排序函数的时候，按照排序函数的规则排序：若函数返回值为负数，则第一个参数排在第二个参数前面，若为正数，则在它后面，若为 0 则位置不变
Array.prototype.mySort = function (...args) {
  if (typeof args[0] !== 'function' && typeof args[0] !== 'undefined') {
    throw new TypeError("The argument must be undefined or a function")
  }
  let arr = this
  const shouldBefore = (x, y) => {
    // if arguments come wth no paramerter or it's undefined
    if (args.length === 0 || args.length !== 0 && typeof args[0] === 'undefined') {
      return String(x) < String(y)
    } else {
      let fn = args[0]
      return fn(x, y) < 0 ? true: false
    }
  }
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++){
      if (shouldBefore(arr[j + 1], arr[j])) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
const arr = [1, 2, 5, 10]
// compare eache unicode of each item
arr.mySort()                  // [1,10,2,5]
// sort the order from small to bigger
arr.mySort((a, b) => a < b ? -1 : a > b ? 1 : 0)     // [1,2,5,10]
arr.mySort((a, b) => a - b)                // [1,2,5,10]
// sort order from bigger to small
arr.mySort((a, b) => a > b ? -1 : a < b ? 1 : 0)

/*****************Native Splice*********************/

//* 接受三个参数：开始操作的位置 start、删除的元素个数num ，以及添加的元素 item1、item2、...
//* start 可以是正数或者负数。如果是正数且超过数组长度，则无视删除操作，直接把需要添加的元素添加到数组末尾；如果是负数，且负数绝对值小于数组长度，则将负数与长度相加作为 start，否则将 0 作为 start
//* num 可以是正数或者负数。如果没有传 num，或者 num 是正数且超过 start 往后的元素个数（包含 start），则将 start 和它后面所有元素删除；如果 num 是 0 或者负数，则不删除任何元素
//* 这个方法会修改到原数组，且最终返回一个包含被删除元素的数组，或者空数组
Array.prototype.mySplice = function (...args) {
  let arr = this
  let len = arr.length
  let res = []

  const computeStart = (start) => {
    return start >= 0 ? start : Math.abs(start) < len ? start + len : 0
  }

  const computeDeleteNum = (args, start) => {
    return args.length < 2 ?
      len - start : args[1] > 0 ? Math.min(args[1], len - start) : 0
  }

  const sliceArray = (arr, separator) => {
    let arr1 = [], arr2 = []
    for (let i = 0; i < arr.length; i++) {
      i < separator ? arr1.push(arr[i]) : arr2.push(arr[i])
    }
    // clear the original arrary 
    arr.length = 0
    return [arr1, arr2]
  }

  const pushToArray = (array) => {
    for (let i = 2; i < args.length; i++) {
      array.push(args[i])
    }
  }

  if (len > 0) {
    let start = computeStart(args[0])
    let deleteNum = computeDeleteNum(args, start)
    if (start >= len) {
      args > 2 && pushToArray(arr)
    } else {
      let [arr1, arr2] = sliceArray(arr, start)
      // delete item
      if (deleteNum !== 0) {
        for (let i = 0; i < deleteNum; i++) {
          res.push(arr2.shift())
        }
      }
      // add item
      if (args.length > 2) {
        pushToArray(arr1)
      }
      const temArr = [...arr1, ...arr2]
      for (let el of temArr) {
        arr.push(el)
      }
    }
  }
  return res
}

const arrTest = [1, 2, 3, 4, 5]
// 删除：在索引1这里操作，删除2个元素
const arr1 = arrTest.mySplice(1, 2)                 // 返回 [2,3]，arr 变成 [1,4,5]
console.log(arr, ar1)
// 添加：在索引1这里操作，删除0个元素，添加2个元素（注意是插入到索引1前面，不是后面）
const arr2 = arr.mySplice(1, 0, "a", "b")          // 返回 []，arr 变成 [1,"a","b",2,3,4,5]

// 替换：删除+添加就是替换
const arr3 = arr.mySplice(1, 2, "a", "b")

/*****************Native copyWidthin*********************/
Array.prototype.myCopyWithin = function (target = 0, begin = 0, end = this.length) {
  let arr = this
  let len = arr.length
  let copyArr = []
  let m = 0, n = 0
  target = target >= 0 ? target : Math.abs(target) < len ? target + len : 0
  begin = begin >= 0 ? begin : Math.abs(begin) < len ? begin + len : 0
  end = end >= 0 ? Math.min(end, len) : Math.abs(end) < len ? end + len : end
  // 把需要复制的元素放到 copyArr 数组中
  for (; begin < end; begin++) {
    copyArr[m++] = arr[begin]
  }
  let _len = copyArr.length < len - target ? target + copyArr.length : len
  // 用 copyArr 数组从 target 开始覆盖原数组
  for (; target < _len; target++) {
    arr[target] = copyArr[n++]
  }
  return arr
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
arr.myCopyWithin(4)                   // [0,1,2,3,0,1,2,3,4]   缺省范围为整个数组
arr.myCopyWithin(4, 7)                 // [0,1,2,3,7,8,6,7,8]
arr.myCopyWithin(4, 6, 9)

/*****************Native toString *********************/
Array.prototype.myToString = function () {
  let arr = this
  let str = ""
  for (x of arr) {
    x = typeof (x) === 'undefined' || x === null ? "" : x
    str += `${x.toString()},`
  }
  return str.slice(0, str.length - 1)
}
[1, 2, 3].myToString()              // "1,2,3"
[{ a: 1 }, { b: 2 }].myToString()        // "[obejct Object],[object Object]"

/*****************Native concat *********************/
Array.prototype.myConcat = function (...args) {
  let arr = this
  let res = []
  let k = 0
  const isArrayLike = obj => {
    if (typeof o === 'object' &&
      isFinite(o.length) &&
      o.length >= 0 &&
      o.length === Math.floor(o.length) &&
      o.length < 4294967296)
      return true
    else
      return false
  }
  for (let el of arr) {
    res[k++] = el
  }
  for (let el of args) {
    // 如果是数组且没有禁止展开
    if (Array.isArray(el) && el[Symbol.isConcatSpreadable] != false) {
      for (let _el of el) {
        res[k++] = _el
      }
    } else {
      // 如果是类数组且允许展开
      if (isArrayLike(el) && el[Symbol.isConcatSpreadable]) {
        for (let key in el) {
          // 把除了 length 之外的键值都放入新数组中
          if (key !== 'length') {
            res[k++] = el[key]
          }
        }
      } else {
        res[k++] = y
      }
    }
  }
  return res
}

/*****************Native Reduce*********************/
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue ? initialValue : undefined
  for (let i = 0; i < this.length; i++) {
    if (accumulator) {
      accumulator = callback.call(undefined, accumulator, this[i], i, this);
    } else {
      accumulator = this[i] 
    }
  }
  return accumulator
}

// let test it
const arr = [10, 20, 30, 40]
const total = arr.myReduce((prev, cur) => {
  return prev + cur
}, 10)
console.log(total)

/*****************Native ReduceRight *********************/
Array.prototype.myReduceRight = function (...args) {
  let fn = args[0]
  let arr = this
  let len = arr.length
  let index = len - 1, acc
  if (typeof fn != 'function') {
    throw new TypeError(`${fn} is not function`)
  }
  if (args.length >= 2) {
    acc = args[1]
  } else {
    while (index > 0 && !(index in arr)) {
      index--
    }
    if (index == 0) {
      throw new TypeError('Reduce of empty array with no initical value')
    }
    acc = arr[index--]
    for (; index >= 0; index--) {
      if (index in arr) {
        acc = fn(acc, arr[index], index, arr)
      }
    }
    return acc
  }
}
/*****************Native ForEach*********************/
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this)
  }
}
// let test it
const arr1 = ['hello', 'world']
arr1.myForEach((cur, index) => {
  console.log('cur', cur)
})

/*****************Native IndexoF*********************/
Array.prototype.myIndexOf = function (target, start = 0) {
  let arr = this
  let len = arr.length
  let _start = start >= 0 ? start : Math.abs(start) <= len ? len + start : 0
  for (; _start < len; _start++) {
    if (arr[_start] === target) {
      return _start
    }
  }
  return -1
}

/*****************Native LastIndexOf*********************/
Array.prototype.myLastIndexOf = function (target, start) {
  let arr = this
  let len = arr.length
  start = start || arr[arr.length - 1]
  let _start = start < 0 ? len + start : start >= len ? arr.length - 1 : start
  for (; _start > 0; _start--) {
    if (arr[_start] === target) {
      return _start
    }
  }
  return -1
}

/*****************Native FindIndex*********************/
Array.prototype.myFindIndex = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return i
    }
  }
  return -1
}
// let test it
const findArr = ['apple', 'banana']
const result = findArr.myFindIndex(item => item === 'apple')

/*****************Native Find*********************/
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return i
    }
  }
  return undefined
}
// let test it
const findArr = ['cherry', 'date']
const result = findArr.myFind(item => item === 'apple')


/*****************Native Fill*********************/
Array.prototype.myFill = function (value, start = 0, end = this.length) {
  for (let i = start; i < end; i++) {
    this[i] = value
  }
  return this
}
// let test it
const findArr = ['cherry', 'date']
const result = findArr.myFill('piapple', 1, 3)


/*****************Native includes*********************/
Array.prototype.myIncludes = function (value, start = 0) {
  if (start < 0) start = this.length + start
  const isNaN = Number.isNaN(value)
  for (let i = start; i < this.length; i++) {
    if (this[i] === value || (Number.isNaN(this[i]) && Number.isNaN(value))) {
      return true
    }
  }
  return false
}
// let test it
const findArr = ['cherry', 'date']
const result = findArr.myIncludes('cherry')


/*****************Native Map*********************/
Array.prototype.myMap = function (callback) {
  const emptyArr = []
  for (let i = 0; i < this.length; i++) {
    emptyArr.push(callback(this[i], i, this))
  }
  return emptyArr
}

/*****************Native Filter*********************/
Array.prototype.myFilter = function (callback, context) {
  const returnArr = []
  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) {
      returnArr.push(this[i])
    }
  }
  return returnArr
}
// let test it
const arr3 = [10, 20, 30, 40, 50]
const newResult = arr3.myFilter((item) => {
  return item > 30
})
console.log('result', newResult)


/*****************Native Every*********************/
Array.prototype.myEvery = function (callback, context) {
  for (let i = 0; i < this.length; i++) {
    if (!callback.call(context, this[i], i, this)) {
      return false
    }
  }
  return true
}
// let test it
const numberArr = [-1, 2, -1, -3, 6]
const checkRes = numberArr.myEvery((cur) => {
  return cur > 0
})
console.log('result', checkRes)


/*****************Native Some*********************/
Array.prototype.mySome = function (callback, context) {
  for (let i = 0; i < this.length; i++) {
    if (callback.call(context, this[i], i, this)) {
      return true
    }
  }
  return false
}
// let test it
const testArr = ['ab', 'cd', 'ef', 'gh']
const resultRes = testArr.mySome((cur) => {
  return cur === 'ab'
})
console.log('result', resultRes)


/*****************Native Join*********************/
Array.prototype.myJoin = function (splitter = ',') {
  let resultStr = ''
  for (let i = 0; i < this.length; i++) {
    resultStr = i === 0 ? `${this[i]}` : `${resultStr}${splitter}${this[i]}`
  }
  return resultStr
}

const testArr = ['today', 'is', 'Saturaday']
const result = testArr.myJoin('-')
console.log('result', result)


/*****************Native flat*********************/
Array.prototype.myFlat = function () {
  let arr = this
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
    console.log('arr', arr)
  }
  return arr
}

const testArr = [1, [2, 3, [4, 5]], [8, 9]]
const result = testArr.myFlat()
console.log('result', result)

/*****************Native FlatMap*********************/
Array.prototype.myFlatMap = function (fn, thisArg = null) {
  if (typeof fn != 'function') {
    throw new TypeError(`${fn} is not a function`)
  }
  let arr = this
  let newArr = new Array(arr.length)
  let k = 0
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      const res = fn.call(thisArg, arr[i], i, arr)
      if (Array.isArray(res)) {
        for (let el of res) {
          newArr[k++] = el
        }
      } else {
        newArr[k++] = res
      }
    }
  }
  return newArr
}

/*****************Native Slice*********************/
Array.prototype.mySlice = function (begin = 0, end = this.length) {
  let arr = this
  let len = arr.length
  let res = []
  let k = 0
  begin = begin >= 0 ? begin : Math.abs(begin) <= len ? begin + len : 0
  end = end < 0 ? end + len : Math.min(end, len)
  for (; begin < end; begin++) {
    res[k++] = arr[begin]
  }
  return res
}


/*****************Native Array.isArray*********************/
Object.defineProperty(Array, "myIsArray", {
  value: function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  }
})

/*****************Native Array.from*********************/
Object.defineProperty(Array, "myFrom", {
  value: function (toChange, fn, thisArg = null) {
    let res = [...toChange]
    if (typeof fn === 'function') {
      for (let i = 0; i < res.length; i++) {
        res[i] = fn.call(thisArg, res[i], i, res)
      }
    }
    return res
  }
})

/*****************Native Array.of*********************/
Object.defineProperty(Array, "myOf", {
  value: function () {
    let res = []
    for (let i = 0; i < arguments.length; i++) {
      res[i] = arguments[i]
    }
    return res
  }
})

// https://segmentfault.com/a/1190000040138580