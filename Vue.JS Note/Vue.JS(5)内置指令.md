### Vue.JS内置指令
#### 基本指令
* `v-text`: 直接把数据渲染出来，有`Html`标签也不会解析
```
<h1 v-text="msg"></h1>

msg:"Hello"
```
* `v-html`: 双大括号的方式会将数据解释为纯文本，而非`HTML`。为了输出真正的`HTML`，可以用`v-html`指令。它等同于`JS`的`innerHtml`属性。这个`div`的内容将会替换成属性值`name`，直接作为`HTML`进行渲染。下面仅仅显示第二个span里的内容
```
<div v-html="name"></div>
```
* `v-el`: 可以使用`v-el`指令，去给这个元素注册一个索引，方便通过所属实例的`$el`访问这个元素。注意的是：`HTML`不区分大小写，所以`v-el:someEl`将转换为全小写。可以用`v-el:some-el`然后设置`this.$el.someEl`
```
<span v-el:msg>hello</span>
<span v-el:other-msg>world</span>
this.$els.msg.textContent //-> "hello"
this.$els.otherMsg.textContent// -> "world"
this.$els.msg//-><span>hello</span>
```
* `v-pre`: 主要用来跳过这个元素和它的子元素编译过程。可以用来显示原始的`Mustache`标签。跳过大量没有指令的节点加快编译
```
<div id="app">
    <span v-pre>{{message}}</span>  //这条语句不进行编译
    <span>{{message}}</span>
</div>	
```
* `v-cloak`: 解决初始化慢导致页面闪动的最佳实践。一般与`display:none`结合使用
用来保持在元素上直到关联实例结束时进行编译。
```
<div id="app" v-cloak>
    <div>
        {{message}}
    </div>
</div>
<script type="text/javascript">
    new Vue({
      el:'#app',
      data:{
        message:'hello world'
      }
    })
</script>
```
* `v-once`: 定义它的元素和组件只渲染一次
```
<span v-once>This will never change:{{msg}}</span>  //单个元素
<div v-once>//有子元素
    <h1>comment</h1>
    <p>{{msg}}</p>
</div>
<my-component v-once:comment="msg"></my-component>  //组件
<ul>
    <li v-for="i in list">{{i}}</li>
</ul>
```
#### 条件渲染指令
* `v-if`:可以实现条件渲染，`Vue`会根据表达式的值的真假条件来渲染元素。
`"2>1"`会自动转化成`true` 也可以放表达式。如果为 `true` 则显示，否则不显示

```
<a v-if="2>1">yes</a>
```
`v-if`的弊端 :
`Vue` 在渲染元素时 ，出于效率考虑，会尽可能地复用已有的元素而非重新渲染， 因
此会出现乌龙
只会渲染变化的元素，也就是说，`input`元素被复用了
解决方法：提供唯一的`key`值来决定是否复用该元素 

* `v-else`: 搭配`v-if`使用的，它必须紧跟在`v-if`或者`v-else-if`后面，否则不起作用
```
<p v-if="score>=60">及格</p>
<p v-else>不及格</p>
```
* `v-else-if`: `v-else-if`充当`v-if`的`else-if`块，可以链式的使用多次。可以更加方便的实现`switch`语句
```
<div v-if="type==='A'">
    A
</div>
<div v-if="type==='B'">
    B
</div>
<div v-if="type==='C'">
    C
</div>
<div v-else>
    Not A,B,C
</div>
```
* `v-show`:也是用于根据条件展示元素。和`v-if不`同的是，如果`v-if`的值是`false`，则这个元素被销毁，不在`dom`中。但是`v-show`的元素会始终被渲染并保存在`dom`中，它只是简单的切换`css`的`dispaly`属性。如：`display:none`;(不显示)或者 `display:block`;(显示)但是不支持 `template` 标签
```
<a v-show="true">yes</a>
```
`v-show`对比`v-if`: `v-if`有更高的切换开销，`v-show`有更高的初始渲染开销。因此，如果要非常频繁的切换，则使用`v-show`较好；如果在运行时条件不太可能改变，则`v-if`较好

#### 进阶指令
* `v-for`:  当需要将一个数组遍历或枚举一个对象属性的时候循环显示时，就会用到列表

渲染指令 `v-for`的两种使用场景：

1. 遍历多个对象
2. 遍历一个对象的多个属性

