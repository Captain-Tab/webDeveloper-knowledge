### Vue.JS组件
#### 使用组件的原因
作用：提高代码的复用性
#### 组件的使用方法
##### 方法一：全局注册
优点：所有的`vue`实例都可以用

缺点：权限太大，容错率降低
```
Vue.component('my-component',{
   template:'<div>我是组件的内容</div>'
})
```
##### 方法二：局部注册
```
const vm = new Vue({
  el: "#app",
  components: {
    "my-component": {
      template: "<div>我是组件的内容</div>",  
    },
  },
});
```
##### 注意事项
`vue`组件的模板在某些情况下会受到`html`标签的限制，比如`<table>`中只能 有`<tr>`,`<td>`这些元素，所以直接在`table`中使用组件是无效的，此时可以使用`is`属性来挂载组件
```
<table>
     <tbody is="my-component"></tbody>
</table>
```
#### 组件的使用技巧
1. 推荐使用小写字母加`-`进行命名（必须）类似于`child`, `my-component`来命名组件
2. `template`中的内容必须被一个`DOM`元素包括 ，也可以嵌套
3. 在组件的定义中，除了`template`之外的其他选项`data`,`computed`,`methods`
4. `data`必须是一个方法

#### 使用props传递数据
1. 在组件中使用`props`来从父亲组件接收参数，注意，在`props`中定义的属性，都可以在组件中直接使用
2. `props`来自父级，而组件中`data return`的数据就是组件自己的数据，两种情况作用域就是
组件本身，可以在`template`，`computed`，`methods`中直接使用
3. `props`的值有两种，一种是字符串数组，一种是对象，本节先只讲数组
4. 可以使用`v-bind`动态绑定父组件来的内容
```
<div id="app">
    <h5>我是父组件</h5>
    <child-component msg="我来自父组件"></child-component>
</div>
<script>
 const vm = new Vue({
     el: '#app',
     components:{
         'child-component':{
             props:['msg'],
             template:'<div>{{msg}}</div>'
         }
 })
</script>
```
#### 单向数据流
* 解释 : 通过`props`传递数据是单向的了， 也就是父组件数据变化时会传递给子组件，但是反过来不行。
* 目的 : 是尽可能将父子组件解稿，避免子组件无意中修改了父组件的状态。
* 应用场景: 业务中会经常遇到两种需要改变 `props` 的情况

##### 实现原理一
一种是父组件传递初始值进来，子组件将它作为初始值保存起来，在自己的作用域下可以随意使用和修改。这种情况可以在组件 `data` 内再声明一个数据，引用父组件的 `props`
- 步骤一：注册组件
- 步骤二：将父组件的数据传递进来，并在子组件中用`props`接收
- 步骤三：将传递进来的数据通过初始值保存起来
```
<div id="app">
<my-comp init-count="666"></my-comp>
</div>
<script>
const vm = new Vue({
  el: "#app",
  components: {
    "my-comp": {
      props: ["init-count"],
      template: "<div>{{init-count}}</div>",
      data: function() {
        return {
          count: this.initCount,
        };
      },
    },
  },
});
</script>
```
##### 实现原理二
另一种情况就是 `props`作为需要被转变的原始值传入。这种情况用计算属性就可以了
- 步骤一：注册组件
- 步骤二：将父组件的数据传递进来，并在子组件中用`props`接收
- 步骤三：将传递进来的数据通过计算属性进行重新计算
```
<input type="text" v-model="width" >
  <my-comp :width="width"></my-comp>
--------------------------------------------
const vm = new Vue({
  el: '#app',
  data: {
    width: ''
  },
  components: {
    'my-comp': {
      props: ['init-count', 'width'],
      template: '<div :style="style">{{init-count}}</div> ',
      computed: {
        style: function () {
          return {
            width: this.width + 'px',
            background: 'red'
          }
        }
      }
    }
  }
})
```
#### 数据验证
* 在`html`中, `myMessage` 和`mymessage`是一致的,因此在组件中的`html`
中使用必须使用`kebab-case`（短横线）命名方式。在`html`中不允许使用驼峰！！！！！！
* 在组件中, 父组件给子组件传递数据必须用短横线。在`template`中，必须使用驼峰命名方式，若为短横线的命名方式。则会直接保错。
* 在组件的`data`中,用`this.XXX`引用时,只能是驼峰命名方式。若为短横线的命名方式，则会报错。

