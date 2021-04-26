## 避免re-render

重复渲染是非常消耗资源的一件事，因此要尽量避免re-rendrer，通常有以下三种方法。

### shouldComponentUpdate

```js
// 类组件专有的钩子函数，相当于Vue的beforeUpdate，当组件的值更新后会触发该函数
// 通过返回true / false来决定是否重新渲染该组件，默认为true
shouldComponentUpdate(nextProps, nextState) {
	console.log(nextProps, nextState);
	return true;
}
```

### PureComponent和Immutable

```js
// 类似于React.Compomnent，为了避免在每个组件的props发生变化时都需要shouldComponentUpdate逻辑判断
// 缺点是只能进行浅校验
// Immutable中封装了map，list等数据结构，操作后会返回一个引用不同的引用对象

class Father extends React.Component {
    state = {
        text: 'before',
        count: 0,
        myObj: this.obj
    }

    changeText = () => {
        this.setState({
            text: 'after'
        })
    }

    changeCount = () => {
        this.setState({
            count: 1
        })

    }

    render() {
        let { text, count } = this.state;
        return (
            <div>
                <button onClick={() => { this.changeText() }}>改变Text</button>
                <button onClick={() => { this.changeCount() }}>改变Count</button>
                <ChildA text={text} />
                <ChildB count={count} />
            </div>
        )
    }
}



class ChildB extends React.PureComponent {
    render() {
        // 只会在changeCount触发后再次渲染
        console.log('count is render!');
        return (
            <span>
                {this.props.count}
            </span>
        )
    }
}
```

### React.Memo、useMemo

```js
import React from "react";

function ChildB(props) {
  console.log("ChildB 的render 逻辑执行了");
  return (
    <div className="childB">
      子组件B的内容：
      {props.count}
    </div>
  );
}

// areEqual 用于对比 props 的变化
function areEqual(prevProps, nextProps) {
  if(prevProps.count === nextProps.count) {
    return true
  }
  return false
}

// 使用 React.memo 来包装 ChildB
export default React.memo(ChildB, areEqual);

```



```js
import React, { useState, useMemo } from 'react';

function ChildA({ text }) {
    const renderContent = (text) => {
        console.log('text is render!');
        return (
            <span>
                {text}
            </span>
        )
    }
	// useMemo封装依赖prop（此处为count），变化则调用回调函数更新renderContent
    // 就实现效果而言，memo相当于给组件加了shouldComponentUpdate
    const textContent = useMemo(() => renderContent(text), [text])
    return (
        <div>
            {textContent}
        </div>
    )
}


class Father extends React.Component {
    state = {
        text: 'before',
        count: 0,
        myObj: this.obj
    }

    changeText = () => {
        this.setState({
            text: 'after'
        })
    }

    changeCount = () => {
        this.setState({
            count: 1
        })

    }



    render() {
        let { text, count } = this.state;
        return (
            <div>
                <button onClick={() => { this.changeText() }}>改变Text</button>
                <button onClick={() => { this.changeCount() }}>改变Count</button>
                <ChildA text={text} />
                <ChildB count={count} />
            </div>
        )
    }
}
```

