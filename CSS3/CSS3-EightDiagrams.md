## 目录
1. [画八卦图原理](#画八卦图原理)
2. [实现八卦图](#实现八卦图)
3. [八卦图代码](#八卦图代码)
4. [画宇智波家族](#画宇智波家族)

### 画八卦图原理
之前的学习，我们学到了伪类和`border-radius`的使用，这次我们再来利用这两个特性来实现八卦图的制作。利用`CSS`绘制图案的时候，首先得分析图案是如何组成的，这样写代码起来思路就会比较清晰。例如，八卦图其实是由一个圆的俩个小圆组成的。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77a99ac18fcf451ea917f4b82110b879~tplv-k3u1fbpfcp-zoom-1.image)

### 实现八卦图
1. 第一个步骤： 画出一个圆形，利用`border-left`来设置左边的半圆为黑色

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2886816ab7244f0090bf4d96d0983bd4~tplv-k3u1fbpfcp-zoom-1.image)

2. 第二个步骤： 使用伪元素`::before`来画出一个实心为白色的黑圆

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8ec8232a6354a4e8852d027a565a3d7~tplv-k3u1fbpfcp-zoom-1.image)

3. 第三个步骤： 将小圆移动到正确的位置

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c90a7b396dd48628ba884da08dd3d78~tplv-k3u1fbpfcp-zoom-1.image)

4. 第四个步骤：和上面的步骤类似，再画一个底部实心为黑色小圆，移动到正确位置

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c384017ab0d6420b9f95c517138263fb~tplv-k3u1fbpfcp-zoom-1.image)

### 八卦图代码
```
// html代码
<body>
 <div id="bagua"></div>
</body>

// CSS代码
body {
  font-family: sans-serif;
  background-color: #ccc;
}
#bagua {
  width: 150px;
  height: 300px;
  margin: 100px auto;
  border-radius: 50%;
  background-color: white;
  border-left: 150px solid black;
  position: relative;
}
#bagua::before {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  padding: 25px;
  border-radius: 50%;
  border: 50px solid black;
  left: -75px;
  background-color: white;
  top: 0;
}
#bagua::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  padding: 25px;
  border-radius: 50%;
  border: 50px solid white;
  left: -75px;
  background-color: black;
  bottom: 0;
}
```

### 画宇智波家族
利用类似的图案分析，我们再来实现宇智波家族的`logo`

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c74b611e1764f128d6623cd010acaa2~tplv-k3u1fbpfcp-zoom-1.image)

代码为
```
// html代码
<body>
    <div id="app">
      <div id="naruto"></div>
      <div id="square"></div>
      <div id="text">うちは</div>
    </div>
</body>

// CSS代码
body {
  font-family: sans-serif;
  background-color: black;
}
#app {
  position: absolute;
}
#naruto {
  width: 300px;
  height: 300px;
  margin: 100px auto;
  border-radius: 50%;
  background-color: red;
  position: relative;
  overflow: hidden;
  left: 100px;
}
#naruto::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: 15px solid black;
  background-color: white;
  top: 130px;
  left: -60px;
}
#square {
  position: relative;
  content: "";
  width: 50px;
  height: 150px;
  background: white;
  bottom: 130px;
  left: 225px;
}
#text {
  position: relative;
  width: 100%;
  color: white;
  font-size: 50px;
  left: 180px;
  bottom: 120px;
}
```