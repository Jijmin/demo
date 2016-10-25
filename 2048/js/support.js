/**
 * Created by Administrator on 2016/10/23.
 */
//当前设备中可以使用的宽度
documentWidth=window.screen.availWidth;
//整个棋盘区域
girdContainerWidth=0.92*documentWidth;
//每个小格子的宽度
cellSideLength=0.18*documentWidth;
//每个格子的间隙
cellSpace=0.04*documentWidth;
//每一行距离顶部的计算
function getPosTop(i,j){
  return cellSpace+i*(cellSpace+cellSideLength);
}
//每一列距离左边的计算
function getPosLeft(i,j){
  return cellSpace+j*(cellSpace+cellSideLength);
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
//判断是否还有多余的小格子
function nospace(board){
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j]===0){
        //存在空间
        return false;
      }
    }
  }
  //没有空间就返回true
  return true;
}
//判断是否可以向左移动
function canMoveLeft(board){
  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){//最左边的一列不需要循环，因为最左边不能进行向左移
      if(board[i][j]!=0){//存在数字
        if(board[i][j-1]==0||board[i][j-1]==board[i][j]){//如果数字左侧没有数字的或者左边数字和自己相等
          return true;
        }
      }
    }
  }
  return false;
}
//判断是否可以向右移动
function canMoveRight(board){
  for(var i=0;i<4;i++){
    for(var j=2;j>=0;j--){//最左边的一列不需要循环，因为最左边不能进行向左移
      if(board[i][j]!=0){//存在数字
        if(board[i][j+1]==0||board[i][j+1]==board[i][j]){//如果数字左侧没有数字的或者左边数字和自己相等
          return true;
        }
      }
    }
  }
  return false;
}
//判断是否可以向上移动
function canMoveUp(board){
  for(var j=0;j<4;j++){
    for(var i=1;i<4;i++){//最左边的一列不需要循环，因为最左边不能进行向左移
      if(board[i][j]!=0){//存在数字
        if(board[i-1][j]==0||board[i-1][j]==board[i][j]){//如果数字左侧没有数字的或者左边数字和自己相等
          return true;
        }
      }
    }
  }
  return false;
}
//判断是否可以向下移动
function canMoveDown(board){
  for(var j=0;j<4;j++){
    for(var i=2;i>=0;i--){//最左边的一列不需要循环，因为最左边不能进行向左移
      if(board[i][j]!=0){//存在数字
        if(board[i+1][j]==0||board[i+1][j]==board[i][j]){//如果数字左侧没有数字的或者左边数字和自己相等
          return true;
        }
      }
    }
  }
  return false;
}
//判断是否有障碍物
function noBlockHorizontal(row,col1,col2,board){
  for(var i=col1+1;i<col2;i++){
    //一旦存在一个不为0的元素，就有障碍物
    if(board[row][i]!=0){
      return false;
    }
  }
  return true;
}
//判断是否有障碍物
function noBlockVertical(col,row1,row2,board){
  for(var i=row1+1;i<row2;i++){
    //一旦存在一个不为0的元素，就有障碍物
    if(board[i][col]!=0){
      return false;
    }
  }
  return true;
}
function nomove(){
  if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)){
    return false;
  }
  return true;
}