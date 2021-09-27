## 目录
1. [LRU策略](#LRU策略)
2. [组件实现原理](#组件实现原理)
3. [组件渲染](#组件渲染)
4. [相关文档](#相关文档)


### LRU策略
在使用`keep-alive`时，可以添加 `prop` 属性 `include、exclude、max` 允许组件有条件的缓存。既然有限制条件，旧的组件需要删除缓存，新的组件就需要加入到最新缓存，那么要如何制定对应的策略？
`LRU`（Least recently used，最近最少使用）策略根据数据的历史访问记录来进行淘汰数据。LRU 策略的设计原则是，如果一个数据在最近一段时间没有被访问到，那么在将来它被访问的可能性也很小。也就是说，当限定的空间已存满数据时，应当把最久没有被访问到的数据淘汰。

1. 现在缓存最大只允许存3个组件，ABC三个组件依次进入缓存，没有任何问题
2. 当D组件被访问时，内存空间不足，A是最早进入也是最旧的组件，所以A组件从缓存中删除，D组件加入到最新的位置
3. 当B组件被再次访问时，由于B还在缓存中，B移动到最新的位置，其他组件相应的往后一位
4. 当E组件被访问时，内存空间不足，C变成最久未使用的组件，C组件从缓存中删除，E组件加入到最新的位置


<img src="https://picb.zhimg.com/80/v2-998b52e7534278b364e439bbeaf61d5e_720w.jpg" width="700px" hight="300px">

### 组件实现原理
`kepp-alive`实际是一个抽象组件，只对包裹的子组件做处理，并不会和子组件建立父子关系，也不会作为节点渲染到页面上。在组件开头就设置`abstract`为`true`，代表该组件是一个抽象组件。

```
/ 源码位置：src/core/components/keep-alive.js
export default {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created () {
    this.cache = Object.create(null)
    this.keys = []
  },
  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },
  render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```

那么抽象组件是如何忽略这层关系的呢？在初始化阶段会调用`initLifecycle`，里面判断父级是否为抽象组件，如果是抽象组件，就选取抽象组件的上一级作为父级，忽略与抽象组件和子组件之间的层级关系。

```
// 源码位置： src/core/instance/lifecycle.js
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  vm.$parent = parent
  // ...
}
```

如果 `keep-alive` 存在多个子元素，`keep-alive` 要求同时只有一个子元素被渲染。所以在开头会获取插槽内的子元素，调用 `getFirstComponentChild` 获取到第一个子元素的 `VNode`

```
// check pattern
const name: ?string = getComponentName(componentOptions)
const { include, exclude } = this
if (
  // not included
  (include && (!name || !matches(include, name))) ||
  // excluded
  (exclude && name && matches(exclude, name))
) {
  return vnode
}

function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  return false
}
```


接着判断当前组件是否符合缓存条件，组件名与include不匹配或与exclude匹配都会直接退出并返回 VNode，不走缓存机制

```
const { cache, keys } = this
const key: ?string = vnode.key == null
  // same constructor may get registered as different local components
  // so cid alone is not enough (#3269)
  ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
  : vnode.key
if (cache[key]) {
  vnode.componentInstance = cache[key].componentInstance
  // make current key freshest
  remove(keys, key)
  keys.push(key)
} else {
  cache[key] = vnode
  keys.push(key)
  // prune oldest entry
  if (this.max && keys.length > parseInt(this.max)) {
    pruneCacheEntry(cache, keys[0], keys, this._vnode)
  }
}
vnode.data.keepAlive = true
```

匹配条件通过会进入缓存机制的逻辑，如果命中缓存，从 `cache` 中获取缓存的实例设置到当前的组件上，并调整 `key` 的位置将其放到最后。如果没命中缓存，将当前 `VNode` 缓存起来，并加入当前组件的 `key`。如果缓存组件的数量超出 `max` 的值，即缓存空间不足，则调用 `pruneCacheEntry` 将最旧的组件从缓存中删除，即 `keys[0]` 的组件。之后将组件的 `keepAlive` 标记为 `true`，表示它是被缓存的组件。

```
function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
```

pruneCacheEntry 负责将组件从缓存中删除，它会调用组件 $destroy 方法销毁组件实例，缓存组件置空，并移除对应的 key。

```
mounted () {
  this.$watch('include', val => {
    pruneCache(this, name => matches(val, name))
  })
  this.$watch('exclude', val => {
    pruneCache(this, name => !matches(val, name))
  })
}

function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

```

`keep-alive` 在 `mounted` 会监听 `include` 和 `exclude` 的变化，属性发生改变时调整缓存和 keys 的顺序，最终调用的也是 `pruneCacheEntry`。
小结：`cache` 用于缓存组件，`keys` 存储组件的 `key`，根据LRU策略来调整缓存组件。`keep-alive `的 `render` 中最后会返回组件的 `VNode`，因此我们也可以得出一个结论，`keep-alive` 并非真的不会渲染，而是渲染的对象是包裹的子组件。

### 组件渲染

渲染过程最主要的两个过程就是 `render` 和 `patch`，在 `render` 之前还会有模板编译，`render` 函数就是模板编译后的产物，它负责构建 `VNode` 树，构建好的 `VNode` 会传递给 `patch`，`patch` 根据 `VNode` 的关系生成真实`dom`节点树。


#### 初始化渲染
小结：所以在初始化渲染中，`keep-alive`将A组件缓存起来，然后正常的渲染A组件。

### 渲染缓存

当切换到`B`组件，再切换回`A`组件时，`A`组件命中缓存被重新激活。非初始化渲染时，`patch` 会调用 `patchVnode` 对比新旧节点。
所以在缓存组件被激活时，不会执行 `created` 和 `mounted` 的生命周期函数。

小结：组件首次渲染时, `keep-alive` 会将组件缓存起来。等到缓存渲染时，`keep-alive` 会更新插槽内容，之后 `$forceUpdate` 重新渲染。这样在 `render` 时就获取到最新的组件，如果命中缓存则从缓存中返回 `VNode`


### 总结
`keep-alive`组件是抽象组件，在对应父子关系时会跳过抽象组件，它只对包裹的子组件做处理，主要是根据LRU策略缓存组件`VNode`，最后在`render`时返回子组件的 `VNode`。缓存渲染过程会更新`keep-alive`插槽，重新再`render`一次，从缓存中读取之前的组件`VNode`实现状态缓存。



### 相关文档
>[Vue源码解析，keep-alive是如何实现缓存的?](https://juejin.cn/post/6862206197877964807)