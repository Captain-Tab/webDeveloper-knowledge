## 目录
1. [Flex布局](#Flex实现)
2. [Grid布局](#Grid实现)
3. [Float布局](#Float实现)
4. [Table布局](#Table实现)

### Flex实现
原理： 使用flex弹性布局和flex-wrap来设置
```
//html代码
<div class="box">
      <ul class="box-inner">
        <li>九宫格1</li>
        <li>九宫格2</li>
        <li>九宫格3</li>
        <li>九宫格4</li>
        <li>九宫格5</li>
        <li>九宫格6</li>
        <li>九宫格7</li>
        <li>九宫格8</li>
        <li>九宫格9</li>
      </ul>
    </div>
// css代码
.box {
  position: relative;
  width: 100%;
  height: 600px;
}
.box-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box-inner > li {
  overflow: hidden;
  flex-grow: 1;
  background-color: darkorange;
  text-align: center;
  color: #ffffff;
  width: 33%;
  height: 200px;
  line-height: 200px;
  margin: 1px;
  text-align: center;
}
```
效果图

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc81cc0c13144dd484819cfa9d01fbcf~tplv-k3u1fbpfcp-watermark.image)

### Grid实现
原理：使用grid创建网格布局，划分为3x3的等分布局
```
//html代码
<div class="box">
      <div>九宫格1</div>
      <div>九宫格2</div>
      <div>九宫格3</div>
      <div>九宫格4</div>
      <div>九宫格5</div>
      <div>九宫格6</div>
      <div>九宫格7</div>
      <div>九宫格8</div>
      <div>九宫格9</div>
    </div>
//css代码
.box {
  display: grid;
  height: 600px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
 grid-template-rows: repeat(3, 1fr);
}
.box > div {
  width: 98%;
  margin: 1%;
  background-color: deeppink;
  text-align: center;
  line-height: 200px;
}
.box > div:nth-child(even) {
  background-color: black;
  color: #fff;
}
```
效果图

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1afce9026628474cba22ae2557cf75fc~tplv-k3u1fbpfcp-watermark.image)

### Float实现
原理：利用float布局和31%的百分比设置宽和高
```
//html代码
<div class="box">
  <ul class="box-inner">
    <li>九宫格1</li>
    <li>九宫格2</li>
    <li>九宫格3</li>
    <li>九宫格4</li>
    <li>九宫格5</li>
    <li>九宫格6</li>
    <li>九宫格7</li>
    <li>九宫格8</li>
    <li>九宫格9</li>
  </ul>
</div>
//css代码
.box {
  position: relative;
  width: 100%;
  height: 600px;
}
.box-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.box-inner > li {
  position: relative;
  float: left;
  width: 31%;
  height: 31%;
  margin: 1%;
  list-style-type: none;
  background-color: springgreen;
  text-align: center;
  line-height: 200px;
}
.box-inner > li:nth-child(odd) {
  background-color: silver;
}
```
效果图

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6d8561a255d4331bbbe24e28e75a191~tplv-k3u1fbpfcp-watermark.image)

### Table实现
原理1：使用原生table表格实现九宫格
缺点：单元之间的间隔使用`border-spacing`实现，不支持百分比，设置后为添加单元四周的间隔
```
//html代码
<div class="box">
  <table class="box-inner">
    <tbody>
      <tr>
        <td>九宫格1</td>
        <td>九宫格2</td>
        <td>九宫格3</td>
      </tr>
      <tr>
        <td>九宫格4</td>
        <td>九宫格5</td>
        <td>九宫格6</td>
      </tr>
      <tr>
        <td>九宫格7</td>
        <td>九宫格8</td>
        <td>九宫格9</td>
      </tr>
    </tbody>
  </table>
</div>
//css代码
.box {
  position: relative;
  width: 100%;
  height: 600px;
}
.box-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 10px;
  border-spacing: 0.57em;
  font-size: 20px;
  empty-cells: hide;
  table-layout: fixed;
}
.box-inner > tbody > tr > td {
  text-align: center;
  background-color: burlywood;
  overflow: hidden;
}
```
效果图

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc8469b71f15484b8d509b0842e0ca97~tplv-k3u1fbpfcp-watermark.image)

原理2：模仿table表格，模拟tr+td的方式实现,减少重置table某些样式
缺点：对margin值无反应，响应padding属性，内容溢出时会自动撑开父元素

* 包含三个li,li包含三个div
* ul使用`display:table`,模拟`<table>`
* li使用`display: table-row`, 模拟`<tr>`
* li包含的三个div使用`display: table-cell`,模拟`<td>`和`<th>`

```
//html代码
<div class="box">
  <ul class="box-inner">
    <li>
      <div>九宫格1</div>
      <div>九宫格2</div>
      <div>九宫格3</div>
    </li>
    <li>
      <div>九宫格4</div>
      <div>九宫格5</div>
      <div>九宫格6</div>
    </li>
    <li>
      <div>九宫格7</div>
      <div>九宫格8</div>
      <div>九宫格9</div>
    </li>
  </ul>
</div>
//csss代码
.box {
  position: relative;
  width: 100%;
  height: 600px;
}
.box-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  margin: 10px;
}
.box-inner li {
  display: table-row;
}
.box-inner li div {
  display: table-cell;
  width: 30%;
  background-color: crimson;
  border: 1px solid black;
  line-height: 200px;
  text-align: center;
  font-size: 20px;
}
.box-inner li div:nth-child(even) {
  background-color: seashell;
}
```
效果图

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fb5113ad88a479e9df2312a6a85abe5~tplv-k3u1fbpfcp-watermark.image)
