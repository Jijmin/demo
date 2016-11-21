### 公司项目从立项当开发完成经历什么流程？
- 公司部分
    + 开发部门
        * 后台
            - java
            - php
            - .net
        * 前端
            - IOS
            - Android
            - Web前端
                + web前端开发人员一般是通过交互稿和UI设计稿作为参考，最终利用HTML5/CSS3/JS完成整个系统的前端页面的展示
                + 在外面公司中，前端开发人员职责由两种
                    * 只要根据交互稿和UI设计稿将其翻译成静态页面即可，就要考虑到整个前端系统的优化(一定要用到gulp,grunt,webpack，里面的包其实就是需要nodejs去做支撑的)
                    * 前端人员不仅仅只是实现静态页面，还需要利用ajax去动态化其中的数据，并且，这个数据也有可能是后台提供的，也有可能是前端开发人员自己需要提供的
        * UI部门
            - 负责出平面图，懂一点点前端知识(html,css)
            - 设计出UI设计搞
        * 产品部门(做自己系统)/需求部门(外包)
            - 和客户去交流，你要将这个系统做成什么样子，里面有什么功能
            - 最终出一个需求人当，形成交互稿
        * 测试部门
        * 运营部门
        * 运维和维护部门
        
### 一个项目团队在做一个项目的流程
1. 在公司中有一个项目团队(web前端团队)
- 成员构成：主管(技术经理/项目经理1个)，高级工程师1个，中级工程师2个，初级工程师4个
- 主管->根据整个系统的业务分配模块和功能(项目框架的准备)，将来所有的开发者在这个项目框架上开发属于自己的那块功能
- 主管也会每天检查开发者的进度(SVN,git)
- 高级工程师，中级工程师负责这个系统的一些核心或者难点的业务功能
- 初级工程师就是参考人家写好的demo去写自己的业务功能即可
2. 在系统开发前应该设计好数据库
3. 要显示在页面上，但是前台不能直接去数据库取数据
4. 所以就需要前台API来连接
- 负责接收移动端这个前台系统的ajax请求
- 根据请求的需要去mysql数据库的某个表中将数据取出相应给ajax请求
5. 我们要通过后台管理系统对数据库里面的东西进行增删改查
- 利用orm这个包操作mysql数据库
- express这个web开发框架来开发后台系统中的所有页面
- 系统页面中的数据可以使用
    + ajax
    + xtpl模板
- UI使用的是Bootstrap

### 视频管理网后台管理系统项目根目录
│  .bowerrc            // 包安装工具bower 的配置文件 
│  .editorconfig       // 这个文件主要是告诉sublime,webstrom使用统一的风格去格式化代码
│  .gitignore          //git的忽略文件
│  gulpfile.js         // gulp入口文件
│  index.js            //整个项目入口文件
│  package.json        // npm 包管理配置文件
│  README.md           //项目说明文档,给git使用
├─dist                 // 项目工程化以后的存放文件，其子目录结构与src中的保持一致,将来发布系统的时候秩序给dist即可
├─node_modules         //存放项目中要用到的nodejs第三方包               
└─src                  //项目开发阶段源码存放区文件夹
    │ app.js          // 项目启动文件
    ├─controller       //用于存放控制器文件  
    ├─model             //用于存放模型文件 
    ├─rev               //gulp-rev插件自动生成的目录自动替换html中静态资源文件名称替换为的MD5名称
    │  rev-manifest.json
    ├─routes            //项目的路由文件
    ├─statics           //项目静态资源文件存放区
    │  ├─bowersrc       //利用bower工具安装的包都存放在这里（bower工具会自动生成）
    │  │  └─bootstarp   //后台管理系统UI组件 (按需)
    │  │  └─jquery      //jquery组件          (按需) 
    │  ├─css            //整个项目的样式文件
    │  ├─images         //整个项目的图片资源
    │  ├─js              //整个项目的js资源
    │  └─ueditor        //富文本编辑器整个源码 (按需)
    ├─tools             //用于存放整个项目的工具库 ，例如密码的MD5加密js文件
    └─views             //项目的所有视图文件存放区   

