## DOM1

### 节点层级

​	对DOM来说，任何文档都可以是多层、多节点构成的树状结构。结构里的节点能分为多种类型，每种类型的节点都携带着不同的信息和标记。

### 节点属性

- `nodeType`

  ​	所有的DOM节点都具有一个名为**nodeType**的属性，不同数字和常量名称对应不同的节点类型，其中数字表示是兼容于所有浏览器的，常量会在IE8报错。类型共有12种，分别是：

  ```js
  元素节点            　　Node.ELEMENT_NODE(1)
  属性节点            　　Node.ATTRIBUTE_NODE(2)
  文本节点            　　Node.TEXT_NODE(3)
  CDATA节点             Node.CDATA_SECTION_NODE(4)
  实体引用名称节点    　　 Node.ENTRY_REFERENCE_NODE(5)
  实体名称节点        　　Node.ENTITY_NODE(6)
  处理指令节点        　　Node.PROCESSING_INSTRUCTION_NODE(7)
  注释节点            　 Node.COMMENT_NODE(8)
  文档节点            　 Node.DOCUMENT_NODE(9)
  文档类型节点        　　Node.DOCUMENT_TYPE_NODE(10)
  文档片段节点        　　Node.DOCUMENT_FRAGMENT_NODE(11)
  DTD声明节点            Node.NOTATION_NODE(12)
  ```

- `nodeName`

  DOM节点的另一属性，始终保存着节点元素的标签名。

- `childNodes`

  ​	每一个节点都具有一个名为**childNodes**的属性，该属性的值是一个**该节点下所有的子节点构成的NodeList类数组**，而且和**getElement系列方法**一样是动态更新的。

  ​	值得一提的是，虽然该属性和children属性同样是获取当前节点下的子节点，但childNodes会获取所有节点（）不论类型，而children只获取**元素节点**。

- `parentNode`

  ​	指向文档树中，当前节点的父级节点。

  ​	而对于当前节点的父节点来说，childNodes中的都是当前节点的兄弟节点，通过访问当前节点的**previousSibling**和**nextSibling**属性可以获得该节点的相邻兄弟节点（**获取的不一定是元素节点**）。

  ​	父节点的**firstChild**和**lastChild**分别指向父级节点的childNodes种的第一个节点和最后一个节点（**这里获取的不一定是元素节点**，如果需要元素节点，应使用**firstElementChild和lastElementChild**）

#### 节点操作

- `parentNode.appendChild(newNode) / append(newNode | DOMString)`
  
  1. 若新添加的节点并不存在于父节点的**childNodes**，则添加到**childNodes**的尾部，且自动更新**lastChild**；
  2. 如果新添加的节点就是原文档的一部分，那么最终得到的结果就相当于**移位**，即把已存在的节点移动到**childNodes**最末尾的位置；
  3. 两者的区别在于appendChild只能传入一个节点，返回值为传入的节点；而append可以同时传入多个，但无返回值。
  
- `insertBefore(newNode,target)`

  第一个参数为添加的新节点，第二个参数为目标节点。新节点会出现在目标节点之前，同时目标节点previousSibling更新为newNode

- `parentNode.replaceChild(newNode，oldNode)`

  第一个参数为要替换进DOM树的新节点，第二个参数为被替换的节点

- `parentNode.removeChild(deleteNode)`

  只接收一个参数，为要删除的节点

- `someNode.cloneNode(boolean)`

  复制节点并返回节点副本，参数为布尔值，决定是否深复制。

  但返回的副本并不归于文档流，因此需要appendChild，replaceChild或insertBefore来把节点添加到文档中中。

### Document类型

- 浏览器中，document对象是HTMLDocument类型（继承自Document类型）的一个实例，表示整个HTML页面，其childNodes属性种只有html元素。document对象也是window对象的一个属性；

- 文档子节点访问：

  ```js
  document.documentElement 或 document的childNodes属性 ==》指向html
  document.body  ==》指向body
  document.title ==》指向head下的title标签
  ```

