## react-hook

​	react-hook可以给给函数式组件增加生命周期和state变量，在底层是以链式结构进行存储的。初始化的时候，每一个hook都会生成一个hook对象，然后以链式结构存储。当组件更新时，react会遍历链，更新链节点对应的值

```js
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function List() {
    let [list, setList] = useState([]);
    let [count, setCount] = useState(1);

    const addItem = () => {
        let arr = list.concat([]), num = count;
        arr.push(num++);
        console.log(arr, num);
        setList(arr);
        setCount(num);
    }

    // 顺序决定useEffect函数触发顺序

    useEffect(() => {
        console.log('仅在挂载时调用');
    }, [])

    useEffect(() => {
        console.log('挂载时调用');
        return () => {
            console.log('卸载时调用');
        }
    });

    useEffect(() => {
        console.log('渲染时调用');
    });

    useEffect(() => {
        // 这是回调函数的业务逻辑 
        console.log('渲染时调用（但会判断前后状态）');
        // 若 xxx 是一个函数，则 xxx 会在组件卸载时被触发
        return () => {
            console.log('卸载时调用（但会判断前后状态）');
        }
    }, [list, count])


    return (
        <div>
            {
                list.length > 0 ? (
                    <ul>
                        {
                            list.map(item => {
                                return (
                                    <li key={item}>{item}</li>
                                )
                            })
                        }
                    </ul>
                ) : (
                        <p>当前列表为空！</p>
                    )
            }
            <button onClick={() => { addItem() }}>add a new item</button>
        </div >
    );
}


ReactDOM.render(<List />, document.getElementById('root'));
```

