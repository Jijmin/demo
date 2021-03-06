# Konva
## 面向对象的柱状图分析
### 使用Konva画一条简单的线
1. 添加样式
```
<style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #F0F0F0;
  }
</style>
```
2. 定义一个存放canvas的盒子
```
<div id="cancas"></div>
```
3. 加入脚本控制
4. 定义两个变量存储页面宽高
```
var width = window.innerWidth;
var height = window.innerHeight;
```
5. 创建一个舞台对象
```
var stage = new Konva.Stage({
  container: 'canvas',
  width: width,
  height: height
});
```
6. 创建一个层对象
```
var layer = new Konva.Layer();
```
7. 绘制下方的坐标线
```
var baseLine = new Konva.Line({
  points: [width / 8,height / 4 * 3,width / 8 * 7,height / 4 * 3],
  stroke: '#0094ff',
  strokeWidth: 1
});
```
8. 绘制每个柱状图
9. 获取数据
```
var data=[
    {name:'百度',value:.2,color:'blue'},
    {name:'阿里', value:.4, color:'red'},
    {name:'新浪', value:.1, color:'purple'},
    {name:'搜狐', value:.1, color:'navy'},
    {name:'360', value:.2, color:'orange'}
  ];
```
10. 得到坐标x,y的最大值
```
var maxWidth=3/4*stage.width();//Konva中width和height是方法
var maxHeight=1/2*stage.height();
```
11. 得到每个柱状图所占的宽度
```
var length=maxWidth/data.length;
```
12. 绘制矩形
```
for(var i=0;i<data.length;i++){
  var rect = new Konva.Rect({
    x: 1/8*stage.width()+(1/4+i)*length,
    y: 3/4*stage.height(),
    width: 1/2*length,
    height: 0,
    fill: data[i].color,
    cornerRadius: 5,
    shadowColor: "#000",
    shadowBlur: 20
  });
  //将矩形添加到层中
  layer.add(rect);
}
```
13. 让矩形运动起来
```
var tween = new Konva.Tween({
  node: rect,
  duration: 1,
  y: 3/4*stage.height()-maxHeight*data[i].value,
  height: maxHeight * data[i].value
});
tween.play();
```
14. 绘制每个矩形上面的文字
```
var simpleText = new Konva.Text({
  x: 1/8*stage.width()+(1/4+i)*length,
  y: 3/4*stage.height()-20,
  text: data[i].value*100+'%',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: data[i].color,
  align: 'center',
  width: 1/2*length
});
layer.add(simpleText);
```
15. 文字随着矩形一起运动
```
var tween1 = new Konva.Tween({
  node: simpleText,
  duration: 1,
  y: 3/4*stage.height()-20-maxHeight*data[i].value
});
tween1.play();
```
16. 绘制矩形底部文字
```
var bottomText = new Konva.Text({
  x:  1/8 * stage.width() +  (1 / 4 + i ) * length ,
  y: 3 / 4 * stage.height() + 10,
  text: data[i].name,
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: data[i].color,
  align: 'center',
  width: 1/2* length,
  rotation: 30
});
layer.add(bottomText);
```
### 粒子旋转
1. 设置样式
```
<style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #F0F0F0;
  }
</style>
```
2. 定义一个存放画布的容器
```
<div id="container"></div>
```
3. 脚本控制
4. 设置宽高
```
var width = window.innerWidth;
var height = window.innerHeight;
```
5. 创建舞台
```
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});
```
6. 创建层
```
var layer = new Konva.Layer();
```
7. 将粒子旋转分成三个组
8. 背景组
```
var group = new Konva.Group({
  x: stage.width()/2,
  y: stage.height()/2
});
```
9. 绘制最外面的圆
```
var outCircle=new Konva.Circle({
  x: 0,
  y: 0,
  radius: 216,
  stroke: '#ccc',
  strokeWidth: 1,
  dash: [6,4]
});
```
10. 添加中间的圆
```
var midCircle=new Konva.Circle({
  x: 0,
  y: 0,
  radius: 137,
  stroke: '#aaa',
  strokeWidth: 1,
  dash: [6,4]
});
```
11. 添加里面的圆
```
var innerCircle=new Konva.Circle({
  x: 0,
  y: 0,
  radius: 120,
  stroke: '#122e7c',
  strokeWidth: 2,
  dash: [10,5]
});
```
12. 将画好的圆添加进组中
```
groupBg.add(outCircle);
groupBg.add(midCircle);
groupBg.add(innerCircle);
```
13. 绘制里面的填充的圆
14. 绘制圆心中的文本
以圆心为基准点，我们需要将文字居中显示，而不是在圆心位置往后显示，应该给文本设置一个宽度，让文字居中显示，那么文字的x位置要挪动到宽度一半的位置，y也要向上移动
```
var simpleText = new Konva.Text({
  x: -65,
  y: -8,
  text: 'Web 全栈',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#fff',
  align:'center',
  width:130
});
groupBg.add(simpleText);
```
15. 绘制顺时针的组
```
var outGroup = new Konva.Group({
  x: stage.width()/2,
  y: stage.height()/2
});
```
16. 将小圆封装成一个对象
```
function Circle(option){
  this._init(option);
}
Circle.prototype={
  _init:function(option){//初始化
    //圆心坐标
    this.x=option.x;
    this.y=option.y;
    //圆的半径
    this.outR=option.outR;
    this.innerR=option.innerR;
    //圆的填充色
    this.fill=option.fill;
    //圆的透明度
    this.outOpacity=option.outOpacity;
    this.innerOpacity=option.innerOpacity;
    this.text=option.text;
    this.fontSize=option.fontSize;
    this.color=option.color;
  },
  buildCircle:function(addLayerOrGroup){
    //缓存this对象
    var _this=this;
    //创建一个组
    var group = new Konva.Group({
      x: _this.x,
      y: _this.y
    });
    //绘制外层圆
    var outRing=new Konva.Circle({
      x: 0,
      y: 0,
      radius: _this.outR,
      fill: _this.fill,
      opacity:_this.outOpacity
    });
    group.add(outRing);
    //绘制内圆
    var innerRing=new Konva.Circle({
      x: 0,
      y: 0,
      radius: _this.innerR,
      fill: _this.fill,
      opacity:_this.innerOpacity
    });
    group.add(innerRing);
    //添加文本
    var simpleText = new Konva.Text({
      x: -_this.innerR,
      y: -_this.fontSize/2,
      text: _this.text,
      fontSize: _this.fontSize,
      fontFamily: 'Calibri',
      fill: _this.color,
      align:'center',
      width:_this.innerR*2
    });
    group.add(simpleText);
    //将每一个小组添加到大组中去
    addLayerOrGroup.add(group);
  }
};
```
17. 先将最外面的几个小圆创建出来
```
for(var i=0;i<4;i++){
  var circle0=new Circle({
    x:216*Math.cos(90*i*Math.PI/180),
    y:216*Math.sin(90*i*Math.PI/180),
    outR:55,
    innerR:45,
    fill:'pink',
    outOpacity:0.2,
    innerOpacity:0.7,
    text:'WebApp',
    fontSize:16,
    color:'#fff',
  });
  circle0.buildCircle(outGroup);
}
layer.add(outGroup);
```
18. 添加动画
```
//设置每秒运动的速度
var step=1;
var anim = new Konva.Animation(function(frame) {
  //frame.time两帧之间间隔的时间
  outGroup.rotate(step);
  //文字看起来不能转，可以向反方向转
  outGroup.getChildren().each(function(item,index){
    item.rotate(-step);
  });
}, layer);
anim.start();
```
19. 添加事件
```
//给顺时针转的组改变速度
outGroup.on('mouseover', function() {
  step=1;
});
outGroup.on('mouseleave', function() {
  step=3;
});
```