///////////
// 灯动画 //
///////////
// 动画结束事件
var animationEnd = (function() {
  var explorer = navigator.userAgent;
  if (~explorer.indexOf('WebKit')) {
    return 'webkitAnimationEnd';
  }
  return 'animationend';
})();
var lamp={
  elem:$('.b_background'),
  //灯亮
  bright:function(){
    this.elem.addClass('lamp_bright');
  },
  //灯灭
  dark:function(){
    this.elem.removeClass('lamp_bright');
  }
};
//   获取容器
var container=$('#content');
//   获取滑动对象
var swipe=Swipe(container);
//    可视区域的宽度
var visualWidth=container.width();
//    可视区域的高度
var visualHeight=container.height();
//    页面滚动到指定位置
function scrollTo(time,proportionX){
  var distX=visualWidth*proportionX;
//      调用滚动函数
  swipe.scrollTo(distX,time);
}
//    获取数据
var getValue=function(className){
//    获取标签名
  var $elem=$(className);
//    走路的路线坐标
  return {
//      要获取的高度
    height:$elem.height(),
//      距离父级元素的top值
    top:$elem.position().top
  };
};
//    桥的Y值
var bridgeY=function(){
  var data=getValue('.c_background_middle');
  return data.top;
}();
//开门处理
function doorAction(left,right,time){
  var $door=$('.door');
  var doorLeft=$('.door_left');
  var doorRight=$('.door_right');
  var defer= $.Deferred();
  var count=2;
//      等待开门完成
  var complete=function(){
    if(count==1){
      defer.resolve();
      return;
    }
    count--;
  };
  doorLeft.transition({'left':left},time,complete);
  doorRight.transition({'left':right},time,complete);
  return defer;
}
//   开门
function openDoor(){
  return doorAction('-50%','100%',2000);
}
//    关门
function shutDoor(){
  return doorAction('0%','50%',2000);
}
var instanceX;
var instanceY;
//小男孩走路
function BoyWalk(){
  var container=$('#content');
//页面可视区域
  var visualWidth=container.width();
  var visualHeight=container.height();
//  获取数据
  var getValue=function(className){
//    获取标签名
    var $elem=$(className);
//    走路的路线坐标
    return {
//      要获取的高度
      height:$elem.height(),
//      距离父级元素的top值
      top:$elem.position().top
    };
  };
//  路的Y值
  var pathY=function(){
//    获取元素数据
    var data=getValue('.a_background_middle');
//    计算路的Y轴坐标值
    return data.top+data.height/2;
  }();
//取得小男孩对象
  var $boy=$('#boy');
//  获取小男孩的高度
  var boyHeight=$boy.height();
  //  获取小男孩的宽度
  var boyWidth=$boy.width();
//  设置小男孩的坐标
//  路的坐标值减去小男孩的高度，25是一个修正值
  $boy.css({
    top:pathY-boyHeight+25
  });
//  暂停走路
  function pauseWalk(){
    $boy.addClass('pauseWalk');
  }
//恢复走路
  function restoreWolk(){
    $boy.removeClass('pauseWalk');
  }
//CSS3的动作变化
  function slowWalk(){
    $boy.addClass('slowWalk');
  }
//计算移动距离
  function calculateDist(direction,proportion){
    return (direction=='x'?visualWidth:visualHeight)*proportion;
  }
//用transition做运动
  function startRun(options,runTime){
    var dfdPlay= $.Deferred();
//  恢复走路
    restoreWolk();
//  运动属性
    $boy.transition(options,runTime,'linear',function(){
      dfdPlay.resolve();//动画完成
    });
    return dfdPlay;
  }
//开始走路
  function walkRun(time,dist,disY){
    time=time || 3000;
//  脚动作
    slowWalk();
//  开始走路
    var d1=startRun({
      'left':dist+'px',
      'top':disY?disY:undefined
    },time);
    return d1;
  }
//  走进商店
  function walkToShop(runTime){
    var defer= $.Deferred();
    var doorObj=$('.door');
    //  门的坐标值
    var offsetDoor=doorObj.offset();
    var doorOffetLeft=offsetDoor.left;
    var doorOffetTop=offsetDoor.top;
    //  小男孩的坐标值
    var posBoy=$boy.position();
    var boyPoxLeft=posBoy.left;
    var boyPoxTop=posBoy.top;
    //中间位置
    var boyMiddle=$boy.width()/2;
    var doorMiddle=doorObj.width()/2;
    var doorTopMiddle=doorObj.height()/2;
    //  当前需要移动的坐标
    instanceX=(doorOffetLeft+doorMiddle)-(boyPoxLeft+boyMiddle);
    //  Y的坐标值=人物底部的top-门中见的top值
    //instanceY=(boyPoxTop+boyHeight)-doorOffetTop+doorTopMiddle;
    //开始走路
    var walkPlay=startRun({
      //transform:'translateX('+instanceX+'px),translateY(-'+instanceY+'px),scale(0.5,0.5)',
      transform:'translateX('+instanceX+'px),scale(0.3,0.3)',
      opacity:0.1
    },2000);
    //  走路完毕
    walkPlay.done(function(){
      $boy.css({
        opacity:0
      });
      defer.resolve();
    })
    return defer;
  }
//  走出店
  function walkOutShop(runTime){
    var defer= $.Deferred();
    restoreWolk();
    //  开始走路
    var walkPlay=startRun({
      //transform:'translateX('+instanceX+'px),translateY(-'+instanceY+'px),scale(1,1)',
      transform:'translateX('+instanceX+'px),scale(1,1)',
      opacity:1
    },runTime);
    //  走路完毕
    walkPlay.done(function(){
      defer.resolve();
    });
    return defer;
  }
//  取花
  function talkFlower(){
    var defer= $.Deferred();
    setTimeout(function(){
      $boy.addClass('slowFlowerWalk');
      defer.resolve();
    },1000);
    return defer;
  }
//  给外部提供接口
  return {
    //  开始走路
    walkTo:function(time,proportionX,proportionY){
      var distX=calculateDist('x',proportionX);
      var distY=calculateDist('y',proportionY);
      return walkRun(time,distX,distY);
    },
    //走进商店
    toShop:function(){
      return walkToShop.apply(null,arguments);
    },
    //走出商店
    outShop:function(){
      return walkOutShop.apply(null,arguments);
    },
    //  停止走路
    stopWalk:function(){
      return pauseWalk();
    },
    setColoer:function(value){
      $boy.css('background-color',value)
    },
    //  取花
    talkFlower:function(){
      return talkFlower();
    },
  //  获取小男孩的宽度
    getWidth:function(){
      return $boy.width();
    },
    // 复位初始状态
    resetOriginal: function() {
      this.stopWalk();
      // 恢复图片
      $boy.removeClass('slowWalk slowFlowerWalk');
      $boy.addClass('boyOriginal');
    },
    //转身动作
    rotate:function(callback){
    //  恢复走路
      restoreWolk();
      $boy.addClass('boy-rotate');
    //  监听转身完毕
      if(callback){
        $boy.on(animationEnd,function() {
          callback();
          $(this).off();
        });
      }
    },
    setFlowerWalk:function(){
      $boy.addClass('slowFlowerWalk');
    }
  }
}
//小女孩
var girl={
  elem:$('.girl'),
  getHeight:function(){
    return this.elem.height();
  },
//      转身的动作
  rotate: function(){
    this.elem.addClass('girl_rotate');
  },
  setOffset:function(){
    this.elem.css({
      left:visualWidth/2,
      top:bridgeY-this.getHeight()
    });
  },
  getOffset:function(){
    return this.elem.offset();
  },
  getWidth:function(){
    return this.elem.width();
  }
};
//    修正小女孩的位置
girl.setOffset();
//loge动画
var logo={
  elem:$('.logo'),
  run:function(){
    //内部通过jQuery.on方法监听一个动画结束的事件，转身动画结束后会调用这个回调函数
    this.elem.addClass('logolightSpeedIn').on(animationEnd,function(){
      $(this).addClass('logoshake').off();
    });
  }
};
// 小孩走路 //
//var boy=BoyWalk();
//boy.setFlowerWalk();
//$('button:first').click(function(){
////      第一次走路到桥底边left,top
//  boy.walkTo(2000,0.15).then(function(){
////        第二次走路到桥上left,top
//    return boy.walkTo(1500, 0.25, (bridgeY - girl.getHeight()) / visualHeight);
//  }).then(function(){
////        实际走路的比例
//    var proportionX=(girl.getOffset().left-boy.getWidth()+girl.getWidth()/5)/visualWidth;
////        第三次桥上直走到小女孩的面前
//    return boy.walkTo(1500,proportionX);
//  }).then(function(){
////        图片还原原地停止状态
//    boy.resetOriginal();
//  }).then(function(){
////        增加转身动作
//    setTimeout(function(){
////          女孩转身
//      girl.rotate();
////          男孩转身
//      boy.rotate(function(){
////            开始logo动画
//        logo.run();
//      });
//    },1000);
//  });
//});
var snowflakeURl=['images/snowflake/snowflake1.png'
  ,'images/snowflake/snowflake2.png'
  ,'images/snowflake/snowflake3.png'
  ,'images/snowflake/snowflake4.png'
  ,'images/snowflake/snowflake5.png'
  ,'images/snowflake/snowflake6.png'];
