### npm下载工具可以走国内淘宝的镜像，不会被墙
npm install angular --registry=https://registry.npm.taobao.org
也可以配置一个文件，让默认放入registry的路径是淘宝镜像

### 其他
- webpack
- www.awesomes.cn

### MVC
- 一般在处理需要刷新页面数据的站点时，可以考虑将数据与界面分离，然后界面单独处理代码将数据呈现到浏览器中，数据被独立出来以后，可以将所有的业务逻辑放在对数据的处理上(不考虑界面)，然后对数据直接进行操作，处理完数据以后，利用界面的处理代码将数据重新渲染到页面。
- 在分工的过程中有一种分工的方式，将数据独立出来，然后将界面也单独处理，然后组成一段逻辑协调控制数据与显示，这种分工的方式就是MVC
* M表示model即模型，就是数据
* V表示view即视图，就是界面逻辑，表示如何呈现
* C表示Controller即控制器，就是处理数据的逻辑，和管理数据与视图交互的地方
1. 所谓思想可以理解为代码逻辑上的组织方式，在逻辑功能上分工
2. 所谓的模式，实际上是代码的实际编写方式，一般没有模式，这么开发方便，用的人多了就有了模式。

### 生成表格案例
1. 传统使用数据生成表格
2. 封装
3. 通用处理办法

### 什么是网络应用(WebApp)
就是一个程序，这个程序可以将一些人们看不懂的数据，以一个正常人可以看懂的形式给你展示出来
在网络中数据呈现

### angular
1. 如何使用angular
2. 模块、控制器、服务
3. 指令、过滤器
4. 作用域、http

### 单页面应用程序
使用angular就是在做单页面应用程序(SPA)

### 单页面应用的特点
1. angular就是专门用于制作单页面应用程序
2. 提供一整套MVC的框架来处理
3. 在angular中几乎不再使用(不推荐使用)DOM操作

### 如何学习一些新的技术
* 要求就是快速上手
* 不能再死磕基本概念基本内容，需要"囫囵吞枣"精神
    - 5W：how what where when why
    - 官网，中文社区，博客(大牛写的入门)  angular  .cn

### md生成网页页面
1. npm install -g i5ting_toc
2. i5ting_toc -f xxx.md -o

### angular使用
1. 将下载好的angular下的angular.js复制到需要使用的目录
2. 在HTML页面引入angular.js
3. 凡是需要使用使用angular处理页面的地方，就是用ng-app属性即可
4. 在有ng_app标签中(自带元素，后代元素)所有的元素都会被angular处理
5. angular是一个MVC的框架，所以需要提供View和Model以及Controller
6. model使用ng-model属性进行绑定，在一个标签中使用了ng-model，那么这个值就是model中存储的数据
7. ng-model='名字'，表示在其他地方如果要使用这个model中的数据，那么就使用这个名字来引用
8. 在页面中使用插值语法{{model的名字}}，类似于PHP中的<% model的名字 %>
9. 在创建表格中，需要让data作为数据，即model，不能在使用默认的控制器
10. 需要手动将model放到界面View中
11. 创建控制器的语法
    - 给页面中的ng-app去一个名字，例如'mainApp'
    - 使用语法angular.module('mainApp',[])来创建一个模块
    - 利用模块的controller方法创建控制器，即定义一个有名字的方法
    - 在这个方法中有一个参数，叫做$scope(必须这么写)，这个$scope就是模块中的数据
    - scope是作用域的意思，它表示控制器管理的界面上的所有数据的载体
    - 也就是说在控制器管理的标签中，凡是在ng-model写的数据，就是$scope的一个属性

### 库和框架
1. 所谓的库就是一堆函数或方法或常量的集合，使用这些方法等可以方便我们的开发，提升开发效率，但是主要的还是利用我们的逻辑使用这些工具
2. 框架是一个编程方案，或是说代码的片段，我们开发的时候需要按照它的规则来使用

### angular的一般操作步骤
1. 导入angular的js文件(script,CDN,npm)
2. 在需要被angular处理的html标签中写上`ng-app`，一般都会给他附一个值
3. 在页面中如果需要有数据显示或更新，那么就需要给这些数据的公共父节点添加控制器`ng-controller`
4. 在JS代码中需要创建模块(特定语法)`angular.module('ngApp的值',[])`
5. 利用模块对象来创建控制器`.controller('控制器名',function($scope){})`
6. 在需要处理数据的地方，直接操作$scope的属性即可

