## 目录
1. [代码](#代码)
2. [分析](#分析)
3. [实践](#实践)
4. [相关链接](#相关链接)

### 代码
```
// 声明一个泛型类型别名，返回值与泛型类型相同，入参类型不限制。
type Reverse<T> = (arg: any) => T

// 声明一个泛型方法，入参arg继承泛型约束，返回空对象并断言其类型为T
function returnResultType<T>(arg: Reverse<T>) : T {
  return {} as T
}

// 调用returnResultType，传入方法 (arg: any) => 3，获得result返回值
const result = returnResultType((arg: any) => 3)

// 获取result类型并重名为ResultType
type ResultType = typeof result

```

### 分析
由于入参的类型为`Reverse<T>` ，通过入参返回值是3可以推断出
```
type Reverse<number> = (arg: any) => number;
```
由于`Reverse`的`T`是根据`returnResultType`传入的，所以同理得出：
```
function returnResultType<number>(arg: Reverse<number>): number {
  return {} as number;
}
```

### 实践
```
const reducers = combineReducers({
  userReducer,
  loginReducer
});

type Reverse<T> = (state: any, action:any) => T;

function returnResultType<T>(arg: Reverse<T>): T {
  return {} as T;
}

const GlobalState = returnResultType(reducers);

type GlobalStateType = typeof GlobalState;
```


### 相关链接
>[Typescript之获取函数返回值类型](https://zhuanlan.zhihu.com/p/59434318)