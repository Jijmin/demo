## Application
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

## Request
### req.params
这是一个数组对象，命名过的参数会以键值对的形式存放。 比如你有一个路由/user/:name, "name"属性会存放在req.params.name. 这个对象默认为 {}.
```
// GET /user/tj
req.params.name
// => "tj"
```
```
// GET /file/javascripts/jquery.js
req.params[0]
// => "javascripts/jquery.js"
```

### req.query
这是一个解析过的请求参数对象，默认为{}.
```
// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"
```

### req.body
这个对应的是解析过的请求体。这个特性是bodyParser() 中间件提供,其它的请求体解析中间件可以放在这个中间件之后。当bodyParser()中间件使用后，这个对象默认为 {}。
```
// POST user[name]=tobi&user[email]=tobi@learnboost.com
req.body.user.name
// => "tobi"
```

### req.files
这是上传的文件的对象。这个特性是bodyParser() 中间件提供，默认为 {}。
```
{ size: 74643,
  path: '/tmp/8ef9c52abe857867fd0a4e9a819d1876',
  name: 'edge.png',
  type: 'image/png',
  hash: false,
  lastModifiedDate: Thu Aug 09 2012 20:07:51 GMT-0700 (PDT),
  _writeStream: 
   { path: '/tmp/8ef9c52abe857867fd0a4e9a819d1876',
     fd: 13,
     writable: false,
     flags: 'w',
     encoding: 'binary',
     mode: 438,
     bytesWritten: 74643,
     busy: false,
     _queue: [],
     _open: [Function],
     drainable: true },
  length: [Getter],
  filename: [Getter],
  mime: [Getter] }
```
没有.png扩展名，可以将参数传给bodyParser()
```
app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/my/files' }));
```

### req.param(name)
返回 name 参数的值。
```
// ?name=tobi
// POST name=tobi
// /user/tobi for /user/:name 
req.param('name')
// => "tobi"
```
查找的优先级：
1. req.params
2. req.body
3. req.query

### req.route
这个对象里是当前匹配的 Route 里包含的属性，比如原始路径字符串，产生的正则等等
```
app.get('/user/:id?', function(req, res){
  console.log(req.route);
});
```
```
Route {
  path: '/user/:id?',
  stack:
   [ Layer {
       handle: [Function],
       name: '<anonymous>',
       params: undefined,
       path: undefined,
       keys: [],
       regexp: /^\/?$/i,
       method: 'get' } ],
  methods: { get: true } }
```

### req.cookies
当使用 cookieParser()中间件之后，这个对象默认为{}, 它也包含了用户代理传过来的cookies。
```
// Cookie: name=tj
req.cookies.name
// => "tj"
```

### req.signedCookies
当使用了cookieParser(secret) 中间件后，这个对象默认为{}, 否则包含了用户代理传回来的签名后的cookie，并等待使用。签名后的cookies被放在一个单独的对象里，恶意攻击者可以很简单的替换掉`req.cookie` 的值。需要注意的是签名的cookie不代表它是隐藏的或者加密的，这个只是简单的阻止篡改cookie。
```
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
req.signedCookies.user
// => "tobi"
```

### req.get(field)
获取请求头里的field的值
```
req.get('Content-Type');
// => "text/plain"
```
别名为 req.header(field).

### req.accepts(types)
检查给定的types 是不是可以接受类型，可以为逗号分隔的列表或者数组。当给定的是数组或者列表，返回最佳匹配的。
```
// Accept: text/*;q=.5, application/json
req.accepts(['html', 'json']);
req.accepts('html, json');
// => "json"
```

### req.accepted
返回一个从高质量到低质量排序的接受媒体类型数组
```
[ 
    { 
        value: 'application/json',
        quality: 1,
        type: 'application',
        subtype: 'json' 
    },
    {
        value: 'text/html',
        quality: 0.5,
        type: 'text',
        subtype: 'html' 
    } 
]
```

