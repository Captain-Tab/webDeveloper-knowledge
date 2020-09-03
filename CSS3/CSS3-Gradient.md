## 目录
1. [介绍](#介绍)
2. [线性渐变](#线性渐变)
3. [径向渐变](#径向渐变)
6. [更多信息](#更多信息)

### 介绍
渐变是从一种颜色平滑地淡化到另一种颜色的图像，可以让你在两个或多个指定的颜色之间显示平稳的过渡。这些通常用于背景图像，按钮和许多其他事物中的细微着色。 CSS3 Gradient分为linear-gradient(线性渐变)和radial-gradient(径向渐变)

### 线性渐变
语法
```
linear-gradient( [<point> || <angle>,]? <stop>, <stop> [, <stop>]* }  //标准写法
-webkit-linear-gradient( [<point> || <angle>,]? <stop>, <stop> [, <stop>]* }  //在WebKit浏览器下的应用
-moz-linear-gradient( [<point> || <angle>,]? <stop>, <stop> [, <stop>]* )  //在Mozilla浏览器下的应用
-o-linear-gradient([<point> || <angle>,]? <stop>, <stop> [, <stop>]);  //在Opera浏览器下的应用
```
参数分析
```
<angle>是角度，单位为deg
point ： 第一个参数表示线性渐变的方向，可用关键字top、left、bottom、right，to top是从上到下、to left是从左到右，如果定义成to left top，那就是从左上角到右下角（to可省略）。
<stop > = <color> [ <length> | <percentage>]:
<color>：指渐变的起止颜色。
<length>：用长度值指定起止色位置，不允许负值。
<percentage>：用百分比指定起止色位置
```
实例1
```
background:linear-gradient(left top,yellow,blue);
background:-webkit-linear-gradient(left top,yellow,blue);
background:-moz-linear-gradient(left top,yellow,blue);
background:-o-linear-gradient(left top,yellow,blue);
```
实例2
```
background: linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);   
background: -webkit-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);   
background: -moz-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);   
background: -o-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet);
```
使用角度

角度是指水平线和渐变线之间的角度，逆时针方向计算。换句话说，0deg 将创建一个从下到上的渐变，90deg 将创建一个从左到右的渐变。注意：有部分浏览器使用了旧的标准，即 0deg 将创建一个从左到右的渐变，90deg 将创建一个从下到上的渐变。换算公式 90 - x = y 其中 x 为标准角度，y为非标准角度。

重复的线性渐变
````
background: -webkit-repeating-linear-gradient(red, yellow 10%, green 15%);
background: -o-repeating-linear-gradient(red, yellow 10%, green 15%); 
background: -moz-repeating-linear-gradient(red, yellow 10%, green 15%); 
background: repeating-linear-gradient(red, yellow 10%, green 15%);
````
### 径向渐变

径向渐变由它的中心定义。为了创建一个径向渐变，你也必须至少定义两种颜色结点。颜色结点即你想要呈现平稳过渡的颜色。同时，你也可以指定渐变的中心、形状（原型或椭圆形）、大小。默认情况下，渐变的中心是 center（表示在中心点），渐变的形状是 ellipse（表示椭圆形），渐变的大小是 farthest-corner（表示到最远的角落）

语法
```
 -moz-radial-gradient([<position> || <angle>,]? [<shape>] [<size>,]? <color-stop>, <color-stop>[, <color-stop>]*);
 -webkit-radial-gradient([<position> || <angle>,]? [<shape>] [<size>,]? <color-stop>, <color-stop>[, <color-stop>]*);

 -o-radial-gradient([<position> || <angle>,]? [<shape>] [<size>,]? <color-stop>, <color-stop>[, <color-stop>]*);

 radial-gradient([<position> || <angle>,]? [<shape>] [<size>,]? <color-stop>, <color-stop>[, <color-stop>]*);
```
参数
```
<position>：用来定义径向渐变的圆心位置，类似background-position，默认为center。可用关键字top、left、bottom、right、center、<length>、<percentage>。

<angle>是角度，单位为deg

<shape>：定义径向渐变的形状，有两个可选值“circle”和“ellipse”

<size>：用来确定径向渐变的结束形状大小，默认值为“farthest-corner”，其他值：
closest-side：指定径向渐变的半径长度为从圆心到离圆心最近的边； closest-corner：指定径向渐变的半径长度为从圆心到离圆心最近的角； farthest-side：指定径向渐变的半径长度为从圆心到离圆心最远的边； farthest-corner：指定径向渐变的半径长度为从圆心到离圆心最远的角；

<stop > = <color> [ <length> | <percentage>]:
<color>：指渐变的起止颜色。
<length>：用长度值指定起止色位置，不允许负值。
<percentage>：用百分比指定起止色位置。
```

实例1：颜色结点均匀分布的径向渐变
```
 background: -webkit-radial-gradient(white, green, orange);
 background: -o-radial-gradient(white, green, orange);
 background: -moz-radial-gradient(white, green, orange); 
 background: radial-gradient(white, green, orange);
```
实例2：结点不均匀的径向渐变
```
background: -webkit-radial-gradient(white 2%, green 10%, orange 50%);
background: -o-radial-gradient(white 2%, green 10%, orange 50%);
background: -moz-radial-gradient(white 2%, green 10%, orange 50%); 
background: radial-gradient(white 2%, green 10%, orange 50%);
```
实例3：定义形状
```
background: -webkit-radial-gradient(circle,white, green, orange);
background: -o-radial-gradient(circle,white, green, orange);
background: -moz-radial-gradient(circle,white, green, orange); 
background: radial-gradient(circle,white, green, orange);
```