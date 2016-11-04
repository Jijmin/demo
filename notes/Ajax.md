# Ajax与Comet

## XMLHttpRequest对象

### XHR的用法
XHR的创建：`var xhr=new XMLHttpRequest();`

> open('get','1.php',false);

- 要发送的请求类型('get'、'post'等)
- 请求的URL
- 表示是否异步发送请求的布尔值

注意：
1. URL相对于执行代码的当前页面(绝对路径)
2. 调用open()方法并不会真正的发送请求，而只是启动了一个请求以备发送
3. 只能向同一个域中使用相同的端口和协议的URL发送请求。如果URL与启动请求的页面有任何差别，都会引发安全错误。

> xhr.send(null);

XHR对象的属性：
1. responseText：作为响应主体被返回的文本
2. responseXML：如果响应的内容类型是"text/xml"或"application/xml"，这个属性中将保存包含着响应数据的XML DOM文档。
3. status：响应的HTTP状态
4. statusText：HTTP状态的说明

接收到响应后：
1. 检查status属性
- 将HTTP状态码为200作为成功的标志
- 状态码为304表示请求资源并没有被修改
2. 异步请求，检查XHR对象的readyState属性，该属性表示请求/响应过程的当前活动阶段
- 0：未初始化。尚未调用open()方法
- 1：启动。已经调用open()方法，但尚未调用send()方法
- 2：发送。已经调用send()方法，但是尚未接受到响应
- 3：接受。已经接受到部分响应数据。
- 4：完成。已经接受到全部响应数据，而且可以在客户端使用了。
3. 只要readyState改变，都会触发一次readystatechange事件。
4. 在调用open()之前指定onreadystatechange事件处理程序才能确保跨浏览器兼容性。
5. 在接收到响应之前还可以调用abort()方法来取消异步请求。
```
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if (xhr.readyState == 4){
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
      console.log(xhr.responseText);
    } else {
      console.log("Request was unsuccessful: " + xhr.status);
    }
  }
};
xhr.open("get", "example.txt", true);
xhr.send(null);
```
### HTTP头部请求
在发送XHR请求的同时，还会发送下列头部信息
- Accept：浏览器能够处理的内容类型。
- Accept-Charset：浏览器能够显示的字符集。
- Accept-Encoding：浏览器能够处理的压缩编码。
- Accept-Language：浏览器当前设置的语言
- Connection：浏览器与服务器直接连接的类型。
- Cookie：当前页面设置的任何Cookie。
- Host：发出请求的页面所在的域。
- Referer：发出请求的URL
- User-Agent：浏览器用户代理字符串。

1. 使用setRequestHeader()方法可以设置自定义的请求头部信息。
这个方法接受两个参数：头部字段名称和头部字段的值。
要成功发送请求头部信息，必须在调用open()方法之后且调用send()方法之前调用setRequestHeader()
2. 调用XHR对象的getResponseHeader()方法并传入头部字段名称，可以取得相应的响应头部信息。
3. 调用getAllResponseHeader()方法可以取得一个包含所有头部信息的长字符串

### GET请求
辅助向现有URL的末尾添加查询字符串参数
```
function addURLParam(url, name, value) {
  url += (url.indexOf("?") == -1 ? "?" : "&");
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}
```
### POST请求
```
xhr.open("post", "example.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var form = document.getElementById("user-info");
xhr.send(serialize(form));
```
## XMLHttpRequest 2级

### FormData
FormData为序列化表单以及创建与表单格式相同的数据（用于通过XHR传输）提供
了便利。
```
var data = new FormData();
data.append("name", "Nicholas");
//var data = new FormData(document.forms[0]);
```

### 超时设定
在规定的时间内没有接受到响应，就会触发timeout事件
```
xhr.timeout = 1000; //将超时设置为1秒钟（仅适用于IE8+）
xhr.ontimeout = function(){
  alert("Request did not return in a second.");
};
```

### overrideMimeType()方法
通过调用overrideMimeType()方法，可以保证把响应当作XML而非纯文本来处理。
```
xhr.overrideMimeType("text/xml");
```
调用overrideMimeType()必须在send()方法之前，才能保证重写响应的MIME类型。

