# nodeJS
## js模块化
### 什么是模块化
模块化的概念最早是后台的，随着ajax技术的兴起，js在编程中的地位越来越高，同时文件也越来越多，为了方便文件管理和更新，所以就提出了js模块化

### 模块化的演变过程
1. 普通的方法的书写格式
- 多个人开发可能会造成变量污染
2. 使用对象的作用域来解决变量污染的问题
- 如果在这个对象中一些属性不希望被外界访问到，不能实现这个效果
3. 使用函数的方式来私有化变量
- 每次使用的时候需要重新创建对象
4. 使用函数的自执行操作来代替new操作
- 但是要考虑到扩展性
5. 使用一个自执行函数在原来的对象上扩展方法
- 将来自行的时候要进行传参，这个参数需要做一个处理(window.calc || {})
6. 如果将来要用到第三方模块，我们需要将模块名写在自执行函数的参数上

### 开闭原则
1. 开：对扩展开放
2. 闭：对修改闭合

### 第三方模块化管理工具
### seajs

#### seajs开发流程
- [seajs](seajs.org)
- 特点:
    + seajs遵循CMD规范
    + nodejs一般书写模块代码
    + 依赖的自动加载、配置的简洁清晰
- 兼容所有的主流浏览器
- 使用步骤
    + 定义一个单独的模块：关键字define
    + 要在模块中返回一些方法、属性、对象：exports/module.exports
    + 如果要引入一个地第三方模块：require
    + 使用seajs定义好的模块：seajs.use

#### 使用seajs来模块化开发一个计算器
1. 建一个index.html文件，以及cals文件夹
2. 在cals文件夹中添加add.js,cals.js,sub.js
3. 定义一个单独的模块
```
define(function(require,exports,module){
    function add(x,y){
        return x+y;
    }
});
```
4. 在模块中返回一些方法、属性、对象，将add方法暴露出去
```
exports.add=add;
module.exports.add=add;
```
5. clas文件用来统一管理计算器的模块，引入第三方模块
```
define(function(require,exports,module){
    var add=require('./add.js');
    var sub=require('./sub.js');
    module.exports.add=add;
    module.exports.sub=sub;
});
```
注意点：将来通过require关键字应用了其他模块以后，会返回应用模块的对象
6. 导入seajs库
7. 使用seajs定义好的模块
```
seajs.use('./cals/cals.js',function(obj){
    //回调函数中的obj对象指向的是当前应用的模块cals.js模块中的exprots/module.exports对象
    alert(obj.add.add(1,1));
});
```
注意：回调函数中的参数就是当前引用模块的exports对象
8. 在seajs中引用多个模块，只需要将use中的第一个参数变为一个数组
```
seajs.use(['./cals/cals.js','./dom/dom.js'],function(obj1,obj2){
    //...
});
```

#### seajs遵循的规范：CMD规范
1. CMD规范的作用：规范明确了模块的基本书写格式和基本的交互规则
- cmd规定define中可以传入方法、对象、字符串
    + define可以参数方法
    ```
    define(function(require,exports,module){})
    ```
    + define可以传入对象
    ```
    define({name:'jack',age:18})
    ```
    + define可以传入字符串
    ```
    define('zygzw')
    ```
- cmd规定require用于接受第三方包提供的接口
    + 正确拼写
    + 不要修改
    + 使用直接量
- cmd规定exports用于想外部提供模块接口
- cmd规定module.exports用于向外部提供模块的接口
    + exports仅仅只是module.exports的一个指向
    + 所以将来值返回一个内容，不能直接赋值给exports，可以赋值股给module.exports
- 遵守CMD规范的模块都有一个特点：按需加载(懒加载)
- cmd规定config用于配置文件
    + 可以将一些文件的信息配置到一个属性config中
    + base配置一个统一的路径，将来在加载文件的时候会将其它的路径默认跟这个路径组合起来
    + alais将某一路径配置一个别名
    ```
    seajs.config({
        base:'./cals/',
        alias:{
            'add':'./cals/add.js'
        }
    })
    ```

#### $.hover(over,out)
1. over和out都是一个回调函数
2. 当鼠标移入元素时会调用over回调函数
3. 当鼠标移出元素时会调用out回调函数

#### 字母旋转的小案例
1. 定义一个控制游戏的模块
```
define(function(require,exports,module){});
```
2. 引入jQuery
```
var $=require('../jquery.js');
```
3. 定义一个构造函数让所有的容器下的图片运动起来
```
var RotateWord=function(id){};
```
4. 得到容器对象及下面所有的图片
```
this.container=$(id);
this.items=this.container.children();
```
5. 定义一个方法的数组，用来存放方法
```
this.arr=[];
```
6. 将方法、属性、对象暴露出去
```
module.exports=RotateWord;
```
7. 定义一个随机数的方式
```
var random=function(num){
  return Math.random()*num;
};
```
8. 添加初始化图片的对象
```
RotateWord.prototype={
    constructor:RotateWord,
    init:function(){
        //.....
    }
}
```
9. 给每个图片添加hover事件
```
$(this.items).each(function(index,item){
    var time,obj=$(item);
    obj.hover(function(){
        //...
    },function(){
        //...
    });
```
10. 鼠标移入透明度变为1，旋转归位
```
obj.css('opacity',1).css('transform','rotate(0deg)');
```
11. 鼠标移出后，透明度要归位，延迟旋转
```
obj.css('opacity',0.5);
time && clearInterval(time);
time=setInterval(rotateFn, Math.ceil(random(5000)));
```
12.旋转函数，随机生成一个旋转度数
```
function rotateFn(){
  obj.css('transform','rotate('+random(360)+'deg)');
}
```
13. 将每个元素的旋转函数存入定义好的数组中
```
arr[index]=rotateFn;
```
14. 在默认情况下图片元素有旋转
```
rotate:function(){
  $(this.arr).each(function(n,fn){
    setInterval(fn, Math.ceil(random(3000)));
  });
},
```
15. 开启动画效果
```
render:function(){
  this.init();
  this.rotate();
}
```
16. 在控制文件中导入我们写好的模块
```
define(function(require,exports,module){
  var RotateWord=require('./rotateWord.js');
})
```
17. 实例化构造函数，调用渲染方法
```
var obj=new RotateWord('#container');
obj.render();
```
18. 在主界面使用模块
```
seajs.use("./gamejs/gameControl.js",function(obj){});
```

