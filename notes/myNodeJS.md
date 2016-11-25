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
- 总的来说程序没有报错，但是数据取不出来，推测应该是orm包没有下载好。
- 解决办法：今天回过头去看看，发现其实是数据库中建立的表是user表，但是取的时候是userinfo，一直就取不出来数据。

### 用gulp管理(src拷贝到dist)
1. 在项目的根目录下建立一个gulpfile.js的文件
2. 因为要用gulp管理，因此我们需要安装gulp`npm i gulp --save-dev`
3. 在gulpfile.js文件中引入gulp包
```
'use strict';
const gulp=require('gulp');
```
4. gulp管理后的提示
```
gulp.task('default',[],()=>{
    console.log('任务完成');
});
```
5. gulp进行JS压缩以及拷贝
```
//JS压缩
const minjs = require('gulp-uglify');
const es6toes5 = require('gulp-babel');
gulp.task('minjs',()=>{
    //将js文件压缩，将src目录结构拷贝到dist中
    gulp.src(['./src/controller/*.js','./src/routes/*.js','./src/model/*.js'],{base:'src'})
    .pipe(es6toes5({presets: ['es2015']}))//表示将 js文件由es6转换成es5
    .pipe(minjs())//压缩
    .pipe(gulp.dest('dist'));
    console.log('压缩完毕');
});
```

### 用git将项目管理起来
1. 在项目文件夹下的package.json中添加依赖项
2. 通过`git bash`中的`git init`初始化仓库
3. `git add .`将文件提交到暂缓区
4. `git commit -m 'add'`提交
5. 在githup上新创建一个仓库，中间的`.gitignore`设置为`node`
6. 将设置好的`.gitignore`文件内容拷贝一份到本地的`.gitignore`中
7. `git remote add origin master git仓库地址`取一个别名

### 维护一致的编码风格
在项目根目录中添加.editorconfig文件在其中固定所有的代码风格，那么所有的编辑器就会自动读取这个文件
```
# EditorConfig is awesome: <a onclick="javascript:pageTracker._trackPageview('/outgoing/EditorConfig.org');" href="http://EditorConfig.org">http://EditorConfig.org</a>

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,html,css}]
charset = utf-8

# Tab indentation (no size specified)
[*.js]
indent_style = tab
tab_width = 4
```

### 列表静态页面设计
1. 后台几乎所有的页面都有一个公共的头部和左侧菜单栏
2. 只有中间的内容不一样，我们可以在改变的地方放置一个占位符
3. 另外新开页面写上我们的改变的内容
4. 新的页面采用继承模板的形式
5. 在静态资源区建立一个index.html文件
6. 因为采用的是Bootstrap技术，我们引入Bootstrap的公共模板
7. 应该先将页面进行分析，在进行布局

### 用git不能提交上去的问题
- 问题描述：将项目提交到githup上面进行托管的时候仓库拒绝访问
- 解决办法：因为在githup上面的仓库里面是存在文件的，直接让自己的仓库和远程的连接，出问题。
- 可以将仓库变成一个空仓库，README和忽略文件都不要有，再将自己的仓库和远程的连接，这样才能连接。
- 还可以先将远程仓库克隆下来，再将自己的文件拷贝到克隆下来的仓库，在进行提交，一样可以连接。

