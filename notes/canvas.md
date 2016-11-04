### Canvas
1. 作用：在页面展示我们绘制的图片
2. 历史：canvas最早是由苹果公司

### 基本使用
1. <canvas></canvas>
2. 特点：
    1. 默认情况下宽为300，高为150
    2. IE9之前的浏览器不支持canvas，为了兼容，会以一个div解析，可以显示一段文字提示用户升级浏览器
    3. canvas可以通过设置width和height属性来设置，只可以用标签的自带属性，不能用css设置样式
    4. Canvas的兼容性很好
    5. Canvas不但可以应用于pc端，还可以应用于移动端
    6. Canvas仅仅只是一个标签，没有任何的绘制方法，如果要绘制，通过JS绘制

### Canvas基本绘图
1. 得到canvas对象
2. 得到canvas的上下文对象(工具箱)
3. 该方法返回 CanvasRenderingContext2D 类型的对象. 该对象提供基本的绘图命令.
4. 使用 CanvasRenderingContext2D 对象提供的方法进行绘图.
5. 基本绘图命令
    a)设置开始绘制ctx.moveTo(x,y)
    b)设置直线到的位置ctx.lineTo(x,y)
    c)描边绘制ctx.stroke()
    d)填充绘制ctx.fill()
    e)闭合路径ctx.closePath()

### 开始绘制一条直线
1. 将画笔移动到页面的某一位置，两个参数，起始的X和Y
```
ctx.moveTo(100,100);
```
2. 设置线段的另外一个点的位置
```
ctx.lineTo(200,100);
```
3. 链接两点
```
ctx.stroke();
```

### 绘制一条虚线
将所有的虚线看成是一段一段的实线，定义一个初始位置，开始画图，还要定义一个步长
不知道循环次数，用while循环来画一小截的线段，一小节线段的起点位置加步长就是终点位置，下一次的起点位置就是终点位置加步长
如果是绘制斜线的话，只需要计算每一个线段对应的X和Y和canvas框框是等比例的

### 非零环绕fill()
1. 外面的是顺时针
2. 里面的是逆时针
3. 在形状内部任意引出一条射线
4. 与外面的矩形的交点记录+1
5. 与里面的交点记录为-1
6. 所有交点的和如果是非零就填充
7. 如果和为0就不填充

### closePath()闭合路径，重新申请一个路径beginPath()
不管是stroke还是fill在使用的时候都会将所有路径全部重绘

### 线行相关属性
1. lineWidth设置线宽(浏览器显示时比正常大小要大，浏览器会默认平滑锯齿)
2. lineCap设置线末端类型
    1. 'butt' 表示两端使用方形结束
    2. 'round' 表示两端使用圆角结束
    3. 'square' 表示突出的圆角结束
3.lineJoin设置相交线的拐点
    1. 'round' 使用圆角连接.
    2. 'bevel' 使用平切连接.
    3. 'miter' 使用直角转.
4.虚线
    1. lineDashOffset用于设置开始绘制虚线的偏移量. 数字的正负表示左右偏移
    2. getLineDash() 与 setLineDash() 方法使用数组描述实线与虚线的长度

### 改变画笔颜色
1. strokeStyle以及fillStyle必须配合对应的画法
2. strokeStyle 可以设置描边颜色, 与 CSS 的语法一样
3. fillStyle 设置填充颜色, 与 CSS 语法一样
4. 这两个属性还可以设置渐变对象

### 绘制矩形
rect 方法就是矩形路径, 还需要使用 fill 或 stroke 才可以看到效果. 因此一般使用 strokeRect 或 fillRect 直接可以看到结果.
1. clearRect(x,y,width,height)清除矩形区域
2. strokeRect(x,y,width,height)支持strokeStyle设置颜色样式
3. fillRect(x,y,width,height)支持strokeStyle设置颜色样式

### 注意
1. lineWidth定义的是一个全局显示的，只要第一个改变，后面的没有改变的情况下都是继承上面的
2. 用stroke着色后，再用fill，会覆盖线宽的一半，不想覆盖，互换位置
3. lineCap中的round只能改变线头两边的形状，但是不能改变链接处的形状
4. lineCap中的square可以解决线头用lineTo闭合时会留有空隙的问题
5. miterLimit的默认值是10，使用miter用于线条与线条相接时，内角和外角之间的距离的最大值，一旦超过就会采用bevel的显示方式
6. Scale操作具有副作用，不仅放大图像的大小，对于图像的其他数值属性也会相应的放大