///////
//飘花 //
///////
function snowflake(){
//      花容器
  var $flakeContanier=$('#snowflake');
//      随机6张图片
  function getImagesName(){
    return snowflakeURl[[Math.floor(Math.random()*6)]];
  }
//      创建一个花瓣元素
  function createSnowBox(){
    var url=getImagesName();
    return $('<div class="snowbox" />').css({
      'width': 41,
      'height': 41,
      'position': 'absolute',
      'backgroundSize': 'cover',
      'zIndex': 100000,
      'top': '-41px',
      'backgroundImage': 'url(' + url + ')'
    }).addClass('snowRoll');
  }
//      开始飘花
  setInterval(function(){
//        运动轨迹
    var startPositionLeft = Math.random() * visualWidth - 100,
        startOpacity    = 1,
        endPositionTop  = visualHeight - 40,
        endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
        duration        = visualHeight * 10 + Math.random() * 5000;
//        随机透明度，不小于0.5
    var randomStart = Math.random();
    randomStart = randomStart < 0.5 ? startOpacity : randomStart;
//        创建一个花瓣
    var $flake = createSnowBox();
//        设计起点位置
    $flake.css({
      left: startPositionLeft,
      opacity : randomStart
    });
//        加入到容器中
    $flakeContanier.append($flake);
//        开始执行动画
    $flake.transition({
      top: endPositionTop,
      left: endPositionLeft,
      opacity: 0.7
    }, duration, 'ease-out', function() {
      $(this).remove() //结束后删除
    });
  },200);
}
// 音乐配置
var audioConfig = {
  enable: true, // 是否开启音乐
  playURl: 'music/happy.wav', // 正常播放地址
  cycleURL: 'music/circulation.wav' // 正常循环播放地址
};

/////////
//背景音乐 //
/////////
function Hmlt5Audio(url, isloop) {
  var audio = new Audio(url);
  audio.autoPlay = true;
  audio.loop = isloop || false;
  audio.play();
  return {
    end: function(callback) {
      audio.addEventListener('ended', function() {
        callback();
      }, false);
    }
  };
}
//    右边飞鸟
var bird={
  elem:$('.bird'),
  fly:function(){
    this.elem.addClass('birdFly');
    this.elem.transition({right:container.width()},15000,'linear');
  }
};
function startRun(){
  boy.walkTo(2000,0.5).then(function(){
//        暂停走路
    boy.stopWalk();
  }).then(function(){
//        开门
    return openDoor();
  }).then(function(){
//        开灯
    lamp.bright();
  }).then(function(){
//        进商店
    return boy.toShop(2000);
  }).then(function(){
//        取花
    return boy.talkFlower();
  }).then(function(){
//        飞鸟
    bird.fly();
  }).then(function(){
//        出商店
    return boy.outShop(2000);
  }).then(function(){
//        关门
    return shutDoor();
  }).then(function(){
//        灯暗
    lamp.dark();
  });
}