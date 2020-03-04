## javaScript中的Event Loop机制

#### js事件机制：

​		宏任务：每次执行栈执行的代码就是一个宏任务，一个宏任务结束后需要一次渲染才能开始下一个宏任务（包括script，setTimeout，setInterval，ajax，dom操作等）；

​		微任务：当栈内的宏任务执行时，某些异步操作会被置于某一队列中。当宏任务执行完成后，这个队列中的任务会马上执行，直到下个宏任务进入执行栈。这种任务就叫做微任务（如promise.then）

​		**注意：process.nextTick()既不属于宏任务，也不属于微任务！**

#### 优先级：

​	**同步代码（宏任务） > process.nextTick > Promise（微任务）> setTimeout(fn)、setInterval(fn)（宏任务）> setImmediate（宏任务）> setTimeout(fn, time)、setInterval(fn, time)，其中time>0**

#### 事件执行流程：

​		1.执行一个宏任务；

​		2.执行过程中若遇到微任务，就将它添加到微任务的任务队列中；

​		3.宏任务执行完毕后，立刻执行微任务队列中的所有微任务（依次执行）；

​		4.当前宏任务执行完毕，开始检查渲染页面，然后GUI线程接管渲染；

​		5.渲染完成后，JS线程继续接管，开始下一个宏任务（队列事件中获取）

#### Promise中await的认知误区：

​		对await的最初认知就是等待promise执行后返回执行的结果，但await其实是**让出线程的标志**。当遇到await时，会先执行await后的代码，并将await之后的程序送入微任务队列，等待宏任务执行完毕之后再执行微任务队列中的任务。