- 元素查找

  ```
  getElementById：
  	根据元素attributes中的id特性查找并返回单个元素。查找顺序为前往后，最终返回最早出现的元素；
  getElementsByTagNmae：
  	根据标签名返回一个包含所有指定标签的HTMLCollection，可以使用方括号或者item(index)访问单独的项。HTMLCollection也支持通过name属性来访问具体的项，但不可遍历具体方法是方括号和namedItem();
  	方法也可传入'*'，返回所有类型的标签
  getElementsByName：
  	返回所有name属性为传入参数的标签的HTMLCollection
  ```

- 文档写入

  ```
  document有把输出流写入到文档的能力，其方式为：
  .write(str)/writeln(str)：把字符串写入网页，后者会自动在末尾增加换行符
  ```

- 创建元素

  ```
  document.createElement(nodeName)：创建并返回一个不包含于DOM树的元素节点，参数只能为标签名；
  									唯一的例外是IE，允许传入一整个完整的节点型字符串
  ```

### Element类型

- Element类型用于表现XML和HTML元素，提供了对元素标签名（tagName属性），子节点和特性（attributes）的访问，可以认为是大部分的标签；

- 任何HTMLElement都具有id，className（作为属性名时是className，作为特性访问时是class），title，lang（元素内容的语言代码），dir（语言的方向，值为ltr和rtl）这五个特性，且可以直接通过点方法获取；

- 特性操作（attributes）

  `someNode.setAttribute(attrName,value)/getAttribute(attrname)/removeAttribute(attrName)`

  除了五个固有特性可以通过访问节点的属性获取之外，自定义的特性只能通过getAttrbutes方法访问得到；

  **两类特殊特性：style和onclick这样的事件处理程序。**

  **style如果直接通过属性访问，最终得到的就是一个对象；通过getAttribute方法则会得到一个CSS文本；**

  **onclick也是相同，返回的是代码的字符串。**

  自定义属性只能通过setAttribute方法设置，其属性名会**自动转为小写**。点方法设置的属性都是无效值（oDiv.myAttr = val  == 》 无效表达）

- attributes属性

  Element类型的DOM节点都具有一个名为**attributes**，值类型为**NamedNodeMap**的属性。NamedNodeMap类似于NodeList，里面保存着所有的特性（attribute），且每一个元素都具有nodeName和nodeValue这两个属性；

### 文本节点

- nodeName：#text，nodeValue：文本值，不存在子节点，父节点是Element
- 创建文本节点：document.createTextNode(text)，需要认为插入文档流
- 当在元素节点中插入两个文本节点时，文档流很可能出现混乱。可以用**normalize()**方法，合并相邻的文本节点（elementNode.normalize() ==》合并**elementNode**中所有的文本节点）
- 和normalize方法相反，还存在分割文本节点的`textNode.splitText(posi)`方法。以现有文本节点从开始的位置到指定位置为一个文本节点，剩下的内容为第二个文本节点。

### DocumentFragment

- 轻量级的文档元素，可以包含和控制节点，但不占用额外资源；
- document.createDocumentFragment()方法可以创建一个fragment，支持所有的element方法

### DOM操作技术

- 动态脚本（页面加载时不存在，未来某一时刻需要）
  1. 动态创建script标签，然后设置url，插入到body元素中。但这种方法无法判断何时加载完毕；
  2. 另一种方式是在创建script标签后，通过script标签的text属性，人为给script标签中增加脚本内容（插入有**两种情况**：对于非IE浏览器，直接在script标签中插入文本节点即可，IE必须通过text属性，传入一个字符串）
- 动态样式（同上）
  1. 动态创建link标签，手动设置type，rel，href属性值，最后插入到head标签；
  2. 手动创建style标签，设置type属性，人为增添内容（IE需要调用style.styleSheet.cssText属性，传入一个CSS格式的字符串；非IE则传入一个文本节点，内容为CSS格式的字符串）

### NodeList、HTMLCollection和NamedNodeMap

- 本质都是文档查询结果的动态集合，文档树结构的变化会实时反应到集合里；
- 都具有iterator接口，因此可以for..of遍历（HTMLCollection不支持forEach）

## DOM扩展

- `document/element.querySelector(CSS-Selector)/querySelectorAll(CSS-Selector)`

  静态方法，返回的结果不会因为文档结构而变化。前者返回第一个匹配css选择器的节点，后者返回所有匹配css选择器的NodeList；

