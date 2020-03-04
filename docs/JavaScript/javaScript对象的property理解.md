javaScript对象的property理解：

​	js对象中的每一个property都具有四个属性，即数据属性，分别是configurable（能否删除、修改属性，能否修改属性为访问器属性，当设为false时属性的任何一个数据属性都不可变），enumerable（能否循环遍历属性），value（属性本身值），writable（能否修改值）

​	**注意：数据属性只能通过Object.defineProperty(obj,obj.pro,proValue)这个方法来设置**

```javascript
		let person = {
			name:'lalala',
			age:15
		};
		console.log(person);
		//Object.getOwnPropertyDescriptor(obj, prpertyName)方法可返回属性的所有数据属性
		console.log(Object.getOwnPropertyDescriptor(person, 'name'));
		Object.defineProperty(person,'name',{
			configurable : false,	//不可更改删除与设置其为访问器属性
			enumerable : false,		//不可被循环遍历
			writable : false	//不可修改值
		})
		console.log(Object.getOwnPropertyDescriptor(person, 'name'));
		delete person.name;
		console.log(person.name);	//lalala
		person.name = 'hehehe'	//hehehe设置无效
		for( let key in person){
			console.log(key);	//不显示name
		}
		console.log(person);
```



es5中，全局变量也是全局对象Window的属性，此时可以用Object.getOwnPropertyDescriptor()方法访问到全局变量的数据属性。但是es6取消了全局变量这一特性，故当用es6来声明变量时无法访问全局变量的数据属性。