### 注册
1. 导入angular的js文件
2. 设置angular的入口`ng-app`以及控制器`ng-controller`
```
<body ng-app='mainApp' ng-controller='mainController'>
```
3. 要处理表单标签，所以表单标签就是模型`ng-model="name"`
4. 使用angular的控制区域
```
angular.module('mainApp',[]).controller('mainController',function($scope){...});
```
5. 给按钮注册点击事件`ng-click="register()"`
6. 用一个span标签显示我们的提示信息`<span>{{text}}</span>`
7. 书写我们给按钮注册的点击事件
8. 控制器中有一个$scope对象能够取得控制器区域的所有的数据，都是它的属性
9. 先将提示信息清空，要在点击事件之外
10. 只要有一个数据没有输入有效信息就有适当的提示
```
if(name===undefined||name.trim().length===0||
  pwd===undefined||pwd.trim().length===0||
  pwd2===undefined||pwd2.trim().length===0){
  $scope.text='请输入完整信息';
  return;
}
```
11. 判断两次的密码是否一致
```
if(pwd!=pwd2){
  $scope.text='两次密码不一致';
  return;
}
```
12. 下次输入的时候直接在原来的基础上修改，触发点击事件的时候要将原来的数据清空`$scope.text='';`
13. 需要将数据存储到本地
14. 保存当前输入对象数据的构造函数
```
function PersonInfo(name,pwd){
  this.name=name;
  this.pwd=pwd;
}
```
15. 添加原型存储方法
```
PersonInfo.prototype.saveToLocalStorage=function(){...};
```
16. 先将原来的数据取出来
```
var storage=window.localStorage.getItem('PersonInfo');
```
17. 取出来的数据是字符串，需要对其转换为数组对象才能使用数组的方法
```
storage?JSON.parse(storage):[];
```
18. 将当前的数据存储进数组对象中
```
storage.push(this);
```
19. 改变localStorage里面的数据，并且要将字符串装换成字符串
```
window.localStorage.setItem('PersonInfo',JSON.stringify(storage));
``` 
20. 将数据写入本地缓存中
```
var data=new PersonInfo(name,pwd);
data.saveToLocalStorage();
```
21. 将数据重置
```
$scope.name = $scope.pwd = $scope.pwd2 = '';
```
22. 匹配用户名是否已经存在
```
PersonInfo.selectByName=function(){
  var storage=window.localStorage.getItem('PersonInfo');
  storage=storage?JSON.parse(storage):[];
  return storage.some(function(obj){
    return obj.name===name;
  });
};
```
23. 判断用户名是否存在
```
if(PersonInfo.selectByName(name)){
  $scope.text='该用户名已经存在了';
  return;
}
```

### 手动添加ng-app
```
angular.module('mainApp.AModel',[]);
angular.module('mainApp.BModel',[]);
var dv1=document.getElementById('zy11');
var dv2=document.getElementById('zy33');
angular.bootstrap(dv1,['mainApp.AModel']);
angular.bootstrap(dv2,['mainApp.BModel']);
```

### 组织模块的方式
1. 按照业务功能分组(推荐)
2. 按照逻辑分类的方式

### 查找模块
```
m2 = angular.module( 'mainApp' );
```
直接这样定义是不行的，由于没有定义mainApp模块所以会报错
```
var m1, m2;
(function () { 
  m1 = angular.module( 'mainApp', [] ); 
})();
(function () {
  m2 = angular.module( 'mainApp' ); 
})();
```
可能涉及到在不同的地方需要查找模块，但是由于不能使用全局变量，所以使用该方法对模块进行查找，对于初学者少使用，但是在做组件开发的时候或多模块协作的时候

### 将字符串转换成对象
1. eval(str)
2. new Function('return '+ str)()
3. JSON.parse(str)

### 将对象装换成一个字符串
JSON.stringify()

### localStorage
1. 就是一个键值对，它可以存储很多数据(只能在浏览器中存储对应的数据，而且数据一般不共享)
2. 就是在浏览器的内部有一个可以存储数据的地方，而这个地方的数据只能在当前页面下被使用
3. 就好像在全局范围内有一个storage对象，这个对象存储键值对，并且值都是字符串

### JSON个格式
- JSON.parse()将json格式的字符串，转换成对象
- eval()不安全，不推荐使用
- (new Function('return '+字符串))()
-  JSON.stringifly()将一个对象转换成一个JSON字符串格式

### JSON与JS对象的区别
1. JSON是一种数据格式协议，而JS对象是对象的字面量
2. 协议：...
3. 字面量：...
4. 汇总
5. JSON格式已经是网络传输中使用的核心数据格式
-对象的形式:'{"key":value,"key":value}'
- 数组形式：'[jsonobj,jsonobj]'

### 模块
所谓的模块(在业内，模块、组件等概念还很模糊)，在代码中按照特定的方式对代码进行分割(解耦)。
分解后代码按照功能零件的形式存在，如果按照某种逻辑将其组合在一起，这个时候这个整体可以称之为一个模块。

### 在angular中如何定义模块
```
angular.module('模块名',[])
```

### 早期angular的控制器的写法
```
function mainController ( $scope ) {
  $scope.txt = '我是早期的版本';
}
```
应该尽量避免全局定义，所以后来就不使用这种方式

