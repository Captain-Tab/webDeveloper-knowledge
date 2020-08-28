## 目录
1. [边框效果](#边框效果)
2. [灯光效果](#灯光效果)
3. [刷新效果](#刷新效果)
4. [更多信息](#更多信息)

### 边框效果
```
<div id="draw-border">
  <button>鼠标放这里</button>
</div>
```
```
#draw-border {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
button {
  border: 0;
  background: none;
  color: #4361ee;
  font-weight: bold;
  position: relative;
  outline: none;
  padding: 10px 20px;
  box-sizing: border-box;
}

button::before, button::after {
  box-sizing: inherit;
  position: absolute;
  content: '';
  border: 2px solid transparent;
  width: 0;
  height: 0;
}
button::after {
  bottom: 0;
  right: 0;
}
button::before {
  top: 0;
  left: 0;
}
button:hover::before, button:hover::after {
  width: 100%;
  height: 100%;
}
button:hover::before {
  border-top-color: #4361ee;
  border-right-color: #4361ee;
  transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
}
button:hover::after {
  border-bottom-color: #4361ee;
  border-left-color: #4361ee;
  transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
}
```
效果图为

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4a6fb8244d54d2b9ed2caa430dacf4c~tplv-k3u1fbpfcp-zoom-1.image)

### 灯光效果
```
<div id="draw-border">
  <button>鼠标放这里</button>
</div>
```
```
#draw-border {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  border: 0;
  background: none;
  color: #4361ee;
  font-weight: bold;
  position: relative;
  outline: none;
  padding: 10px 20px;
  box-sizing: border-box;
}

button::before, button::after {
  box-sizing: inherit;
  position: absolute;
  content: '';
  border: 2px solid transparent;
  width: 0;
  height: 0;
}

button::after {
  bottom: 0;
  right: 0;
}

button::before {
  top: 0;
  left: 0;
}

button:hover::before, button:hover::after {
  width: 100%;
  height: 100%;
}

button:hover::before {
  border-top-color: #4361ee;
  border-right-color: #4361ee;
  transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
}

button:hover::after {
  border-bottom-color: #4361ee;
  border-left-color: #4361ee;
  transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
}
```
效果为

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/389a7cb4be254984b8808d8cee5688ae~tplv-k3u1fbpfcp-zoom-1.image)

### 刷新效果
```
<div id="frozen-btn">
  <button class="green">鼠标放这里</button>
  <button class="purple">鼠标放这里</button>
</div>
```

```
#frozen-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  border: 0;
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
  padding: 15px 50px;
  border-radius: 50px;
  color: white;
  outline: none;
  position: relative;
}

button:before{
  content: '';
  display: block;
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
  background-size: 210% 100%;
  background-position: right bottom;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom:0;
  right:0;
  left: 0;
  border-radius: 50px;
  transition: all 1s;
  -webkit-transition: all 1s;
}

.green {
   background-image: linear-gradient(to right, #25aae1, #40e495);
   box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}

.purple {
   background-image: linear-gradient(to right, #6253e1, #852D91);
   box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
}
  
.purple:hover:before {
  background-position: left bottom;
}

.green:hover:before {
  background-position: left bottom;
}
```

效果为

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c3fd4a6141e40a589320b1b83ab1946~tplv-k3u1fbpfcp-zoom-1.image)


### 更多信息
> [CSS八种让人眼前一亮的HOVER效果](https://juejin.im/post/6861501624993447950#heading-20)

> [8 Amazing HTML Button Hover Effects](https://www.blog.duomly.com/html-button-hover-effects/)