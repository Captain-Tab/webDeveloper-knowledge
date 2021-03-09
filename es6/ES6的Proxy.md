## 目录
1. [介绍](#介绍)
2. [语法](#语法)
3. [get方法](#get)
4. [set方法](#set)
5. [apply方法](#apply)
6. [其他](#其他)
7. [更多资料](#更多资料)

### 介绍
`Proxy`顾名思义，意思是在访问目标对象之前做一层拦截或者代理。例如，访问或者修改该对象的属性时，拦截器判断之后，再做下一步的处理
例如，下面的代码中，对空对象属性的访问`get`和修改`set`都做出了响应的处理
```
const obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`get ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`set ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
```

### 语法
`ES6`原生提供`Proxy`构造函数，用来生成`Proxy`实例
```
// 语法
const proxy = new Proxy(target, handler);
```
* `new Proxy()`将会生成一个`Proxy`实例
* `target`为一个对象，表示响应拦截的目标对象
* `handler`也是一个对象，定义拦截行为

例如, 在下面的代码中，访问`proxy`对象的任意属性，都会返回`666`
```
const proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 666;
  }
});

proxy.value // 666
proxy.id // 666
proxy.date // 666
```

注意：
* 如果想要拦截起到作用，需要对`Proxy`实例进行操作, 而不是通过目标对象操作
* 如果`handler`对空对象，没有设置任何拦截， 那么对`Proxy`实例进行操作，就是直接访问目标对象

`Proxy` 实例也可以作为其他对象的原型对象， 下面的代码中, `proxy`对象是`obj`对象的原型，`obj`对象没有`time`属性，但是根据原型链，会在`proxy`对象里读取属性，从而进行拦截行为
```
const proxy = new Proxy({}, {
    get: function(target, propKey) {
        return 666
    }
})

const obj = Object.create(proxy)
obj.date // 666
```

### get
`get()`在访问对象某个目标对象的属性时执行，可以接受三个参数，依次为目标对象，属性名和实例本身，实例本身为可选参数
* 如果访问的目标对象的属性不存在，会报错 
* 如果没有拦截函数，同时又访问不存在的属性，就会返回`undefined`
* 利用`proxy`实例作为对象的原型，`get`方法会被继承
* 可以使用`get()`方法实现链式调用
```
const pipe = function (value) {
  contt funcStack = [];
  const oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

const double = n => n * 2;
const pow = n => n * n;
const reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63
```

### set
`set()`在赋值对象某个目标对象的属性时执行，可以接受四个参数， 依次为目标对象，属性名，属性值和`Proxy`实例本身，最后的参数为可选参数

例如，在下面的代码中，设置对象的属性值应该是大于`666`的整数
```
const validator = {
    set： function(obj, prop, value) {
        if(!Number.isInteger(value) || value > 666) {
            throw new Error('值应为大于666的整数')
        }
        obj[prop] = value
    }
}

let obj = new Proxy({}, validator)

obj.value = 11 // 报错
obj.value = 667 // 667
```

### apply
`apply`方法拦截函数的调用、`call`和`apply`操作。`apply`方法可以接受三个参数，分别是目标对象、目标对象的上下文对象`this`和目标对象的参数数组
```
const target = function () { return 'I am the target'; };
const handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

const p = new Proxy(target, handler);

p()
// "I am the proxy"
```
上面的代码中，当`Proxy`的实例被调用的时候，就会触发`apply()`方法进行拦截，返回字符串
```
const twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
}
function sum (left, right) {
  return left + right;
}

const proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
```
上面的代码中，执行`Proxy`函数，或者被`call`和`apply`调用时，就会被拦截

### 其他
* `has()`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符
* `construct()`方法用于拦截`new`命令
* `deleteProperty()`方法用于拦截`delete`操作
* `getOwnPropertyDescriptor()`方法拦截`Object.getOwnPropertyDescriptor()`
* `isExtensible()`方法拦截`Object.isExtensible()`操作

### 更多资料
>[Proxy](https://es6.ruanyifeng.com/#docs/proxy)
