## 目录
1. [目的](#目的)
2. [思路](#思路)
3. [步骤](#步骤)
4. [完整代码](#完整代码)
5. [更多信息](#更多信息)

### 目的
前端实现分页，用户点击分页按钮，数据分页显示

### 思路
* 引入`Antd Design`的`Pagination`分页组件
* 在构造函数中设置数据`state`
* 使用其自带的`onChange`事件函数，当点击页面时，这个函数会默认自动将页面数作为参数传入
* 使用`onChange`函数，操纵数据，截取数组的数据片段
* 渲染函数, 监听数据变化，渲染不同的页面数据


### 步骤
1. 引入`Antd Design`的`Pagination`分页组件, 在构造函数中设置数据`state`,
```
import { Card, Pagination } from "antd";

export class App extends Component {
  constructor(props) {
    super(props);
    // 设置一个页面显示3个数据
    this.state = {
      minValue: 0,
      maxValue: 3
    };
  }
  
**********

```
2. 使用其自带的`onChange`事件
```
// 根据传入的页面值，计算并截取数组的部分数据，作为相应页面的数据，这里一个页面只显示3个数据
 handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 3
      });
    } else {
      this.setState({
        minValue: (value-1) * 3,
        maxValue: (value-1) * 3+ 3
      });
    }
  };

 render(){
    ********

     <Pagination
              defaultCurrent={1}  // 默认在第一个页面
              defaultPageSize={3} // 默认一个页面显示3个数据
              // 点击页面触发更新，点击时，默认传入页面值，例如第一页，值为1
              onChange={this.handleChange} 
              // 设置整个数据的总数量
              total={data.length}
            />
    *******
    }   
        
```
3. 根据`state`的值，渲染相应页面的数据，例如页面`2`，其数据的位置区间为`3-6`,
```
render(){
         {data &&
              data.length > 0 &&
              data.slice(this.state.minValue, this.state.maxValue).map(val => (
                <Card
                  title={val.title}
                  style={{ width: 300 }}
                >
                  <p>{val.value}</p>
                </Card>
          ))}
        }
          
```

效果图

<img src="https://user-gold-cdn.xitu.io/2020/6/8/1729443f88ece142?w=456&h=623&f=gif&s=67072" width=300px height=350px>


### 完整代码
```
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Card, Pagination } from "antd";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 3
    };
  }
  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 3
      });
    } else {
      this.setState({
        minValue: (value-1) * 3,
        maxValue: (value-1) * 3+ 3
      });
    }
  };
  render() {
    let data = [
      { title: "Card title1", value: "Card content1" },
      { title: "Card title2", value: "Card content2" },
      { title: "Card title3", value: "Card content3" },
      { title: "Card title4", value: "Card content4" },
      { title: "Card title5", value: "Card content5" },
      { title: "Card title6", value: "Card content6" },
      { title: "Card title7", value: "Card content7" },
      { title: "Card title8", value: "Card content8" },
      { title: "Card title9", value: "Card content9" },
      { title: "Card title10", value: "Card content10" },
      { title: "Card title11", value: "Card content11" },
      { title: "Card title12", value: "Card content12" },
      { title: "Card title13", value: "Card content13" },
      { title: "Card title14", value: "Card content14" },
      { title: "Card title15", value: "Card content15" }
    ];
    return (
      <div>
        {data &&
          data.length > 0 &&
          data.slice(this.state.minValue, this.state.maxValue).map(val => (
            <Card
              title={val.title}
              style={{ width: 300 }}
            >
              <p>{val.value}</p>
            </Card>
          ))}
        <Pagination
          defaultCurrent={1}
          defaultPageSize={3}
          onChange={this.handleChange}
          total={data.length}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
```

### 更多信息
[stack Overflow类似代码](https://stackoverflow.com/questions/53843548/pagination-and-card-components-with-ant-design-antd)

[Antd Design Pagination分页](https://ant.design/components/pagination-cn/#components-pagination-demo-all)