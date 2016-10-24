//结束时间
var endTime=new Date();
//距离当前时间再向后推一个小时
endTime.setTime(endTime.getTime()+3600*1000);
//定义一个存储当前秒数的变量
var curShowTimeSeconds=0;
//存储生成的小球
var balls=[];
//小球颜色数组
const colors=['#33b5e5','#0099cc','#aa66cc','#9933cc','#99cc00','#669900','#ffbb33','#ff8800','#ff4444','#cc0000'];
window.onload=function(){
  WINDOW_WIDTH=document.body.clientWidth;
  WINDOW_HEIGHT=document.body.clientHeight;
  //第一个数字距离左边的距离
  MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
  //小球的半径
  //整个时钟占的宽度是整个屏幕的五分之四
  RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
  //每个数字距离顶部的距离，占整个高度的五分之一
  MRRGIN_TOP=Math.round(WINDOW_HEIGHT/5);
//  获取canvas标签
  var canvas=document.getElementById('canvas');
//  获取上下文环境
  var context=canvas.getContext('2d');
  //设置绘图区域的宽高
  canvas.width=WINDOW_WIDTH;
  canvas.height=WINDOW_HEIGHT;
//  计算秒数
  curShowTimeSeconds=getCurrentShowTimeSeconds();
//开启计时器
  setInterval(function(){
    //  调用绘制函数
    render(context);
  //  对绘制调整，改变
    update();
  },50);
}
function getCurrentShowTimeSeconds(){
//  获取当前的时间是多少
  var curTime=new Date();
//  获得毫秒数的间距
  var ret=endTime.getTime()-curTime.getTime();
  //转换成秒，是一个整数
  ret=Math.round(ret/1000);
//  秒数大于0时直接返回，否则要归零
  return ret>0?ret:0;
}
function update(){
//  下一次要显示的时间
  var nextShowTimeSeconds=getCurrentShowTimeSeconds();
//  分解时间
  var nextHour=parseInt(nextShowTimeSeconds/3600);
  var nextMinutes=parseInt(nextShowTimeSeconds%3600/60);
  var nextSeconds=nextShowTimeSeconds%60;
//  取得当前的时间
  var curHour=parseInt(curShowTimeSeconds/3600);
  var curMinutes=parseInt(curShowTimeSeconds%3600/60);
  var curSeconds=curShowTimeSeconds%60;
//  进行判断
  if(nextSeconds!=curSeconds){
  //  判断时间是否相等，一位一位的判断
    if(parseInt(curHour/10)!=parseInt(nextHour/10)){
      //加小球小时的十位数
      addBalls(MARGIN_LEFT+0,MRRGIN_TOP,parseInt(curHour/10));
    }
    if(parseInt(curHour%10)!=parseInt(nextHour%10)){
      //加小球小时的个位数
      addBalls(MARGIN_LEFT+15*(RADIUS+1),MRRGIN_TOP,parseInt(curHour%10));
    }
    if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
      //加小球分钟的十位数
      addBalls(MARGIN_LEFT+39*(RADIUS+1),MRRGIN_TOP,parseInt(nextMinutes/10));
    }
    if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
      //加小球分钟的个位数
      addBalls(MARGIN_LEFT+54*(RADIUS+1),MRRGIN_TOP,parseInt(nextMinutes%10));
    }
    if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
      //加小球秒钟的十位数
      addBalls(MARGIN_LEFT+78*(RADIUS+1),MRRGIN_TOP,parseInt(nextSeconds/10));
    }
    if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
      //加小球秒钟的个位数
      addBalls(MARGIN_LEFT+93*(RADIUS+1),MRRGIN_TOP,parseInt(nextSeconds%10));
    }
  //  进新时间重新赋值给当前时间
    curShowTimeSeconds=nextShowTimeSeconds;
  }
//  对所有存在的小球进行更新
  updateBalls();
}
function updateBalls(){
//  对小球数组进行遍历
  for(var i=0;i<balls.length;i++){
  //  将位置进行变化
    balls[i].x+=balls[i].vx;
    balls[i].y+=balls[i].vy;
  //  小球有重力的影响
    balls[i].vy+=balls[i].g;
  //  碰撞检测
    if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
      balls[i].y=WINDOW_HEIGHT-RADIUS;
      balls[i].vy=-balls[i].vy*0.75;
    }
  }
  var cnt=0;//记录有多少个小球还保留在画面中
