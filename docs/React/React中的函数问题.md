## React中的函数问题

如果触发方法的回调函数中存在this，则应当使用public fields语法，或者是bind绑定函数内部的this指针来规避bug

```js
import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        };
    }

	// public fields语法
    increase = () => {
        this.setState((state) => ({
            count: ++state.count
        }))
    }

    decrease() {
        let count = this.state.count
        this.setState({
            count: --count
        })
    }

    render() {
        return (
            <div>
                <p>
                    {this.state.count}
                </p>
                <button onClick={this.increase}>increase</button>
                // bind强制改变函数内部this指向
                <button onClick={this.decrease.bind(this)}>decrease</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter />, document.getElementById('root'));
```





列表渲染的就近原则，key默认不传递下层