- `element.matchesSelector(CSS-Selector)`

  检测元素是否匹配css选择器，返回一个布尔值。但存在兼容性问题，各浏览器支持方式不同，需要注意；

- HTML5新增加的DOM相关API：

  ```js
  getElementsByClassName(className)：可以传入多个类名，以空格分隔。返回结果是一个NodeList；
  classList属性：所有的节点都具有该属性，可以针对节点单独的类名进行操作（add、remove、contains、toggle(className)，分别代表增、删、判断包含、存在则删除，不存在则增加，参数为类名）
  ```

- 焦点管理

  - 传统的焦点方式有页面加载，用户输入，js的focus()方法。document对象下的activeElement属性始终指向DOM中获得了焦点的对象；
  - 默认情况下，文档加载完成后document.activeElement指向document.body。文档加载期间activeElement的值为null；
  - document.hasFocus()：确定document是否获得焦点。

- 自定义数据属性

  - HTML5允许给元素节点增添非标准的属性，用于提供与渲染无关的信息。这些属性都以“**data-**”为前缀：

    ```html
    <li class="btn active" myattr='myattr' data-first='first' data-second='second'></li>
    ```

  - 这种的自定义属性都会保存在节点的**dataset**属性中，以**DOMStringMap**的形式统一保存，通过点方法和“[keyName]”即可访问里面的键值对；同时自定义属性也可以在**attributes**属性中获取，通过**set/getAttribute**方法操做。

- innerHTML / outerHTML

  1. innerHTML

     节点的**innerHTML**属性反映节点的子节点树结构，也可操作这个属性替换子节点树结构。

     **注意**，有一些标签是innerHTML设置无效的，如：col，colgroup，head，frameset，html，style，table，tbody，thead，tfoot，tr。

  2. outerHTML

     读：返回包括调用节点在内的整个子节点树；写：用html字符串替换整个调用节点；

     ```js
     var op = document.getElementsByTagname('p');
     p.outerHTML;	// '<p>old p</p>'
     ou.outerHTML = '<div>new p</div>'	//"<div>new div</div>"
     ```

- `element.insertAdjacentHTML(posi,HTMLText)`

  ```
  posi（String）:
  	beforebegin：在element之前增添一个同辈元素；
  	afetrbegin：在element下增添一个新元素或在element的第一个子元素之前增添一个新元素；
  	beforeend：在element下增添一个新元素或在element的最后一个子元素之后增添一个新元素；
  	afterend：在element之后增添一个同辈元素；
  HTMLText：html字符串
  ```

- innerText / outerText

  1. innerText

     该属性会返回当前节点中包含的所有文本，**读操作**的顺序是从上到下，由外至内；**写操作**会删除所有的子节点，再把传入的内容转为文本节点插入

  2. outerText

     作用范围扩展至调用节点本身。**读操作**得到的结果**与innerText并无区别**，**写操作**会直接**把整个节点及子节点树删除**，然后插入文本节点

## DOM2、DOM3

​	DOM1的核心是DOMCore和DOMHTML。前者是规定如何基于XML映射文档，后者在前者的基础上增加控制文档中节点的访问API和属性；

​	如果说DOM1是对HTML和XML的底层结构定义，DOM2和DOM3则是在其基础上引入了更多的交互能力。DOM2除了增强本来就有的Core和HTML两个模块，还新增加了**Views**（定义基于样式信息的不同视图），**Events**（用事件与文档交互），**Style**（以编程的方式访问和改变css样式）和**T&R**（遍历和范围，引入了遍历文档和选择特定部分的新接口）四个模块。

- 命名空间

  ​	命名空间是XML和XHTML中涉及的概念，相当于为元素定义所属的集合，这样就不会因为重名而发生冲突。

  ​	相对于DOM1，DOM2给节点（document、element）增加了几个有关命名空间的属性（localName不带前缀的节点名称，namespaceURI命名空间的URI，prefix命名空间前缀）以及相关的访问方法，DOM3更增加了有关命名空间的新方法

