### let、const

- 取代es5的全局/函数作用域，正式采用块级作用域；
- 使用let或const声明变量的区域即为块级作用域，依旧遵循作用域链，但更正了es5中变量泄露，变量提升，声明前使用，重复声明等问题；
- 使用var声明的变量会变成全局对象的属性，但let不会。不过生命周期内，let在全局声明的变量仍会存在；
- let有关：暂时性死区，块级作用域，函数声明和变量声明规则相同；
- const：常量声明，不可更改。但当定义一个对象常量时，该常量代表指向对象的引用，所以可以修改对象的属性值；

### 解构赋值

- 数组根据位置索引，对象根据属性名称
- 可以自定义默认值

### 字符串扩展

- es6为字符串增加了iterator遍历器，因此字符串可以使用for..of遍历循环获得值
- 模板字符串：\`${str}\`
- 字符的Unicode表示法，大括号中置入数字则获得对应字符：\u{43}  =>  C
-  新增方法：includes、startsWith、endsWith，分别表示是否含有，是否以参数字符串开头，是否以参数字符串结尾；
- repeat(n)：返回一个新字符串，表示将原字符串重复n次；
- padStart/padEnd：补全字符串，第一个参数为数字，表示指定长度；第二个参数为字符串，表示若调用方法的字符串长度不足，则重复该字符串补足长度，如果长度超过就自动截取一段；
- trimStart/trimEnd：消除首尾空格

### 数值扩展

- Number.isFinite(num)/isNaN(arg)：测试数值是否有限/是否为NaN，返回一个布尔值。前者只接受数值作为参数，后者接受任何类型的参数，对非NaN一律返回false；
- Number.parseInt/parseFloat：和es5相比并无区别，只是把方法挂载到了Number对象上，易于管理；
- Number.EPSILON：表示一个极小的常量
- Math.trunc：去除一个数的小数部分，只返回整数。会默认把参数用Number()处理一下；
- Math.sign:判断一个数的正负，正数返回1，负数返回-1，0返回0，其他值返回NaN；
- Math.cbrt：计算一个数的立方根；
- Math.hypot:返回所有参数平方和的平方根；
- ES2020引入新的数据类型BigInt，该数据类型无任何位数限制；

### 函数扩展

- 函数参数可直接设置默认值：

```js
function demo1(x = 'hello', y = 'world') {
	console.log(x + ' ' + y);
}
demo1();	// hello world
demo1('greeting');	// greeting world
```

- 解构赋值搭配默认值使用：

```js
// 正常解构赋值
let {x:a,y:b} = {x:1,y:2};
console.log(a,b);	// 1 2

//此处必须用等号，用冒号会出现解构无效的错误
function demo2({x='hello', y='world'}) {
	console.log(x + ' ' + y);
}
demo2({});	// hello world
demo2({x:'greeting'});	// greeting world
demo2();	
// 报错，无法获取undefined的x属性，因此可以在定义的时候写成function demo2({x='hello', y='world'} = {})的形式，这样就不会有问题
```

- 设置了默认值的参数应当置于参数尾部：

```js
function demo2(x,y,z=1){
    。。。
}
```

- 当函数中给参数设置了默认值，函数声明时形参处就会形成一个单独作用域。（例子只限es5，es6的let声明变量不可能有这种情况）

```js
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2

var z = 1;
// 此处形参作用域内无z，于是调用全局z变量，因此y为1
function f1(y = z) {
  var z = 2;
  console.log(y);
}

f1() // 1
```

- rest参数

```js
function demo3(a,b,...rest) {
	console.log(a,b,rest);
}
demo3(1,2,3,4,5,6,7);	// 1 2 [ 3, 4, 5, 6, 7 ]
```

rest参数类似于arguments参数，代表一组参数，返回的也是一个数组，因此不论表达还是使用上都要比arguments方便得多。**但要注意rest只能置于形参尾部，否则会报错**

- 箭头函数

（1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。箭头函数本身并没有this对象，因此this指向的就是当前箭头函数所在的作用域。

```js
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

