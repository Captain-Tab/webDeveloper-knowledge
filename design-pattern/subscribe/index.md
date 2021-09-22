### 定义
订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

### 使用场景
当你负责的模块，基本满足以下情况时

* 各模块相互独立
* 存在一对多的依赖关系
* 依赖模块不稳定、依赖关系不稳定
* 各模块由不同的人员、团队开发

> [代码实例](/design-pattern/subscribe/eventhub.ts)