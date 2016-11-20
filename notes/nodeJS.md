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

## net核心模块
### 使用net创建一个服务器的步骤
1. 引入net核心模块
```
"use strict";
const net=require('net');
```
2. 创建一个服务器对象
```
let socketServer=net.createServer();
```
3. 开启服务：一旦有客户端连接，就会触发这个事件中的回调函数
```
socketServer.on('connection',(socket)=>{
    //socket是回调函数的参数的作用是服务器的socket
    //这个参数
    //console.log('有客户端连接');
    socket.write('hello client');//如果写中文在cmd中显示是乱码
});
```
4. 开启监听
```
socketServer.listen('8888','127.0.0.1',()=>{
    console.log('服务器已经开启监听');
});
```
5. 要在自己本机上模拟，需要在电脑里面的【程序和功能】->【打开或关闭Windows】，打开telnet   
```
telnet 127.0.0.1 8088//cmd中
```

### 使用net创建一个客户端
1. 引入Net模块
```
"use strict";
const net=require('net');
```
2. 设置要连接的服务器的IP和端口号
```
const ip='127.0.0.1';
const port=8090;
```
3. 建立连接，如果成功就可以与服务器进行交流，返回值socket
```
let socket=net.createConnection(port,ip,()=>{
    console.log('已经连接上服务器');
});
```
4. data事件接受接受服务器发送过来的信息，在服务器发送信息给客户端时触发
```
socket.on('data',(content)=>{
    console.log(`服务器：${content}`);
});
```
5. 解决客户端突然掉线的bug，在服务器上加一个解决错误的办法
```
socket.on('error',()=>{
    console.log('有客户端掉线了');
});
```
6. 在服务器端得到所有客户端的信息
```
//socket.remoteAddress
//socket.remotePort
console.log(`有服务器连接上来了，IP地址为：${socket.remoteAddress}，端口为：${socket.remotePort}`);
```

### 问答机器人
1. 引入Net模块
```
"use strict";
const net=require('net');
```
2. 创建服务器socket对象
```
var socketServer=net.createServer();
```
3. 开启服务器
```
socketServer.on('connection',(socket)=>{
    console.log('有客户端连接上来了');
    socket.write('我是Nacy，很高兴为您服务');
});
```
4. 进行监听
```
socketServer.listen(8090,'127.0.0.1',()=>{
    console.log('服务器已开启');
});
```
5. 编写客户端
```
"use strict";
const net=require('net');
```
6. 得到IP和端口号
```
const ip='127.0.0.1';
const port=8090;
```
7. 建立连接
```
var socket=net.createConnection(port,ip,()=>{
    //...
});
```
8. 监听服务器的数据
```
socket.on('data',(content)=>{
    console.log(`服务器：${content}`);
});
```
9. 在客户端添加一个输入事件
```
process.stdin.on('readable',()=>{
    //先得到用户输入的内容
    var msg=process.strin.read();
    if(msg!=null){
        //将输入的信息发送到服务器
        socket.write(msg);
    }
});
```
10. 处理掉线异常
```
socket.on('error',()=>{
    console.log('客户掉线');
});
```
11. 当客户端发送信息过来时会触发data事件
```
socket.on('data',(content)=>{
    //console.log(`客户端说：${content}`);
    //处理用户发送过来的信息
    var msg=content.toString().trim();
    //第12步
});
```
12. 判读用户输入的内容
```
if(msg!=''){
    switch(msg){
        case 'hi':
            socket.write('hello');
            break;
        //...
        default:
            socket.write('不清楚你再说什么');
            break;
    }
}
```