### req.is(type)
检查请求的文件头是不是包含"Content-Type" 字段, 它匹配给定的type.
```
// When Content-Type is application/json
req.is('json');
req.is('application/json');
req.is('application/*');
// => true
```

### req.ip
返回远程地址，或者当“信任代理”使用时，返回上一级的地址
```
req.ip
// => "127.0.0.1"
```

### req.ips
当设置"trust proxy" 为 `true`时, 解析"X-Forwarded-For" 里的ip地址列表，并返回一个数组 否则返回一个空数组 举个例子，如果"X-Forwarded-For" 的值为"client, proxy1, proxy2" 你将会得到数组["client", "proxy1", "proxy2"] 这里可以看到 "proxy2" 是最近一个使用的代理

### req.path
返回请求的URL的路径名
```
// example.com/users?sort=desc
req.path
// => "/users"
```

### req.host
返回从"Host"请求头里取的主机名,不包含端口号。
```
// Host: "example.com:3000"
req.host
// => "example.com"
```

### req.fresh
判断请求是不是新的-通过对Last-Modified 或者 ETag 进行匹配, 来标明这个资源是不是"新的".

### req.stale
判断请求是不是旧的-如果Last-Modified 或者 ETag 不匹配, 标明这个资源是"旧的". 

### req.xhr
判断请求头里是否有"X-Requested-With"这样的字段并且值为"XMLHttpRequest", jQuery等库发请求时会设置这个头

### req.protocol
返回标识请求协议的字符串，一般是"http"，当用TLS请求的时候是"https"。 当"trust proxy" 设置被激活， "X-Forwarded-Proto" 头部字段会被信任。 如果你使用了一个支持https的反向代理，那这个可能是激活的。

### req.secure
检查TLS 连接是否已经建立。 这是下面的缩写:
```
'https' == req.protocol;
```

### req.subdomains
把子域当作一个数组返回
```
// Host: "tobi.ferrets.example.com"
req.subdomains
// => ["ferrets", "tobi"]
```

### req.originalUrl
这个属性很像 req.url, 但是它保留了原始的url。 这样你在做内部路由的时候可以重写req.url。 比如app.use()的挂载功能会重写 req.url，把从它挂载的点开始
```
// GET /search?q=something
req.originalUrl
// => "/search?q=something"
```

### req.acceptedCharsets
返回一个从高质量到低质量排序的可接受的字符集数组
```
Accept-Charset: iso-8859-5;q=.2, unicode-1-1;q=0.8
// => ['unicode-1-1', 'iso-8859-5']
```

### req.acceptsCharset(charset)
检查给定的charset 是不是可以接受的

### req.acceptsLanguage(lang)
检查给定的 lang 是不是可以接受的

## Response
### res.status(code)
支持链式调用的 node's res.statusCode=.
```
res.status(404).sendfile('path/to/404.png');
```

### res.set(field,[value])
设置响应头字段field 值为 value, 也可以一次传入一个对象设置多个值。
```
res.set('Content-Type', 'text/plain');
res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
})
```
res.header(field, [value])的别名。

### rea.get(field)
返回一个大小写不敏感的响应头里的 field的值
```
res.get('Content-Type');
// => "text/plain"
```

### res.cookie(name,value,[options])
设置cookie name 值为value, 接受字符串参数或者JSON对象。 path 属性默认为 "/".
```
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
```
maxAge 属性是一个便利的设置"expires",它是一个从当前时间算起的毫秒。 下面的代码和上一个例子中的第二行是同样的作用。
```
res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
```
可以传一个序列化的JSON对象作为参数， 它会自动被bodyParser() 中间件解析。
```
res.cookie('cart', { items: [1,2,3] });
res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
```
这个方法也支持签名的cookies。 只需要简单的传递signed 参数。res.cookie() 会使用通过 express.cookieParser(secret) 传入的secret来签名这个值。
```
res.cookie('name', 'tobi', { signed: true });
```
稍后你就可以通过req.signedCookie 对象访问到这个值。