### requirejs
1. [require.js](requirejs.org)
2. 基本与seajs一样
3. requirejs与seajs有两点注意
- seajs使用模块时用方法seajs.use()，而requirejs直接用require关键字
- seajs只使用一个模块时可以只传一个参数，但是requirejs必须是一个数组
4. requirejs使用的是AMD规范
- 预加载模式：当第一次访问时将所有的文件加载出来
    + 优点：第一次访问完成后，再次访问的速度会很快
    + 缺点：第一次加载页面要等很久
- 懒加载模式：使用时才会加载对应的文件
    + 优点：第一次访问速度相对块
    + 缺点：访问其他模块时会要加载的比较慢

## 各种shell
### 什么是shell
就是系统内核的一层壳，作用是保护内核同时传递人与计算机交互的信息。它只是系统的一个工具，我们可以使用它来操作计算器。

### 常用的shell
1. CMD
- 打开：windows+r->cmd
- 不能跨平台
2. powerShell
- 打开：windows+r->powerShell
- 兼容windows和(linux、unix)
3. git bash
- 安装好了后，鼠标右键，菜单里面

### 常用的shell指令
1. cd：用于改变路径
- `cd ./`当前目录
- `cd ../`回到上级目录
- `cd a`在当前目录下找到a
- 如果改变盘符，在cmd中要先转换到对应的盘符上，再进去
- 在powerShell中直接复制路径直接，鼠标右击直接就复制
2. cls/clear：清屏
- cmd下只能用cls
- powerShell都可以用
3. dir/ls：列出当前路径下的所有文件
- cmd中不支持ls
4. tree：以树状的形式显示 

### 打开目录下的`.exe`文件
1. 当前目录下：`.\test.exe`
2. 环境变量中:`test`

## 环境变量

### 环境变量的作用
用于指定系统文件的默认打开路径，当在cmd/powershell/运行中打开文件时会，除了在当前目录下面去找对应的文件以外还有会在环境变量对应的目录下面去文件。

### 环境变量的分类
1. 用户变量：只有当前登录的用户才能使用
2. 系统变量：所有的用户都能使用到

## nodejs安装
### 使用nodejs的安装包
因为nodejs更新换代太快，如果出现了新的版本就重新安装一下

### 使用nvm来安装
1. 可能同时管理多个nodejs版本
2. 更新了新的nodejs只需要知识版本号就可以通过nvm来下载了
3. 下载nvm工具，并安装（设置两个路径：一个是nvm存放的路径，另一个是nodejs存放的路径），要注意环境变量中是否有PATH的`NVM_SYSLINK`和`NVM_HOME`
4. 打开nvm，通过指令来安装node
5. `nvm install nodejs`的版本号 + 回车 可以下载对应版本的nodejs
6. 也可以拷贝nodejs的包拷贝到nvm的根目录下

### nvm,nodejs,npm之间的关系
1. nvm：nodejs的版本管理工具，可以下载nodejs以及改变正在使用的nodejs的版本
2. nodejs：提供node环境，其中集成大量的核心模块
3. npm：每个版本的nodejs都自带一个工具，他们以帮助nodejs去上传和下载新第三方包

### nodejs说明
1. 当nodejs安装完毕以后npm会自动安装
2. nodejs是程序运行的环境
3. npm：环境的扩展(将来在开发过程中nodejs有些功能不具备，我们可以通过npm去网上下载一些新的功能强大的包)
4. nvm：nodejs的一个版本管理工具
5. 安装好nvm以后nodejs是不存在的，还需要通过num去单独安装node.js

### nvm的常用指令
1. `nvm list`查看当前已安装的所有nodejs版本
2. `nvm install nodejs的版本号`安装指定版本的nodejs
3. `nvm uninstall nodejs的版本号`卸载指定版本的nodejs
4. `nvm use nodejs的版本号`将指定的nodejs版本设定为当前使用的nodejs环境

## nodejs
### nodejs优点
1. nodejs最友好的对后台语言(就是用原生的JavaScript写服务器代码)
2. node作为一个服务器语言：
- 开启服务器的功能
- 在硬盘中读写数据的功能

### nodejs的特点
1. 基于google浏览器的v8引擎
2. 事件驱动、非阻塞I/O
3. nodejs相比其它的后台语言要高效、轻量。 
4. 开源并且跨平台。

### nodejs的学习网站
1. [nodejs.org](nodejs.org)
2. [npmjs.com](npmjs.com)
3. [github.com](github.com)
4. [stackoverflow.com](stackoverflow.com)
5. [google.com](google.com)

