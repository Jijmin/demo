### call和apply的区别
相同点：
1. 将函数绑定到另外一个对象上去运行
2. 至少有一个参数
3. 第一个参数必须有且是一个对象
4. 可以改变this的指向
5. 实现继承

区别：
1. apply最多两个参数，第二个参数是是一个数组或伪数组
2. call要将所有的参数都列举在第一个参数后面

### 如何在 HTML 中添加事件，几种方法？
1. 标签之中直接添加  onclick="fun()";
2. JS 添加  Eobj.onclick = method;
3. 现代事件 IE9 以前：obj.attachEvent('onclick', method) ；
4. 标准浏览器: obj.addEventListener('click', method, false);

### window.onload 和 document.ready 的区别？
1. load 要等到图片和包含的文件都加载进来之后执行；
2. ready 是不包含图片和非文字文件的文档结构准备好就执行；

### 你如何优化自己的代码？
1. 重复执行的代码写成函数
2. 函数功能单一，拆分函数避免过于臃肿
3. 避免全局变量(命名空间，封闭空间，模块化MVC...)
4. 适当可读性的注释
6. 在一些复杂的业务逻辑或者是计算逻辑，都应该写出这个业务逻辑的具体过程
7. 内存管理，尤其是闭包中的变量释放
8. 良好的编码风格和命名

### 请简要描述Web前端性能需要考虑哪方面，你的优化思路是什么？
1. 雅虎14web优化规则
2. 减少http请求
3. 小图弄成大图
4. 合理的设置缓存
5. 资源合并、压缩
6. 将外部的JS文件置顶

### 简述readonly与disabled的区别
1. readonly只针对input(text/password)、textarea有效，会将值传递出去
2. disabled对所有的表单元素都有效，当表单通过GET、POST提交的时候，值不会被传递出去

### 请尽可能详尽的解释 ajax 的工作原理

### 为什么扩展 javascript 内置对象不是好的做法
因为扩展内置对象会影响整个程序中所有使用到的该内置对象的原型属性。

### 请解释下JavaScript的同源策略
域名、协议、端口号

### 如果设计中使用了非标准的字体，你该如何去实现？
先通过font-face定义字体，再引用

### HTTP协议中GET和POST有什么区别？分别适用什么场景？
- get传送的数据长度有限制，post没有
- get通过URL传递，在浏览器地址栏可见，post在报文中传递
- post一般适用于表单提交
- get一般用于简单的数据查询，严格要求不是那么高的场景

### 业界常用的优化 WEB页面加载速度的方法
1. 图片懒加载技术
2. 使用字体图标
3. 将小图标合成精灵图
4. 使用Ajax异步请求资源
5. 减少HTTP请求
6. 压缩CSS、JS
7. 去掉不必要的插件
8. 减少DNS查询
9. 最小化重定向
10. 使用内容分发网络
11. 将CSS文件放在页面顶部，JS文件放在底部
12. 利用浏览器的缓存
13. 其用GZIP压缩

### HTTP状态信息200 302 304 403 404 500分别表示什么
- 200：请求已成功，请求所希望的响应头或数据体将随此响应返回
- 302：请求的资源临时从不同的URL响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。
- 304：如果客户端发送了一个带条件的GET请求且改请求已被允许，而文档的内容(自上次访问以来或者根据请求的条件)并没有改变，则服务器清档返回这个状态码
- 403：服务器已经理解请求，但是拒绝执行它
- 404：请求失败，请求所希望得到的资源未被在服务器上发现
- 500：服务器遇到一些未曾预料的状况，导致了它无法完成对请求的处理。

### 如何判断一个js变量是数组类型
1. ES5:Array.isArray([])
2. 直接调用push方法，如果是报错则说明不是一个数组
3. [] instanceof Array
4. Object.prototype.toString.call([])

### 请列举js数组类型中的常用方法
1. concat()：连接多个数组，并返回结果
2. join()：把数组的所有元素放入一个字符串，元素通过指定分隔符进行分割
3. pop()：删除并返回数组的最后一个元素
4. push()：向数组末尾添加一个或多个元素，返回新的长度
5. reverse()：颠倒数组中的元素
6. shift()：删除并返回数组的第一个元素
7. slice()：从某个已有的数组返回选定的元素
8. sort()：对数组进行排序
9. splice()：增删改
10. toSource()：返回该代码的源代码，并返回结果
11. toLocaleString()：把数组转化为本地数组，并返回结果
12. unshift()：从数组前面添加元素，返回新的长度
13. valueOf()：返回数组对象的原始值

