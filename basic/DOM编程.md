## 目录
1. [DOM](#DOM)
2. [Node节点](#Node节点)
3. [DOM操作是跨线程](#DOM操作是跨线程)
4. [获取元素](#获取元素)
5. [增加](#增加)
6. [删除](#删除)
7. [修改](#修改)
8. [查看](#查看)
9. [更多信息](#更多信息)

### DOM
#### 定义
1. `DOM`是`JavaScript` 操作网页的接口，全称为“文档对象模型”（`Document Object Model`）。它的作用是将网页转为一个`JavaScript` 对象，从而可以用脚本进行各种操作（比如增删内容）。

2. 浏览器会根据`DOM`模型，将结构化文档（比如`HTML`和 `XML`）解析成一系列的节点，再由这些节点组成一个树状结构（`DOM Tree`）。所有的节点和最终的树状结构，都有规范的对外接口。

3. `DOM`只是一个接口规范，可以用各种语言实现。所以严格地说,`DOM`不是`JavaScript`语法的一部分，但是`DOM`操作是 `JavaScript`最常见的任务，离开了`DOM`,`JavaScript` 就无法控制网页。另一方面，`JavaScript`也是最常用于`DOM` 操作的语言。后面介绍的就是`JavaScript`对`DOM` 标准的实现和用法。
### Node节点
`DOM`的最小组成单位叫做节点（`node`）。文档的树形结构（`DOM`树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。

节点的类型有七种
* `Document`：整个文档树的顶层节点
* `DocumentType`：`doctype`标签（比如`<!DOCTYPE html>`）
* `Element`：网页的各种`HTML`标签（比如`<body>`、`<a>`等）
* `Attribute`：网页元素的属性（比如`class="right"`）
* `Text`：标签之间或标签包含的文本
* `Comment`：注释
* `DocumentFragment`：文档的片段
浏览器提供一个原生的节点对象`Node`，上面这七种节点都继承了`Node`，因此具有一些共同的属性和方法。

查看节点类型
```
xxx.node.type
// 1 表示元素Element,  2 表示文本text， 8 表示comment注释
```


#### Node Tree 节点树
一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是`DOM` 树。它有一个顶层节点，下一层都是顶层节点的子节点，然后子节点又有自己的子节点，就这样层层衍生出一个金字塔结构，倒过来就像一棵树。

浏览器原生提供`document`节点，代表整个文档。
```
document
// 整个文档树
```
文档的第一层有两个节点，第一个是文档类型节点（`<!doctype html>`），第二个是 `HTML` 网页的顶层容器标签`<html>`。后者构成了树结构的根节点（`root node`），其他 `HTML` 标签节点都是它的下级节点。

除了根节点，其他节点都有三种层级关系。

* 父节点关系（`parentNode`）：直接的那个上级节点
* 子节点关系（`childNodes`）：直接的下级节点
* 同级节点关系（`sibling`）：拥有同一个父节点的节点
`DOM` 提供操作接口，用来获取这三种关系的节点。比如，子节点接口包括`firstChild`（第一个子节点）和`lastChild`（最后一个子节点）等属性，同级节点接口包括`nextSibling`（紧邻在后的那个同级节点）和`previousSibling`（紧邻在前的那个同级节点）属性。

#### Div完整原型链
代码
```
console.dir(div1)
```
0. 存有自身属性：`className`, `id`, `style`等等
1. 第一层原型：`HTMLDivElement.prototype`，存有所有`div`的共有属性
2. 第二层原型：`HTMLElement.prototype`，存有所有`HTML`标签的共有属性
3. 第三层原型：`Element.prototype`, 存有所有`XML, HTML`标签的共有属性
4. 第四层原型：`Node.prototype`, 存有所有`Node`共有的属性，`Node`节点包括`XML`标签文本注释，`HTML`标签文本注释等等
5. 第五层原型： `EventTarget.prototype`, 存有三个重要的函数，其中`addEventLister`比较重要
6. 最后一层原型： `Object.prototype`

![](https://user-gold-cdn.xitu.io/2020/2/24/17074f75d66a0fbf?w=3750&h=1795&f=png&s=202963)


#### 总结
**DOM很难用**


### DOM操作是跨线程
#### 浏览器引擎
浏览器引擎分为渲染引擎和`JS`引擎
* `JS`引擎不能操作页面，只能操作`JS`
* 渲染引擎不能操作`JS`，只能操作页面

那么这句代码是如何改变页面的呢？
```
document.body.appendChild(div1)
```

#### 跨线程通信
1. 首先浏览器发现`JS`在`body`里面新增了`div`对象
2. 然后浏览器就会通知渲染引擎也新增一个`div`元素到页面里
3. 根据`div`对象渲染的`div`元素

![](https://user-gold-cdn.xitu.io/2020/2/24/1707633eab56e9fc?w=936&h=554&f=jpeg&s=64129)

#### 插入新标签的完整过程
1. 在`div1`放入页面之前，所有对`div1`的操作都属于`JS`线程内的操作，浏览器一旦发现由`JS`引擎产生了变化，就会通知渲染线程在页面中根据`div1`对象在页面中渲染`div1`元素
2. 把`div1`放入页面后，所有对`div1`的操作都有可能触发重新渲染，例如`div1.id = 'newID'`， 如果`newID`里有`CSS`样式，就会触发重新渲染。如果连续对`div1`多次操作，浏览器就有可能合并成一次操作。

#### 属性同步
* 标准属性

修改`div1`的标准属性，将会被浏览器同步到页面中，例如`id`,`className`, `title`等等

* `data-*`属性

修改`div1`的`data-*`属性，也会被浏览器同步到页面中
* 非标准属性 

修改`div1`的非标准属性，将只会停留在`JS`线程中，不会同步到页面。例如这里的[X属性](http://js.jirengu.com/meviw/2/edit?html,js,output)
#### 注意事项
如果用户由自定义属性，又想触发页面的更新，可以使用`data-`作为前缀

![](https://user-gold-cdn.xitu.io/2020/2/24/170764a02ab733e9?w=977&h=468&f=jpeg&s=56439)

#### PropertyVSAttribute
* `Property`属性

`JS`线程中`div1`的所有属性, 称为`Property`
* `Attribute`属性

渲染引擎中的`div1`对应标签的属性，称为`Attribute`
* 二者区别
   -  一般情况下，同名的`property`和`attribute`相等
   -  如果不是标准属性，二者在开始的时候相等，一旦`property`改变，`attribute`将会维持原先的值，所以二者会不相等
   - `attribute` 只支持字符串
   - `property` 支持字符串，布尔等类型

### 获取元素
* `window.id(xxx)`或者直接`id(xxx)`
* `document.getElementById('id(xxx)')`
* `document.getElementsByTagName('div')[0]`
* `document.getElementsByClassName('red')[0]`
* `document.querySelctor('#idxxx')`
* `document.querySelctorAll('.red')[0]`

#### 注意事项
* 推荐使用`querySelector`或者`querySelctorAll`
* 不推荐使用`getElementsByxxx`, 除非需要兼容`IE`
* 做测试，个人项目，可以使用`id(xxx)`

#### 获取特定元素
**获取的元素就是一个对象**
* 获取`html`元素
```
document.documentElement
```
* 获取`head`元素
```
document.head
```
* 获取`body`元素
```
document.body
```
* 获取窗口(窗口不是元素)
```
window
```
* 获取所有元素
```
// IE发明的，只在IE浏览器为真值，其他浏览器为falsy值
document.all
```
### 增加
#### 创建标签节点
```
document.createElement('style')
document.createElement('script')
document.createElement('li')
let div1 = document.createElement('div')
```
#### 创建文本节点
```
text1 = document.createTextNode('你好')
```
#### 标签插入文本
```
div1 = appendChild(text1)
div1.innerText = '你好' // 或者
div1.textContent = '你好'

// 注意，以下为错误操作， 因为'你好'不是Node节点
div1.appendChild('你好')
```
#### 插入页面中的注意事项
* 需要把创建的标签插入到浏览器中
* 需要插入到`head`或者`body`，才会生效，代码为`document.body.appendChild(div)`

#### 关于appendChild
代码：页面中有`div #test1` 和 `div #test2`
```
let div = document.createElement('div')
test1.appenChild(div)
test2.appenChild(div)
```
问题1： 请问`div`最终出现在哪里？`test1`? `test2`? 二者都在？

答案：`test 2`里面，因为一个元素不能出现在两个地方，除非复制一份，代码为`let div2 = div1.cloneNode()`。

### 删除
#### 方法
* 旧的方法：`parentNode.removeChild(childNode)`
* 新的方法：`childNode.remove()`, 但是`IE`不兼容

#### 问题
请问，如果一个`node`被移除了`DOM`树，还能被复原回来吗?

答案：可以的。如果想完全移除，可以这样写`div.remove(), div = null`


### 修改
#### 修改标准属性
* 修改`id`
```
div1.id = 'div2'
```
* 修改`class`
```
div.className= 'bule' // 这个会覆盖之前的className, 如果前面的className 不能变的时候，会造成Bug 推荐写法为
div.className += ' yello' // 这样就保留前面的className, 并同时添加新的className, 或者使用classList
div.classList.add('red')
```
* 修改`style`
```
div.style = 'width: 100px; color:bule;'
div.style.backgroundColor 等价于 div.style.bakcground-color // 前面的为正确语法，后面的会报错
div.style.width = '200px'
```
* 修改`data`
```
div.dataset.x = 'frank'
```
#### 读取标准属性
* 读取`class`
```
div.classList
```
或者
```
div.getAttribute('class')
```
* 例外情况
```
<a id = test href="/xxx">/xxx</a>
********
console.log(test.href)
// 结果为"htttp://www.baidu.com/x"，不能找到正确的路径
console.log(test.getAttribute('href')
// 结果为"/xxx"，这种方法可以找到正确的路径
```
#### 修改事件处理函数
* 修改`div.onclick`

`div.onclick`默认值为`null`,默认点击`div`不会发生任何事件，如果把`div.onclick`修改为一个函数`fn`, 点击`div`的时候，就会调用`fn`。
```
div1.onclick = ()=>{console.log('hi'}
// 事实上的代码为
div1.onclick.call(div1, event)
```
其中`fn.call(div, event)`的`div`会当成`this`, `event`包含了点击事件的所有信息，例如坐标等等

* 修改`div.addEventListener`

`div.addEventLister`可以添加多个函数给一个元素中，是`div.onclick`的加强版

#### 修改内容
修改文本内容
```
div.innerText = 'xxx'
div.textContent = 'xxx'
```
修改HTML内容
```
div.innerHTML =  '<span>信息</span>' // 但是有限制字符
```
修改标签
```
div.innerHTML = ''  // 先清除
div.appendChild(div2)  // 再添加内容
```
修改父节点
将原先的子节点移动到新的父节点里面
```
newParent.appendChild(div)
```
### 查看
#### 查看父节点
```
node.parentNode
// 或者
node.parentElement
```
#### 查看祖先节点
```
node.parentNode.parent.Node
```
#### 查看子节点
```
node.childNodes // 不推荐使用这个，回车也会算作节点

node.children // 推荐使用这个
```
当子节点发生变化的时候，两者都会更新子节点的信息。
#### 查看同辈节点
* 查看同辈所有节点
```
node.parentNode.childNode // 排除自己本身
node.parentNode.children // 排除自己本身
```
* 查看老大(第一个节点)
```
node.firstChild
```
* 查看老小(最后一个节点)
```
node.lastChild
```
* 查看上一个哥哥/姐姐(上一个节点)
```
node.previousSibling
```
* 查看下一个弟弟/妹妹(下一个节点)
```
node.nextSiblings
```
#### 查看div里面所有的元素
```
travel = (node, fn) => {
    fn(node)
    if(node.children){
        for(let i = 0; i < node.children.length ; i++){
            travel(node.children[i], fn)
        }
    }
}

travel(div1, (node)=>console.log(node))
```

### 更多信息
>[为什么说DOM操作很慢](https://segmentfault.com/a/1190000004114594)

>[But why's the browser DOM still so slow after 10 years of effort?](https://stackoverflow.com/questions/6817093/but-whys-the-browser-dom-still-so-slow-after-10-years-of-effort)

>[DOM 网道](https://wangdoc.com/javascript/dom/general.html#navbar)