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
    console.log(this)
  }
  return this
}
console.log('result', [3,2,3].myReverse())


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


/*****************Native Slice*********************/
Array.prototype.mySlice = function (start, length, ...values) {
    length = start + length > this.length - 1 ? this.length - start : length
    const res = [], tempArr = [...this]
    for (let i = start; i < start + values.length; i++) {
        this[i] = values[i - start]
    }
    if (values.length < length) {
        const cha = length - values.length
        for (let i = start + values.length; i < tempArr.length; i++) {
            this[i] = tempArr[i + cha]
        }
        this.length = this.length - cha
    }
    if (values.length > length) {
        for (let i = start + length; i < tempArr.length; i++) {
            this.push(tempArr[i])
        }
    }
    for (let i = start; i < start + length; i++) {
        res.push(tempArr[i])
    }
    return res
}
const arr = [1, 2, 3, 4, 5]
console.log(arr.mySlice(2))