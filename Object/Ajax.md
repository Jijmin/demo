# Ajax��Comet

## XMLHttpRequest����

### XHR���÷�
XHR�Ĵ�����`var xhr=new XMLHttpRequest();`

> open('get','1.php',false);

- Ҫ���͵���������('get'��'post'��)
- �����URL
- ��ʾ�Ƿ��첽��������Ĳ���ֵ

ע�⣺
1. URL�����ִ�д���ĵ�ǰҳ��(����·��)
2. ����open()���������������ķ������󣬶�ֻ��������һ�������Ա�����
3. ֻ����ͬһ������ʹ����ͬ�Ķ˿ں�Э���URL�����������URL�����������ҳ�����κβ�𣬶���������ȫ����

> xhr.send(null);

XHR��������ԣ�
1. responseText����Ϊ��Ӧ���屻���ص��ı�
2. responseXML�������Ӧ������������"text/xml"��"application/xml"����������н������������Ӧ���ݵ�XML DOM�ĵ���
3. status����Ӧ��HTTP״̬
4. statusText��HTTP״̬��˵��

���յ���Ӧ��
1. ���status����
- ��HTTP״̬��Ϊ200��Ϊ�ɹ��ı�־
- ״̬��Ϊ304��ʾ������Դ��û�б��޸�
2. �첽���󣬼��XHR�����readyState���ԣ������Ա�ʾ����/��Ӧ���̵ĵ�ǰ��׶�
- 0��δ��ʼ������δ����open()����
- 1���������Ѿ�����open()����������δ����send()����
- 2�����͡��Ѿ�����send()������������δ���ܵ���Ӧ
- 3�����ܡ��Ѿ����ܵ�������Ӧ���ݡ�
- 4����ɡ��Ѿ����ܵ�ȫ����Ӧ���ݣ����ҿ����ڿͻ���ʹ���ˡ�
3. ֻҪreadyState�ı䣬���ᴥ��һ��readystatechange�¼���
4. �ڵ���open()֮ǰָ��onreadystatechange�¼�����������ȷ��������������ԡ�
5. �ڽ��յ���Ӧ֮ǰ�����Ե���abort()������ȡ���첽����
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
### HTTPͷ������
�ڷ���XHR�����ͬʱ�����ᷢ������ͷ����Ϣ
- Accept��������ܹ�������������͡�
- Accept-Charset��������ܹ���ʾ���ַ�����
- Accept-Encoding��������ܹ������ѹ�����롣
- Accept-Language���������ǰ���õ�����
- Connection��������������ֱ�����ӵ����͡�
- Cookie����ǰҳ�����õ��κ�Cookie��
- Host�����������ҳ�����ڵ���
- Referer�����������URL
- User-Agent��������û������ַ�����

1. ʹ��setRequestHeader()�������������Զ��������ͷ����Ϣ��
���������������������ͷ���ֶ����ƺ�ͷ���ֶε�ֵ��
Ҫ�ɹ���������ͷ����Ϣ�������ڵ���open()����֮���ҵ���send()����֮ǰ����setRequestHeader()
2. ����XHR�����getResponseHeader()����������ͷ���ֶ����ƣ�����ȡ����Ӧ����Ӧͷ����Ϣ��
3. ����getAllResponseHeader()��������ȡ��һ����������ͷ����Ϣ�ĳ��ַ���

### GET����
����������URL��ĩβ��Ӳ�ѯ�ַ�������
```
function addURLParam(url, name, value) {
  url += (url.indexOf("?") == -1 ? "?" : "&");
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}
```
### POST����
```
xhr.open("post", "example.php", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var form = document.getElementById("user-info");
xhr.send(serialize(form));
```
## XMLHttpRequest 2��

### FormData
FormDataΪ���л����Լ����������ʽ��ͬ�����ݣ�����ͨ��XHR���䣩�ṩ
�˱�����
```
var data = new FormData();
data.append("name", "Nicholas");
//var data = new FormData(document.forms[0]);
```

### ��ʱ�趨
�ڹ涨��ʱ����û�н��ܵ���Ӧ���ͻᴥ��timeout�¼�
```
xhr.timeout = 1000; //����ʱ����Ϊ1���ӣ���������IE8+��
xhr.ontimeout = function(){
  alert("Request did not return in a second.");
};
```

### overrideMimeType()����
ͨ������overrideMimeType()���������Ա�֤����Ӧ����XML���Ǵ��ı�������
```
xhr.overrideMimeType("text/xml");
```
����overrideMimeType()������send()����֮ǰ�����ܱ�֤��д��Ӧ��MIME���͡�

## �����¼�
��ͻ��˷�����ͨ���йص��¼�
- loadstart���ڽ��յ���Ӧ���ݵĵ�һ���ֽ�ʱ������
- progress���ڽ�����Ӧ�ڼ�������ϵش�����
- error��������������ʱ������
- abort������Ϊ����abort()��������ֹ����ʱ������
- load���ڽ��յ���������Ӧ����ʱ������
- loadend����ͨ����ɻ��ߴ���error��abort��load�¼��󴥷���

### load�¼�
��Ӧ������Ϻ󽫴���load�¼������Բ��ü��readyState����
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

### progress�¼�
progress�¼���������������������ڼ������Եش�����
onprogress�¼�����������յ�һ��event����
lengthComputable��һ����ʾ������Ϣ�Ƿ���õĲ���ֵ
position ��ʾ�Ѿ����յ��ֽ���
totalSize ��ʾ����Content-Length��Ӧͷ��ȷ����Ԥ���ֽ���
```
xhr.onprogress = function(event){
  var divStatus = document.getElementById("status");
  if (event.lengthComputable){
    divStatus.innerHTML = "Received " + event.position + " of " +event.totalSize +" bytes";
  }
};
```
�����ڵ���open()����֮ǰ���onprogress�¼��������

## ��Դ��Դ����
1. ͨ��XHR��ʵ��Ajaxͨ�ŵ�һ����Ҫ���ƣ���Դ�ڿ���ȫ���ԡ�Ĭ������£�XHR����ֻ�ܷ������������ҳ��λ��ͬһ�����е���Դ
2. CORS(������Դ����)��ʹ���Զ����HTTPͷ�������������������й�ͨ��
3. �ڷ�������ʱ����Ҫ��������һ�������Originͷ�������а�������ҳ���Դ��Ϣ(Э�顢�����Ͷ˿�)
4. �����������Ϊ���������Խ��ܣ�����Access-Control-Allow-Originͷ���лط���ͬ��Դ��Ϣ(����ǹ�����Դ���ͷ���*)
5. ���û�����ͷ�������������ͷ����Դ��Ϣ��ƥ�䣬������ͻᲵ������

### IE��CORS��ʵ��
IE8��������XDR��XDomainRequest�����ͣ���ʵ�ְ�ȫ�ɿ��Ŀ���ͨ�š�
1. cookie�����������ͣ�Ҳ��������Ӧ���ء�
2. ֻ����������ͷ����Ϣ�е�Content-Type�ֶΡ�
3. ���ܷ�����Ӧͷ����Ϣ��
4. ֻ֧��GET��POST����
��Щ�仯ʹCSRF��Cross-Site Request Forgery����վ������α�죩��XSS��Cross-Site Scripting����
վ��ű���������õ��˻��⡣���������Դ���Ը�������Ϊ���ʵ��������ݣ��û�������Դҳ��ȣ�
�������Ƿ�����Access-Control- Allow-Originͷ������Ϊ�����һ���֣�Originͷ����ֵ��ʾ
�������Դ���Ա�Զ����Դ��ȷ��ʶ��XDR����
```
var xdr = new XDomainRequest();
xdr.onload = function(){
  alert(xdr.responseText);
};
xdr.open("get", "http://www.somewhere-else.com/page/");
xdr.send(null);
```
1. ����һ��XDomainRequest��ʵ��
2. ����open()��������������ͺ�URL
3. �ٵ���send()����
4. ���е�XDR�������첽ִ�еģ���������������ͬ������
5. ���󷵻غ�ᴥ��load�¼�
6. ��Ӧ������Ҳ�ᱣ����responseText������
7. �ڽ��յ���Ӧ����ֻ�ܷ�����Ӧ��ԭʼ�ı�
8. û�а취ȷ����Ӧ��״̬����
9. ֻҪ��Ӧ��Ч�ͻᴥ��load�¼�
10. ���ʧ�ܣ�������Ӧ��ȱ��Access-Control-Allow-Originͷ�����ͻᴥ��error�¼�
Ҫ�����󣬿���ָ��һ��onerror�¼��������
```
xdr.onerror = function(){
  alert("An error occurred.");
};
```
11. �����󷵻�ǰ����abort()����������ֹ����
12. XDR����Ҳ֧��timeout�����Լ�ontimeout�¼��������
13. XDR�����ṩ��contentType���ԣ�������ʾ�������ݵĸ�ʽ

### �����������CORS��ʵ��
Ҫ����λ����һ�����е���Դ��ʹ�ñ�׼��XHR������open()�����д������URL����
```
xhr.open("get", "http://www.somewhere-else.com/page/", true);
```
��IE�е�XDR����ͬ��ͨ������XHR������Է���status��statusText���ԣ����һ�֧
��ͬ������

����XHR��������:
- ����ʹ��setRequestHeader()�����Զ���ͷ����
- ���ܷ��ͺͽ���cookie��
- ����getAllResponseHeaders()�����ܻ᷵�ؿ��ַ�����

### Preflighted Reqeusts
1. Origin����򵥵�������ͬ
2. Access-Control-Request-Method����������ʹ�õķ���
3. Access-Control-Request-Headers������ѡ���Զ����ͷ����Ϣ�����ͷ���Զ��ŷָ�
�����������󣬷��������Ծ����Ƿ������������͵�����
������ͨ������Ӧ�з�������ͷ����
��������й�ͨ��
1. Access-Control-Allow-Origin����򵥵�������ͬ
2. Access-Control-Allow-Methods������ķ�������������Զ��ŷָ���
3. Access-Control-Allow-Headers�������ͷ�������ͷ���Զ��ŷָ�
4. Access-Control-Max-Age��Ӧ�ý����Preflight���󻺴�೤ʱ�䣨�����ʾ��

