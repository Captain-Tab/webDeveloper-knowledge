![git命令](/assets/ReadingResources/git命令.png)

## 目录
1. [查看文件或目录](#查看文件或目录)
2. [新增文件或目录](#新增文件或目录)
3. [复制文件或目录](#复制文件或目录)
4. [删除文件或目录](#删除文件或目录)
5. [修改文件或目录 ](#修改文件或目录)
6. [查询命令](#查询命令)
7. [骚操作](#骚操作)
8. [绝对路径与相对路径](#绝对路径与相对路径)
9. [初始GitHub本地](#初始GitHub本地)
10. [配置GitHub](#配置GitHub)
11. [提交文件和查看历史](#提交文件和查看历史)
12. [查看历史或回滚版本](#查看历史或回滚版本)
13. [配置Branch](#配置Branch)
14. [解决合并冲突](#解决合并冲突)
15. [生成SShKey](#生成SShKey)
16. [初始Github本地](#初始Github本地)
17. [上传到GitHub](#上传到GitHub)
18. [clone命令](#clone命令)
19. [推送骚操作](#推送骚操作)
20. [设置别名Alias](#设置别名Alias)
21. [rebase命令](#rebase命令)
22. [stash命令](#stash命令)
23. [git脑图](#git脑图)
24. [更多信息](https://github.com/xjh22222228/git-manual)


### 查看文件或目录
* `Print Working Directory`查看当前目录的绝对路径 `PWD`

* `List`查看当前目录列表 `ls`

* 查看指定目录列表 `ls ~/Desktop`

* 查看目录下文件内容查看全部 `cat 1.txt`

* 查看目录下文件内容查看开头内容

默认为开头十行，也可以设置为开头`14`行
```
head 1.txt
// 或者 
head 1.txt -n 14
```

* 查看目录下文结尾内容
默认为结尾十行，也可以设置为结尾14行
```
tail 1.txt
// 或者
tail 1.txt -n 14
```
* 查看目录下文件,并分屏滚动查看内容 `less 1.txt`
### 新增文件或目录 
* 创建文件`touh 1.txt`

* 创建文件
`echo HelloWorld` 创建文字内容 `echo HelloWorld > 1.txt ` 追加文字内容 `echo My >> 1.txt` 一次添加多行文字内容 `echo -e "1\n2" > 1.txt"`

* 创建目录`Mkdir myfile`

* 创建一次创建多个目录 `Mkdir myfile1  myfile2  myfile3`

* 创建一次创建多个嵌套目录 `Mkdir -p myfile1/myfile2/myfile3`
### 复制文件或目录 
* 复制文件,将`1.txt`复制到新的`2.txt`, 命令为 `cp 1.txt 2.txt`

* 复制目录,将目录`a`复制到新的目录`b`, 命令为 `cp -r a b`
### 删除文件或目录 
* 清除屏幕代码 `clear`
* 删除文件`rm 1.txt`
* 删除目录`a`, 命令为 `rm -r a`
### 修改文件或目录 
* 修改文件
`code 1.txt` 或者追加内容 `echo 'acvd' >> 1.txt`
* 清空文件
` echo '' > 1.txt`
* 移动文件,将文件`1.txt`移动到桌面
` mv 1.txt Desktop`
* 重命文件, 将文件`1.txt`修改为`2.txt`
`mv 1.txt 2.txt`
* 修改文件更新时间`touch 1.txt`
### 查询命令 
`ls --help | less`
或者下载简易查询手册
`yarn global add tldr`

使用方法查询`ls`命令
`tldr ls`
### 骚操作 
* 查询命令是否成功，成功返回`0`，非`0`则失败, 命名为 `echo $?`
* `&&` 操作，当一条命令成功后，执行另一条, 命令为`rm 1.txt && echo 移除成功`
* `;`操作，不管前一条命令是否成功，都会执行后一条命令, 命令为`rm 1.txt ; echo 移除成功`
* 通过`VS code`打开文件, `code 1.txt` 或者 `start 1.txt`
* 文件添加可执行权限,`chmod + x file1`
* 将文件路径添加到电脑的环境变量`Path` 中，可直接运行，例如 `file` 
### 绝对路径与相对路径
* 当前目录为 `./`
* 父目录为 `../`

绝对路径是从根目录开始，一定以/开头，~ 开头也是绝对路径，为用户目录。

例如
```
 .,
 ./xxx,
 ./xxx/,
 xxx,
 xxx/1.txt
 ```
相对路径是相对于当前目录的，不以`/`开头。

例如
```
/c/Users/Fang/Desktop,
 /c/Users/Fang/Music,
 ~/Desktop,
 ~/Music`
```
### 初始GitHub本地
```
git config --global user.name  // 设置用户信息
git config --global user.email // 设置用户邮箱信息
git config --global push.default simple
git config --global core.quotepath false
git config --global core.editor "code --wait"
git config --global core.autocrlf input
```
查询是否配置成功, `git config --global --list`
### 配置GitHub
```
git init // 初始化Git,创建.git目录
git add // 为添加文件变化，而不是文件本身
git add userfile // 添加本地文件到git目录
      
rm index.html // 删除本地文件，然后添加变化
git add .

git status 或者 git status -sb // 提交git版本，申明信息

```
忽略文件不被添加到`git`目录, 
1. 新建文件`.gitignore`,
2. 在该文件添加忽略的文件名，例如`1.txt`
### 提交文件和查看历史
```
git commit -m "初始话文件" // 提交git版本，回顾变动，申明信息
git commit -v // 查看git命令历史
```
### 查看历史或回滚版本
```
history // 查看git历史
git log // 查看git所有历史
git reflog // 回滚git版本
git reset --hard HEAD // 回滚到该commint的状态
```
### 配置Branch
```
git branch x // 基于当前git commit,创建git分支
git checkout x // 切换到该git分支
git branch // 查询所在Branch,以及所有Branch
git branch -d x // 删除Branch
```
### 解决合并冲突
```
git merge x // 合并某Branch
git status -sb // 查看出现冲突的文件

```
处理冲突,
1. 打开冲突文件，
2. 删除不同的代码，删除`===`，或者`<<<<<`, 保存。
3. 添加变化`git add .` 
4. 最后推送`git commit && git push`
### 生成SShKey
`SSh Key`
 
`Git`在本地存有私钥，`GitHub`云端存有公钥，唯有二者匹配，才能正常运行。通过`SSh key`加密连接

> [帮助文档](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

 1. 下载`SSH` 密钥 `ssh-keygen -t rsa -b 4096 -C "your_email@exampl.com"`
 2. 在本地找到`SSH` 密钥，为公钥，复制到GitHub的设置里 `cat ~/Users/caval/.ssh/id_rsa.pub`
 3. 确认是否配对成功,成功为yes
 4. 查询结果`ssh -T git@github.com` 
### 初始Github本地
```
echo "# LeariningNote" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:Captain-Tab/xxx1.git
git push -u origin master
```
### 上传到GitHub
```
git push origin x:x // 将本地分支推送到远程仓库
或者
`git checkout x  // 切换Branch
`git push -u origin x // 然后推送
```
### clone命令
```
git clone git@username/xxx.git //在本地复制创建一个xxx目录, 在本地复制创建一个xxx目录
cd xxx  // 然后切换到该文件
```
```
git clone git@username/xxx.git aaa // 在当前目录复制创建一个xxx目录, 但是重命名为 aaa
cd aaa // 然后切换到该文件
```
```
cd /aaa // 在指定目录aaa复制创建一个xxx目录
git clone git@username/xxx.git xxx // 然后下载分支
```
### 推送骚操作
如何将1个文件上传到两个不同的GitHub远程仓库，
 ```
git remote add origin git@github.com:Captain-Tab/xxx1.git // 第一个
git push origin -u xxx1 master     // 然后
git remote add origin2 git@github.com:Captain-Tab/xxx2.git // 第二个
git push origin2 -u xxx2 master  // 然后
``` 
### 设置别名Alias
```
touch ~/.bashrc // 更新bash配置文件
echo 'alias ga="git add"'>> ~/.bashrc  // git add追加别名
echo 'alias gc="git commit -v"'>> ~/.bashrc   // git commit 追加别名
source ~/.bashrc  // 最后运行 
```
### rebase命令
```
git rebase -i HEAD // 一个分支的修改合并到当前分支
git rebase --abort  // 终止rebase的行动
git rebase --continue // 继续rebase的行动
```
### stash命令
```
git stash // 将当前的文档隐藏，不加入文档变化流程
git stash pop // 显示隐藏文件
git stash apply // 显示隐藏文件
```
### git脑图
![git脑图](/assets/ReadingResources/git脑图.jpg)