### 使用vue-cli搭建项目
#### 下载Node.JS
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
#### 搭建项目步骤
* 全局安装`vue-cli`
```
npm install -g vue-cli
```
* 进入目录–初始化项目
```
vue init webpack my-project
```
* 进入项目
```
cd my-project
```
* 安装依赖
```
npm install
```
* 启动项目
```
npm run dev
```
#### 项目结构分析
```
第一部分
├── build // 项目构建(webpack)相关代码 记忆：（够贱） 9个
│ ├── build.js // 生产环境构建代码
│ ├── check-versions.js // 检查node&npm等版本
│ ├── dev-client.js // 热加载相关
│ ├── dev-server.js // 构建本地服务器
│ ├── utils.js // 构建配置公用工具
│ ├── vue-loader.conf.js // vue加载器
│ ├── webpack.base.conf.js // webpack基础环境配置
│ ├── webpack.dev.conf.js // webpack开发环境配置
│ └── webpack.prod.conf.js // webpack生产环境配置
第二部分
├── config// 项目开发环境配置相关代码 记忆： （环配） 3个
│ ├── dev.env.js // 开发环境变量（看词明意）
│ ├── index.js //项目一些配置变量
│ └── prod.env.js // 生产环境变量
第三部分
├──node_modules// 项目依赖的模块 记忆： （依赖） *个
第四部分
├── src// 源码目录 5
1
│ ├── assets// 资源目录
│ │ └── logo.png
2
│ ├── components// vue公共组件
│ │ └── Hello.vue
3
│ ├──router// 前端路由
│ │ └── index.js// 路由配置文件
4
│ ├── App.vue// 页面入口文件（根组件）
5
│ └── main.js// 程序入口文件（入口js文件）
第五部分
└── static// 静态文件，比如一些图片，json数据等
│ ├── .gitkeep
其他部分
├── .babelrc// ES6语法编译配置
├── .editorconfig// 定义代码格式
├── .gitignore// git上传需要忽略的文件格式
├── index.html// 入口页面
├── package.json// 项目基本信息
├── README.md// 项目说明
```