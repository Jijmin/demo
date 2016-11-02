/**
 * Created by Administrator on 2016/10/14.
 */
/////////
//页面滑动 //
/////////
function Swipe(container){
//  获取第一个子节点
  var element=container.find(':first');
  //滑动对象
  var swipe={};
  //  li页面数量
  var slides=element.find('li');
  //  获取容器尺寸
  var width=container.width();
  var height=container.height();
  //  设置ul页面的总宽度
  element.css({
    width:(slides.length*width)+'px',
    height:height+'px'
  });
  //设置每一个页面的li的宽度
  $.each(slides,function(index){
//  获取每一个li元素
    var slide=slides.eq(index);
//  给每一个li设置宽高
    slide.css({
      width:width+'px',
      height:height+'px'
    });
  });
  //监控滚轮事件与移动
  swipe.scrollTo=function(x,speed){
    //  执行动画移动
    element.css({
      'transition-timing-function':'linear',
      'transition-duration':speed+'ms',
      'transform':'translate3d(-'+x+'px,0px,0px)'
    });
    return this;
  };
  return swipe;
}