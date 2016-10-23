/**
 * Created by Administrator on 2016/10/23.
 */
function Circle( options ) {
  this._init( options );
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