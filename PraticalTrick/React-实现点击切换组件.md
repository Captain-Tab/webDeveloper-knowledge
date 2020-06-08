## 目录
1. [目的](#目的)
2. [思路](#思路)
3. [步骤](#步骤)
4. [完整代码](#完整代码)
5. [更多信息](#更多信息)

### 目的

当用户点击某元素，将在页面切换为某个组件

### 思路

- 新建三个`React`组件 和三个被点击的`DOM`元素
- 给三个被点击的`DOM`元素添加点击事件，传输参数并触发回调函数
- 回调函数，收到参数，修改数据
- 渲染函数, 监听数据变化，渲染不同的组件

### 步骤

1. 新建三个组件，类似于下面的代码

```
import * as React from 'react';

class PotatoCount extends React.Component {
  public render() {
    return (
      <div className="PotatoCount" id="PotatoCount">
        PotatoCount
      </div>
    );
  }
}

export default PotatoCount;

```

2. 导入三个子组件，并在父组件新建`state`对象，其中的`render`值为空

```
import TotalCount from './TotalCount';
import PotatoCount from './PotatoCount';
import MissionCount from './MissionCount';

class Statistics extends React.Component {
  constructor() {
    super(props);
    this.state = {
      render: ''
    }
  }
```

3. 给三个被点击的`DOM`元素添加点击事件`onClick={()=>{this.ShowComponent('showHideTotalCount')}}`，传输参数并触发回调函数

```
public render() {
    return (
      <div >
          <ul>
            <li onClick={()=>{this.ShowComponent('showHideTotalCount')}}>统计</li>
            <li onClick={()=>{this.ShowComponent('showHidePotatoCount')}}>番茄历史</li>
            <li onClick={()=>{this.ShowComponent('showHideMission')}}>累计完成11个任务</li>
          </ul>
     <div/>
```

4. 回调函数根据传入的参数，修改`state`的`render`值

```
  ShowComponent(name:string){
    this.setState({render:name})
  }
```

5. 渲染函数根据`state`的`render`值，返回不同的组件

```
  renderComponent =()=>{
    switch (this.state.render) {
      case 'showHideTotalCount': return <TotalCount/>
      case 'showHidePotatoCount': return <PotatoCount/>
      case 'showHideMission': return <MissionCount/>
      default: return <TotalCount/>
    }
  }

  public render() {
    return (
      <div className="Statistics" id="Statistics">
          <ul>
            <li onClick={()=>{this.ShowComponent('showHideTotalCount')}}>统计</li>
            <li onClick={()=>{this.ShowComponent('showHidePotatoCount')}}>番茄历史</li>
            <li onClick={()=>{this.ShowComponent('showHideMission')}}>累计完成11个任务
            </li>
          </ul>

           <div>
             {this.renderComponent()}
           </div>
        </div>
    }
```

效果图

![](https://user-gold-cdn.xitu.io/2020/6/6/1728849aa5ca3fa7?w=1282&h=187&f=gif&s=12782)

### 完整代码

```
import * as React from 'react';

class PotatoCount extends React.Component {
  public render() {
    return (
      <div className="Component" id="PotatoCount">
        PotatoCount
      </div>
    );
  }
}
export default PotatoCount;

// 省略代码
class TotalCount ******* export ****
class MissionCount ***** export ****


import TotalCount from './TotalCount';
import PotatoCount from './PotatoCount';
import MissionCount from './MissionCount';

class Statistics extends React.Component {
  constructor() {
    super(props);
    this.state = {
      render: ''
    }
  }

 ShowComponent(name:string){
    this.setState({render:name})
  }

 renderComponent =()=>{
    switch (this.state.render) {
      case 'showHideTotalCount': return <TotalCount/>
      case 'showHidePotatoCount': return <PotatoCount/>
      case 'showHideMission': return <MissionCount/>
      default: return <TotalCount/>
    }
  }

public render() {
    return (
      <div>
          <ul>
            <li onClick={()=>{this.ShowComponent('showHideTotalCount')}}>统计</li>
            <li onClick={()=>{this.ShowComponent('showHidePotatoCount')}}>番茄历史</li>
            <li onClick={()=>{this.ShowComponent('showHideMission')}}>累计完成11个任务
            </li>
          </ul>

           <div>
             {this.renderComponent()}
           </div>
        </div>
    }
```

### 更多信息

[stack Overflow 类似代码](https://stackoverflow.com/questions/42153627/reactjs-onclick-display-component)
