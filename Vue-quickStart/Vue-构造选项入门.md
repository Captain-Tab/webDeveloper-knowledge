## 目录
1. [Vue构造实例](#Vue构造实例)
2. [Vue构造选项](#Vue构造选项)
3. [更多信息](#更多信息)

### Vue构造实例

![](https://user-gold-cdn.xitu.io/2020/3/16/170e0d2ae1ae13ad?w=624&h=388&f=jpeg&s=51459)

1. `Vue`的实例名为`vm`是尤雨溪的习惯，我们应该沿用
2. `vm`对象封装了对视图所有的操作，包括数据读写，事件绑定和`DOM`更新
3. `vm`的构造函数是`vue`,在`ES 6`里，`vm`所属的类是`Vue`
4. `options`是`new Vue`的参数，被称为选项或者构造选项


### Vue构造选项
#### 数据
```
data,
props,
propsData,
computed,
methods,
watch
```
#### DOM
```
el,
template,
render,
renderError
```
#### 生命周期钩子
```
beforeCreate,
created,
beforeMount,
mounted,
beforeUpdate,
updated,
activated,
deactivated,
beforeDestroy,
destroyed,
errorCaptured
```
#### 资源
```
directives,
fileters,
components
```
#### 组合
```
parent,
mixins,
extends,
provide,
inject
```
#### 其他

#### 属性分阶段

入门属性-必学：
* `el` ：挂载点, 可以用`$smount`代替
* `data`: 内部函数，支持对象和函数，优先用函数，避免数据被两个数据共用，而函数会被调用，产生新的数据。
* `methods`: 方法，事件处理函数或者普通函数，每次更新都会触发重新渲染
* `components`: `Vue`组件，三种引入方式，推荐最后一种
```
// 第一种import vue文件, 文件名用小写开头
import Demo from './Demo.vue'
// 第二种使用vue.component创建组件，组件名用大写开头
vue.component('Demo', {
   ******
   ******
})
// 第三种，结合前两者
const vm = new Vue({
    componentL{
        Demo:{
        *****
        *****
        }
    }
})

```
* `hookes`: 四个钩子
```
created   //实例出现在内存中
mounted   //实例出现在页面中
updated   //实例更新
destroyed //实例从页面和内存中消亡了
```
* `props`: 外部数据，或者称为属性
```
message="n"  //传入字符串
:message="n" //传入this.n数据
:fn="add"    //传入this.add函数
```

高级属性-必学：
* `computed`
* `watch`
* `activated`
* `deactived`
* `directives`
* `mixins`
* `extends`
* `provide`
* `inject`

通用属性：
* `propsData`
* `render`
* `renderError`
* `beforeCreate`
* `beforeMount`
* `beforeUpdate`
* `beforeDestroy`

特殊属性：
* `template`: 含有自定义方法
* `filters` : 不推荐使用

不常用属性：
* `errorCaptured`
* `parent`
* 其他属性


### 更多信息
>[Vue 实例构造](https://v1-cn.vuejs.org/guide/instance.html)


