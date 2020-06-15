## 目录
1. [思路](#思路)
2. [根据环境设置URL](#根据环境设置URL)
3. [配置package.json文件](#配置package.json文件)
4. [检查编译是否正常](#检查编译是否正常)
5. [安装gh-pages](#安装gh-pages)
6. [部署项目到github-page](#部署项目到github-page)
7. [确认代码分支](#确认代码分支)
8. [更多信息](#更多信息)



### 思路
部署时候具体执行的操作大概为：
* 在`package.json`里面增加配置代码
* 使用`build`命令打包编译代码文件
* 使用`gh-pages`工具把`build`文件下的文件推送到`GitHub`部署到新的`gh-pages`分支上
* 使用`deploy`命令来发布页面

### 根据环境设置URL
这步可忽略不做
```
import {createBrowserHistory} from 'history';

const ENV = process.env.NODE_ENV;
let publicUrl: string = '';

if (ENV === 'development') {
  publicUrl = '/';
} else if (ENV === 'production') {
  publicUrl = '/avccc'; // 这里应为Github项目仓库的名称
}

const history = createBrowserHistory({
  basename: publicUrl
})

export default history;
```
### 配置package.json文件
* 配置`Homepage`

在`package.json`中添加`homepage`字段，与`dependencies`同级。`create-react-app`将使用 `homepage`值来配置访问页面
```
"private": true,
"homepage": "https://xxx.github.io/theApp"
```

注意！如果前面的`Homepage`发布到线上有问题，可以尝试更换`Homepage`

例如： `homepage`不要设置成`github page`上生成的那个链接路径，比如`https://username.github.io/react_demo/`
如果设置成上面的连接，`build`打的包会这所有路径前面加上`react_demo`
比如`index.html`文件中对同等目录下的文件引用应该是 `src='./index.css'`，结果会变成`src='./react_demo/index.css'`，这样部署后肯定无法访问，所有资源都找不到。


* 添加发布脚本代码

`predeploy`是将你的项目预编译成静态文件放在`build`文件夹

`deploy`是使用`gh-pages`部署你的`build`文件夹下的内容

```
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
    ***
    }
```
* 完整的`package.json`
```
{
  "name": "application",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://xxx.github.io/theApp"
  "dependencies": {
    "axios": "^0.17.1",
    "jquery": "^3.2.1",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-scripts": "1.0.17"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "predeploy": "yarn run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "gh-pages": "^1.1.0"
  }
}
```

### 检查编译是否正常
使用`build`命令，将项目编译运行在本地检查是否正常
```
yarn build  // 或者
npm run build
```

### 安装gh-pages
通过`gh-pages`中间件，可以把`build`文件下的文件推送到`GitHub`，并且创建`gh-pages branch`
```
yarn add gh-pages // 或者
npm install gh-pages --save-dev
```
### 部署项目到github-page
```
yarn run deploy  // 或者
npm run deploy
```
### 确认代码分支
* 在`github`项目仓库地址切换分支，可以查看到`gh-pages`分支下的`build`代码
* 在项目的`settings`的`GitHun Pages`设置部分中，确保源代码`Source`使用的是`gh-pages`分支
* 至此，发布配置基本完成，还有其他可选项，如自定义域名
* 发布命令完成之后，需要等待一阵子才能生效，立即访问`homepage`，很有可能不会得到想要的结果


### 更多信息
> [create-react-app项目部署到GitHub Pages](https://www.jianshu.com/p/af94a025d277)