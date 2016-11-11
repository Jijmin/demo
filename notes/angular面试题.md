### ng-if跟ng-show/hide的区别有哪些？
1. ng-if在后面表达式为true的时候才会创建这个dom节点
2. ng-show是初始时就创建了，用display:block和display:none来控制显示和不显示
3. ng-if会(隐式地)产生新作用域，ng-switch、ng-include等会动态创建一块界面也是如此
4. 在ng-if中用基本变量绑定ng-model，并在外层div中把此model绑定给另一个显示区域
5. 内层改变时，外层不会同步改变，因为此时已经是两个变量了
6. ng-show不存在此问题，因为它不自带一级作用域
7. 避免这类问题出现的办法是，始终将页面中元素绑定到对象的属性(data.x)而不是直接绑定到基本变量(x)上

### ng-repeat迭代数组的时候，如果数组中有相同值，会有什么问题，如何解决？
1. 会提示`Duplicates in a repeater are not allowed.`加`track by $index`可以解决。
2. 也可以trace by任何一个普通的值，只要能唯一性标识数组中的每一项即可(建立dom喝数据之间的关联)

### ng-click中写的表达式，能使用JS原生对象上的方法吗？
不止是ng-click中的表达式，只要是在页面中，都不能直接调用原生的JS方法，因为这些并不存在与页面对应的Controller的$sope中。

### {{now|'yyyy-MM-dd'}}这种表达式里面，竖线和后面的参数通过什么方式可以自定义？
1. 这是一个filter，是用来格式化数据的
2. 接受一个输入，按某规则处理，返回处理的结果
3. 在angular中内置filter有九种：
- date(日期)
- currency(货币)
- limitTo(限制数组或字符串长度)
- orderBy(排序)
- lowercase(小写)
- uppercase(大写)
- number(格式化数字，加上千位分隔符，并接受参数限定小数点位数)
- filter(处理一个数组，过滤出含有某个子串的元素)
- json(格式化json对象)
4. filter有两种使用方法，一种是直接在页面里
```
<p>{{now|date:'yyyy-MM-dd'}}</p>
```
5. 另一种是在JS里面用
```
$filter('date')(now,'yyyy-MM-dd');
```
6. 自定义filter
```
app.filter('过滤器的名称',function(){
    return function(需要过滤的对象,过滤器参数1,...){
        //做一些事情
        return 处理后的对象;
    }
});
```

### factory、service和provider是什么关系？
1. factory：把service的方法和数据放在一个对象里，并返回这个对象
```
app.factory('FooService',function(){
    return {
        target:'factory',
        sayHello:function(){
            return 'hello'+this.target;
        }
    }
});
```
2. service：通过构造函数方式创建service，返回一个实例化对象
```
app.servive('FooService',function(){
    var self=this;
    this.target='service';
    this.sayHello=function(){
        return 'hello'+self.target;
    }
});
```
3. provider：创建一个可通过config配置的service，$get中返回的就是factory创建service的内容
```
app.provider('FooService',function(){
    this.configData='init data';
    this.setConfigData=function(data){
        if(data){
            this.configData=data;
        }
    }
    this.$get=function(){
        var self=this;
        return {
            target:'provider',
            sayHello:function(){
                return self.configdata+'hello'+this.target;
            }
        }
    }
});
//此处注入的是FooService的provider
app.config(function(FooServiceProvider){
    FooServiceProvider.setConfigData('config data');
});
```
从底层实现上来看，service调用了factory，返回其实例；factory调用了provider，返回$get中定义的内容。factory和service功能类似，只不过factory是普通的function，可以返回任何东西(return的都可以被返回)，service是构造器，可以不返回(绑定到this的都可以被访问),provider是加强的factory，返回一个可配置的factory

### angular的数据绑定采用什么机制？详述原理。
- 双向数据绑定是AngularJS的核心机制之一。当view中有任何数据变化时会更新到model，当model中数据有变化时，view也会同步更新，显然，这需要一个监控。
- 原理就是，Angular在scope模型上设置了一个监听队列，用来监听数据变化并更新view。每次绑定一个东西到view上时，AngularJS就会往$watch队列里插入一条$watch，用来检测它监视的model里是否有变化的东西，当浏览器接受到可以被angular context处理的事件时，$digest循环就会触发，遍历所有的$watch，最后更新dom。
- 举例：click时会产生一次更新的操作(至少触发两次$digest循环)
```
<button ng-click="val=val+1">increse 1</button>
```
    + 按下按钮
    + 浏览器接受到一个事件，进入到angular context
    + $digest循环开始执行，查询每个$watch是否变化
    + 由于监视$scope.val的$watch报告了变化，因此强制再执行一次$digesr循环
    + 新的$digest循环未检测到变化
    + 浏览器拿回控制器，更新$scope.val新值对应的dom
