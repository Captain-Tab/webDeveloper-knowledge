'use strict';

/*** Array ***/

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
    for(let i = start; i < this.length; i++) {
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
Array.prototype.myMap = function (callback)  {
    const emptyArr = []
    for ( let i = 0; i < this.length; i++) {
        emptyArr.push(callback(this[i], i , this))
    }
    return emptyArr
}

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
            return false
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
Array.prototype.mySome = function (callback,context) {
    for (let i = 0; i < this.length; i ++) {
        if(callback.call(context, this[i], i, this)) {
            return  true
        }
    }
    return  false
}
// let test it
const testArr = ['ab', 'cd', 'ef', 'gh']
const resultRes = testArr.mySome((cur)=> {
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

/*** Ojbect ***/
/*****************Native Assign*********************/
Object.prototype.myAssgin = function (target, ...source) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    let result = Object(target)
    source.forEach(function (obj) {
        if (obj != null) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result[key] = obj[key]
                }
            }
        }
    })
    return result
}
console.log(Object.myAssgin({a: '123'}, {b: '345'}))

/*****************Native Entries*********************/
Object.prototype.myEntries = function (obj) {
    const res = []
    for (let key in obj) {
        obj.hasOwnProperty(key) && res.push([key, obj[key]])
    }
    return res
}
const obj = {
    name: 'tab',
    age: 22,
    gender: 'man'
}
const result = Object.myEntries(obj)
console.log('result', result)

/*****************Native fromEntries*********************/
Object.prototype.myFromEntries = function (arr) {
    const obj = {}
    for (let i = 0; i < arr.length; i++) {
        console.log('tes', arr[i])
        const [key, value] = arr[i]
        obj[key] = value
    }
    return obj
}
const arr = [
    ['name', 'tab'],
    ['age', 22],
    ['gender', 'man']
]
const result = Object.myFromEntries(arr)
console.log('result', result)

/*****************Native Key*********************/
Object.prototype.myKeys = function (obj) {
    const arr = []
    for (let key in obj) {
        obj.hasOwnProperty(key) && arr.push(key)
    }
    return arr
}
const obj = {
    name: 'tab',
    age: 22,
    gender: 'man'
}
const result = Object.myKeys(obj)
console.log('result', result)

/*****************Native Values*********************/
Object.prototype.myValues = function (obj) {
    const arr = []
    for (let key in obj) {
        obj.hasOwnProperty(key) && arr.push(obj[key])
    }
    return arr
}
const obj = {
    name: 'tab',
    age: 22,
    gender: 'man'
}
const result = Object.myValues(obj)
console.log('result', result)

/*****************Native Create*********************/
Object.prototype.myCreate = function (proto, propertyObject = undefined) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object or null.')
        if (propertyObject == null) {
            new TypeError('Cannot convert undefined or null to object')
        }
        function F() { }
        F.prototype = proto
        const obj = new F()
        if (propertyObject != undefined) {
            Object.defineProperties(obj, propertyObject)
        }
        if (proto === null) {
            // 创建一个没有原型对象的对象，Object.create(null)
            obj.__proto__ = null
        }
        return obj
    }
}

/*****************Native InstanceOf*********************/
function myInstanceOf(father, child) {
    const fp = father.prototype
    let cp = child.__proto__

    while (cp) {
        if (cp === fp) {
            return true
        }
        cp = cp.__proto__
    }
    return false
}

function Person(name) {
    this.name = name
}
const tab = new Person('tab')
const result = myInstanceOf(Person, tab)
console.log('result', result)

/*****************Native is*********************/
/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 * 
 * This is not the same as being equal according to the == operator.The == operator applies various coercions to both sides(if they are not the same Type) before testing for equality(resulting in such behavior as "" == false being true), but Object.is doesn't coerce either value.
 * This is also not the same as being equal according to the === operator.The only difference between Object.is() and === is in their treatment of signed zeroes and NaNs.For example, the === operator(and the == operator) treats the number values - 0 and + 0 as equal.Also, the === operator treats Number.NaN and NaN as not equal.
 */
Object.prototype.myIs = function (x, y) {
    if (x === y) {
        // prevent -0 equal to + 0
        return x !== 0 || 1/ x === 1/ y
    }

    // prevent Number.NaN is not equalt to NaN
    return x !== x && y !== y
}

