## setState更新机制

​	setState更新React组件的方式的确是“异步”的，但这种异步更接近js的EventLoop机制，即把所有的更新state都存入到一个更新队列当中，然后在更新结束的时候合并队列中所有的state，并把最后的合并结果更新到组件的state中（即“**批量更新**”）。

​	setState更新过程：

​		1、setState （创建新状态）

​		2、enqueueState（把新的state加入到队列中，调用enqueueUpdate）

​		3、enqueueUpdate（通过**batchingStrategy**对象的**isBatchingUpdates**变量控制是否进行组件更新。如果为false，则说明当前组件的状态队列已经不添加新的state，而是要开始更新；如果为true，则状态队列要继续添加新的状态，此时不会合并）；



​	因此，正常情况下遵循异步更新，当setState在setTimeout或setInterval这样的异步操作中调用的时候，会脱离React的**异步更新机制**，最终实现同步的效果

​		 