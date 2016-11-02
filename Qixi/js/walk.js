// ���������¼�,С�к�ת�������õ��ú���
var animationEnd = (function() {
  var explorer = navigator.userAgent;
  if (~explorer.indexOf('WebKit')) {
    return 'webkitAnimationEnd';
  }
  return 'animationend';
})();
//container����ҳ������
var container = $("#content");
var visualWidth = container.width();
var visualHeight = container.height();
var swipe = Swipe(container);
// ��ȡԪ�صĸ߶Ⱥ�top
var getValue = function(className) {
  var $elem = $('' + className + '');
  //��·��·������
  return {
    height: $elem.height(),
    top: $elem.position().top
  };
};
// �ŵ�Y��,СŮ��λ����Ҫ
var bridgeY = function() {
  var data = getValue('.c_background_middle');
  return data.top;
}();
////////
//СŮ�� //
////////
var girl = {
  elem: $('.girl'),
  getHeight: function() {
    return this.elem.height();
  },
  // ת����
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
 * �к���·
 * @param {[type]} container [description]
 */
function BoyWalk(){

  // ·��Y��
  var pathY = function() {
    var data = getValue('.a_background_middle');
    return data.top + data.height / 2;
  }();
  var $boy = $("#boy");
  var boyHeight = $boy.height();
  // ����С�к�����ȷλ��
  $boy.css({
    top: pathY - boyHeight + 25
  });
  // ��ͣ��·
  function pauseWalk(){
    $boy.addClass('pauseWalk');
  }
  // �ָ���·
  function restoreWalk() {
    $boy.removeClass('pauseWalk');
  }
  // css3�Ķ����仯
  function slowWalk() {
    $boy.addClass('slowWalk');
  }
  // ��transition���˶�
  function startRun(options, runTime) {
    var dfdPlay = $.Deferred();
    // �ָ���·
    restoreWalk();
    // �˶�������
    $boy.transition(
        options,
        runTime,
        'linear',
        function() {
          dfdPlay.resolve();
        });
    return dfdPlay;
  }
  // ��ʼ��·
  function walkRun(time, distX, disY) {
    time = time || 3000;
    // �Ŷ���
    slowWalk();
    // ��ʼ��·
    var d1 = startRun({
      'left': distX + 'px',
      'top': disY ? disY : undefined
    }, time);
    return d1;
  }
  // �����ƶ�����
  function calculateDist(direction, proportion) {
    return (direction == "x" ?
            visualWidth : visualHeight) * proportion;
  }

  // �߽��̵�
  function walkToShop(runTime) {
    var defer = $.Deferred();
    var doorObj = $('.door');
    // �ŵ�����
    var offsetDoor = doorObj.offset();
    var doorOffsetLeft = offsetDoor.left;
    // С����ǰ������
    var offsetBoy     = $boy.offset();
    var boyOffetLeft = offsetBoy.left;

    // ��ǰ��Ҫ�ƶ�������
    instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffetLeft + $boy.width() / 2);

    // ��ʼ��·
    var walkPlay = startRun({
      transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
      opacity: 0.1
    }, 2000);
    // ��·���
    walkPlay.done(function() {
      $boy.css({
        opacity: 0
      });
      defer.resolve();
    });
    return defer;
  }

  // �߳���
  function walkOutShop(runTime) {
    var defer = $.Deferred();
    restoreWalk();
    //��ʼ��·
    var walkPlay = startRun({
      transform: 'translateX(' + instanceX + 'px),scale(1,1)',
      opacity: 1
    }, runTime);
    //��·���
    walkPlay.done(function() {
      defer.resolve();
    });
    return defer;
  }

  //ȡ��
  function talkFlower() {
    // ������ʱ�ȴ�Ч��
    var defer = $.Deferred();
    setTimeout(function() {
      // ȡ��
      $boy.addClass('slowFlowerWalk');
      defer.resolve();
    }, 1000);
    return defer;
  }

  return {
    // ��ʼ��·
    walkTo: function(time, proportionX, proportionY) {
      var distX = calculateDist('x', proportionX);
      var distY = calculateDist('y', proportionY);
      return walkRun(time, distX, distY);
    },
    // �߽��̵�
    toShop: function() {
      return walkToShop.apply(null, arguments);
    },
    // �߳��̵�
    outShop: function() {
      return walkOutShop.apply(null, arguments);
    },
    // ֹͣ��·
    stopWalk: function() {
      pauseWalk();
    },
    // ȡ��
    takeFlower:function(){
      return talkFlower();
    },
    // ��ȡ�к��Ŀ��
    getWidth: function() {
      return $boy.width();
    },
    getHeight:function(){
      return $boy.height();
    },
    // ��λ��ʼ״̬
    resetOriginal: function() {
      this.stopWalk();
      // �ָ�ͼƬ
      $boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
    },
    //ȡ��������
    setFlolerWalk:function(){
      $boy.addClass('slowFlolerWalk');
    },
    // ת����
    rotate: function(callback) {
      restoreWalk();
      $boy.addClass('boy-rotate');
      // ����ת�����
      if (callback) {
        $boy.on(animationEnd, function() {
          callback();
          $(this).off();
        })
      }
    }
  }

}
