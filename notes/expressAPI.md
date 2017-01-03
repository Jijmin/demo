### express()
```
var express=require('express');
var app=express();
app.get('/',function(req,res){
  res.send('hello world');
});
app.listen(3001);
```

### app.set(name,value)
```
app.set('title', 'My Site');
console.log(app.get('title'));//My Site
```

### app.get(name)
```
console.log(app.get('title'));// undefined
app.set('title', 'My Site');
console.log(app.get('title'));// My Site
```

### app.enable(name)
```
app.enable('boolean');
console.log(app.get('boolean'));//true
```

### app.disable(name)
```
app.disable('boolean');
console.log(app.get('boolean'));//false
```

### app.enabled(name)
```
console.log(app.enabled('boolean'));//false
app.enable('boolean');
console.log(app.enabled('boolean'));//true
```

### app.configure([env],callback)
这个方法没有测试出来，会报错
```
// 所有环境
app.configure(function(){
  app.set('title', 'My Application');
})

// 开发环境
app.configure('development', function(){
  app.set('db uri', 'localhost/dev');
})

// 只用于生产环境
app.configure('production', function(){
  app.set('db uri', 'n.n.n.n/prod');
})
```
更高效且直接的代码如下：
```
// 所有环境
app.set('title', 'My Application');

// 只用于开发环境
if ('development' == app.get('env')) {
  app.set('db uri', 'localhost/dev');
}

// 只用于生产环境
if ('production' == app.get('env')) {
  app.set('db uri', 'n.n.n.n/prod');
}
```

### app.use([path],function)
使用中间件，function时可选参数，path默认是'/'
```
// 一个简单的 logger
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);//GET /
  next();
});
// 响应
app.use(function(req, res, next){
   res.send('Hello World');
});
```
常见的一个应用场景是提供静态文件服务，用express.static()中间件
```
app.use('/static', express.static(__dirname + '/public'));
```
定义中间件的顺序非常重要，讲会按顺序执行，express.logger() 是最先使用的一个组件，纪录每一个请求
```
app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.use(function(req, res){
  res.send('Hello');
});
```
从多个目录提供静态文件服务
```
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
```

### application settings
下面的内建可以改变Express行为的设置
1. env 运行时环境，默认为 process.env.NODE_ENV 或者 "development"
2. trust proxy 激活反向代理，默认未激活状态
3. jsonp callback name 修改默认?callback=的jsonp回调的名字
4. json replacer JSON replacer 替换时的回调, 默认为null
5. json spaces JSON 响应的空格数量，开发环境下是2 , 生产环境是0
6. case sensitive routing 路由的大小写敏感, 默认是关闭状态， "/Foo" 和"/foo" 是一样的
7. strict routing 路由的严格格式, 默认情况下 "/foo" 和 "/foo/" 是被同样对待的
8. view cache 模板缓存，在生产环境中是默认开启的
9. view engine 模板引擎
10. views 模板的目录, 默认是"process.cwd() + ./views"