const a = { name: 'tab' }
const b = a
const c = { name: 'sophia' }

console.log(Object.myIs(a, b))
console.log(Object.myIs(a, c))


/*** Function ***/

/*****************Native Call*********************/
// 1. if the target is undefined, assign window to newObj, otherwise assign to newObj
// 2. 'this' point to newObj
// 3. find the rest parameters
// 4. get the result after executing the function
// 5. remove the function
// 6. return the result

Function.prototype.myCall = function (context, ...parameter) {
    if (typeof this !== 'function') {
        throw new Error(`${this}.myCall is not a function`)
    }
    const newObj = context ? context : window
    let fnSymbol = Symbol()
    newObj[fnSymbol] = this
    const result = newObj[fnSymbol](...parameter)
    delete newObj[fnSymbol]
    return result
}
// let test it
function testFunc() {
    console.log(this.name)
}
const obj = {
    name: 'Tab'
}
testFunc.myCall(obj)

/*****************Native Apply*********************/
Function.prototype.myApply = function (context, ...parameter) {
    if (typeof this !== 'function') {
        throw new Error(`${this}.myApply is not  a function`)
    }
    let newObj
    if (typeof context === 'object') {
        newObj = context || window
    } else {
        newObj = Object.create(null)
    }
    let fnSymbol = Symbol()
    newObj[fnSymbol] = this
    newObj[fnSymbol](...parameter)
    delete newObj[fnSymbol]
}
// let test it
let array = ['a', 'b']
let elements = [0, 1, 2]
array.push.myApply(array, elements)
console.info(array)

/*****************Native Bind*********************/
Function.prototype.myBind = function (context, ...parameter) {
    let _this = this
    let temp = function () { }
    let bindFunc = function (...finallyParams) {
        return _this.call(this instanceof temp ? this : context, ...parameter, ...finallyParams)
    }
    temp.prototype = this.prototype
    bindFunc.prototype = new temp()
    return bindFunc
}
// let test it
let person = {
    name: 'Abel'
}
function sayHi(age, sex) {
    this.age = age
    console.log(age, this.name, sex)
}
sayHi.prototype.money = 12

const boundFunc = sayHi.bind(person, 12, 'man')
const newObj = new boundFunc()
console.log('newObj', newObj)

/*****************Native New*********************/
// 1. receive a Constructor function
// 2. create a new Object
// 3. new Object connect the prototype from Constructor's prototype
// 4. direct the point of this to new Objet
// 5. return new object
function myNew(constructor, ...parameter) {
    if (typeof constructor !== 'function') {
        throw new Error(`myNew function the first param must be a function`)
    }
    const newObj = Object.create(constructor.prototype)
    const result = constructor.call(newObj, ...parameter)
    if (result !== null && typeof result === 'object') {
        return result
    }
    return newObj
}
// let test it
function Test(name) {
    this.name = name
}
const newOb = myNew(Test, 'tab')
console.log('newOb', newOb)

/*** String ***/

/*****************Native slice*********************/
String.prototype.mySlice = function (start = 0, end) {
    start = start < 0 ? this.length + start : start
    end = !end && end !== 0 ? this.length : end

    if (start >= end) return ''
    let str = ''
    for (let i = start; i < end; i++) {
        str += this[i]
    }

    return str
}
console.log('result', '12345'.mySlice(2))

/*****************Native substr*********************/
String.prototype.mySubstr = function (start = 0, length) {
    if (length < 0) return ''

    start = start < 0 ? this.length + start : start
    length = (!length && length !== 0) || length > this.length - start ? this.length : start + length

    let str = ''
    for (let i = start; i < length; i++) {
        str += this[i]
    }
    return str
}
console.log('result', '1234567'.mySubstr(2))

/*****************Native substr*********************/
String.prototype.mySubstring = function (start = 0, end) {
    start = start < 0 ? this.length + start : start
    end = !end && end !== 0 ? this.length : end

    if (start >= end) [start, end] = [end, start]
    let str = ''
    for (let i = start; i < end; i++) {
        str += this[i]
    }

    return str
}
console.log('result', '123456789'.mySubstring(6))
