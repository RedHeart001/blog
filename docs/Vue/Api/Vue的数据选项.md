## Vue数据：

##### data:

​		type:object / function（最好用function进行定义）

​		Vue会递归将data中的属性转换为getter/setter（以'_'或'$'开头的内置属性、api方法不会被代理），从而使data中的数据能响应数据的变化。对象必须是只含有多个键值对的纯对象，不推荐observe拥有**状态行为的对象**（即已经定义了setter/getter方法的对象，虽然用了也没什么事）。

​		实例创建后，可以通过vm.$data.a 或 vm.a来访问对象中的属性。

​		**之所以使用function的方式来声明data，是因为如果创建多个实例，多个实例的data都会指向同一个对象，而function的方式可以返回一个新的数据对象（function不可用箭头函数，这样会改变this指向）。**

```javascript
	<div id="app">
		<my-btn></my-btn>
		<my-btn></my-btn>		
		<my-btn></my-btn>
	</div>
	<script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
	<script>
        //全局组件
		Vue.component('my-btn',{
			template:`
				<button @click="count++">
					{{msg}},you have click {{count}} times
				</button>
			`,
			data:function () {
				return{
					msg:'init message',
					count:0
				}
			}
		});
		注册实例
		let vm = new Vue({
			el:'#app'
		});
```

##### props（传递属性）：

​		prop是父级对子级之间的单项下行绑定，用于传递一个初始值，并作为一个本地的prop数据来使用。prop传入后在自己中可以进行任意操作。

​		prop具有四种属性：type（定义数据类型），required（是否必要，boolean），default（默认值），validator（自定义验证函数）



##### computed（计算属性）：

​		对任何复杂逻辑都应使用计算属性来封装。

​		methoods和computed的结果是相同的，但**计算属性采用的是基于响应式依赖进行缓存**，也就是说只要依赖值不发生变化，那么计算属性就不会改变，也就无需重新渲染。但方法得到结果就必须重复执行函数，开销大。

​	缓存的意义在于如果遇到比较大的data时能节省开支。

​	计算属性适用于多数场合，但watch侦听器更适用于异步操作和开销较小的场合	

​	计算属性也可以设置set/get属性



##### methods（实例方法）：

​		唯一需要注意的是定义方法时不能用箭头函数，否则上下文会改变，this将不指向实例



##### watch（监听器）：

​		监听器会监听所有层级里的任何属性，且有三个属性需要注意：handler（触发的回调函数），immediate（立刻响应），deep（是否深度）