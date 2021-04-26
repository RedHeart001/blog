## 判断数据类型

#### typeof (value)：

​	直接判断value的类型，具体结果如下：

- ​	undefined：值未定义；
- ​	boolean：值是布尔类型；
- ​	string：值是字符串类型；
- ​	number：值是数值类型；
- ​	object：值是对象类型（不是函数！！）或**null**；
- ​	function：值是函数类型；


#### A instanceof B：

​	判断变量A是否为原型B的实例，返回一个布尔值表示是与否。但要注意A必须是一个**对象实例**，否则会出现下述问题：

```js
console.log('lalala' instanceof String); //false
```

正确的格式应该是：

```js
var str = new String('lalala');
console.log(str instanceof String);	//true
```

#### toString:

​	个人认为是最佳方案。通过调用原型方法**Object.prototype.toString.call(value)**准确返回变量的数据类型，例：

```js
console.log(Object.prototype.toString.call(1));	//[object Number]
console.log(Object.prototype.toString.call(''));	//[object String]
console.log(Object.prototype.toString.call(null));	//[object Null]
console.log(Object.prototype.toString.call(new Object()));	//[object Object]
console.log(Object.prototype.toString.call(function function_name(argument) {
	// body...
}));	//[object Function]
console.log(Object.prototype.toString.call());	//[object Undefined]
console.log(Object.prototype.toString.call(true));	//[object Boolean]
console.log(Object.prototype.toString.call(Symbol()));	//[object Symbol]
```



## 安全作用域

```js
function Foo(side) {
  // 防止直接调用Foo方法，覆盖window中的同名变量
  if (this instanceof Foo) {
    this.side = side;
    this.getArea = function () {
      return 0;
    };
  } else {
    return new Foo(side);
  }
}

function Bar(width, height) {
  // call函数改变作用域
  Foo.call(this, 2);
  this.width = width;
  this.height = height;
  this.getArea = function () {
    return width * height;
  };
}

// 原型链继承，能够添加side属性
Bar.prototype = new Foo();

let bar = new Bar(5, 10);
console.log(bar.getArea());
```

## 防篡改对象

```js
Object.preventExtensions(obj);	// 不可扩展（无法新增属性和方法，仍可以修改删除原有的属性方法）
Object.seal(obj);	// 密封（无法新增属性方法，无法删除原有属性方法，可以修改原有属性方法）
Object.freeze(obj);	// 冻结（无法新增、删改对象的属性方法）
```

## 重复定时器

​	由于js本身单线程的执行性质，因此js中的**setInterval**定时器可能会因为间隔和预期不符而浪费性能。所以我们可以自己封装setInterval：

```js
setTimeout(function () {
  if (i < 5) {
    console.log(i);
    i++;
    setTimeout(arguments.callee, 1000);	// arguments是es5写法特有的对象，es6中使用rest对象
  }
}, 1000);
```

## 防抖、节流（短时间内，保证函数只触发一次的策略）

#### 防抖（将多次执行整合为一次）

```js
function debounce(fn,delay){
	let timer = null;
	return function(){
		if(timer){
			clearTimeout(timer);
		}
		timer = setTimeout(fn,delay);
	}
}
```

#### 节流（人为强制每隔一段时间，执行一次函数）

```js
function throttle(fn, delay) {
  let isWorking = true;	// 中间变量控制用户触发
  return function () {
    if (!isWorking) return;
    isWorking = false;
    const ctx = this;
    let args = arguments;
    setTimeout(() => {
      fn.apply(ctx, args);
      isWorking = true;
    }, delay);
  };
}
```

## 变量声明注意

​	在es6引入了let和const之后，var就显得鸡肋很多，尤其是var本身是依据**函数作用域**，会出现变量提升，能够重复声明同一变量的问题。

​	因此，日常编程**要注意少使用var，优先使用const声明变量，对可能会改变的变量用let声明**

## Number类型注意

- 浮点数的内存是整数的两倍，因此要尽量避免使用；
- 对于极大或极小的数，可以使用科学计数法，如3.125e4 => 31250；
- 浏览器中存在最大值和最小值，超过都会自动认为是infinity
- `isNaN()`可以用于测试对象。此时，首先会调用对象的`valueOf()`方法，然后再确定返回的值是否可以转换为数值。如果不能，再调用`toString()`方法，并测试其返回值
- Number()、parseInt()、parseFloat()都可以转换参数为数值类型，Number是转型函数，情况较为复杂，后两者更侧重于判断参数是否含有数字；
- 使用parseInt转换数值时，应注意**以‘0x’开头的会被认为是16进制数**，所以可以增加第二个参数（**整数类型**）指定进制，默认为十进制；
- parseFloat只会识别十进制数，并自动忽略开头的‘0’

