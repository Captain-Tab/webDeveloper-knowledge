## 目录
1. [创始人布兰登](#创始人布兰登)
2. [JavaScript的诞生](#JavaScript的诞生)
3. [浏览器大战](#浏览器大战)
4. [JavaScript兴起](#JavaScript兴起)
5. [JavaScript的13个设计缺陷](#JavaScript的13个设计缺陷)
6.  [更多信息](#更多信息)

### 创始人布兰登
`Brendan Eich 1961`年生于美国，`1995`加入`NetScape`网景公司，为浏览器开发了`JavaScript`

### JavaScript的诞生
`Brendan Eich`布兰登按照公司要求设计了`JS`的最初版本，开始命名为`Mocha`,然后为`LiveScript`,最后命名`JavaScript`。

### 浏览器大战
`1996`年`8`月`IE3`发布，同年`11`月，`NetScape`网景提交语言标准，`JS`语言标准为`ECMAScript`

#### 网景之死
微软`IE`浏览器被捆绑进了`Windows`。`1998`年,`NetScape`网景市场份额败退，宣布开源，年底被美国在线`AOL`收购

#### IE6如日中天
`2001`年, `IE 6`随着`WindowsXP`发布，席卷全球，市场占用率为`80%`以上，`IE 6`始终是中国前端开发者的恶梦

#### Chrome横空出世
`2008`年，`Chrome`发布，`2016`年`Chrome`全球份额`62%`

#### 移动市场兴起
`2010`年，`iPhone4`发布，开始智能手机的时代。`2016`年，天猫宣布不再支持`IE 6,IE 7和IE 8`。从此，让中国前端摆脱了`IE`十年的恐怖支配，前端飞速发展

#### ECMAScript标准的制定
* `1997`年`6`月，第一版`ECMAScript`发布
* `1999`年`12`月，第三版`ECMAScript`发布，使用最广
* `2009`年`12`月，第五版`ECMAScript`发布
* `2015`年`12`月，第六版`ECMAScript`发布
* 之后每年更新一个版本
* `ECMAScript`是纸上的标准，有滞后性

### JavaScript兴起
* `2004`年，谷歌发布`Gmail`在线网页
* `2005`年，谷歌命名`Ajax`技术
* 此后，前端技术正式出现
* `2006`年，`jQuery`发布

#### JS版本
* `ES 3`, `IE 6`支持, 评价:垃圾
* `ES 5`, 评价:还是垃圾
* `ES 6`, 大部分浏览器支持，兼容之前的特性。评价:一半垃圾

#### 中国的前端
`2010`年左右，中国才有专门的前端岗位

#### JS之父对JS的评价
它的优秀之处并非原创，它的原创之处并不优秀


### JavaScript的13个设计缺陷

1. 设计阶段过于仓促\
`Javascript`的设计，其实只用了十天。而且，设计师是为了向公司交差，本人并不愿意这样设计
2. 没有先例\
`Javascript`同时结合了函数式编程和面向对象编程的特点，这很可能是历史上的第一例。
3. 过早的标准化\
`Javascript`的发展非常快，根本没有时间调整设计。
4. 不适合开发大型程序\
`Javascript`没有名称空间（`namespace`），很难模块化；没有如何将代码分布在多个文件的规范；允许同名函数的重复定义，后面的定义可以覆盖前面的定义，很不利于模块化加载。
5. 非常小的标准库\
`Javascript`提供的标准函数库非常小，只能完成一些基本操作，很多功能都不具备。
6. `null`和`undefined`\
`null`属于对象（`object`）的一种，意思是该对象为空；`undefined`则是一种数据类型，表示未定义

实例代码
```
typeof null; // object
typeof undefined; // undefined
```
两者非常容易混淆，但是含义完全不同。
```
var foo;
alert(foo == null); // true
alert(foo == undefined); // true
alert(foo === null); // false
alert(foo === undefined); // true
```
在编程实践中，`null`几乎没用，根本不应该设计它。
7. 全局变量难以控制\
`Javascript`的全局变量，在所有模块中都是可见的；任何一个函数内部都可以生成全局变量，这大大加剧了程序的复杂性。

实例代码
```
a = 1;
(function(){
    b=2;
   alert(a);
})(); // 1

alert(b); //2
```
8. 自动插入行尾分号
`Javascript`的所有语句，都必须以分号结尾。但是，如果你忘记加分号，解释器并不报错，而是为你自动加上分号。有时候，这会导致一些难以发现的错误。

比如，下面这个函数根本无法达到预期的结果，返回值不是一个对象，而是`undefined`

```
function(){
return
  {
    i=1
   };
}
```
原因是解释器自动在`return`语句后面加上了分号。
```
function(){
  return;
      {
        i=1
      };
   }
```
9. 加号运算符

`+`号作为运算符，有两个含义，可以表示数字与数字的和，也可以表示字符与字符的连接。
```
alert(1+10); // 11
alert("1"+"10"); // 110
```
如果一个操作项是字符，另一个操作项是数字，则数字自动转化为字符。
```
alert(1+"10"); // 110
alert("10"+1); // 101
```
这样的设计，不必要地加剧了运算的复杂性，完全可以另行设置一个字符连接的运算符。
10. `NaN`\
`NaN`是一种数字，表示超出了解释器的极限。它有一些很奇怪的特性：
```
NaN === NaN; //false
NaN !== NaN; //true
alert( 1 + NaN ); // NaN
```
与其设计`NaN`，不如解释器直接报错，反而有利于简化程序。

11. 数组和对象的区分\
由于`Javascript`的数组也属于对象（`object`），所以要区分一个对象到底是不是数组，相当麻烦。`Douglas Crockford`的代码是这样的：
```
if ( arr &&
    typeof arr === 'object' &&
    typeof arr.length === 'number' &&
    !arr.propertyIsEnumerable('length')){
     alert("arr is an array");
   }
```
12. `==` 和 `===`\
`==`用来判断两个值是否相等。当两个值类型不同时，会发生自动转换，得到的结果非常不符合直觉。
```
　"" == "0" // false
　0 == "" // true
　0 == "0" // true
　false == "false" // false
　false == "0" // true
　false == undefined // false
　false == null // false
　null == undefined // true
　" \t\r\n" == 0 // true
```
因此，推荐任何时候都使用"==="（精确判断）比较符。

13. 基本类型的包装对象\
`Javascript`有三种基本数据类型：字符串、数字和布尔值。它们都有相应的建构函数，可以生成字符串对象、数字对象和布尔值对象。
```
new Boolean(false);
new Number(1234);
new String("Hello World");
```
与基本数据类型对应的对象类型，作用很小，造成的混淆却很大。
```
alert( typeof 1234); // number
alert( typeof new Number(1234)); // object
```

### 更多信息
>[维基百科 Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich)

>[Firefox纪录片](https://www.bilibili.com/video/av15989846/)

>[Chrome广告](https://www.bilibili.com/video/av3745910/)

>[本段信息来源：阮一峰，标题：Javascript的10个设计缺陷 ](http://www.ruanyifeng.com/blog/2011/06/10_design_defects_in_javascript.html)

>[JavaScript诞生记](http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html)