### node的使用
1. REPL：交互式运行环境(给开发人员的测试有模式)
在shell中直接输入node敲击回车，会进入REPL模式。可以在这个模式下面自己写一些js代码来测试效果。
- ctrl + c 两次：退出REPL环境
- ctrl + d 一次：退出REPL环境
- .exit 退出REPL环境
- ↑↓：查看RPEL的历史操作记录
- _: 得到上一次操作返回的结果
- tab：查看nodejs中的API
- .save fileName：以js文件的形式将当前REPL会话保存到硬盘中
- .load fileName: 将硬盘中的js文件以REPL的形式读取出来
2. 正常开发模式（执行js文件）
- 写好一个js文件
- 在js文件所在的位置打开powershell，输入指令node fileName.js能得到js的执行结果。
- 也可以在sublime中安装terminal插件（ctrl+shift+p ->package controll:install->terminal）

### 学习路线
1. 对词法的操作
2. 对集合的操作
3. 对对象的操作
4. 对文件的操作

### 使用node来完成一个小型的服务器
```
//1.引入一个核心模块
var http=require('http');
var count=0;
//2. 创建一个服务器
var server=http.createServer(function(req,res){
  console.log('使用node来完成一个小型服务器');
  //在屏幕上输出文字
  res.write('欢迎来到nodejs' + count++);
  //如果创建的是一个服务器对象，那么一定要调用一个方法
  res.end();
});
//设置一个访问端口
server.listen('8888','192.168.114.36',function(){
  console.log('hello nodejs');
});
```

### 在sublime中安装一个插件：terminal
1. ctrl+shift+p打开插件面板
2. 输入package control:install package
3. 直接在面板中输入terminal，点击回车进行安装就可以了

### nodeJS的常用API
- global：全局对象(window)
    + 只要运行在node的执行环境中的文件，都可以用的对象(对象中的属性。方法)
- node的核心模块
    + 就是nodejs官方自己定义好的一些集成在nodejs.exe文件中的API

## nodejs中的全局对象
### 异步执行方法 
1. `setTimeout`第二执行
2. `setImmediate`最后执行
3. `process.nextTick`最先执行
- 虽然每个nodejs中都可以用这个文件，但是不是一个全局方法，是一个伪全局
4. `__dirname_`输出当前文件的绝对路径(伪全局对象)
5. `__filename`当前文件所在的物理路径+路径名
6. `process`
- `process.abort()`立即结束js代码的运行，下面的代码不再执行
- `process.arch()` 得到当前运行环境所在平台
- `porcess.argv()`得到当前文件的执行参数  
    + 如果执行js文件不传入参数，会返回一个数组。
    + 数组中有两个数据：当前nodejs的执行环境的目录，以及当前node执行的js文件的绝对路径
    + 如果执行js文件传入参数，可以得到执行参数，那么这些参数会按顺序被添加到argv的数组中。
- `process.stdout.write()`输出一段内容，没有换行，console.log()只是在后面加了换行(\n)
- `process.stdin.on('readable',function(){})`监控用户是否键入了内容
- `process.stdin.read()`得到用户输入的内容
    + 第一次进来的时候由于用户还没有来得急输出内容，所以content为null
    + 当第二次进来时，JS在保存用户输入的时候用的是二进制
    + 将二进制转换为字符串，只需要在二进制后面加上其他的字符串
- `process.env.path`输出当前系统的环境变量
    + 在运行nodejs的时候可以通过命令set环境变量名=环境变量值&&执行文件名
    + 传入一个环境变量参数

### 写一个命令行版的小型计算器
1. 得到计算的两个数据
```
var arr=process.argv;
```
2. 从数组中将前两个参数删掉
```
arr=arr.slice(2);
```
3. 得到计算的操作符
```
var num1=+arr[0];
var num2=+arr[2];
var operate=arr[1];
```
4. 根据数据和操作符得到结果
```
var result;
switch(operate){
    case '+':
        result=num1+num2;
        break;
    case '-':
        result=num1-num2;
        break;
    case '*':
        result=num1*num2;
        break;
    case '/':
        result=num1/num2;
        break;
}
```
5. 将结果返回
```
console.log(result);
```

### process.stdout.write应用
1. 要将图片转换成文字的形式
- 使用工具将gif图片转换成字符画
- 将源码中的图片数组拷贝到JS文件中
- 将<br>换成\n
2. 输出这些文字
- 定义一个计时器
- 取出数组中索引的字符串
- 最后一个图片为终点，重置
- 将以前的图片清除
- `process.stdout.write('\u001b[2J\u001b[0;0H')`

### process.stdin的使用
1. 让用户输入用户名，如果用户名是admin，就提示输入正确，如果不为admin就一直输入
2. 得到用户输入的内容
```
process.stdin.on('readable',function(){
    var content=process.stdin.read();
})
```
3. 判断
```
content+='';
if(content!=null){
    if(content.trim()=='admin'){
        process.stdout.write('登录成功\n');
        process.abort();
    }else{
        process.stdout.write('登录成功\n');
    }
}
```

### 知识梳理
- JD
- JS基础部分
    + 基础语法
    + DOM
    + 特效
- jQuery
- HTML5中的新标签
- CSS新的样式
- ajax在浏览器中通过ajax技术去服务器中异步获取数据
- 移动web 不同屏幕尺寸的兼容问题
- JS的面向对象
- canvas
- JS的框架的封装
- JS的流行框架
- nodejs基础
- nodeJS项目
    + 后台nodeJS+mySQL(pc)+移动端(移动Web,ajax)
    + 推广：微信开发