$digest循环的上限是10次(超过10次后抛出一个异常，防止无限循环)

### 两个平级界面块a和b，如果a中触发一个事件，有哪些方式能让b知道？详述原理
1. 这个问题换一种说法就是，如何在平级界面模块间进行通信。有两种方法，一种是公用服务，一种是基于事件。
2. 公共服务：在Angular中，通过factory可以生成一个单例对象，在需要通信的模块a和b中注入这个对象即可。
3. 基于事件：
- 借助父controller：在子Controller中向父Controller触发($emit)一个事件，然后在父controller中监听($on)事件，再广播($broadcast)给controller，这样通过事件携带的参数，实现了数据经过父controller，在同级controller之间传播
- 第二种是借助$rootScope。每个Angular应用默认有一个根作用域$rootScope，根作用域位于最顶层，从它往下挂着各级作用域。所以，如果子控制器直接使用$rootScope广播和接受事件，那么就可以实现同级之间的通信。

### 一个angular应用应当如何良好的分层
1. 对于小型项目，可以按照文件类型组织
- css
- js 
    + controllers
    + models
    + services
    + filters
- templates
2. 但是对于规模较大的项目，最好按业务模块划分
- css
- modules
    + account
        * controllers
        * models
        * services
        * filters
        * template
    + disk
        * controllers
        * models
        * services
        * filters
        * templates
modules下最好再有一个common目录来存放公共的东西
3. 逻辑代码的拆分
- 作为一个MVVM框架，Angular应用本身就应该按照模型，视图模型(控制器)，视图来划分
- 这里逻辑代码的拆分，主要是指尽量让controller这一层很薄。
- 提取公用的逻辑到service中(比如后台数据的请求，数据的共享和缓存，基于事件的模块通信等)
- 提取公用的界面操作到directive中(比如将日期选择、分页等封装成组件等)
- 提取公用的格式化操作到filter中等等。
- 在复杂的应用中，也可以为实体建立对应的构造函数，比如硬盘(Disk)模块，可能有列表、新建、详情这样几个视图，并分别对应的有Controller，那么可以建立一个Disk构造函数，里面完成数据的增删改查和验证操作，有跟Disk相关的Controller，就注入Disk构造器并生成一个实例，这个实例就具备了增删改查和验证方法。这样层次分明，又实现了复用(让controller层更薄)

### angular应用常用哪些路由库，各自的区别是什么？
1. ngRoute
2. ui.router
3. new router(面向组件)
4. 无论是ngRoute还是ui.router，作为框架额外的附加功能，都必须以模块依赖的形式被引入
5. ngRoute模块时Angular自带的路由模块
6. 而ui.router模块时基于ngRoute模块开发的第三方模块
7. ui.router是基于state(状态)的，ngRoute是基于url的，ui.router模块具有更强大的功能，主要提醒啊在视图的嵌套方面。
8. 使用ui.router能够定义有明确父子关系的路由，并通过ui-view指令将子路由模板插入到父路由模板的`<div ui-view></div>`中去，从而实现视图嵌套。
9. 而在ngRoute中不能这样定义，如果同时在父子视图中使用的`<div ng-view></div>`会陷入死循环

### 如果通过angular的directive规划一套全组件化体系，可能遇到哪些挑战？
组件如何与外界进行数据的交互，以及如何通过简单的配置就能使用

### 分属不同团队进行开发的angular应用，如果要做整合，会遇到哪些问题？如何解决？
1. 可能会遇到不同模块之间的冲突
2. 最好在前期进行统一规划，做好约定，严格按照约定开发，每个开发人员只写特定区块的代码

### angular的缺点有哪些?
1. 强约束
- 导致学习成本较高，对前端不友好
- 但遵守AngularJS的约定时，生产力会很高，对JAVA程序员友好
2. 不利于SEO
- 因为所有的内容都是动态获取并渲染生成的，搜索引擎没发爬取
- 一种解决办法：
    + 对于正常的用户的访问，服务器响应AngularJS应用的内容
    + 对于搜索引擎的访问，则响应专门针对SEO的HTML页面。
3. 性能问题

### 如何看待angular1.2中引入的Controller  as语法？

### 详述angular的"依赖注入"

### 如何看待angular2