### 依赖注入
1. 注入
    1. 在模块中第二个参数将一些模块注入到主模块中
    2. 主模块没有这个功能，但是注入以后就有了这个功能
2. 依赖
    1. 所谓的依赖就是要完成某些事情，必须使用某个对象
    2. 此时就称为改对象那个的依赖
3. 依赖注入
    1. 需要完成某件事情，但是自己没有这个能力
    2. 但是有一个对象可以实现该功能，那么该对象注入(传)进来，为我所用
4. 在angular中按照流程创建模块，创建控制器
5. 在内部会创建一个$scope对象，类似这种对象都有一个特征就是使用$开头，是angular内部自动创建的，而且命名是规定好的
6. 凡是创建控制器就会创建一个$scope对象
7. angular会将该对象自动的注入到需要的地方
8. 需要注入的时候只需要给函数的定义参数写成这种对象的名字即可

### 依赖注入的内部构造
1. 当我们写入一个控制器的时候,函数部分的参数是$scope
```
angular.module('mianApp',[])
       .controller('mainController',function($scope){...});
```
2. angular会按照流程创建模块，再创建控制器
3. 在内部会创建一个$scope对象
4. 类似这种$开头的对象，是angular内部自动创建的
5. 命名是规定好的，不能更改
6. 创建完$scope对象后，系统会自动对function部分进行转换
```
[ '$scope', '$window', function ( $scope, $window ) { ... } ]
```
7. 由于是系统自带的，我们进行压缩的时候，会将函数的形参转变，但是如果名字改了后就不能使用angular的方法
8. 我们创建控制器的时候应该使用注入式
```
.controller( 'mainController', [ '$scope', '$window' , function ( s, $window ) {...}] );
```
9. 由于是我们手动创建的，function里面的形参可以更改，但是要注意，用法要与数组的前面字符串匹配

### 依赖注入的小结
1. 如果需要控制器，那么写成函数的形式
- 参数的顺序可以随意调整
- 需要注入的对象，只要记住名字放进去即可
- 一旦代码压缩，所有的控制器就不能使用
- 原理：虽然写的是函数，但是系统内部会将其进行装换成注入的形式
2. 如果控制器写成注入的形式
- 语法：['$服务','$服务','$服务'...,function(...){}]
- 函数的参数可以随意的命名，只要保证参数的顺序与注入服务顺序一致即可
- 无论代码如何压缩都没有关系
3. 依赖注入
- 原本没有这个功能
- 有一个对象(服务)可以实现
- 将对象注入进来
    + 对象什么时候谁创建我不管（有的还是要管）
    + 对象如何使用(文档)如何注入有统一的规范
- 我就有了这个功能了，就能直接使用这个对象的所有行为

### 函数的注入形式
1. 函数本体
```
function foo($scope, $window){
  $scope.num = 10;
  $window.alert( 123 );
}
```
2. 定义一个函数处理上面的函数或是匿名函数
3. 先将上面的函数转换字符串`toString()`
4. 定义一正则表达式将要处理的函数的参数匹配出来
```
var r = /function.+?\((.+?)\)/;
```
5. 将参数用","分割存入数组
```
var args = r.exec( fnbody )[ 1 ].split( ',' );
```
6. 取出的参数是没有""的，我们需要手动添加，并去除空格
```
args.forEach(function ( v, i ) {
  // v 就是数组中存储的参数 字符串, 不是字符串形式
  data.push( '"' + v.trim() + '"' );
});
```
7. 要形成注入形式，需要重新定义一个空数组来存储字符串数组以及函数
```
var data=[];
```
8. 将函数体也加入到data中
```
data.push( fnbody );
```
9. 将数组转转成字符串的形式返回，因为我们是要将转换出来的东西作为形参使用
10. 因此要将数组对象作为字符串返回
```
return '[ ' +  data.join( ', ' ) + ' ]';
```

### 控制器构造函数的写法(少用)
```
function Controller( )  {
  this.model = '初始化数据';
}
angular.module( 'mainApp', [] )
  .controller( 'mainController', Controller );
```

### 扩展node的一些工具
1. http-server开启服务器
- `npm -g install http-server`
- `hs -o`
2. browser-sync
- `npm -g install browser-sync`
- `browser-sync start --server --file "**/*.css,**/*.html"`
- 具体的用法要在文档中查找
- 新建一个.bat文件，再桌面创建一个快捷方式，直接双击就可以自动在命令行中运行

### 花生壳

### 作为model的$scope
1. $scope充当了MVC中的Data-Maodel角色
2. $scope是一个POJO(Plain Old JavaScript Object)
3. $scope提供了一些工具类的方法$watch()/$apply()
4. $scope是表达式的执行环境(或者叫做作用域)
5. $scope是一个树型结构，与DOM标签平行
6. 子$scope对象会继承父$scope上的属性
7. 每一个angular应用只有一个根$scope对象(一般位于ng-app上)
8. $scope可以传播事件，类似DOM事件，可以向上也可以向下