### 引入新类型

​	**众所周知**，js提供了Number、String，Boolean，Null，Undefined这五种基础数据结构和Object这一引用数据结构。而ES6中，又引入了一种新的基础数据结构——**Symbol**。

### 创建方式

​	Symbol值由Symbol函数创建，可以接受一个String类型的值作为参数。即便你传入的不是一个字符串，Symbol函数也会把传入的值转成一个String。例：

```js
let s1 = Symbol('liao');
let s2 = Symbol(1);
let s3 = Symbol({name:'liao'})
console.log(s1,s2,s3);
//	Symbol(liao) Symbol(1) Symbol([object Object])
```

**参数类型转换时，会调用toString方法**。

### 独一无二

​	每一个Symbol值都是独一无二的存在。对于Symbol而言，传入的参数只是对当前Symbol值的描述，并无实际意义。例：

```js
let s4 = Symbol('liao');
let s5 = Symbol('liao');
console.log(s4,s5);
console.log(s4 === s5);
//	Symbol(liao) Symbol(liao)
//	false
```

**另外，Symbol值无法参与计算，但可以转换为String和Boolean**。

### Symbol.prototype.description

​	Symbol值在创建的时候会传入一个String作为标识，这个标识可以通过实例属性description返回。

```
let s6 = Symbol('liao');
console.log(s6.description);
//	liao
```

### 作为属性名

​	在Symbol出现之前，定义对象的属性名只能通过String类型来定义，而这样很容易出现重名不可用的情况，因此Symbol的唯一值特性就有了用武之地。

```js
let s7 = Symbol('liao');
let s8 = Symbol('liao');
let o1 = {
	[s7]:'liao1',
	[s8]:'liao2'
}
console.log(o1);
//	{ [Symbol(liao)]: 'liao1', [Symbol(liao)]: 'liao2' }
```

这里说明一下，如果要以Symbol作为对象的属性，就必须以**[Symbol()]**的格式命名，否则会认为是一个String。同样的，访问的时候也无法以'.'的方式访问，只能通过**obj[s7]**的方式访问。

### 遍历

​	通常的for...in和for...of方法是访问不到对象中的Symbol属性名的，JSON.stringify()、Object.getOwnPropertyNames()、Object.keys()也不能访问到Symbol属性名，因此有专门访问它的方法：Object.getOwnPropertySymbols()，返回的是一个Symbol值构成的数组。

```js
let s7 = Symbol('liao');
let s8 = Symbol('liao');
let o1 = {
	[s7]:'liao1',
	[s8]:'liao2'
};

console.log(Object.getOwnPropertySymbols(o1));
//	[ Symbol(liao), Symbol(liao) ]
```

### 消除魔术字符串

​	魔术字符串是指在代码中具有高出现频率的字符串，这对代码维护是十分不好的行为，因此我们可以要把这些魔术字符串变成变量。