- 新的DOM变化（与命名空间无关）

  - DocumentType

    ```
    新增publicId，systemId和internalSubset三个属性，都挂在document.doctype下
    ```

  - Document

    ```
    DOM2为document添加了一个名为defaultView的新属性，指向当前文档的的窗口（window对象）
    document.implementation.createDocumentType / createDocument：创建DocType节点/XML文档
    						.createHTMLDocument(titleString)：创建一个完整的html结构
    ```

  - Node

    ```
    节点比较方法：
    	someNode.isSameNode(node)/isEqualNode(node)：比较someNode与node是否相同/相等。相同指的是两个节点引用的使用一个对象，相等指两个节点的nodeName，nodeValue，childNodes和attributes相同
    ```

  - 框架（ifame）

    ```
    框架（HTMLFrameElement）和内嵌框架（HTMLIFrameElement）在DOM2都增加了一个新的属性contentDocument，该属性指向框架的document对象
    ```

- 样式

  - document.implementation.hasFeature(feature,version)：DOM的实现是否支持某项功能

  - 访问元素样式

    - 任何支持style特性的HTML元素在js中都有一个对应的style属性，值是一个CSSStyleDeclaration（**具有iterator属性**）实例，里面包括所有以style特性（即**行内样式**）指定的元素样式；

    - **DOM2中**，style对象有了新的方法和属性：

    ```
    cssText：style特性（行内样式）中的css代码，重写会全覆盖
    length：style特性中的css属性数量
    getPropertyValue（propName）：根据属性名获取属性值
    removeProperty（propName）：删除css属性
    item（index）：根据序号获得对应的style特性
    setProperty（propName，value，priority）：第三个参数值为import或空格，代表给css属性设置!important
    ```

    - 计算样式

      style对象可以给出当前元素的css信息，但却无法反应收到层叠样式影响后，当前元素的样式信息。

      **getComputedStyle(node,isFakeNode)**：返回计算层叠之后的元素样式信息（border除外）；

      IE中提供了一个名为currentStyle的属性，可以返回带有相同信息的**CSSStyleDeclaration**对象（border除外）。

  - 操作样式表

    - document对象同样具有一个**styleSheets**属性，值为一个StyleSheetList实例，里面包含页面中所有的style标签的对应js的**CSSStyleSheet**实例和所有**rel**为**stylesheet**的link标签对应的**CSSStyleSheet**实例；

    ```
    CSSStyleSheet实例：
    	ownerRule: null
    	cssRules: 样式表中所有的css规则
    	rules: 同上，为防止IE不支持cssRules
    	type: "text/css"
    	href: 指向样式表引入路径（不是引入则为null）
    	ownerNode: 指向样式表对映的节点
    	parentStyleSheet: null
    	title: ownerNode中title的值
    	media: MediaList {mediaText: "", length: 0}
    	disabled: 布尔值，是否禁用样式表
    ```

    - style和link对应的**js对象**具有**sheet**属性，值为对应的**CSSStyleSheet**实例；

    - 创建，插入，删除CSS规则

      ```
      CSSStyleSheet对象具有insertRule(rule,index)和deleteRule(index)方法，用于往对象的cssRules中增/删css规则。
      前者插入的样式字符串会顶替原有规则位置，同时cssRules长度加一，后者根据位置删除规则
      ```

  - 元素的大小

    - 偏移量（offset）：

      ```
      offsetHeight：元素在垂直方向上占用空间的大小，单位为px，包括元素的高度（height+上下padding）+元素上下border宽度+水平滚动条高度
      offsetWidth：元素在水平方向上占用空间的大小，单位为px，包括元素的宽度（width+左右padding）+元素左右border宽度+垂直滚动条宽度
      offsetLeft：当前元素相左外边框距离包含元素（offsetParent）左内边框的距离（px）
      offsetTop：当前元素相上外边框距离包含元素（offsetParent）上内边框的距离（px）
      ```

    - 客户区（client）：

      ```
      clientHeight：height+上下padding
      clientWidth：width+左右padding
      ```

    - 滚动大小（scroll）：

      ```
      scrollHeight：没有滚动条情况下，元素内容高度（标准盒下的height）
      scrollWidth：没有滚动条情况下，元素内容宽度（标准盒下的width）
      scrollLeft：被隐藏在内容区域左侧的像素数，该属性可改变滚动位置（元素必须具有滚动条，属性才有意义）
      scrollTop：被隐藏在内容区域上侧的像素数，该属性可改变滚动位置（元素必须具有滚动条，属性才有意义）
      ```

    - element.getBoundingClientRect()：返回一个对象，里面包含了元素相对于视口的位置
  
