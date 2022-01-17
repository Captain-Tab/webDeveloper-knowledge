## 目录
1. [once函数](#once函数)
2. [throttle](#throttle函数)
3. [debounce函数](#debounce函数)
4. [deprecate函数](#deprecate函数)
5. [intercept函数](#intercept函数)
6. [batch函数](#batch函数)
7. [continous函数](#continous函数)
8. [pipe函数](#pipe函数)
9. [compose](#compose函数)
10. [link](#link)

### throttle函数
```
function throttle(fn, ms = 100){
  let timer = null
  return function(...args){
    if(!timer) {
      const result = fn.apply(this, args)
      timer = setTimeout(()=> {
        timer = null
      }, ms)
      return result
    }
  }
}
```

### debounce函数
```
const debounce = (func: Function, wait: number, immediate: boolean) => {
  let timeout: null | any
  return function (...args: any) {
    const later = function () {
      timeout = null
      func(args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func(args)
    }
  }
}
```

### deprecate函数
```
function deprecate(fn, oldApi, newApi) {
  const message = `The ${oldApi}` is deprecated, Please use the ${newApi} instead`
  const notice = once(console.warn)
  return function(...args) {
    notice(message)
    return fn.apply(this, args)
  }
}
```

### intercept函数
```
function intercept(fn, {beforeCall = null, afterCall = null}) {
  return function(...args) {
    if(!beforeCall || beforeCall.call(this, args) !== false) {
      // 如果beforeCall 返回false, 不执行后面的函数
      const result = fn.apply(this, args)
      if(afterCall) return afterCall.call(this, result)
      return result
     }
  }
}
```

### batch函数
```
function batch(fn) {
  return function(subject, ...args){
    if(Array.isArray(subject)){
      return subject.map((s)=> {
        return fn.call(this, s, ...args)
      })
    }
    return fn.call(this, subject, ...args)
  }
}

export const setStyle = batch((el, key, value) => {
  el.style[key] = value
})
```
### continous函数
```
function continous(reducer) {
  return function(...args) {
    return args.reduce((a, b) => reducer(a, b))
  }
}

const add = continous((a, b) => a + b);
const multiply = continous((a, b) => a * b);

console.log(add(1, 2, 3, 4)); // 1 + 2 + 3 + 4 = 10

console.log(multiply(1, 2, 3, 4, 5)); // 1 * 2 * 3 * 4 * 5 = 120
```

### pipe函数
```
function pipe(...fns) {
  return function(input) {
    return fns.reduce((a,b) => {
      console.log('b', a, b)
      return b.call(this, a)
    }, input)
  }
}

const double = (x) => x * 2;
const half = (x) => x / 2;
const pow2 = (x) => x ** 2;

const cacl = pipe(double, pow2, half);
const result = cacl(10); // (10 * 2) ** 2 / 2 = 200
```
或者
```
const pipe = continous((prev, next) => {
  return function(input) {
    return next.call(this, prev.call(this, input))
  }
})
```

### compose函数
```
const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) =>
    (...args) => nextFn(prevFn(...args)),
    value => value
  );


const compose = (...fns) =>
  fns.reduceRight((prevFn, nextFn) => {
    return (...args) =>  {
      console.log('x22', prevFn)
      return nextFn(prevFn(...args))
    }
  }, value => value);

const example = compose(
  val => { console.log(1); return `1<${val}>`; },
  val => { console.log(2); return `2<${val}>`; },
  val => { console.log(3); return `3<${val}>`; }
);

example('hello')

3(value
2(3(value)
1(2(3(value))
() => 1(2(3(value)
```

### link
[link](https://www.jianshu.com/p/eda918cf738a)