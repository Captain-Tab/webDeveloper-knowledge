## 目录
1. [问题](#问题)
2. [事件捕获和冒泡](#事件捕获和冒泡)
3. [target和currentTarget](#target和currentTarget)
4. [事件绑定](#事件绑定)
5. [取消事件绑定](#取消事件绑定)
6. [取消冒泡](#取消冒泡)
7. [阻止滚动](#阻止滚动)
8. [取消默认行为](#取消默认行为)
9. [自定义事件](#自定义事件)
10. [事件委托](#事件委托)
11. [封装事件委托](#封装事件委托)
12. [更多信息](#更多信息)


### 问题
```
<div class=爷爷>
  <div class=爸爸>
   <div class=儿子>
   文字
   </div>
  </div>
</div>
```
* 结构为爷爷->爸爸->儿子
* 分别给三个`div`添加事件监听为: `fnGranderFather,fnFather,fnSon`


问题1: 如果点击文字，请问点击了谁？
* 点击文字，点击了儿子？
* 点击文字，点击了爸爸？
* 点击文字，点击了爷爷？

答案: 三个都被点击了

问题2：如果点击文字，请问事件的调用顺序为？

最先调用`fnGranderFather,fnFather,fnSon`其中的哪一个？

答案：
`IE5`认为先调用`fnSon`, 网景`Netscap`认为先调用`fnGranderFather` 


### 事件捕获和冒泡
1. `W3C`在`2002`年发布标准，文档名为`DOM level2 Events Specification`, 规定浏览器应该同时支持两种调用顺序。
2. 首先，按爷爷->爸爸->儿子的顺序看有没有函数监听
3. 然后，按儿子->爸爸->爷爷的顺序看没有函数监听
4. 如果有函数就调用，并提供事件信息，没有就跳过


事件捕获：从外到内找监听函数，称为事件捕获。简单来说，就是子元素绑定的事件，会逐级冒泡到父元素，当它的一个或多个父元素上绑定有相同事件时，相应的事件处理函数会被触发。

![](https://user-gold-cdn.xitu.io/2020/6/18/172c50f000b65c28?w=246&h=164&f=png&s=4123)

事件冒泡：从内到外找监听函数，称为事件冒泡。事件捕获。就是说，在子元素事件已经发生，注册的事件处理函数被调用之前，父元素能够捕获到这个事件。

![](https://user-gold-cdn.xitu.io/2020/6/18/172c50ef07e40d19?w=223&h=167&f=png&s=4391)
 
问题：那是不是`fnGranderFather,fnFather,fnSon`被总共调用了两次？

回答：不是。开发者可以自己决定把`fnGranderFather`放在捕获阶段还是冒泡阶段


![](https://user-gold-cdn.xitu.io/2020/6/18/172c513e128bd759?w=663&h=726&f=jpeg&s=63708)

事件绑定`API`
* `IE 5`: `div.attachEvent('onclick',fn)`为事件冒泡
* 网景: `div.addEventListener('click', fn) `为事件捕获
* `W3C`: `div.addEventListener('click', fn, bool)` 其中，如果`bool`为默认值，不传或者为`falsy`。则让`fn`走冒泡，意思是说当浏览器在冒泡阶段发现`div`有`fn`监听函数，就会调用`fn`,并且提供事件信息
* `falsy`值有: `0`, `0n`, `"" " `` `, `null,` `undefined`, `NaN`
* 如果`bool`值为`true`,就让`fn`走捕获，意思是说，当浏览器在捕获阶段发现`div`有`fn`监听函数，就会调用`fn`, 提供事件信息
* 注意的是：捕获和冒泡都会被执行，区别在于`fn`在哪个过程会被执行
* 注意的是：`IE`的知识不需要特意去学，因为已经过时了，等需要用到的时候，再去搜索学习

![](https://user-gold-cdn.xitu.io/2020/6/18/172c51e25fb1804e?w=765&h=536&f=jpeg&s=65288)

实例代码：
```
// HTML代码
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>test</title>
</head>
<body>
<div class="level1 x">
  <div class="level2 x">
    <div class="level3 x">
      <div class="level4 x">
        <div class="level5 x">
          <div class="level6 x">
            <div class="level7 x">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
***********************
// CSS代码
* {
  box-sizing: border-box;
}
div[class^=level] {
  border: 1px solid;
  border-radius: 50%;
  display: inline-flex;
}
.level1 {
  padding: 10px;
  background: purple;
}
.level2 {
  padding: 10px;
  background: blue;
}
.level3 {
  padding: 10px;
  background: cyan;
}
.level4 {
  padding: 10px;
  background: green;
}
.level5 {
  padding: 10px;
  background: yellow;
}
.level6 {
  padding: 10px;
  background: orange;
}
.level7 {
  width: 50px;
  height: 50px;
  border: 1px solid;
  background: red;
  border-radius: 50%;
}
.x{
  background: transparent;
}
******************************
// JS代码
const level1 = document.querySelector('.level1')
const level2 = document.querySelector('.level2')
const level3 = document.querySelector('.level3')
const level4 = document.querySelector('.level4')
const level5 = document.querySelector('.level5')
const level6 = document.querySelector('.level6')
const level7 = document.querySelector('.level7')

let n = 1

level1.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level2.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level3.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level4.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level5.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level6.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})
level7.addEventListener('click', (e)=>{
  const t = e.currentTarget
  setTimeout(()=>{  
    t.classList.remove('x')
  },n*1000)
  n+=1
})

```
总结：
1. 问题, 儿子被点击了，算不算点击了爸爸？先调用爸爸的函数还是先调用儿子的函数？答案1：算。答案2：在`w3c`的标准中先调用爸爸的函数，网景和`IE`浏览器分情况
2. 捕获规定先调用爸爸的监听函数， 冒泡规定先调用儿子的监听函数
3. 在`W3C`事件模型中，先捕获再冒泡，即先爸爸->儿子，再儿子-> 爸爸
4. 注意的是`e`事件对象被传递给所有的监听函数，事件结束后，`e`事件对象会被浏览器进行修改，`currentTarget`为`null`, 没有访问价值

### target和currentTarget
基础: 
```                    
                       // 当用户点击文字的时候
<div>                  // e.currentTarget就是div
  <span>文字</span>    // e.target就是span
</div>
```
* `e.target`: 用户操作的元素
* `e.currentTarget`: 程序员监听的元素
* `this`为`e.currentTarget`, 是不推荐的用法，因为`this`指向不确定

特例: 在同级别`div`中
```
div.addEventListener('click', f1)  // f1先被执行
div.addEventListener('click', f2, true) // 然后被f2执行
```
请问, `f1`还是`f2`先执行？如果把代码调换顺序，哪个先被执行？

答案：谁先事件监听，谁就先执行。但是这是一个特例。

特例存在的情况：
* 在不考虑父子同时被监听的情况下，只有一个`div`被监听
* `fn`会分别在捕获阶段和冒泡阶段监听`click`事件 
* 开发者监听的元素就是用户点击的元素

### 事件绑定
1. 直接获取元素绑定

优点是：简单和稳定，可以确保它在你使用的不同浏览器中运作一致。

缺点：只会在事件冒泡中运行；一个元素一次只能绑定一个事件处理函数，新绑定的事件处理函数会覆盖旧的事件处理函数；事件对象参数(`e`)只有在非`IE`浏览器才可用
```
element.onclick = function(e){
        // ...
    };
```
2. 直接在元素里面使用事件属性
```
<button οnclick="f1"></button>
```
3、添加事件监听

`w3c`方法

优点：该方法同时支持事件处理的捕获和冒泡阶段；事件阶段取决于`addEventListener`最后的参数设置：`false` (冒泡) 或 `true` (捕获)；在事件处理函数内部。事件对象总是可以通过处理函数的第一个参数(`e`)捕获；可以为同一个元素绑定你所希望的多个事件，同时并不会覆盖先前绑定的事件

缺点：`IE`不支持，你必须使用`IE`的`attachEvent`函数替代
```
element.addEventListener('click', function(e){
        // ...
    }, false);
```
`IE`方法

优点：可以为同一个元素绑定你所希望的多个事件，同时并不会覆盖先前绑定的事件。

缺点：`IE`仅支持事件捕获的冒泡阶段；如果使用了`this`,事件监听函数内的`this`关键字指向了`window`对象，而不是当前元素, 事件对象仅存在与`window.event`参数中；事件必须以`ontype`的形式命名，比如，`onclick`而非`click`；仅`IE`可用，你必须在非`IE`浏览器中使用`W3C`的`addEventListener`

注意：不是意味着版本的`IE`没有事件捕获，它也是先发生事件捕获，再发生事件冒泡，只不过这个过程无法通过程序控制。
```
element.attachEvent('onclick', function(){
        // ...
});
```
### 取消事件绑定
* 使用`removeEventListener`
* 使用`detachEvent`

```
// W3C
element.removeEventListener('click', function(e){
        // ...
    }, false);

// IE
element.detachEvent('onclick', function(){
        // ...
});
```
### 取消冒泡
* 捕获不可以被取消，冒泡可以被取消

* 在支持`addEventListener()`的浏览器中，可以调用事件对象的`stopPropagation()`方法以阻止事件的继续传播。如果在同一对象上定义了其他处理程序，剩下的处理程序将依旧被调用，但调用`stopPropagation()`之后任何其他对象上的事件处理程序将不会被调用。即可以阻止事件在冒泡阶段的传播
* `IE 9`之前的`IE`不支持`stopPropagation()`方法，而是设置事件对象`cancelBubble`属性为`true`来实现阻止事件进一步传播
* 有些事件不可以取消冒泡，例如`MDN`搜索`scroll event`, 看到`Bubbles`和`Canceleble`, 在`Canceleble`可以找到不可以取消冒泡的事件
```
// w3c
element.addEventListener("click", function(e){
    // 在捕获阶段阻止事件的传播
    e.stopPropagation();
}, true);

```
### 阻止滚动
* `scroll`事件为不可取消的冒泡事件，阻止`scroll`默认动作没有用，因为先有滚动才有滚动事件。要阻止滚动，需要阻止`wheel`和`touchstart`的默认动作
* `CSS`上使用`overflow:hidden`可以直接取消滚动条，然而`JS`上依然可以修改`scrollTop`
```
element.addEventListener('wheel',(e)=>{
    e.preventDefault() // 取消滚轮的默认动作
})

element.addEventListener('touchstart',(e)=>{
    e.preventDefault() // 取消手机上的触屏默认动作
})
```
### 取消默认行为
* `e.preventDefault()`可以阻止事件的默认行为发生，默认行为是指：点击`a`标签就转跳到其他页面、拖拽一个图片到浏览器会自动打开、点击表单的提交按钮会提交表单等等，因为有的时候我们并不希望发生这些事情，所以需要阻止默认行为

* `IE 9`之前的`IE`中，可以通过设置事件对象的`returnValue`属性为`false`达到同样的效果

```
function cancelHandler(event){
    var event=event||window.event;//兼容IE
    
    //取消事件相关的默认行为
    if(event.preventDefault)    //标准技术
        event.preventDefault();
    if(event.returnValue)    //兼容IE9之前的IE
        event.returnValue=false;
    return false;    //用于处理使用对象属性注册的处理程序
}
```

### 自定义事件
浏览器自带事件，一共有`100`多种事件，可以在`MDN`上查询。同时，开发者也可以在自带事件之外，自定义一个事件
```
// html代码
<body>
  <div id=div1>
    <button id=button1>点击触发事件     
    </button>
  </div>
**************
// js代码

// 先自定义事件，然后点击时触发自定义事件
button1.addEventListener('click', ()=>{
  const event = new CustomEvent("tab", {"detail":{name:'tab', age: 18}},
  bubbles: true) // 允许冒泡
  button1.dispatchEvent(event)
})

// 监听自定义事件
button1.addEventListener('tab', (e)=>{
  console.log('tab')
  console.log(e)
})
```
### 事件委托
定义

* 在`JavaScript`中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。导致这一问题的原因是多方面的。首先，每个函数都是对象，都会占用内存；内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的`DOM`访问次数，会延迟整个页面的交互就绪时间。

* 对事件处理程序过多问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如，`click`事件会一直冒泡到`document`层次。也就是说，我们可以为整个页面指定一个`onclick`事件处理程序，而不必给每个可单击的元素分别添加事件处理程序

* 优点：提高页面性能，可以监听动态元素

事件委托使用场景

1. 实例一：假设给`100`个按钮添加点击事件
```
// html代码
<div id="div1">
 <button data-id="1">1</button>
 <button data-id="2">2</button>
 <button data-id="3">3</button>
 <button data-id="4">4</button>
 ****************
</div>

// js代码
div1.addEventListener('click', (e)=>{
    const t = e.target
    if(t.tagName.toLowerCase() === 'button'){
        console.log('button'被点击了)
        console.log('button'内容是 + t.textContext) // 获取被点击元素的文本内容
        console.log('button 的data-id是:'+ t.dataset.id) // 获取被点击元素的dataset.id
    }
})
```
2. 实例二：监听目前不存在的元素的点击事件，例如下面的例子中`1`秒钟之后`button`才出现
```
// html代码
<div id="div1">

</div>

// js代码
setTimeout(()=>{
    const button = document.createElement('button')
    button.textContent= 'click 1'
    div1.appendChild(button)
},1000)

div1.addEventListener('click', (e)=>{
    const t = e.target
    if(t.tagName.toLowerCase() === 'button'){
        console.log('button'被点击了)
    }
})
```

### 封装事件委托
写出一个函数，例如`on('click', '#div1','li', fn)`，当用户点击`div1`中的`li`时，调用`fn`函数
```
// 答案一
setTimeout(()=>{
    const button = document.createElement('button')
    button.textContent= 'click 1'
    div1.appendChild(button)
},1000)

functin on(eventType, element, selector, fn){
   if(!(element instanceOf Element)){
       element = document.querySelector(element)
   }
    element.addEventListener(eventType, (e)=>{
        const t = e.target
        if(t.matches(selector)){
            fn(e)
        }
    })
}

on('click', '#div1', 'button',()=>{
    console.log('button 被点击了')
})
```
```
// 答案二： 使用递归进行判断
function on(eventType, element, selector, fn) {
   if(!(element instanceOf Element)){
      element = document.querySelector(element)
   }
    element.addEventListener(eventType, e => {
      let el = e.target
      while (!el.matches(selector)) {
        if (element === el) {
          el = null
          break
        }
        el = el.parentNode
      }
      el && fn.call(el, e, el)
    })
    return element
```

注意的是：本章节讲的是`DOM`的事件，`JS`只是调用了`DOM`提供的`addEventListener`方法，其实`JS`不支持事件，除非开发者手写一个事件系统

### 更多信息
> [事件捕获和事件冒泡的区别](https://www.hitoy.org/difference-between-event-capturing-and-bubbling.html)

> [事件冒泡、事件捕获和事件委托](https://www.cnblogs.com/Chen-XiaoJun/p/6210987.html)

> [MDN 事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events)
