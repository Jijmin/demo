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

  // ����СŮ��λ��
  girl.setOffset();

  // С����· //
  var boy = BoyWalk();

  function playMusic(){
    var audio1 = Hmlt5Audio(audioConfig.playURl);
    audio1.end(function () {
      Hmlt5Audio(audioConfig.cycleURL, true);
    });
  }
  playMusic();

  // ��ʼ
  function init(){
    //      ̫����ת
    $('#sun').addClass('rotation');
//      Ʈ��
    $('.cloud:first').addClass('cloudAnim1');
    $('.cloud:last').addClass('cloudAnim2');
    boy.walkTo(2000, 0.2)
        .then(function(){
          //��һ����·���
          return scroll(5000,1);
        })
        .then(function(){
          //�ڶ�����
          return boy.walkTo(5000, 0.5);
        })
        .then(function() {
          //��ͣ��·
          boy.stopWalk();
        })
        .then(function() {
          //����
          return openDoor();
        })
        .then(function() {
          //����
          lamp.bright();
        })
        .then(function() {
          //���̵�
          return boy.toShop(2000);
        })
        .then(function(){
          //ȡ��
          return boy.takeFlower();
        })
        .then(function(){
          //����
          bird.fly();
        })
        .then(function() {
          //���̵�
          return boy.outShop(2000);
        })
        .then(function(){
          //����
          return shutDoor();
        })
        .then(function() {
          //�ư�
          lamp.dark();
        })
        .then(function(){
          //��ҳ����
          scroll(3000,2);
        })
        .then(function(){
          //���ŵ�
          return boy.walkTo(3000, 0.15)
        })
        .then(function() {
          // ��·������left,top
          return boy.walkTo(1500, 0.25, (bridgeY - boy.getHeight()) / visualHeight);
        })
        .then(function() {
          // ʵ����·�ı���
          var proportionX = (girl.getOffset().left - boy.getWidth() - girl.getWidth() / 10) / visualWidth;
          // ����ֱ�ߵ�СŮ����ǰ
          return boy.walkTo(1500, proportionX);
        })
        .then(function() {
          // ͼƬ��ԭԭ��ֹͣ״̬
          boy.resetOriginal();
        })
        .then(function(){
          // ����ת����
          setTimeout(function() {
            girl.rotate();
            boy.rotate(function() {
              // ��ʼ����
              //logo.run();
              snowflake();
            });
          }, 1000);
        });
  }
  init();

  // ��ʼ
  $("button").click(function() {
    var audio1 = Hmlt5Audio(audioConfig.playURl);
    audio1.end(function () {
      Hmlt5Audio(audioConfig.cycleURL, true);
    });
  })

})