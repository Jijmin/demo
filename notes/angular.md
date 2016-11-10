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

1. 在实际开发中要尽可能的封装代码结构
2. localStorage
- 存到localStorage中的是字符串键值对，取出来也是字符串键值对
3. 什么是模块
4. 多模块协作
5. 描述依赖注入
6. 控制器的多种写法
- 将所有的Controller写在一个module中
- 一个module一个Controller
- 混合式的
7. 搭建ng文档网站

### $scope
1. 什么时候创建
- ng在使用的时候，页面只要存在ng-app，就会创建一个scope，名字就是$rootScope
- scope就好比是这个HTML标签后面的对象，支持他的对象。
- 在标签中凡是创建一个控制器，那么就会自动的创建一个scope，叫做$sope
- 凡是scope都有个特点，就是它好像就是HTML标签背后的对象，凡是在HTML标签中使用ng-model，或ng-click等操作时，就是在scope上添加属性或方法。
2. 它们之间的关系
- 子节点上的scope原型继承于当前节点上的scope

### config
.config配置，意思是子啊程序运行之前需要自行的事情(路由)

### run
.run运行，在程序运行的时候进行执行

### 将ng称为MVC框架
- M,V,C一般是使用控制器去操作数据，显示视图是数据与视图的桥梁(调度者)
- 在ng中使用数据程度大大超过控制器，因此有一大部分人认为ng不是一个纯粹的MVC框架
- 而在ng中基于视图的数据被大大的放大了
    + 数据源(model)与视图的数据还不是一一对应的关系
    + 一般为了数据的安全与用户体验，会考虑将数据进行包装
- 真正的数据库中与显示出来的数据不一致
    + 控制器负责装换(传统)
    + 抽象一个ViewModel的对象(微软WPF)
        * 该对象的数据来源于原始的数据(数据库中的数据)
        * 但是它负责转化
        * 它还负责双向绑定(改界面的数据，ViewModel就跟着改，反之也一样)
        * 控制器只要作为一个桥梁就行，此时的控制器好像没有非常主要的作用，弱化C，强化VM的功能
    + 在ng中$scope就是ViewModel，因此有部分认为ng是MVM的框架

### 秒表
angular中setInterval是异步的，不能更新视图
可以采用$scope.$apply()强制异步刷新

### 表达式
JS：使用运算符与数据组织起来的有结果的代码就是表达式，注意不带有分号。
ng：基本上是基于传统的表达式的概念。首先在ng中的表达式数据不声明不会报错。
    ng中所有的ng-xxx的赋值，或{{}}里面的值都是ng表达式

### 面试题
```
var o={
    name:'o',
    func:function(){
        console.log(this.name);
    }
};
var oo={
    name:'oo'
};
(oo.foo=o.func)();//undefined
//o.func将值取出来赋值给oo.foo，在JS中对象的值是地址，就是将函数func的地址赋值给foo
//然后用地址调用，找不到，所以输出undefined
```

### 过滤器 filter
将一个事物以另一种形式展现出来

### $watch
- $scope有一个方法叫做$watch
- 这个方法有两个参数
- 第一个参数表示要监听哪一个变量
- 第二个参数是一个函数，用于监听变量值的变化，凡是变量的值发生变化，这个函数就会被调用

### 指令 directive
字面意义：按照某些指令去做某些事情，所谓的指令其实就是一个命令
- ng-app
- ng-controller
- ng-model
- ng-click
指令就是一个命令，让ng去按照我们的规则做一些事情
- ng-bind
- ng-bind-html
    + 注入漏洞攻击
        * <input type="text" value="+???+">
        * 如果用户输入的是 " onload="alert(123)
        * <input type="text" name="" onload="alert(123)">
    + XSS
        * 黑客没有办法登录你的系统，但是它可以作为游客留言给管理员
        * 如果黑客写一个恶意的文本，如果管理员不打开它没有问题
        * 但是一打开这个文本就会触发里面的js代码，就可能被黑掉
- ng-repeat
    + ng-repeat='item in date'
    + ng-repeat='(key,value) in data'
- ng-class
    + 取值是一个对象
    + 就是class属性，但是这个class属性会比原生的class要强大
    + ng-class='{类名1:值1,类名2:值2,...}'
    + ng-class='类名1:isRight,类名2:!isRight'
    + ng-class='类名1:value=='123',类名2:value!='123'
- ng-cloak
    + 凡是ng里面的代码都有可能会闪一下，加一个ng-cloak，
    + ng
    + 会给每一个元素加一个属性display:none
- ng-hide
- ng-show

### 页面闪的原因
1. 闪一下的原因就是ng处理需要时间
2. ng在处理之前，代码时写成了标签中的文本
3. 这个文本会被浏览器直接显示出来
4. 一旦ng加载完成后，那么就会处理页面中的元素，因此就看不到了
5. 可以使用ng-bind去代替插值语法

