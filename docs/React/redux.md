## 梳理

​	根据理念划分，redux大致可以分为**state，reducer，action，container，components**几个部分。

​	**state**存储变量，**reducer**存储控制变量的操作，**action**相当于用户和reducer的桥梁。**container**封装业务组件，传递变量和action，**components**渲染具体的页面。

## 例子（以购物车为例）

#### state & reducer：

```js
let productList = [
  ...
];

let cart = [];

function addToCart(arr, product) {
  ...
}

// state封装核心变量，reducer纯函数封装变量操作
const reudcer = (state = { productList, cart }, action) => {
  // 根据action的type属性决定执行的操作
  switch (action.type) {
    // 操作：“添加物品”
    case "ADD_TO_CART":
      let newPros = state.productList.concat(),
        newCart = state.cart.concat();
      
          ...
      
      // 操作完毕后，返回新值
      return {
        productList: newPros,
        cart: newCart,
      };
    // 操作：“清空结算”
    case "CART_CHECKOUT":
      return {
        productList: state.productList,
        cart: [],
      };
     // 默认返回变量
    default:
      return state;
  }
};

export default reudcer;
```

#### actions：

```js
// 预先设置动作类型及参数

// 封装操作，“添加商品”
export const addToCart = (name) => {
  return {
    type: "ADD_TO_CART",
    name,
  };
};

// 封装操作，“结算购物车”
export const checkout = () => {
  return {
    type: "CART_CHECKOUT",
  };
};
```

#### containers：

#### App（顶层容器）：

```js
import React from "react";
import Products from "./Products";
import Cart from "./Cart";
import Footer from "./Footer";

const App = () => {
  return (
    <div>
      <Products />
      <Cart />
      <Footer />
    </div>
  );
};
export default App;
```

#### Products（下级容器）：

```js
import React from "react";
import ProductList from "../components/ProductList";
import { connect } from "react-redux";
import { addToCart } from "../actions";

// connect函数参数之一，转化state中的变量为组件的props
const mapStateToProps = (state) => {
  return {
    productList: state.productList,
  };
};

// connect参数，dispatch触发封装的action，并封装新函数传递给组件
const mapDispatchToProps = (dispatch) => ({
  addToCart: (name) => {
    dispatch(addToCart(name));
  },
});

const Products = ({ productList, addToCart }) => {
  return <ProductList productList={productList} addToCart={addToCart} />;
};

// connect函数读取reducer并赋给容器，传递给下级组件
export default connect(mapStateToProps, mapDispatchToProps)(Products);
```

