
## 目录
1. [面试一](#面试一)



### 面试一

1. `Img`标签的`title`和`alt`有什么区别

2. 简述`box-sizing`属性的常见用法

3. 简述伪类与伪元素的定义区别

4. 针对前端性能优化，你做过哪些尝试？

5. 请输入输出结果
```
let str = true
console.log(str + 0) 
console.log(str + "xyz")
console.log(str + true)
console.log(str + false)
console.log([str].map(Number)
```
6. 
输入为：`["abc","bac","acb","acg","acz"]`

输出为：`["bac","abc","acb","acg","acz"]`

排序的规则为：按照从第二个字符的字母表进行排序，例如“abc”中第二个字符为b，“bac”第二个字符为a，那么“bac”排在“abc”的前面；如果第二个字符大小也相同，则按照第三个字符的大小进行排序，以此类推，直至比较出大小；如果两个字符完全相同则顺序不变。

7. 
声明一个函数add，使得add(2,3,4) 和add(2)(3)(4)都输出9

```
function add(arg) {
}
console.log(add(2,3,4))
console.log(add(2)(3)(4))
```