### 列举常用的js框架以及分别适用的领域
- jQuery：简化了js的一些操作，并且提供了一些非常好的API
- jquery ui、jquery-easyui：在jQuery的基础上提供了一些常用的组件，日期、下拉框、表格
- require.js、sea.js：模块化开发使用
- zepto：精简版的 jquery，常用于手机 web 前端开发  提供了一些手机页面实用功能,touch
- ext.js：跟 jquery 差不多，但是不开源，也没有 jquery 轻量
- angular、knockoutjs、avalon(去哪儿前端总监)：MV*框架，适合用于单页应用开发(SPA)

### JS实现面向对象编程
1. 创建对象
- 工厂模式
- 构造函数模式
- 原型模式
- 组合使用构造函数模式和原型模式
- 动态原型模式
- 寄生构造函数模式
- 稳妥构造函数模式
2. 实现继承
- 原型链
- 借用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

### link和@import的区别
1. link属于XHTML的标签，而@import是CSS提供的
2. 页面被加载时，link会被同时加载，而后者引用的CSS会等到页面加载完再加载
3. import只有在IE5以上才能识别，link无兼容问题
4. link方式的样式的权重高于@import的权重

### jQuery框架中$.ajax()的常用参数有哪些？
- type
    + 类型：String
    + 默认值：GET
    + 请求方式POST、GET、PUT、DELETE
- url
    + 类型：String
    + 默认值：当前页地址。
    + 发送请求的地址
- success
    + 类型：Function
    + 参数：由服务器返回，并根据dataType参数进行处理后的数据，描述状态的字符串
    + 请求成功后的回调函数，这是一个Ajax事件
- options
    + 类型：Object
    + 可选：AJAX请求设置
- async
    + 类型：Boolean
    + 默认值：true。默认设置下，所有请求均为异步请求。
    + 同步请求将锁住浏览器，用户其他操作必须等待请求完成才可以执行
- beforeSend(XHR)
    + 类型：Function
    + 发送请求前可修改XMLHttpRequest对象的函数
    + XMLHttpRequest对象是唯一的参数
    + 这是一个Ajax事件。如果返回false可以取消本次ajax请求
- cache
    + 类型：Boolean
    + 默认值："application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。
    + 默认值适合大多数情况。如果你明确地传递了一个content-type给$.ajax()  那么它必定会发送给服务器（即使没有数据要发送）
- data
    + 类型：String
    + 发送到服务器的数据。将自动转换为请求字符串格式。
    + GET请求中将附加在URL后。
    + 必须为Key/Value格式。如果为数组，jQuery将自动为不同值对应同一个名称。
    + 如{foo:["bar1", "bar2"]}转换为'&foo=bar1&foo=bar2'。
- dataFilter
    + 类型：Function
    + 给Ajax返回的原始数据的进行预处理的函数。
    + 提供data和type两个参数
    + data是Ajax返回的原始数据
    + type是调用jQuery.ajax时提供的dataType参数
    + 函数返回的值将由jQuery进一步处理。
- dataType
    + 类型：String
    + 预期服务器返回的数据类型。
- error
    + 类型：Function
    + 默认值：自动判断(xml或html)。请求失败时调用此函数。

### 列举浏览器对象模型 BOM 里常用的至少 4 个对象，并列举 window 对象的常用方法至少 5 个 
- 对象：window、document、location、screen、history、navigator
- 方法：alert()、confirm()、prompt()、open()、close()、setInterval()、setTimeout()、clearInterval()、clearTimeout()

### JavaScript中callee和caller的作用？
- caller是返回一个对函数的引用，改函数调用了当前函数
- callee是返回正在被执行的函数，也就是所指定的function对象的正文

### 解释什么是sql注入，xss漏洞
### FF与IE中如何阻止事件冒泡，如何获取事件对象，以及如何触发事件元素