- 遍历

  - DOM2定义了两个用于辅助遍历的结构类型：NodeIterator和TreeWalker，这两个结构执行的都是基于**深度优先**的遍历；

  - NodeIterator

    ```
    document.createNodeIterator(rootNode,whatToShow,filter)	//创建NodeIterator对象，里面保存着条件过滤下被返回的节点
    	rootNode：遍历子树的根节点
    	whatToShow：确定遍历显示的节点，值为NodeFilter下的常量（如NodeFilter.SHOW_ALL会显示所有类型的节点，NodeFilter.SHOW_ELEMENT只显示元素节点等）
    	filter：值为一个对象或是一个函数。
    			对象：{
    				//该对象只有一个acceptNode函数用于设置节点过滤条件。如果允许节点被遍历，则返回值为NodeFilter.FILTER_ACCEPT，否则返回NodeFilter.FILTER_SKIP
    				acceptNode:function(node){	
    					.....
    				}
    			}
    			//原理和返回值同上
    			函数：function(node){
    				...
    			}
    			
    NodeIterator被创建之后，具有nextNode()和previousNode()两个方法可以用于改变对象内部指针指向的的节点。前者用于把指针前进一步，后者会使指针后退一步，每次调用方法都会返回指针指向的节点，如果遍历完成则返回null
    ```

  - TreeWalker

    ```
    document.createTreeWalker(rootNode,whatToShow,filter)	//创建TreeWalker对象，参数同上
    
    和NodeIterator类似，但相比更加灵活和高级，除了已有的方法，它提供了更多方向的遍历方法：
    parentNode()：把指针指向当前节点的父级节点
    firstChild()：把指针指向当前节点的第一个子节点
    lastChild()：把指针指向当前节点的最后一个子节点
    nextSibling()：把指针指向当前节点的下一个同辈节点
    previousSibling()：把指针指向当前节点的上一个同辈节点
    
    filter函数中新增加一个返回值：NodeFilter.FILTER_REJECT，作用与FILTER_SKIP相同，都是跳过当前节点，但SKIP只会跳过当前子树节点然后前进到下一个节点，REJECT则会跳过整个子树
    
    TreeWalker还具有一个currentNode的属性，指向当前指针指向的节点
    ```

## JS事件

