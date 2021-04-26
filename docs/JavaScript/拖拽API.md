### 拖拽API

#### 拖放事件

​	HTML5新增加了`draggle`属性，可以允许我们直接对元素进行拖拽的操作。对于被拖拽元素，其触发的事件依次为`dragstart`，`drag`，`dragend`；当被拖拽元素被放置到一个有效目标时，会依次触发`dragenter`，`dragover`，`dragleave（或者drop）`三个事件。

​	**另外，当元素被拖拽时，会有一个透明的副本跟随光标移动**。

#### 自定义放置目标

​	把被拖动元素放置到一个有效目标时，`dragenter`，`dragover`，`dragleave（或者drop）`三个事件是默认禁用的，必须要阻止默认事件。

```html
<div>
    <!-- 被拖动元素 -->
	<div className="dragBox" draggable="true">
		拖动盒子
	</div>
    <!-- 放置目标 -->
	<div className="dragTarget"></div>
</div>
```

```js
dragTarget.addEventListener("dragenter", (e) => {
	e.preventDefault();
});
dragTarget.addEventListener("dragover", (e) => {
	e.preventDefault();
});
dragTarget.addEventListener("drop", (e) => {
	e.preventDefault();
});
```

#### dataTransfer对象

​	单纯的拖拽并无异议，`dataTransfer`对象可以承载被拖拽对象想要传递的数据，核心方法为：`setData(key,value)`和`getData(key)`

- **对于被拖拽对象：**

```js
dragBox.addEventListener("dragstart", (e) => {
	e.dataTransfer.effectAllowed = "move";
	e.dataTransfer.setData("data", "this is demo text");	// set方法设置传递的键值对
});
```

- **对于放置目标：**

```js
dragTarget.addEventListener("dragenter", (e) => {
	e.preventDefault();
});
dragTarget.addEventListener("dragover", (e) => {
	e.preventDefault();
});
dragTarget.addEventListener("drop", (e) => {
	e.preventDefault();
	console.log(e.dataTransfer.getData("data"));	// get方法获取key对应的value
});
```

​	**注意，dataTransfer对象能传递的只有字符串类型的数据**

#### **dropEffect**与**effectAllowed**

​	可以通过**dataTransfer**对象下的**dropEffect**属性和**effectAllowed**属性来约定哪些操作可以实现，哪些操作会被禁用，具体情况如下：

- 对于被拖动对象：

  ```js
  //	在dragstart事件发生的时候，设置effectAllowed属性，常用值包括none（禁止任何行为）、link（允许link对应的dropEffect）、move（允许move对应的dropEffect）、copy（允许copy对应的dropEffect）、all（允许任何dropEffect）
  dragBox.addEventListener("dragstart", (e) => {
  	e.dataTransfer.effectAllowed = "link";
  	e.dataTransfer.setData("data", '{ "name": "liao" }');
  });
  ```

- 对于目标对象：

  ```js
  //	在drop事件发生的时候，设置dropEffect属性，常用值包括none（禁止任何行为）、link（被拖动元素移动到放置目标后会跳转链接）、move（应该把被拖动元素移动到放置目标）、copy（应该把被拖动元素放置到放置目标）
  dragTarget.addEventListener("dragenter", (e) => {
      e.preventDefault();
  });
  dragTarget.addEventListener("dragover", (e) => {
      e.preventDefault();
  });
  dragTarget.addEventListener("drop", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "link";
      dragTarget.appendChild(dragBox);
      console.log(e.dataTransfer.getData("data"));
  });
  ```

  ​	**设置这两个属性只能更改光标的样式，真正实现操作还需要开发者自己完成**

#### 原生js封装拖拽

```js
// 防抖函数，避免拖拽时不间断触发
function dbounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}

let dragger1 = document.getElementsByClassName("draggable")[0];
// 拖拽函数
let demo = dbounce(() => {
  console.log("draging!");
}, 1000);
// 封装拖拽函数，可以应用于多个对象
function DragDrop(ev) {
  let dragging = null,
    drager = new EventTarget(),
    diffX = 0,
    diffY = 0;
  function handleEvent(event) {
    //获取事件和目标
    let target = event.target;
    //确定事件类型
    switch (event.type) {
      case "mousedown":
        if (target.className.indexOf("draggable") > -1) {
          dragging = target;
          diffX = event.clientX - target.offsetLeft;
          diffY = event.clientY - target.offsetTop;
          console.log("drag start!");
        }
        break;
      case "mousemove":
        if (dragging !== null) {
          //指定位置
          dragging.style.left = event.clientX - diffX + "px";
          dragging.style.top = event.clientY - diffY + "px";
          demo();
        }
        break;
      case "mouseup":
        console.log("drag end!");
        dragging = null;
        break;
      default:
        break;
    }
  }

  drager.enable = function () {
    ev.addEventListener("mousedown", handleEvent);
    ev.addEventListener("mousemove", handleEvent);
    ev.addEventListener("mouseup", handleEvent);
  };

  drager.disable = function () {
    ev.removeEventListener("mousedown", handleEvent);
    ev.removeEventListener("mousemove", handleEvent);
    ev.removeEventListener("mouseup", handleEvent);
  };

  return drager;
}

let drager1 = DragDrop(dragger1);
drager1.enable();
```

