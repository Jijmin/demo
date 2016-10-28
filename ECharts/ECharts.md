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
### tooltip组件
show：是否显示
trigger：出发方式，axis就是x轴出发
### 标记线和标记点
1. 标记线:markline
- 标记线的添加
- 最大值、平均值、最小值的标记线
- 任意位置的标记点
```
//标记点
markPoint:{
  data:[
    {type:'max',name:'最大值'},
    {type:'min',name:'最小值'}
  ]
},
//标记线
markLine:{
  data:[{type:'average',name:'平均值'}]
}
```
### 饼图
- 饼图展示数据的特点
  1. 展示百分比
  2. type是pie
- center圆心坐标
- radius半径
- name图例名字
- selectedMode是否支持多选
```
var option={
  //标题
  title:{
    text:'某站点用户访问来源',
    subtext:'纯属虚构',
    x:'center'
  },
  tooltip:{
    trigger:'item',
    //显示格式
    formatter:'{a}<br/>{b}:{c}({d}%)'
  },
  //图例
  legend:{
    orient:'vertical',
    left:'left',
    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
  },
  //数据
  series:[{
    name:'访问来源',
    type:'pie',
    radius:'55%',
    center:['50%','60%'],
    data:[
        //name要和图例中的data数据一一对应
      {value:335,name:'直接访问'},
      {value:310,name:'邮件营销'},
      {value:234,name:'联盟广告'},
      {value:135,name:'视频广告'},
      {value:1314,name:'搜索引擎'},
    ]
  }]
};
```
### 仪表图
1. 仪表图展示数据的特点(type是guage)
2. 动态修改仪表图数据
```
series:[{
  name:'业务指标',
  type:'gauge',
  detail:{formatter:'{value}%'},
  data:[{value:32,name:'完成率'}]
}]
```
动态修改仪表盘指针的位置
```
setInterval(function(){
  option.series[0].data[0].value=(Math.random()*100).toFixed(2)-0;
  myChart.setOption(option,true);
},2000);
```
### 地图
### 散点图
### K线图
### 雷达图