- 移动APP

### global
- 全局对象
    + setInterval
    + setTimeout
    + process
        * abort结束当前文件的执行
        * arch得到当前系统的版本
        * argv得到当前文件执行的参数
            - 第一个参数对应当前文件执行的nodejs路径
            - 第二个参数文件的绝对路径加参数名
        * env.path输出当前系统的环境变量
        * stdout.write()
        * stdin.on('readable',function(){})
        * stdin.read()
    + process.nextTick
    + 作用：所有的nodejs环境中的文件都可以使用到同一个全局对象
- 伪全局对象
    + __dirname
    + __filename

## commonJS
#### ECMAScript缺点
由于nodejs是用JavaScript来写的，JavaScript遵守ECMAScript规范，而ECMAScript这个规范(如果作为一门后台语言的规范)是不完整的，因为它内容仅仅只是规范了JavaScript的：词法、类型、表达式、方法、对象等基本要素。
如果使用ECMAScript来作为规范还是有下面几大缺点：
- 没有模块系统(不方便扩展)
- 标准库较少，对于文件系统，I/O流等常见的需求没有标准的API
- 没有标准接口，缺少如：WEB服务器、数据库的统一接口
而nodejs作为一门后台语言，它必须有自己的很多基本功能，而这些功能需要有人来规范有，commonjs就是起的这样一个规范。

#### commonjs是一种后台语言的规范
1. JavaScript必须像后台语言一样具有拥有开发大型web服务器的能力
2. commonjs覆盖了：二进制、字符集编码、I/O流、web服务器...
3. 规范了模块与模块之间的引用关系
- 不需要使用关键字就可以定义模块
- exportes暴露接口
- require引用模块
4. 所以commonjs是nodejs的一个规范，他的规范使得nodejs具有开发服务器的可能
5. CMD，AMD规范了JS模块与模块之间的引用关系
- define定义模块
- exportes暴露接口
- require引用模块

### nodeJS服务器语言
1. 开启服务的能力
2. 文件读写的能力

## nodejs中的核心模块

#### 什么是核心模块
commonjs规定的好的功能在nodejs实现了，这样的一些模块我们叫做核心模块。也就是说nodejs中所有文档中给出的api都是核心模块，而我自己写的模块我们称为用户模块

#### path核心模块
1. 引入path的核心模块
```
var path=require('path');//引用核心不需要加路径和后缀
```
2. 得到传入路径的文件名`basename`
```
var baseName=path.basename('D:\\11\\1.png');//1.png
```
3. 得到传入路径的所在路径`dirname`
```
var dirname=path.dirname('D:\\11\\1.png');//D:\\11
```
4. 注意点：Windows下的路径是以盘符开始中间文件所在的文件夹名最后是文件名，Linux、Unix路径是以/开始，中间是文件所在的文件夹名，最后是文件名，在非Windows操作系统是没有盘符的
5. nodeJS中基本都是跨平台的
6. 得到传入路径中文件的扩展名`extname`
```
var extName=path.extname('D:\\11\\1.png');//.png
```
7. 得到这个路径中的文件名不包含扩展名`basename`
```
var baseName=path.basename('D:\\11\\1.png','.png');//1
```
8. 将路径转换为一个对象，需要什么属性直接点出来就可以`parse`
```
var parse=path.parse('D:\\11\\Itcast\\workspace\\nodeJS\\day3\\nodeJS.md');
/*{ root: 'D:\\',
    dir: 'D:\\11\\Itcast\\workspace\\nodeJS\\day3',
    base: 'nodeJS.md',
    ext: '.md',
    name: 'nodeJS' }*/
```
9. 将一个路径对象转换成字符串`format`
```
var parse=path.format(
    { root: 'D:\\',
      dir: 'D:\\11\\Itcast\\workspace\\nodeJS\\day3',
      base: 'nodeJS.md',
      ext: '.md',
      name: 'nodeJS' }
);
```
10. 将多个路径组合成一个完整的路径，认识../,./，解析不规则路径`join`
```
var pathAll=path.join('aa\\bb','cc');//aa\bb\cc
```
11. 得到当前系统的分界符`delimiter`
```
var pathArr=process.env.path.split(path.delimiter);
```

#### URL核心模块
1. url组成：
    - 协议+用户名和密码+服务器的ip地址+端口号+请求地址+页面参数+页面hash值
2. 引入url核心模块`require('url')`
3. `url.parse(urlString)`将一个url字符串转化为为一个url对象
4. `url.format({...})`将一个url对象转换为一个字符串
5. `url.resolve(from,to)`将两个url组合起来

#### 核心模块queryString
1. require('querystring');引入querystring模块
2. 将字符串类型的参数转换成一个参数对象`querystring.parse(str)`
3. 将对象转换成一个字符串`querystring.stringify({...})`
4. 转码`querystring.escape`
5. 解码`querystring.unescape`

## 文件模块

#### 什么是文件模块
nodejs中的核心模块都集成到了node.exe之中，将来不管是引用还是使用都非常方便，但是有node.exe之中给我们准备的模块有限，有很多功能没有被包含在核心模块之中。所以在实际开发过程中我们会根据自己的需求去开发一个自己模块。像这种模块没有集成到node中的自己开发的模块我们叫做文件模块，或者叫做用户模块，再或者是第三方包模块。