### ��ƾ�ݵ�����
ͨ����withCredentials��������Ϊtrue������ָ��ĳ������Ӧ�÷��͵�ƾ��

### ���������CORS
���XHR�Ƿ�֧��CORS����򵥷�ʽ�����Ǽ���Ƿ����withCredentials���ԡ�
�ٽ�ϼ��XDomainRequest�����Ƿ���ڣ��Ϳ��Լ������������ˡ�

## ����������

### ͼ��Ping
һ����ҳ���Դ��κ���ҳ�м���ͼƬ�����õ��Ŀ��򲻿���ͼ��Ping������������м򵥣�����Ŀ���ͨ�ŵ�һ�ַ�ʽ�������������ͨ����ѯ�ַ�����ʽ���͵ģ�����Ӧ�������κ����ݣ���ͨ��������ͼ��204��Ӧ��ͨ��ͼ��Ping��������ò����κξ�������ݣ���ͨ������load��error�¼�������֪����Ӧ��ʲôʱ����յ��ġ�
```
var img = new Image();
img.onload = img.onerror = function(){
  alert("Done!");
};
img.src = "http://www.example.com/test?name=Nicholas";
```
ͼ��Ping����ڸ����û����ҳ���̬����ع������ͼ��Ping��������Ҫ��ȱ�㣬һ��ֻ�ܷ���GET���󣬶����޷����ʷ���������Ӧ�ı�����ˣ�ͼ��Pingֻ���������������������ĵ���ͨ�С�

### JSONP(���ʽJSON�����ʽJSON)
- JSONP��JSON����ֻ�����Ǳ������ں��������е�JSON
```
callback({'name':'zy'});
```
- JSONP����������ɣ��ص����������ݡ��ص������ǵ���Ӧ����ʱӦ����ҳ���е��õĺ������ص�����������һ������������ָ���ġ������ݾ��Ǵ���ص������е�JSON���ݡ�
- JSONP��ͨ����̬<script>Ԫ����ʹ�õģ�ʹ��ʱ����Ϊsrc����ָ��һ�������URL����<img>��ǩ���ƣ����������������Ƶش������������Դ����ΪJSONP����Ч��JavaScript���룬������������ɺ󣬼���JSONP��Ӧ���ص�ҳ�����Ժ󣬾ͻ�����ִ�С�
```
function handleResponse(response){
  alert("You��re at IP address " + response.ip + ", which is in " +response.city + ", " + response.region_name);
}
var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);
```
JSONP�ŵ㣺�ܹ�ֱ�ӷ�����Ӧ�ı���֧����������������֮���˫��ͨ�š�
JSONPȱ�㣺JSONP�Ǵ��������м��ش���ִ�У���������򲻰�ȫ�����п��ܼд�������룬����ʱ������ȫ����JSONP�⣬û�а����������ʹ�ò������Լ���ά��Web����ʱ��һ��Ҫ��֤����ȫ�ɿ������У�Ҫȷ��JSONP�����Ƿ�ʧ�ܲ������ס���ȻH5��<script>Ԫ��������һ��onerror�¼�������򣬵�Ŀǰ��û�еõ��κ������֧�֡�

### Comet
Ajax��һ�ִ�ҳ����������������ݵļ�������Comet����һ�ַ�������ҳ���������ݵļ�����Comet�ܹ�����Ϣ����ʵʱ�ı����͵�ҳ���ϣ��ǳ��ʺϴ������������ķ����͹�Ʊ���ۡ�
1. ������ʵ��Comet�ķ�ʽ������ѯ������
- ����ѯ
  1. ����ѯ�Ǵ�ͳ��ѯ��Ҳ��Ϊ����ѯ����һ�����棬���������ʱ��������������󣬿���û�и��µ�����
  2. ҳ�淢��һ����������������Ȼ�������һֱ�������Ӵ򿪣�ֱ�������ݿɷ��͡�
  3. ����������֮��������ر����ӣ��漴�ַ���һ������������������
  4. ��һ������ҳ����ڼ�һֱ�������ϡ�
��ѯ�����ƣ��������������֧�֣���Ϊʹ��XHR�����setTimeout()����ʵ�֡�����Ҫ���ľ��Ǿ���ʲôʱ��������
- ��
�ڶ������е�Cometʵ����HTTP��������ͬ������������ѯ����Ϊ����ҳ�����������������ֻʹ��һ��HTTP���ӡ�������˵����������������������һ�����󣬶��������������Ӵ򿪣�Ȼ�������Ե���������������ݡ����з����������Զ�֧�ִ�ӡ���������Ȼ��ˢ�£�����������е�����һ����ȫ�����͵��ͻ��ˣ��Ĺ��ܡ���������ʵ��HTTP���Ĺؼ����ڡ