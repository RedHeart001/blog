### dva入口解析：

​	只要理解redux的原理，那dva也不难理解。dva本质就是把react-router，redux，redux-saga组合起来的架构

####    index.js:

```javascript
import dva from "dva";
import "./index.css";

// 1. Initialize：state初始值，优先级高于model中的初值
const app = dva({
  initialState: {
    count: 0,
    todos: [],
    products: [
      { name: "dva", id: 1 },
      { name: "antd", id: 2 },
    ],
  },
});

console.log(app);

// 2. Plugins：使用的插件
// app.use({});

// 3. Model：dva使用的Model和redux的reducer是很相似的东西，但里面并不只有reducers，
//	还有处理异步操作的effect（call处理异步操作，put相当于dispatch）和订阅数据源
//  的subscription
app.model(require("./models/products").default);
app.model(require("./models/count").default);
app.model(require("./models/todos").default);

// 4. Router：路由引入组件并构造路由访问结构
app.router(require("./router").default);

// 5. Start：挂载虚拟树到id为root的容器中，同时会执行model中的subscriptions
app.start("#root");
```

### 核心概念：

- State：一个对象，保存整个应用状态
- View：React 组件构成的视图层
- Action：一个对象，描述事件
- connect 方法：一个函数，绑定 State 到 View
- dispatch 方法：一个函数，发送 Action 到 State

### 核心文件Model：

#### count.js:

```js
export default {
  // model命名空间
  namespace: "count",
  // 初始状态，如果未在index.js中的初始化项设置initialState，则以model中的state为主
  state: 3,
  // actions
  reducers: {
    add(state, { payload: step }) {
      return state + step;
    },
    reduce(state, { payload: step }) {
      return state - step;
    },
  },
  // 异步操作，以generator/yield函数封装，call触发异步操作，put触发同步操作
  effects: {
    *addAsync({ payload: step }, { call, put }) {
      console.log("addAsync is on");
      yield call((time) => {
        setTimeout(() => {
          console.log("call is on!");
        }, time);
      }, 3000);
      yield put({ type: "add", payload: step });
    },
  },
  // 订阅数据源，在入口的app“start”时把事件挂载到管理架构上。此处调用了keymaster插件，可以控	
  //  制key按钮按下时的触发事件
  subscriptions: {
    keyboardWatcher({ dispatch }) {
      key("ctrl+up", () => {
        dispatch({ type: "add", payload: 1 });
      });
    },
  },
};
```