#### 自己开发一个计算器
##### 版本一：
- add.js
```
function add(x,y){
    return x+y;
}
module.exports=add;
```
- sub.js
- index.js所有计算机功能的统一出口
```
var add=require('./add.js');
var sub=require('./sub.js');
module.exports={
    add:add,
    sub:sub
};
```
- use.js
```
var calc = require('./index.js');
console.log(calc.add(1,1));
console.log(calc.sub(1,1));
```
- 代码没有问题，但是将来文件一旦多起来，我们管理起来相当麻烦
- 我们应该将功能模块(add.js、sub.js、index.js)与程序的入口模块(use.js)分离
- 分离的时候是将功能模块放到同一个文件夹下，方便管理
- 在ndoejs中有一个约定，所有的功能模块一定要放在一个文件下这个文件夹的名称是固定的`node_modules`

##### 版本二：
所有的功能模块一定要放在`node_modules`下，记得要改use.js的文件目录。使用第二种方法来完成计算器也有存在问题：将来如果说一个项目里有多个功能，结构一样混乱，所以我们使用单独的文件夹来将所有同一功能的子模块管理起来。

##### 版本三：
使用第三种方式完成计算器也存在问题：引用写好的模块的路径越来越长，为了解决这个问题nodejs中规定如果按照了上面的结构写好了一个功能集合，我们把这个功能集合称为“包”，如果当前文件中有一个包，那么将来在使用这个包中的时候，没有必须再写完整的路径了。

##### 版本四：
```
var calc = require('calc');
```

### require的加载过程：nodejs内容自己的约定。
1. 当nodejs执行reuqire('包名')时nodejs会将这个包当作核心模块来解析
2. 如果找不到这个核心模块，就会去当前项目的node_modules文件夹下去找包名对应的文件夹
3. 如果没找到先去当前包中查看是否有package.json的文件
4. 如果有就加载package.json文件中的main属性对应的模块，如果找到就加载
5. 如果找不到就会直接去这个文件夹下去找一个名称为index.js的模块，将模块中的内容加载出来
6. 如果都找不到就报错

### package.json应该如何生成，以及它里面都有哪些属性？
1. 在当前包所在的文件夹中打开shell窗口，然后输入npm init -y指令，会在当前项目中生成一个package.json的文件
2. 属性
```
{
  "name": "calc",//设置当前包的名称
  "version": "1.0.0",//设置当前包的版本
  "description": "",//当前包的描述（帮助npm进行关键字搜索）
  "main": "index.js",//当前包的出口模块
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },//执行一段脚本
  "keywords": [],//当前包的关键字（帮助npm进行关键字搜索）
  "author": "",//当前包的作者
  "license": "ISC"//是当前包的一个协议
}

```

### 什么是包
就是将一组功能相似的文件模块统一放到一个文件夹下，并且为所有的文件模块设置一个统一的出口文件，这样的文件夹在nodejs中被称为包。

### 一个符合CommonJS规范的包的结构
- 一个`package.json`文件应该存在于包顶级目录下（必须）
- 二进制文件应该包含在`bin`目录下(非必须)
- JavaScript代码应该包含在`lib`目录下（必须）
- 文档应该在`doc`目录下（非必须）
- 单元测试应该在`test`目录下（非必须）
- 使用说明放在`README.md`文件，这个文件必须放在包的顶级目录（必须）
![一个符合CommonJS规范的包的结构](./commonjs_construction.png)

## 通过npm来下载和上传文件模块

### 通过npm安装和上传包
1. 上传
    1. 创建好一个标准结构的包（注意:一定要满足包的要求），并且在package.json文件中设置好一些参数。
    2. 去npmjs注册一个账号（登录之后点击图像会弹出下拉框，选择profile，会打开记录发布包的历史记录） 
    3. 在要发布的文件夹下打开CMD，执行发布指令
        1. npm adduser:根据引导，依次输入用户名，密码，以及注册邮箱就行了
        2. 如果看到：`Logged in as xxx on https://registry.npmjs.org/`说明登录成功
        3. npm publish：看到+ calcczboke3qi@1.0.0指令说明已经上传成功
2. 撤销
3. 安装
    1. 本地安装指令： npm install 包名 [-g]

### npm其它常用指令
1. `npm adduser` ：会引导输入用户名，密码以及注册邮箱（如果登录成功会显示：`Logged in as xxx on https://registry.npmjs.org/`.）
2. `npm publish`：发布包
3. `npm uppublish` 包名@版本号：撤销已经发布的包
4. `npm install <name>`安装nodejs的依赖包
5. `npm install <name> --save` 安装的同时，将信息写入package.json中
6. 项目路径中如果有package.json文件时，直接使用`npm install`方法就可以根据dependencies配置安装所有的依赖包这样代码提交到github时，就不用提交node_modules这个文件夹了。
7. `npm init` 会引导你创建一个package.json文件，包括名称、版本、作者这些信息等
8. `npm remove <name>`移除
9. `npm update <name>`更新
10. `npm ls`列出当前安装的了所有包
11. `npm root` 查看当前包的安装路径
12. `npm root -g` 查看全局的包的安装路径
13. `npm help` 帮助，如果要单独查看install命令的帮助，可以使用的`npm help install`