`v-for`的两种遍历形式
```
<div v-for="(item,index) in items"></div>   //使用in，index是一个可选参数，表示当前项的索引
<div v-for="item of items"></div>   //使用of
```
下面是一个例子，并且在`v-for`中，拥有对父作用域属性的完全访问权限
```
<ul id="app">
    <li v-for="(item,index) in items">
        {{parent}}-{{item.text}}
    </li>
</ul>
<script type="text/javascript">
    var example = new Vue({
      el:'#app',
      data:{
        parent:'父作用域'
        items:[
          {text:'文本1'},
          {text:'文本2'}
        ]
      }
    })
</script>
```
注意：
1. `vue 2.5` 以上要求 必须在循环时 使用`key`属性，`key`需要是唯一的，`key`的作用就是用来区分元素，但是 `template` 标签上不能使用 `key` 属性
2. 当`v-for`和`v-if`同处于一个节点时，`v-for`的优先级比`v-if`更高。这意味着`v-if`将运行在每个`v-for`循环中
3. 单标签上不能使用`v-for`,这时候需要在这个单标签外面再加上一个标签，循环加上的这个标签才可以，一般都是加 `template` 这个标签

* `v-bind`: 用来动态的绑定一个或者多个特性，主要用于属性绑定。没有参数时，可以绑定到一个包含键值对的对象。常用于动态绑定`class和style`，以及`href`等。
单向绑定：数据变化，视图更新， 常用于在 `data` 中声明一个值，然后用来绑定到标签中。
简写为一个冒号`:`

对象语法
```
//进行类切换的例子
<div id="app">
    <!--当data里面定义的isActive等于true时，is-active这个类才会被添加起作用-->
    <!--当data里面定义的hasError等于true时，text-danger这个类才会被添加起作用-->
    <div :class="{'is-active':isActive, 'text-danger':hasError}"></div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            isActive: true,  
            hasError: false
        }
    })
</script>
```
结果为
```
<!--因为hasError: false，所以text-danger不被渲染-->
<div class = "is-active"></div>
```
数组语法
```
<div id="app">
    <!--数组语法：errorClass在data对应的类一定会添加-->
    <!--is-active是对象语法，根据activeClass对应的取值决定是否添加-->
    <p :class="[{'is-active':activeClass},errorClass]">12345</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            activeClass: false,
            errorClass: 'text-danger'
        }
    })
</script>
```
结果为
```
<!--因为activeClass: false，所以is-active不被渲染-->
<p class = "text-danger"></p>
```
直接绑定数据对象
```
<div id="app">
    <!--在vue实例的data中定义了classObject对象，这个对象里面是所有类名及其真值-->
    <!--当里面的类的值是true时会被渲染-->
    <div :class="classObject">12345</div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            classObject:{
                'is-active': false,
                'text-danger':true
            }           
        }
    })
</script>
```
结果为
```
<!--因为'is-active': false，所以is-active不被渲染-->
<div class = "text-danger"></div>
```
* `v-model`: 用于在表单上创建双向数据绑定。双向绑定包括：数据变化，视图更新，视图变化，数据更新， 常作用于表单元素(在对表单进行绑定时，`value`不能省)。`v-model`会忽略所有表单元素的`value`、`checked`、`selected`特性的初始值。因为它选择`Vue`实例数据做为具体的值

下面这个例子中直接在浏览器`input`中输入别的名字，下面的`p`的内容会直接跟着变。这就是双向数据绑定。`v-model`仅仅是语法糖，`v-model = :value + @input` (`input`事件：当输入框中的数据改变时触发)
```
<div id="app">
    <input v-model="somebody">
    <p>hello {{somebody}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            somebody:'小明'
        }
    })
</script>
```
`v-model`修饰符
1. `lazy`: 默认情况下，`v-model`同步输入框的值和数据。可以通过这个修饰符，转变为在`change`事件再同步
```
<input v-model.lazy="msg">
```
2. `number`: 自动将用户的输入值转化为数值类型
```
<input v-model.number="msg">
```
3. `trim`: 自动过滤用户输入的首尾空格
```
<input v-model.trim="msg">
```
* `v-on`: 主要用来监听`dom`事件，以便执行一些代码块。表达式可以是一个方法名
简写为`@ `
```
<div id="app">
    <button @click="consoleLog"></button>
</div>
<script>
    var app = new Vue({
        el: '#app',
        methods:{
            consoleLog:function (event) {
                console.log(1)
            }
        }
    })
</script>
```
事件修饰符
1. `.stop` 阻止事件继续传播
2. `.prevent` 事件不再重载页面
3. `.capture` 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
4. `.self` 只当在 `event.target` 是当前元素自身时触发处理函数 (例如把`self`放到了父元素上面，点击子元素，父元素的事件不被触发)
5. `.once` 事件将只会触发一次
6. `.passive` 告诉浏览器你不想阻止事件的默认行为
```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```
注意：使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用`v-on:click.prevent.self`会阻止所有的点击，而 `v-on:click.self.prevent`只会阻止对元素自身的点击。而且修饰符也可以一次使用多个(也就是上面所说的串联)