## 进度事件
与客户端服务器通信有关的事件
- loadstart：在接收到响应数据的第一个字节时触发。
- progress：在接收响应期间持续不断地触发。
- error：在请求发生错误时触发。
- abort：在因为调用abort()方法而终止连接时触发。
- load：在接收到完整的响应数据时触发。
- loadend：在通信完成或者触发error、abort或load事件后触发。

### load事件
响应接受完毕后将触发load事件，可以不用检查readyState属性
```
var xhr = createXHR();
xhr.onload = function(){
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
    alert(xhr.responseText);
  } else {
    alert("Request was unsuccessful: " + xhr.status);
  }
};
xhr.open("get", "altevents.php", true);
xhr.send(null);
```

### progress事件
progress事件会在浏览器接收新数据期间周期性地触发。
onprogress事件处理程序会接收到一个event对象
lengthComputable是一个表示进度信息是否可用的布尔值
position 表示已经接收的字节数
totalSize 表示根据Content-Length响应头部确定的预期字节数
```
xhr.onprogress = function(event){
  var divStatus = document.getElementById("status");
  if (event.lengthComputable){
    divStatus.innerHTML = "Received " + event.position + " of " +event.totalSize +" bytes";
  }
};
```
必须在调用open()方法之前添加onprogress事件处理程序

## 跨源资源共享
1. 通过XHR是实现Ajax通信的一个主要限制，来源于跨域安全策略。默认情况下，XHR对象只能访问与包含它的页面位于同一个域中的资源
2. CORS(跨域资源共享)，使用自定义的HTTP头部让浏览器与服务器进行沟通。
3. 在发送请求时，需要给他附加一个额外的Origin头部，其中包含请求页面的源信息(协议、域名和端口)
4. 如果服务器认为这个请求可以接受，就在Access-Control-Allow-Origin头部中回发相同的源信息(如果是公共资源，就发送*)
5. 如果没有这个头部，或者有这个头部但源信息不匹配，浏览器就会驳回请求。

### IE对CORS的实现
IE8中引入了XDR（XDomainRequest）类型，能实现安全可靠的跨域通信。
1. cookie不会随请求发送，也不会随响应返回。
2. 只能设置请求头部信息中的Content-Type字段。
3. 不能访问响应头部信息。
4. 只支持GET和POST请求。
这些变化使CSRF（Cross-Site Request Forgery，跨站点请求伪造）和XSS（Cross-Site Scripting，跨
站点脚本）的问题得到了缓解。被请求的资源可以根据它认为合适的任意数据（用户代理、来源页面等）
来决定是否设置Access-Control- Allow-Origin头部。作为请求的一部分，Origin头部的值表示
请求的来源域，以便远程资源明确地识别XDR请求。
```
var xdr = new XDomainRequest();
xdr.onload = function(){
  alert(xdr.responseText);
};
xdr.open("get", "http://www.somewhere-else.com/page/");
xdr.send(null);
```
1. 创建一个XDomainRequest的实例
2. 调用open()方法：请求的类型和URL
3. 再调用send()方法
4. 所有的XDR请求都是异步执行的，不能用它来创建同步请求
5. 请求返回后会触发load事件
6. 响应的数据也会保存在responseText属性中
7. 在接收到响应后，你只能访问响应的原始文本
8. 没有办法确定响应的状态代码
9. 只要响应有效就会触发load事件
10. 如果失败（包括响应中缺少Access-Control-Allow-Origin头部）就会触发error事件
要检查错误，可以指定一个onerror事件处理程序
```
xdr.onerror = function(){
  alert("An error occurred.");
};
```
11. 在请求返回前调用abort()方法可以终止请求
12. XDR对象也支持timeout属性以及ontimeout事件处理程序
13. XDR对象提供了contentType属性，用来表示发送数据的格式

### 其他浏览器对CORS的实现
要请求位于另一个域中的资源，使用标准的XHR对象并在open()方法中传入绝对URL即可
```
xhr.open("get", "http://www.somewhere-else.com/page/", true);
```
与IE中的XDR对象不同，通过跨域XHR对象可以访问status和statusText属性，而且还支
持同步请求。

跨域XHR对象限制:
- 不能使用setRequestHeader()设置自定义头部。
- 不能发送和接收cookie。
- 调用getAllResponseHeaders()方法总会返回空字符串。

