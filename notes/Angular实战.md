# Angular实战
## 快速上手
### 感受AngularJS的4大核心特性
1. MVC
- model：数据模型层
- view：视图层，负责展示
- controller：业务逻辑和控制逻辑
- 好处：职责清晰，代码模块化
- 为什么23中设计模式里面没有MVC
    + MVC是观察者模式(Observer), 策略模式(Strategy)和组合模式(Composite)三个设计模式的演变
2. 模块化
```
angular.module('mainApp',[])
//创建一个模块，angular是链式编程的，后面的[]是依赖关系，
//这里没有就不需要传入参数，但是必须填写[]，不然就是查找mainApp模块
       .controller('mainController',['$scope',function mainController($scope){
       //控制器，后面的[]是依赖注入到提现
            $scope.greeting={
                text:'Hello'
            };
        }]);
```
一切都是从模块开始的，其他的东西都是挂在module下的
3. 指令系统
我们在页面中嵌入一个不是HTML的标签，浏览器是会忽略的，我们可以通过directive来让浏览器去识别
```
angular.module('mainApp',[])
       .directive('hello',function(){//创建一个指令
            return {
                restrict:'E',
                template:'<div>Hi everyone!</div>',//页面下了hello标签被替换成了模板的内容
                replace:true
            }
    };
```
ng-app也是一个指令，程序从这里开始，类似于main的入口函数，所以一个单页angular中只有一个ng-app
4. 双向数据绑定
- jQueryUI、BackBone、Flex都是单向数据绑定的
- 单向数据绑定原理
    + 将模板写好，加上我们的数据
    + 通过数据绑定机制生成一个HTML标签
    + 再将HTML标签插入到文档流中
- 双向数据绑定的原理
    + 视图和数据是对应的
    + 当视图上面的内容发生变化的时候 
    + 数据模型也会发生变化
    + 当数据模型发生变化的时候，视图自己更新

