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
