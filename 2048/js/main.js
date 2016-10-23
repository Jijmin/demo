/**
 * Created by Administrator on 2016/10/23.
 */
var board=new Array();//游戏主要数据
var score=0;//分数
$(function(){
  //开始一个新的游戏
  newgame();
});
//新的游戏
function newgame(){
  //初始化棋盘格
  init();
  //在随机的两个格子中生成数字
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
    //初始化每一个board的值
    for(var j=0;j<4;j++){
      board[i][j]=0;
    }
  }
  //调用board的更新函数
  updateBoardView();
}
function updateBoardView(){
  //假如当前的游戏中有了number-cell
  $('.number-cell').remove();
  //设定相应的board的值
  for(var i=0;i<4;i++){
    for(j=0;j<4;j++){
      //对每一个board元素生成number-cell
      $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
      var theNumberCell= $('number-cell-'+i+'-'+j);
      //number-cell的表现是不一样的
      if(board[i][j]===0){
        //不显示
        theNumberCell.css({
          width:'0px',
          height:'0px',
          top:getPosTop(i,j)+50,
          left:getPosLeft(i,j)+50
        });
      }else{
        theNumberCell.css({
          width:'100px',
          height:'100px',
          top:getPosTop(i,j),
          left:getPosLeft(i,j),
          //根据数字的不同，背景颜色相应改变
          backgroundColor:getNumberBackgroundColor(board[i][j]),
          color:getNumberColor(board[i][j])
        });
        //显示数组的值
        theNumberCell.text(board[i][j]);
      }
    }
  }
}