### 编写一个小型聊天工具
1. 服务器
- 将来客户端发给服务器的信息只能是：
- 登录：{'do':'login','userName':'name'}
- 发送信息：{'do':'sendMsg','content':'要发送的内容','sendUse':'sueName'}
- 引入net模块
- 定义ip地址和端口号
- 搭建服务器
- 监听用户连接之后的操作
- 得到客户端输入的信息
- 判断输入的内容非空，将二进制转换成字符串，去空格
- 将字符串转换为一个对象
- 判断当前的操作，是登录还是聊天
2. 负责处理客户端发送过来的信息
- 新建一个文件专门负责处理客户端发送过来的信息
- 添加一个方法主要负责处理登录逻辑
- 如果没有登录，就选择登录
- 如果用户登录，就直接跳出
- 创建一个对象用来保存我们登录的所有的用户对象
- 得到当前contentObj中的登录对象
- 判断当前这个登录的对象是否在user对象中存在
- 进行遍历判断，如果当前用户在user中，说明已经登录了，我们不能让他再次登录
- 用传进来的socket返回给用户一个信息，还要将函数返回
- 如果用户没有登录，就将用户的登录信息保存到对象中
3. 编写一个用于处理客户端与客户端之间的信息传递的方法
4. 将两个处理方法返回出去
5. 在服务器中引用这两个方法
- 在判断函数中调用我们的处理方法
- 处理掉线问题
6. 客户端A
- 引入net模块
- 得到ip和端口号
- 建立联系，给一个特定格式的提示信息
- 监听服务器的数据
- 给用户端添加一个输入事件
- 得到用户输入的内容
- 非空的情况下，将输入的信息发送给服务器
7. 测试时，连续登陆时都是"登陆成功"解决
- 在对处理客户端发送过来的信息的时候
- 不应该用for-in遍历，应该先判断当前这个登录的用户名是否存在
- 如果非空，就在客户端显示提示信息，并返回函数
8. 再次开一个客户端时，登录时在另一个地方显示已经登录，这边不处理的解决办法
- 取值时，单词错误
9. 处理客户端与客户端的信息传递
- 得到用户之间发送的信息
- 得到要发送的对象的username
- 通过username得到对应的socket
- 通过服务器与要接受到的对象保留的socket进行通讯