## String类型注意

- num.toString(n)：将数值根据传入的参数转换进制输出，如`10.toString(8)`输出12；

- padStart/padEnd(strLen,fillStr) ：填充字符串到指定长度；

- 模板字面量中的插值可以插入任意表达式，并不限于变量（如函数）；

- 模板字面量——标签函数：

  ```js
  let a = 6;
  let b = 9;
  
  function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
    console.log(strings);
    // 对于有n个插值的模板字面量，传给标签函数的表达式参数的个数始终是n，而传给标签函数的第一个参数所包	// 含的字符串个数则始终是n+1。这些字符串代表插值间隔的几个字符串
    console.log(aValExpression);
    console.log(bValExpression);
    console.log(sumExpression);
  
    return 'foobar';
  }
  
  let untaggedResult = `${ a } + ${ b } = ${ a + b }`;
  let taggedResult = simpleTag`${ a } + ${ b } = ${ a + b }`;
  // ["", " + ", " = ", ""]
  // 6
  // 9
  // 15
  
  console.log(untaggedResult);   // "6 + 9 = 15"
  console.log(taggedResult);     // "foobar"
  ```

- 标签函数String.raw可以获取原始的字面量模板内容：

  ```js
  // Unicode示例
  // \u00A9是版权符号
  console.log(`\u00A9`);            // ©
  console.log(String.raw`\u00A9`);  // \u00A9
  
  // 换行符示例
  console.log(`first line\nsecond line`);
  // first line
  // second line
  
  console.log(String.raw`first line\nsecond line`); // "first line\nsecond line"
  ```

## Symbol类型

- 全局Symbol

  ```js
  let s = Symbol.for('foo');
  console.log(Symbol.keyFor(s));   // 'foo'
  
  let sym = Symbol.for('hhh');
  console.log(Symbol.keyFor(sym));	// 'hhh'
  ```

- Symbol也可以定义对象属性名，使用Object.getOwnPropertiesSymbols(obj)方法即可获得obj所有的Symbol属性，Reflect.ownKeys(obj)可以获取所有类型的属性名称；

- 注意Symbol有许多保留的关键字（详见红宝书），可以重新定义很多原型方法的逻辑（如对象定义Symbol.iterator和具体函数）；


## Date类型使用注意

- 创建Date对象，可以使用Date.parse(dateStr)或Date.UTC(dateStr)两个辅助函数；

- 常用api：

  ​	Date.now：返回现在的时间（毫秒数），

  ​			.toLocaleString/toString：返回当前浏览器环境的时间字符（根据浏览器的不同，两者会有差异），

  ​			.getFullYear：返回四位数年份，

  ​			.getMonth：返回月份（0-11），

  ​			.getDate：返回日期（1-31），

  ​			.getDay：返回星期数（0-6，从周日开始算），

  ​			.getHours：返回小时数（0-23），

  ​			.getMinutes：返回分钟数（0-59），

  ​			.getSeconds：返回秒数（0-59）；

## 原始值包装类型

- 主要针对Boolean，Number，String。例如字符串str.substr(0,1)，此处就是隐式转换成String对象，然后调用substr函数；

- toFixed(n)：四舍五入，保留n位小数；

- toExponential(n)：四舍五入，返回科学计数法表示的结果，n代表小数位数；

- Number.isInteger(num)：判断num是否为整数（主要针对1.00这种情况）；

- str.charAt/charCodeAt(position)：返回指定位置的字符 / 字符编码；

- slice，substring，substr都是截取子字符串的方法，第一个参数都是起始位置，前两者第二个参数代表结束位置（左闭右开），substr第二个参数代表长度；

- trim：去掉首尾空白，repeat(n)：复制n遍字符串然后返回；

- str.padStart/padEnd(n,item)：复制字符串并返回，长度若小于n则用item补足，直到字符串长度为n；

- localeCompare(a,b)：比较两个字符串大小，例子如下：

  ```js
  let stringValue = "yellow";
  console.log(stringValue.localeCompare("brick"));  // 1，参数str先于str
  console.log(stringValue.localeCompare("yellow")); // 0，等于
  console.log(stringValue.localeCompare("zoo"));    // -1，在后
  ```

  

