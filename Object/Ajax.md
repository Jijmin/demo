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
