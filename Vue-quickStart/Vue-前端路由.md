## 目录
1. [路由定义](#路由定义)
2. [hash模式](#hash模式)
3. [history模式](#history模式)
4. [memory模式](#memory模式)
5. [更多信息](#更多信息)

### 路由定义
网络路由的定义：网络原理中，路由指的是根据上一接口的数据包中的`IP`地址，查询路由表，路由表引导分组转送，然后转发到另一个接口，它决定的是一个端到端的网络路径

前端路由的定义：**本质上就是检测`url`的变化，截获`url`地址，然后解析来匹配路由规则**

#### 路由原理
简单的说，就是在保证只有一个`HTML`页面，且与用户交互时不刷新和跳转页面的同时，为`SPA`单个网页应用中的每个视图展示形式匹配一个特殊的`url`。在刷新、前进、后退和`SEO`搜索优化时均通过这个特殊的 `url` 来实现。
为实现这一目标，我们需要做到以下三点：

* 改变 `url` 且不让浏览器像服务器发送请求。
* 可以监听到 `url` 的变化
* 根据`url`跳转响应的页面或者组件

#### 路由表
路由表是一个信息表格。在下面的代码中，路由根据查询路由表，通过路径可以跳转到不同的组件，即实现了`path to component`，也实现了分发
```
// Vue路由表
const router = new VueRouter({
  routes: [
    {
      path: '/index', // 路由的路径
      name: 'index',  // 路由名称，可选属性，定义后可以用其实现跳转
      component: { // 路由显示的组件
        template: '<div>index</div>'  // 组件模板
      }
    },
    {
      path: '/news',
      name: 'news',
      component: {
        template: '<div>news</div>'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: {
        template: '<div>user</div>'
      }
    },
  ]
})

let vm = new Vue({
  el: '#app',
  data: {
  },
  // 将路由添加到Vue中
  router
})

// 触发Vue路由
<router-link class="nav" to="/index">index</router-link>

// React路由表
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body)

// 触发React路由
<Link to={`/user/89757`}>'joey'</Link>
```

#### 默认路由
默认路由是指当我们进入应用，默认想显示某一个路由组件，或者当我们进入某一级路由组件的时候想默认显示其某一个子路由组件。以`/`开头的嵌套路径会被当作根路径

例如，当默认路由是当用户请求的地址为`/`根路径的时候，会有对应的反应，跳转至对应的视图。

#### 404路由
`404`路由也称之为错误路由。例如，当请求不存在时，路由对应不到页面等情况时会出现报错
#### 嵌套路由
嵌套路由是指多层路由嵌套, 一个路由里面包含多个子路由，层层嵌套 
```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

### hash模式
定义：`hash`即地址栏`URL`中的`#`符号。`hash`值：即`#`符号及其符号后面的字符。例如 `www.googlel.com/#hashhash` ，其中 `#hashhash`就是`hash`值。`hash`模式是路由的默认模式。

原理：`hash`虽然出现`URL`中，事件但不会被包含在`HTTP`请求中，对后端完全没有影响，因此改变`hash`不会重新加载页面。而且`hash`的改变会触发 `hashchange`, 浏览器的前进后退也能对其进行控制

![](https://user-gold-cdn.xitu.io/2020/3/21/170fdaab04584b45?w=1200&h=701&f=webp&s=22354)

`hash`模式优点
* 兼容性更好,在老版`IE`中都能运行, 主流的前端路由方式

`hash`模式缺点
* 对`SEO`搜索优化不友好，因为浏览器始终不会发送`hash`值给服务器，因此 `baidu.com/#/tiger` 和 `baidu.com/#/lion` 和 `baidu.com` 都是一样的，服务器收到的都是不带`hash`的地址，也就是 `baidu.com`

代码实例：类似原理实现
```
// HTML代码
<a href="#1">go to 1</a> <a href="#2">go to 2</a> <a href="#3">go to 3</a>
<a href="#4">go to 4</a>
<div id="app"></div>
<div id="div404" style="display: none;">你要找的内容被狗吃了</div>

// JS代码
const app = document.querySelector("#app");
const div1 = document.createElement("div");
div1.innerHTML = "1";
const div2 = document.createElement("div");
div2.innerHTML = "2";
const div3 = document.createElement("div");
div3.innerHTML = "3";
const div4 = document.createElement("div");
div4.innerHTML = "4";
const routeTable = {
  "1": div1,
  "2": div2,
  "3": div3,
  "4": div4
};

function route(container) {
  let number = window.location.hash.substr(1);

  number = number || 1;

  // 获取界面
  let div = routeTable[number.toString()];
  if (!div) {
    div = document.querySelector("#div404");
  }
  div.style.display = "block";

  // 展示界面
  container.innerHTML = "";
  container.appendChild(div);
}

route(app);

window.addEventListener("hashchange", () => {
  console.log("hash 变了");
  route(app);
});
```

### history模式
定义：形如 `/xxx`的模式就是`history`模式，之所以叫`history`模式是因为浏览器的`history API`, 正常情况下由`a`链接发起的地址栏变化会使得页面重新刷新，带来不好的用户体验。而 `history.pushState`方法可以在不刷新页面的情况下更新浏览器地址栏,该方法不会触发任何事件，但是需要手动触发路由地址变化之后的页面渲染响应

原理：利用了`HTML5 History Interface` 中新增的`pushState()`和`replaceState()`方法。

在`HTML5`之前，浏览器就已经有了`history`对象。但在早期的`history`中只能用于多页面的跳转
```
history.go(-1);       // 后退一页
history.go(2);        // 前进两页
history.forward();     // 前进一页
history.back();      // 后退一页
```
在`HTML5`的规范中,`history`新增了以下几个`API`
```
history.pushState();         // 在浏览历史中添加历史记录,但是并不触发跳转
history.replaceState();      // 修改浏览历史中当前纪录,而非添加记录,同样不触发跳转
history.state                // 返回当前状态对象
popstate                    //  每当同一个文档的浏览历史,即history对象出现变化时，就会触发popstate事件。

// 需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发popstate事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用back、forward、go方法时才会触发
```

`history.pushState()`和`history.replaceState()`均接收三个参数`（state, title, url）`
* `state`: 一个与指定网址相关的状态对象，`popstate`事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填`null`
* `title`: 新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填`null`
* `url`: 新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址

`history.pushState()`和`history.replaceState()`的区别
* `history.pushState()`在保留现有历史记录的同时，将`url`加入到历史记录中
* `history.replaceState()`会将历史记录中的当前页面历史替换为`url`

`history`模式的路由过程

由于`history.pushState()`和`history.replaceState()`可以改变 url 同时，不会刷新页面，所以在 `HTML5`中的`histroy`具备了实现前端路由的能力。而在`hash`模式，当`hash`变化时，可以通过`hashchange`进行监听。而`history`的改变并不会触发任何事件，所以我们无法直接监听`history`的改变而做出相应的改变。

所以，我们需要换个思路，我们可以罗列出所有可能触发`history` 改变的情况，并且将这些方式一一进行拦截，变相地监听`history`的改变。
对于单页应用的`history`模式而言，`url`的改变只能由下面四种方式引起：
* 点击浏览器的前进或后退按钮
* 点击`a`标签
* 在`JS`代码中触发`history.pushState`函数
* 在`JS`代码中触发`history.replaceState`函数

![](https://user-gold-cdn.xitu.io/2020/3/21/170fdaa7848fc99b?w=1200&h=604&f=webp&s=23348)

`history`模式优点
* 后端将所有前端路由都渲染到同一页面
* 可以进行`SEO`搜索优化

`history`模式缺点
* 不支持`IE8`以下的版本
* 由于浏览器地址是通过`history.pushState()` 更新的，当用户手动刷新页面时，需要有一个机制保证返回的页面仍然是当前页面
* 需要后端支持，每次返回`html`文档
代码实例：类似原理实现
```
// HTML代码
<a class="link" href="/1">go to 1</a> <a class="link" href="/2">go to 2</a>
<a class="link" href="/3">go to 3</a> <a class="link" href="/4">go to 4</a>
<div id="app"></div>

<div id="div404" style="display: none;">你要找的内容被狗吃了</div>

// JS代码
const app = document.querySelector("#app");
const div1 = document.createElement("div");
div1.innerHTML = "1";
const div2 = document.createElement("div");
div2.innerHTML = "2";
const div3 = document.createElement("div");
div3.innerHTML = "3";
const div4 = document.createElement("div");
div4.innerHTML = "4";
const routeTable = {
  "/1": div1,
  "/2": div2,
  "/3": div3,
  "/4": div4
};

function route(container) {
  let number = window.location.pathname;
  console.log("number: " + number);

  if (number === "/") {
    number = "/1";
  }

  // 获取界面
  let div = routeTable[number.toString()];
  if (!div) {
    div = document.querySelector("#div404");
  }
  div.style.display = "block";

  // 展示界面
  container.innerHTML = "";
  container.appendChild(div);
}

const allA = document.querySelectorAll("a.link");

for (let a of allA) {
  a.addEventListener("click", e => {
    e.preventDefault();
    const href = a.getAttribute("href");
    window.history.pushState(null, `page ${href}`, href);
    // 通知
    onStateChange(href);
  });
}

route(app);

function onStateChange() {
  console.log("state 变了");
  route(app);
}
```
### memory模式
定义：在内存中维护一个堆栈用于管理访问历史的方式，比较复杂。早期移动端使用比较多。实现麻烦，问题也较多，现在很少有使用。`React Native`使用这种路由模式。

原理：`hash`和`history`模式都是将地址信息保存在`url`中，可以明显的感受到路由的过程。而在 `app`开发中不存在浏览器的概念。`memory`模式就是把路由信息存到一个对象里面，（比如 `localStorage`）每次读取当前的路由地址展示对应的页面。由于路由信息无法体现到`url` 中，因此拷贝链接分享的时候，可能会导致看到的渲染内容不一样的问题。

```
// HTML代码
<a class="link" href="/1">go to 1</a> <a class="link" href="/2">go to 2</a>
<a class="link" href="/3">go to 3</a> <a class="link" href="/4">go to 4</a>
<div id="app"></div>

<div id="div404" style="display: none;">你要找的内容被狗吃了</div>

// JS代码
const app = document.querySelector("#app");
const div1 = document.createElement("div");
div1.innerHTML = "1";
const div2 = document.createElement("div");
div2.innerHTML = "2";
const div3 = document.createElement("div");
div3.innerHTML = "3";
const div4 = document.createElement("div");
div4.innerHTML = "4";
const routeTable = {
  "/1": div1,
  "/2": div2,
  "/3": div3,
  "/4": div4
};

function route(container) {
  let number = window.localStorage.getItem("xxx");

  if (!number) {
    number = "/1";
  }

  // 获取界面
  let div = routeTable[number.toString()];
  if (!div) {
    div = document.querySelector("#div404");
  }
  div.style.display = "block";

  // 展示界面
  container.innerHTML = "";
  container.appendChild(div);
}

const allA = document.querySelectorAll("a.link");

for (let a of allA) {
  a.addEventListener("click", e => {
    e.preventDefault();
    const href = a.getAttribute("href");
    window.localStorage.setItem("xxx", href);
    // 通知
    onStateChange(href);
  });
}

route(app);

function onStateChange() {
  console.log("state 变了");
  route(app);
}
```

`memory`模式优点
* 不存在兼容性问题，路由保存在内存中
* 不需要服务器端提供支持

`memory`模式缺点
* 目前很少有前端路由模块提供对`memory`路由的实现(`react-router`提供了`memory`实现)
* 自己实现难度较大，且工作量也很大
* 对于前进后退操作的路由管理非常麻烦，尤其是`android`设备,适合非浏览器应用


### 更多信息
>[vue-Router源码](https://github.com/vuejs/vue-router/blob/dev/dist/vue-router.js)

>[前端路由是什么](https://www.jianshu.com/p/0f0c7a75ed34)

>[「前端进阶」彻底弄懂前端路由](https://juejin.im/post/5d2d19ccf265da1b7f29b05f)

>[vue-router深度解析，全方位搞定路由！](https://juejin.im/post/5deac49b6fb9a016510d9766)

>[MDN history](https://developer.mozilla.org/zh-CN/docs/Web/API/History)