- str.replace：匹配、替换字符串。第一个参数为字符串或正则表达式，第二个参数是替换的字符串或函数。

  ```js
  let str = 'bat,cat,dat,eat';
  let res = str.replace(/(.at)/g,(match,originStr,pos) => {
  	console.log(match,pos);
  	return match.slice(-match.length,-2) + 'hh';
  });
  // bat 0
  // cat 4
  // dat 8
  // eat 12
  console.log(res);	// bhh,chh,dhh,ehh
  ```


## Array类型补充

- ES6新增了创建数组的方法：**Array.from**

  ```js
  // 字符串会被拆分为单字符数组
  console.log(Array.from("Matt")); // ["M", "a", "t", "t"]
  
  // 可以使用from()将集合和映射转换为一个新数组
  const m = new Map().set(1, 2)
                     .set(3, 4);
  const s = new Set().add(1)
                     .add(2)
                     .add(3)
                     .add(4);
  
  console.log(Array.from(m)); // [[1, 2], [3, 4]]
  console.log(Array.from(s)); // [1, 2, 3, 4]
  
  // Array.from()对现有数组执行浅复制
  const a1 = [1, 2, 3, 4];
  const a2 = Array.from(a1);
  
  console.log(a1);        // [1, 2, 3, 4]
  alert(a1 === a2); // false
  
  
  // 可以使用任何可迭代对象
  const iter = {
    *[Symbol.iterator]() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
  
    }
  };
  console.log(Array.from(iter)); // [1, 2, 3, 4]
  
  // arguments对象可以被轻松地转换为数组
  function getArgsArray() {
    return Array.from(arguments);
  }
  console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4]
  
  // from()也能转换带有必要属性的自定义对象
  const arrayLikeObject = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4
  };
  console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4]
  ```

  Array.from也接受第二个函数参数，起到类似于arr.map()的作用：

  ```js
  let arr = [1,2,3,4],
  	newArr = Array.from(arr,val => val * 2);
  console.log(newArr); // [ 2, 4, 6, 8 ]
  ```

- ES6之后，数组中的空位会自动填补undefined；

- 数组的length属性不只是一个可读属性，可以自己修改以改变数组长度（空位自动补undefined），实现数组尾部的增删操作；

- 三个迭代方法：

  ```js
  let arr = [1,2,3,4],
  	arrKeys = arr.keys(),	// 键迭代器
  	arrVals = arr.values(),	// 值迭代器
  	arrEntries = arr.entries()	// 键值对迭代器
  ;
  ```

- arr.fill(Item,start,end)：以item填充数组，start和end为始末位置；

  ps：fill方法默认忽略超出当前数组索引的项

- arr.copyWithin(insertPos,cutStart,cutEnd)：修改原数组，截取原数组并插入到指定位置，但不会超出长度；

  ```js
  let arr = [0,1,2,3,4,5,6,7,8];
  arr.copyWithin(4,0,3);
  console.log(arr);	// [0, 1, 2, 3, 0,1, 2, 7, 8]
  ```

- 归并方法reduce/reduceRight：

  ```js
  let values = [1, 2, 3, 4, 5];
  let sum = values.reduce((prev, cur, index, array) => {
  	console.log(prev,cur);
  	return prev + cur
  },0);
      // 0 1
      // 1 2
      // 3 3
      // 6 4
      // 10 5
  
  console.log(sum);  // 15
  ```

## Map

- 创建map对象时除了使用数组，也可以使用迭代器对象创建：

  ```js
  let map = new Map({
  	index:0,
  	[Symbol.iterator]:function*() {
  		while(this.index < 5){
  			// 此处返回必须是数组，返回对象则会认为是
  			yield [`key${this.index}`,this.index++];	
  		}
  	}
  });
  console.log(map);
  ```

- weakMap因为键值弱性，所以不可迭代；

- 基本api：delete(key)、has(key)、set(newKey,newVal)、size()、clear()；

## Set

- 基本api：add(newVal)，has(val)，delete(val)，clear()，size()；
- set和map都是可以迭代的结构，都可以自定义**Symbol.iterator**属性来自定义迭代方式；

## Iterator迭代器

- 数据结构能够迭代的前置条件：1、能够遍历；2、能用[Symbol.iterator]创建Iterator接口对象属性（**最典型的就是Object**）；

  ```js
  let newObj = {
  	name:'liao',
  	age:22,
      // 自定义可迭代协议（迭代函数）
  	[Symbol.iterator]:function(){
  		let index = 1,
  			limit = 5;
  		return {
              // 返回一个next函数，可用于继续迭代
  			next(){
  				if(index < limit){
  					return {value:index++,done:false};
  				}else{
  					return {value:undefined,done:true};
  				}
  			},
              // 当for..of的过程中遇到return，break，throw..catch时会调用return函数
  			return(){
  				console.log('exit!');
  				return {value:undefined,done:true}
  			}
  		}
  	}
  };
  
  for(let i of newObj){
  	if(i>2){
  		break;
  	}
  	console.log(i);
  }
  ```

