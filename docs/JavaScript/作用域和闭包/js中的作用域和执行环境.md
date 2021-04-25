## js中的作用域和执行环境

### es5（全局作用域和函数作用域）

​	es5中，作用域可以分为全局作用域和函数作用域，每一个作用域都是一个执行环境，彼此之间根据**作用域链**来确定访问权限，目前可以归纳为：

1. 全局作用域永远处于作用域链的最末端；

2. 如果存在作用域嵌套，那么只能是前端作用域访问后端作用域中的变量和函数，打比方的话就是**儿子可以向老爸要钱，老爸不能向儿子要**；

   ```js
   var winColor = 'red';
   function changeColor() {
   	var anotherColor = 'blue';
   	function swapColor() {
   		var tempColor = winColor;
   		winColor = anotherColor;
   		anotherColor = tempColor;
   		//这里可以访问winColor、anotherColor和tempColor
   	}
   	//这里可以访问winColor和anotherColor
   	swapColor();
   }
   //这里只能访问winColor
   changeColor();
   ```

3. 当函数作用域中存在不使用标识符**var**定义的变量时，这个变量默认挂在全局作用域下，就像这样：

   ```JS
   function add(num1,num2) {
   	sum = num1 + num2;
   	return sum;
   }
   var count = add(10,20);
   console.log(sum,count);	//30 30
   ```

4. 函数作用域中如果存在和全局作用域同名的变量，函数作用域的优先级更高；

   ```js
   var a = 1;
   function fn() {
   	console.log(a);
   	if(3<2){
   		var a = 3;
   	}
       //es5没有块级作用域一说，会有变量提升现象，因此fn中的实际执行顺序是：
       // var a;
       //console.log(a);
       //if(3<2){ ... }
       //因此console.log(a)的结果是undefined
   }
   fn();	//undefined
   ```

5. 变量泄露问题；

   ```js
   for (var i = 0; i < 5; i++) {
   	//这里定义的var i其实是一个全局变量，所以外部是可以访问到的
   	console.log(i);
   }
   console.log(i);	//4
   ```

​	这里有一个很有意思的作用域交替机制，即**当执行流进入一个函数作用域，该作用域会被推入一个环境栈。函数执行完毕后，环境栈将其弹出，并把控制权还给之前的作用域**，而es6在更新了块作用域后是否仍然依循该机制是一个很有意思的问题。

### es6（块作用域）

​	es6对作用域进行了更正，引入**let和const**声明变量，并以块级作用域取代了函数作用域。但凡是let和const声明的地方会自动形成一个作用域，仍遵守作用域链，但不会再出现上述问题。

​	不仅如此，let和const也引入了许多新的特性（let的暂时性死区，不可重复声明，const的不可变性等）

​	