### res.clearCookie(name, [options])
把name的cookie清除. path参数默认为 "/".
```
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```

### res.redirect([status],url)
使用可选的状态码跳转到url 状态码status默认为302 "Found".
```
res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301, 'http://example.com');
res.redirect('../login');
```
1. 使用一个完整的URI跳转到一个完全不同的网站。
2. 相对根域路径跳转
3. back 跳转, 它会把你带回Referer（也有可能是Referrer）的地址 当Referer丢失的时候默认为 /

### res.location
设置location 请求头.
```
res.location('/foo/bar');
res.location('back');
```

### res.charset
设置字符集。默认为"utf-8"。
```
res.charset = 'value';
res.send('some html');
// => Content-Type: text/html; charset=value
```

### res.send([body|status],[body])
发送一个请求
```
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('some html');
res.send(404, 'Sorry, we cannot find that!');
res.send(500, { error: 'something blew up' });
res.send(200);
```
这个方法在输出non-streaming响应的时候自动完成了大量有用的任务 比如如果在它前面没有定义Content-Length, 它会自动设置; 比如加一些自动的 HEAD; 比如对HTTP缓存的支持.
当参数为一个 Buffer时 Content-Type 会被设置为 "application/octet-stream" 除非它之前有像下面的代码：
```
res.set('Content-Type', 'text/html');
res.send(new Buffer('some html'));
```
当参数为一个String时 Content-Type 默认设置为"text/html":
```
res.send('some html');
```
当参数为 Array 或者 Object 时 Express 会返回一个 JSON :
```
res.send({ user: 'tobi' })
res.send([1,2,3])
```
最后一条当一个Number 作为参数， 并且没有上面提到的任何一条在响应体里， Express会帮你设置一个响应体 比如200 会返回字符"OK", 404会返回"Not Found"等等.
```
res.send(200)
res.send(204)
res.send(500)
```

### res.json([status|body],[body])
返回一个 JSON 响应。 当res.send() 的参数是一个对象或者数组的时候， 会调用这个方法。 当然它也在复杂的空值(null, undefined, etc)JSON转换的时候很有用， 因为规范上这些对象不是合法的JSON。
```
res.json(null)
res.json({ user: 'tobi' })
res.json(500, { error: 'message' })
```

### res.jsonp([status|body],[body])
返回一个支持JSONP的JSON响应，只是加了一个可以自定义的 JSONP 回调支持。
默认情况下JSONP 回调的函数名就是callback。 你可以通过jsonp callback name来修改这个值。
```
// ?callback=foo
res.jsonp({ user: 'tobi' })
// => foo({ "user": "tobi" })
app.set('jsonp callback name', 'cb');
```

### res.type(type)
```
res.type('application/json');
```
res.contentType(type)方法的别名。

### res.format(object)
在请求头设置为"application/json" 或者 "*/json"的时候 会返回{ "message": "hey" } 如果设置的是"*/*" 那么所有的返回都将是"hey"
```
res.format({
  'text/plain': function(){
    res.send('hey');
  },
  
  'text/html': function(){
    res.send('hey');
  },
  
  'application/json': function(){
    res.send({ message: 'hey' });
  }
});
```
除了使用标准的MIME 类型，你也可以使用扩展名来映射这些类型
```
text: function(){
    res.send('hey');
  }
```

### res.attachment([filename])
设置响应头的Content-Disposition 字段值为 "attachment". 如果有filename 参数，Content-Type 将会依据文件扩展名通过res.type()自动设置, 并且Content-Disposition的"filename="参数将会被设置
```
res.attachment('path/to/logo.png');
// Content-Disposition: attachment; filename="logo.png"
// Content-Type: image/png
```

