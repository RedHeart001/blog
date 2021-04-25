## React-Hooks的底层机理

React Hook的底层是依赖于顺序链表。

1. 初次渲染

   当初始化Hook，即useState的时候，会在`mountState`方法中把当前的Hook对象添加到链表的末端（依靠`mountWorkInProgressHook`方法），最终返回一个[state，setState]的目标数组；

   ```js
   function mountWorkInProgressHook() {
     // 注意，单个 hook 是以对象的形式存在的
     // 在当前代码中，此处的hook指代的是当前初始化的hook
     var hook = {
       memoizedState: null,
       baseState: null,
       baseQueue: null,
       queue: null,
       next: null
     };
     
     if (workInProgressHook === null) {
       // 这行代码每个 React 版本不太一样，但做的都是同一件事：将 hook 作为链表的头节点处理
       // workInProgressHook对象应当是一个全局变量，保存当前链表最末端的hook对象
       // firstWorkInProgressHook对象也应当是一个全局对象，代表Hook链表的最前端
       firstWorkInProgressHook = workInProgressHook = hook;
     } else {
       // 若链表不为空，则将 hook 追加到链表尾部
       workInProgressHook = workInProgressHook.next = hook;
     }
     
     // 返回当前的 hook
     return workInProgressHook;
   }
   ```

2. 更新渲染

   初次渲染调用的是`mountState`，更新渲染则是调用`updateState`。前者构建链表并渲染，后者遍历链表并渲染。因此如果存在条件创建hook（if判断），那么二次渲染的时候，hook取值可能就是错位的。