验证的 `type` 类型可以是：
* `String`
* `Number`
* `Boolean`
* `Object`
* `Array`
* `Function`
```
Vue.component （ 'my-component', ｛
props: {
  ／／必须是数字类型
  propA: Number,
  ／／必须是字符串或数字类型
  propB: [String, Number],
  ／／布尔值，如果没有定义，默认值就是 true
  propC: {
    type: Boolean,
default : true
  },
  ／／数字，而且是必传
  propD: {
    type: Number,
      required : true
  },
  ／／如果是数组或对象，默认值必须是一个函数来返回
  propE: {
    type: Array,
default : function () {
      return [];
    }
  },
  ／／自定义一个验证函数
  propF: {
    validator: function (value) {
      return value > 10;
    }
  }
}
});
```
#### 组件通信
组件关系可分为父子组件通信、兄弟组件通信、跨级组件通信
##### 子组件给父组件传递数据
使用`v-on`除了监昕`DOM`事件外，还可以用于组件之间的自定义事件。
`JavaScript`的设计模式 一一观察者模式， 通过`dispatchEvent`和`addEventListener`这两个方
法来实现。`Vue`组件也有与之类似的一套模式，子组件用`$emit()`来 触发事件 ，父组件用
`$on()`来 监昕子组件的事件。

实现原理
* 第一步：自定义事件
* 第二步：在子组件中用`$emit`触发事件，第一个参数是事件名，后边的参数是要传递的数据
* 第三步：在自定义事件中用一个参数来接受
```
<div id="app">
  <p>您好,您现在的银行余额是{{ total }}元</p>
  <btn-component @change="handleTotal"></btn-component>
</div>
  <script src="js/vue.js">
//关于
    const vm = new Vue({
      el: '#app',
      data:{
        total: 0
      },
      components:{ 'btn-component':{
        template:
          '<div>
              <button @click="handleincrease">+1</button>
              <button @click="handlereduce">-1</button>
          </div>',
        data: function() {
          return {
            count: 0
        }
    },
      methods: {
        handleincrease: function () {
           this.count++;
           this.$emit('change', this.count);
       },
        handlereduce: function () {
          this.count--;
          this.$emit('change', this.count);
       }
     }
    }
   },
     methods: {
       handleTotal: function (total) {
         this.total = total;
    }
  }
})
</script>
```
##### 在组件中使用v-model
`$emit`的代码,这行代码实际上会触发一个`input`事件, `input`后的参数就是传递给`v-model`绑定的属性的值
`v-model` 其实是一个语法糖，这背后其实做了两个操作
* `v-bind` 绑定一个 `value` 属性
* `v-on` 指令给当前元素绑定 `input` 事件

要使用`v-model`,要做到:
* 接收一个`value`属性
* 在有新的`value`时触发`input`事件
```
<div id="app">
  <p>您好,您现在的银行余额是{{ total }}元</p>
  <btn-component v-model="total"></btn-component>
</div>
  <script src="js/vue.js"></script>
  <script>
//关于
    const vm = new Vue({
      el:'#app',
      data:{
         total:0
     },
     components:{'btn-component':{
        template:
            '<div>
                <button @click="handleincrease">+1</button> 
                <button @click="handlereduce">-1</button>
           </div>',
      data: function(){
        return {
          count: 0
        }
      },
      methods: {
         handleincrease: function () {
          this.count++;
            this.$emit('input', this.count);
         },
         handlereduce: function () {
            this.count--;
            this.$emit('input', this.count);
         }
     }
   }
  },
  methods:{
      // handleTotal:function (total) {
      // this.total = total;
      // }
})
</script>
```
##### 非父组件之间的通信
有时候两个组件也需要通信，非父子关系，在这种场景下，可以使用一个空的`vue`实例作为中央事件总线
```
const bus = new Vue()
-----------------------------
// 触发组件A中的事件
bus.$emit('id-selected',1)
-----------------------------
// 在组件Bc创建的钩子中监听事件
bus.$on('id-selected,'function(id){
  //....  
})
```
```
<div id ="app" >
    <my-acomponent> </my-acomponent> 
    <my-bcomponent> </my-bcomponent> 
</div> 
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js">
</script> 
<script>
    Vue.component('my-acomponent', {
        template: 
        '<div>
            <button @click="handle">
            点击我向B组件传递数据
            </button>
        </div>',
        data: function() {
            return {
                aaa: '我是来自A组件的内容'
            }
        },
        methods: {
            handle: function() {
                this.$root.bus.$emit('lala', this.aaa);
            }
        }
    })
    Vue.component('my-bcomponent', {
        template: '<div></div>',
        created: function() {
            //A组件在实例创建的时候就监听事件---lala事件
            this.$root.bus.$on('lala', function(value) {
                alert(value)
            });
        }
    })
    const vm = new Vue({
        el:"#app",
        data:{
            bus:new Vue()
        }
    })
```
拿到父组件的数据并修改，传向父组件，通过使用`this.$parent`
```
Vue.component('child-component', {
            template: 
              '<button @click="setFatherData">通过点击我修改父亲的数据</button>',
            methods: {
                setFatherData: function() {
                    this.$parent.msg = '数据已经修改了'
                }
            }
```
父组件拿到子组件的数据。通过使用`this.$refs`，它提供了为子组件提供索引的方法，用特殊的属性`ref`为其增加一个索引
```
const vm = new Vue({
    el: '#app',
    data: {
        //bus中介
        bus: new Vue(),
        msg: '数据还未修改',
        formchild: '还未拿到'
    },
    methods: {
        getChildData: function() {
            //用来拿子组件c中的内容 ---- $refs
            this.formchild = this.$refs.c.msg;
        }
    }
})
```
#### 使用slot分发内容
##### 什么是slot(插槽)
为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为 内容分发。`Vue.js`实现了一个内容分发`API`，使用特殊的`slot`元素作为原始内容的插槽
##### 编译的作用域
在深入内容分发`API`之前，我们先明确内容在哪个作用域里编译。假定模板为：
```
<child-component>
   {{ message }}
</child-component>
```
`message`应该绑定到父组件的数据，还是绑定到子组件的数据?答案是父组件。组件作用域简单地说：
* 父组件模板的内容在父组件作用域内编译；
* 子组件模板的内容在子组件作用域内编译。

