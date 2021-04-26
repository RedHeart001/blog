- 组件化也可以看成是另类的**面向对象**，区别就在于多了一个DOM操作；

- 组件化的过程中一定要避免以toggle，show，hide等方法来控制HTML结构和style样式的行为，否则DOM花费过高；

- 组件不提倡继承，最正确的方法应当是以合适的粒度构建基层组件，再组合业务组件；

- 把大组件拆分为无状态函数表达的小组件是个好方法

  ```js
  // 无状态函数构建组件
  function AnotherButton({
    color = "red",
    fontSize = "14px",
    msg = "first msg",
  }) {
    return (
      <button onClick={() => console.log(msg)}>
        <p style={{ color, fontSize }}>click me!</p>
      </button>
    );
  }
  
  // 渲染组件
  ReactDOM.render(
    <AnotherButton color="blue" fontSize="20px" msg="hhhh!" />,
    document.getElementById("root")
  );
  ```

- 组件设计的要义——**直观**。不要把数据和基本设置定义在一起