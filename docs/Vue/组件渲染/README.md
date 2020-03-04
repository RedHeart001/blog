# 渲染组件Transition与Transition-group

​	transition和transition-group都是vue的内置组件，transition本身并不渲染标签，transition-group通过tag属性渲染一个外部标签，但当它们内部的组件或标签插入，移除的时候会挂载对应的类名，同时触发钩子函数。

### transition（单个元素过渡）

##### 	props：

​		name-string：过渡名，自动生成过渡类名；

​		appear-boolean：是否在初始时渲染；

​		css-boolean：是否使用css过渡类。默认为true，如果为false则只触发Javascript钩子；

​		mode-string：控制过渡序列。分为‘out-in’（当前元素先过渡，完成后新元素过渡进入）和‘in-out’两种过渡方式（新元素先过渡进入，完成后当前元素过渡离开）；

​		duration-number | {enter：number，leave：number}：指定过渡时间。如果不指定就按照css过渡样式中的时间执行；

​		**我们也可以在属性中指定过渡样式**：

​			如：enter-class，enter-active-class，enter-to-class（active是整个过程，enter和enter-to是开始和结果。通常都在active中设置整体过渡参数，在enter和leave-to中设置期望样式）

​			[img](https://cn.vuejs.org/images/transition.png)

​			可以给enter，leave，appear设置样式。

##### 	methods：

​		enter（before-enter，enter，after-enter），leave，appear同上

​		ps：钩子函数的参数都是el，当组件被挂载，移除就会触发这些钩子函数



### transition-group（列表过渡）

##### 	props：

​		tags-string：transition-group会渲染一个外部标签，tag可以指定要渲染的标签，默认为span；

​		move-class：改变定位，可手动配置类名，与enter等相同；

​		其余属性和transition相同



注意，每个**transition-group** 的子节点必须有 **独立的 key** ，动画才能正常工作





多组件过渡直接采用component组件，利用其is属性改变组件即可；



