## 目录
1. [初步了解render函数](#初步了解render函数)
2. [render函数的第一个参数](#render函数的第一个参数)
3. [render函数的第二个参数](#render函数的第二个参数)
4. [render函数的第三个参数](#render函数的第三个参数)
5. [`this.$slots`在render函数中的应用](#this.$slots在render函数中的应用)
6. [在render函数中使用props传递数据](#在render函数中使用props传递数据)
7. [v-model在render函数中的使用](#v-model在render函数中的使用)
8. [作用域插槽在render函数中的使用](#作用域插槽在render函数中的使用)

### 初步了解render函数
`template`下只允许有一个子节点
```
<template id="hdom">
    <div>
        <h1 v-if="level==1">
            <slot></slot>
        </h1>
        <h2 v-if="level==2">
            <slot></slot>
        </h2>
        <h3 v-if="level==3">
            <slot></slot>
        </h3>
    </div>
</template>

//是用vue组件定义
// Vue.component('child',{
// props:['level'],
// template:'#hdom'
// })
//使用render函数进行定义组件
Vue.component('child', {
    render: function(createElement) {
        return createElement('h' + this.level,
            this.$slots.default);
    },
    props: ['level']
})
```
### render函数的第一个参数
在`render`函数的方法中，参数必须是`createElement`,`createElement`的类型是`function`
`render`函数的第一个参数可以是 `String | Object | Function`
```
Vue.component('child', {
    // ----第一个参数必选
    //String--html标签
    //Object---一个含有数据选项的对象
    //FUnction---方法返回含有数据选项的对象
    render: function(createElement) {
        alert(typeOf createElement)
        // return createElement('h1')
        // return createElement({
        // template:'<div>锄禾日当午</div>'
        // })
        const domFun = function() {
            return {
                template: '<div>锄禾日当午</div>'
            }
        }
        return createElement(domFun());
    }
});
```
### render函数的第二个参数
```
Vue.component('child', {
    // ----第二个参数可选,第二个参数是数据对象----只能是Object
    render: function(createElement) {
        return createElement({
            template: '<div>我是龙的传人</div>'
        }, {
            'class': {
                foo: true,
                baz: false
            },
            style: {
                color: 'red',
                fontSize: '16px'
            },
            //正常的html特性
            attrs: {
                id: 'foo',
                src: 'http://baidu.com'
            },
            //用来写原生的Dom属性
            domProps: {
                innerHTML: '<span style="color:blue;font-size: 1
                8 px ">我是蓝色</span>'
            }
        })
    }
});
```
### render函数的第三个参数
第三个参数也是可选`String | Array`作为我们构建函数的子节点来使用的
```
Vue.component('child', {
    // ----第三个参数是可选的，可以是 String | Array---代表子节点
    render: function(createElement) {
        return createElement('div', [
            createElement('h1', '我是h1标题'),
            createElement('h6', '我是h6标题')
        ])
    }
});
```
### this.$slots在render函数中的应用
第三个参数存的就是`VNODE`相当于`createElement('header',header)`, 其返回的就是`VNODE`
`const header = this.$slots.header`; //这里面返回的内容就是含有`VNODE`的数组
```
Vue.component('my-component', {
    render: function(createElement) {
        const header = this.$slots.header; //--这返回的内容就是含有=V
        NODE的数组
        const main = this.$slots.default;
        const footer = this.$slots.footer;
        return createElement('div', [
            createElement('header', header),
            createElement('main', main),
            createElement('footer', footer)
        ]);
    }
})
```
### 在render函数中使用props传递数据
```
Vue.component('my-component', {
    render: function(createElement) {
        const header = this.$slots.header;
        //--这返回的内容就是含有VNODE的数组
        const main = this.$slots.default;
        const footer = this.$slots.footer;
        return createElement('div', [
            createElement('header', header),
            createElement('main', main),
            createElement('footer', footer)
        ]);
    }
})
```
### v-model在render函数中的使用
```
<!--<my-component :name="name" @input="showName"></my-component>-->
<my-component :name="name" v-model="name"></my-component>
<br> {{name}}

//需求：
Vue.component('my-component', {
    render: function(createElement) {
        const self = this; //指的就是当前的VUE实例
        return createElement('input', {
            domProps: {
                <
                button @click = "switchShow" > 点击切换美女 < /button> <
                /my-component>
                value: self.name
            },
            on: {
                input: function(event) {
                    const a = this;
                    //此处的this指的是什么？指的就是window
                    self.$emit('input', event.target.value)
                }
            }
        })
    },
    props: ['name']
})
```
### 作用域插槽在render函数中的使用
```
Vue.component('my-component', {
    render: function(createElement) {
        return createElement('div', this.$scopedSlots.default({
            text: '我是子组件传递过来的数据',
            msg: 'scopetext'
        }))
    }
})
```
### 函数化组件的应用
使用`context`的转变,`functional:true`表示该组件无状态无实例
```
// this.text----context.props.text
// this.$slots.default-----context.children
```
```
<div id="app>
    <my-component value="haha">
    </my-component>
</div>

<script>
   Vue.component('my-component',{
       functional: true, // 表示当前的Vue实例无状态，无实例
       render: function(createElement,context){
           return createElement('button',{
               on:{
                   click:function(){
                       console.log(context)
                       console.log(context.parent)
                       console.log(context.props.value)
                       alert(context.parent.msg)
                   }
               }
           },'点击我学习context')
       },
       props:['value']
   })
   const app = new Vue({
       el: "#app",
       data:{
           msg: '我是父组件的内容'
       }
   })
</script>
```