### 异步与同步
1. 同步执行：
- 简单的来说，不在一个我们谅解或定义的代码顺序中执行
- js代码，从上往下执行，而且如果上面不执行完，下面就不会开始(代码是线性执行的)
2. 异步：
- 愿意是将两段代码一起执行，不在一条线上，但是在JS中是单线程
- 一次只能处理一个内容，浏览器开始设计的时候就只允许执行一个东西
- 设计浏览器的时候设计了setInterbal和setTimeout，方这两个方法造成一个假象，然我们觉得是一起执行的。
- 函数的执行时间很短(函数代码一般都不长，所以很快就可以执行完)
- 由浏览器内部按照规定的时间(估计值)
- 在时间内执行以下函数(在函数中切换)
3. interval.timeout
- 在JS中所有的时间或方法或函数本质都是一样的
- 凡是不在当前线性执行的代码中执行的函数(interval.timeout)
- 实际上都会被放到一二称为事件队列的东西里面(队列、往后方法)
- setInterval或setTime中代码不在当前代码结构中执行

### ng-repeat
- 将一个集合(数组，键值对)进行遍历(for遍历，for-in遍历)
- 一般改指令放在特定的标签中，凡是使用该指令的标签会被重复的创建，并填充指令的数据
- 一般使用的tr,li,div
- ng-repeat='项 in 数组'
- ng-repeat='(键，值) in 对象'

### 内置指令
1. ng-switch
```
<ele ng-switch [on="表达式"]>
    <ele eg-switch-when="1">111</ele>
    <ele eg-switch-when="2">111</ele>
    <ele eg-switch-defualt>111</ele>
</ele>
```
2. ng-src
img的src地址是插值语句时，使用ng-src可是让浏览器先不解析插值语句
3. ng-href

### 其他指令
1. ng-checked
2. ng-disabled
3. ng-readonly
4. ng-selected

### 常见事件指令
1. ng-blur
2. ng-change
3. ng-copy
4. ng-dbclick
5. ng-focus
6. ng-submit

### 第三方指令
angular-ui.github.io

### 什么是指令
- 指令简单的理解就是给html标签添加一些属性(属性使用ng开头)，增加了这些属性以后
- ng加载完成时会对含有ng-属性的标签进行再处理，方法有：增，删，改

### 自定义指令
1. ng中所有的功能都应该挂在模块上
```
angular.module('mainApp.myDirective',[])
       .directive('zyApp',function(){//驼峰命名
            //返回一个对象，这个对象决定了如何处理该属性所在的标签
            return{
                //固定语法
                template:'<div>指令</div>'
            }
        })
```
2. 将自定义的指令注入到模块中
```
angular.module('mainApp',['mainApp.myDirective']);
```

### 指令对象属性
1. transclude
- 我们定义的指令只能按照我们的自己的template的形式输出
- 在定义指令的时候使用transclude并设置其值为true
- 转置->装换
- 需要获得数据的标签中需要使用ng-transclude指令
```
transclude:true,
template:'<span ng-transclude></span>'
```
- 需要在哪个标签上写东西就在哪个添加ng-transclude
2. replace
- 替换
- 例如需要在页面中增加一个轮播图
- 提前将轮播图写成指令
- 然后定义一个指令名zy-scoll
- 我们只想要将轮播图放入，外面的框不加进去
- replace的取值为true或false
- 表示是否使用模板的HTML替换含有指令的标签
3. templateUrl
- 在复杂的指令中，需要处理的页面很复杂代码很多，就可以将这个html放在一个独立的文件中
- 然后在templateURL中使用它的地址，那么页面打开后，会利用xhr将其加载进来
- 缺点：需要服务器
4. scope
- 指令的独立作用域
- 它的功能就是表示这个指令是独立的，不与父节点的$scope混淆
- 如果希望指令可以利用属性传参数给模板
    + 在指令中使用的属性名，必须定义在scope中
    + 并且scope中指令的属性名的取值是@
    + 在模板中即可使用该名字作为插值
5. restrict
- 凡是页面中需要轮播图的就是用语法
- <zy-scoll><zy-scoll>
- restrict表示采用什么方式去表示指令，或是使用指令
- 它的取值是一个字符串 'E'(直接当标签使用),'A'(当做属性使用),'C'(当做类来使用),'M'(当做注释使用)
6. template
- 直接写html代码

### link方法
在ng中一般不推荐使用DOM操作，但是如果非要实现DOm操作，在指令中可以添加link方法
```
return {
    link:function(){
        //DOM操作
    }
}
========
return function(){
    //DOM操作
}
```

### jqlite
- 在ng中如果非要使用DOM操作，ng给我们提供了一个轻量级的jQuery，叫做jqlite
- 使用angular.element()方法代表jq中的$()
- 但是在 ng 中不支持 选择器, 需要单独将 dom 当进来

### typeof
typeof可以鉴别当前作用域中是否含有某一个变量

[ionic](www.ionic.wang)

### 配置与运行
1. 在ng中模块还有两个常用的方法
2. .config()
- 配置，凡是在运行之前需要处理的数据都应该写在这里
- 这是ng中唯一一个运行前可配置数据的地方
- 它的参数是一个可注入的函数
- $routeProvider对象的创建者
3. run()
- 运行时进行调用，凡是在运行时处理的数据都可以写在这里
- 这里可以认为是运行代码的入口
- 相当于ng-init
- 可以对某些数据初始化时使用
- 需要的参数是一个可注入的函数