##### 插槽的用法
父组件的内容与子组件相混合，从而弥补了视图的不足。混合父组件的内容与子组件自己的模板。

单个插槽：
```
<div id="app" >
  <my-component>
    <p>我是父组件的内容</p>
  </my-component>
</div>
  Vue.component('my-component', {
    template: 
    '<div>\
        <slot>\
         如果父组件没有插入内容，我就作为默认出现\
        </slot>\
     </div>'
})
```
具名插槽：
```
<name-component >
    <h3 slot = "header"> 我是标题 </h3> 
     <p>我是正文内容</p>
     <p> 正文内容有两段</p>
     <p slot ="footer"> 我是底部信息 </p> 
</name-component>
Vue.component('name-component', {
    template: '<div>\
<div class="header">\n' +
        ' <slot name="header">\n' +
        ' \n' +
        ' </slot>\n' +
        '</div>\n' +
        '<div class="container">\n' +
        ' <slot>\n' +
        ' \n' +
        ' </slot>\n' +
        '</div>\n' +
        '<div class="footer">\n' +
        ' <slot name="footer">\n' +
        '\n' +
        ' </slot> \n' +
        '</div>' +
        ' </div>'
})
```
##### 作用域插槽
作用域插槽是一种特殊的`slot`，使用一个可以复用的模板来替换已经渲染的元素从子组件获取数据,并且`template`模板是不会被渲染的
```
<div id="app">
    <my-component>
       <template slot="abc" slot-scope="prop">
          {{prop.text}}
          {{prop.ss}}
       </template>
    </my-component>
</div>

Vue.component('my-component', {
    template: 
      '<div>\
         <slot text="我是来自子组件的数据" ss="fdjkfjlsd" name="abc">\
         </slot>\ 
       </div>'
})
```
##### 访问slot
通过`this.$slots.(NAME)`访问`slot`
```
mounted: function() {
    //访问插槽
    const header = this.$slots.header;
    const text = header[0].elm.innerText;
    const html = header[0].elm.innerHTML;
    console.log(header)
    console.log(text)
    console.log(html)
}
```
##### 组件高级用法–动态组件
`Vue`给我们提供 了一个元素叫`component`
* 作用：用来动态的挂载不同的组件
* 实现：使用`is`特性来进行实现的

```
<div id="app">
  <component :is="thisView"></component>
  <button @click="handleView('A')">第一句</button>
  <button @click="handleView('B')">第二句</button>
  <button @click="handleView('C')">第三句</button>
  <button @click="handleView('D')">第四句</button>
</div>

Vue.component('compA'，{
    template:'<div>离离原上草</div>'
})
Vue.component('compB'，{
    template:'<div>一岁一枯荣</div>'
})
Vue.component('compC'，{
    template:'<div>野火烧不尽</div>'
})
Vue.component('compD'，{
    template:'<div>春风吹又生</div>'
})
const vm= new Vue({
    el:"#app",
    data:{
        thisView:'compA'
    },
    methods:{
        handleView:function(tag){
            this.thisView= 'comp' + tag;
        }
    }
})
```