### require加载规则补充
1. require无论是核心模块还是文件模块都优先从缓存加载（可以解决一个文件多次引用一个文件模块而反复加载的问题）
2. 在window中加载一个文件模块要使用./或者../开头（如果不加后缀，nodejs会当作用核心模块或者是包来解析）
3. 在mac和linux中以/加载是加载一个绝对路径的文件模块，而在window下/表示当前require函数所在文件所在的目录的盘符（比如：c盘，没有意义）
4. 一个文件模块可以不写扩展名,require()会自动依次按照.js .node .json的顺序进行补齐后加载，如果三个扩展名都没有，则当做目录或者包来加载。如果目录或者包都没有，则报错。
5. 所以如果不加后缀，将来如果一个文件返回的是json，那么它的加载性能会慢一点
6. 加载一个包，依次按照module.paths数组中的路径，加载传入的包名，如果有，就加载；如果没有，报错
7. 包加载完毕以后，如果有package.json文件，就去找其中main属性对应的出口文件
8. 如果没有，就找默认文件index.js

### 调试nodejs
1. 使用console.log()
- 使用麻烦，用了以后还要删除
2. nodejs的自带调试器
- `node debug a.js`没有任何作用
3. 使用visual stdio调试
- 安装vsCode，并且通过vscode打开要调试的文件所在的文件夹
- 点击F5,选择nodejs的打开方式，这时vsCode会打开一个lanuch.json，修改其中"program"属性，改为"${workspaceRoot}/文件名.js"
- 可以查看文件的五个全局对象以及添加监控文件中变量的值 
4. 使用webstorm调试

## ES6中的新语法
### use strict
1. ECMA组织在ES5的时候就提出了一个模式，这个模式就是严格模式
2. 开启严格模式:use strict
3. 严格模式下变量必须定义以后才能使用
4. 严格模式下方法不能定义多个同名参数
5. ......
6. 严格模式的好处
    1. 消除JavaScript语法的一些不合理、不严谨之处，减少一些怪异行为
    2. 消除代码运行的一些不安全，保证代码的安全
    3. 提高编译器效率，增加运行速度
    4. 为将来新版本的JavaScript做铺垫

### 使用let关键字定义常量
1. 在JavaScript中的var一直有bug
    1. 变量提升
    2. 没有块级作用域
    3. 重复多次定义一个变量
2. let的特点
    1. let声明的变量不会有变量提升
    2. 有块级作用域(当大括号结束时，块级作用域中的变量都会被销毁)
    3. 不允许使用let反复定义一个变量

### 使用const关键字定义常量
1. 常量：指的是不会改变的数据
2. 常量的特点
    1. 值不能改变
    2. 常量具有块级作用域
    3. 不要在块中申明常量
    4. 没有变量提升，先声明后使用
    5. 不可以重复申明同名的常量
    6. 一定要赋初始值，否则报错
    7. 如果声明的是对象，对象的地址不能改变，但是可以改变其内部的属性
3. 将来只要值nodejs中引用核心模块或者包都用常量来接收

### 字符串的扩展方法
1. includes()：返回值是布尔值，表示是否找到参数字符
2. startsWith()：返回值是布尔值，用于判断字符串是否以某些字符开头
3. endsWith()：返回布尔值，用于判断字符串是否以某些字符结尾
4. startsWith()、endsWith()传入两个参数，第二个表示从索引i开始以字符开头(结尾),返回布尔值
5. repeat()：传入数字(正数，下取整)，将字符串重复输出

### 模板语法"模板字符串"
1. 定义一个模板，并且给模板加一些占位：${}
```
var temp=`大家好，我叫${obj.name}，今年${obj.age}`;
```
2. 将模板中的一些变量赋值
3. ${}可以放变量、方法、表达式

### 箭头函数
1. 箭头函数的演变规则
2. 最原始的匿名函数
```
var arr=[2,3,4,1];
$(arr).each(function(index,item){
    console.log(item);
});
```
3. 改造一：匿名函数中的function关键字我们可以省略，参数与方法之间=>
```
$(arr).each((index,item)=>{
    console.log(item);
});
```
4. 改造二：如果方法中的代码只有一句我们可以去掉{}，并且代码结尾的分号要去掉
```
$(arr).each((index,item)=>console.log(item));
```
5. 改造三：如果匿名函数中的参数只有一个可以将参数的括号去掉
```
$(arr).each(index=>console.log(item));
```
6. 改造四：如果匿名函数中有返回值，并且只有一句代码，我们可以去掉return关键字
```
$(arr).sort(function(m,n){
    return n-m;
});
$(arr).sort(m,n)=>n-m;
```
7. 总结：箭头函数的写法没有一个固定的格式，都是根据方法的参数和方法体的，灵活运用
8. 参数：
    1. 如果参数只有一个，可以去掉参数的括号
    2. 如果有两个或者两个以上的参数，括号不能去掉
    3. 如果没有参数，括号不能去掉
9. 方法体：
    1. 方法体只有一句，可以省略大括号
    2. 方法体只有一句，并且有return，可以省略return和方法体的大括号
    3. 如果方法体不止一句，大括号绝对不能去掉
