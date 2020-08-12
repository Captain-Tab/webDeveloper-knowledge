## 目录
1. [介绍@font-face](#介绍@font-face)
2. [兼容不同的服务器](#兼容不同的服务器)
3. [其他使用方法](#其他使用方法)
4. [字体文件类型](#字体文件类型)
5. [注意事项](#注意事项)
6. [更多信息](#更多信息)

### 介绍@font-face
`@font-face`规则允许将自定义字体加载到网页上。一旦添加到样式，浏览器将根据信息在来源地址下载字体，然后按照`CSS`中的指定显示字体。
### 兼容不同的服务器
在使用`@font-face`之前，应该先申明`@font-face`的规则，并让其兼容不同的浏览器
```
@font-face {
  font-family: 'MyWebFont';
  src: url('webfont.eot'); /* IE9 Compat Modes */
  src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'), /* Super Modern Browsers */
       url('webfont.woff') format('woff'), /* Pretty Modern Browsers */
       url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
}
```
然后再在选择器中使用这个字体样式
```
body {
  font-family: 'MyWebFont', Fallback, sans-serif;
}
```
目前的趋势是兼容`WOFF`和`WOFF2`, 全程为`Web Open Font Format`，意思是网页公开字体格式。所以为了全面的兼容不同的格式和浏览器，我们可以这样写
```
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2'),
       url('myfont.woff') format('woff'),
       url('myfont.ttf') format('truetype');
}
```
### 其他使用方法
除了使用`@font-face`是自定义网页的字体，我们也可以通过导入字体，从而达到字体自定义的目的
```
@import url(//fonts.googleapis.com/css?family=Open+Sans);

body {
  font-family: 'Open Sans', sans-serif;
}
```

这样做的好处在于不需要本地保存字体文件，而且导入的字体包含所有的字体，从而保证了不同浏览器的兼容性
### 字体文件类型
* WOFF / WOFF2

全程为`Web Open Font Format`。`WOFF`字体是为在网页上使用而创建的，由`Mozilla`与其他组织联合开发，通常比其他格式加载速度更快，因为它们使用的是`OpenType`（OTF）和`TrueType`（TTF）的压缩版本。所以几乎主流的英文字体都支持这种字体类型。`WOFF2`是下一代版本的`WOFF`，并且压缩效果比`WOFF`好。

* SVG / SVGZ

全程为可缩放矢量图形（字体）。`SVG`文件大小更轻巧，并且非常适用于移动端。`svg`是`iOS`版`Safari`的4.1版及更低版本唯一支持的字体类型。`Firefox`，`IE`目前并不支持`SVG`字体。`SVGZ`是`SVG`的压缩版本

* EOT
全程为`Embedded Open Type`。改字体文件类型是由`Microsoft`创建的，是仅`IE`支持的专有文件类型标准。也是`IE8`及更低版本可以识别`@font-face`的唯一格式。

* OTF / TTF

全程为`OpenType`字体和`TrueType`字体。
### 注意事项
加载自定义字体也会影响网页渲染的性能。因为自定义字体通常会导致网站性能下降，所以一般在显示字体之前必须先下载字体
### 更多信息
> [Using @font-face](https://css-tricks.com/snippets/css/using-font-face/)