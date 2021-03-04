'use strict';

/*****************Native Reduce*********************/
Array.prototype.myReduce = function (callback, initialValue)  {
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
const total = arr.myReduce((prev, cur)=>{
    return prev + cur
}, 10)
console.log(total)

/*****************Native ForEach*********************/
Array.prototype.myForEach = function (callback)  {
    for (let i = 0; i < this.length; i ++) {
        callback(this[i], i, this)
    }
}
// let test it
const arr1 = ['hello', 'world']
arr1.myForEach((cur, index)=> {
    console.log('cur', cur)
})

/*****************Native Map*********************/
Array.prototype.myMap = function (callback)  {
    const emptyArr = []
    for ( let i = 0; i < this.length; i++) {
        emptyArr.push(callback(this[i], i , this))
    }
    return emptyArr
}
// let test it
const arr2 = ['g', 'o', 'l', 'f']
const result = arr2.myMap((cur)=>{
    return cur
})
console.log('result', result)

/*****************Native Filter*********************/
Array.prototype.myFilter = function (callback, context) {
    const returnArr = []
    for ( let i = 0; i < this.length; i++) {
        if(callback.call(context, this[i], i, this)) {
            returnArr.push(this[i])
        }
    }
    return returnArr
}
// let test it
const arr3 = [10, 20, 30, 40, 50]
const newResult = arr3.myFilter((item)=>{
    return item > 30
})
console.log('result', newResult)

/*****************Native Every*********************/
Array.prototype.myEvery = function (callback,context) {
    for (let i = 0; i < this.length; i ++) {
        if(!callback.call(context, this[i], i, this)) {
            return  false
        }
    }
    return  true
}
// let test it
const numberArr = [ -1, 2, -1, -3, 6]
const checkRes = numberArr.myEvery((cur)=> {
    return cur > 0
})
console.log('result', checkRes)

/*****************Native Some*********************/
Array.prototype.myEvery = function (callback,context) {
    for (let i = 0; i < this.length; i ++) {
        if(callback.call(context, this[i], i, this)) {
            return  true
        }
    }
    return  false
}
// let test it
const testArr = ['ab', 'cd', 'ef', 'gh']
const resultRes = testArr.myEvery((cur)=> {
    return cur === 'ab'
})
console.log('result', resultRes)
