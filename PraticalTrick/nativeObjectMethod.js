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
console.log(Object.myAssgin({ a: '123' }, { b: '345' }))

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
    return x !== 0 || 1 / x === 1 / y
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
