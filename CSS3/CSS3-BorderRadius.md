## 目录
1. [介绍](#介绍)
2. [优点](#优点)
3. [使用方法](#使用方法)
4. [数值设置](#数值设置)
5. [实现原理](#实现原理)
6. [更多信息](#更多信息)

### 介绍
`border-radius`属性是一个最多制定四个边框的圆角。

border-radius的数值的三种表示方法：`px`, `%`, `em`
### 优点
1. 减少网站的维护工作量
2. 提高网站性能
3. 增加了视觉
### 使用方法
方法一: 设置四个方向的值
* 一个值`5px`: 四个角都是5px

* 两个值`5px 10px`: 左上、右下5px，右上、左下10px

* 三个值`5px 10px 15px`: 左上5px，右上、左下10px，右下15px

* 四个值`5px 10px 15px 20px`: 左上5px， 右上10px，右下15px，左下20px
```
  border-radius: 30px 30px 30px 30px;
```
![](https://user-gold-cdn.xitu.io/2020/7/28/17392d30e2342f2c?w=262&h=191&f=png&s=6557)

方法二：只设置一个值
```
   border-radius: 30px;
```
![](https://user-gold-cdn.xitu.io/2020/7/28/17392d2f2ef8250e?w=227&h=118&f=png&s=1741)

方法三：省略部分值
与padding和margin一样，border-radius同样可以省略部分值，省略时同样是采用对角线相等的原则
```
  border-radius: 50px 0px
```

![](https://user-gold-cdn.xitu.io/2020/7/28/17392d31d3b6fb39?w=225&h=115&f=png&s=3898)
### 数值设置
使用px表示数值，圆角的弧度一般都是一个圆形的部分弧形。
```
// 例如，在设置一个以30px为半径的圆形
.circle{
    width: 60px;
    height: 60px;
    border-radius: 30px;
}
```
使用%表示数值，如果对象的宽和高是一样的，那判断方法与第一点一致。如果宽高不一样，就是以对象的宽高乘以百分数后得到的值r1和r2，作为两条半径绘制出来的椭圆产生的弧度。
```
.circle {
     height: 100px;
     width: 200px;
     border-radius: 50%;
}
```
使用em表示数值
```
border-radius:2em;
//  等价于
border-top-left-radius:2em;
border-top-right-radius:2em;
border-bottom-right-radius:2em;
border-bottom-left-radius:2em
```
### 实现原理
`
先来个简单的：`border-top-left-radius：5px`；

实际上就是创建一个圆半径为5，然后将这个圆放到左上角，进行相切，红色部分就是去掉的部分

![](https://user-gold-cdn.xitu.io/2020/7/28/17392f02704aaeff?w=308&h=192&f=png&s=3580)

那么两个值呢：border-top-left-radius：5px 10px；（如果是border-radius：5px 10px；就不一样了，看清楚了）就是椭圆的水平半径为5px，垂直半径为10px

![](https://user-gold-cdn.xitu.io/2020/7/28/17392f03a945fed9?w=301&h=195&f=png&s=5069)
### 更多信息
> [css3之border-radius理解](https://www.cnblogs.com/happymental/p/7891725.html)