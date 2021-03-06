/**
 * Created by Administrator on 2016/10/23.
 */
var board=new Array();//游戏主要数据
var score=0;//分数
var hasConflicted=new Array();//二维数组，对应每一个格子是否发生碰撞
var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(function(){
  //移动端的准备工作
  prepareForMobile();
  //开始一个新的游戏
  newgame();
});
function prepareForMobile(){
  if(documentWidth>500){
    girdContainerWidth=500;
    cellSpace=20;
    cellSideLength=100;
  }
  $('#grid-container').css({
    'width':girdContainerWidth-2*cellSpace,
    'height':girdContainerWidth-2*cellSpace,
    'padding':cellSpace,
    'borderRadius':0.02*girdContainerWidth
  });
  $('.grid-cell').css({
    'width':cellSideLength,
    'height':cellSideLength,
    'borderRadius':0.02*cellSideLength
  });
}
//新的游戏
function newgame(){
  //初始化棋盘格
  init();
  //在随机的两个格子中生成数字
  generateOneNumber();
  generateOneNumber();
}
//初始化棋盘格
function init(){
  //双重循环对这16个格子的位置进行赋值
  for(var i=0;i<4;i++){//控制行
    for(j=0;j<4;j++){//控制列
      //获取到小格子
      var girdCell = $('#grid-cell-'+i+'-'+j);
      //设置小格子的top和left值
      girdCell.css('top',getPosTop(i,j));
      girdCell.css('left',getPosLeft(i,j));
    }
  }
  //将board数组转换成一个二维数组
  for(var i=0;i<4;i++){
    board[i]=new Array();
    hasConflicted[i]=new Array();//变成二位数组
    //初始化每一个board的值
    for(var j=0;j<4;j++){
      board[i][j]=0;
      hasConflicted[i][j]=false;//开始的时候再每一个位置都没有进行碰撞
    }
  }
  //调用board的更新函数
  updateBoardView();
  //初始化分数
  score=0;
}
function updateBoardView(){
  //假如当前的游戏中有了number-cell
  $('.number-cell').remove();
  //设定相应的board的值
  for(var i=0;i<4;i++){
    for(j=0;j<4;j++){
      //对每一个board元素生成number-cell
      $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
      var theNumberCell= $('#number-cell-'+i+'-'+j);
      //number-cell的表现是不一样的
      if(board[i][j]===0){
        //不显示
        theNumberCell.css({
          width:'0px',
          height:'0px',
          top:getPosTop(i,j)+cellSideLength/2,
          left:getPosLeft(i,j)+cellSideLength/2
        });
      }else{
        theNumberCell.css({
          width:cellSideLength,
          height:cellSideLength,
          top:getPosTop(i,j),
          left:getPosLeft(i,j),
          //根据数字的不同，背景颜色相应改变
          backgroundColor:getNumberBackgroundColor(board[i][j]),
          color:getNumberColor(board[i][j])
        });
        //显示数组的值
        theNumberCell.text(board[i][j]);
      }
      //表示新的一轮开始，碰撞的值重新归位
      hasConflicted[i][j]=false;
    }
    $('.number-cell').css({
      'lineHeight':cellSideLength+'px',
      'fontSize':0.6*cellSideLength+'px'
    });
  }
}
//在随机的两个格子中生成数字
function generateOneNumber(){
  //判断现在的情况可不可以生成数字，棋盘还有空间就是还能生成
  if(nospace(board)){
    return false;
  }
  //如果有空余位置
  //随机一个位置
  var randx=parseInt(Math.floor(Math.random()*4));
  var randy=parseInt(Math.floor(Math.random()*4));
  //如果这个位置上有数字，就不能存放
  //解决最后只剩一个位置的还要经过很长时间才能生成
  var times=0;
  while(times<50){
    if(board[randx][randy]===0){
      break;
    }
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    times++;
  }
  //如果计算机50次还没有猜到位置，就人工生成一个位置
  if(times===50){
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        //如果有一个格子为空
        if(board[i][j]===0){
          randx=i;
          randy=j;
        }
      }
    }
  }
  //随机一个数字
  var randNumber=Math.random()<0.5?2:4;
  //在随机位置显示随机数字
  board[randx][randy]=randNumber;
  //动画显示数字
  showNumberWithAnimation(randx,randy,randNumber);
  return true;
}
//响应玩家按下键盘操作
$(document).keydown(function(event){//可以获取玩家具体的按键信息
  switch(event.keyCode){
    case 37://left
      //阻挡住原本的默认效果
      event.preventDefault();
      if(moveLeft()){
        //向左移之后会生成一个新的数字
        setTimeout('generateOneNumber()',210);
        //每次新增数字之后都有可能导致游戏结束，判断当前游戏是否结束
        setTimeout('isgameover()',300);
      }
      break;
    case 38://up
      event.preventDefault();
      if(moveUp()){
        setTimeout('generateOneNumber()',210);
        setTimeout('isgameover()',300);
      }
      break;
    case 39://right
      event.preventDefault();
      if(moveRight()){
        setTimeout('generateOneNumber()',210);
        setTimeout('isgameover()',300);
      }
      break;
    case 40://down
      event.preventDefault();
      if(moveDown()){
        setTimeout('generateOneNumber()',210);
        setTimeout('isgameover()',300);
      }
      break;
    default://default
      break;
  }
});
//触摸事件
document.addEventListener('touchstart',function(event){
  startx=event.touches[0].pageX;
  starty=event.touches[0].pageY;
});
//在真机上测试滑动有可能有问题，如果有问题用下面事件阻止默认事件
document.addEventListener('touchmove',function(event){
  event.preventDefault();
});
document.addEventListener('touchend',function(event){
  endx=event.changedTouches[0].pageX;
  endy=event.changedTouches[0].pageY;

  var deltaX=endx-startx;//x轴方向
  var deltaY=endy-starty;//y轴方向
  //要进行判断，如果小于一定阈值的时候就是点击事件，不应该执行下面的代码
  if(Math.abs(deltaX)<0.3*documentWidth&&Math.abs(deltaY)<0.3*documentWidth) return;
  //判断哪个方向移动的值多一些，就是往哪个方向移动
  if(Math.abs(deltaX)>=Math.abs(deltaY)){
    //触摸在X轴方向执行
    //再对方向进行判断
    if(deltaX>0){//X正方向
      //move right
      if(moveRight()){
        setTimeout('generateOneNumber()',210);
        setTimeout('isgameover()',300);
      }
    }else{
      //move left
      if(moveLeft()){
        //向左移之后会生成一个新的数字
        setTimeout('generateOneNumber()',210);
        //每次新增数字之后都有可能导致游戏结束，判断当前游戏是否结束
        setTimeout('isgameover()',300);
      }
    }
  }else{
    if(deltaY>0){
      //move down
      if(moveDown()){
        setTimeout('generateOneNumber()',210);
        setTimeout('isgameover()',300);
      }
    }else{
      //move up
      if(moveUp()){
        setTimeout('generateOneNumber()',210);
        setTimeout('isgameover()',300);
      }
    }
  }
});
//游戏结束
function isgameover(){
  if(nospace(board)&&nomove(board)){
    gameover();
  }
}
function gameover(){
  alert('gameover!');
}
//向左移动
function moveLeft(){
  //判断当前是否能向左移动
  if(!canMoveLeft(board)){
    return false;
  }
  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){
      if(board[i][j]!=0){//当前位置上的元素可以向左移动
        //遍历j左侧元素
        for(var k=0;k<j;k++){
          //考虑是否是落脚点
          if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){//左侧没有元素并且左侧的k列到j列都没有障碍物
            //如果没有障碍物，就可以产生一次移动
            //move移动
            showMoveAnimation(i,j,i,k);//可以从i,j这个位置移动到i,k这个位置
            //i,k上的元素就是原来i,j的元素
            board[i][k]=board[i][j];
            board[i][j]=0;//代表着已经移动过去了
            continue;//如果满足当产生完这次移动后结束当次判断
          }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){//如果有相等，并且没有障碍物，在i,k位置没有发生碰撞
            //move移动
            showMoveAnimation(i,j,i,k);
            //add叠加
            board[i][k]+=board[i][j];
            board[i][j]=0;
            //加分
            score+=board[i][k];
            //通知前台分数改变
            updateScore(score);
            //发生碰撞之后
            hasConflicted[i][k]=true;//下一次在i,k这个位置就不能发生碰撞
            continue;
          }
        }
      }
    }
  }
  //对整体数据进行一次刷新
  setTimeout('updateBoardView()',200);
  return true;
}
//向右移动
function moveRight(){
  if(!canMoveRight(board)){
    return false;
  }
  for(var i=0;i<4;i++){
    for(var j=2;j>=0;j--){//向右，不需要考虑最后一列的元素
      if(board[i][j]!=0){
        for(var k=3;k>j;k--){
          if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
            showMoveAnimation(i,j,i,k);
            board[i][k]=board[i][j];
            board[i][j]=0;
            continue;
          }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
            showMoveAnimation(i,j,i,k);
            board[i][k]*=2;
            board[i][j]=0;
            score+=board[i][k];
            updateScore(score);
            hasConflicted[i][k]=true;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()',200);
  return true;
}
//向上移动
function moveUp(){
  if(!canMoveUp(board)){
    return false;
  }
  for(var j=0;j<4;j++){
    for(var i=1;i<4;i++){//向右，不需要考虑最后一列的元素
      if(board[i][j]!=0){
        for(var k=0;k<i;k++){
          if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
            showMoveAnimation(i,j,k,j);
            board[k][j]=board[i][j];
            board[i][j]=0;
            continue;
          }else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j]){
            showMoveAnimation(i,j,k,j);
            board[k][j]*=2;
            board[i][j]=0;
            score+=board[k][j];
            updateScore(score);
            hasConflicted[k][j]=true;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()',200);
  return true;
}
//向下移动
function moveDown(){
  if(!canMoveDown(board)){
    return false;
  }
  for(var j=0;j<4;j++){
    for(var i=2;i>=0;i--){//向右，不需要考虑最后一列的元素
      if(board[i][j]!=0){
        for(var k=3;k>i;k--){
          if(board[k][j]==0&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]){
            showMoveAnimation(i,j,k,j);
            board[k][j]=board[i][j];
            board[i][j]=0;
            continue;
          }else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)){
            showMoveAnimation(i,j,k,j);
            board[k][j]*=2;
            board[i][j]=0;
            score+=board[k][j];
            updateScore(score);
            hasConflicted[k][j]=true;
            continue;
          }
        }
      }
    }
  }
  setTimeout('updateBoardView()',200);
  return true;
}