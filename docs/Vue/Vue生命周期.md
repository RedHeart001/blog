## beforeCreate

​	在依次经历**new Vue()、init events & init cycle**，初始化Vue实例对象，事件和生命周期后，vue生命周期中的第一个钩子**beforeCreate**会触发，而此时实例的**data、watch、computed和methods都是不可访问的**。因此在这个阶段我们主要**创建一些常量**。

## Created

​	**beforeCreated**之后，**各种data属性，计算属性，方法会被挂载**，此时我们**可以访问到data和computed，methods中的变量和函数**。但此时**仍未挂载dom，无法访问到$el,$ref**。因此在这个阶段主要做一些**axios请求，页面初始化**。

## 判断el，template

​	created后会进行两次判断。第一次判断**是否指定$e**l，有则进入下一级判断，否则就等到this.$mount手动挂载之后再判断。第二次判断**是否指定template**，有则把template作为模板模板编译成render函数，否则就把外部html作为模板编译。

​	**编译优先级：render函数 > template模板 > 外部html**

## beforeMount

​	确定编译模板后，Vue实例的**this.$el**是有值的，但此时数据还没有挂载到页面上，即此时页面中的**{{}}**还没有被替换。

## mounted

​	此时Vue实例已经被挂载到DOM上，我们已经能通过DOM API获取到DOM，**$el，$ref**这些属性此时已经可用。

## beforeUpdate

​	实例此时已经被挂载到DOM树上，即将进入响应更新阶段。beforeUpdate响应式数据更新时调用，发生在虚拟DOM打更新数据之前，也就是组件更新之前执行的函数。
​	数据更新了，但是，vue（组件）对象对应的dom中的内部（innerHTML）没有变，所以叫作组件更新前。