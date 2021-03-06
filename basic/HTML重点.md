## 目录
1. [本地运行HTML文件](#本地运行HTML文件)
2. [a标签](#a标签)
3. [iframe标签](#iframe标签)
4. [table标签](#table标签)
5. [img标签](#img标签)
6. [form标签](#form标签)
7. [input标签](#input标签)
8. [更多信息](#更多信息)

### 本地运行HTML文件
方法一，使用`HTTP Server`
1. 下载`HTTP`服务器包, `yarn global http-server`
2. 在当前目录运行`HTTP`服务器，设置为没有缓存, `http-server . -c-1 `
3. 点击网址，在后面输入路径，例如`192.168.56.1:8080/index.html`

方法二，使用`Parcel`
1. 下载`Parcel`包, `yarn global add parcel`
2. 运行`HTML`文件, `parcel index.html`
### a标签
#### 属性
 * `herf`, 包含超链接指向的`URL`或`URL`片段
 * `target`, 规定在何处打开链接文档
 * `download`,  属性规定被下载的超链接目标。
 * `rel=noopener`, 打开新的页面，不会新增窗口，同时不指向外部链接
#### Href的取值
1. 网址，例如 
```
https://baidu.com
http://baidu.com
//baidu.com
```
2. 路径，例如
绝对路径`/a/b/c`以及相对路径`a/b/c`，`index.html`以及`./index.html`

3. 伪协议, `javaScript:`代码,早期为了运行JS代码而存在，现在主要用于制作没有任何指向动作的`a`标签，例如`<a href="javascript:;">点击</a>`

4. 特殊属性
   -  `mailto:`邮箱 -点击指向邮箱地址，进行发送邮件操作，例如`<a href="mailto:a123456@gmail.com">点击发送邮箱</a>`。
   - `tel:`手机号点击指向电话号码，进行拨打，例如`<a href="tel:123456789">拨打电话</a>`
   - `Id`跳转到指定`HTML`部分, 例如
```
<p id="article"
******
******
<a href="#article">点击</a>
```
#### Target的取值
1. 内置名字
*  `_top`, 在当前`iframe`的顶部打开
*  `_blank`, 在空白页面打开
*  `_parent`，在当前iframe的上一层打开
*  `_self`，默认值，在当前页面打开
*  `_xxx`, 打开一个窗口，让之后打开的窗口在前一个窗口打开

2. 程序员命名
* `windows`的`name`
* `iframe`的`name`
### iframe标签
表示嵌套的`browsing context`，它能够将另一个`HTML`页面嵌入到当前页面中
### table标签
表示表格数据, 即通过二维数据表表示的信息,内含`<thread>,<tbody>,<tfoot>`,每个都含有`<tr>`，`<tr>`里含有`<td>,<th>`
```
 <table>
      <thead>
        <tr>
          <th></th>
          <th>小红</th>
          <th>小明</th>
          <th>小强</th>
        </tr>
      </thead>
      <tbody>

        <tr>
          <th>数学</th>
          <td>61</td>
          <td>91</td>
          <td>85</td>
        </tr>
        <tr>
          <th>语文</th>
          <td>79</td>
          <td>82</td>
          <td>92</td>
        </tr>
        <tr>
          <th>英语</th>
          <td>100</td>
          <td>97</td>
          <td>87</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>  
          <th>总分</th>
          <td>200</td>
          <td>200</td>
          <td>200</td>
        </tr>
      </tfoot>
    </table>
```
![](https://user-gold-cdn.xitu.io/2020/1/29/16fef22e78b99739?w=258&h=202&f=jpeg&s=22435)

#### 相关样式
* `table-layout`, `CSS`属性定义了用于布局表格单元格，行和列的算法。
* `border-collapse`, `CSS`属性是用来决定表格的边框是分开的还是合并的
* `border-spacing`, `CSS`属性指定相邻单元格边框之间的距离（只适用于 边框分离模式 ）。相当于 `HTML`中的`cellspacing`属性，但是第二个可选的值可以用来设置不同于水平间距的垂直间距。
### img标签
PS: 作为前端，切记，不能让图片变形！
#### 用途 
将一份图像嵌入文档
####  属性
* `src`(必须存在的属性）,它包含了你想嵌入的图片的文件路径。
* `alt`, 它包含一条对图像的文本描述，这不是强制性的，但对可访问性而言，它难以置信地有用——屏幕阅读器会将这些描述读给需要使用阅读器的使用者听，让他们知道图像的含义。
* `height`, 图像的高度，在`HTML5`中的单位是`CSS`像素，在`HTML 4`中既可以是像素，也可以是百分比。可以只指定`width`和`height` 中的一个值，浏览器会根据原始图像进行缩放。
* `width`, 图像的宽度，在`HTML5`中单位是`CSS`像素， 在`HTML 4`中可以是像素也可以是百分比。

#### 事件
* `onload`, 该事件的处理函数将会在`image`元素指示的图片加载完毕之后触发。此事件触发适用于用`src`元素属性或用`list-style-image`。`css`属性声明元素样式。如果图片的加载源发生变化，该事件会在图片加载完毕之后再次触发。该事件不会在文档树上向上冒泡。
* `onerror`, `This event is sent to an image element when an error occurs loading the image`

#### 响应式
* `max-width: 100%`
### form标签 
#### 用途
元素表示了文档中的一个区域(类似表格），此区域包含有交互控制元件，用来向`Web`服务器提交信息。通常来说，发送`Get`或者`Post`请求，然后刷新页面
#### 属性
* `action`, 一个处理此表单信息的程序所在的`URL`。此值可以被 `<button>` 或者 `<input>` 元素中的`formaction`属性覆盖。
* `autocomplete`, 用于指示 `input`元素是否能够拥有一个默认值，此默认值是由浏览器自动补全的。此设定可以被属于此表单的子元素的 `autocomplete` 属性覆盖。 可能的值有：
  -  `off`：在每一个用到的输入域里，用户必须显式的输入一个值，或者`document` 以它自己的方式提供自动补全；浏览器不会自动补全输入。
  -  `on`：浏览器能够根据用户之前在表单里输入的值自动补全。
* `method`, 浏览器使用这种`HTTP`方式来提交 表单. 可能的值有：
   - `post`：指的是`HTTP POST`方法；表单数据会包含在表单体内然后发送给服务器.
   - `get`：指的是`HTTP GET`方法；表单数据会附加在`action`属性的`URL`中，并以`?` 作为分隔符，然后这样得到的`URL`再发送给服务器。如果这样做（数据暴露在`URL` 中）没什么副作用，或者表单仅包含`ASCII字`符时，再考虑使用这种方法吧。
   - `dialog`：`Use when the form is inside a <dialog> element to close the dialog when submitted.`

* `target`,一个名字或者说关键字，用来指示在提交表单之后，在哪里显示收到的回复. 在`HTML 4` 里, 这是一个用于`frame`的名字/关键字. 在`HTML5`里，这是一个用于`browsing context` 浏览器上下文 的名字/关键字（举例来说，标签页，窗口，或者行内 `frame`）。如下的关键字含有特别的含义：
  -  `_self`：在当前`HTML`或`HTML5`文档页面重新加载返回值。是默认值。译注：也就是说，如果此文档在一个`frame`中的话，`self`是在当前`frame`中重新加载的，而不是整个页面。

  - `_blank`：以新的`HTML 4`或`HTML5`文档窗口加载返回值。

  - `_parent`：在父级的`frame`中以`HTML`或`HTML`文档形式加载返回值，如果没有父级的`frame`，行为和`_self`一致。

  - `_top`：如果是 `HTML 4`文档,清空当前文档，加载返回内容, `HTML5`：在当前文档的最高级内加载返回值，如果没有父级，和`_self`的行为一致。
  - `iframename`：返回值在指定 `<iframe>` 中显示。

#### 事件
`onsubmit`, `submit` 事件会在用户点击提交按钮（`<input type="submit"/>` 元素）提交表单时触发。
`<input>`只能有纯文本，`<button>`可以有任意文本,标签。一个Form表单必须含有`<type=submit>`的标签
### input标签
#### 用途
用于为基于`Web`的表单创建交互式控件，以便接受来自用户的数据; 可以使用各种类型的输入数据和控件小部件，具体取决于设备和`user agent`
#### 属性
类型(type):
* `select`
* `textarea`
* `lable`
* `button`
* `checkbox`
* `email`
* `file`
* `password`
* `hidden`
* `number`
* `radio`
* `search`
* `submit`
* `tel`
* `text`

其他`name`:
* `autofocus`
* `checked`
* `disabled`
* `maxlength`
* `pattern`
* `value`
* `palceholder`

#### 事件
* `onchange`
* `onfocus`
* `onblur`

#### 验证器
`HTML`新增功能，例如`<input type="text" required/>`

#### 注意事项
* 一般不监听`input`的`click`事件
* `form`里面的`input`需要有`name`
* `form`里面必须要有一个`type=submit`才能触发`Submit`事件
### 更多信息
[a标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)

[form标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)

[可替换元素(重点，面试必问)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element) 