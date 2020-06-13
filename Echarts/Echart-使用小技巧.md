## 目录
1. [消除图表空白部分](#消除图表空白部分)
2. [去掉折线上面的小圆点](#去掉折线上面的小圆点)
3. [折现点添加数据显示](#折现点添加数据显示)
4. [自定义点显示框](#自定义点显示框)
5. [饼图设置文字显示在图内](#饼图设置文字显示在图内)
6. [设置坐标轴文字和tick](#设置坐标轴文字和tick)
7. [更多信息](#更多信息)

### 消除图表空白部分
我们可以通过`grid`属性来控制直角坐标系内绘图网格四周边框位置，具体有如下配置项：
* `x`：直角坐标系内绘图网格与左侧距离，数值单位 `px`，支持百分比（字符串），如：`50%`
* `x2`：直角坐标系内绘图网格与右侧距离，数值单位 `px`，支持百分比（字符串），如：`50%`
* `y`：直角坐标系内绘图网格与顶部距离，数值单位 `px`，支持百分比（字符串），如：`50%`
* `y2`：直角坐标系内绘图网格与底部距离，数值单位 `px`，支持百分比（字符串），如：`50%`

实例代码
```
   grid: {
            x: 50,
            y: 25,
            x2: 30,
            y2: 35
        },
```
### 去掉折线上面的小圆点
* `Echart`去掉折线上面的小圆点: 只需要加上`symbol: "none"`即可

* `Echart` 让曲线平滑: 只需要加上`smooth:true`即可

实例代码
```
series:[{
    symbol: "none", //去掉圆点
    name: "seriesName",
    type: "line",
　　smooth:true,  //让曲线变平滑的  
    data: "seriesData"
}]
```

### 折现点添加数据显示
```
    series: [{
      showSymbol: true,
      symbol: 'circle',     //设定为实心点
      symbolSize: 1,   //设定实心点的大小
      itemStyle : { normal: {label : {show: true}}, }, //折线点显示数据
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }]
```
### 自定义点显示框
使用函数完成自定义，`params`主要是对象数组，`params`和`echarts`的`series`是关联的。这里数组的个数取决于`series`的个数，当`series`只有一个时，`params`也就是只有一个对象的数组。
```
   tooltip: {
      show: true,
      // formatter函数完成自定义显示
      formatter:function (params: any) {
        let res = params.name + `: 完成了${params.value}个`
        return res
      },
      // 定义字体
      textStyle : {
        fontSize: 12,
      },
    },
```


### 饼图设置文字显示在图内
使用`lable`属性来进行设置
```
series: [
      {
        name: '统计',
        type: 'pie',
        // 设置数据显示在片区
        label:{
          normal:{
            show:true,
            position:'inner'
          },
          textStyle : {
            fontWeight : 300 ,
            fontSize : 10    //文字的字体大小
          },
          formatter:'{d}%'
        },
        radius: '70%',
        center: ['50%', '50%'],
        data: [
          {value: 9, name: '完成任务'},
          {value: 8, name: '未完成任务'}
        ],
        labelLine: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0,0, 0, 0.5)'
          }
        }
      }
    ]
```

### 设置坐标轴文字和tick
使用`axisLable`完成设置
```
 xAxis: {
      type: 'category',
      data: props.axisData,
      //使用axisLable完成设置
      axisLabel: {
        show: true, // 显示文字
        interval:0, // 间隔为0
        fontSize: 8, // 文字大小
        fontWeight: "bold",
      },
      axisTick: {
        show: true  // 隐藏tick
      }
    },
```

### 更多信息
[ECharts - 去除图表周围空白的部分（减少空白区域的大小）](https://www.hangge.com/blog/cache/detail_2161.html)