### 整理小型聊天工具
1. 我们要编写一个小型聊天工具
2. 用户A要给用户B发送消息，应该通过服务器来处理
3. 创建一个服务器
4. 在nodeJS中我们需要使用TCP，引入一个net模块，
```
"use strict";
const net=require('net');
```
5. 在创建服务器时，需要给外界服务器的ip地址和端口号，其他用户才能找的到
```
const ip='192.168.114.51';
const port=8888;
```
6. 搭建一个服务器
```
let socketServer=net.createServer();
```
7. 开始监听需要的ip和端口号，监听到，表明服务器真正的创建成功
```
socketServer.listen(port,ip,()=>{
    console.log('服务器开启成功');
});
```
8. node是事件驱动，我们创建的服务器需要等待在那，监测用户连接服务器以及通过socket发送过来的信息
```
socketServer.on('connection',(socket)=>{
    socket.on('data',(content)=>{
        //...
    });
});
```
9. 我们事先就规定用户的输入格式，当用户发送过来后我们就要对数据进行处理
10. 但是在处理数据之前，我们需要做有个异常处理，这样优化我们用户体验
```
try{
    //正常代码
}catch(error){
    //获取客户端真实的ip地址
    console.log(socket.remoteAddress);
}
```
11. 这里假设用户输入了数据，我们需要对用户的输入进行判断
12. 我们电脑中是通过二进制进行传输数据的
13. 在非空的情况下，将用户传送过来的二进制数据转换成字符串，并且需要去掉空格
```
if(content!=null){
    let msg=content.toString().trim();
}
```
14. 将字符串转换成一个JSON对象
```
let obj=JSON.parse(msg);
```
15. 通过用户传入的字符串进行判断，是登录还是聊天
```
switch(obj.do){
    case 'login':
        //登录
        break;
    case 'sendMsg':
        //聊天
        break;
    default:
        socket.write('您输入的指令为空，请重新输入');
        break;
}
```
16. 专门用一个js来封装一个用户消息的处理
17. 定义一个对象用来存储登录的用户的socket
```
let user={};
```
18. 添加对用户登录处理函数
```
function processLogin(contentObj,socket){
    //...
}
```
19. 得到当前登录中的对象
```
let userName=contentObj.userName;
```
20. 判断当前这个用户是否在user对象中
```
let objSocket=user[userName];
    if(objSocket!=null){
        socket.write('您已经登录');
        return;
    }
```
21. 如果用户没有登录，需要将用户的socket保存在user对象中
```
user[userName]=socket;
socket.write('登录成功');
```
22. 在服务器中引入我们对用户信息处理的模块
```
const processMsg=require('./processMsg.js');
```
23. 在选择语句中对函数进行调用
```
processMsg.processLogin(obj,socket);
```
24. 在客户端要获取到服务器的消息，一样也需要与服务器进行连接
```
"use strict";
const net=require('net');
const ip='192.168.114.51';
const port=8888;
```
25. 建立连接，输出提示用户数据输入格式的信息
```
let socket=net.createConnection(port,ip,()=>{
    console.log("如果需要登录，请输入{'do':'login','userName':'用户名'}'格式");
    console.log("如果需要发送信息，请输入{'do':'sendMsg','content':'要发送的内容','sendTo':'发给谁'}'格式");
});
```
26. 服务器如果处理，客户端会收到服务器发送的消息，事件驱动表示我们客户端也需要监听服务器发送给我们的数据
```
socket.on('data',(content)=>{
    console.log(`${content}`);
});
```
27. 现在我们需要实现用户可以输入的问题，用户输入，就可以将数据传送给服务器
```
process.stdin.on('readable',()=>{
    //得到用户输入
    let msg=process.stdin.read();
    if(msg!=null){
        //将输入的信息发送给服务器
        socket.write(msg);
    }
});
```
28. 然后服务器就有了数据，可以进行判断
29. 添加一个对用户掉线处理
```
socket.on("error",()=>{
    console.log("掉线了");
});
```
30. 现在用户可以给指定的人发送消息了，在服务器选择模块就可以完善选择模块
```
processMsg.processSendMsg(obj);
```
31. 在处理用户输入模块实现发消息的功能
```
function processSendMsg(contentObj){
    //...
}
```
32.  得到用户之间发送的消息
```
let msg=contentObj.content;
```
33. 得到要发送的对象
```
let userName=contentObj.sendTo;
```
34. 获取要发送对象的socket
```
let socket=user[userName];
```
35. 我们就可以向对应那个socket的用户发消息了
```
socket.write(msg);
```
36. 将方法暴露出去
```
module.exports={
    processLogin: processLogin,
    processSendMsg: processSendMsg
};
```
### JSON数据要用双引号，不能使用单引号

### 在循环比较中不能使用let声明

## HTTP
### 浏览器两次连接服务器
1. IP地址请求了一次服务器
2. 页面的头部的小图标favicon

### HTTP特点
1. http协议是无状态的
2. http请求方法：*get*、*post*、put、delete..... 
3. 请求报文
- 请求报文行
- 请求报文头
- 固定换行
- 请求报文体
4. 响应报文
- 响应报文行
- 响应报文头
- 固定换行
- 响应报文体

### 模仿响应报文
1. 响应报文行
```
//HTTP/1.1 200 OK
//HTTP/1.1：当前服务器遵守的协议版本
//200 OK:响应状态码(成功)
//404 Not Found:未找到资源
//500 :服务器错误
```
2. 创建一个字符串用来存放响应报文字符串
```
let responseString="HTTP/1.1 200 OK\r\n"
```
3. 响应报文头
```
//Conent-Type:text/html;charset=utf-8
//Content-Length:198196
```
4. 存入响应报文头
```
let msg="hello world";
responString+="Conent-Type:text/html;charset=utf-8\r\n";
responString+="Content-Length:"+msg.length+"\r\n";
```
5. 固定换行
```
responString+="\r\n";
```
6. 设置请求报文体
```
responString+=msg;
```

