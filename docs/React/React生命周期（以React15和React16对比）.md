## React生命周期（以React15和React16对比）

1. ### React15中的生命周期

   ![img:png](https://s0.lgstatic.com/i/image/M00/5E/31/Ciqc1F-GZbGAGNcBAAE775qohj8453.png)

   ```markdown
   挂载：
   1、componentWillMount和componentDidMount只会触发一次；
   
   2、componentWillMount并不涉及DOM操作，render会返回需要渲染的内容，实际渲染交给ReactDOM模块；
   
   3、componentDidMount执行时DOM已经挂载，所以可以在方法体内进行DOM操作，一般也会执行异步操作，数据初始化等操作。
   
   
   
   更新：
   1、即便props没有发生变化，但如果父组件重新渲染，那也会触发componentWillReceiveProps方法；
   
   2、componentWillUpdate、componentDidUpdate和componentWillMount、componentDidMount类似，都只允许前者做一些不涉及DOM的准备工作，后者可以操作DOM；
   
   3、shouldComponentUpdate(nextProps, nextState)：通过返回一个布尔值来决定是否要更新组件；
   
   
   
   销毁：
   组件销毁的场景：父组件移除子组件，或者针对有key的组件，父组件更新时发现前后key不一致；
   ```

2. ### React16对生命周期的更进

   ![img:png](https://s0.lgstatic.com/i/image/M00/5D/D9/CgqCHl-FVVeAaMJvAAKXOyLlUwM592.png)

   ```markdown
   挂载：
   1、用getDerivedStateFromProps(props,state)：无法访问this的静态方法，通过接收到的props来往组件的state增加新的属性。参数分别为当前组件的props和state，返回一个和state一样的对象；
   
   2、getDerivedStateFromProps并不取代componentWillMount、componentWillUpdate和componentWillReceiveProps。前者两个方法本身就很鸡肋且不稳定，所以必须要舍弃。后者的和getDerivedStateFromProps类似，不过getDerivedStateFromProps的功能更加专一。
   
   
   
   更新：
   1、getSnapshotBeforeUpdate(preProps,propState)：执行于render方法之后，所以可以进行DOM操作，同时也能获取到props和state更新前后的状态。方法必须有一个返回值，作为执行componentDidUpdate方法的第三个参数；
   
   2、getSnapshotBeforeUpdate的设计理念就是“为了配合componentDidUpdate，来覆盖所有已经过时的componentWillUpdate用例”，本质是为了实现React向Fiber框架改变；
   
   3、Fiber意在实现虚拟DOM树的渲染由不可打断的“同步”变为可以打断分片执行的“异步”。
   4、如React16的生命周期所示，React开发团队把新的周期划分为可以打断的render阶段和已经接触到DOM的pre-commit、commit阶段；
   5、componentWillUpdate、componentWillMount和componentWillReceiveProps都是render阶段的方法，如果里面有问题代码，方法又被多次执行的话是一件非常可怕的事情，所以被稳定的纯函数方法取代是必然。
   ```

3. 补充说明

   ​	React15之前，React是采用**Reconciler-render**的两层架构来实现更新渲染的。然而在Reconciler阶段，虚拟dom采用的是**同步递归、比较更新**策略。面对大型的复杂应用无疑有些捉襟见肘，因此React16中重写了核心diff算法，并提出了Fiber（本意“纤维”）这一架构。

   ​	相较于15，16在Reconciler前新增了**Scheduler**（调度器），实现了为所有的更新任务添加一个优先级。新的Reconciler会依据优先级执行任务，例如一个任务正在执行的过程中，突然有一个优先级更高的任务，那么Reconciler就会停止执行当前任务，而去执行优先级高的任务。等新的任务执行完毕，才会重新执行上一个任务。

   ​	通过这套新的更新机制，React的更新渲染正式由**同步**过渡到了**异步**。但由于在重启任务的过程中会多次触发**componentWillMount**，**componentWillUpdate**和**componentWillReceiveProps**这几个生命周期，因此React16摒弃了它们，并以更加专一的纯函数（getDerivedStateFromProps）来代替。