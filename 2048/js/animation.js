/**
 * Created by Administrator on 2016/10/23.
 */
//显示数字
function showNumberWithAnimation(i,j,randNumber){
  //获取要显示的随机生成的元素
  var numberCell=$('#number-cell-'+i+'-'+j);
  //设置样式
  numberCell.css({
    //随机数对应背景颜色以及文字颜色
    backgroundColor:getNumberBackgroundColor(randNumber),
    color:getNumberColor(randNumber)
  });
  //显示文字
  numberCell.text(randNumber);
  //动画函数
  numberCell.animate({
    width:'100px',
    height:'100px',
    //本来是圆心的位置，转换成左上角的位置
    top:getPosTop(i,j),
    left:getPosLeft(i,j)
  },50);
}
//移动的动画
function showMoveAnimation(formx,formy,tox,toy){
  //拿到起始点元素
  var numberCell=$('number-cell-'+formx+'-'+formy);
  //调用动画函数
  numberCell.animate({
    top:getPosTop(tox,toy),
    left:getPosLeft(tox,toy),
  },200);
}
//更新分数
function updateScore(score){
  $('#score').text(score);
}