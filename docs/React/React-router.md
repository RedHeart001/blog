### 主要使用组件（均源于react-route-dom库）：

- router：BrowserRouter、HashRouter
- route matcher：Route、Switch
- Navigation：Link、NavLink、Redirect

### Router：

- basename：指定当前router下的顶级路由。

  ```js
  <BrowserRouter basename="/calendar" />
  <Link to="/today"/> // 链接指向/calendar/today
  ```

- HashRouter有一个名为‘hashType’的属性，可以控制路径的不同效果

- StaticRouter是一个location保持不变的Router，用来控制服务端

### Link：

- to：值可以为string（to = '/main'）、object（包含路径pathname，类似于query查询字符串search，hash，state）、function（location => (`${location.pathname}?sprt=name`)）
- replace：默认为true。默认无replace属性的话history遵循的是push/pop的栈访问方式，可以通过浏览器的回退和前进访问访问过的路由，replace选择了直接替换路由

### Redirect：

- 顾名思义的重定向
- from/to，捕获from中的路由，再通过to重定向路由
- 可以直接放在Route中重定向

### Route：

- 最重要的组件，负责匹配渲染路由对应的组件
- 有三种组件渲染方式：render（function），children（function），component（值为组件），且这三种的props都由location，match，hostory三个对象构成
- path不仅可以是字符串，也可以是字符串数组，匹配多个路由



注意点：

- Route无path属性，则代表匹配404页面
- NavLink具有一个activeClassName属性，属性值为link被选中时的样式类名