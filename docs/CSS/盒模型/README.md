## 标准盒和IE盒的区别

​	W3C标准盒和IE盒最大的区别就在于**计算实际宽高的标准不同**。标准盒中，width和height只包含内容content，而IE盒的width和height则包含内容区content，内边距padding和边框border。因此：

#### 标准盒中（box-sizing ：content-box）：

​	实际宽度 = width + padding + border；

​	实际高度 = height + padding + border；

#### IE盒中（box-sizing ：border-box）：

​	实际宽度 = width；

​	实际高度 = height；

​	

​	我们在编写css的时候，box-sizing属性默认指定content-box。

​	我们在编写页面代码时应尽量使用标准的W3C模型(需在页面中声明DOCTYPE类型)，这样可以避免多个浏览器对同一页面的不兼容。

​	因为若不声明DOCTYPE类型，IE浏览器会将盒子模型解释为IE盒子模型，FireFox等会将其解释为W3C盒子模型；若在页面中声明了DOCTYPE类型，所有的浏览器都会把盒模型解释为W3C盒模型。