## 目录
1. [Vue过滤器](#Vue过滤器)
2. [Vue指令和事件](#Vue指令和事件)


### Vue过滤器

- 定义：`Vue.js`支持在`｛｛｝｝`插值的尾部添加一小管道符 `|`对数据进行过滤，经常用于格
  式化文本，比如字母全部大写、货币千位使用逗号分隔等。过滤的规则是自定义
  的， 通过给`Vue`实例添加选项`filters`来设置
  过滤器：`{{ data | filter1 |filter2}}`,
  `{{date | formatDate(66,99)}}` 中的第一个和第二个参数，分别对应过滤器的第二个和
  第三个参数
- 实例

```
<div id="app">
 {{date | formate}}
</div>
************
const pulsDate = function (value){
    return value <10? '0'+value : value
}
const vm = new Vue({
    ****
    data：{
        date: new Date()
    }
    filters:{
        formate:function(value){
            const date = new Date(value)
            const year = date.getFullYear()
            const month = pulsDate(date.getMonth()+1)
            const day = pulsDate(date.getDate())
            const hour = pulsDate(date.getHours())
            const min = pulsDate(date.getMinutes())
            const second = pulsDate(date.getSeconds())
            return year + '年' + month + '月' + day
            + '日' + hour + '时' + min + '分'
            + second + '秒'
        }
    }
})
```

### Vue指令和事件

- 指令定义：指令`Directives`是 `Vue` 模板中最常用的一项功能，它带有前缀 `v－`，能帮我们
  快速完成`DOM`操作。例如：循环渲染。显示和隐藏
- 例子

```
v-text:—————解析文本 和{{ }} 作用一样
v-html:————— 解析html
v-bind—————–v-bind 的基本用途是动态更新 HTML 元素上的属性，比如 id 、
class 等,本节只介绍基本章节，后面章节会更加深入详细讲述
v-on——————它用来绑定事件监听器
```
