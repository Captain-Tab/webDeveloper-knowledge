## 目录
1. [引入echarts](#引入echarts)
2. [使用echarts](#使用echarts)
3. [更新主题](#更新主题)
4. [更新echarts数据](#更新echarts数据)
5. [加载数据](#加载数据)  
6. [点击事件](#点击事件)
7. [移动端适配](#移动端适配)
8. [echarts适配Vue](#echarts适配Vue)
9. [更多资料](#更多资料)


## 引入echarts
方法一： 在无`webapck/ parcel`情况下，`CDN`引入
直接在`html`引入`<script>`标签
```
<script src="https://cdn.bootcdn.net/ajax/libs/echarts/4.7.0/echarts.min.js"></script>
```
然后使用全局变量`window.echarts`

方法二：有`webpack/parcel`情况下，命令行下载`echarts`
```
yarn add echarts
yarn add --dev @types/echarts  // 在TypeScript中运行
import echarts from 'echarts'或者`var echarts = require('echarts')`
```
然后使用`echarts`即可
## 使用echarts
1. 准备`DOM`容器, 即`echarts`挂载的容器
```
<body>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
</body>
```

2. 添加`echarts`代码
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="echarts.min.js"></script>
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    </script>
</body>
</html>
```
3. 效果图
![](https://user-gold-cdn.xitu.io/2020/5/24/172440884faea39d?w=770&h=385&f=jpeg&s=32762)

## 更新主题
方法一：通过`echarts.init()`方法
```
const main = document.getElementById('main')
const myChart = eacharts.init(main, 'dark') // 第二次参数可以设置为light或者default
```
方法二：细节修改
```
myChart.setOption({
    series:[{
    // 修改线条的填充颜色
        lienStyle:{
            color:blue
        },
    // 修改填充点宽带
       itemStyle:{
         borderWidth:10  
       },
        name:'bug数'，
        data:[820,935,901,934,1290,1330,1320],
        type:'line'
    }]
})
```
## 更新echarts数据
使用`setOption`更新`x`坐标轴数据
* 使用`showLoading() / hideLoading()`
* `echarts`会自动找出差异，并更新图表
```
// html
<button id="loadMore">加载更多</button>

// js
const loadMoreButton = document.getElementById('loadmore')
// echarts部分
loadMoreButton.addEventListener('click',()=>{
    const newKey = '2020-01-27'
    const newValue = 10
    myChart.setOption({
        xAxis:{
         data:[...prviousData, newKey] //整合新旧数据生成新的数据
        },
        series:[{
            data:[...value, newValue]  //整合新旧数据生
        }]
    })
})
```
## 加载数据
使用`showLoading()`显示加载数据的动画, `showLoading()`关闭加载的动画
```
let isLoading = false
loadMoreButton.addEventListener('click',()=>{
   if(isLoading === true) {return}
    myChart.showLoading()
    isLoading = true
    setTimeout(()=>{
        const newKey = '2020-01-27'
        const newValue = 10
        myChart.setOption({
            xAxis:{
             data:[...prviousData, newKey] //整合新旧数据生成新的数据
            },
            series:[{
                data:[...value, newValue]  //整合新旧数据生
            }]
        })
        myChart.showLoading()
        isLoading= false
    }, 3000)
})
```
## 点击事件
使用`on`监听事件
```
myChart.on('click',(e)=>{
    window.alert(`${e.name}`被点击了)
})
```
## 移动端适配
常规技巧
`meta`淘宝手机版复制到项目的`html`中
```
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
```
使用`JS`获取屏幕宽度设置在`div`上, 设计宽高比例
```
const width = document.documentElement.clientWidth
main.style.width = `${width}px`
main.style.height = `${width*1.2}px`
```
同时适配移动端和`PC`端, 使用`baseOption`和`media`
```
myChart.setOption({
    baseOption:{
       // PC端自定义部分 
    },
    meidia:[
    {
         // 移动端自定义部分
        query:{
           maxWidth:500 
        },
        option:{
            series:[{
                // 省略代码
            }]
        }
        // 省略代码
    }
    ]
})
```
## echarts适配Vue
将`echarts`封装成组件
```
// 子组件 vue-echarts
<template>
    <div ref="container">
    
    </div>
</template>

<script>
import echart from 'echarts'
export default {
    props: ['option','loading']
    mounted(){
        const width = document.documentElement.clientWidth
        this.$refs.container.style.width = `${width}px`
        this.$refs.container.style.height = `${width * 1.2}px`
        this.chart = echarts.init(this.$refs.container,'dark')
        this.chart.setOption(this.option)
    },
    watch:{
        option(){
            this.chart.setOption(this.option)
        },
        loading(){
            if(loading){
                this.chart.showLoading()
            }else{
                this.chart.hideLoading()
            }
        }
    }
}
</script>
```
```
// 父组件，包含echarts子组件
<template>
  <div>
      <h1>
          vue里使用echarts
      </h1>
      <vue-echarts :option="option" :loading="loading"></vue-echarts>
      <button @click="loadMore">加载更多</button>
  </div>
</template>

<script>
  import VueEcharts from './vue-echarts.vue'
  export default {
      mounted(){
        return {
            loading: false,
            option: {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
          
        }  
      }
    },
    component:{VueEcharts},
    methods:{
        loadMore(){
            this.loading = true
            setTimeout( ()=>{
            this.loading = false
            this.option = this.setOption({
                xAxis:{
                    data:[...prviousData, newKey] //整合新旧数据生成新的数据
                },
                series:[{
                    data:[...value, newValue]  //整合新旧数据生
                       }]
                })
            },3000)
        }
    }
  }
</script>
```
## 更多资料
>[Echarts更复杂的setOption实例](https://echarts.apache.org/examples/zh/editor.html?c=doc-example/tutorial-dynamic-data)

>[ECharts 中的事件和行为](https://echarts.apache.org/zh/tutorial.html#ECharts%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%92%8C%E8%A1%8C%E4%B8%BA)

>[5 分钟上手 ECharts](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)

>[封装Echarts为Vue组件](https://github.com/ecomfe/vue-echarts)

>[封装Echarts为React组件](https://github.com/hustcc/echarts-for-react)