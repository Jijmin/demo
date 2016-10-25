/**
 * Created by Administrator on 2016/10/16.
 */
$(function() {
  function scroll(time, proportionX){
    var defer = $.Deferred();
    var distX = container.width()*proportionX;
    swipe.scrollTo(distX,time);
    defer.resolve();
    return defer;
  }

  // 修正小女孩位置
  girl.setOffset();

  // 小孩走路 //
  var boy = BoyWalk();

  function playMusic(){
    var audio1 = Hmlt5Audio(audioConfig.playURl);
    audio1.end(function () {
      Hmlt5Audio(audioConfig.cycleURL, true);
    });
  }
  playMusic();

  // 开始
  function init(){
    //      太阳公转
    $('#sun').addClass('rotation');
//      飘云
    $('.cloud:first').addClass('cloudAnim1');
    $('.cloud:last').addClass('cloudAnim2');
    boy.walkTo(2000, 0.2)
        .then(function(){
          //第一次走路完成
          return scroll(5000,1);
        })
        .then(function(){
          //第二次走
          return boy.walkTo(5000, 0.5);
        })
        .then(function() {
          //暂停走路
          boy.stopWalk();
        })
        .then(function() {
          //开门
          return openDoor();
        })
        .then(function() {
          //开灯
          lamp.bright();
        })
        .then(function() {
          //进商店
          return boy.toShop(2000);
        })
        .then(function(){
          //取花
          return boy.takeFlower();
        })
        .then(function(){
          //飞鸟
          bird.fly();
        })
        .then(function() {
          //出商店
          return boy.outShop(2000);
        })
        .then(function(){
          //关门
          return shutDoor();
        })
        .then(function() {
          //灯暗
          lamp.dark();
        })
        .then(function(){
          //到页面三
          scroll(3000,2);
        })
        .then(function(){
          //到桥底
          return boy.walkTo(3000, 0.15)
        })
        .then(function() {
          // 走路到桥上left,top
          return boy.walkTo(1500, 0.25, (bridgeY - boy.getHeight()) / visualHeight);
        })
        .then(function() {
          // 实际走路的比例
          var proportionX = (girl.getOffset().left - boy.getWidth() - girl.getWidth() / 10) / visualWidth;
          // 桥上直走到小女孩面前
          return boy.walkTo(1500, proportionX);
        })
        .then(function() {
          // 图片还原原地停止状态
          boy.resetOriginal();
        })
        .then(function(){
          // 增加转身动作
          setTimeout(function() {
            girl.rotate();
            boy.rotate(function() {
              // 开始动画
              //logo.run();
              snowflake();
            });
          }, 1000);
        });
  }
  init();

  // 开始
  $("button").click(function() {
    var audio1 = Hmlt5Audio(audioConfig.playURl);
    audio1.end(function () {
      Hmlt5Audio(audioConfig.cycleURL, true);
    });
  })

})