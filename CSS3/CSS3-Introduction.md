## 目录
1. [CSS3课程简介](#CSS3课程简介)
2. [CSS3课程基础](#CSS3课程基础)
3. [简单实例](#简单实例)
4. [更多信息](#更多信息)

### CSS3课程简介
1. 第一章: 环境搭建，伪类选择器，伪元素
2. 第二章: CSS3的变形，画多变形，星形
3. 第三章: CSS3的颜色，透明属性，颜色模式，渐变
4. 第四章: CSS3的过渡属性，简单的过程动画
5. 第五章: CSS3的动画，复杂的CSS动画
6. 第六章: 文字排版的一些新特性

### CSS3课程基础
* `HTML`: 达到能看懂的基本结构，比如`span`,`div`
* `CSS`: 了解`CSS`基本结构，知道如何设置字体颜色，背景
* 目标人群: 已经从事`web`前端开发，或者想从事`web`前端开发

### 简单实例
```
// HTML代码
<body>
   <img src="/xxxx.jpg"/>
</body>

// CSS代码
body{
    text-align:center;
}
img{
    border-radius: 50%；
    transition: all 0.5;
    -webkit-transition: all 0,5s; // 兼容谷歌浏览器内核
    -o-transition: all 0.5s; // 兼容opera浏览器内核
    cursor: pointer;
}
img:hover{
    transform:scale(1.1)
}
```

### 更多信息
> [CSS3免费视频](https://www.bilibili.com/video/av37908995)