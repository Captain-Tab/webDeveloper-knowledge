## 目录
1. [类理论](#类理论)
2. [委托理论](#委托理论)

### 类理论
假设我们需要在软件中建模一些类似的任务（“XYZ”、“ABC”等）

如果使用类，那设计方法可能是这样的：定义一个通用父（基）类，可以将其命名为`Task`，在`Task`类中定义所有任务都有的行为。接着定义子类`XYZ`和`ABC`，它们都继承自`Task`并且会添加一些特殊的行为来处理对应的任务

类设计模式鼓励在继承的时候使用方法重写和多态.比如说在`XYZ`任务中重写`Task`中定义的一些通用方法，甚至在添加新行为时通过`super`调用这个方法的原始版本。你会发现许多行为可以先“抽象”到父类然后再用子类进行特殊化（重写）

下面是对应的伪代码
```
class Task {
    id;
    // 构造函数
    Task(ID){
        id = ID
    }
    outputTask(){
        ouput(id)
    }
}

class XYZ  inherits Task {
    label;
    // 构造函数
    XYZ(ID, Label){
        super(ID)
        label = Label
    }
    outputTask() {
        super()
        output(label)
    }
}
```

### 委托理论
首先你会定义一个名为`Task`的对象（和许多`JavaScript`开发者告诉你的不同，它既不是类也不是函数），它会包含所有任务都可以使用（写作使用，读作委托）的具体行为。接着，对于每个任务（“XYZ”、“ABC”）你都会定义一个对象来存储对应的数据和行为。你会把特定的任务对象都关联到`Task`功能对象上，让它们在需要的时候可以进行委托。

基本上你可以想象成，执行任务“XYZ”需要两个兄弟对象`XYZ` 和`Task`协作完成。但是我们并不需要把这些行为放在一起，通过类的复制，我们可以把它们分别放在各自独立的对象中，需要时可以允许`XYZ`对象委托给`Task`

下面是对应的代码, 在这段代码中，`Task` 和 `XYZ` 并不是类或者函数,它们是对象. `XYZ`通过`Object.create(..)`创建，它的`[[Prototype]]`委托了`Task`对象
```
Task  = {
     setID: function(ID) {
        this.id = ID
    }，
    outputID: function() {
        console.log(this.id)
    }
}

// 让xyz委托Task
XYZ = Object.create(Task)
XYZ.prepareTask = function(ID, Label) {
    this.setID(ID)
    this.label = Label
}
XYZ.outputTaskDetetails = function() {
    this.outputID()
    console.log(this.label)
}

// ABC = Object.create(TaSK)
```
* `id`和`label`数据成员都是直接存储在`XYZ`上而不是`Task`.通常来说，在`[[Prototype]]`委托中最好把状态保存在委托者（`XYZ`、`ABC`）而不是委托目标`Task`上
* 在类设计模式中，我们故意让父类`Task`和子类`XYZ`中都有`outputTask`方法，这样就可以利用重写（多态）的优势。在委托行为中则恰好相反：我们会尽量避免在`[[Prototype]]`链的不同级别中使用相同的命名.这个设计模式要求尽量少使用容易被重写的通用方法名，提倡使用更有描述性的方法名，尤其是要写清相应对象行为的类型。这样做实际上可以创建出更容易理解和维护的代码，
* `this.setID(ID)`函数，`XYZ`中的方法首先会寻找`XYZ`自身是否有`setID(..)`，但是`XYZ`中并没有这个方法名，因此会通过`[[Prototype]]`委托关联到`Task`继续寻找，这时就可以找到`setID(..)`方法。此外，由于调用位置触发了`this`的隐式绑定规则，因此虽然`setID(..)`方法在`Task`中，运行时`this`仍然会绑定到`XYZ`，这正是我们想要的。换句话说，我们和`XYZ`进行交互时可以使用`Task`中的通用方法，因为`XYZ`委托了`Task`
* 总的来说，委托行为意味着某些对象在找不到属性或者方法引用时会把这请求委托给另外一个对象