### 项目开发流程
1. 设计数据库(表和字段)
- userinfo表
    + uid->整形、长整形(int)标识为主键，同时设置为自增
    + uname->string(vachart(50))
    + upwd->string(vachart(50))
    + ustatus->int 1:停用 0:正常
    + email......
- videoinfo视频信息表
    + vid主键
    + vtitle标题
    + vsortno排序号
    + videoID视频ID
    + vsummery摘要
    + vremark(text)备注
    + vimg小图片
2. 搭建后台管理系统的框架(技术经理)
- MVC结构
- 确定好整个项目的文件夹结构
- 利用MVC和express来将整个系统的结构分离跑通，作为一个基本的结构供开发人员使用
- 将这个结构利用git进行版本管理

### 公司中针对src和dist目录的做法
- src是开发文件
- dist是正式发布以后的运行文件
- 但是在开发过程中有可能需要使用dist文件，所以dist和src被express执行监听的端口一定是不一样的，否则会出现端口冲突

### express开启网站服务器的步骤
1. 安装express `npm i express --save`
2. 导入express `var express=require('express')`
3. 实例化一个application
4. 设定路由规则
5. 监听端口

### package.json文件中的scripts中的作用
1. 在scripts中配置的代码可以使用npm run配置的key即可自动执行
2. 在外面开发系统的时候，一般会在scripts中配置两个key
3. "dev"：只要执行npm run dev 就会去执行src下面的代码
3. "dist"：只要执行npm run dist 就会去执行dist下面的代码
- 注意点：
    +由于package.json中的scripts中通过set PORT这种命令在window,linux,unxi中是不兼容的，所以要通过一个第三方包：cross-env
- cross-env使用方式
    + 要多看看npm的官网
    + 全局安装
    + 将set改成cross-env即可

### index.js的职责
1. 动态修改dist和src的端口
2. 获取通过换将变量设置到NODE_ENV的值
```
let env=process.env.NODE_ENV.trim();
```
3. 判断env到底是开发环境还是生产环境
```
if(env=='dev'){
    require('./src/app.js');
}else{
    require('./dist/app.js');
}
```
4. 我们开发过程中是在src文件下开发的
5. 但是需要将src中的代码拷贝一份到dist中
6. 我们有一个总的入口js去管理这些文件
7. src中和dist中都有一个不一样的服务器端口
8. 我们在index.js中需要去调用这些端口
9. 我们不能去改变那些源代码，只能去改变他们的配置文件
10. 在配置文件中我们设置了端口环境变量，在整个环境中是能找得到的
11. 在入口index.js中只需要执行一次判断，我们真正需要的是那个端口
12. 但是在src拷贝到dist后，端口还是一样的，我们需要去更改端口
13. 我们可以将端口设置为一个变量，通过查找配置文件中的端口赋值

### app.js的职责
1. 仅仅是开启一个web服务器 而已
2. 不用关心处理路由、业务逻辑以及视图什么的

### 服务器开启的流程
1. `npm run dev`
2. 自动去package.json中查找scripts节点下是否有一个叫做dev的命令，有则执行
3. cross-env PORT=8877 NODE_ENV=dev node ./index.js
4. index.js
5. 判断如果process.NODE_ENV=='dev'则执行./src/app.js，否则执行./dist/app.js
6. 将orm中的模型数据全部在app.js中进行绑定到req对象中，将来这个req对象中有userinfo、cideoinfo
7. 完成web服务器的启动工作

### 项目工程自动化(脚手架)
- gulp
- 项目中我们要利用gulp做的事情就是网站的优化
    + JS压缩(注意：一定要保证压缩的文件是es5语法写的，如果不是，用gulp-bable转换)
    + CSS压缩
    + image压缩
    + CSS文件添加md5的后缀(site.css->site-sdfsxxc.css)(只要是这个静态资源的内容有改变，就会导致文件名称md5那段字符串改变)
        * 为什么要这样做？
        * 原因是：我们系统中的CSS和JS和图片被浏览器访问过一次以后就会缓存，当服务器的css改变了以后可能不会被浏览器重新加载过来，会导致功能看不到，这个时候一般通过ctrl+f5在浏览器中请求缓存刷新
        * 浏览器缓存的原理：如果请求的静态资源url不改变的话，则会缓存这个数据，http://127.0.0.1:8888/js/test.js->浏览器第一次请求的时候是从服务器来的，当浏览器第二次请求http://127.0.0.1:8888/js/test-1133.js的时候，由于url没有改变，则直接从浏览器自身的缓存中取得
        * css文件的添加md5后缀的作用主要是用来：防止浏览器对于这个文件的缓存，cdn(内容分发网络)也是用来做静态资源缓存的
        * 利用gulp实现文件拷贝
        * 利用gulp的插件是吸纳自动化将html中的css的应用路径进行替换

