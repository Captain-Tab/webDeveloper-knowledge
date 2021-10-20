const collectionTypes = ['*', '+'];

// change reg String to Pattern Ojects and return list
const getPatternObjList = (regStr) => {
  const len = regStr.length;
  let patternObjlist = [];
  let isInCollection = false;
  let collection = []; // used to store current collection
  for (let i = 0; i < len; i++) {
    const char = regStr[i];
    if (!isInCollection) {
      // 
      if (char != '[') {
        // single char object
        patternObjlist.push({
          isCollection: false,
          pattern: [char],
          next: []
        })
      } else {
        // char === [ we need to change isInCollection to true
        isInCollection = true;
      }
    } else {
      if (char != ']') {
        collection.push(char);
      } else {
        // ] is the sign end of collection
        isInCollection = false;
        // collectionSign maybe * or + 
        let collectionSign = regStr[i + 1];
        let collectionType = 'COMMON';
        if (collectionSign && collectionTypes.includes(collectionSign)) {
          collectionType = collectionSign
          i++;
        }
        patternObjlist.push({
          isCollection: true,
          pattern: collection,
          collectionType,
          next: []
        })
        collection = [];
      }
    }
  }
  return patternObjlist;
}

// get PatternObj's next
const getNext = (patternObjList, index) => {
  let next = [];
  const len = patternObjList.length;
  console.log('lenfgtyh', len)
  for (let i = index + 1; i < len; i++) {
    const nextPattern = patternObjList[i]
    next.push(nextPattern)
    console.log('nextddd', next)
    if (nextPattern.collectionType != '*') {
      // * need to handle, * is possible no
      break;
    }
  }
  console.log('next', next)
  return next;
}

// change pattern list to regular generator
const getGenerator = (patternObjList) => {
  patternObjList.push({
    isEnd: true,
  }) // the end signal of generator
  let start = {
    isStart: true,
    next: []
  }; // generator need a 'start' to start valid
  const len = patternObjList.length;
  start.next = getNext(patternObjList, -1);
  for (let i = 0; i < len; i++) {
    const curPattern = patternObjList[i];
    curPattern.next = getNext(patternObjList, i)
    if (collectionTypes.includes(curPattern.collectionType)) {
      curPattern.next.push(curPattern);
    }
  }

  return start;
}

// use reg to get generator and return start Pattern Object
const getGeneratorStart = (reg) => {
  const regStr = reg.slice(1, reg.length - 1);
  const patternObjList = getPatternObjList(regStr);
  return getGenerator(patternObjList)
}

// use generator to test string
const isMatch = (str, generator) => {
  if (generator.isStart) {
    // the start of recursive
    for (const nextGen of generator.next) {
      if (isMatch(str, nextGen)) return true;
    }
    return false;
  } else if (generator.isEnd) {
    // if generator is end but str is not end return false
    return str.length ? false : true;
  } else {
    if (!str.length) {
      return false;
    }
    if (!generator.pattern.includes(str[0])) {
      return false;
    } else {
      const restStr = str.slice(1);
      for (const nextGen of generator.next) {
        if (isMatch(restStr, nextGen)) return true;
      }
      return false;
    }
  }
}

// the entry function
const testReg = (str, reg) => {
  if (!reg.startsWith('^') || !reg.endsWith('$')) {
    // it's not a right reg string
    throw Error('format mismatch！');
  }
  const generator = getGeneratorStart(reg);
  return isMatch(str, generator);
  //console.log(matchStructure)
}
console.log(testReg('2131aa3', '^[123]+[a]*3$'));


// link: https://juejin.cn/post/6986409229825343496