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