- 生成器：本质就是generator函数（function*(){ ... }），以函数体中的**yield**为停止执行的标志，此时**函数作用域会保留（即之前的计算状态会留存）**，只有调用next函数才能继续执行。函数体中的**return**为中止迭代的标志，代表迭代结束，即便之后存在yield也不会返回任何值；

- yield * iteratableObj：迭代一个可迭代对象，并返回序列值

  ```js
  function * getArr(arr) {
  	yield * arr;
  }
  
  function * getAnoArr(arr) {
  	yield arr;
  }
  
  let iter1 = getArr([1,2,3]);
  let iter2 = getAnoArr([1,2,3]);
  
  for (let val of iter1) {
  	console.log(val);
  }
  // 1
  // 2
  // 3
  
  for (let val of iter2) {
  	console.log(val);
  }
  // [1,2,3]
  ```

- 迭代器函数本身返回的时**done**为**true**时的值，因此如果函数中没有专门的return值，就只会得到一个undefined；

  ```js
  function * gen1() {
  	yield 'gen1 start!';
  	yield * [1,2,3];
  	return 'gen1 end!'
  }
  
  function * gen2() {
      // 如果gen1中不返回值，此处显示的就是undefined
  	console.log('iter2 value:',yield * gen1());
  }
  
  for(let val of gen2()){
  	console.log(val);
  }
  ```

- 迭代器的递归用法

  ```js
  function * gen(n) {
  	if(n > 0){
  		yield * gen(n-1);
  		yield n;
  	}
  }
  for(let val of gen(5)){
  	console.log(val);
  }
  ```

- 终止generator函数：

  ```js
  1、return（关闭函数，同时将状态直接定位true）
  function * gen() {
  	yield * [1,2,3];
  }
  
  let g = gen();
  
  for(let val of g){
  	if(val > 1){
  		// return终止迭代，并且直接将迭代状态定位true
  		g.return(4);
  		console.log(g.return(3));
  		console.log(g.next());
  	}
  	console.log(val);
  }
  
  2、throw（向生成器注入错误信息，不处理则会停止生成器的迭代）
  function *gen () {
  	for(const x of [1,2,3]){
  		yield x;
  	}
  }
  let g = gen();
  
  try{
  	g.throw('err');
  }catch(err){
  	console.log(err);
  }
  
  for(let v of g){
  	console.log(v);
  }
  // err
  // 如果在迭代中处理错误，就会掠过错误项，继续执行
  
  function * gen() {
  	for(let val of [1,2,3]){
  		try{
  			yield val;
  		}catch(err){
  			console.log(err);
  		}
  	}
  }
  
  let g = gen();
  
  console.log(g.next());
  g.throw('err');
  console.log(g.next());
  
  // { value: 1, done: false }
  // err
  // { value: 3, done: false }
  ```
  

## 面向对象

- Obejct具有两种属性：数据属性（configable、enmuable，value，writable）和访问器属性（configable、enmuable、set、get）；

- es6中的Object.assign(target,[source1,source2])方法可以合并多个源对象的属性到目标对象上，然后返回一个新对象（新对象的指针和目标对象指针相同，所以本质是一种浅复制）；

  如果assign的赋值出现报错，不会回滚，只会完成报错属性/函数之前的复制；

- Object.is(obj1，obj2)：检查两个对象是否相等；

- 多层嵌套结构Object；

  ```js
  let person = {
    name: 'Matt',
    age: 27,
    job: {
      title: 'Software engineer'
    }
  };
  
  // 声明title变量并将person.job.title的值赋给它
  let { job: { title } } = person;
  
  console.log(title); // Software engineer
  ```


## Function

- 函数对象只会暴露一个name属性；

- 函数改变arguments参数的值，无法对应地改变真实传入参数的值，因为访问的不是同一个内存：

  ```js
  function doAdd(num1, num2) {
    arguments[1] = 10;
    console.log(arguments[0] + num2);
  }
  
  let num1 = 10;
  let num2 = 30;
  doAdd(num1,num2);	// 20
  console.log(num2);	// 30
  ```

- 只有function函数具有arguments对象，箭头函数没有（但是可以用rest代替）

  ```js
  const doAdd = (...rest) => {
  	console.log(rest);
  }
  
  let num1 = 10;
  let num2 = 30;
  doAdd(num1,num2); // [10,30] => 数组
  ```

