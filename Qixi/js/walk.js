// 动画结束事件,小男孩转身动作中用到该函数
var animationEnd = (function() {
  var explorer = navigator.userAgent;
  if (~explorer.indexOf('WebKit')) {
    return 'webkitAnimationEnd';
  }
  return 'animationend';
})();
//container整个页面容器
var container = $("#content");
var visualWidth = container.width();
var visualHeight = container.height();
var swipe = Swipe(container);
// 获取元素的高度和top
var getValue = function(className) {
  var $elem = $('' + className + '');
  //走路的路线坐标
  return {
    height: $elem.height(),
    top: $elem.position().top
  };
};
// 桥的Y轴,小女孩位置需要
var bridgeY = function() {
  var data = getValue('.c_background_middle');
  return data.top;
}();
////////
//小女孩 //
////////
var girl = {
  elem: $('.girl'),
  getHeight: function() {
    return this.elem.height();
  },
  // 转身动作
  rotate: function() {
    this.elem.addClass('girl_rotate');
  },
  setOffset: function() {
    this.elem.css({
      left: visualWidth / 2,
      top: bridgeY - this.getHeight()
    });
  },
  getOffset: function() {
    return this.elem.offset();
  },
  getWidth: function() {
    return this.elem.width();
  }
};

/**
 * 男孩走路
 * @param {[type]} container [description]
 */
function BoyWalk(){

  // 路的Y轴
  var pathY = function() {
    var data = getValue('.a_background_middle');
    return data.top + data.height / 2;
  }();
  var $boy = $("#boy");
  var boyHeight = $boy.height();
  // 修正小男孩的正确位置
  $boy.css({
    top: pathY - boyHeight + 25
  });
  // 暂停走路
  function pauseWalk(){
    $boy.addClass('pauseWalk');
  }
  // 恢复走路
  function restoreWalk() {
    $boy.removeClass('pauseWalk');
  }
  // css3的动作变化
  function slowWalk() {
    $boy.addClass('slowWalk');
  }
  // 用transition做运动
  function startRun(options, runTime) {
    var dfdPlay = $.Deferred();
    // 恢复走路
    restoreWalk();
    // 运动的属性
    $boy.transition(
        options,
        runTime,
        'linear',
        function() {
          dfdPlay.resolve();
        });
    return dfdPlay;
  }
  // 开始走路
  function walkRun(time, distX, disY) {
    time = time || 3000;
    // 脚动作
    slowWalk();
    // 开始走路
    var d1 = startRun({
      'left': distX + 'px',
      'top': disY ? disY : undefined
    }, time);
    return d1;
  }
  // 计算移动距离
  function calculateDist(direction, proportion) {
    return (direction == "x" ?
            visualWidth : visualHeight) * proportion;
  }

  // 走进商店
  function walkToShop(runTime) {
    var defer = $.Deferred();
    var doorObj = $('.door');
    // 门的坐标
    var offsetDoor = doorObj.offset();
    var doorOffsetLeft = offsetDoor.left;
    // 小孩当前的坐标
    var offsetBoy     = $boy.offset();
    var boyOffetLeft = offsetBoy.left;

    // 当前需要移动的坐标
    instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffetLeft + $boy.width() / 2);

    // 开始走路
    var walkPlay = startRun({
      transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
      opacity: 0.1
    }, 2000);
    // 走路完毕
    walkPlay.done(function() {
      $boy.css({
        opacity: 0
      });
      defer.resolve();
    });
    return defer;
  }

  // 走出店
  function walkOutShop(runTime) {
    var defer = $.Deferred();
    restoreWalk();
    //开始走路
    var walkPlay = startRun({
      transform: 'translateX(' + instanceX + 'px),scale(1,1)',
      opacity: 1
    }, runTime);
    //走路完毕
    walkPlay.done(function() {
      defer.resolve();
    });
    return defer;
  }

  //取花
  function talkFlower() {
    // 增加延时等待效果
    var defer = $.Deferred();
    setTimeout(function() {
      // 取花
      $boy.addClass('slowFlowerWalk');
      defer.resolve();
    }, 1000);
    return defer;
  }

  return {
    // 开始走路
    walkTo: function(time, proportionX, proportionY) {
      var distX = calculateDist('x', proportionX);
      var distY = calculateDist('y', proportionY);
      return walkRun(time, distX, distY);
    },
    // 走进商店
    toShop: function() {
      return walkToShop.apply(null, arguments);
    },
    // 走出商店
    outShop: function() {
      return walkOutShop.apply(null, arguments);
    },
    // 停止走路
    stopWalk: function() {
      pauseWalk();
    },
    // 取花
    takeFlower:function(){
      return talkFlower();
    },
    // 获取男孩的宽度
    getWidth: function() {
      return $boy.width();
    },
    getHeight:function(){
      return $boy.height();
    },
    // 复位初始状态
    resetOriginal: function() {
      this.stopWalk();
      // 恢复图片
      $boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
    },
    //取花后行走
    setFlolerWalk:function(){
      $boy.addClass('slowFlolerWalk');
    },
    // 转身动作
    rotate: function(callback) {
      restoreWalk();
      $boy.addClass('boy-rotate');
      // 监听转身完毕
      if (callback) {
        $boy.on(animationEnd, function() {
          callback();
          $(this).off();
        })
      }
    }
  }

}
