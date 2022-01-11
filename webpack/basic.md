## 目录
1. [bable](#babel)
2. [寄生继承](#寄生继承)
3. [隐式混入](#隐式混入)
4. [原型继承](#原型继承)
4. [总结](#总结)

### babel
原理
* parse: 把代码 code 变成 AST
* traverse: 遍历 AST 进行修改
* generate: 把 AST 变成代码 code2
即 code --(1)-> ast --(2)-> ast2 --(3)-> code2


使用AST的原因
* 你很难用正则表达式来替换，正则很容易把 let a = 'let' 变成 var a = 'var'
* 你需要识别每个单词的意思，才能做到只修改用于声明变量的 let
* 而 AST 能明确地告诉你每个 let 的意思