### HTTP核心模块
1. 引用我们的HTTP核心模块
```
"use strict";
const http=require('http');
```
2. 创建服务器对象
```
let server=http.createServer();
```
3. 监听浏览器的请求
```
//request：将来浏览器发送到服务器时，会触发这个事件中的回调函数
server.on('request',(req,res)=>{
    console.log('有新的请求');
    res.end("这是服务器返回的内容");
});
```
4. 开启监听
```
server.listen(8888,'127.0.0.1',()=>{
    console.log("服务器已经开启");
});
```
5. 简化版
```
http.createServer((req,res)=>{
    console.log('有新的请求');
    res.end("这是服务器返回的内容");
}).listen(8888,'127.0.0.1',()=>{
    console.log("服务器已经开启");
});
```
6. req:request(请求)就是浏览器发送给服务器的信息的对象
7. res:response(响应)就是服务器发送给浏览器新的的对象

### request
- req：在http模块中对应的一个http.IncomingMessage
- headers：得到当前请求的请求报文头，整个头部的所有的内容(对象)
- rawHeaders：得到当前请求的请求报文头(数组)
- httpVersion：得到当前请求的http版本号
- method：得到当前的请求方式
- statusCode：得到当前请求的状态码
- statusMessage：得到状态码对应的信息
- url：得到当前请求的路径

### response
- res：在http模块中对应的一个http.ServerResponse
- setHeader：设置响应报文头的属性(Content-Type、Content-Length)
    + Content-Type设置当前文件的解析格式
    + text/html这段文件以html的方式来解析
    + text/plain以文本的形式输出
    + application/x-png以图片的png格式输出
- write：向页面输出内容，但是不能单独使用，必须在后面加上一个end方法
- end：标志着响应结束，将来在end后放的代码不会执行

### 搭建一个网站
1. 引入核心文件
```
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
```
2. 创建服务器
```
http.createServer((req,res)=>{
    //...
}).listen(8888,'127.0.0.1',()=>{
    console.log('服务器已经开启');
});
```
3. 得到浏览器请求的URL
```
let url=req.url;
```
4. 判断当前的请求页面
```
if(url == "/" || url.includes("index")){}//index.html/default.html/main.html
```
5. 根据url去找到对应的的页面
```
fs.readFile('./page/index.html',(err,data)=>{
    if(err){
        console.log("读取失败");
        return;
    }
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end(data);
});
```
6. 同样我们一样也需要对css文件进行加载
```
else if(url.includes(".css")){//这个逻辑专门用来返回css文件
    //得到当前请求要的css文件名和后缀后
    let fileName = path.basename(url);//index.css
    //找到服务器中的index.css文件
    fs.readFile("./page/css/"+ fileName,(err,data)=>{
        if(err){
            console.log("读取失败");
            return;
        }
        res.setHeader("Content-Type","text/css; charset=utf-8");
        res.end(data);
    });
}
```
7. 但是我们在页面中的数据是固定的，一般的情况下，数据是从后台获取的，我们这里将数据放入JSON文件中
```
[1,2,3,4,5,6,7]
```
8. 在HTML中插入模板
```
<ul>
    ${lis}
</ul>
```
9. 在服务器模块我们就要对那个插值模板进行处理
```
let arr=require('./page/data.json');
```
10. 遍历生成li标签
```
let liStr='';
for(let i=0;i<arr.length;i++){
    liStr+='<li>'+arr[i]+'</li>';
}
```
11. 替换掉data中的字符串${lis}
```
let content=data.toString();
content=content.replace('${lis}',liStr);
res.setHeader('Content-Type','text/html; charset=utf-8');
res.end(content);
```
12. 使用第三方插件搭建模板
```
const xtpl=require('xtpl');
//第一个参数：设置模板的路径
//第二个参数：一个数据对象，这个对象将来会通过第三方模板传到模板，在模板中我们可通过第三方模块的语法来操作这个数据 
//第三个参数：当模板中的内容自动替换完成以后会执行的回调函数  error:异常  content:就是替换完动态数据以后页面的内容
xtpl.renderFile('./page/index.html',{arr:require('./page/data.json')},function(error,content){
    if(error){
        console.log("读取文件错误");
        return;
    }
    res.end(content);
});
```
13. 在HTML中添加模板
```
{{#each(arr)}}
    <li>{{this}}</li>
{{/each}}
```

### HTTP协议
1. HTTP是无状态的
- http中的状态维持
    + cookie
    + session
