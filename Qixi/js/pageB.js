//ҳ���������
function doorAction(left, right, time) {
  var $door = $('.door');
  var doorLeft = $('.door_left');
  var doorRight = $('.door_right');
  var defer = $.Deferred();
  var count = 2;
  // �ȴ��������
  var complete = function() {
    if (count == 1) {
      defer.resolve();
      return;
    }
    count--;
  };
  doorLeft.transition({
    'left': left
  }, time, complete);

  doorRight.transition({
    'left': right
  }, time, complete);

  return defer;
}
// ����
function openDoor() {
  return doorAction('-50%', '100%', 2000);
}

// ����
function shutDoor() {
  return doorAction('0%', '50%', 2000);
}
// �ƶ���
var lamp = {
  elem: $('.b_background'),
  bright: function() {
    this.elem.addClass('lamp_bright')
  },
  dark: function() {
    this.elem.removeClass('lamp_bright')
  }
};
//////////
//�ұ߷��� //
/////////
var bird = {
  elem: $(".bird"),
  fly: function() {
    this.elem.addClass('birdFly');
    this.elem.transition({
      right: $('#content').width()
    }, 15000, 'linear');
  }
};
