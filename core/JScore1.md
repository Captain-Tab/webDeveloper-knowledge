## 目录
1. [显示混入](#显示混入)
2. [寄生继承](#寄生继承)
3. [隐式混入](#隐式混入)
4. [原型继承](#原型继承)
4. [总结](#总结)

### 显示混入
```
function mixin (sourceObj, targetObj) {
  for (const key in sourceObj) {
    // 只会在不存在的情况下复制
    if (!targetObj.hasOwnProperty(key)) {
      targetObj[key] = sourceObj[key]
    }
  }
  console.log('target', targetObj)
  return targetObj
}

const vehicle = {
  engine: 1,
  ignition: () => { console.log('Turning on my engine') },
  drive: () => {
    vehicle.ignition()
    console.log('Steering and moving forward!')
  }
}

const car = {
  wheels: 4,
  drive: () => {
    vehicle.drive.call(this) // 显示多态
    console.log('Rolling on all ' + car.wheels + ' wheels!')
  }
}
const newCar = mixin(vehicle, car)
newCar.drive()
```

* 现在`newCar`就有一份`vehicle`属性和函数副本了
* 函数实际上没有被复制，复制的是函数引用。所以，`newCar`中的属性`ignition`只是从`vehicle`中复制过来对于`ignition()`函数的引用
* `engines`属性才直接被复制了
* `newCar`本身的属性被没有被重写，从而保留和和`car`中定义相同的属性
* `vehicle.drive.call(this)`这里为显示多态，使用绝对引用，通过名称显示制定`vehicle`对象，并且调用它的`drive`函数
* 复制操作结束后，`newCar`就和`vehicle`分离了，向`newCar`添加属性不会影响`vehicle`, 反之亦然

### 寄生继承
```
// "传统的JavaScript类"vehicle
function Vehicle () {
    this.engines = 1
}
Vehicle.prototype.ignition = function () {
    console.log('Turning on my engine')
}
Vehicle.prototype.drive = function () {
    this.ignition()
    console.log('Steering and moving forward')
}
// "寄生类"car
function Car () {
    // 首先，生成car
    const car = new Vehicle()
    // 赋值给car
    car.wheels = 4
    // 覆盖Vehicle的dirve函数
    car.drive = function () {
        Vehicle.prototype.drive.call(this)
        console.log('Rolling on all ' + this.wheels + ' wheels!')
    }
    return car
}

const newCar = new Car()
newCar.drive()
```
* 我们首先复制一份`Vehicle`对象(父类)的定义，然后混入子对象(子类)的定义，最后用这个复合对象构建实例
* 调用`new Car`的时候会创建一个新对象并且绑定到`Car`的`this`上，也可以使用`Car()` 来生成新的对象

### 隐式混入
```
const Something = {
    cool: function() {
        this.greeting = 'hello World'
        this.count = this.count ? this.count + 1 : 1
    }
}
Something.cool()
Something.greeting
Something.count

const Another =  {
    cool: function () {
        // 隐式的把Something混入Another
        Something.cool.call(this)
    }
}
Another.cool()
Another.greeting()
Another.count
```
* 利用`call()`方法改变`this`的指向，来达到借用`Something.cool()`函数的目的
* 最终`Something.cool()`的赋值操作都应用在`Another`对象上，而不是`Something`对象上，即`count`值不是共享的

### 原型继承
```
function Foo(name) {
    this.name = name
}
Foo.prototype.myName = function () {
    return this.name
}
function Bar(name,label) {
    Foo.call(this, name)
    this.label = label
}
// 创建一个新的Bar.prototype对象并关联到Foo.prototype
Bar.prototype = Ojbect.create(Foo.prototype)
// 现在没有Bar.prototype.constructor，需要这个属性需要手动修复
Bar.prototype.myLabel = function () {
    return this.label
}
const a = new Bar('a', 'obj a')
a.myName()
a.myLabel()
```
* 这段代码的核心部分就是`Bar.prototype = Object.create(Foo.prototype)`调用`Object.create(...)`会凭空创建一个新对象并把新对象内部的`prototype`
关联到制定的对象，本例就是`Foo.prototype`.简单来说就是，创建一个新的`Bar.prototype`对象并把它关联到`Foo.prototype`
* 声明`function bar() {...}`时，和其他函数一样，会有一个`.prototype`关联到默认的对象，但是这个原生的对象不是我们想要的，所以我们创建了一个新的对象并把它关联到我们希望的对象上，把原始的关联对象抛弃掉

下面的这两种方式是常见的错误
```
// 和你想要的机制不一样
Bar.prototype = Foo.prototype
// 可以，但是还有副作用
Bar.prototype = new Foo()
```
* `Bar.prototype = Foo.prototype` 并不会创建一个关联到`Bar.prototype`的新对象，它只是让`Bar.prototype`直接引用`Foo.prototype`对象。因此当你执行类似`Bar.prototype.myLabel = ...`的赋值语句时会直接修改`Foo.prototype`对象本身。
* `Bar.prototype = new Foo()`的确会创建一个关联到`Bar.prototype`的新对象。但是它使用了`Foo(..)`的“构造函数调用”，如果函数`Foo`有一些副作用（比如写日志、修改状态、注册到其他对象、给`this`添加数据属性，等等）的话，就会影响到`Bar()`的“后代”，后果不堪设想
* 所以要创建一个合适的关联对象，必须使用`Object.create(...)`而不是使用具有副作用的`Foo(...)`，这样的缺点就是需要创建一个新对象然后把旧对象抛弃掉
* `ES6`添加了函数`Object.setPrototypeOf(...)`来修改关联和`isPrototypeOf`来确定对象之间是否存在关系

### 总结
* 类是一种设计模式。许多语言提供了对于面向类软件设计的原生语法。JavaScript 也有类似的语法，但是和其他语言中的类完全不同。
* 类意味着复制。传统的类被实例化时，它的行为会被复制到实例中。类被继承时，行为也会被复制到子类中。
* 多态（在继承链的不同层次名称相同但是功能不同的函数）看起来似乎是从子类引用父类，但是本质上引用的其实是复制的结果。JavaScript 并不会（像类那样）自动创建对象的副本。
* 混入模式（无论显式还是隐式）可以用来模拟类的复制行为，但是通常会产生丑陋并且脆弱的语法，让代码更加难懂并且难以维护
* 显式混入实际上无法完全模拟类的复制行为，因为对象（和函数！别忘了函数也是对象）只能复制引用，无法复制被引用的对象或者函数本身。忽视这一点会导致许多问题
* 总地来说，在`JavaScript`中模拟类是得不偿失的，虽然能解决当前的问题，但是可能会埋下更多的隐患。


