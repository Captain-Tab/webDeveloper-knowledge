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
10. [异步](#异步)

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

// 理解递归 
const pipe = continous((prev, next) => {
  console.log('prev', prev, 'next', next)
  return function(input) {
    console.log('next', next)
    console.log('prev', prev)
    return next.call(this, prev.call(this, input))
  }
})

const double = (x) => x * 2;
const half = (x) => x / 2;
const pow2 = (x) => x ** 2;

const cacl = pipe(double, pow2, half);
cal(10)

func2(fun1())
func3(fun2(fun1()))
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

### 异步
```
function defer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

const _state = Symbol('state');
const _checkers = Symbol('checker');

class Signal {
  constructor(initState) {
    this[_state] = initState;
    this[_checkers] = new Map();
  }

  get state() {
    return this[_state];
  }

  set state(value) {
    // 每次状态变化时，检查未结束的 defer 对象
    [...this[_checkers]].forEach(([promise, {type, deferred, state}]) => {
      if(type === 'while' && value !== state // 当信号状态改变时，while 信号结束
        || type === 'until' && value === state // 当信号状态改变为对应的 state 时，until 信号结束
      ) {
        deferred.resolve(value);
        this[_checkers].delete(promise);
      }
    });
    this[_state] = value;
  }

  while(state) {
    console.log('while-state', state)
    const deferred = defer();
    if(state !== this[_state]) {
      // 如果当前状态不是 while 状态， while 的 deferred 结束
      deferred.resolve(this[_state]);
    } else {
      // 否则将它添加到 checkers 列表中等待后续检查
      this[_checkers].set(deferred.promise, {type: 'while', deferred, state});
    }
    return deferred.promise;
  }

  until(state) {
    console.log('until-state', state)
    const deferred = defer();
    if(state === this[_state]) {
      // 如果当前状态就是 until 状态， until 的 deferred 结束
      deferred.resolve(this[_state]);
      console.log('until-state-resolve')

    } else {
      // 否则将它添加到 checkers 列表中等待后续检查
      this[_checkers].set(deferred.promise, {type: 'until', deferred, state});
      console.log('until-state-wait')
    }
    return deferred.promise;
  }

  delete(promise) {
    this[_checkers].delete(promise);
  }

  deleteAll() {
    this[_checkers].clear();
  }
}

const lucky = new Signal();

const timerID = setInterval(() => {
  const num = Math.ceil(Math.random() * 10);
  console.log(num);
  lucky.state = num;
}, 1000)

async function addLuckyBoy(name, num) {
  await lucky.until(num);
  console.log(`${name} is lucky boy!`);
  clearInterval(timerID);
  lucky.deleteAll(); // 删除checkers中的所有promise对象
}

addLuckyBoy('张三', 9);
addLuckyBoy('李四', 5);
addLuckyBoy('王五', 7);
```