var f = foo.call({id: 1}); // 绑定foo函数的作用域到{id:1}

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```

（2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

- 尾递归，尾调用，柯里化（单一参数）
- es2017允许函数最后一个参数后加一个引号
- es2019Function.prototype.toString()返回的是函数最原本的代码（包括注释）
- es2019允许try/catch的catch语句省略参数err

### 数组扩展

- 扩展运算符（...[a,b,c] =>a b c ）使数组变为参数序列，某种程度上替代了apply方法，还可以把具有iterator属性的类数组对象转化为真正的数组（如NodeList），也能够遍历获取generator函数执行后返回的遍历器对象（如[...go()]）
- Array.from:把类数组对象（具有length属性的对象，如下例、NodeList和arguments）和可遍历对象（iterable）转化为真正的数组（包括Map和Set）。

```js
let obj={
	'0':'liao',
	'1':18,
	length:2
}
console.log(Array.from(obj));	//[ 'liao', 18 ]
```

Array.from方法还接受第二个参数，作用类似于map方法，可以对元素进行处理后，再放入返回的数组当中

- Array.of：把一组参数值转化为数组，如Array .of(3,11) => [3,11]，若无参数则返回空数组

- fill：填充数组，第一个参数表示填充元素，第二第三个参数表示起始位置，左闭右开

- entries()、keys()、values()：循环遍历数组，分别遍历键值对，键名、值

- inclues()：实例方法，是否包含某个元素，返回布尔值

- flat && flatMap：实例方法，扁平化（[a,b,[c,d]] ==> [a,b,c,d]），默认只有一层，也可以传入参数控制扁平化的层数；

  flatMap参数为一个遍历函数，相当于map，会把原数组的项取出处理再放回，然后再解嵌套一层返回新数组

- sort排序算法在es2019已经稳定

### 对象扩展

- 属性的简洁表示

```js
let foo = 'foo';
let bar = 'bar';
let obj = {foo} // 相当于{foo:'foo'}
```

- 属性名表达式

```js
let foo = 'foo';
let bar = 'bar';
let obj[foo] = foo 
// 相当于obj['foo']='foo'，es6会默认把传入[]的表达式转为字符串类型，因此要注意传入对象类型时会被转换为‘object Object’（这是因为调用了object.prototype.toString方法）
```

- 方法的name属性（方法也是对象，有名方法返回函数名，匿名返回一个‘anonymous’字符串）
- 对象属性的遍历和枚举

1、可枚举性：

```js
// Object.getOwnPropertyDescriptor(obj，propName) / getOwnPropertyDescriptor(obj)可以获取指定/所有属性的数据属性：
let aa = {
	name:'liao',
	_age:18
}
Object.defineProperty(aa,'age',{
	get(){
		console.log('get is on');
		return this._age;
	},
	set(newVal){
		this._age = newVal;
		console.log('set is on');
	}
});
let props = Object.getOwnPropertyDescriptors(aa);
console.log(props);
//{
//   name: {
//     value: 'liao',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   _age: { value: 18, writable: true, enumerable: true, configurable: true },
//   age: {
//     get: [Function: get],
//     set: [Function: set],
//     enumerable: false,
//     configurable: false
//   }
// }
```

​	enumerable即代表属性是否可枚举。当有属性该值为false时，for..in、Object.keys、JSON.stringify、（这三种是ES5就有）Object.assign将无法监测到该属性

​	**需要注意的是，for..in是会返回一个对象的继承属性的，enmuerable出现的意义就是为了规避这种问题。因此使用后三个方法只能检测到对象本身具有的属性，这一点要注意。**

2、属性遍历

**ES6**属性遍历方法共有五种：

1. for..in：遍历所有可枚举的属性（包括继承属性，但不含Symbol属性）
2. Object.keys(obj)：遍历所有可枚举属性（不含继承属性和Symbol属性），返回一个键名数组
3. Object.getOwnPropertyNames(obj)：遍历所有属性（不含Symbol属性，但包括不可枚举属性），返回键名数组
4. Object.getOwnPropertySymbols(obj)：遍历所有Symbol属性键名
5. Reflect.ownKeys(obj)：遍历所有属性键名（所有）

- super关键字（es6提出类class的概念，super指向当前对象的原型对象）
- Null判断运算符（??，当左侧值为null或undefined时才返回右部值）
- Object.assign(target,obj1,obj2,.....)：将obj1，obj2等源对象的属性合并到目标对象上，并返回一个新的合并后的对象。合并时若有同名属性则直接按照顺序替换，处理数组时按照也照对象的标准按index替换
- \_\_proto\_\_、Object.create、Object.setPrototypeOf/getPrototypeOf：对象的原型对象，原型对象的创建（返回一个原型为参数对象的空对象），手动设置/获取对象的原型对象
- 新的遍历方法（返回数组，只遍历可枚举属性）：Object.keys()/values()/entries()

### Set、Map

- Set

  - 类似于数组，但成员值唯一，不存在重复

  - 创建函数Set()可以接受一个数组作为参数完成初始化

  - 在Set内部两个NaN会去重，两个相同的对象不会

  - 实例属性：

    size：Set内部成员总数

  - 实例方法：
    1. add(value)：添加某个值，返回添加过的Set结构本身（因此支持链式调用）；
    2. delete (value)：删除某个值，返回布尔值表示是否成功删除；
    3. has(value)：判断是否存在某个值，返回一个布尔值；
    4. clear()：清除所有内部成员；

  - 遍历操作：
    1. Set.keys()：返回键名遍历器，由于Set并不存在键名，所以返回的是键值；
    2. Set.values()：返回键值遍历器；
    3. Set.entries()：返回键值对的遍历器；
    4. Set.forEach((val,key,set) => {...})：使用回调函数遍历每个Set的成员。

  - 由于Set结构具有iterator接口，因此可以直接用for..of遍历，遍历器默认函数为values

  - 可以结合扩展运算符转化成数组

- WeakSet
  
  类似于Set，但成员值只能是对象，但不可遍历，且内部对象都是弱引用
  
- Map
  
  - 键值对的集合，结构上类似于对象，但其键类型并不仅限于字符串，而是支持任意类型。从这一点看，Map结构提供了“值-值”的对应关系；
  - **任何具有iterator接口，且每个成员都是双元素的数组的数据结构**都能成为Map构造函数的参数（因此单纯的对象无法成为参数）；
  
  ```js
  [
  	['name','liao'],
  	['age',17],
  	['hobby','read']
  ]
  ```
  
  - 具有实例方法set(key,value)、get(key)、has(key)、size属性、delete(key)、clear()，分别可以设置指定键的值，依据键获取值，判断是否存在某个键，获取Map实例长度，根据键名删除键值对，清除Map结构中的所有键值对；
  
    **和Set相同，可以参考**
  
  - set方法对已存在的键名会更新值，不存在的键会定义；get方法对不存在的键返回undefined；
  
  - 不推荐以对象作为键，因为引用类型数据就算值相同，但地址不同，我们只能获取到地址；
  
  - 遍历：map.keys()/values()/entries()/forEach((val,key,map) => {...})，分别返回键名遍历器，值遍历器，键值对遍历器，回调函数遍历处理Map成员
  
  - 由于Map结构具有iterator接口，因此可以直接用for..of遍历，遍历器默认函数为map.entries()
  
  - 可以结合扩展运算符转化成数组

- WeakMap

  和WeakSet类似，键值只能是对象，键名是正常值，但键名采取弱引用，目的是为了防止内存泄露

  典型应用场景：DOM节点作为键名，键值保存节点信息

### Proxy

- 从效果上描述类似于对象拦截器，实际上更像是对象的代理，能够读取对象的属性和方法，并依据需求设置效果

```js
let person = {
	name:'joker',
	age:18,
	run:function () {
		console.log(this.name + ' run!');
	}
}
//构造函数Proxy(target,handler)，target代表目标对象，handler是一个对象，属性为各种拦截操作
let proxy = new Proxy(person, {
  get: function(target, propKey,receiver) {
    console.log('get ' + propKey);
  },
});
console.log(person.name);	// joker
proxy.age	// get age
```

- Reflect对每一个Proxy对象的拦截操作都有对应的API

  ```js
