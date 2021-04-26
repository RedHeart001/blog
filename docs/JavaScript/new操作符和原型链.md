## new操作符和原型链

### new到底做了什么？

​	JavaScript中，创造对象的时候通常会使用**构造函数**方式：

```js
function Fn(obj) {
	this.name = obj.name;
	this.age = obj.age;
	this.sex = obj.sex;
}
let fn1 = new Fn({
	name:'liao',
	age:18,
	sex:'male'
});
```

而这个过程大致可以理解为以下几步：

1. 创建一个新对象（**let fn1 = {}**）；
2. 将构造函数的作用域赋给新变量（**通常函数内部的this指向window对象，但在new操作符作用下this指向这个新对象**）；
3. 执行构造函数内部的代码（**字面意思**）；
4. 返回执行完构造代码的新对象。

### 原型链

先看一个例子：

```js
function Fn(obj) {
	this.name = obj.name;
	this.age = obj.age;
	this.sex = obj.sex;
};
let fn1 = new Fn({
	name:'liao',
	age:18,
	sex:'male'
});
```

#### prototype

​	当我们用控制台查看Fn函数，就会发现该函数的身上就会有一个**prototype**属性，该属性指向一个对象，而**这个对象正是调用该构造函数而创建的实例的原型**（即**实例对象fn1的原型**）

```js
//函数console结果
ƒ Fn(obj)
length: 1
name: "Fn"
arguments: null
caller: null
prototype:{	//构造函数创建出的实例对象的原型对象
	constructor: ƒ Fn(obj)	//原型关联的构造函数
	__proto__: Object	//指向创建实例的构造函数的原型对象
}
```

本质上说，**通过构造函数创建的实例与构造函数并无关系，只有实例的原型对象才与构造函数有关系（propertype的constructor属性值为构造函数）**

实例对象会继承原型对象的所有属性，因此构造函数创建出的实例也会有相同的属性。

但原型对象的属性是不可重写的，只能在实例上加入同名属性屏蔽原型属性，但这样的后果是我们再也无法访问原型对象上的这个属性，除非用delete方法删除实例上的该属性。

还有一点很重要，**以原型创建的实例都是实时响应原型变化的，因此如果添加新的方法或新的属性都能第一时间访问到。但如果重写原型对象的话，实例就会切断构造函数与最初的原型对象之间的联系**。示例如下：

```javascript
function Person(){

}

let op = new Person();

//这种重写方式会把原型对象的constructor改变为Object
Person.propertype = {
	name:'liao',
	sayName:function() {
		console.log(this.name);
	}
}

//op的原型对象仍为初始的Person的原型对象
console.log(op);
```



#### 原型链

​	事实上，任何实例或函数在创建的时候都有一个**proto属性**，该属性指向**构建实例或函数的构造函数的原型对象prototype**（即实例对象fn1的proto指向构造函数Fn的原型对象）。

​	以proto此为基础，所有的实例和构造函数都可以像链条一样串联起来，最终成就了**原型链**这一概念。

​	原型链的最顶级是Null，因为Object..prototype.proto === null