### Preflighted Reqeusts
1. Origin：与简单的请求相同
2. Access-Control-Request-Method：请求自身使用的方法
3. Access-Control-Request-Headers：（可选）自定义的头部信息，多个头部以逗号分隔
发送这个请求后，服务器可以决定是否允许这种类型的请求。
服务器通过在响应中发送如下头部与
浏览器进行沟通。
1. Access-Control-Allow-Origin：与简单的请求相同
2. Access-Control-Allow-Methods：允许的方法，多个方法以逗号分隔。
3. Access-Control-Allow-Headers：允许的头部，多个头部以逗号分隔
4. Access-Control-Max-Age：应该将这个Preflight请求缓存多长时间（以秒表示）

### 带凭据的请求
通过将withCredentials属性设置为true，可以指定某个请求应该发送的凭据

### 跨浏览器的CORS
检测XHR是否支持CORS的最简单方式，就是检查是否存在withCredentials属性。
再结合检测XDomainRequest对象是否存在，就可以兼顾所有浏览器了。

## 其他跨域技术

### 图像Ping
一个网页可以从任何网页中加载图片，不用担心跨域不跨域。图像Ping是与服务器进行简单，单向的跨域通信的一种方式。请求的数据是通过查询字符串形式发送的，而响应可以是任何内容，但通常是像素图或204响应。通过图像Ping，浏览器得不到任何具体的数据，但通过侦听load和error事件，它能知道响应是什么时候接收到的。
```
var img = new Image();
img.onload = img.onerror = function(){
  alert("Done!");
};
img.src = "http://www.example.com/test?name=Nicholas";
```
图像Ping最常用于跟踪用户点击页面或动态广告曝光次数。图像Ping有两个主要的缺点，一是只能发送GET请求，二是无法访问服务器的响应文本。因此，图像Ping只能用于浏览器与服务器见的单向通行。

### JSONP(填充式JSON或参数式JSON)
- JSONP和JSON很像，只不过是被包含在函数调用中的JSON
```
callback({'name':'zy'});
```
- JSONP由两部分组成：回调函数和数据。回调函数是当响应到来时应该在页面中调用的函数。回调函数的名字一般是在请求中指定的。而数据就是传入回调函数中的JSON数据。
- JSONP是通过动态<script>元素来使用的，使用时可以为src属性指定一个跨域的URL。与<img>标签类似，都有能力不受限制地从其他域加载资源。因为JSONP是有效的JavaScript代码，所以在请求完成后，即在JSONP响应加载到页面中以后，就会立即执行。
```
function handleResponse(response){
  alert("You’re at IP address " + response.ip + ", which is in " +response.city + ", " + response.region_name);
}
var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);
```
JSONP优点：能够直接访问响应文本，支持在浏览器与服务器之间的双向通信。
JSONP缺点：JSONP是从其他域中加载代码执行，如果其他域不安全，很有可能夹带恶意代码，而此时除了完全放弃JSONP外，没有办解决，因此在使用不是你自己运维的Web服务时，一定要保证它安全可靠。还有，要确定JSONP请求是否失败并不容易。虽然H5给<script>元素新增了一个onerror事件处理程序，但目前还没有得到任何浏览器支持。

### Comet
Ajax是一种从页面向服务器请求数据的技术，而Comet则是一种服务器向页面推送数据的技术。Comet能够让信息近乎实时的被推送到页面上，非常适合处理体育比赛的分数和股票报价。
1. 有两种实现Comet的方式：长轮询和流。
- 长轮询
  1. 长轮询是传统轮询（也称为短轮询）的一个翻版，即浏览器定时向服务器发送请求，看有没有更新的数据
  2. 页面发起一个到服务器的请求，然后服务器一直保持连接打开，直到有数据可发送。
  3. 发送完数据之后，浏览器关闭连接，随即又发起一个到服务器的新请求。
  4. 这一过程在页面打开期间一直持续不断。
轮询的优势：是所有浏览器都支持，因为使用XHR对象和setTimeout()就能实现。而你要做的就是决定什么时候发送请求。
- 流
第二种流行的Comet实现是HTTP流。流不同于上述两种轮询，因为它在页面的整个生命周期内只使用一个HTTP连接。具体来说，就是浏览器向服务器发送一个请求，而服务器保持连接打开，然后周期性地向浏览器发送数据。所有服务器端语言都支持打印到输出缓存然后刷新（将输出缓存中的内容一次性全部发送到客户端）的功能。而这正是实现HTTP流的关键所在。