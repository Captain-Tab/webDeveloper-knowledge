### 表单与v-model
`v-model`: 用于在表单上创建双向数据绑定。双向绑定包括：数据变化，视图更新，视图变化，数据更新， 常作用于表单元素(在对表单进行绑定时，`value`不能省)。
```
<div id="app">
  <input type="text" v-model="value">
  helloWorld
  {{value}}
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            value:''
        }
    })
</script>
```
注意： 所显示的值只依赖于所绑定的数据，不再关心初始化时的插入的`value`
#### 单选按钮
* 单个单选按钮，直接用`v-bind`绑定一个布尔值，用`v-model`是不可以的
```
<div id="app">
  <input type="radio" name="" :checked="oneRadio">
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            oneRadio:true
        }
    })
</script>
```
* 如果是组合使用，就需要`v-model`来配合`value`使用，绑定选中的单选框的`value`值，此处所绑定的初始值可以随意给
```
<div id="app">
  鸡蛋：<input type="radio" name="checks" value="鸡蛋" v-model="checkName">
  鸭蛋：<input type="radio" name="checks" value="鸭蛋" v-model="checkName">
  鹅蛋：<input type="radio" name="checks" value="鹅蛋" v-model="checkName">
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            checkName:'鸭蛋'
        }
    })
</script>
```
#### 复选框
1. 单个复选框，直接用定一个布尔值，可以用`v-model`可以用`v-bind`
```
<div id="app">
  <input type="checkbox" :checked="oneRadio">
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            oneRadio: true
        }
    })
</script>
```
2. 多个复选框– 如果是组合使用，就需要`v-model`来配合`value`使用，`v-model`绑定一个数组—如果绑定的是字符串，则会转化为`true`或者`false`，与所有绑定的复选框的
`checked`属性相对应
```
<div id="app">
  鸡蛋：<input type="checkbox" value="鸡蛋" v-model="checks">
  鸭蛋：<input type="checkbox" value="鸭蛋" v-model="checks">
  鹅蛋：<input type="checkbox" value="鹅蛋" v-model="checks">
  checks: {{checks}}
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            checks: []
        }
    })
</script>
```
#### 下拉框
1. 如果是单选，所绑定的`value`值初始化可以为数组，也可以为字符串，有`value`直接优先匹配一个`value`值，没有`value`就匹配一个`text`值
```
<div id="app">
  <select v-model="selected">
    <option value="鸡蛋">鸡蛋</option>
    <option value="鸭蛋">鸭蛋</option>
    <option value="鹅蛋">鹅蛋</option>
  </select>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            selected: ""
        }
    })
</script>
```
2. 如果是多选，就需要`v-model`来配合`value`使用，`v-model`绑定一个数组，与复选框类似
3. `v-model`一定是绑定在`select`标签上
```
<div id="app">
  <select v-model="selectedMul">
    <option value="鸡蛋">鸡蛋</option>
    <option value="鸭蛋">鸭蛋</option>
    <option value="鹅蛋">鹅蛋</option>
  </select>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            selectedMul: []
        }
    })
</script>
```

- #### 总结：
  * 如果是单选，初始化最好给定字符串，因为`v-model`此时绑定的是静态字符串或者布尔值
  * 如果是多选，初始化最好给定一个数组

#### 绑定值
* 单选按钮,只需要用`v-bind`给单个单选框绑定一个`value`值，此时，`v-model`绑定的就是他的`value`
值
```
<div id="app">
  <input type="radio" v-model="picked" :value="value">
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            picked: true,
            value: '123'
        }
    })
</script>
```
* 复选框
```
<div id="app">
  <input type="checkbox" v-model="toggle">
  {{toggle}}
  被选中：{{toggle == value1}}
  未被选中：{{toggle == value2}}
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            toggle: true,
            value1: '我被选中了',
            value2: '我没被选中'
        }
    })
</script>
```
* 下拉框，在`select`标签上绑定`value`值对`option`并没有影响
```
<div id="app">
  <select v-model="selectedValue" :value="{num:111}">
    <option value="鸡蛋">鸡蛋</option>
    <option value="鸭蛋">鸭蛋</option>
    <option value="鹅蛋">鹅蛋</option>
    {{typeOf selectedValue}}
  </select>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            selectedValue: ''
        }
    })
</script>
```
#### 修饰符
* `lazy`: `v-model`默认是在`input`输入时实时同步输入框的数据，而`lazy`修饰符，可以使其
在失去焦点或者敲回车键之后在更新
```
<div id="app">
    <input type="text" v-model.lazy="inputSelect">
    {{inputSelect}}
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            inputSelect: ''
        }
    })
</script>
```
* `number`: 将输入 的字符串转化为`number`类型
```
<div id="app">
    <input type="text" v-model.number="isNum">
    {{isNum}}
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            isNum: ''
        }
    })
</script>
```
* `trim`: `trim`自动过滤输入过程中收尾输入的空格
```
<div id="app">
    <input type="text" v-model.trim="trimString">
    {{isNum}}
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            trimString: ''
        }
    })
</script>
```