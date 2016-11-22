# 视频播放项目
## 项目文件夹搭建
### project文件夹
1. 新建一个src文件夹，用来存放我们的测试的文件
2. 新建一个dist文件夹，用来存放我们处理后上线的文件
3. 建立一个index.js文件是我们的整个项目的入口点
4. 因为我们安装了node环境，用shell自动生成一个配置文件
5. `npm init -y`如果当前文件夹有中文，只能手动配置

### package.json文件设置
1. package.json中的scripts属性是配置文件中的配置文件
2. 对scripts进行配置，设置两个key，到时候只要执行`npm run 配置的键`就可以运行
3. "dev"：只要执行npm run dev 就会去执行src下面的代码
4. "dist"：只要执行npm run dist 就会去执行dist下面的代码
5. dist文件夹下的东西是对src的压缩和混淆，其他基本一样，相当于拷贝一份
6. 所以我们创建的服务器的端口是要不一样的，一般测试的是单数，上线的是双数端口
```
"dev":" cross-env PORT=8876 NODE_EVN=dev nodemon ./index.js" ,
//在shell中可以直接运行npm run dev就会执行这里面的代码
//cross-env是一个可以跨平台设置的环境变量的包，需要全局安装
//nodemon包是可以自启动服务器，也是需要全局安装
"dist":" cross-env PORT=8878 NODE_EVN=dist nodemon ./index.js" 
//在dist中我们将端口号设置为双数
```
7. 我们需要在全局环境下安装cross-env和nodemon包

### index.js
1. index.js的职责是这个项目的统一入口
2. 获取通过环境变量设置到NODE_EVN的值
```
"use strict";
let env=process.env.NODE_EVN.trim();
```
3. 判断当前执行的是开发环境还是工厂环境
```
if(env=='dev'){
    //开发环境
    require('./src/app.js');
}else{
    //生产环境
    require('./dist/app.js');
}
```

### src文件夹
1. app.js的职责是搭建开发环境的服务器
2. 我们是用express来搭建框架的，因此我们需要安装express`npm i express --save`
3. 导入express`let express=require('express');`
4. 实例化一个application
5. 初始化orm模型数据，orm是一个将数据库中的数据取出，转换成一个数组，里面是一个个对象，[{'uid':'1','uname':'admin':'upwd':'123456'},{......}]
```
const orm=require('orm');
app.use(orm.express('mysql://root:root@127.0.0.1:3306/nodedb',{
    define:function(db,models,next){
        models.userinfo=db.define('userinfo',{
            uid:{type:'serial',key:true},
            uname:String,
            upwd:String,
            ustatus:Number
        });
        models.videoinfo = db.define('videinfo',{
            vid:{type:'serial',key:true},
            vtitle:String,
            vsortno:Number,
            vvideid:String,
            vsummary:String,
            vremark:String,
            vimg:String
        });
        next();
    }
}));
```
6. 将网站的statics这个文件夹当做系统的静态资源文件夹
```
let phyPath=__dirname+'/statics';
app.use(express.static(phyPath));
```
7. 我们需要在src目录下设置静态资源存放区域
8. 设定路由规则
```
const accountRoute=require('./routes/accountRoute.js');
app.use('./account',accountRoute);
```
9. 监听端口
```
app.listen(port,()=>{
    console.log('express 服务器启动'+port);
});
```
10. 到时候我们需要将src中的文件拷贝到dist中，端口只能设置为变量
```
let port=process.env.PORT || 8877;
```
11. 服务器开启完毕，我们需要对具体的路由进行设置
```
"use strict";
const express=require('express');
let route=express.Router();
let accCtrl=require('../controller/accountCtrl.js');
route.get('/test',accCtrl.test);
module.exports=route;
```
12. 路由可以对页面进行跳转，在上面我们提供给了accCtrl一个test方法
```
"use strict";
exports.test=(req,res)=>{
    //...
}
```
13. 将查询到的信息用模板显示在页面上
```
"use strict";
const xtpl=require('xtpl');
const path=require('path');
exports.test=(req,res)=>{
    //设置请求头
    res.setHeader('Content-Type','text/html;charset=utf-8');
    req.models.userinfo.find({},{},(err,datas)=>{
        //读模板，需要读取的路径是当前文件
        xtpl.renderFile(path.join(__dirname,'../view/test.html'),{arr:datas},(err,html)=>{
            if(err){
                res.end(err.message);//将错误消息的摘要响应到浏览器 (aa is not function)
                console.log(err);//详细的错误堆栈信息打应到cmd面板上
                return;
            }
            res.end(html);
        });
    });
}
```

### 问题
总的来说程序没有报错，但是数据取不出来，推测应该是orm包没有下载好。