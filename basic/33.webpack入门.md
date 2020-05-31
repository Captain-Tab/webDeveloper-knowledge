## 目录
1. [webpack定义](#webpack定义)
2. [webpack入门必学](#webpack入门必学)
3.  [更多信息](#更多信息)


### webpack定义
`webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包器，当 `webpack` 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 `bundle`。

#### 作用
* 转译代码(`ES 6`转为`ES 5`, `SCSS`转为`CSS`)
* 构建`build`
* 代码压缩
* 代码分析

#### 核心概念
* `entry`: 入口
* `output`: 输出
* `loader`: 模块转换器，用于把模块原内容按照需求转换成新内容
* 插件(`plugins`): 扩展插件，在`webpack`构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

#### Loader VS Plugin
![](https://user-gold-cdn.xitu.io/2020/3/16/170e3dfea6fd321d?w=1232&h=714&f=png&s=57618)
* `loader` 的功能就是加载资源到`webpack`。`loader` 可以将文件从不同的语言（如 `TypeScript`）转换为 `JavaScript`，或将内联图像转换为 `data URL`。`loader` 甚至允许你直接在 `JavaScript` 模块中 `import CSS`文件！ 因为 `webpack` 本身只能处理 `JavaScript`，如果要处理其他类型的文件，就需要使用 `loader` 进行转换，`loader` 本身就是一个函数，接受源文件为参数，返回转换的结果。
* `Plugin` 是用来扩展 `Webpack` 功能的。它直接作用于 `webpack`，扩展了它的功能。当然`loader`也时变相的扩展了 `webpack` ，但是它只专注于转化文件（transform）这一个领域。而`plugin`的功能更加的丰富，而不仅局限于资源的加载。

* `loader` 通常是`1`对`1`，把`1`个文件打包形成另外一个文件。 `plugin`是`1`对`n`个文件，把多个文件打包合成一个文件。


### webpack入门必学
#### 使用webpack转译JS
#### 理解文件名中hash的用途
#### 使用webpack生成HTML
#### 使用webpack引入CSS, 可以使用JS生成style,也可以把CSS抽成文件
#### 使用webpack引入SCSS
#### 使用webpack引入LESS和Stylus
#### 使用webpack引入图片
#### 使用懒加载
#### 部署到Github Pages

 
### 更多信息
>[带你深度解锁Webpack系列(基础篇)](https://juejin.im/post/5e5c65fc6fb9a07cd00d8838)