### 主页模块分离
1. 我们登录进来后看到的页面都是一块一块平凑而来
2. 我们要将中间部分分离成一个单独的模块
3. 新建一个页面layout作为公共的模板
4. 将要改变的部分提取出来，放上一个占位符
```
{{{block('body')}}}
```
5. 使用xtpl替换模板
6. 在list页面里面先将layout页面中公共的部分继承过来
```
{{extend('./layout.html')}}
{{#block('body')}}
//我们要替换的部分
{{/block}}
```
7. 现在我们将页面拆分开来，但是将来访问的时候是在一个页面上访问
8. 我们通过路由进行设置
```
127.0.0.1:8877/admin/list
```
9. 我们添加一个新的路由文件，搭建好主体
```
'use strict';
const express=require('express');
let adminRoute=express.Router();
module.exports=adminRoute;
```
10. 设计路由规则，首先我们要将数据显示出来
11. 查询显示页面设计一条get的路由规则，来实现列表数据的获取
```
const adminCtrl=require('./controller/adminCtrl.js');
adminRoute.get('/admin/list',adminCtrl.getlist);
```
12. 新增模块有两条路由规则
13. 首先要向服务器发送一个get请求获取到新增页面
```
adminRoute.get('/admin/list',adminCtrl.getlist);
```
14. 将用户填写好的表单数据post提交给服务器，服务器将数据插入到数据库的表中
```
adminRoute.post('/admin/add',adminCtrl.postadd);
```
15. 编辑操作中我们需要传参数，要确定当前是哪条数据需要修改
```
adminRoute.get('/admin/edit/:vid',adminCtrl.getedit);
adminRoute.post('/admin/edit',adminCtrl.postedit);
```
16. 删除，我么需要通过参数删除特定的数据
```
adminRoute.get('/admin/delete/:vid',adminCtrl.getdelete);
```
17. 改造我们的list.html，将需要产生动态数据的地方写上占位符
```
{{#each(list)}}
<tr>
    <td>{{this.vid}}</td>
    <td>{{this.vtitle}}</td>
    <td>{{this.vsortno}}</td>
    <td>{{this.vvideid}}</td>
    <td>
        //利用a标签的跳转向服务器发起请求
        <a href="/admin/edit/{{this.vid}}"  class="btn btn-success">编辑</a>
        <input type="button" class="btn btn-danger" onclick="del{{this.vid}}" value="删除">
    </td>
</tr>
{{/each}}
```
18. 查询的getlist函数中我们需要将数据库中的数据渲染到页面上
19. 先去数据库中查找videoinfo这个表中的数据
20. 调用xtpl.renderFile()将页面渲染
```
exports.getlist=(req,res)=>{
    //查询
    res.models.videoinfo.find({},{},(err,datas)=>{
        let obj={list:datas};
        xtpl.renderFile(path.join(__dirname,'../view/list.html'),obj,(err,html)=>{
            if(err){
                res.end(err.message);
                return;
            }
            res.end(html);
        });
    });
}
```
21. 将路由规则引入app.js中
```
const adminRoute = require('./routes/adminRoute.js');
app.use('/',adminRoute);
```
22. app.js里面的videoinfo表写错了单词
23. layout.html中路径问题
```
<link href="/node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
```

### params、query的区别
1. 如果url参数是通过?传递给服务器的话，使用req.query.id1可以获取的到值
2. 如果url参数是通过:传递给服务器的话，使用req.params.id2可以获取的到值，如果有了这个种格式，url地址栏就只要输入要传入参数的值就行，不需要带上键

### 新增页面
1. 在按钮上面增加一个点击事件进行跳转
```
<input type="button" class="btn btn-info" onclick="window.location='/admin/add';" value="新增">
```
2. 增加add.html页面，同样也要继承layout.html
3. 用Bootstrap写一个新增页面，里面有一个富文本编辑器，需要我们用js动态生成
4. 在控制器中将页面渲染出去
```
exports.getadd = (req, res) => {
  xtpl.renderFile(path.join(__dirname, '../view/add.html'),{}, (err, html) => {
    if (err) {
      res.end(err.message);
      return;
    }
    res.end(html);
  });
}
```
5. 解决乱码问题
```
app.all('admin/*',(req,res,next)=>{
    res.setHeader('Content-Type','text/html;charset=utf-8');
    next();
});
```

### 富文本编辑器
1. 引入JS文件
```
<script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="/ueditor/lang/zh-cn/zh-cn.js"> </script>
```
2. 将ueditor文件夹拷贝到静态资源目录下
3. 创建一个富文本编辑器
```
<script id="editor" type="text/plain" style="width:680px;height:500px;"></script>
<script>
UE.getEditor('editor');
</script>
```
4. 我们拷贝过来代码的时候要注意，重定向跳转的时候路径有问题，需要更改
```
res.redirect('/ueditor/nodejs/config.json');
```
5. 拷贝代码中用到了path，我们需要将path导入，以及我们的路径名需要更改
```
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'statics'), function(req, res, next) {
    //...
});
```
6. 将bodyParser这个包加载到express中使用
```
app.use(bodyParser());
```
7. 设定上传图片的路由规则代码
```
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'statics'), function(req, res, next) {
  // ueditor 客户发起上传图片请求
  if(req.query.action === 'uploadimage'){
    var foo = req.ueditor;
    var imgname = req.ueditor.filename;
    var img_url = '/images/ueditor/';
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = '/images/ueditor/';
    res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
}}));
```
8. 我们上传到服务器的图片保存地址
```
statics/images/ueditor/用户上传的图片
```
9. 添加了ueditor之后会报错//TODO

### 获取post请求数据
1. 在路由规则里面的请求报文对象接受一个data事件，可以获得提交数据
```
route.post('/admin/add',(req,res)=>{
    req.on('data',(data)=>{
        console.log(data);
    });
})
```
2. 通过bodyParser这个第三方包去获取
- 在app.js中使用app.use(require('body-parser'))
- 通过req.body.vtitle获取到请求报文体中的vtitle的值

