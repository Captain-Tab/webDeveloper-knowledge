'use strict'

/***
 *  getType
 *  The function will returns a type after evaluating
 *  **/
const getType = (info) => {
    const typeMap = {
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Number]": "number",
        "[object Boolean]": "boolean",
        "[object String]": "string",
        "[object Symbol]": 'symbol',
        "[object Set]": 'set'
    }
    return typeMap[info] ? typeMap[info] : typeof (info)
}
// let's test it
console.log(getType())
console.log(getType('2'))
console.log(getType({}))

/***
 *  isObject
 *  The function will returns a boolean after checking if it's object type
 *  **/
const isObject = (info) => {
   return getType(info) === 'object'
}

// let's test it
console.log(isObject(undefined))
console.log(isObject({}))
