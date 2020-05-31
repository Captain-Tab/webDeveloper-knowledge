## 目录
1. [Vue的历史](#Vue的历史)
2. [@vue/cli](#@vue/cli)
3. [Vue实例](#Vue实例)
4. [完整版VS运行版](#完整版VS运行版)
5. [更多信息](#更多信息)


### Vue的历史
#### Vue的作者
中文名尤雨溪，英文名`Evan You`。本科就读于美国谢尔盖特大学，艺术与艺术专业，获得帕森设计学院艺术硕士，毕业后在`Googel Creative Lab` 担任`UI`相关工作。之后转为全职`JavaScript`开发者，现为独立开发者。
>[GitHub主页](https://github.com/yyx990803?tab=repositories)

>[个人博客](https://evanyou.me/)
#### Vue Cli主要维护者
蒋豪群，英文`ID`为`sodatea`,曾就职于阿里巴巴和蘑菇街。`2018`年起成为全职开源开发者。
>[Vue的招聘启事](https://zhuanlan.zhihu.com/p/34846823)

#### Vue的历史
* `2013`年，`0.6`-`0.7`版
* `2014`年，`0.8`-`0.11`版
* `2015`年，`1.0`版
* `2016`年，`2.0`版
* `2019`年，`2.6`版
* `2020`年，`3.0`版

#### Vue的学习路线
![](https://user-gold-cdn.xitu.io/2020/3/15/170de1b244282924?w=1560&h=437&f=jpeg&s=64245)
### @vue/cli
#### 使用@vue/cli
1. 全局安装 `npm install -g @vue/cli`或者
`yarn global add @vue/cli`
2. 创建目录
3. 选择配置
4. 进入目录，运行`yarn serve`开启`webpack-dev-server`
4. 使用`webStorm`或`VSCode`打开项目开始`CRM`
5. 进入`@vue/cli`官网查看资料，学习

#### 使用codesandbox.io新建
可以登录[沙盒网站](https://codesandbox.io/)创建`vue`项目，登录后只能创建`50`个项目，不登录可以创建无数个。并且用户也可以在该网站下载代码
### Vue实例
#### 使用Vue实例
方法一： 从`HTML`得到视图。这种方法称为完整版`Vue`,同时包含编译器和运行时的版本。通过`CDN`引入`vue.js`或者`vue.min.js`可以做到。也可以通过`import`引用`vue.js`或者`vue.min.js`。特点：体积大，功能强

方法二： 使用`JavaScript`构建视图, 使用`vue.runtime.js`, 过程比较麻烦，也叫运行版。特点： 体积小，功能弱

方法三： 使用`vue-loader`。可以把`.vue`文件翻译成`h`构建方法。但是这样做`HTML`就只有一个`div #app`, 对`SEO`不友好。特点：开发时使用完整版，用户使用运行版。

#### SEO
`SEO`：`Search Engine Optimization`, 搜索引擎优化。搜索引擎根据`curl`结果猜测页面内容。如果页面都是由`JS`创建的`diV`组成的， 那么`curl`不能得到内容。

解决办法: 给`curl`一点内容。原则: 让`curl`得到页面的信息，`SEO`就能正常工作。例如添加信息在`title`,`description`,`keyword`,`h1`,`a`里面。
### 完整版VS运行版
![](https://user-gold-cdn.xitu.io/2020/3/15/170deaa3fb1ae181?w=1062&h=326&f=jpeg&s=66465)

`Vue`的两个版本分别是完整版和运行时版本，文件名分别是 `vue.js` 和 `vue.runtime.js`，`vue.js` 包含 `vue.runtime.js` 中的内容，它多了一个编译器。如果只说这两个版本的区别，其实文章到这里应该结束了，但是我们可以通过这两个版本分别引出了 `Vue` 实例的几种使用方法。

#### 完整版：使用 HTML 构建视图
因为完整版多了一个编译器，这个编译器的作用就是用了将`HTML` 字符转换成运行时版本中的 `render` 函数，所以可以直接使用 `HTML` 标签构建视图，也可以传入一个字符串给`template`选项来构建
```
// html 
<div id='app'>
    {{msg}}
</div>
**********
new Vue({
    el:'#app',
    data(){
        return {
            msg:'hi'
        }
    }
})
```
```
// template
<div id='app'></div>
**********
new Vue({
    el:'#app',
    template:'<div>{{msg}}</div>',
    data(){
        return {
            msg: 'hi'
        }
    }
})
```
#### 运行版: 使用 JS 构建视图
运行时版本使用来 `JS` 创建 `Vue` 实例、渲染虚拟 `DOM`，简单来说就是使用 `render` 函数
```
new Vue({
    data(){
        return {
            msg:'hello'
        }
    }
    render(h){
        return h('div',this.msg)
    }
})
```
#### 推荐方法： 使用非完整版，配合`vue-loader`和`vue`文件。
1. 提升用户体验，减小`JS`文件体积，使用非完整版，只支持`h`函数
2. 提升开发体验，直接在vue文件里写`HTML`标签，不写`h`函数
3. 利用`vue-loader`把`vue`文件里面的`HTML`转化为`h`函数

#### Vue实例的作用
* **Vue实例类似于jquery实例:** 封装了对`DOM`和`data`的所有操作

* **操作DOM:** 操作`DOM`,监听事件
* **操作data:** 对数据进行增删改查
* **没有封装ajax:** 需要使用`axios`的`ajax`功能
### 更多信息
>[Vue Cli 中文官网](https://cli.vuejs.org/zh/guide/installation.html)

>[Vue中文文档](https://cn.vuejs.org/index.html)

>[Vue 完整版和运行时版本的区别](https://juejin.im/post/5e5677fe6fb9a07cb83e2439)

>[Vue英文文档](https://vuejs.org/)
