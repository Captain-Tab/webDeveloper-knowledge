// https://juejin.cn/post/6986409229825343496
// https://zhuanlan.zhihu.com/p/107836267
const collectionTypes = ['*', '+'];

// change reg string to pattern objects and return list
const getPatternObjList = (regStr) => {
  const len = regStr.length
  let patternObjList = []
  let isInCollection = false
  let collection = []
  for (let i = 0; i < len; i++) {
    const char = regStr[i]
    if (!isInCollection) {
      if (char !== '[') {
        // single chat object
        patternObjList.push({
          isInCollection: false,
          pattern: [char],
          next: []
        })
      } else {
        // char === [ we need to change isInCollection to true
        isInCollection = true
      }
    } else {
      if (char !== ']') {
        collection.push(char)
      } else {
        // ] is the sign end of the collection
        isInCollection = false;
        // collectionSign maybe * or + 
        let collectionSign = regStr[i + 1]
        let collectionType = 'COMMON'
        if (collectionSign && collectionTypes.includes(collectionSign)) {
          collectionType = collectionSign
          i++
        }
        patternObjList.push({
          isInCollection: true,
          pattern: collection,
          collectionType,
          next: []
        })
        collection = []
      }
    }
  }
  return patternObjList
}

// change pattern list to regular generator
const getGenerator = (patternObjList) => {
  patternObjList.push({
    isEnd: true,
  })
  // the end signal of generator
  let start = {
    isStart: true,
    next: []
  }
  // generator need a 'start' to start valid
  const len = pa
}







// use reg to get generator and return start pattern object
const getGeneratorStart = (reg) => {
  const regStr = reg.slice(1, reg.length - 1)
  const patternObjList = getPatternObjList(regStr)
  return getGeneratorStart(patternObjList)
}


// the entry function
const testReg = (str, reg) => {
  if (!reg.startsWith('^') || !reg.endsWith('$')) {
    throw  Error('foramt mismatch!')
  }
  return isMatch(str, getGeneratorStart(reg))
}