2. 请求方式
- get 
    + `<a href="path"></a>`
    + `window.location`
    + `<form method="get"></form>`
- post
    + `<form method="post"></form>`

## Express框架学习
### 创建服务器
1. 创建配置信息`npm init -y`
2. 下载express`npm i express --save`
3. 导入express包
```
"use strict";
const express=require('express');
```
4. 利用express对象创建一个application对象app(现对于服务器对象)
```
let app=express();
```
5. 开启监听
```
app.listen('8888',127.0.0.1,()=>{
    console.log("服务器开启成功");
});
```
6. 创建一个get的路由请求：list
```
app.get('/list',(req,res)=>{
    res.end('list请求成功');
});
```
7. 不管是get还是post，都可以获取的到，用的最少
```
app.all('/all',(req,res)=>{
    let method=req.method
    res.end('all请求成功'+method);
});
```

### 使用router方法进行路由的分类
1. 利用router方法进行路由分类
- 引包
- 创建app对象
- 创建一个路由对象
```
let mainRout=express.Router();
```
- 开始设置路由
```
mainRout.get('/list',(req,res)=>{
    res.end('list请求成功');
});
```
- 将mainRout加载到app对象中
```
app.add('/',mainRout);
//app.add()方法中第一个参数可以设置统一路由，即第一个参数可以为/man，那么上两个方法中不用加man了。
```
- 开启监听
- 路由在使用的时候我们可以设置统一的路径
```
app.use('/woman',mainRout);
```

### 使用router将页面分离
1. 我们要将两种不同类别的文件分离出来
2. 导入express包
3. 创建一个router对象
4. 设置请求路由
5. 将设置好的页面暴露出去
```
module.exports=router;
```
6. 使用router
```
app.use('/woman',womanRout);
```

### 多个回调函数的执行时机
1. 当程序运行到第一个回调函数时，执行函数代码
2. 当第一个回调函数执行完毕以后，返回这个函数中的next
3. 如果有就执行第二个回调函数，如果没有，就结束
```
app.get('/list',(req,res,next)=>{
    var isLogin=true;
    if(isLogin){
        console.log("处理登录完成");
        next();//调用下一个回调
    }else{
        res.end("您还没有登录，请登录");
    }
},(req,res)=>{
    //...
});
```

### 使用通配符设置统一路由
在所有的同一路由下面的方法中有设置一个有通配符来匹配，可以在执行其它方法之前先执行通配符中的方法，执行完成以后执行next()可以继续执行下面的请求。
```
app.get('/admin/*',(reg,res,next)=>{
    res.wrote('这是统一的处理逻辑');
    next();
});
app.get('/admin/list',(req,res)=>{
    res.end('2.0 /admin/list');
});
```

### Express处理静态资源
1. 搭建服务器框架
2. 将所有的静态资源放置在同一个目录下：static的文件夹下
3. 加载静态资源所在的文件夹，路径是绝对路径
```
app.use(express.static('./static'));//单独的斜杠是指当前目录的盘符
```
4. 一旦设置好了统一的路径，不要再加上static，会报错
5. 如果静态资源不在文件夹下，可以设置多静态资源目录
```
app.use(express.static('./musics'));
```

### 小案例：改造音乐播放器

## MySQL
### 安装
1. 作用：用来存储数据，它提供了一些对数增删改查的方法。
2. 数据库为了操作方便：安装分为两步
- 安装mysql
    + 选择安装包
    + 当选项进入下面选项时只需要安装防止占用过多内存，可以只安装：server only
    + 设置将来登录的密码
- 安装管理工具

### 操作数据库
1. 概念的理解
- mysql：数据库管理工具
- dbForge Studio for MySQL:mysql的可视化管理工具
- 数据库：用于保存动态数据
- 表：一个数据库中有多个表，每个表用于保存一种类型的数据
- 字段：一个表中有多个字段，每个字段表示的是这条数据的一个属性
- 字段类型
    + Int---->整数
    + Varchar(255)--->字符串
    + Text---->1G以上的数据
    + Date--->日期类型
    + Time --->时间类型
    + Datetime--->日期时间
    + 自动增量(AUTO_INCREMENT)
    + 是否允许为空 Allow nulls