### 服务service
- 凡是注入的名字都是服务

### 创建服务
1. 注意服务就是一个对象(广义，一个数字也称为对象)，一个可以内注入进来的对象
2. 使用语法
```
模块.factory('服务的名字',['$zz',function($zz){
    return 对象
}])
```
3. 使用的时候注入即可
```
angular.module('loginData',[]).factory('zygzw',function(){
    return {
      name:'zy',
      pwd:'1133'
    };
  });
  angular.module('mainApp',['loginData']).run(['$rootScope','zygzw',function($rootScope,zygzw){
      $rootScope.message='消息';
      console.log(zygzw);
  }]);
```
3. 其他方法创建服务
- service('服务名',构造函数)
- constant('服务名',常量)唯一一个可以在config之前可以被注入的
- value('服务名',常量)不能在config之前注入
- provider('服务名',{必须带有$get方法的对象})

### 常见的服务
1. $http
- 主流的用法
    + $http({配置信息}).then(success,error)
- 常用用法promise(对象)
    + $http.get(url).then()
    + $http.jsonp('支持jsonp的网站地址?callback=JSON_CALLBACK')
2. $log
- $log.log();
- $log.warn();
- $log.error();
- $log.debug();
3. $location
- $location.url('/1.html');//跳转到指定页面，不传参数就是获取当前页面的路径
- $location.absUrl();//打印绝对路径，传入参数没有进行跳转
- $location.search();//获取url后面的参数
- $location.hash();
4. $window
5. $timeout
6. $interval
- 不需要使用apply()显示
- 但是不能停止
- 可以先打印出来$interval
- 用一个$window的属性接收

### 路由route
- 首先路由是ng实现单页面应用程序的核心内容
- 获得url并解析它的锚
- 什么时候解析？
    + window.location.href
- 怎么解析？
    + indexOf('#')再使用slice()
    + 正则
    + 利用a标签
- 如果进来的时候有a,b,c分别显示你好，吃了吗，开心吗，其他显示连接错误
    ``` 
    window.onhashchange=function(){
         var a=document.creatElement('a');
         a.href=window.location.href;
         var hash=a.hash.slice(1);
         var dv=document.querySelectorAll(.dv)[0];
         switch(hash){
            case 'a':dv.innerHTML='你好';break;
            case 'b':dv.innerHTML='你吃了吗';break;
            case 'c':dv.innerHTML='你开心吗';break;
            default:dv.innerHTML='链接错误';break;
         }
    }
    ```
- 路由可以修改地址

### 定义路由
1. 引入ngRoute模块
2. 在页面中准备一个容器<ng-view>
3. angular.module('...',['ngRoute'])
4. 在config方法中配置路由数据
- 利用注入语法注入$routeProvider对象
- $routeProvider有两个方法when(),otherwise()
- 这个方法的参数有两个
    + 路由hash(不带#)
    + 第二个参数是一个对象，其中包含template或templateUrl属性
    ```
    angular.module('mainApp',[]).config(function($routeProvider){
        $routeProvider.when('/',{
            template:'<div>111</div>'
        }).when('/',{
            template:'<div>111</div>'
        }).otherwise({
            redirectTo:'/'
        })
    })
    ```
5.  触发路由的行为需要使用a标签`<a href="#/">信息</a>`

### Vue.js
1. vuejs.org
2. vuejs cn
3. 看示例
4. 看指南
5. 看介绍，会将核心内容展示出来
6. 再看看左侧菜单栏
7. 看好一个例子，用自己的语言理解
8. 开始上手写例子，不要在看文档
9. 一定要动手操作
10. 出来错没有关系，先看看错误
11. 可以自己类比添加一些东西
12. 如果出现错误，带着问题去继续看文档
13. 如果有点熟悉了，想要了解更多可以看看API
14. 每次试新的例子的时候一定要重新再建一个页面，重新开始写
15. vue不允许直接给body加东西
16. 要类比学过的东西
17. 文档中有click方法，这时可以自己尝试做一个鼠标移入移除事件的案例
18. 函数中我们应该先看看this对象
19. 然后也要看看arguments
20. 找到我们需要的DOM对象
21. 函数中有一个v-model，直接自己尝试些自己想要的例子
22. 最后看API查漏补缺
23. 将基础看完就看示例
24. 如果不能做就看看进阶部分的知识点

### jkstorage.js
1. 我们可以使用本地的localstorage存取数据
2. 全局范围内有一个dbs对象
3. 默认含有一个mater数据库(内存)
4. 增删改查
5. 增加dbs.insert({...})//存到master中
6. 查询
- dbs.findAll()->[]
- dbs.find({...})->[]
- dbs.findOne({...})->Object
7. 删除dbs.remove({...})
8. 修改dbs.updata({.查询的.},{.修改的.})
9. 创建数据库，创建表
10. 创建数据库dbs.use(数据库名)
11. 创建表dbc.createCollection(表名)
12. 使用表dbs.useCollection(表名)
