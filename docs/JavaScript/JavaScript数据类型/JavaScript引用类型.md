## JavaScript中的引用类型

#### 1.引用类型不是类

​	虽然从外观上看**引用类型**和**类**很像，但引用类型本质还是一种**数据结构**，虽然可以将数据和功能组织在一起，但ECMAScript本身**并不具备面向对象语言所拥有的类和接口这些概念**，而我们平时用到的对象都其实是这些引用类型的构造函数通过**new**操作符创建出来的实例。

#### 2.Object

##### 创建实例

​	Object是使用最多的引用类型，实例创建的方法有两种，一种是new标识符创建，一种是对象字面量表示法：

```js
let person1 = new Object();	//new标识符创建实例
let person2 = {	//字面量创建实例
	name:'liao',
	age:'22'
};
```

​	虽然两种创建方法都可以，但更**推荐字面量创建实例**，不仅代码少，更**适用于向函数传递大量参数的情形**。

```js
let person = {
	name:'liao',
	age:18
};

function showPros(obj) {
	console.log(obj.name,obj.age);
}
showPros(person);
```

##### 属性访问

​	访问的方式也有两种：**点表示法**（person.name）和**方括号语法**（person["name"]）。

```js
let person = {
	name:'liao',
	age:18
};

console.log(person.name);	//最常见的点式访问
console.log(person['age']);	//方括号中的必须是一个字符串或一个字符串变量
```

​	方括号语法有一个好处，就是可以**表示属性名存在非字母非数字元素的属性**，就像这样：

```js
let person = {
	name:'liao',
	age:18,
	'first name':'li'	//命名的时候属性名也要注意加引号，否则报错
};
console.log(person['first name']);
```

#### 3.Array

​	Array是ECMAScript里使用最频繁的另一个属性，而且它有一个很便利的特点，**Array数组的每一项可以保存任何类型的数据**，而且Array的length是可以动态调整的，会随着保存数据数量变化而变化。

##### 新的构造方式

​	es6新增了Array.from和Array.of两种新的构造方式

##### Array.length

​	Array的length属性不是只读的，通过它可以**向移除数组末尾元素或在末尾添加新项**：

```js
let arr = [1,2,3,4];
arr.length = 3
console.log(arr);	//[1,2,3]

let arr = [1,2,3,4];
arr[arr.length] = 5;
arr[arr.length] = 6;
console.log(arr);	//[1,2,3,4,5,6]
```

##### 数组栈方法（LIFO，后进先出 - push，pop）

​	push：接收任意多的参数，并把它们接在数组末尾，最终返回拼接完成后数组的长度；

​	pop：删除数组最末尾的元素，数组长度减一，并返回这一项。

##### 数组队列方法（FIFO，先进先出 - push，shift）

​	shift：删除数组首项，数组长度减一，并返回这一项

##### 重排序方法（reverse，sort）

​	reverse：反转数组顺序（这里是直接操作原数组），并返回反转后的数组；

​	sort：默认升序排序，参数要么**为空**，要么是**一个函数**。根据函数返回值的正负来决定升序排序还是降序排序，**返回值大于0则降序，否则升序，返回0则不作为**（这里都是直接操作原数组），最终返回排序后的数组；

```js
let arr = [4,3,2,1];
let res = arr.sort(function (a,b) {	//a是后一项，b是前一项
	return b-a;	//降序
    //return a-b； --  升序
});
console.log(res,arr);	//[ 4, 3, 2, 1 ] [ 4, 3, 2, 1 ]
```

​	**注意，sort只适用于Number类型和valueOf方法返回值为数值类型的对象类型！**

##### 操作方法（concat，slice，splice）

​	concat：复制原数组，并将传入的参数作为元素插入到复制元素的末尾返回，不改变原数组，不传参则相当于复制数组；

​	slice：根据传入的参数截取数组并返回这个新数组，slice接受一到两个参数（即截取的开始位置和结束位置，左闭右开），方法不影响原数组；

​	splice：最强大的数组方法，可以做到**删除，插入，替换**

​					接受三个参数，从左到右分别是**操作位置，删除项数，（插入项）**，操作会改变原数组，最终返回被删除的项

```js
let arr = ['a','b','c','d'];
arr.splice(1,1);
console.log(arr);	//['a','c','d']
arr.splice(1,0,'e');
console.log(arr);	//['a','e','c','d']，splice的插入是从指定位置插入，先前存在的元素会顺序向后
arr.splice(1,1,'b');
console.log(arr);	//['a','b','c',d]，替换规则和插入规则相同
```

##### 位置方法（indexOf，lastIndexOf）

​	两者都是根据传入的参数返回数组中对应的位置，不存在则返回-1，唯一的区别是**前者是顺序查找，后者是逆序查找**

##### 迭代方法（for方法系列）和 归并方法（reduce，reduceRight）

​	在**数组便利方法**中我有整理，详情可见；

#### 4.Function

1. 本质上，函数是一个对象，函数名是一个指向这个对象的指针变量。
2. 函数声明和函数表达式看似相同，但是函数声明一定是最优先执行的，函数表达式只有在解析器执行到它的时候才去解析；
3. 函数可以作为值被返回。这种手段通常可以用来构建自己需要的辅助函数。
4. 特殊的内部属性：arguments和this。arguments代表传入函数的参数，是一个**类数组对象**，且具有一个名为callee的属性，这个属性指向拥有该arguments的函数本身；this指代函数执行的环境对象
5. 函数也是一个对象，拥有**属性**和**方法**。每个函数都有两个固定的属性：length和prototype。前者是数值，代表函数形参个数，prototype是函数的原型对象，诸如toString(),valueof()等都保存在里面
6. apply，call和bind方法，用于扩充作用域，前两者是立刻执行的，bind只是绑定作用域

#### 5.包装类型——String

1. 回指定位置的字符：charAt(locationNum)、charCodeAt(locationNum) - 返回指定位置字符的字符编码
2. 字符串操作方法：concat - 拼接字符串、slice、substr、substring：截取字符串、indexOf，lastIndexOf：返回字符位置、trim：去除字符转前后空格并返回一个副本