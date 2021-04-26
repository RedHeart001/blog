## JSX

1. ### What

   `JSX` 是 JavaScript 的一种语法扩展，它和模板语言很接近，但是它充分具备 JavaScript 的能力。

   ```js
   import React from "react";
   import ReactDOM from "react-dom";
   
   class App extends React.Component {
     // 组件中的 render 方法返回值，就是用 JSX 代码来填充的
     render() {
       return (
         <div className="App">
           <h1 className="title">I am the title</h1>
           <p className="content">I am the content</p>
         </div>
       );
     }
   }
   
   const rootElement = document.getElementById("root");
   ReactDOM.render(<App />, rootElement);
   ```

2. ### How && Why

   通过Babel，`JSX` 会被编译为 `React.createElement()`，下面两种写法本质是相同的。

   ```js
   const element = (
     <h1 className="greeting">
       Hello, world!
     </h1>
   );
   
   
   const element = React.createElement(
     'h1',
     {className: 'greeting'},
     'Hello, world!'
   );
   ```

   所以`JSX`本质就是JavaScript的语法糖，用于表示DOM节点的信息。虽然也可以用原生的`React.createElement()`创建节点，**但是`JSX` 语法糖允许前端开发者使用我们最为熟悉的类 HTML 标签语法来创建虚拟 DOM，在降低学习成本的同时，也提升了研发效率与研发体验**。

   

   `createElement`：

   ```js
   
   export function createElement(type, config, children) {
   
     // propName 变量用于储存后面需要用到的元素属性
     let propName; 
   
     // props 变量用于储存元素属性的键值对集合
     const props = {}; 
   
     // key、ref、self、source 均为 React 元素的属性，此处不必深究
     let key = null;
     let ref = null; 
     let self = null; 
     let source = null; 
   
   
   
     // config 对象中存储的是元素的属性
     if (config != null) { 
       // 进来之后做的第一件事，是依次对 ref、key、self 和 source 属性赋值
       if (hasValidRef(config)) {
         ref = config.ref;
       }
       // 此处将 key 值字符串化
       if (hasValidKey(config)) {
         key = '' + config.key; 
       }
   
       self = config.__self === undefined ? null : config.__self;
       source = config.__source === undefined ? null : config.__source;
   
       // 接着就是要把 config 里面的属性都一个一个挪到 props 这个之前声明好的对象里面
       for (propName in config) {
         if (
           // 筛选出可以提进 props 对象里的属性
           hasOwnProperty.call(config, propName) &&
           !RESERVED_PROPS.hasOwnProperty(propName) 
         ) {
           props[propName] = config[propName]; 
         }
       }
     }
   
     // childrenLength 指的是当前元素的子元素的个数，减去的 2 是 type 和 config 两个参数占用的长度
   
     const childrenLength = arguments.length - 2; 
   
     // 如果抛去type和config，就只剩下一个参数，一般意味着文本节点出现了
     if (childrenLength === 1) { 
       // 直接把这个参数的值赋给props.children
       props.children = children; 
       // 处理嵌套多个子元素的情况
     } else if (childrenLength > 1) { 
       // 声明一个子元素数组
       const childArray = Array(childrenLength); 
       // 把子元素推进数组里
       for (let i = 0; i < childrenLength; i++) { 
         childArray[i] = arguments[i + 2];
       }
       // 最后把这个数组赋值给props.children
       props.children = childArray; 
     } 
   
   
   
     // 处理 defaultProps
     if (type && type.defaultProps) {
       const defaultProps = type.defaultProps;
       for (propName in defaultProps) { 
         if (props[propName] === undefined) {
           props[propName] = defaultProps[propName];
         }
       }
     }
   
     // 最后返回一个调用ReactElement执行方法，并传入刚才处理过的参数
     return ReactElement(
       type,
       key,
       ref,
       self,
       source,
       ReactCurrentOwner.current,
       props,
     );
   }
   ```

   `ReactElement`：

   ```js
   const ReactElement = function(type, key, ref, self, source, owner, props) {
   
     const element = {
       // REACT_ELEMENT_TYPE是一个常量，用来标识该对象是一个ReactElement
       $$typeof: REACT_ELEMENT_TYPE,
   
   
   
       // 内置属性赋值
       type: type,
       key: key,
       ref: ref,
       props: props,
   
       // 记录创造该元素的组件
       _owner: owner,
     };
   
   
   
     // 
     if (__DEV__) {
       // 这里是一些针对 __DEV__ 环境下的处理，对于大家理解主要逻辑意义不大，此处我直接省略掉，以免混淆视听
     }
   
   
     return element;
   };
   ```

   `createElement`会返回一个`ReactElement`对象，这个对象即是React虚拟DOM的一个节点。真实DOM由`ReactDOM.render()`渲染