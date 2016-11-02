//logo���� //
///////////
/*var logo = {
 elem: $('.logo'),
 run: function() {
 this.elem.addClass('logolightSpeedIn')
 .on(animationEnd, function() {
 $(this).addClass('logoshake').off();
 });
 }
 };*/
///////
//Ʈѩ�� //
///////
var snowflakeURl=['images/snowflake/snowflake1.png'
  ,'images/snowflake/snowflake2.png'
  ,'images/snowflake/snowflake3.png'
  ,'images/snowflake/snowflake4.png'
  ,'images/snowflake/snowflake5.png'
  ,'images/snowflake/snowflake6.png'];

function snowflake() {
  // ѩ������
  var $flakeContainer = $('#snowflake');

  // �������ͼ
  function getImagesName() {
    return snowflakeURl[[Math.floor(Math.random() * 6)]];
  }
  // ����һ��ѩ��Ԫ��
  function createSnowBox() {
    var url = getImagesName();
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
  // ��ʼƮ��
  setInterval(function() {
    // �˶��Ĺ켣
    var startPositionLeft = Math.random() * visualWidth - 100,
        startOpacity    = 1,
        endPositionTop  = visualHeight - 40,
        endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
        duration        = visualHeight * 10 + Math.random() * 5000;

    // ���͸���ȣ���С��0.5
    var randomStart = Math.random();
    randomStart = randomStart < 0.5 ? startOpacity : randomStart;

    // ����һ��ѩ��
    var $flake = createSnowBox();

    // ������λ��
    $flake.css({
      left: startPositionLeft,
      opacity : randomStart
    });

    // ���뵽����
    $flakeContainer.append($flake);

    // ��ʼִ�ж���
    $flake.transition({
      top: endPositionTop,
      left: endPositionLeft,
      opacity: 0.7
    }, duration, 'ease-out', function() {
      $(this).remove();//������ɾ��
    });

  }, 200);
}

// ��������
var audioConfig = {
  enable: true, // �Ƿ�������
  playURl: 'music/happy.wav', // �������ŵ�ַ
  cycleURL: 'music/circulation.wav' // ����ѭ�����ŵ�ַ
};
/////////
//�������� //
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
}/**
 * Created by Administrator on 2016/10/16.
 */