### 新增的功能实现
1. 获取到请求报文体中的值req.body.vname
```
exports.postadd=(req,res)=>{
    let vtitle=req.body.vtitle;
    let vsortno=req.body.vsortno;
    let vvideid=req.body.vvideid;
    let vsummary=req.body.vsummary;
    let vimg=req.body.vimg;
    let vremark=req.body.editorValue;
}
```
2. 交给orm将数据插入到mysql表中的videoinfo中
```
let videoData={
    vtitle:vtitle,
    vsortno:vsortno,
    vvideid:vvideid,
    vsummary:vsummary,
    vremark:vremark,
    vimg:vimg
};
req.models.videoinfo.create(videoData,(err,item)=>{
    if(err){
        res.end(err.message);
        return;
    }
    //...
});
```
3. 提示新增成功并跳转到列表页面
```
res.end('<script>alert("新增成功");window.location="/admin/list";</script>');
```
4. *Cannot read property 'vsortno' of undefined*错误
- 解决办法：app.use(bodyParser());中间件的使用在路由规则设定之前

### 视频上传的功能
一般一些小网站是不支持视频上传的功能的，因为存储视频需要很大的空间，一般是将视频图片存储在云上，直接使用提供给我们的接口看来实现视频的上传，如果大量的视频在自己的服务器上面，会增加流量和内存的消耗。而且存在自己的服务器上会被下载下来，不方便管理。

### 编辑功能的实现
1. 点击编辑按钮，浏览器会进行相应的跳转，跳转到特定的路由规则
2. 我们需要对特定条数的数据进行编辑，因此我们的路由规则中是有参数的
3. 我们点击编辑按钮会将特定的vid传给浏览器的参数
4. 向服务器发送请求，服务器或根据路由规则实现功能
5. 首先我们需要从数据库中取出特定的那条数据
6. 将取出的数据渲染到页面上，将特定数据填充到form表单中的所有元素的value中
7. 用户进行修改后，我们需要将所有的数据重新提交到服务器存入数据库中
8. 但是我们在form表单中提交的路由规则中的参数不是固定的，应该用vid替换
9. 在模板页中我们需要将value用占位符替换
10. 但是最大的问题是我们富文本中的内容没有办法用value显示出来
11. 撇开富文本的问题，我们设置路由规则
12. 首先从url中获取到vid的值
```
let vid=req.params.vid;
```
13. 根据vid的值从mysql数据库中查找视频数据
```
//通过orm去数据库查找返回的结果是一个数组
```
14. 拿到数据后渲染edit.html页面
```
exports.getedit=(req,res)=>{
    let vid=req.params.vid;
    req.models.videoinfo.find({vid:vid},{},(err,data)=>{
        if(data.length<=0){
            res.end('id值非法，没有对应数据');
            return;
        }
        xtpl.renderFile(path.join(__dirname, '../view/edit.html'),data[0], (err, html) => {
        if (err) {
          res.end(err.message);
          return;
        }
        res.end(html);
    });
    });
}
```

### 解决富文本显示我们存在数据库中数据的问题
1. 查看官方文档的时候发现可以通过设置内容来实现富文本框显示内容
```
var ue=UE.getEditor('editor');
ue.setContent('欢迎使用',false);
```
2. 但是刷新页面后发现富文本的值不能使用
3. 当我们的浏览器从上往下执行，执行到`var ue=UE.getEditor('editor');`时，页面渲染是需要时间的，但是我们马上就要对它设值，所以不能用
4. 可以设置一个延迟，但是我们不知道要延迟多久
```
var content='{{vremark}}';
setTimeout(function(){
  ue.setContent(content,false);
}, 1000);
```
5. 但是我们输出的是一段被解析成HTML标签的字符串
```
<p><img src="/images/ueditor/802142432136400896.JPG" title="" alt="IMG_0635.JPG"/></p>
```
6. 需要将`&lt`;自动变成小于号
```
content=$('<span />').html(content).text();
```
7. 由于我们的jQuery是在页面底部加载的，因此我们需要添加onload事件。
8. 但是我们的富文本编辑器是不成功的，原生的富文本编辑器已经不能满足我们的需求，需改进下富文本编辑器。
9. 假设我们创建完编辑器之后然后执行一个回调函数，回调函数里面再去执行我们的设置值的事情。
10. 在我们的ueditor.all.js中我们找到getEditor函数主体。
11. 由上面推测可知我们需要传入一个回调函数，但是在return之前来执行这个回调函数显然是不合理的，因为我们的JS代码执行是非常快，而富文本编辑器渲染是需要时间的。
12. 我们可以在全局设置一个回调函数变量，在getEditor函数主体对全局变量赋值
13. 回调函数会在我们函数执行完毕之后执行，这样我们的富文本就能很好的渲染
```
var ve=UE.getEditor('editor',{},function(){
    ue.setContent(content,false);
});
```
