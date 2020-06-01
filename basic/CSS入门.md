## 目录
1. [CSS的历史](#CSS的历史)
2. [CSS基本单位](#CSS基本单位)
3. [CSS语法](#CSS语法)
4. [CSS层叠式概念](#CSS层叠式概念)
5. [CSS调试 ](#CSS调试)
6. [NormalFlow文档流](#NormalFlow文档流)
7. [overflow溢出](#overflow溢出)
8. [脱离文档流](#脱离文档流)
9. [CSSModel(盒模型)](#CSSModel盒模型)
10. [margin合并](#margin合并)
11. [更多信息](#更多信息)



### CSS的历史
`HTML`发明者李爵士的挪威同事 [Håkon Wium Lie](https://en.wikipedia.org/wiki/H%C3%A5kon_Wium_Lie) 简称赖先生, `1994`年以提出`CSS`而闻名。

#### CSS的版本
其中以`2004-2011`年期间的`CSS2.1`版本是最为广泛运行的版本，`CSS3`为目前流行的版本

#### CSS学习方法
* 先熟悉`CSS`，再死记`CSS`规则
* `CRM(copy-run-modify)`学习方法
* 学习语法，怎么编写代码
* 学习如何调试，找出错误
* 在正确的地方查询资料
* 了解标准的制定者，权威标准

#### CSS浏览器兼容性查询网站
> https://caniuse.com/#comparison
### CSS基本单位
#### 长度单位 
* `pixel`像素
* `em`相对于自身`font-size`的倍数
* 百分数
* 整数
* `rem`新增的一个相对单位
* `vw`和`vh`等于`viewport`宽度的`1/100`和`viewport`高度的`1/100`

#### 颜色 
* 十六进制 `#FF6600` 或者 `#F60`
* `RBGBA`颜色`rgb(0,0,0)`或者`rgba(0,0,0,1)`
* `hsl`颜色`hsl(360,100%,100%)`
### CSS语法 
#### 语法一：样式语法
```
  p-选择器 {
    color-属性名:red-属性值 
    /*设置字体颜色*/-注释
  }
```
注意事项
 1. 所有符号都是英文符号
 2. 区分大小写，`A`和`a`是不同的东西
 3. 没有`//`注释
 4. 最后一个分号可以省略，但是不建议省略
 5. 写错没有任何错误提示
 

#### 语法二：@语法
 ```
  @charset "UTF-8";
  @import url(2.css);
  @media (min-width: 100px) and (max-width: 200px) {
   语法一
    }
```
注意事项
1. `@charset`必须放在第一行
2. 前面两个`@`必须以分号;结尾
3. `charset`是字符集的意思，但是`UTF-8`是字符编码`Encoding`,这是历史遗留问题
### CSS层叠式概念
* 文件层叠，可以用多个文件进行层叠
* 层叠特性使得`CSS`可以被灵活使用，带来便利的同时也留下了很多问题，导致`CSS`被人吐槽
* 样式层叠, 可以多次对同一选择器进行样式声明，例如
```
    p{
      font-size: 50px;
    }
    p{
      color: yellow;
    }
```
* 选择器层叠
```
 <p class="para"></p>
 ****
  <style>
    p{
      font-size: 50px;
    }
    p{
      color: yellow;
    }
    .para{
      color: blue;
    }
  </style>
```
### CSS调试
#### 方法一
 1. 使用[W3C validator](https://validator.w3.org/) 在线检查
 2. 使用`VS Code`或者`WebStorm`查看颜色
 3. 使用`Developer tools`进行查看

#### 方法二：Border调试方法
1. 怀疑某个元素有问题，就添加`border`给这个元素
2. 如果`border`没有出现，就表示语法或者选择器错误了
3. 如果`bordeer`出现，查看`border`是否符合预期
4. 有时候`border`会占用空间，可以使用`outline`来代替，`outline`不占用像素
5. 解决问题后，移除`boder`
6. `CSS`的`border`调试方法相当于`JS`的`log`调试方法，是很`Handy`的测试方法
### NormalFlow文档流
#### CSS重要概念
* `Normal flow`文档流
* 块，内联，内联块
* `margin`合并
* `CSS box model`(推荐学习`Border box`)

#### 流动方向 
* `inline`元素从左到右，到达最右边，才换行
* `inline-block`也是从左到右
* `block`元素从上到下，每个都另起一行

#### 宽度
* `inline`宽度为内部`inline`元素的和，不能用`width`，内部不能有`block`元素
* `block`默认自动计算宽度，可用`width`指定，永远不要写宽度`100%`
* `div`的宽度默认接近`100%`，不是`100%`
* `inline-block`跟`block`元素类似，可以设置`height`

#### 高度
* `inline`高度由`line-height`间接确定，跟`height`无关
* `block`高度由内部文档流元素确定，可以设置`height`
* `inline-block`跟`block`类似，可以设置`height`
### overflow溢出
#### 当内容大于容器
* 当内容的宽度或者高度大于容器，会溢出
* 可以使用`overflow`来设置是否显示滚动条
* `auto` 是灵活设置
* `scroll`是永远显示(有滚动条的情况下，内联元素只在第一屏出现)
* `hidden`是直接隐藏溢出部分
* `visible`是直接显示溢出部分
* `overflow`可以分为`overflow-x`和`overflow-y`
### 脱离文档流
#### 回忆一下
* `block`高度是由内部文档流元素决定，可以设置`height`
* 如果有些元素可以不在文档流中，不影响`block`高度

#### 哪些元素脱离文档流
* `float`
* `position : absolute/fixed`

#### 怎么让元素不脱离文档流
* 不要用上面属性就不脱离了
### CSSModel盒模型
#### content-box内容盒
* 内容就是盒子的边界
* `cotent-box` `width`=内容宽度

#### border-box边框盒
* 边框才是盒子的边界
* `border-box` `width` = 内容宽度 + `padding` = `border`

#### 比较
`border-box` 更好用，比如同时使用`padding`,`width`,`border`来测试
![](https://user-gold-cdn.xitu.io/2020/1/31/16ffb99ce37c1187?w=744&h=409&f=png&s=65600)

![](https://user-gold-cdn.xitu.io/2020/1/31/16ffb9a3f6654aff?w=545&h=449&f=png&s=23984)
### margin合并
#### 哪些情况会合并
* 父子 `margin`合并，例如子`margin top`和父`margin top`会合并，只有上下会重叠，左右不影响
* 兄弟 `margin`合并，例如`margin top`和`margin bottom`会合并

#### 如何阻止合并
* 父子合并使用`padding/border`挡住
* 父子合并使用`overflow:hidder`挡住
* 父子合并使用`display:flex`
* 父子合并是符合预期
* 父子合并可以用`inline-block`消除
* 注意更新
### 更多信息
#### 查询知识 
* `google`搜索: 关键词`加MDN`
* [css trick](https://css-tricks.com/)
* [张鑫旭的博客](https://www.zhangxinxu.com/wordpress/)
* 不推荐任何书籍，`HTML`和`CSS`以练习为主

#### 练习资源
* 国外推荐 [freepik](https://www.freepik.com/search?query=web&type=psd)搜索PSD Web
* 国内推荐[365](https://cn.365psd.com/free-psd/ui-kits)搜索UI套件
* 或者搜索免费PSD
* 效果图可以参考[设计师社区](https://dribbble.com/)
* 或者模仿其他网站

#### 标准制定者
* [W3C](https://www.w3.org/)
* [CSS SPEC­I­FI­CA­TIONS](https://www.w3.org/Style/CSS/specs.en.html)
* [CSS2.1 中文版](http://www.ayqy.net/doc/css2-1/cover.html)

