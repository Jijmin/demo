### 柱状图
1. 引入echarts.js
```
<script src="../echarts.min.js"></script>
```
2. 为ECharts准备一个具备大小(宽高)的DOM
```
<div id="main" style="width:900px;height:600px;"></div>
```
3. 基于准备好的dom，初始化echarts实例
```
var myChart=echarts.init(document.getElementById('main'));
```
4. 指定图表的配置项和数据
```
var option={
  //标题
  title:{
    text:'ECharts 入门示例'
  },
  //工具箱
  toolbox:{
    show:true,
    feature:{
      //保存图片
      saveAsImage:{
        show:true
      }
    }
  },
  //图例
  legend:{
    data:['销量']
  },
  //x轴
  xAxis:{
    data:['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
  },
  yAxis:{},
  //数据
  series:[{
    name:'销量',
    type:'bar',
    data:[5,20,36,10,10,20]
  }]
};
```
5. 使用刚指定的配置项和数据显示图标
```
myChart.setOption(option);
```
6. 总结
- Echarts.init()
  1. 初始化Echarts实例
  2. setOption用指定数据绘图
- Option对象
  1. 标题：title
  2. 图例：legend
  3. X轴：xAxis
  4. 数据：series(name,type,data)
### 折线图
在数据series中添加一个对象，type值是line，配上特定的数据就是折线图
### 标题组件
标题负责显示这个图表的标题
1. text：标题文字
2. subtext：子标题
3. left,top,right,bottom标题位置
4. borderColor：边框颜色
5. borderWidth：边框宽度
### 工具栏组件
1. show：是否显示
2. feature：具体显示的功能
3. saveAsImage：保存图片
4. restore：还原
5. dataView：数据视图
6. dataZoom：缩放视图
7. magicType：动态类型切换