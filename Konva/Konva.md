# Konva
## ����������״ͼ����
### ʹ��Konva��һ���򵥵���
1. �����ʽ
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
2. ����һ�����canvas�ĺ���
```
<div id="cancas"></div>
```
3. ����ű�����
4. �������������洢ҳ����
```
var width = window.innerWidth;
var height = window.innerHeight;
```
5. ����һ����̨����
```
var stage = new Konva.Stage({
  container: 'canvas',
  width: width,
  height: height
});
```
6. ����һ�������
```
var layer = new Konva.Layer();
```
7. �����·���������
```
var baseLine = new Konva.Line({
  points: [width / 8,height / 4 * 3,width / 8 * 7,height / 4 * 3],
  stroke: '#0094ff',
  strokeWidth: 1
});
```
8. ����ÿ����״ͼ
9. ��ȡ����
```
var data=[
    {name:'�ٶ�',value:.2,color:'blue'},
    {name:'����', value:.4, color:'red'},
    {name:'����', value:.1, color:'purple'},
    {name:'�Ѻ�', value:.1, color:'navy'},
    {name:'360', value:.2, color:'orange'}
  ];
```
10. �õ�����x,y�����ֵ
```
var maxWidth=3/4*stage.width();//Konva��width��height�Ƿ���
var maxHeight=1/2*stage.height();
```
11. �õ�ÿ����״ͼ��ռ�Ŀ��
```
var length=maxWidth/data.length;
```
12. ���ƾ���
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
  //��������ӵ�����
  layer.add(rect);
}
```
13. �þ����˶�����
```
var tween = new Konva.Tween({
  node: rect,
  duration: 1,
  y: 3/4*stage.height()-maxHeight*data[i].value,
  height: maxHeight * data[i].value
});
tween.play();
```
14. ����ÿ���������������
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
15. �������ž���һ���˶�
```
var tween1 = new Konva.Tween({
  node: simpleText,
  duration: 1,
  y: 3/4*stage.height()-20-maxHeight*data[i].value
});
tween1.play();
```
16. ���ƾ��εײ�����
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
### ������ת
1. ������ʽ
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
2. ����һ����Ż���������
```
<div id="container"></div>
```
3. �ű�����
4. ���ÿ��
```
var width = window.innerWidth;
var height = window.innerHeight;
```
5. ������̨
```
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});
```
6. ������
```
var layer = new Konva.Layer();
```
7. ��������ת�ֳ�������
8. ������
```
var group = new Konva.Group({
  x: stage.width()/2,
  y: stage.height()/2
});
```
9. �����������Բ
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
10. ����м��Բ
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
11. ��������Բ
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
12. �����õ�Բ��ӽ�����
```
groupBg.add(outCircle);
groupBg.add(midCircle);
groupBg.add(innerCircle);
```
13. �������������Բ
14. ����Բ���е��ı�
��Բ��Ϊ��׼�㣬������Ҫ�����־�����ʾ����������Բ��λ��������ʾ��Ӧ�ø��ı�����һ����ȣ������־�����ʾ����ô���ֵ�xλ��ҪŲ�������һ���λ�ã�yҲҪ�����ƶ�
```
var simpleText = new Konva.Text({
  x: -65,
  y: -8,
  text: 'Web ȫջ',
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: '#fff',
  align:'center',
  width:130
});
groupBg.add(simpleText);
```
15. ����˳ʱ�����
```
var outGroup = new Konva.Group({
  x: stage.width()/2,
  y: stage.height()/2
});
```
16. ��СԲ��װ��һ������
```
function Circle(option){
  this._init(option);
}
Circle.prototype={
  _init:function(option){//��ʼ��
    //Բ������
    this.x=option.x;
    this.y=option.y;
    //Բ�İ뾶
    this.outR=option.outR;
    this.innerR=option.innerR;
    //Բ�����ɫ
    this.fill=option.fill;
    //Բ��͸����
    this.outOpacity=option.outOpacity;
    this.innerOpacity=option.innerOpacity;
    this.text=option.text;
    this.fontSize=option.fontSize;
    this.color=option.color;
  },
  buildCircle:function(addLayerOrGroup){
    //����this����
    var _this=this;
    //����һ����
    var group = new Konva.Group({
      x: _this.x,
      y: _this.y
    });
    //�������Բ
    var outRing=new Konva.Circle({
      x: 0,
      y: 0,
      radius: _this.outR,
      fill: _this.fill,
      opacity:_this.outOpacity
    });
    group.add(outRing);
    //������Բ
    var innerRing=new Konva.Circle({
      x: 0,
      y: 0,
      radius: _this.innerR,
      fill: _this.fill,
      opacity:_this.innerOpacity
    });
    group.add(innerRing);
    //����ı�
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
    //��ÿһ��С����ӵ�������ȥ
    addLayerOrGroup.add(group);
  }
};
```
17. �Ƚ�������ļ���СԲ��������
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
18. ��Ӷ���
```
//����ÿ���˶����ٶ�
var step=1;
var anim = new Konva.Animation(function(frame) {
  //frame.time��֮֡������ʱ��
  outGroup.rotate(step);
  //���ֿ���������ת�������򷴷���ת
  outGroup.getChildren().each(function(item,index){
    item.rotate(-step);
  });
}, layer);
anim.start();
```
19. ����¼�
```
//��˳ʱ��ת����ı��ٶ�
outGroup.on('mouseover', function() {
  step=1;
});
outGroup.on('mouseleave', function() {
  step=3;
});
```