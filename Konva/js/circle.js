/**
 * Created by Administrator on 2016/10/23.
 */
function Circle( options ) {
  this._init( options );
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