10. 箭头函数没有自己的this，函数体内部写的this，会顺着作用域去找最近真实存在的this
11. 如果在nodejs环境中使用setTimeout传入一个匿名函数，这个函数中使用到了this，这个this是setTimeout本身，用箭头函数后，this是整个node全局环境
```
function foo(){
    setTimeout(function(){
        console.log(this);//setTimeout
    },1000);
}
function foo(){
    setTimeout(()=>{
        console.log(this);//node
    },1000);
}
```
12. 箭头函数内部的this是定义时所在的对象，而不是使用时所在的对象，并且不会改变
```
function foo(){
    this.name='Jhon';
    return ()=>{
        console.log(this.name);
    }
}
var fo=foo();//返回的是一个函数对象
foo.name="tom";
fo();//Jhon说明一旦箭头函数声明完成后this指向不会发生改变
```
13. 箭头函数不能作为构造函数
```
var foo=function(name,age){
    this.name=name;
    this.age=age;
}
var foo=(name,age)=>{
    this.name=name;
    this.age=age;
}
var obj=new foo('Jhon',18);//报错
```
14. 箭头函数中不存在arguments，箭头函数中的arguments指向的是外层的arguments
```
function foo(){
    setTimeout(()=>{
        console.log(arguments);//{ '0': 'aa', '1': 'bb' }
    },1000);
}
foo('aa','bb');
```

## 通过nodejs核心模块来操作文件
### 核心模块fs
1. 使用Buffer对象
    1. 创建一个二进制数组对象
    2. 在创建的时候可以将数组的长度在buffer后的括号中指定
    3. 一旦指定那么这个数组的长度永远固定
    ```
    var buf=new Buffer(5);
    ```
    4. buffer对象本质上是一个二进制数组，但是在显示的时候为了不占太多的空间
    5. 在buffer输出的时候，会由二进制自动转换为十六进制
    6. 将buffer数组清空
    ```
    buf.fill(0);
    ```
    7. 向buffer中存储数：字母占一个字节，汉子占三个字节
    ```
    buf.write('我AB');
    ```
    8. 如果一个数组长度不能容纳所有的内容，那么将来这个数组会将走出的部分自动省略
    9. 将数组以字符串的形式输出
    ```
    buf.toString();
    ```
    10. 给buffer数组按需分配长度
    ```
    var buf=new Buffer('你好！');
    ```
    11. 获取指定位置的指定长度数据
    ```
    buf.slice(2);
    ```
    12. 判断在buffer中是否识别某个字符集
    - 默认情况下nodejs的buffer中的toString方法会将二进制数据转为UTF-8
    - 以二进制的形式将文件中的内容读取出来
    ```
    "use strict";
    const fs=require('fs');
    //err当读取发生错误，错误信息会保存在err中
    //data当读取成功是读取的数据会保存在data，这个data本质上就是一个二进制数组
    fs.readFile('./1.txt',(err,data)=>{
        if(err){
            console.log("文件读取失败");
            return;
        }
        console.log(data.toString());
    });
    ```
    13. 可是不支持GB2312格式，应该下载一个iconv-lite包，导入包，以及用它的格式来输出文件·iconv.decode(data,'gb2312');
    
### 操作目录
1. 创建文件夹mkdir
```
fs.mkdir('./aa',(err)=>{
    if(err){
        consoel.log('添加失败');
        return;
    }
    consoel.log('创建成功');
});
```
- 创建文件有两种方式，同步(mkdirSync)和异步(mkdir)
- 用的多的是异步形式，不用造成阻塞
2. 删除文件夹rmdir
3. 判断文件夹是否存在
```
fs.exists(path,(exists)=>{});
```

### 操作文件
1. 写文件writefile,appendFile
```
fs.writeFile('./aa/1.txt','Hello',(err)=>{
    return err?console.log('失败'):console.log('成功');
});
```
- writefile特点:
    + 如果目录下不存在这个文件，他就会自动创建一个文件
    + 如果目录不存在，无法自动创建
    + 如果重复想一个文件中写内容，不是追加，而是覆盖
- appendFile追加到文件后面
2. 读文件readFile
```
fs.readFile('./aa/1.txt',(err,data)=>{
    return err?console.log('失败'):console.log(data.toString());
});
```
3. 文件重命名rename，文件名和文件路径
4. 删除文件unlink
5. 监控文件watch
```
fs.watchFile('./aa/1.txt',(curr,prev)=>{
    console.log(`curr=${curr}`);
    console.log(`prev=${prev}`);
});
```
6. 如果使用readFile方法来读取大文件将来会报异常，因为我们的data/buffer这个数组会越界
7. 如果要读取大文件，用我们的文件流方法
8. fs.createReadStream(path[,option])将文件已流的形式读取出来(读流)
9. fs.createWriteStream(path[,option])将文件已流的形式写进去(写流)
10. 创建读流和写流
11. let pathOld='F:\\11\\1.zip';
```
let pathTarget='F:\\1.zip';
let rs=fs.createReadStream(pathOld);
let ws=fs.createReadStream(pathTarget);
```
11. 设置文件数据改变的事件
```
rs.on('data',(chunk)=>{
    ws.write(chunk);//让写流将读流读出来的内容写入对应的文件
});
```
12. 设置读取的监听事件
```
rs.on('end',()=>{
    console.log('文件读取完成');
    ws.end(()=>{
        console.log('文件写入完成');
    });
});      
```
13. 用一个函数执行上面读写操作
```
rs.pipe(ws);
```

### Github中将html文件显示出来
网站前面加上http://htmlpreview.github.io/?

### 解决Webstorm不用书写箭头函数的问题
文件->设置->语言框架->JavaScript->ECMAScript6

