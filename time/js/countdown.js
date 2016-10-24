//����ʱ��
var endTime=new Date();
//���뵱ǰʱ���������һ��Сʱ
endTime.setTime(endTime.getTime()+3600*1000);
//����һ���洢��ǰ�����ı���
var curShowTimeSeconds=0;
//�洢���ɵ�С��
var balls=[];
//С����ɫ����
const colors=['#33b5e5','#0099cc','#aa66cc','#9933cc','#99cc00','#669900','#ffbb33','#ff8800','#ff4444','#cc0000'];
window.onload=function(){
  WINDOW_WIDTH=document.body.clientWidth;
  WINDOW_HEIGHT=document.body.clientHeight;
  //��һ�����־�����ߵľ���
  MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
  //С��İ뾶
  //����ʱ��ռ�Ŀ����������Ļ�����֮��
  RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
  //ÿ�����־��붥���ľ��룬ռ�����߶ȵ����֮һ
  MRRGIN_TOP=Math.round(WINDOW_HEIGHT/5);
//  ��ȡcanvas��ǩ
  var canvas=document.getElementById('canvas');
//  ��ȡ�����Ļ���
  var context=canvas.getContext('2d');
  //���û�ͼ����Ŀ��
  canvas.width=WINDOW_WIDTH;
  canvas.height=WINDOW_HEIGHT;
//  ��������
  curShowTimeSeconds=getCurrentShowTimeSeconds();
//������ʱ��
  setInterval(function(){
    //  ���û��ƺ���
    render(context);
  //  �Ի��Ƶ������ı�
    update();
  },50);
}
function getCurrentShowTimeSeconds(){
//  ��ȡ��ǰ��ʱ���Ƕ���
  var curTime=new Date();
//  ��ú������ļ��
  var ret=endTime.getTime()-curTime.getTime();
  //ת�����룬��һ������
  ret=Math.round(ret/1000);
//  ��������0ʱֱ�ӷ��أ�����Ҫ����
  return ret>0?ret:0;
}
function update(){
//  ��һ��Ҫ��ʾ��ʱ��
  var nextShowTimeSeconds=getCurrentShowTimeSeconds();
//  �ֽ�ʱ��
  var nextHour=parseInt(nextShowTimeSeconds/3600);
  var nextMinutes=parseInt(nextShowTimeSeconds%3600/60);
  var nextSeconds=nextShowTimeSeconds%60;
//  ȡ�õ�ǰ��ʱ��
  var curHour=parseInt(curShowTimeSeconds/3600);
  var curMinutes=parseInt(curShowTimeSeconds%3600/60);
  var curSeconds=curShowTimeSeconds%60;
//  �����ж�
  if(nextSeconds!=curSeconds){
  //  �ж�ʱ���Ƿ���ȣ�һλһλ���ж�
    if(parseInt(curHour/10)!=parseInt(nextHour/10)){
      //��С��Сʱ��ʮλ��
      addBalls(MARGIN_LEFT+0,MRRGIN_TOP,parseInt(curHour/10));
    }
    if(parseInt(curHour%10)!=parseInt(nextHour%10)){
      //��С��Сʱ�ĸ�λ��
      addBalls(MARGIN_LEFT+15*(RADIUS+1),MRRGIN_TOP,parseInt(curHour%10));
    }
    if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
      //��С����ӵ�ʮλ��
      addBalls(MARGIN_LEFT+39*(RADIUS+1),MRRGIN_TOP,parseInt(nextMinutes/10));
    }
    if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
      //��С����ӵĸ�λ��
      addBalls(MARGIN_LEFT+54*(RADIUS+1),MRRGIN_TOP,parseInt(nextMinutes%10));
    }
    if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
      //��С�����ӵ�ʮλ��
      addBalls(MARGIN_LEFT+78*(RADIUS+1),MRRGIN_TOP,parseInt(nextSeconds/10));
    }
    if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
      //��С�����ӵĸ�λ��
      addBalls(MARGIN_LEFT+93*(RADIUS+1),MRRGIN_TOP,parseInt(nextSeconds%10));
    }
  //  ����ʱ�����¸�ֵ����ǰʱ��
    curShowTimeSeconds=nextShowTimeSeconds;
  }
//  �����д��ڵ�С����и���
  updateBalls();
}
function updateBalls(){
//  ��С��������б���
  for(var i=0;i<balls.length;i++){
  //  ��λ�ý��б仯
    balls[i].x+=balls[i].vx;
    balls[i].y+=balls[i].vy;
  //  С����������Ӱ��
    balls[i].vy+=balls[i].g;
  //  ��ײ���
    if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
      balls[i].y=WINDOW_HEIGHT-RADIUS;
      balls[i].vy=-balls[i].vy*0.75;
    }
  }
  var cnt=0;//��¼�ж��ٸ�С�򻹱����ڻ�����
//  ��balls�����������
  for(var i=0;i<balls.length;i++){
  //  �ж�С���Ƿ��ڻ����ڣ�С����ұ�Ե��Ȼ����0�����Ե����������ĳ��Ȼ�ҪС���Ϳ��Է���������
    if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH){
      balls[cnt++]=balls[i];//ǰ��cnt�Ķ������ڻ����е�
    }
  }
  while(balls.length>Math.min(300,cnt)){
    //  ������ĩβ��С��ɾ��
    balls.pop();
  }
  console.log(cnt);
}
function addBalls(x,y,num){
  for(var i=0;i<digit[num].length;i++){
    for(var j=0;j<digit[num][i].length;j++){
      //�ڵ����������Ƿ�Ϊ1���������1��ʾ����Ҫ����
      if(digit[num][i][j]==1){
      //  һ��С����Ķ���
        var aBall={
          //������Ϣ
          x:x+j*2*(RADIUS+1)+(RADIUS+1),
          y:y+i*2*(RADIUS+1)+(RADIUS+1),
        //  ���ٶ���Ϣ
          g:1.5+Math.random(),//С��ļ��ٶ���1.5-2.5֮��������
        //  С����X����ٶ�
        //  ������������ż������Ϊ+1������ǻ�����Ϊ-1
          vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//-1�Ķ��ٴη�����������һ��-4��+4�����
          vy:-5,//�������С����һ�������׵Ĺ���
          color:colors[Math.floor(Math.random()*colors.length)]//0-10������10���������
        };
      //  �����е�С����ӵ�������
        balls.push(aBall);
      }
    }
  }
}
/**
 * ���ƻ���
 * @param cxt ������
 */
function render(cxt){
//  ˢ��ʱ�䣬�ػ滭��
  cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
//  ��ŵ���ʱ�ľ���ʱ��
  var hour=parseInt(curShowTimeSeconds/3600);
  var minutes=parseInt(curShowTimeSeconds%3600/60);
  var seconds=curShowTimeSeconds%60;
  //����ʱ��
  //Ҫ����λ����ʱ��ֿ���һ����������
  renderDigit(MARGIN_LEFT,MRRGIN_TOP,parseInt(hour/10),cxt);//Сʱ��ʮλ��
  renderDigit(MARGIN_LEFT+15*(RADIUS+1),MRRGIN_TOP,parseInt(hour%10),cxt);//Сʱ�ĸ�λ��
  renderDigit(MARGIN_LEFT+30*(RADIUS+1),MRRGIN_TOP,10,cxt);//ð�ŵĴ���Ҳռһ�����ֵ��֣����������ǵ�ʮ��
  renderDigit(MARGIN_LEFT+39*(RADIUS+1),MRRGIN_TOP,parseInt(minutes/10),cxt);//���ӵ�ʮλ��
  renderDigit(MARGIN_LEFT+54*(RADIUS+1),MRRGIN_TOP,parseInt(minutes%10),cxt);//���ӵĸ�λ��
  renderDigit(MARGIN_LEFT+69*(RADIUS+1),MRRGIN_TOP,10,cxt);//ð�ŵĴ���Ҳռһ�����ֵ��֣����������ǵ�ʮ��
  renderDigit(MARGIN_LEFT+78*(RADIUS+1),MRRGIN_TOP,parseInt(seconds/10),cxt);//���ӵ�ʮλ��
  renderDigit(MARGIN_LEFT+93*(RADIUS+1),MRRGIN_TOP,parseInt(seconds%10),cxt);//���ӵĸ�λ��

//  ����С��
  for(var i=0;i<balls.length;i++){
    cxt.fillStyle=balls[i].color;
    cxt.beginPath();
    cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
    cxt.closePath();
    cxt.fill();
  }
}
/**
 * ����Ļ��ƺ���
 * @param x ��ʼ��x��λ��
 * @param y ��ʼ��y��λ��
 * @param num ������Ƶ����ĸ�����
 * @param cxt �����Ļ���
 */
function renderDigit(x,y,num,cxt){
  //�ı仭�ʵ���ɫ
  cxt.fillStyle='rgb(0,102,153)';
  for(var i=0;i<digit[num].length;i++){//��һ������ĳ���
    for(var j=0;j<digit[num][i].length;j++){//�ڶ�������ĳ���
    //  �ж�
      if(digit[num][i][j]==1){//i��������j������
        cxt.beginPath();
      //  ����һ��Բ��
        cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS),RADIUS,0,2*Math.PI);
        cxt.closePath();
      //  ���
        cxt.fill();
      }
    }
  }
}