### app.engine(ext,callback)
想要渲染一个"foo.jade"文件，Express会在内部执行下面代码，然后缓存 require() ，这样可以提高后面操作的性能
```
app.engine('jade',require('jade').__express);
```
那些没有提供 .__express 的或者你想渲染一个文件的扩展名与模板引擎默认的不一致的时候，也可以用这个方法。 比如你想用EJS模板引擎来处理 ".html" 后缀的文件:
```
app.engine('html',require('ejs').renderFile);
```
这个例子中EJS提供了一个.renderFile() 方法和Express预期的格式: (path, options, callback)一致, 可以在内部给这个方法取一个别名ejs.__express，这样你就可以使用".ejs" 扩展而不需要做任何改动
有些模板引擎没有遵循这种转换， 这里有一个小项目[consolidate.js](https://github.com/tj/consolidate.js)专门把所有的node流行的模板引擎进行了包装，这样它们在Express内部看起来就一样了。
```
var engines=require('consolidate');
app.engine('haml', engines.haml);
app.engine('html', engines.hogan);
```

### app.param([name],callback)
尝试加载用户信息，然后赋值给req.user, 否则就传递错误next(err).
```
app.param('user',function(req,res,next,id){
    User.find(id,function(err,user){
        if(err){
            next(err);
        }else if(user){
            req.user=user;
            next();
        }else{
            next(new Error('failed to load user'));
        }
    });
});
```
另外你也可以只传一个callback, 这样你就有机会改变 app.param() API. 比如express-params定义了下面的回调，这个允许你使用一个给定的正则去限制参数。
```
app.param(function(name,fn){
    if(fn instanceof RegExp){
        return function(req,res,next,val){
            var captures;
            if(captures=fn.exec(String(val))){
                req.params[name]=captures;
                next();
            }else{
                next('route');
            }
        }
    }
});
```
这个函数可以有效的用来校验参数，或者提供正则捕获后的分组
```
app.param('id', /^\d+$/);
app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});
app.param('range', /^(\w+)\.\.(\w+)?$/);
app.get('/range/:range', function(req, res){
  var range = req.params.range;
  res.send('from ' + range[1] + ' to ' + range[2]);
});
```

### app.VERB(path,[callback...],callback)
app.VERB()方法是一个路由方法，VERB是指某一个HTTP动作，如果某一个callback执行了next('route')，它后面的callback就会被忽略。这种情形会应用在当满足一个路由前缀，但是不需要处理这个路由，于是把它向后传递。
Express 会把路径字符串转为正则表达式，然后在符合规则的请求到达时立即使用。 请求参数不会 被考虑进来，比如 "GET /" 会匹配下面的这个路由, 而"GET /?name=tobi"同样也会匹配。
```
app.get('/', function(req, res){
  res.send('hello world');
});
```
可以匹配"GET /commits/71dbb9c" ， 同时也能匹配 "GET /commits/71dbb9c..4c084f9".
```
app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```
可以传递一些回调，这对复用一些加载资源、校验的中间件很有用。这些回调同样可以通过数组传递，简单的放置在数组中即可。
```
var middleware = [loadForum, loadThread];
app.get('/forum/:fid/thread/:tid', middleware, function(){
  // ...
})
app.post('/forum/:fid/thread/:tid', middleware, function(){
  // ...
})
```

### app.all(path,[callback...],callback)
这个方法在给特定前缀路径或者任意路径上处理时会特别有用。 比如你想把下面的路由放在所有其它路由之前，它需要所有从这个路由开始的加载验证，并且自动加载一个用户 记住所有的回调都不应该被当作终点， loadUser 能够被当作一个任务，然后next()去匹配接下来的路由。
```
app.all('*', requireAuthentication, loadUser);
```
全局白名单函数
```
app.all('/api/*', requireAuthentication);
```

### app.locals
应用程序本地变量会附加给所有的在这个应用程序内渲染的模板。
```
app.locals.title='My App';
app.locals.strftime=require('strftime');
```
app.locals 对象是一个JavaScript Function, 执行的时候它会把属性合并到它自身，提供了一种简单展示已有对象作为本地变量的方法
```
app.locals({
  title: 'My App',
  phone: '1-250-858-9990',
  email: 'me@myapp.com'
});
```
上面的方法没有测试通过，报错` app.locals is not a function`的错误，解决办法是：
```
app.locals={
  title: 'My App',
  phone: '1-250-858-9990',
  email: 'me@myapp.com'
};
```
app.locals对象最终会是一个JavaScript函数对象，你不可以使用Functions和Objects内置的属性，比如name, apply, bind, call, arguments, length, constructor
```
app.locals({name: 'My App'});
app.locals.name
// => 返回 'app.locals' 而不是 'My App' (app.locals 是一个函数 !)
// => 如果name变量用在一个模板里，发返回一个 ReferenceError 
```

### app.render(view,[option],callback)
渲染view，callback用来处理返回的渲染后的字符串
```
app.render('email', { name: 'Tobi' }, function(err, html){
  // ...
});
```

### app.routes
express可以用它来做路由分布，同时在没有app.options()定义的情况下用它来处理默认的OPTIONS行为。可以达到删除路由的目的。
```
console.log(app.routes)

{ get: 
   [ { path: '/',
       method: 'get',
       callbacks: [Object],
       keys: [],
       regexp: /^\/\/?$/i },
   { path: '/user/:id',
       method: 'get',
       callbacks: [Object],
       keys: [{ name: 'id', optional: false }],
       regexp: /^\/user\/(?:([^\/]+?))\/?$/i } ],
delete: 
   [ { path: '/user/:id',
       method: 'delete',
       callbacks: [Object],
       keys: [Object],
       regexp: /^\/user\/(?:([^\/]+?))\/?$/i } ] }
```

### app.listen()
```
var express = require('express');
var app = express();
app.listen(3000);
```
以同一份代码同时处理HTTP and HTTPS 版本的服务
```
var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
```
如果你想使用HTTPS，或者同时提供HTTP和HTTPS
```
app.listen = function(){
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```