let person = {
  	name:'joker',
  	age:18,
  	run:function () {
  		console.log(this.name + ' run!');
  	}
  }
  //构造函数Proxy(target,handler)，target代表目标对象，handler是一个对象，属性为各种拦截操作
  let proxy = new Proxy(person, {
    get: function(target, propKey,receiver) {
      console.log('get');
      return Reflect.get(...arguments)
    },
  });
  console.log(person.name);	// joker
  console.log(proxy.age); 
  // get
// 18
  ```

- 拦截的操作：

  1. `get(target,propKey,receiver){ ... }`

     get用于**拦截对象属性读操作**，参数依次为目标对象，属性名，proxy对象
     
     ```js
     var proxy = new Proxy(person, {
       get(target, propKey,receiver) {
         console.log('get ' + propKey,receiver);
         return receiver;
       },
       set(target,prop,value){
       	console.log(target,prop,value);
       }
     });
     console.log(proxy.name === proxy);	// true
     ```
     
  2. `set(target,propKey,value,receiver){ ... }`

     set用于**拦截对象属性写操作**，参数依次是目标对象，属性名，传入的属性值，proxy对象

  3. `apply (target,ctx,args){ ... }`

     拦截**函数调用、call和apply操作**，参数依次是目标对象，目标对象上下文（this）和目标对象的参数数组

     ```js
     let fn = function () {
     	console.log('this is target!');
     }
     
     let applyPro = new Proxy(fn,{
     	apply(target,ctx,args){
     		let sum = [...args].reduce((pre,cur) => {
     			return pre + cur;
     		},0);
     		console.log(sum);
     	}
     });
     
     applyPro(1,2,3);	// 6
     applyPro.call(null,1,2,3);	// 6
     applyPro.apply(null,[1,2,3]);	// 6
     ```

  4. `has(target,key){ ... }`

     拦截`HasProperty`操作（不只针对`hasOwnPropertyNames`），即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`（prop in obj）运算符。has无法拦截for..in遍历

  5. `construct(target,args,newTarget){ ... }`

     拦截new命令，参数依次为目标对象，构造函数的参数对象，构造实例对象时new作用的构造函数

     ```js
     //	Fnp为new作用的构造函数
     let Fnp = new Proxy(function() {},{
     	construct(target,args,newTarget){
     		console.log(target,args,newTarget);
     		return{	// 必须返回一个对象，否则会报错
     			name:'liao',
     			age:args[0]
     		};
     	}
     })
     let fnp = new Fnp(17);
     console.log(fnp);
     //	ƒ(){} [17]  Proxy 
     //	{ name: 'liao', age: 17 }
     ```

  6. `deleteProperty(target,key){ ... }`

     拦截delete命令，如果方法抛出错误或返回false，当前属性则无法被删除

     ```js
     let person = {
     	name:'joker',
     	age:18,
     	run:function () {
     		console.log(this.name + ' run!');
     	}
     }
     
     var proxy = new Proxy(person, {
       deleteProperty(target,key){
     		console.log(target,key);
           	// 删除name键
     		if(key === 'name'){
     			delete target[key];
     		}
     		return false;
     	}
     });
     delete proxy.name;	// { name: 'joker', age: 18, run: [Function: run] } name
     delete proxy.age;	// { age: 18, run: [Function: run] } age
     console.log(proxy);	// { age: 18, run: [Function: run] }
     ```

  7. `definePropety(target,key,descriptor)`

     拦截`object.defineProperty`方法，但由于set/get级别高于defineProperty，因此感觉实际意义不是很大

  8. `getOwnPropertyDescriptor(target,key)`

     拦截`Object.getOwnPropertyDescriptor`方法，返回一个属性描述对象或undefined

  9. `getPrototypeOf()`

     拦截获取对象原型，具体拦截这些操作：`Object.prototype.__proto__`、`Object.prototype.isPrototypeOf()`、`Object.getPrototypeOf()`、`Reflect.getPrototypeOf()`、`instanceof`

     返回值必须是对象或者null，否则报错

  10. `isExtensible(target)`

      拦截`Object.isExtensible`方法。`Object.isExtensible(obj)`用于判断对象是否可扩展（是否能增添新属性）。

      方法只能返回布尔值

  11. `ownKeys(target)`

      ​	拦截对象自身属的性读取操作，具体包括：`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols`、`Object.keys()`、`for..in`

      ​	当使用`Object.keys()`遍历读取对象属性时，目标对象上不存在的属性、属性名为Symbol值、enmerable值为fasle的属性会被自动过滤：

      ```js
      let person = {
      	a:1,
      	name:'joker',
      	age:18,
      	[Symbol.for('liao')]:'liao',	// Symbol值键名
      	run:function () {
      		console.log(this.name + ' run!');
      	}
      }
      console.log(Object.keys(person));
      Object.defineProperty(person,'demo',{
      	value:'demo_text',
      	enumerable:false	//demo不可枚举
      })
      let proxy = new Proxy(person, {
      	ownKeys(target){
      		return ['a','b',Symbol.for('liao'),'run','demo']
      	}
      });
      console.log(Object.keys(proxy));	//[ 'a', 'run' ]
      ```

      ​	`ownKeys`方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。

      ​	不可配置（configurable为false）属性必须被返回

      ​	如果目标对象不可扩展，此时`ownKey`方法返回的数组必须包括目标对象所有的属性，且不能包含多余属性

  12. `preventExtensions(target)`

      拦截`Object.preventExtensions()`，方法必须返回一个布尔值。

      唯一要注意的是，只有目标对象不可扩展(Object.isExtensible(proxy)为false)时，`preventExtensions(target)`才能返回true，否则报错。因此通常会预先调用一次`Object.preventExtensions(target)`

  13. `setPrototypeOf(target,proto)`

      拦截`Object.setPrototypeOf`方法，且只能返回布尔值

