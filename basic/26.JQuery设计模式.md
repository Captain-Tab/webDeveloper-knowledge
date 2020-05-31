## 目录
1. [jQuery思想](#jQuery思想)
2. [链式风格](#链式风格)
3. [获取元素](#获取元素)
4. [创建元素](#创建元素)
5. [复制元素](#复制元素)
6. [删除元素](#删除元素)
7. [修改元素](#修改元素)
8. [移动元素](#移动元素)
9. [在jQuery上使用原型](#在jQuery上使用原型)
10. [关于jQuery的设计模式](#关于jQuery的设计模式)
11. [更多信息](#更多信息)


### jQuery思想
`jQuery`的思想，实际上很简单，八个字可以概括：**选取元素，对其操作**

`window.jQuery()`是我们提供的全局函数。使用`$`来作为别名，代替`window.jQuery()`
#### 特殊函数jQuery
`jQuery`选择器用于获取对应的元素，但是不返回这些元素，它返回一个对象，称为`jQuery`构造出来的对象，这个对象可以操作对应的元素。
```
<div class="test">
      你好
</div>
```
```
window.jQuery = function(selector) {
  const elements = document.querySelectorAll(selector);
  // 返回api对象，操作elements
  return {
    // 这里出现了闭包，闭包：函数访问外部的变量
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }
      return this;
    }
  };
};
```
```
const api = jQuery(".test"); // 不返回dom元素，返回api对象
api.addClass("red"); // 遍历所有的elements, 添加className .red
api.addClass('blue').addClass('purple') // 链式操作

// obj.fn(p) === obj.fn.call(obj, p), this 指向 obj
```
#### jQuery是构造函数
`jQuery`是一个不需要加new的构造函数，但不是常规意义上的构造函数，因为不需要写`new jQuery()`就能构造一个对象。
#### jQuery 对象
`jQuery`对象不是说`jQuery`这个对象，指的是由`jQuery`函数构造出来的对象。例如：
* `Object`是个函数，`Object`对象表示是由`Object`构造出来的对象
* `Array`是个函数，`Array`对象/数组对象表示是由`Array`构造出来的对象
* `Function`是个函数，`Function`对象/函数对象表示是由`Function`构造出来的对象


### 链式风格
使用`jQuery`风格重新封装，也叫做链式风格。
它的原理在于每一步的`jQuery`操作，返回的都是一个`jQuery`对象，所以不同操作可以连在一起
```
 $('div')
   .find('h3')
   .eq(2)
   .html('Hello')
   .end() //退回到选中所有的h3元素的那一步
   .eq(0) //选中第一个h3元素
   .html('World'); //将它的内容改为World
```
#### 添加别名
```
window.$ = window.jQuery
```
约定这次所有代码`$`开头的变量都是`jQuery`对象。
#### $div VS div
代码1：会让用户误会`div`是一个`DOM`对象, 实际上是`jQuery`构造的`api`对象。
```
const div = $('div#test')
```
代码2： `$div.appendChild()`不是`DOM`对象，所以不存在属性`appendChild()`。`$div.find()`存在，因为是`jQuery`对象。
```
const $div = $('div#test')
```

### 获取元素
#### 语法
* 语法一：选择表达式可以是`CSS`选择器
```
$(document) //选择整个文档对象
$('#myId') //选择ID为myId的网页元素
$('div.myClass') // 选择class为myClass的div元素
$('input[name=first]') // 选择name属性等于first的input元素
```

* 语法二：`jQuery`特有的表达式
```
$('a:first') //选择网页中第一个a元素
$('tr:odd') //选择表格的奇数行
$('#myForm :input') // 选择表单中的input元素
$('div:visible') //选择可见的div元素
$('div:gt(2)') // 选择所有的div元素，除了前三个
$('div:animated') // 选择当前处于动画状态的div元素
```

#### 类似原理实现
`$('#xxx')`返回值不是元素，而是一个`api`对象
```
const api = {
    // 这里出现了闭包，闭包：函数访问外部的变量
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }
      return this;
    }
  };
```
`$('#xxx').find('.red')`查找`#xxx`里面的`.red`元素
```
find(selector) {
      let array = [];
      for (let i = 0; i < elements.length; i++) {
        const elements2 = Array.from(elements[i].querySelectorAll(selector));
        array = array.concat(elements2);
      }
      // return jQuery(array) 等价于 const newApi = jQuery(array);return newApi;
      array.oldApi = this; // this 指向 api 对象, 旧的 api
      return jQuery(array);
    }
```
`$('#xxx').parent()` 获取爸爸
```
 parent() {
      const array = [];
      this.each(node => {
        if (array.indexOf(node.parentNode) === -1) {
          array.push(node.parentNode);
        }
      });
      return jQuery(array);
    }
```
`$('#xxx').children()` 获取儿子
```
children() {
      const array = [];
      this.each(node => {
        array.push(...node.children);
      });
      return jQuery(array);
    }
```
### 创建元素
#### 语法
```
$('<p>Hello</p>');
$('<li class="new">new list item</li>');
$('ul').append('<li>list item</li>');
```
#### 类似原理实现
`$('<div><span>1</span></div>')` 创建`div`

`$('<div><span>1</span></div>'.appendTo(document.body))`把新增的元素放入另一个`body`里面
```
 appendTo(node){
      if(node instanceof Element){
        this.each(el => node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
      }else if(node.jquery === true){
        this.each(el => node.get(0).appendChild(el))  // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
      }
    },
```
### 复制元素
#### 语法
```
$div.clone() // 复制元素
```
### 删除元素
#### 语法
删除元素使用`.remove()`和`.detach()`。两者的区别在于，前者不保留被删除元素的事件，后者保留，有利于重新插入文档时使用。
```
$div.remove()// 移除元素
$div.detach() // 移除元素
$div.empty() // 清空元素
```

### 修改元素
#### 语法
```
$div.text(?) // 读写文本内容
$div.html(?) // 读写`HTML`内容
$div.attr('title', ?) // 读写属性
$div.css({color: 'red'}) // 读写`style// $div.style`更好
$div.addClass('blue') // 添加`className`
$div.on('click', fn) // 监听鼠标点击事件，添加函数
$div.off('click', fn)  //监听鼠标点击后松开的事件，添加函数
```

### 移动元素
#### 语法
这两种方法的效果是一样的，唯一的不同似乎只是操作视角的不同。但是实际上，它们有一个重大差别，那就是返回的元素不一样。第一种方法返回`div`元素，第二种方法返回`p`元素
```
$('div').insertAfter($('p'));  // 第一种方法是使用.insertAfter()，把div元素移动p元素后面：
$('p').after($('div')); // 第二种方法是使用.after()，把p元素加到div元素前面：
```
更多用法

`.insertAfter()`和`.after()`在现存元素的外部，从后面插入元素

`.insertBefore()`和`.before()`在现存元素的外部，从前面插入元素

`.appendTo()`和`.append()`在现存元素的内部，从后面插入元素

`.prependTo()`和`.prepend()`在现存元素的内部，从前面插入元素


### 在jQuery上使用原型
#### 原理
把共有的函数/属性放在`$.prototype`上
```
$._prototype_ === jQuery.protoype
```
#### 实现
使用`Object.create()`创建一个空`api`对象，这个对象的`_prototype_为jQuery.prototype`
```
// 等价于 const api = {_proto_: jQuery.prototype}
const api = Object.create(jQuery.prototype)
```
将属性赋予给这个空的`api`对象
```
Object.assign(api, {
    elements: elements，
    oldApi: selectorOrArrayOrTemplate.OldApi
})
```
`jQuery`重新命名`prototype`为`fn`
```
$.fn = $.prototype
```

### 关于jQuery的设计模式
#### 设计模式
设计模式就是对通用代码写法，模式取名。设计模式是总结得来的，程序员把代码写的优美，简洁的地方，提炼出来，看看符合哪个设计模式。
#### jQuery的设计模式
* 没有使用`new`的构造函数
* 支持多种参数，这种模式称为做重载 
* 使用闭包隐藏细节
* `$div.text()`可以读，也可以写，使用了`getter/setter`
* `$.fn`是`$.prototype`的别名
* `jQuery`兼容不同的浏览器，使用不同的代码(适配器)

#### jQuery仍然值得学习
通过`jQuery`学习封装技巧，学习简单，经典的库有利于新手提高，为以后学习`Vue/React`打好基础


### 更多信息
>[jQuery 都过时了，那我还学它干嘛？](https://fangyinghang.com/why-still-jquery/)

>[jQuery设计思想 阮一峰](http://www.ruanyifeng.com/blog/2011/07/jquery_fundamentals.html)

>[jQuery 中文文档](https://www.jquery123.com/)
