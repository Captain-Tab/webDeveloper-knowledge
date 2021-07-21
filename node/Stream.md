1. [Stream](#Stream)
2. [第二范式2NF](#第二范式2NF)
3. [第三范式3NF](#第三范式3NF)
4. [数据库设计经验](#数据库设计经验)
5. [一对一](#一对一)
6. [一对多](#一对多)
7. [多对多](#多对多)
8. [什么时候建立关联表](#什么时候建立关联表)
9. [join](#join)
10. [缓存字段](#缓存字段)
11. [事务](#事务)
12. [MySQL存储引擎](#MySQL存储引擎)
13. [索引](#索引)
x. [更多信息](#更多信息)

### Stream流
`Stream`是水流，数据流
* `stream.write`可以让流中有水(数据)
* 每次写的小数据叫做chunk(块)
* 产生的数据的一段叫做source(源头)
* 得到数据的一块叫做sink(水池)

<img src="../assets/node/database5.png" width="500" height="200" >

代码实例1
```
const fs = require('fs')
const stream = fs.createWriteStream('./big_file.txt')
for(let i = 0; i < 1000; i++) {
  stream.write(`这是第${i}行内容`)
}
stream.end()
console.log('done')
```

步骤：
* 打开流，多次往里面塞内容，关闭流
* 多次写的过程
* 最终得到一个128兆左右的文件

### 更多信息
> [Node's Streams](https://jscomplete.com/learn/node-beyond-basics/node-streams)

> [Stream English Version](https://nodejs.org/api/stream.html)

> [Stream Chinese Version](http://nodejs.cn/api/stream.html)

> [面试高级前端工程师必问之流-stream](https://juejin.cn/post/6844903635617316877)