- `Proxy.revocable(target,handler)`

  `Proxy.revocable`方法返回一个对象，该对象的`proxy`属性是`Proxy`实例，`revoke`属性是一个函数，可以取消`Proxy`实例。上面代码中，当执行`revoke`函数之后，再访问`Proxy`实例，就会抛出一个错误。

  ```js
  let target = {};
  let handler = {};
  
  let {proxy, revoke} = Proxy.revocable(target, handler);
  
  proxy.foo = 123;
  console.log(proxy.foo) // 123
  
  revoke();
  console.log(proxy.foo) // TypeError: Revoked
  ```

  `Proxy.revocable`的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

- this指向问题

  ​	proxy代理对象的访问，但不能**全权代理**，因此this会指向proxy对象。对此可以用bind直接绑定访问对象的上下文（this）。

### Class

- ES5中，定义类时都是用function，但ES6提出了正式class类的概念，但其本质仍是相当于function的语法糖，因此定义的class仍具有prototype、proto等特性，且含义与ES5时期相同；

- Class的所有方法都是定义在`Class.prototype`上的，所以想添加新方法时可以直接用`Object.assign`把方法添加上去。另外，在class内部定义方法enumerable属性为false，实例中是无法获取到方法的，只能得到属性；

- constructor

  类默认构造方法，通过new命令生成对象时会自动调用该方法，构造对象并返回类的原型对象；
  
- setter/getter

  set/get访问器方法

- Generator方法

  ```js
  class Point {
    constructor(x, y,age) {
      this.x = x;
      this.y = y;
      this._age = age;
      this.arr = [x,y,age];
      this.showThis = this.showThis.bind(this);
    }
  
    set age(age){
    	this._age = age;
    	console.log('age is set!');
    }
  
    get age(){
    	console.log('age is get!');
    	return this._age;
    }
  
    *[Symbol.iterator](){
    	yield Object.keys(this);
    }
  
    showThis(){
    	console.log(this);
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }
  
  let p1 = new Point(1,2,17);
  let p2 = new Point(2,3,18);
  
  for (let val of p1){
  	console.log(val);
  }	
  //	for..of会访问对象的iterator接口，遍历调用遍历器对象，最后返回对象的键数组
  ```

- 静态属性和方法

  内部定义方法时，在方法名前加上static关键字。

  定义静态属性时，直接以类名调用点方法定义即可。

- 子类继承父类时，子类的`__proto__`代表继承，指向父类的构造函数，子类原型对象的`__proto__`也指向父类原型对象

  子类构造实例的`__proto__`指向子类原型，再上一级为父类