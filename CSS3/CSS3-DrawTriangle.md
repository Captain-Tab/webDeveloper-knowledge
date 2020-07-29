## 目录
1. [CSS3画三角形](#CSS3画三角形)
2. [CSS3画对话框](#CSS3画对话框)
3. [更多信息](#更多信息)

### CSS3画三角形
`CSS3`的出现让网页呈现了更多好看的效果，下面旧使用`CSS3`画三角形

首先设置一个`div`的宽度和高度都为`100px`，在设置四边宽度为`100px`和对相应的颜色
```
.triangel{
    width: 100px;
    height: 100px;
    border: 100px solid transparent;
    border-right: 100px solid red;
    border-left: 100px solid blue;
    border-top:100px solid yellow;
    border-bottom:100px solid green;
}
```
![](https://user-gold-cdn.xitu.io/2020/7/29/173980eddd42b799?w=348&h=349&f=png&s=5835)

如果设置宽度和高度为0，则会得到

![](https://user-gold-cdn.xitu.io/2020/7/29/173980eeceaeb798?w=243&h=256&f=png&s=5803)

这样的话我们就得到了四个三角形，如果我们只想要一个三角形，则可以使用`transparent`来隐藏其余的三个三角形
```
.triangle{
    width: 0px;
    height: 0px;
    border-top: 100px solid transparent;
    border-left: 100px solid transparent;
    border-bottom: 100px slid blue;
    border-right: 100px solid transparent;
}
```
![](https://user-gold-cdn.xitu.io/2020/7/29/173980efb4cd31f7?w=244&h=239&f=png&s=4903)

我们发现，三角形的底为`border`的两倍，`border-bottom`为三角形的高，则可以通过设置`border-bottom`或者`border`的值来改变底和高
```
.triangle{
    width: 0;
    height: 0;
    border: 100px solid transparent;
    border-bottom: 220px solid blue;
}
```

![](https://user-gold-cdn.xitu.io/2020/7/29/173980f09ecf73da?w=239&h=317&f=png&s=7081)4
改变`border`的值
```
.triangle{
    width: 0;
    height: 0;
    border: 60px solid transparent;
    border-bottom: 100px solid blue;
}
```
![](https://user-gold-cdn.xitu.io/2020/7/29/173980f193029dc7?w=158&h=194&f=png&s=5411)

### CSS3画对话框
原理其实就是先将一个长方形设置为圆角，然后再添加一个三角形
```
   <style>
    .main{
        background-color: #6a6;
        margin:50px auto;padding:16px;
        width:200px;height:25px;
        border-radius: 10px;line-height: 25px;
        position: relative;
    }
    .main::before{
        content:" ";
        border-left: 0px solid #6a6;
        border-top:10px solid transparent;
        border-right:10px solid #6a6;
        border-bottom:10px solid transparent;
        position: absolute;left:-10px;top:18px;
    }
    /*::before伪元素在元素前面添加内容;*/
    </style>

    <body>
        <div class="main">Hello World ! </div>
    </body>
```
![](https://user-gold-cdn.xitu.io/2020/7/29/173981f5c978c8a1?w=263&h=63&f=png&s=2344)

### 更多信息
> [如何使用css3画三角形？](https://www.php.cn/css-tutorial-410742.html)