//  对balls整个数组遍历
  for(var i=0;i<balls.length;i++){
  //  判断小球是否还在画面内，小球的右边缘任然大于0，左边缘比整个画面的长度还要小，就可以放在数组里
    if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH){
      balls[cnt++]=balls[i];//前面cnt的都是留在画面中的
    }
  }
  while(balls.length>Math.min(300,cnt)){
    //  将数组末尾的小球删掉
    balls.pop();
  }
  console.log(cnt);
}
function addBalls(x,y,num){
  for(var i=0;i<digit[num].length;i++){
    for(var j=0;j<digit[num][i].length;j++){
      //在点阵数组中是否为1，如果是用1表示，则要绘制
      if(digit[num][i][j]==1){
      //  一个小球类的对象
        var aBall={
          //坐标信息
          x:x+j*2*(RADIUS+1)+(RADIUS+1),
          y:y+i*2*(RADIUS+1)+(RADIUS+1),
        //  加速度信息
          g:1.5+Math.random(),//小球的加速度是1.5-2.5之间的随机数
        //  小球在X轴的速度
        //  如果随机出的是偶数，就为+1，如果是基数就为-1
          vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//-1的多少次方，最后就是求一个-4或+4的随机
          vy:-5,//随机出的小球有一个向上抛的过程
          color:colors[Math.floor(Math.random()*colors.length)]//0-10不包括10的随机索引
        };
      //  将所有的小球都添加到数组中
        balls.push(aBall);
      }
    }
  }
}
/**
 * 绘制画布
 * @param cxt 上下文
 */
function render(cxt){
//  刷新时间，重绘画布
  cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
//  存放倒计时的具体时间
  var hour=parseInt(curShowTimeSeconds/3600);
  var minutes=parseInt(curShowTimeSeconds%3600/60);
  var seconds=curShowTimeSeconds%60;
  //绘制时间
  //要把两位数的时间分开成一个个的数字
  renderDigit(MARGIN_LEFT,MRRGIN_TOP,parseInt(hour/10),cxt);//小时的十位数
  renderDigit(MARGIN_LEFT+15*(RADIUS+1),MRRGIN_TOP,parseInt(hour%10),cxt);//小时的个位数
  renderDigit(MARGIN_LEFT+30*(RADIUS+1),MRRGIN_TOP,10,cxt);//冒号的处理，也占一个数字的字，在数组中是第十个
  renderDigit(MARGIN_LEFT+39*(RADIUS+1),MRRGIN_TOP,parseInt(minutes/10),cxt);//分钟的十位数
  renderDigit(MARGIN_LEFT+54*(RADIUS+1),MRRGIN_TOP,parseInt(minutes%10),cxt);//分钟的个位数
  renderDigit(MARGIN_LEFT+69*(RADIUS+1),MRRGIN_TOP,10,cxt);//冒号的处理，也占一个数字的字，在数组中是第十个
  renderDigit(MARGIN_LEFT+78*(RADIUS+1),MRRGIN_TOP,parseInt(seconds/10),cxt);//秒钟的十位数
  renderDigit(MARGIN_LEFT+93*(RADIUS+1),MRRGIN_TOP,parseInt(seconds%10),cxt);//秒钟的个位数

//  绘制小球
  for(var i=0;i<balls.length;i++){
    cxt.fillStyle=balls[i].color;
    cxt.beginPath();
    cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
    cxt.closePath();
    cxt.fill();
  }
}
/**
 * 具体的绘制函数
 * @param x 开始的x轴位置
 * @param y 开始的y轴位置
 * @param num 具体绘制的是哪个数字
 * @param cxt 上下文环境
 */
function renderDigit(x,y,num,cxt){
  //改变画笔的颜色
  cxt.fillStyle='rgb(0,102,153)';
  for(var i=0;i<digit[num].length;i++){//第一层数组的长度
    for(var j=0;j<digit[num][i].length;j++){//第二层数组的长度
    //  判断
      if(digit[num][i][j]==1){//i是行数，j是列数
        cxt.beginPath();
      //  绘制一个圆球
        cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS),RADIUS,0,2*Math.PI);
        cxt.closePath();
      //  填充
        cxt.fill();
      }
    }
  }
}