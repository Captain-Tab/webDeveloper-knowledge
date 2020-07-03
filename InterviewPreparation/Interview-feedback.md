
## 目录
1. [面试一](#面试一)



### 面试一

问题1. `Img`标签的`title`和`alt`有什么区别

问题2. 简述`box-sizing`属性的常见用法

问题3. 简述伪类与伪元素的定义区别

问题4. 针对前端性能优化，你做过哪些尝试？

问题5. 请输入输出结果
```
let str = true
console.log(str + 0) 
console.log(str + "xyz")
console.log(str + true)
console.log(str + false)
console.log([str].map(Number)
```
问题6. 
输入为：`["abc","bac","acb","acg","acz"]`

输出为：`["bac","abc","acb","acg","acz"]`

排序的规则为：按照从第二个字符的字母表进行排序，例如`“abc”`中第二个字符为`Gb`，`“bac”`第二个字符为`a`，那么`“bac”`排在`“abc”`的前面；如果第二个字符大小也相同，则按照第三个字符的大小进行排序，以此类推，直至比较出大小；如果两个字符完全相同则顺序不变。

问题7. 
声明一个函数add，使得add(2,3,4) 和add(2)(3)(4)都输出9

```
function add(arg) {
}
console.log(add(2,3,4))
console.log(add(2)(3)(4))
```
### 面试二

问题1: 一只青蛙一次可以跳上`1`级台阶，也可以跳上`2`级台阶。求该青蛙跳上一个`n`级的台阶总共：有多少种跳法。
 
问题2: 浏览器输入`url`到网页渲染的过程
 

问题3: 你之前的工作经历


问题4: `React`的`hooks`和类组件的区别
 

问题5: `Vue`和`React`的区别
 

问题6:怎么提高`React`的渲染性能

### 面试三

问题1: `Promise`的用法
 
问题2: `ES 6`语法
 

问题3: `const , let,var`作用和原理


问题4: 跨域的方法和原理
 

问题5: `webpack`的用法，用过哪些`loader`
 

问题6: `React`数据通信，父子组件通信，兄弟组件通信

问题7: `React`hooks的原理和用法

问题8: 实现深拷贝，深拷贝函数