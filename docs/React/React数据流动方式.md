## React数据流动方式

1. props单向数据流动；

2. 子组件通过传递函数，逆向改变父组件的数据；

3. 订阅—发布模式：

   ```js
   class Emitter {
       constructor() {
       	// 事件存储容器
           this.eventMap = {}
       }
   
       // 订阅事件
       on(type, handler) {
           if (Object.prototype.toString.call(handler).indexOf('Function') < 0) {
               console.error('请传入一个function！');
               return;
           }
           if (!this.eventMap[type]) {
               this.eventMap[type] = [];
           }
   
           this.eventMap[type].push(handler);
       }
   
       // 取关事件
       off(type, handler) {
           if (this.eventMap[type]) {
               this.eventMap[type].splice(this.eventMap[type].indexOf(handler), 1);
           }
       }
   
       // 触发事件
       emit(type, params) {
           if (this.eventMap[type]) {
               this.eventMap[type].forEach((handler, index) => {
                   handler(params);
               });
           }
       }
   }
   ```

   实例（A传递信息到B）

   ```js
   import './index.css';
   import React from 'react';
   import ReactDOM from 'react-dom';
   import Emitter from '../emitter';
   const globalEmitter = new Emitter();
   
   function EmitBoxA(props) {
       return (
           <div className='emitbox'
               onClick={() => {
                   globalEmitter.emit('sendMsg', props.text)
               }}>
               {props.text}
           </div>
       )
   }
   
   class EmitBoxB extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
               text: 'B'
           }
       }
   
       componentDidMount() {
           globalEmitter.on(`sendMsg`, (msg) => {
               console.log('msg from ' + msg + ' to ' + this.state.text);
           })
       }
   
   
       render() {
           return (
               <div className='emitbox'>
                   {this.state.text}
               </div>
           )
       }
   }
   
   
   class EmitContainer extends React.Component {
       render() {
           return (
               <div className='emitcontainer'>
                   <EmitBoxA text={"A"} />
                   <EmitBoxB />
               </div>
           )
       }
   }
   
   ReactDOM.render(<EmitContainer />, document.getElementById('root'));
   ```

4. `Context API`（`React16.3`之后的版本）

   ![png](https://s0.lgstatic.com/i/image/M00/62/97/CgqCHl-Sm7iAQ6ZRAAEW2Me7WVg371.png)

   ​	Context的核心要素包括：`React.createContext、Provider、Consumer`。

   ​	通过调用 `React.createContext`，可以创建出一组 Provider。Provider 作为数据的提供方，可以将数据下发给自身组件树中任意层级的 Consumer，这三者之间的关系用上图来表示。

   ​	`React16.3`以前的`Context API`的问题除了写的方式不够优雅，关键问题是**它无法保证Provider和Consumer获取到的数据是同步更新的**。

   ​	而新版本的API则很好的规避了这个问题，而这一想法的集中体现就是**Redux**。