2. 使用ORM框架对数据库进行查询
- 安装orm包 ：npm install orm mysql –save
- 参考网站：https://www.npmjs.com/package/orm
- Orm 依赖于mysql的第三方包，一定要注意
- Orm结合express框架的使用代码样例
```
const express = require('express');
//导入ORM包
const orm = require("orm");
let app = express();
//连接mysql数据库
app.use(orm.express("mysql://root:123@localhost:3307/main", {
//models将来会自动赋值到req对象中，并且req对象中还有一个db对象
//下面的方法定义好这后，相当在req对象中添加一个modules对象，这个对象中的users属性，有数据库中的users表里的所有数据，如果将来要操作users表，只需要操作modules的users属性就行了。
    define: function (db, models, next) {
        models.users = db.define("users", {
             uid : { type: 'serial', key: true },
             uname:String,
             upwd:String,
             uqq:String,
             uemail:String
         });
        next();
    }
}));
```
- find()
    + 查找所有的user表数据
    ```
    req.models.users.find(条件,回调函数(err,data)=>{});
    let where = {};
    req.models.users.find(where,(err,data)=>{
    //data:js中的一个对象（此处是一个[{uid:1,uname:,upwd,uqq,uemail},{},{}]）
        res.end(JSON.stringify(data));
    });
    ```
    + 带条件查找
        * 查找满足一个条件的数据
        ```
        req.models.users.find({uid:1},(err,data)=>{
            res.end(JSON.stringify(data));
        });
        ```
        * 查找满足多个条件的数据
        ```
        req.models.users.find({uid:1,uname:'admin'},(err,data)=>{
            res.end(JSON.stringify(data));
        });
        ```
        * 查找包含某些关键字的数据
        ```
        req.models.users.find({uname:orm.like('%va%')},(err,data)=>{
            res.end(JSON.stringify(data));
        });
        ```
        * 查找一个范围的数据
        ```
        req.models.users.find({uid:[1,2]},(err,data)=>{
            res.end(JSON.stringify(data));
        });
        req.models.users.find({uid:orm.gt(3)},(err,data)=>{
            res.end(JSON.stringify(data));
        });
        ```
        * 查找前几条数据
        ```
        req.models.users.find({},{limit:3},(err,data)=>{
            res.end(JSON.stringify(data));
        });
        ```
        * 查找后几条数据
        ```
        req.models.users.find({},{offset:1,limit:2},(err,data)=>{
            res.end(JSON.stringify(data));
        });
        ```
        * 将数据排序
        ```
        //asc:升序  -> A
        //desc：降序  -> Z
        req.models.users.find({}, [ "uid", "Z" ],(err,data)=>{
            res.end(JSON.stringify(data));
        });
        ```
3. 新增数据：create()
```
req.models.users.create({
   uname:'zhangsan',
   upwd :'123',
   uqq:'234',
   uemail:'sdf@qq.com'
},(err,user)=>{
    res.end('新增成功');
});
```
4. 修改数据
- 根据主键修改 :uid =6
```
req.models.users.get(6,(err,user)=>{
  //修改user.upwd='1'
  user.upwd = '1';
  //将修改以后的值保存会数据库
  user.save((err,item)=>{
      res.end('update success');
  });
});
```
- 修改数据修改
```
req.models.users.find({uname:'ivan'},(err,user)=>{
  //user ->数组中只有一个对象
  user[0].upwd= '2';
  //将修改以后的值保存会数据库
  user[0].save((err,item)=>{
      res.end('update success');
  });
});
```
5. 删除数据 ：先查找出来，再remover
- 根据主键来删除数据
```
req.models.users.get(5,(err,user)=>{
      //user ->js对象而不是数组
      user.remove((err)=>{
          res.end('delete success');
      });
});
```
- 根据条件来删除数据
```
req.models.users.find({uname:'lisi'},(err,user)=>{
  user[0].remove(err=>{
      res.end('delete success');
  });
});
```

### 案例
