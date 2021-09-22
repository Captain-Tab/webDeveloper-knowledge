/**
 * using strategy pattern to deal with user authority 
 */

// authority list
const rolesList = ['leader', 'member']

// define the strategies
const strategies = {
  checkUserType: (value)=> {
    return value === 'tencent'
  },
  checkCredit: (value)=> {
    return value >= 1
  },
  checkRole: (value)=> {
    return rolesList.includes(value)
  }
}

// create a validator
const Validator = function () {
  this.cache = []

  // add strategy
  this.add = function(value, method) {
    this.cache.push(function() {
      return strategies[method](value)
    })
  }

  // check result
  this.check = function() {
    for(let i = 0; i < this.cache.length; i++) {
      let strategyFun = this.cache[i]
      const result = strategyFun()
      if(!result) {
        return false
      }
    }
    return true
  }
}

// check user authority with user A
const checkAuthorityA = function (userInfo) {
  const validator = new Validator()
  validator.add(userInfo.role, 'checkRole')
  validator.add(userInfo.credit, 'checkCredit')
  return validator.check()
}

// print out the first result
const resultA = checkAuthorityA({
  role: 'leader',
  credit: '999'
})
console.log(`resultA is ${resultA}`)

// check user authority with user B
const checkAuthorityB = function (userInfo) {
  const validator = new Validator()
  validator.add(userInfo.role, 'checkRole')
  validator.add(userInfo.credit, 'checkCredit')
  return validator.check()
}

// print out the second result
const resultB = checkAuthorityB({
  role: 'users',
  credit: '0'
})
console.log(`resultB is ${resultB}`)