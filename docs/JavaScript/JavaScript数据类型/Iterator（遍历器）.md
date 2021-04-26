## Iterator（遍历器）

​	js中主要用于表示“**集合**”这一概念的数据结构除了原有的**Array（数组）**、**Object（对象）**之外，es6还新添加了**Map**和**Set**。但我们不论是直接使用它们，抑或是以他们为基础构造一个新的数据结构，都会面临**如何以一种统一的方式去使用它们**的问题。因此，我们一定要理解**Iteator（遍历器）**。

​	先来一个例子：

```js
var oI = makeIterator([1,2,3,4,5,6]);
function makeIterator(arr) {
	var arrIndex = 0;
	return {
		next:function () {
			return (
				arrIndex < arr.length ?  
				{value:arr[arrIndex++]} : 
				{done:true}
			);
		}
	}
}
console.log(oI.next());
console.log(oI.next());
console.log(oI.next());
console.log(oI.next());
console.log(oI.next());
console.log(oI.next());
console.log(oI.next());
//输出结果：
{ value: 1 }
{ value: 2 }
{ value: 3 }
{ value: 4 }
{ value: 5 }
{ value: 6 }
{ done: true }
```

​	借用一下阮一峰老师的话：

> Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

​	总结一下，Iterator函数本质上是一个**数据结构的接口，自动排序成员，并为数据结构提供统一的访问机制，也就是for...of...方法**。

##  遍历属性

​	通俗说，**只要一个数据结构具有Iterator接口，我们就可以认为这个数据结构是“可遍历”的**。

​	事实上，只要随便console一个数组，就一定有**Symbol.iterator**属性：

![image-20200319162157145](E:\myLog\docs\JavaScript\imgs\image-20200319162157145.png)

​	**Array、Map、Set、String、TypedArray（类数组）、函数的arguments对象、NodeList对象**都是具有原生的iterator接口的，因此调用接口就可以遍历数据结构：

```js
var arr = [1,2,3,4,5,6];
var it = arr[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
//执行结果如下
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: 5, done: false }
{ value: 6, done: false }
{ value: undefined, done: true }
```

​	而Object对象因为没有iterator，所以无法使用for...of进行遍历：

```js
var obj = {
	name:'liao'
}
for(var val of obj){
	console.log(val);
}
//	TypeError: obj is not iterable
```

​	**不过通常的Object也不需要iterator这种东西，因为对象的属性本来就不是线性排序的。只有某些类数组对象（存在键值对和length属性）可能会需要iterator迭代器，此时我们只需在对象里直接设置symbol.iterator属性即可**。

​	NodeList是节点构成的类数组，有length属性，可以使用forEach和for...of方法遍历，但本质并不是数组。

​	**解构赋值，扩展运算符（...），yield*，for..of，Array.from，Map()，Set()，Promise.all()，Promise.race()调用时都会触发遍历器接口**

​	