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
//TODO

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

## nodejs安装
## 各种shell
## 环境变量
## nodejs中的核心模块
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