- 事件流

  事件流描述了从页面中接收事件的顺序，JS的开发开发团队形成了两种意见：**事件冒泡**和**事件捕获**；

  1. 事件冒泡

     事件发生时由**最具体的元素（可以看作触发事件的元素）**接收，然后逐级向上传播；

     ```html
     <html>
         <body>
             <div class="father" style="width: 300px;height: 200px;border: 1px solid red;">
     			<div class="son" 
                 	 style="width: 200px;height: 100px;border: 1px solid red;margin: 			50px">
                	 Click me!
             	</div>
     		</div>
         	<script>
         		var oF = document.querySelector('.father'),
     					oS = document.querySelector('.son')
     				;
     				oF.onclick = function () {
     					console.log('father click!');
     				}
     				oS.onclick = function () {
     					console.log('son click!');
     				}
         	</script>
         </body>
     </html>
     //点击div.son，同时触发father和son点击事件，事件传播的顺序为：son =》 father =》 body =》 html =》 document，此为事件冒泡
     ```

  2. 事件捕获

     事件捕获的传播顺序与冒泡完全相反；

  3. DOM事件流

     - DOM2规定的**事件流**包括三个阶段：事件捕获，目标执行，事件冒泡。实际上，上面的例子的实际执行顺序应该是：document =》 body =》 father =》 son =》son执行事件 =》 father =》 body =》 document。

       因此在整个事件触发过程中，我们可以**在捕获和冒泡两个阶段操作事件对象**。

     - 事件本质就是**用户或者浏览器自身执行的某种操作**，回调函数即为**事件侦听器**

       偶尔也会有这种形式的事件侦听器：

       ```html
       <form action="ajax.html">
       		<input type="text" value="username" name="username">
       		<input type="button" val='input' value="click me" value="click me" onclick="console.log(username.value)">
           /* 点击button时，控制台会显示username的value */
       </form>
       ```

       上述格式的函数会**自动拓展作用域**，最大的作用就是**能够直接获取同一form下的表单元素的属性**，原理就像这样：

       ```js
       function(){
       	with(document){
       		with(this.form){
       			with(this){
                       ...
                   }
       		}
       	}
       }
       ```

     - DOM0级事件

       每个元素的onclick、onmousemove事件即为DOM0级事件；

     - DOM2级事件

       标准浏览器：

       ```
       element.addEventListener/removeEventListener(eventName,function,bool):
       	eventName：事件名，如click、mousemove等，
       	function：事件触发后的回调函数，
       	bool：决定在哪个阶段调用回调函数，true在捕获阶段，false则在冒泡阶段
       ```

       IE浏览器（在新版本浏览器中不支持）：

       ```
       element.attachEvent/deathEvent(eventName,function)
       	eventName：事件名，如onclick
       	function：回调函数
       ```

     - 事件对象event：

       只要触发事件，回调函数中就会自动生成一个event事件对象，重要的属性和方法有：

       ```
       target：触发事件的元素节点
       type：事件类型
       eventPhase：当前事件所处阶段，1为捕获阶段，2为处理阶段，3为冒泡阶段
       preventDefault()：阻止默认事件
       stopPropagation():停止事件在DOM层次中的传播（直接断掉后续所有的传播）
       ```

       IE中的event对象是挂载在window对象下的一个属性

     - 事件类型

       1. UI事件：用户与界面上的元素交互时触发，多与window对象和表单控件有关，具体包括load（页面加载完成），abort（嵌入内容未加载完全时触发），select（文本框input或textarea中的字符被选中），resize（窗口或框架大小变化时在window上触发），scroll（元素滚动条被滚动时触发）

       2. 焦点事件：

          ```
          blur：元素失去焦点，不冒泡
          focus：元素获得焦点，不冒泡
          ```

       3. 鼠标事件：

          - 鼠标事件：

            ```
            click：鼠标主键或回车触发
            dbclick：双击鼠标主键
            contextmenu：单击鼠标右键，显示菜单
            mousedown/mouseup：鼠标任意键按下/抬起时触发
            mouseenter/mouseleave：鼠标移入元素，不冒泡（DOM3）
            mousemove：元素内移动鼠标
            mouseout/mouseover：鼠标移出/入元素
            mousewheel：鼠标滚轮事件
            ```

          - 鼠标事件对象（**MouseEvent**）：

            ```
            鼠标光标位置：
            event.clientX/clientY：鼠标事件触发时，光标在客户区（即窗口，不包括工具栏）的坐标
            	.pageX/pageY：鼠标事件触发时，光标在页面中的位置（页面未滚动时，值与clientX/Y相同）
            			pageX = scrollLeft + clientX
            			pageY = scrollTop + clientY
            	.screenX/screenY：光标相对于整个屏幕的位置
            
            修改键：
            event.ctrlKey（ctrl键）
            	.shiftKey（shift键）
            	.altKey（alt键）
            	.metaKey(按住windows键触发事件)
            四者都是布尔值，按住键的情况下，触发事件则属性值为true，否则为fasle
            
            相关元素：
            当使用了mouseout/mouseover来触发元素移出/移入事件时，除了触发事件的元素，对于另一个被移入/移出的元素而言也是同样。
            因此event对象中有一个名为relatedTarget的属性指向这个相关对象
            
            鼠标按钮：
            鼠标事件对象中具有button属性，数值类型。0表示主鼠标按钮（左键），1表示中间鼠标的按钮（滚轮），2表示次鼠标按钮（右键）
            
            单击次数detail：
            鼠标事件对象具有detail属性，数值类型，表示鼠标在该位置单击了多少次。属性从1开始计数，一次完整的mounsedown/up会使detail加一。如果down之后移动了，则detail置零
            ```

            - 滚轮事件对象（WheelEvent）：

              ```
              wheelDelta：滚轮向上/向下滑动距离，向上值为正，向下为负
              ```

       4. 键盘与文本事件

          - DOM0提供了三个事件：

            ```
            keydown/keyup：任意键按下/抬起触发事件，前者按住不放会持续触发事件
            keypress：字符键按下时触发事件，按住不放会持续触发事件
            
            DOM3新引入一个事件：
            textInput：对keypress事件的补充，当用户在可编辑区域（input || textarea）中输入字符时会触发事件
            
            当同时定义所有事件时，按下字符键，首先触发keydown，然后顺序触发keypress和textInput，最后当抬起键时触发keyup，且前三者都是在文本框变化之前触发的；
            ```

          - 键盘事件对象（KeyboardEvent）：

            ```
            keyCode：键对应的数值，字符集遵循ASCII码
            
            DOM3增加了新的事件属性：
            	key，值为对应的键名，
            	location：数值，表示按下了什么位置的键，0为默认键盘，1为左侧位置（左侧alt），2为右侧位置（右侧shift），4为移动设备键盘，5为手柄
            ```

          - 文本事件对象（TextEvent）：

            ```
            textInput事件触发后的事件对象。
            .data：输入的字符（非字符编码）
            .inputMethod：只有IE支持该属性，返回一个数值，表示文本输入到文本框中的方式
            ```

       5. DOM变动事件

          - **DOM2**新增加了变动事件，能在DOM的某一部分发生变化时给出提示。

          - 插入节点（**DOMNodeInserted**）：

            ```
            当使用appendChild、replaceChild、insertBefore和insertAdjacentHTML插入节点到DOM树时，就会触发DOMNodeInserted事件
            生成的事件对象中，target属性指向新插入的节点，relatedNode属性指向新插入节点的父级节点
            ```

          - 删除节点（**DOMNodeRemoved**）：

            ```
            当调用removeChild、replaceChild从DOM中删除节点时，就会触发该事件。
            生成的事件对象同上
            ```

          - DOM结构变化（**DOMSubtreeModified**）：

            ```
            DOM结构中发生任何变化时都会触发该事件。这个事件的优先级最低。
            生成的事件对象同上
            ```

          - DOM结构特性变化（**DOMAttrModified**）：

            ```
            当特性（attribute）改变时触发事件。
            生成的事件对象同上
            ```

          - 文本节点值变化（**DOMCharacterDataModified**）：

            ```
            当文本节点值变化时触发事件。
            生成的事件对象同上
            ```

       6. HTML5事件

          ```
          contextmenu：鼠标右键菜单事件
          beforeunload：页面卸载前触发时间。event.returnValue的值要设置为显示的字符串，并在回调函数中return要显示的字符串
          DOMContentLoaded：页面中的内容都加载完毕之后触发事件
          readystatechange（IE）：提供与文档或元素的加载状态有关的信息
          hashchange：URL的参数列表（#之后的字符串）变化时触发事件
          ```
       
     - 性能与内存

       为了提升性能，当需要给列表元素中的多个元素赋予同一事件时，可以直接把事件委托给列表元素；

       当带有事件的元素被删去时，这个事件就会成为**空元素事件**，因此会造成页面性能下降；

       对某些浏览器而言，刷新页面之后先前的事件链接还是会存在，因此要在beforeunload事件中取消所有的事件.
       
     - 模拟事件（DOM2、3）

       ```js
       var someNodeObj;	//用于事件触发的元素对象
       var event = document.createEvent(eventString);	
       //根据eventString创建事件对象，可选的string有MouseEvent(鼠标事件)，UIEvent(ui事件)，MutationEvent(DOM变动事件)，HTMLEvent(一般的html事件)，KeyBoardEvent（键盘事件），CustomEvent（自定义事件）
       event.init[eventString](args);	
       //初始化事件参数，如event.initMouseEvent(args)
       someNodeObj.dispatchEvent(event);	//触发事件
       ```

       
