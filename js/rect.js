/**
 * Created by Administrator on 2016/10/23.
 */
function Rect(option){
  this._init(option);
}
Rect.prototype={
  _init:function(option){
    this.data=option.data;
    this.maxWidth=option.maxWidth;
    this.maxHeight=option.maxHeight;
    this.width=option.width;
    this.height=option.height;
    this.x=option.x;
    this.y=option.y;
  },
  buildRect:function(layer){
    //����this
    that=this;
    //���Ƶ���
    var redLine = new Konva.Line({
      points: [that.x, that.y, that.x+that.maxWidth, that.y],
      stroke: 'skyblue',
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round'
    });
    layer.add(redLine);
    //�õ�ÿ������������ռ�Ŀ��
    var length=that.maxWidth/that.data.length;
    //���ƾ���
    for(var i=0;i<that.data.length;i++){
      var rect = new Konva.Rect({
        x: that.x+(1/4+i)*length,
        y: that.y,
        width: 1/2*length,
        height: 0,
        fill: that.data[i].color,
        cornerRadius: 5,
        shadowColor: "#000",
        shadowBlur: 20
      });
      layer.add(rect);
      //��Ӷ���
      var tween = new Konva.Tween({
        node: rect,
        duration: 1,
        y: that.y-that.maxHeight*that.data[i].value,
        height: that.maxHeight *that.data[i].value
      });
      tween.play();
      //��Ӿ���������ı�
      var simpleText = new Konva.Text({
        x: 1/8*that.width+(1/4+i)*length,
        y: 3/4*that.height-20,
        text: that.data[i].value*100+'%',
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: that.data[i].color,
        align: 'center',
        width: 1/2*length
      });
      layer.add(simpleText);
      //�������ž���һ���˶�
      var tween1 = new Konva.Tween({
        node: simpleText,
        duration: 1,
        y: 3/4*that.height-20-that.maxHeight*that.data[i].value
      });
      tween1.play();
      //����������ı�
      var bottomText = new Konva.Text({
        x:  1/8 * that.width +  (1 / 4 + i ) * length ,
        y: 3 / 4 * that.height + 10,
        text: that.data[i].name,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: that.data[i].color,
        align: 'center',
        width: 1/2* length,
        rotation: 30
      });
      layer.add(bottomText);
    }
  }
}