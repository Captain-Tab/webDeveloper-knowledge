## 目录
1. [介绍](#介绍)
2. [方法](#方法)


### 介绍
`Reflect`对象和`Proxy`对象一样，也是`ES6`为了操作对象而提供的新`API`。`Reflect`对象的设计目的有

* 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。
* 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`
```
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```
* `让Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为
```
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```
* `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为

下面的代码中，`Proxy`方法拦截`target`对象的属性赋值行为。它采用`Reflect.set`方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能
```
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```
下面代码中，每一个`Proxy`对象的拦截操作（`get、delete、has`），内部都调用对应的`Reflect`方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志
```
const loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```
### 方法
`Reflect`对象一共有`13`个静态方法，大部分与`Object`对象的同名方法的作用都是相同的，而且它与`Proxy`对象的方法是一一对应的

```
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
```

`Reflect.get`方法查找并返回`target`对象的`name`属性，如果没有该属性，则返回`undefined`。如果第一个参数不是对象，Reflect.get方法会报错
```
Reflect.get(target, name, receiver)

// 实例
const myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
```

`Reflect.set`方法设置`target`对象的`name`属性等于`value`。如果`name`属性设置了赋值函数，则赋值函数的`this`绑定`receiver`
```
Reflect.set(target, name, value, receiver)

// 实例
const myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
```
注意，如果`Proxy`对象和`Reflect`对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了`receiver`，那么`Reflect.set`会触发`Proxy.defineProperty`拦截
```
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
```
上面代码中，`Proxy.set`拦截里面使用了`Reflect.set`，而且传入了`receiver`，导致触发`Proxy.defineProperty`拦截。这是因为`Proxy.set`的`receiver`参数总是指向当前的 `Proxy`实例（即上例的`obj`），而`Reflect.set`一旦传入`receiver`，就会将属性赋值到`receiver`上面（即obj），导致触发`defineProperty`拦截。如果`Reflect.set`没有传入`receiver`，那么就不会触发`defineProperty`拦截

`Reflect.has`方法对应`name in obj`里面的`in`运算符
```
Reflect.has(obj, name)

const myObject = {
  foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
```

`Reflect.deleteProperty`方法等同于`delete obj[name]`，用于删除对象的属性。该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回`true`，删除失败，被删除的属性依然存在，返回`false`
```
Reflect.deleteProperty(obj, name)

const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');
```

`Reflect.construct`方法等同于`new target(...args)`，这提供了一种不使用`new`，来调用构造函数的方法
```
Reflect.construct(target, args)

function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
```

`Reflect.getPrototypeOf`方法用于读取对象的`__proto__`属性，对应`Object.getPrototypeOf(obj)`
```
Reflect.getPrototypeOf(obj)


const myObj = new FancyThing();
// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;
// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype
```

`Reflect.setPrototypeOf`方法用于设置目标对象的原型（`prototype`），对应`Object.setPrototypeOf(obj, newProto)`方法
```
Reflect.setPrototypeOf(obj, newProto)

const myObj = {};

// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);
// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);
myObj.length // 0
```

`Reflect.apply`方法等同于`Function.prototype.apply.call(func, thisArg, args)`，用于绑定`this`对象后执行给定函数。
一般来说，如果要绑定一个函数的`this`对象，可以这样写`fn.apply(obj, args)`，但是如果函数定义了自己的`apply`方法，就只能写成`Function.prototype.apply.call(fn, obj, args)`，采用`Reflect`对象可以简化这种操作

```
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
```
