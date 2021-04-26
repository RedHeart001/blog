## JavaScript的Event Loop机制

### 堆、栈、队列共同构建的Event Loop

​	js是一门单线程语言，当主线程运行的时候，就会产生堆（heap）和栈（stack）。堆里存储引所有声明为Object的引用类型数据，栈里存储所有的基础类型数据和**执行函数时需要的空间**。

​	栈中的代码会调用各种外部API，它们在任务队列中加入各种事件(onClick,onLoad,onDone)，只要栈中的代码执行完毕(js引擎存在`monitoring process`进程，会持续不断的检查主线程执行栈是否为空)，主线程就回去读取任务队列，在按顺序执行这些事件对应的回调函数。

也就是说主线程从任务队列中读取事件，这个过程是循环不断的，所以这种运行机制又成为`Event Loop`(事件循环)。

### 同步和异步

​	同步任务：在主线程上排队执行的任务，执行完一个再执行下一个；

​	异步任务：不直接进入主线程，而是先在event table中注册回调函数，然后才能进入任务队列中等待。当通知任务队列可以执行时，异步任务才会进入主线程执行任务

### 宏任务和微任务

​	宏任务：`script(整体代码)`, `setTimeout`, `setInterval`, `requestAnimationFrame`, `I/O`,`setImmediate`。

​					其中`setImmediate`只存在于Node中，`requestAnimationFrame`只存在于浏览器中；

​	微任务： `Promise`, `Object.observe`(已废弃), `MutationObserver`(html5新特性)，`process.nextTick`。

​					其中`process.nextTick`只存在于Node中，`MutationObserver`只存在于浏览器中。

​	除了script代码，宏任务和微任务只是对异步任务的进一步划分，目的是为了“插队”，更高效地执行代码。

### Event Loop的具体流程

<img src="https://user-gold-cdn.xitu.io/2019/7/6/16bc6bd331a2116a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" style="zoom: 50%;" />

一轮Event Loop，就是从一个宏任务开始，到下一个宏任务开始之前