### gulp的使用回顾
- gulp的入口文件是:gulpfile.js
- gulp的api
    + task
    + src
    + pipe
    + dest
- 使用步骤：
    + 在项目的根目录下建立一个gulpfile.js的文件
    + 安装gulp
        * 全局安装`npm i gulp -g`
        * 本地安装`npm i gulp --save-dev`
    + gulpfile.js导入gulp包
    + 根据不同需求导入不同的gulp插件包使用即可
- 执行
    + gulp指定任务名称

### 总结
- 数据库的设计
- 搭建框架
    + 分析确定框架的目录结构
        * src：用于开发使用
        * dist：用于生产环境使用(发布以后的使用)，所以在这个dist目录中的所有文件都是经过gulp进行压缩处理了的，将来真正在互联网上请求的静态资源的大小一定要远远小于开发环境中的资源的大小，那么服务器的响应速度会加快很多，达到网站优化的目的
            - 复习gulp的使用
            - 学习了gulp-babel插件的使用，作用是将es6语法转换为es5语法
    + controller->服务业务的逻辑处理
        * 数据库的操作(orm)
        * 页面的渲染(xtpl)
    + routes->负责设定路由对象，并且在路由对象上设定路由规则，同时调用Controller中的控制器js进行业务逻辑的处理
    + view
    + app.js->作用:利用express开启一个web服务器
        * 当浏览器请求的时候，就会根据routes文件夹中已经设定好的路由对象自动截获
        * 在app.js中要初始化orm对象中的模型数据
        * 在app.js中通过app.use(express.static());将static文件夹当做项目的静态资源文件夹
    + index.js->整个系统的入口，是执行npm run dev或者npm run dist的时候自动执行
        * 在package.json中的scripts节点中加入了dev和dist指令
        * 设定看环境变量：NODE_EVN ,PORT
        * set PORT=7788 由于set指令 是不能跨平台（跨操作系统）的，所以我们利用了cross-env来替代set进行跨平台的环境变量设置
        
### 自己做的步骤：
1. 将我发给大家的node_modules这个文件夹放到你要开发这个项目的父亲级中
2. 在项目中创建：src和dist两个目录
3. npm init -y 生成一个package.json文件
4. 在package.json中的scripts节点中增加
- "dev":" cross-env PORT=8877 NODE_EVN=dev nodemon ./index.js" ,
- "dist":" cross-env PORT=8878 NODE_EVN=dist nodemon ./index.js" 
- 注意：一定要保证在你们的机器上，执行了 : npm install cross-env -g 和 npm install nodemon -g
5. 在项目根目录下建立一个 index.js文件（内容可以参考我的）
6. src下创建一个app.js文件
- 利用express先开启web服务器再说,将这个简单的服务器跑通以后，进入下一步
- 路由规则和控制器的分离 （routes,controller文件）
- 初始化orm
- 将statics目录当做静态资源文件的目录
7. 利用gulp进行自动化工作(将src中的代码通过压缩处理以后拷贝到dist的相同目录中)

### 补充问题讲解：
npm i express:不会存在依赖关系
npm i express --save  存放在： 
```
"dependencies": {
   "myfirstmodel": "0.0.2"
 }
```
npm i express --save-dev存放在：
```
"devDpendencies": {
  "myfirstmodel": "0.0.2"
}
```
当一个项目没有node_modules的时候，我们只要执行npm install它就会自动去查找package.json文件中的devDpendencies和dependencies中的所有包下载安装好如果只想下载dependencies中的所有包 ，应该使用 npm install -production