### 图形变换translate
可以用来位移，但是存在一个小陷阱，会叠加变换，解决办法：在图形变换之后再逆转过来，用图形变换改变为原来的位置
还可以用canvas的一个办法：调用save接口，保存当前的图形状态，绘制完成之后调用restore，绘制效果不冲突

### 变换矩阵
> a c e 水平缩放(1) 垂直倾斜(0) 水平位移(0) 
> b d f 水平倾斜(0) 垂直缩放(1) 垂直位移(0)
> 0 0 1 

设置变换矩阵transform(a,b,c,d,e,f)
忽略掉当前所有的transform设置，可以使用setTransform(1,0,0,1,100,100)来设置到想要的位置

### 设置渐变色
1. var grd=context.createLinearGradient(xstart,ystart,xend,yend);//渐变线
2. grd=addColorStop(stop,color);//设置关键颜色,最起始的位置时0.0，最后的位置时1.0
3. 将grd赋值给fillStyle中
4. 在设置渐变线的时候，如果超过画布，会隐藏
5. Var grd=context.createRadialGradient(x0,y0,r0,x1,y1,r1);

### 图片填充样式
createPattern(img,repeat-style)，不仅可以添加img图片，还可以添加另外的canvas画布的填充，还可以使用一段视频填充

### 曲线绘制
createPattern(img,repeat-style)，不仅可以添加img图片，还可以添加另外的canvas画布的填充，还可以使用一段视频填充

### 曲线绘制
> Context.arc(centerx,centery,radius,startingAngle,endingAngle,anticlockwise=false);//顺时针

### 绘制一段曲线arc(x1,y1,x2,y2,radius)
与两条线相切，起始点的坐标是x0,y0，终止点是和线段相切的地方
如果传入的半径过大，会向回返方向找到一个点进行绘制，终点也不在线上而在直线的延长线上。两条辅助线可以是任意的线段。

### 绘制文本
fillText(text,x,y)在页面上绘制一个填充文本，text要绘制的文本，x,y绘制参考点
strokeText在页面上绘制一个描边的文本
属性：
1. font:设置文本样式=”字体大小 字体类型”
2. textAlign:设置文本在水平方向的对齐方式=”left right center”
- Left:与参考点的左边对齐
- Canter：与参考点的中间对齐
- Right：与参考点右边对齐
3. textBaseline:设置文本正垂直方向的对齐(top,middle,bottom)
4. 要得到文本的宽度：measureText，一定要传入文本，里面有一个width属性，可以获取文本宽度

### 贝塞尔曲线
1. context.moveTo(x0,y0);//初始点
2. context.quadraticCurveTo(x1,y1,x3,y2);//控制点和结尾点
3. X0,y0就是起始x2,y2就是终点

### 绘制图片
1. drawImage(img,100,100)，通过ID获取时一定要在页面加载之后通过一个对象得到图片
> var img=new Image();
> Img.src=’img/1.jpg;
> Img.onload=function(){}
//由于图片的加载是需要时间的，这比JS代码执行的时间要长，如果要正常显示图片必须将图片加载完毕后在执行。在img中有一个方发onload，可以解决。
2. drawImage(img,x,y,x0,y0):将一张图片绘制到canvas上的固定的矩形中，如果图片过大会将图片进行缩放
3. drawImage(img,img_x,img_y,img_width,img_height,x,y,width,height)
将当前的图片的一部分进行裁剪，裁剪完成后将图片显示在canvas中对应的固定大小的矩形中

### 变换
1. translate(x,y)：用于平移坐标系
2. rotate(30*Math.PI/180):旋转，坐标的原点进行顺时针旋转，这个方法会在原有的基础上旋转
3. scale(x,y)：x，y轴的缩放比例

### Konva
优点：
1. 使用起来比较方便，与JS语法比较相似
2. Kanva的社区非常活跃，它是开源的
3. 大小比较小，性能比较高
