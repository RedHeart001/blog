### XMLHttpRequest一级

​	大部分的浏览器都已经支持**XMLHttpRequest**对象（除了低版本的IE仍然使用**ActiveXObject**）。核心api主要有以下几个：

```js
	// 创建xhr对象
	let xhr = new XMLHttpRequest();

    // 监听xhr对象的readyState属性，当该属性发生改变时会调用回调函数。readyState通常具有以下状态：
    // 0：未初始化，尚未调用 open()方法；
    // 1：启动，已经调用 open()方法，但尚未调用 send()方法；
    // 2：发送，已经调用 send()方法，但尚未接收到响应；
    // 3：接收，已经接收到部分响应数据；
    // 4：完成，已经接收到全部响应数据，而且已经可以在客户端使用了。
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          //请求成功后，xhr的responseText，status将会自动填充
          console.log(xhr.responseText);
        } else {
          alert("Request was unsuccessful: " + xhr.status);
        }
      }
    };

	// 启动xhr请求，分为post和get

	// GET
	xhr.open("get", "http://39.100.26.51/a/liao?name=hh&age=23", true); //参数依次代表请求的方式（get、post），请求的目标地址（包含params和query，后端自行处理），请求是否为异步
    xhr.send(null); //向目标地址发送信息的主体，当无需发送信息时，可以传入一个null

	// POST
    xhr.open("post", "http://39.100.26.51/a/liao");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置请求头，以表单形式发送数据，这一步必须确保请求是启动的

	// 请求头类型及含义：
    // Accept：浏览器能够处理的内容类型。
    // Accept-Charset：浏览器能够显示的字符集。
    // Accept-Encoding：浏览器能够处理的压缩编码。
    // Accept-Language：浏览器当前设置的语言。
    // Connection：浏览器与服务器之间连接的类型。
    // Cookie：当前页面设置的任何 Cookie。 
	// Host：发出请求的页面所在的域 。 
	// Referer：发出请求的页面的 URI。注意，HTTP 规范将这个头部字段拼写错了，而为保证与规范一致，也只能将错就错了。（这个英文单词的正确拼法应该是 referrer。）
    // User-Agent：浏览器的用户代理字符串。

    xhr.send("msg=testMessage");	// 后端接收的是一个对象
	
```

### XMLHttpRequest二级

#### FormData

​	一种更加方便的传输表单数据的数据格式，可以免去设置请求头，具体如下：

```js
xhr.open("post", "http://39.100.26.51/a/liao");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // 设置头部，表单发送，这一步必须确保请求是启动的
let form = document.getElementsByTagName("form")[0];
let formData = new FormData(form);
formData.append("msg", "test Message!");	//允许自设键值对
xhr.send(formData); // formData的格式很特别，目前没有找到解析的办法，只能用formData自带的api操作
```

​	下一步要学习content-type 的具体用法

#### 超时机制

```js
xhr.open("post", "http://39.100.26.51/a/liao");	//	任何设置都必须先启动请求
xhr.timeout = 1000; // 设置超时
// 超时调用函数
xhr.ontimeout = () => {
alert("timeout!please request again!");
};

// 为了避免在超时时限到达的一瞬间，readyState状态变为4，可以在onreadyStateChange中加入try/catch判断
```

#### **overrideMimeType（重写响应类型）**

```js
// 这个方法的主要应用场景在于当服务器返回的MIME类型与内容不符时，可以由客户端来手动修改
//假设服务器返回一个xml格式的文件，MIME的类型是text/plain，此时就需要调该方法重写MIME类型；
//这个方法只能在open之后调用
xhr.overrideMimeType("text/html");
```

#### 事件进度

```
对于xhr而言，任何事件都可以分解为六个进度事件：loadstart（开始），progress（加载中），error（数据加载出错），abort（数据加载中止），load（数据加载完毕），loadend（事件完成）

load和progress事件的回调函数中，参数都是event对象
```

