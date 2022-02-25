## 目录
1. [目的](#目的)
2. [工具](#工具)
3. [核心](#核心)
4. [步骤](#步骤)
5. [方法](#方法)

### 目的
事实上就是用户觉得页面加载很快，用户从输入URL（网址）到页面在浏览器上加载出来的时间很短；与之相对的有如服务器性能优化（如网页占的 CPU 少），一定要区分开来。
对于用户众多的网站，节约下的加载时间或能带来可观的收入，这便是前端 Web 性能优化的意义。

### 工具
1. [HTML文档检查工具](https://validator.w3.org/#validate_by_uri+with_options)
2. [网站性能分析工具：GTmetrix](https://gtmetrix.com/)
3. [Google网页性能优化工具](https://developers.google.com/speed/)
4. [页面api速度检测](https://developers.google.com/speed/docs/insights/v4/reference/pagespeedapi/runpagespeed)
5. [网页性能测试：WebPageTest.org](https://www.webpagetest.org/)
6. [LightHouse 面板](https://developers.google.com/web/tools/lighthouse/?hl=zh-cn)
7. [Audit 面板](https://developers.google.com/web/updates/2017/05/devtools-release-notes?hl=zh-cn#lighthouse)
8. [W3C渲染时间模型](https://www.w3.org/TR/navigation-timing/#dom-performancetiming-navigationstart)

### 核心

- 白屏时间：白屏时间是指浏览器从响应用户输入网址地址，到浏览器开始显示内容的时间
    - 白屏时间 = 地址栏输入网址后回车 - 浏览器出现第一个元素
    - 影响白屏时间的因素：网络，服务端性能，前端页面结构设计
    - 具体为：浏览器开始渲染 <body> 或者解析完 <head> 的时间是白屏结束的时间点
    - 白屏时间 = firstPaint - performance.timing.navigationStart || pageStartTime

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>白屏</title>
    <script>
        // 不兼容 performance.timing 的浏览器
        window.pageStartTime = Date.now()
    </script>
        <!-- 页面 CSS 资源 -->
        <link rel="stylesheet" href="xx.css">
        <link rel="stylesheet" href="zz.css">
        <script>
            // 白屏结束时间
            window.firstPaint = Date.now()
            // 白屏时间
            console.log(firstPaint - performance.timing.navigationStart)
        </script>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

- 首屏时间: 首屏时间是指浏览器从响应用户输入网络地址，到首屏内容渲染完成的时间
    - 首屏时间 = 地址栏输入网址后回车 - 浏览器第一屏渲染完成
    - 影响首屏时间的因素：白屏时间，资源下载执行时间
    - 关于首屏时间是否包含图片加载网上有不同的说法，只要首屏中的图片加载完成，即是首屏完成，不在首屏中的图片可以不考虑
    - 首屏模块标签标记法。由于浏览器解析 HTML 是按照顺序解析的，当解析到某个元素的时候，你觉得首屏完成了，就在此元素后面加入 script 计算首屏完成时间

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>首屏</title>
    <script>
        // 不兼容 performance.timing 的浏览器
        window.pageStartTime = Date.now()
    </script>
</head>
<body>
    <!-- 首屏可见内容 -->
    <div class=""></div>
    <!-- 首屏可见内容 -->
    <div class=""></div>
    <script type="text/javascript">
            // 首屏屏结束时间
            window.firstPaint = Date.now()
            // 首屏时间
            console.log(firstPaint - performance.timing.navigationStart)
    </script>
    <!-- 首屏不可见内容 -->
    <div class=""></div>
    <!-- 首屏不可见内容 -->
    <div class=""></div>
</body>
</html>
```

- 统计首屏内加载最慢的图片/iframe。通常首屏内容中加载最慢的就是图片或者 iframe 资源，因此可以理解为当图片或者 iframe 都加载出来了，首屏肯定已经完成了。由于浏览器对每个页面的 TCP 连接数有限制，使得并不是所有图片都能立刻开始下载和显示。我们只需要监听首屏内所有的图片的 onload 事件，获取图片 onload 时间最大值，并用这个最大值减去 navigationStart 即可获得近似的首屏时间
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>首屏</title>
    <script>
        // 不兼容 performance.timing 的浏览器
        window.pageStartTime = Date.now()
    </script>
</head>
<body>
    <img src="https://lz5z.com/assets/img/google_atf.png" alt="img" onload="load()">
    <img src="https://lz5z.com/assets/img/css3_gpu_speedup.png" alt="img" onload="load()">
    <script>
        function load () {
            window.firstScreen = Date.now()
        }
        window.onload = function () {
            // 首屏时间
            console.log(window.firstScreen - performance.timing.navigationStart)
        }
    </script>
</body>
</html>Ï
```

- 用户可操作时间：用户可以正常进行正常的事件输入交互操作
<img src="assets/img/domloaded.png" width="900px" hight="231px">
  
  - 当document到达domInteractive状态时代表dom树的构建完成，也可以绑定事件，即用户的交互时间已经到达，也代表触发了domContentLoaded事件
  - 用户交互时间 = domContentLoadedEventEnd
  - 可以在chrome 中查看 performance.timing 对象，会显示具体参数时间
  - 下面的图演示了一个页面加载时chrome的Network面板会出现两条竖线，蓝色点document触发了额domContentLoaded事件，红线代表了document触发了load事件

<img src="assets/img/domloaded2.png" width="900px" hight="231px">
- 页面总下载结束时间：页面从输入地址到渲染完最后一个dom元素和事件的时间

### 步骤
1.确定指标
2.分析优化
3.初步分析
4.监控数据

### 方法
> [饿了么H5性能优化](https://zhuanlan.zhihu.com/p/144476736)
> [最强前端性能优化](https://zhuanlan.zhihu.com/p/67134654)
