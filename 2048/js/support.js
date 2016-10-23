/**
 * Created by Administrator on 2016/10/23.
 */
//每一行距离顶部的计算
function getPosTop(i,j){
  return 20+i*120;
}
//每一列距离左边的计算
function getPosLeft(i,j){
  return 20+j*120;
}
//每个数字对应不同颜色赋值
function getNumberBackgroundColor(number){
  switch(number){
    case 2:return '#eee4de';break;
    case 4:return '#ede0c8';break;
    case 8:return '#f2b179';break;
    case 16:return '#f59563';break;
    case 32:return '#f67c5f';break;
    case 64:return '#f65e3b';break;
    case 128:return '#edcf72';break;
    case 256:return '#edcc61';break;
    case 512:return '#99cc00';break;
    case 1024:return '#33b5e5';break;
    case 2048:return '#0099cc';break;
    case 4096:return '#aa66cc';break;
    case 8192:return '#9933cc';break;
  }
  return 'black';
}
//数字颜色
function getNumberColor(number){
  if(number<=4){
    return '#ff6e65';
  }
  return 'white';
}