## 目录
1. [HTML历史](#HTML历史)
2. [HTML学习方法](#HTML学习方法)
3. [HTML起手式](#HTML起手式)
4. [章节标签](#章节标签)
5. [全局属性 ](#全局属性)
6. [内容标签](#内容标签)
7. [重置HTML默认样式](#重置HTML默认样式)
8. [更多信息](#更多信息)

### HTML历史
`1990`年左右由`Tim Berners-Lee`发明，他自己写了第一个浏览器和服务器，用浏览器访问了服务器。他同时发明了 `WWW`,`HTML`,`HTTP`和`URL`

### HTML学习方法
* 学习语法，怎么编写代码
* 学习如何调试，找出错误
* 在正确的地方查询资料
* 了解标准的制定者，权威标准

### HTML起手式
`HTML`起手式为`Emmet`感叹号, `<!DOCTYPE html>`


### 章节标签
* `h1~h6` 为标题
* `section` 为章节
* `article` 为文章
* `p` 为段落
* `header` 为头部
* `footer` 为脚部
* `main` 为主要内容
* `aside` 为旁支内容
* `div` 为划分大的部分

### 全局属性
* `class`是一个以空格分隔的元素的类名（classes ）列表
* `contenteditable`可以使任何一个`HTML`元素能够被编辑
* `hidden`隐藏任何`HTML`元素
* `id`慎用`Id`,不到万不得已不用`Id`, `Id`元素也能在`JS`被调用
* `style`每个`HTML`元素都有`style`属性
* `tabindex`给`HTML`设置`tabindex`属性，可以用来控制Tab键的顺序。`tabindex=0`为最后顺序，`-i`为忽略
* `title`显示完整内容

### 内容标签
* `ol + li`, `orderst list`为有顺序的列表，`list`为列表中的某一项
* `ul + li`, `unorder list`为无顺序的列表，`list`为列表中的某一项
* `dl + dt + dd`, `description list`为描述列表,`description tem`为描述的对象，`description data`为描述的内容
* `pre`, `preformatted`为该元素中的文本通常按照原文件中的编排，以等宽字体的形式展现出来，文本中的空白符（比如空格和换行符）都会显示出来
* `hr`, `Horizontal rule`为分割线
* `br`, `break`为换行
* `a`, `anchor`为链接指向
* `em`, `emphasis`标记出需要用户着重阅读的内容
* `strong`, 表示文本十分重要，一般用粗体显示
* `code` 里面的字都是等宽的
* `quote` 为引用
* `blockquote` 为块级引用，代表其中的文字是引用内容

### 重置HTML默认样式
因为`HTML`有默认的样式，所以需要重置样式
```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*::before,
*::after {
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
input,
button {
  font-family: inherit;
}
ol,
ul {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
```

### 更多信息
> [HTML书籍](https://wangdoc.com/html/index.html)
