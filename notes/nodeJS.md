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

## nodejs中的核心模块
## 文件模块
## 通过npm来下载和上传文件模块
## ES6中的新特性
## 通过nodejs的核心模块来操作本地磁盘上面的文件
## 同步与异步
## 事件驱动
## socket
## 小型聊天室
## HTTP协议
## 通过nodejs的一些核心模块
## 我们自己开发一个web服务器
## 音乐点播网站
## express框架
## 改造音乐点播
## mysql：数据库(安装)，增删改查
## orm框架：通过nodejs模块来对数据库进行增删改查