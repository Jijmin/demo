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
}