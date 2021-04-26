### 窗口对象

- 最基本的窗口对象是window，具有一个top的别名，也是全局作用的作用对象。一切在全局作用域下声明的变量和方法都会成为它的属性；
- 当页面引入多个、多层frame时，应该用top作为最顶层对象的名称，因为每一个frame都有自己的window对象；
- parent对象指向当前frame的window对象的上层window对象
- parent和top都是当前frame的window对象的属性

### 窗口位置

- 不同浏览器有不同的计算属性，除firefox使用screenX和screenY来提供窗口位置信息，chrome，opera除了这两个属性外还使用screenLeft和screenTop表示当前窗口的位置信息；
- 这些属性都是挂载在window对象上的属性，都是窗口相对于整个屏幕的位置信息；
- 当某个窗口最大化之后其screenTop和screenLeft就永远为0；
- 控制位置的方法有：window.moveTo/moveBy，前者会指定窗口移动的具体坐标，后者单纯移动；
- 只有通过window.open打开的页面才支持这两个方法，剩下的统统无效

### 窗口大小：

- outerWidth/outerHeight：返回浏览器本身的宽高
- innerWidth/innerHeight：返回页面可视区的宽高
- document.documentElement.clientWidth/clientHeight：纯可视区（不包含滚动条）的宽高
- resizeTo/resizeBy，前者设定指定大小，后者设定值为新窗口和旧窗口宽高之差，且这两个方法只能在通过window.open创建的页面上使用

### 导航

- window.open(url，target，arrributes_string，是否取代当前浏览器打开页面历史的布尔值)

  url：加载的路由；

  target：如果值为一个已经存在的窗口或frame，则在该窗口或frame加载路由；否则创建一个新窗口且名为target的值。另外，target也可以为\_self,\_parent,\_top或\_blank，分别代表不同的页面打开方式

- window.open方法会返回一个类window对象，我们可以通过调整该对象来调整新打开的窗口。该对象还支持close方法来关闭打开的页面

- 方法返回的对象上还有一个opener属性，指向调用方法的窗口或框架。但框架上并不存在这种属性，因此如果想追踪只能手动。

### 对话框：

- 系统对话框的样式无法由css改变，只能依据浏览器变化
- alert(text)：显示text和一个确定按钮
- confirm(text)：显示一段文本和确定/取消按钮，方法返回一个布尔值
- prompt(text,default_input_text)：显示一段文本和一个输入框，输入框中是一段设定的默认值，还有确定/取消按钮。确定则返回输入值，否则返回null

### location对象：

- 提供了有关当前窗口的信息，附带导航功能；
- 对象主要属性：
  1. hash：返回url中的hash；
  2. host：返回服务器的名称和端口号；
  3. hostname：返回服务器名称；
  4. href：返回完整url，location对象的toString方法也返回同样的值；
  5. pathname：返回url中的目录和文件名；
  6. port：返回端口号；
  7. protocol：返回使用的协议；
  8. search：返回url中的查询字符串，可以用URLSearchParams对象封装，有很多方便的api；
- 位置操作：
  1. location.assign(url)：立即打开新url并在浏览器历史记录中生成新纪录。location.href = url、window.location = url也能做到相同的事；
  2. 每次修改location的属性值，页面都会以新url重新加载且生成记录；
  3. 如果不想生成记录，就用replace方法；
  4. reload：无需参数，只需要调用就能刷新页面

### navigation对象：

- 浏览器对象，属性大部分都是表述当前浏览器的具体信息的。如plugins代表浏览器中安装的插件信息数组，可以利用它来检测是否安装某些插件
- registerContentHandler/registerProtocolHandler：h5方法，让一个站点指明它可以处理特定类型的信息；
- registerContentHandler（要处理的MIME类型，可以处理该MIME类型的url，应用程序名称）
- registerContentHandler（要处理的协议类型，可以处理该协议类型的url，应用程序名称）

### screen对象：

- 表明浏览器参数信息

### history对象：

- window对象属性，保存用户访问过的url信息
- 具有三个属性，length最重要，表示访问过的url数量
- go(number / url)：传入number时则会前进/后退对应的页数，正数前进，负数后退；传入url，如果访问过该url则跳转到该页面，否则无响应
- forward/back：前进/后退一页