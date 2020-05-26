## 目录
1. [下载Hugo](#下载Hugo)
2. [设置Hugo](#设置Hugo)
3. [关联GitHub仓库](#关联GitHub仓库)
4. [购买域名配置DNS](#购买域名配置DNS)

## 下载Hugo
>首先下载Hugo软件 https://github.com/gohugoio/hugo/releases

然后解压，将解压后的路径添加到`Path`中

## 设置Hugo
>进入官网,找到设置代码 https://gohugo.io/getting-started/quick-start/
1. 确认`Hugo`版本,`hugo version`
2. 新建`Hugo`站点，文件夹名为`Captain-Tab.github.io-creator`


```
hugo new site Captain-Tab.github.io-creator // 创建命令
```

3. 进入文件夹，并下载主题
```
cd Captain-Tab.github.io-creator
git init
git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
```
4. 添加主题到配置文件

`echo 'theme = "ananke"' >> config.toml`

5. 添加博客目录,名为开博大吉

`hugo new posts/开博大吉.md`

6. 运行本地`Hugo`服务器

`hugo server -D`

7. 设置主题和标题
```
baseURL = "https://example.org/"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "ananke"
```
8. 生成静态页面

`hugo -D`

## 关联GitHub仓库

1. 在`GitHub`页面新建一个远程仓库，名为`Captain-Tab.github.io-creator`
2. 然后新建本地仓库，在`Captain-Tab.github.io-creator`文件夹中，代码为

```
cd public
git init
git add .
git commit -v hello
```
3. 接着关联远程仓库
```
git remote add origin git@github.com:xxxx/x.github.io.git
push -u origin master
```
4. 最后在`GitHub`的仓库设置界面，找到`GitHub pages`，进行浏览

## 购买域名配置DNS
1. 首先购买域名，推荐namesilo
2. [然后添加四条A记录](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)
3. 检查是否正常
`nslookup + 域名`
4. 最后添加域名，配置`GitHub Page`

