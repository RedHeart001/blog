事件触发方式：

向下广播，触发子组件挂载的事件：

```js
function boardcast(componentName,eventName,params){
	this.$children.forEach(child => {
		if(child.$options.name === componentName){
            //使子组件在子作用域下触发事件
			child.$emit.call(child,eventName,params);
		}else{
            //继续向下广播触发
			boardcast.call(child,componentName,eventName,params);
		}
	})
}
```

向上广播，触发父组件挂载事件：

```js
function dispatch(componentName,eventName,params){
	let parent = this.$parent;
	let name = parent.$options.name;
    //深度优先，寻找对应父级组件
	while(parent && (!name || name !== componentName){
		parent = parent.$parent;
		if(parent){
			name = parent.$options.name;
		}
	}
	//父级存在，触发事件
	if(parent){
		parent.$emit.call(parent,eventname,params);
	}
}
```