### res.sendfile(path, [options], [fn]])
path所传输附件的路径。它会根据文件的扩展名自动设置响应头里的Content-Type字段。 回调函数fn(err)在传输完成或者发生错误时会被调用执行。
这个方法可以非常良好的支持有缩略图的文件服务。
```
app.get('/user/:uid/photos/:file', function(req, res){
  var uid = req.params.uid
    , file = req.params.file;
    
  req.user.mayViewFilesFrom(uid, function(yes){
    if (yes) {
      res.sendfile('/uploads/' + uid + '/' + file);
    } else {
      res.send(403, 'Sorry! you cant see that.');
    }
  });
});
```

### res.download(path, [filename], [fn])
```
res.download('/report-12345.pdf', 'report.pdf', function(err){
  if (err) {
    // 处理错误，请牢记可能只有部分内容被传输，所以
    // 检查一下res.headerSent
  } else {
    // 减少下载的积分值之类的
  }
});
```

### res.links(links)
合并给定的links, 并且设置给响应头里的"Link" 字段.
```
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
});
```

### res.locals
放置请求的路径名，验证过的用户，用户设置等等
```
app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.authenticated = ! req.user.anonymous;
  next();
});
```

### res.render(view, [locals], callback)
渲染view, 同时向callback 传入渲染后的字符串。 callback如果不传的话，直接会把渲染后的字符串输出至请求方， 一般如果不需要再对渲染后的模板作操作，就不需要传callback。 当有错误发生时next(err)会被执行. 如果提供了callback参数，可能发生的错误和渲染的字符串都会被当作参数传入, 并且没有默认响应。
```
res.render('index', function(err, html){
  // ...
});
res.render('user', { name: 'Tobi' }, function(err, html){
  // ...
});
```

## Middleware
### basicAuth()
基本的认证中间件，在req.user里添加用户名
```
app.use(express.basicAuth('username', 'password'));
```
校验回调:
```
app.use(express.basicAuth(function(user, pass){
  return 'tj' == user && 'wahoo' == pass;
}));
```
异步校验接受参数fn(err, user), 下面的例子req.user 将会作为user对象传递.
```
app.use(connect.basicAuth(function(user, pass, fn){
  User.authenticate({ user: user, pass: pass }, fn);
}))
```

### bodyParser()
支持 JSON, urlencoded和multipart requests的请求体解析中间件。 这个中间件是json(), urlencoded(),和multipart() 这几个中间件的简单封装
```
app.use(express.bodyParser());

// 等同于:
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());
```
从安全上考虑，如果你的应用程序不需要文件上传功能，最好关闭它。我们只使用我们需要的中间件。

### compress()
通过gzip / deflate压缩响应数据. 这个中间件应该放置在所有的中间件最前面以保证所有的返回都是被压缩的

### cookieParser()
解析请求头里的Cookie, 并用cookie名字的键值对形式放在 req.cookies 你也可以通过传递一个secret 字符串激活签名了的cookie
```
app.use(express.cookieParser());
app.use(express.cookieParser('some secret'));
```

### cookieSession()
提供一个以cookie为基础的sessions, 设置在req.session里。
1. key cookie 的名字，默认是 connect.sess
2. secret prevents cookie tampering
3. cookie session cookie 设置, 默认是 { path: '/', httpOnly: true, maxAge: null }
4. proxy 当设置安全cookies时信任反向代理 (通过 "x-forwarded-proto")
清掉一个cookie, 只需要在响应前把null赋值给session:

### csrf()
CSRF 防护中间件
默认情况下这个中间件会产生一个名为"_csrf"的标志，这个标志应该添加到那些需要服务器更改的请求里，可以放在一个表单的隐藏域，请求参数等。这个标志可以通过 req.csrfToken()方法进行校验。
这个中间件需要session支持，因此它的代码应该放在session()之后.

### directory()
文件夹服务中间件，用 path 提供服务。
1. hidden 显示隐藏文件，默认为false.
2. icons 显示图标，默认为false.
3. filter 在文件上应用这个过滤函数。默认为false.