### 调试nodejs
1. 使用console.log()
2. 使用nodejs自带的调试器`-node debug a.js`
3. 使用vsCode
    1. 安装vsCode，且通过vscode打开要调试的文件所在的文件夹
    2. 点击F5,选择nodejs的打开方式，这时vsCode会打开一个lanuch.json，修改其中"program"属性，改为"${workspaceRoot}/文件名.js",
    3. 可以查看文件的五个全局对象以及添加监控文件中变量的值 

## nodeJS的特点
### 非阻塞I/O模型
- 同步的特点
    + 当使用nodejs去读取文件时，如果文件过大，读取的时候时间过长，这个时候nodejs程序不会继续执行下面的代码，而是等文件读取完以后才会执行下面的代码。这种读取文件方式我们叫做*阻塞式I/O模型*。
    + 缺点：当代码执行到读取文件操作的代码后下面代码不会被执行，程序处于“卡死”状态。大量的时间消耗在了等待中，严重消耗效率。
- 异步的特点
    + 当使用nodejs去读取文件时，如果文件过大，就让程序分两个部分来工作：一个部分继续去读取文件，另一个部分继续执行下面的程序。这种方式来读取文件的话，既不会影响文件的读取，又不会影响下面代码的执行。这种文件读取文件的方式我们叫做*非阻塞式I/O模型*。
    + 正是由于nodejs的使用的是非阻塞式I/O模型，所以nodejs在运行时相比阻塞式I/O模型轻量高效。

### 异步的好处
1. 如果读取文件时间过程，根本不需要等待那么长的时间，下面的代码就可以直接执行
2. 如果将来在执行其他代码时候，文件已经读取完成，需要执行其他代码，在nodejs已经将这些问题处理完成了。

### 过程驱动
- 以操作系统为例，最早的操作系统操作模式为：输入------> 执行 ------> 输出，像这种操作流程都是程序员事先设置好的，我们只能够按照既定的方式去操作程序的设计思想，把它叫做过程驱动。
- 缺点：程序设计方法是面向程序而不是面向用户的，交互性差，用户界面不够友好，因为它强迫用户按照某种不可更改的模式进行工作。用户每次操作后都要等待程序执行成完成才能执行其它操作。

### 事件驱动：程序的设计思想
- 什么叫事件驱动
    + 通过鼠标的点击或者键盘的输入，执行对应的功能
    + 像这种通过一个操作，程序执行对应的功能，我们把这种操作叫事件
    + 像这种系统的操作都是由事件控制的设计思想我们叫做事件驱动。
- 优点：
    + 它是一种“被动”式程序设计方法。
    + 程序开始运行后，处于等待用户输入事件状态
    + 程序每个事件触发后，取得事件并作出相应反应
    + 处理完毕又返回并处于等待事件状态。 
- 在nodejs中的表现
    + nodejs也是以事件驱动来设计的
    + 通过nodejs的fs核心模块给文件设置一个监听事件，文件就处于补监听状态了
    + 一旦文件被修改了，就会触发监听设置的回调函数
    + 当回调函数处理完毕后返回监听状态，并处于等待事件状态
    + 所以将来只要设置一个事件，只要满足事件的触发的条件，事件就会执行，执行以后再回到等待事件状态
- nodejs给程序设置事件的语法
    + fs.on(“end”,function(){})
    + on(“readable”)
    + on(“data”)


### 事件驱动的应用
- 由于浏览器请求服务器没有一个固定的时候，为了防止请求被漏掉，最好使用一个方式来写服务器，使用事件驱动方式来写服务器的代码。
- 了解服务器通过底层的socket用来发送信息和接受信息。
- 电脑里面网卡里面有一个socket，可以发送请求报文(二进制数据)给服务器中的socket，服务器中的socket处理完后，要返回给浏览器中的socket。

## socket网络编程
### 什么是socket
1. 网络通过通讯中起到关键作用的就是socket
2. socket是连接浏览器与服务器的桥梁
3. 也就是说浏览器之所以能够连接服务器是因为浏览器中有socket帮助浏览器传递数据
4. 而服务器之所以能够接接收浏览器的请以及响应信息给浏览器，也是因为服务器中的socket帮助服务器接收和传递数据

### IP地址
- 特点
    + Internet中的主机如果想要与另一台进行通信，必须要有自己的ip地址。ip地址是每台电脑在互联网上的唯一标识
    + ip地址分为32位（ipv4）和64位（ipv6）;现在一般用的是ipv4
- ip地址的分类
    + 本机ip地址：127.0.0.1 （或者是“::0”）又叫本地回环。自己电脑上的浏览器访问自己电脑上的服务器使用的ip。
    + 局域网IP地址：192.168.112.10，局域网中区别其它电脑的ip地址
    + 外网IP地址：233.124.102.11，每个电脑在互联网世界中的唯一标识（查看自己的外网ip网址：ip138.com）

### 端口号
- 作用
    + 区别应用程序，每个应用程序打开后会占用电脑的一个端口号
    + 将来接收到数据以后如果要交给某个应用程序去处理
    + 只需要找到这个应用程序对应的端口号就行了
    + 所以端口号的应用就是用来给计算器上的每个应用程序加一个标识
- 端口号的特点
    + 多个软件不能用同一个端口，否则软件不能正常打开
    + 端口号的范围是：0~65535，一般0~1023是系统给自己预留的，程序员一般不能指定。
    + 常用端口
        * 80：HTTP服务器
        * 21：FTP(文件传输)
        * 443：HTTPS服务器
        * 3389：window远程桌面登录
        * 25：smtp邮件发送协议
        * 110：pop3邮件接收协议