Vue全局API：

​	Vue.extend(options):构建一个类似与“子类”概念的构造器，参数是包含组件选项的对象。

​		例：

```javascript
<div id="app"></div>
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
<script>
    let newObj = Vue.extend({
        template:`<p>{{firstName}} {{lastName}} aka {{alias}}</p>`,
        data:function () {
            return{
                firstName:'li',
                lastName:'ao',
                alias:'hehehe'
            }
        }
    });

new newObj().$mount('#app');
</script>
```

​	Vue.nextTick(callack):

​		在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```javascript
	<div id="app"></div>
	<script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
	<script>
		let vm = new Vue({
			el:"#app",
			template:`<p @click="btnClick">{{msg}}</p>`,
			data:{
				msg:'old message'
			},
			methods:{
				btnClick:function(){
					this.msg = 'new message';
					console.log(this.$el.innerText);
					this.$nextTick(() => {
						console.log(this.$el.innerText);
					});
				}
			}
		});
	</script>
```

​	

Vue更新机制：

​	vue的更新是异步机制。当数据变化时，vue将开启一个队列，并缓冲在同一事件中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。



​	js事件机制：

​		宏任务：每次执行栈执行的代码就是一个宏任务，一个宏任务结束后需要一次渲染才能开始下一个宏任务（包括script，setTimeout，setInterval等）；

​		微任务：当栈内的宏任务执行时，某些异步操作会被置于某一队列中。当宏任务执行完成后，这个队列中的任务会马上执行，直到下个宏任务进入执行栈。这种任务就叫做微任务（如promise.then）

​		**注意：process.nextTick()既不属于宏任务，也不属于微任务！**

​		事件执行流程：

​			1.执行一个宏任务；

​			2.执行过程中若遇到微任务，就将它添加到微任务的任务队列中；

​			3.宏任务执行完毕后，立刻执行微任务队列中的所有微任务（依次执行）；

​			4.当前宏任务执行完毕，开始检查渲染页面，然后GUI线程接管渲染；

​			5.渲染完成后，JS线程继续接管，开始下一个宏任务（队列事件中获取）。

​	

​	await的认知误区：

​		对await的最初认知就是等待promise执行后返回执行的结果，但await其实是让出线程的标志。当遇到await时，会先执行await后的代码，并将await之后的程序送入微任务队列，等待宏任务执行完毕之后再执行微任务队列中的任务。



Vue.set(target,propertyName/index,value)：

​	用于向响应式对象中添加一个属性，并保证这个新添加的属性也是响应式的，可以触发视图更新（由于javascript本身的限制，以及vue在初始化时会为data中的所有属性都设置getter/setter方法，所以Vue无法检测普通属性的变化，如this.newProperty = value这种无法更新视图）



​	**注意：Vue不允许动态添加根级响应属性，我们只能往嵌套对象中添加响应式属性**，且这个对象不能是Vue实例或Vue.data



```javascript
	<div id="app"></div>
	<script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
	<script>
		let vm = new Vue({
			el:"#app",
			template:`<div>
			    <p @click="addd(obj)">{{obj.d}}</p>
			    <p @click="adde(obj)"> {{obj.e}}</p>
			</div>`,
			data(){
            return {
			    	obj:{}	//只能往对象obj中添加新属性，不能添加和obj平级的属性
				}
			},
			mounted() {
				this.obj = {d: 0};
				console.log('after--', this.obj);
			},
			methods: {
				addd(item) {
					item.d = item.d + 1;
					console.log('item--',item);
				},
				adde(item) {
					item.e = item.e + 1;
					console.log('item--',item);
				}
			}
		});
		Vue.set(vm.obj,'e',0);
		//或使用以下两种方式也可以做到：
		//this.$set(this.obj,'e',0);
		//vm.obj = Object.assign({},vm.obj,{'e',0});
```

​	**关于javascript的限制，仍是疑惑**



Vue.delete(target,propertyName/index):删除对象的属性



Vue.directive(id,{function | object}):注册或获取全局指令。

```javascript
Vue.directive('my-directive', {
	//自定义指令的五个生命周期
  bind: function () {},	//指令第一次绑定到元素时点用的函数
  inserted: function () {},	//被绑定的元素插入到父节点时调用
  update: function () {},	//被绑定与元素所在模板更新时调用
  componentUpdated: function () {},	//被绑定的元素所在模板完成一次更新更新周期的时候调用
  unbind: function () {}	//绑定指令的元素解绑时调用
})

// 注册 (指令函数)
Vue.directive('my-directive', function () {
  // 这里将会被 `bind` 和 `update` 调用
})

// getter，返回已注册的指令
var myDirective = Vue.directive('my-directive')
```

```javascript
	<div id="app">
        //foo为hello指令的参数，binging.arg可查看，也可以实现动态参数（v-hello:[foo],foo为动态参数。同时也可以用对象字面量的方式传入多个值）
       <span v-hello:foo="color3">{{message}}</span>
       <button @click="add"> 点击开始加1</button>
       <button onclick="jiebang()">解绑</button>
   </div>
	<script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
	<script>
		function jiebang(){
        	//销毁模板的fang'fa
	        app.$destroy();
	    }
	    Vue.directive("hello",{
            //el：绑定的元素；bingind：包含很多参数信息的对象；vnode：虚拟节点
	        bind:function(el,binging,vnode){
	            el.style["color"] = binging.value;
	            console.log("1-bind");
	            console.log('vnode',vnode);
	        },
	        inserted:function(){
	            console.log("2-insert");
	        },
	        update:function(){
	            console.log("3-update");
	        },
	        componentUpdated:function(){
	            console.log('4 - componentUpdated');
	        },
	        unbind:function(){
	            console.log('5 - unbind');
	        }
	    });
		let vm = new Vue({
			el:"#app",
			data:{
	            message:10,
	            color3:"red"
	        },
	        methods:{
	            add:function(){
	                this.message++;
	            }
	        }
		});
	</script>
```



Vue.filter(id,function)：全局过滤器

​	直接全局注册使用即可

Vue.component(id( String ),Vue.extend({ ... }) / { ... }):全局组件