### 自己动手搭建开发、调试、测试环境
1. 代码编辑工具sublime/webstorm等
2. 断点调试工具Angular Batarang
3. 版本管理工具git
4. 代码合并和混淆工具grunt
- 在node的官网下载node
- 安装完成后，将node的bin目录配置到你的系统环境中
- 在cmd中运行`node -v`出现版本号就是安装好了
- 安装完node后里面自动带有一个包管理工具npm
- npm的服务器在国外，通过走淘宝的镜像可以直接下载npm上的插件
```
npm install angular --registry=https://registry.npm.taobao.org
```
- 安装代码混淆工具grunt
最好使用安装好的git bash来执行下面命令
会在你打开git bash下安装一个grunt，也可以加上-g安装成全局的grunt
```
cnpm install grunt
```
    + JS文件合并
    + JS代码自动压缩
    + 每次Ctrl+S的时候自动执行以上动作
    + 还可以每次Ctrl+S自动运行单元测试、集成测试
    + [grunt API](http://www.gruntjs.net/)
    + 我们需要通过安装其他插件才能实现
    + `grunt-contrib-uglify`对代码进行混淆
    + `grunt-contrib-concat`合并文件
    + `grunt-contrib-watch`监控文件变化
5. 依赖管理工具bower
- 自动安装依赖组件
- 组件之间的依赖检测
- 版本兼容性自动检测
轻量级的server->http-server，可以模拟服务器
6. 单元测试工具karma
- 但是还得和Jasmine一起来编写测试用例
- Jasmine四个核心概念：分组、用例、期望、匹配
    + describe(string,function)表示分组，是一组测试用例
    + it(string,function)这个函数就是测试用例
    + expect(expression)表示期望expression这个表达式具有某个值或者某种行为
    + to***(arg)表示匹配
7. 集成测试工具Protractor
8. 以上工具可以根据自己的使用情况进行安装，都是通过npm

## 基本概念和用法
### MVC
1. 为什么需要MVC？
- 代码规模越来越大，切分职责是大势所趋
- 为了复用：很多逻辑是一模一样的
- 为了后期维护方便：修改一块功能不影响其他功能
MVC只是手段，终极目标时模块化和复用
2. 前端MVC的困难
- 操作DOM的代码必须等待整个页面加载完成
- 多个JS文件之间如果出现相互依赖，程序员必须自己解决
- JS的原型继承也给前端编程带来了很多困难
3. MVC---Controller的实现方式1
- 控制器与视图双向交互
- 控制器与数据模型双向交互
- 一个控制器控制多个视图
- 如果视图1和视图2根本就没有逻辑关系，控制器就会很“尴尬”
4. MVC---Controller的实现方式2
- 在上面传统模式下改进
- 一个控制器只和一个视图打交道
- 但是如果控制器里面公共的方法就不好处理
5. MVC---Controller的实现方式3
- 抽出公共部分作为一个Server而不是一个通用的控制器
- 把公共部分抽成一个服务，让控制器去调用
6. Controller使用过程中的注意点
- 不要试图去复用Controller，一个控制器一般只负责一小块视图
- 不要在控制器中操作DOM，这不是控制器的职责，由指令来操作
- 不要在Controller里面做数据格式化，ng有很好用的表单控件
- 不要在Controller里面做数据过滤操作，ng有$filter服务
- 一般来说，Controller是不互相调用的，控制器之间的交互会通过事件来进行
7. 如何复用View
- 利用directive实现view的复用
- 在HTML文件中我们可以创建一个非HTML标签
- 浏览器是会忽略这个标签的
- 但是我们通过angular中的directive可以实现模板替换
8. AngularJS的MVC是借助于$scope实现的
- $scope是作用域，定义了两个控制器，是两个作用域，
- 但是在$rootScope中设置属性，就是一个全局属性
- $scope有事件机制，向上传播和向下传播$scope.$on()
9. $scope
- $scope是一个POJO(Plain Old JavaScript Object)
- $scope提供了一些工具方法$watch()/$apply()
- $scope是表达式的执行环境(作用域)
- $scope是一个树型结构，与DOM标签平行
- 子$scope对象会继承父$scope上的属性和方法
- 每一个Angular应用只有一个根$scope对象(一般位于ng-app上)
- $scope可以传播事件，类似DOM事件，可以向上也可以向下
- 可以用angular.element($0).scope()进行调试 
- 在火狐中调试要装`Inspect Angular Scope`插件，在你需要的地方右键后选择插件就可以进行查看上面的$scope
10. $scope的生命周期
- Creation创建
- Watcher registration注册监控
- Model mutation检测模型变化
- Mutation observation观察模型
- Scope destruction销毁

### 路由、模块、依赖注入
1. AngularJS的模块化实现
```
angular.module('mainnApp',[])
       .controller('mainController',['$scope',function($scope){
            $scope.greeting={
                text:'Hello'
            };
       }]);
```
2. 一个完整项目结构是什么样的？
- BookStore
    + app
        * css
        * framework(框架)
        * imgs
        * js
            - app.js(作为启动点的JS)
            - controllers.js
            - directives.js
            - filters.js
            - services.js
        * tpls(模板，html片段)
            - bookList.html
            - hello.html
        * index.html(应用的主html文件)
    + node_modules(各种基于NodeJS的工具)
        * http-server(一种轻量级的服务器插件)
    + package.json(给npm的配置文件)
3. 使用ngRoute进行视图之间的路由
```
$routeProvider.when('/hello',{
    templateUrl:'tpls/hello.html',
    controller:'HelloCtrl'
}).when('/list',{
    templateUrl:'tpls/bookList.html',
    controller:'BookListCtrl'
}).otherwise({
    redirectTo:'/hello'
});
```
4. 一切都是从模块开始的
5. ng官方推荐的模块切分方式是什么？
- 任何一个ng应用都是由控制器、指令、服务、路由、过滤器等有限的模块类型构成的
- 控制器、指令、服务器、路由、过滤器分别放在一个模块里面(可借助于grunt合并)
- 用一个总的app模块作为入口点，它依赖其他所有的模块

### 双向数据绑定
1. 最简单的例子
```
 <body ng-app>
    <div ng-controller='HelloAngular'>
        <p>{{greeting.text}}</p>
    </div>
 </body>
```
但是网络不好的情况下可能会显示{{greeting.text}}
用下面的方式代替
2. 取值表达式与ng-bind指令
```
<span ng-bind="greeting.text"></span>
```
ng-bind：首页需要用ng-bind绑定
{{}}:首页加载完后使用的可以用{{}}
3. 双向绑定的典型场景--表单
- 写好表单样式
- 创建一个模块
```
ng-app="UserInfoModule"//写在你要控制的DOM标签中
angular.module('UserInfoModule',[])//创建模块
```
- 创建一个控制器
```
ng-controller="UserInfoCtrl"
.controller('UserInfoCtrl',['$scope',function($scope){
   $scope.userInfo={
     email:'1133@qq.com',
     password:'1133',
     autologin:true
   };
}])
```
- 绑定数据
```
ng-model="userInfo.email"
ng-model="userInfo.password"
ng-model="userInfo.autologin"
```
4. 动态切换标签样式
```
<p class="text-{{color}}">测试CSS样式</p>
```
5. ng-show和ng-hide里面运行的是取布尔值
6. ng-class
可以传入一个表达式`ng-class="{error:isError,warning:isWarning}"`之类的
angular帮我们增强了这种对类名的写法
7. ngAnimate

### 指令
1. 匹配模式restrict
- E 元素`<hello></hello>`
- C 注释`<!-- directive:hello -->`(两边一定要加空格)
- M 类`<div class="hello"></div>`
- A 属性`<div hello></div>`
- 推荐使用元素和属性的方式使用指令
- 当需要创建带有自己的模板的指令时，使用元素名称的方式创建指令
- 当需要为已有的HTML标签增加功能时，使用属性的方式创建指令
2. template、templateUrl、$templateCache
- template：最终要显示的HTML标签
- templateUrl：将模板写成一个独立的HTML文件
- $templateCache：要在其他模板中使用这个模板时，使用angular将模板缓存起来
    + 注射器加载完所有的模块时执行一次run方法
    + 用angular内置对象$templateCache的put方法将文件缓存起来
    + 在指令中调用内置对象$templateCache的get方法获取出缓存的模板
    ```
    mainApp.run(function($templateCache){
        $templateCache.put('hello.html','<div>Hello everyone!!!</div>');
    });
    mainApp.directive('hello',function($templateCache){
        return {
          restrict:'ECMA',
          template:$templateCache.get('hello.html'),
          replace:true
        };
    });
    ```
3. replace与transclude
- 如果想在指令标签中嵌套别的元素时
- 将replace设置为true是不可行的
- 在模板里面添加一个div属性ng-transclude
```
transclude:true,
template:'<div>Hi everyone!<div ng-transclude></div></div>'
```
4. compile与link(操作元素、添加CSS样式、绑定事件)
angular执行的三个阶段；
- 加载阶段
    + 加载angular.js，找到ng-app指令，确定应用的边界
- 编译阶段
    + 遍历DOM，找到所有的指令
    + 根据指令代码中的template、replace、transclude转换DOM结构
    + 如果存在compile函数则调用
- 链接阶段
    + 对每一条指令运行link函数
    + link函数一般用来操作DOM、绑定事件监听器
compile与link区别：
- compile函数用来对模板自身进行转换，而link函数负责在模型和视图之间进行动态关联
- 作用域在链接阶段才会被绑定到编译之后的link函数上
- compile函数仅仅在编译阶段运行一次，而对于指令的每一个实例，link函数都会执行一次
- compile可以返回preLink和postLink函数，而link函数只会返回postLink函数
- 如果需要修改DOM结构，应该在postLink中来做这件事情如果在preLink中做这件事情会导致错误
5. 指令与控制器之间的交互
- 指定一个loader属性
- 当我们鼠标滑动在上面时候，angular加载数据
- 监听鼠标的滑动事件
- 用指令中的link属性来完成 
- link函数一共有四个参数，scope，element，attrs，父控制器
- 给元素绑定一个事件，用bind注册
- 在当前作用域调用根节点上的loadData方法
- 也可以借用$apply()，里面直接写要调用的函数字符串
- 如果指令要在另一个控制器中使用
- 我们要给指令标签添加一个属性
- 将如何加载数据的方法传入属性
- 在指令内部通过属性获取方法，但是要注意，方法名是小写
- 通过$apply()调用
- 指令的复用
6. 指令间的交互
- 通过指令内部的controller暴露方法
- link函数出来指令内部的事物
- 指令中通过require将其他指令依赖于一个指令
- link函数就可以指定第四个参数
- 就可以调用到公共指令中暴露出来的方法
7. scope的类型与独立scope
- 当我们用模板创建出4个表单是，操作一个会对其他的也有影响
- 需要在指令中加入scope:{}
- 这样指令之间就互相独立了，互不影响
8. scope的绑定策略
- @把当前属性作为字符串传递。还可以绑定来自外层scope值，在属性值中插入{{}}即可
- =与父scope中的属性进行双向绑定
- &传递一个来自父scope的函数，稍后调用
9. AngularJS内置的指令
- `a`扩展的功能，比如href为空时，angular会创建一些默认的行为
- `form`
    + HTML原生的form表单是不能嵌套的，而Angular封装之后的form可以嵌套
    + Angular为form扩展了自动校验、防止重复提交等功能
    + Angular对input元素的type进行了扩展
        * text、number、url、email、radio、checkbox、hidden、button、submit、reset
    + Angu为表单内置了4种CSS样式
        * ng-valid、ng-invalid、ng-pristine、ng-dirty
    + 内置校验器
        * require、minlength、maxlength
    + required：angular内部自动会校验
    + myForm.$invalid根据表单校验状态，来实现ng-disabled的功能
    + contentEditable可以将div变成可以修改状态
- `input`模拟输入框
- `ngApp`angular的入口函数
- `ngBind`数据模型的双向绑定
- `ng事件名`angular帮我们绑定的各种事件
- `ngInclude`缓存模板
10. 实例解析Expander
- 定义一个控制器
- 添加一个expander指令
- expender-title绑定策略
- 模式可以是元素也可以是标签
- 可以被替换
- 内部内容可以变换
- 用等值绑定绑定上面的expenderTitle这个东西
- 模板中添加的元素有一个点击事件
- 这个方法是由指令的link中使用的，外部不能使用
- ng-show是用来显示或是隐藏的
11. 实例解析Accordion
12. 指令的运行原理：compile和link
13. ERP类型的系统必备的UI组件
14. 互联网/电商型系统必备的UI组件
15. 第三方指令库angular-ui
16. Directive四星的起源和原理概述

### Service
### Provider
### 表单
### 综合实例BookStore 
## 核心原理解析
### Parser
### 双向数据绑定
### 依赖注入
## ng空间开发
### 用AngularJS改写jQuery控件
### angularjs-ui
### 移动空间库ionic 
## TDD和前端自动化测试
### TDD
### 详解Jasmine与Protractor
## grunt搭建项目目录
- dist最终被混淆被压缩的代码
- misc
- node_modules所有配合使用的插件
- src我们项目编写的源代码
- test测试用例
- Gruntfile.js   
- package.json   npm每次启动的时候都会来检查这个文件里面的配置项
