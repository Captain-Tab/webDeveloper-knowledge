## 目录
1. [Encapsulation封装](#Encapsulation封装)
2. [封装技术](#封装技术)
3. [更多信息](#更多信息)


### Encapsulation封装
#### 定义
封装就是提高单一功能或模块的独立性和复用。任何为这个目标所做的努力都是在对代码封装
#### 通俗比喻
例如电脑，把`CPU`, 内存，硬盘，主板，显卡封装起来，用户只需要操纵显示器，键盘， 鼠标等设备。用户不需要完全了解计算机内部由什么组成，怎么运行就可以操作电脑。

#### 优点
1. 便于到处重复使用
2. 对内部部件有一个完整性的包括，不暴露内部信息
3. 把所有的东西封装起来，只留下若干个接口，便于使用维护

#### 术语
* `Interface`接口, 被封装后的东西暴露一些功能提供给外部使用，这就是接口。例如，计算机的`USB`接口，`HDMI`接口等等。通过使用这些接口，用户可以和电脑通信，从而操作电脑。
* `Library`库, 提供给其他人使用的工具代码叫做库, 例如`jQuery, Underscore`等等。
* `Application programming interface-API`库暴露出来的函数或者属性称为`API`
* `Framework`框架, 框架其实也可以是库，当库变得巨大，需要学习才能看的懂，那么可以称为框架，例如`Vue/React`

### 封装技术
#### 对象风格/空间风格
`window.dom`是我们提供的全局对象

#### 对象风格操作
1. 增加

``dom.create(`<div>hi</div>`)`` 用于创建节点
```
window.dom = {
    create(string) { 
    const container = document.createElement("template");
    container.innerHTML = string.trim(); // trim去掉前后空格
    return container.content.firstChild;
    }
};
```
`dom.after(node, node2)`用于新增弟弟
```
window.dom = {
    after(node, node2) { 
    node.parentNode.insertBefore(node2, node.nextSiblings);
    }
};
```
`dom.before(node, node2)`用于新增哥哥
```
window.dom = {
    before(node, node2){
        node.parentNode.insertBefore(node2, node);
    }
}
```
`dom.append(parent, child)`用于新增儿子
```
window.dom = {
    append(parent, node2){
        parent.appendChild(node)
    }
}
```
``dom.wrap(`<div></div>`)``用于新增爸爸
```
window.dom = {
    wrap(node, parent){
        dom.before(node, parent) // 将新增的div插入到子节点前面
        dom.append(parent, node)
        // 子节点插入新增div
    }
};
```

2. 删除

`dom.remove(node)`用于删除节点
```
window.dom = {
    remove(node){
        node.parentNode.removeChild(node)
        return node
    }
};
```
`dom.empty(paretnt)`用于删除后代
```
window.dom = {
    empty(node){
        const {childNodes} = node // 等价于 const childNodes = node.childNodes
        const array = []
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    }
};
```

3. 修改

`dom.attr(node, 'title',?)`用于读写属性
```
window.dom = {
    attr(node, name, value){
     // 重载
     if(arguments.length === 3){
         return node.setAttribute(name, value)
     }else if(arguments.length === 2){
         return node.getAttribute(name)
     }
    }
};
```
`dom.text(node,?)`用于读写文本内容
```
window.dom = {
    text(node, string){
      if(arguments.length === 2){
        // 适配
        if('innerText' in node){
            node.innerText = string  // IE支持该方法 
        }else{
            node.textConten = string // fireFox / chrome支持该方法
        }
      }else if(arguments.length === 1){
        if('innerText' in node){
            return node.innerText
        }else{
            return node.textConten
        } 
      }
    }
};
```
`dom.html(node, ?)`用于读写`HTML`内容
```
window.dom = {
   html(node, string){
       if(arguments.length === 2){
           node.innerHTML = string
       }else if(arguments.length === 1){
           return node.innerHTML
       }
   }
};
```
`dom.style(node, {color: 'red'})`用于修改`style`
```
window.dom = {
   style(node, name, value){
   if(arguments.length === 3){
    // dom.style(div, 'color', 'red')
       node.style[name] = value
   }else if(arguments.length === 2){
      if(typeof name === 'string'){
        // dom.style(div, 'color')
        return node.style[name]  
      }else if(name instanceof Object){
        // dom.style(div, {color: 'red'})
        const objet = name
        for(let key in object){
            node.style[style] = object[key]
        }
      }
     }
    }
   };
```
`dom.class.add(node, 'blue`)用于添加`class`
```
window.dom = {
       class: {
           add(node, className){
               node.classList.add(className)
           }
       }
   };
```
`dom.class.remove(node, 'blue')`用于删除`class`
```
window.dom = {
       class: {
           add(node, className){
               node.classList.add(className)
           },
           remove(node, className){
               node.classList.remove(className)
           },
           has(node, className){
               return node.classList.contains(className)
           }
       }
   };
```
`dom.on(node, 'click', fn)`用于添加事件监听
```
window.dom = {
       class: {
           on(node, eventName, fn){
               node.addEventListener(eventName, fn)
           }
       }
   };
```
`dom.off(node, 'click', fn)`用于删除事件监听
```
window.dom = {
       class: {
           off(node, eventName, fn){
               node.removeEventListener(eventName, fn)
           }
       }
   };
```

4. 查看

`dom.find('选择器')`用于获取标签或者标签们
```
window.dom = {
       class: {
           find(selector, scope){
               return ( scope || document ).querySelectorAll(selector)
           }
       }
   };
```
`dom.parent(node)`用于获取父元素
```
window.dom = {
       class: {
           parent(node){
               return node.parentNode
           }
       }
   };
```
`dom.children(node)`用于获取子元素
```
window.dom = {
       class: {
           children(node){
               return node.children
           }
       }
   };
```
`dom.siblings(node)`用于获取兄弟姐妹元素
```
window.dom = {
       class: {
           siblings(node){
               return Array.from(node.parentNode.children).filter(n=> n!== node)
           }
       }
   };
```
`dom.next(node)`用于获取弟弟
```
window.dom = {
       class: {
           next(node){
               let x = node.nextSibling
               while(x && x.nodeType === 3){
                   x = x.nextSiblings
               }
               return x
           }
       }
   };
```
`dom.previous(node)`用于获取哥哥
```
window.dom = {
       class: {
           previous(node){
               let x = node.previousSibling
               while(x && x.nodeType === 3){
                   x = x.previousSibling
               }
               return x
           }
       }
   };
```
`dom.each(nodes, fn)`用于遍历所有节点
```
window.dom = {
       class: {
           each(nodeList, fn){
              for(let i = 0; i < nodeList.length; i++){
                  fn.call(null, nodeList[i])
              }
           }
       }
   };
```
`dom.index(node)`用于获取元素的排序
```
window.dom = {
       class: {
           index(node){
             const list = dom.children(node.parentNode)
             let i
             for(i = 0; i < list.length; i++){
                 if(list[i] === node){
                     break
                 }
             }
             return i
           }
       }
   };
```

### 更多信息

>[封装DOM库](https://github.com/Captain-Tab/Encapuslation-dom-demo1)