- arguments对象并不反映函数参数的默认值

  ```js
  function makeKing(name = 'Henry') {
    name = 'Louis';
    return `King ${arguments[0]}`;
  }
  
  console.log(makeKing());         // 'King undefined'
  console.log(makeKing('Louis'));  // 'King Louis'
  ```

- 以属性排序对象

  ```js
  function createComparisonFunction(propertyName) {
    return function(object1, object2) {
      let value1 = object1[propertyName];
      let value2 = object2[propertyName];
  
      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0;
      }
    };
  }
  
  
  let data = [
    {name: "Zachary", age: 28},
    {name: "Nicholas", age: 29}
  ];
  
  data.sort(createComparisonFunction("name"));
  console.log(data[0].name);  // Nicholas
  
  data.sort(createComparisonFunction("age"));
  console.log(data[0].name);  // Zachary
  ```

- caller（调用当前函数的函数）

  ```js
  function outer() {
    inner();
  }
  
  function inner() {
    // arguments的callee属性指向inner函数本身
    console.log(arguments.callee.caller);
  }
  outer();	// 输出outer
  ```

- new.target（当前函数是正常调用，还是new操作符调用）

  ```js
  function King() {
    if (!new.target) {
      throw 'King must be instantiated using "new"'
    }
    console.log('King instantiated using "new"');
  }
  
  new King(); // King instantiated using "new"
  King();     // Error: King must be instantiated using "new"
  ```

- apply，call，bind：改变函数内部的上下文

- 函数表达式能规避变量提升的问题

## Promise（期约）

- 在Promise出现以前的异步操作都是以回调函数的形式执行异步操作，但在多重嵌套时就会有很多的不便（最典型的：回调地狱）；

- 使用Promise的目的有两个：能够查看当前异步操作的状态（pending、resolve、reject），能够更直观简洁地获取异步操作得到的内部值；

- Promise.resolve(value)：把value实例化成一个已经解决的Promise对象

  ```js
  // setTimeout(fn,time,[args])
  let p = new Promise((res,rej) => {res(3)});
  let p2 = Promise.resolve(4)
  setTimeout(console.log, 0, p);	// Promise { 3 }
  setTimeout(console.log, 0, p2);	// Promise { 4 }
  ```

- Promise.reject：与上面类似，但抛出的是一个错误信息，且只能由Promise 的then函数捕捉

- Promise.prototype.then(resFn,rejFn)：promise实例的程序处理函数，参数是处理resolved和rejected两种情况下的回调函数.函数最终会返回一个Promise对象（链式调用）；

  ```js
  let p = new Promise((res,rej) => {res(3)});
  // 链式返回一个resolved的promise对象
  let p1 = p.then(res => res);
  setTimeout(console.log, 0, p1);	// Promise { 3 }
  ```

- Promise.prototype.catch(rejFn)：promise实例拒绝时的语法糖

- Promise.prototype.finally(fn)：不论是resolve还是reject，最终都会执行finally中的函数；

- Promise.all和Promise.race：

  ```js
  // Promise.all：处理一个迭代对象中，所有promise对象的的resolve情况
  let p = Promise.all([
      new Promise((res,rej) => res(1)),
      new Promise((res,rej) => res(2)),
      new Promise((res,rej) => res(3))
      ]);
  p.then(res => {console.log(res);})	// [ 1, 2, 3 ]
  
  // 途中遭遇reject就会导致剩下的promise也reject
  let p = Promise.all([
      new Promise((res,rej) => res(1)),
      new Promise((res,rej) => rej(2)),
      new Promise((res,rej) => res(3))
  ]);
  p.then(res => {console.log(res);},err => {console.log(err);})	// 2
  ```

  ```js
  // Promise.all：处理一个迭代对象中，第一个promise对象的的最终情况（其余的默认执行，但不显示）
  let p = Promise.race([
      new Promise((res,rej) => rej(1)),
      new Promise((res,rej) => rej(2)),
      new Promise((res,rej) => res(3))
  ]);
  p.then(res => {console.log(res);},err => {console.log(err);})
  ```

- 期约合成

  ```js
  // promise对象的链性调用，往往能串联处理同一个值
  function add(num) {
  	return num + 2;
  }
  
  let sum = Promise.resolve(8);
  sum.then(add)
      .then(add)
      .then(add)
      .then(res =>{
      	console.log(res);
  	});
  // 14
  ```

- async/await：es8新关键字，类似于generator/yield，但是封装更完备（结合js的EventLoop机制理解即可）