### ��״ͼ
1. ����echarts.js
```
<script src="../echarts.min.js"></script>
```
2. ΪECharts׼��һ���߱���С(���)��DOM
```
<div id="main" style="width:900px;height:600px;"></div>
```
3. ����׼���õ�dom����ʼ��echartsʵ��
```
var myChart=echarts.init(document.getElementById('main'));
```
4. ָ��ͼ��������������
```
var option={
  //����
  title:{
    text:'ECharts ����ʾ��'
  },
  //������
  toolbox:{
    show:true,
    feature:{
      //����ͼƬ
      saveAsImage:{
        show:true
      }
    }
  },
  //ͼ��
  legend:{
    data:['����']
  },
  //x��
  xAxis:{
    data:['����','��ë��','ѩ����','����','�߸�Ь','����']
  },
  yAxis:{},
  //����
  series:[{
    name:'����',
    type:'bar',
    data:[5,20,36,10,10,20]
  }]
};
```
5. ʹ�ø�ָ�����������������ʾͼ��
```
myChart.setOption(option);
```
6. �ܽ�
- Echarts.init()
  1. ��ʼ��Echartsʵ��
  2. setOption��ָ�����ݻ�ͼ
- Option����
  1. ���⣺title
  2. ͼ����legend
  3. X�᣺xAxis
  4. ���ݣ�series(name,type,data)
### ����ͼ
������series�����һ������typeֵ��line�������ض������ݾ�������ͼ
### �������
���⸺����ʾ���ͼ��ı���
1. text����������
2. subtext���ӱ���
3. left,top,right,bottom����λ��
4. borderColor���߿���ɫ
5. borderWidth���߿���
### ���������
1. show���Ƿ���ʾ
2. feature��������ʾ�Ĺ���
3. saveAsImage������ͼƬ
4. restore����ԭ
5. dataView��������ͼ
6. dataZoom��������ͼ
7. magicType����̬�����л�
### tooltip���
show���Ƿ���ʾ
trigger��������ʽ��axis����x�����
### ����ߺͱ�ǵ�
1. �����:markline
- ����ߵ����
- ���ֵ��ƽ��ֵ����Сֵ�ı����
- ����λ�õı�ǵ�
```
//��ǵ�
markPoint:{
  data:[
    {type:'max',name:'���ֵ'},
    {type:'min',name:'��Сֵ'}
  ]
},
//�����
markLine:{
  data:[{type:'average',name:'ƽ��ֵ'}]
}
```
### ��ͼ
- ��ͼչʾ���ݵ��ص�
  1. չʾ�ٷֱ�
  2. type��pie
- centerԲ������
- radius�뾶
- nameͼ������
- selectedMode�Ƿ�֧�ֶ�ѡ
```
var option={
  //����
  title:{
    text:'ĳվ���û�������Դ',
    subtext:'�����鹹',
    x:'center'
  },
  tooltip:{
    trigger:'item',
    //��ʾ��ʽ
    formatter:'{a}<br/>{b}:{c}({d}%)'
  },
  //ͼ��
  legend:{
    orient:'vertical',
    left:'left',
    data:['ֱ�ӷ���','�ʼ�Ӫ��','���˹��','��Ƶ���','��������']
  },
  //����
  series:[{
    name:'������Դ',
    type:'pie',
    radius:'55%',
    center:['50%','60%'],
    data:[
        //nameҪ��ͼ���е�data����һһ��Ӧ
      {value:335,name:'ֱ�ӷ���'},
      {value:310,name:'�ʼ�Ӫ��'},
      {value:234,name:'���˹��'},
      {value:135,name:'��Ƶ���'},
      {value:1314,name:'��������'},
    ]
  }]
};
```
### �Ǳ�ͼ
1. �Ǳ�ͼչʾ���ݵ��ص�(type��guage)
2. ��̬�޸��Ǳ�ͼ����
```
series:[{
  name:'ҵ��ָ��',
  type:'gauge',
  detail:{formatter:'{value}%'},
  data:[{value:32,name:'�����'}]
}]
```
��̬�޸��Ǳ���ָ���λ��
```
setInterval(function(){
  option.series[0].data[0].value=(Math.random()*100).toFixed(2)-0;
  myChart.setOption(option,true);
},2000);
```
### ��ͼ
### ɢ��ͼ
### K��ͼ
### �״�ͼ