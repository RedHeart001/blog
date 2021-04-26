## this的指针问题

### 首先要声明一点，this的指向不是在声明的时候确定的，而是在调用的时候才会确定！

### 具体情况 

1. 如果一个函数中有this，但是它没有被上一级的对象所调用，那么this就会指向window（非严格模式下，严格模式下的顶层是指向`undefuned`）；

2. 如果一个函数中有this，这个函数又被上一级的对象所调用，那么this就会指向上一级的对象；

3. 如果一个函数中有this，这个函数中包含多个对象。尽管这个函数是被最外层的对象所调用，this却会指向它的上一级对象；

   ```js
   // 综合以上三点
   let b = {
       a:2,
       fn:function(){
           console.log(this.a); 
       }
    }
   
   b.fn();	// 2
   
   let obj = {
       a:1,
       b:b
   }
   
   obj.b.fn();	//	2
   
   const demo = obj.b.fn;
   
   demo();	// undefined
   ```

4. call、bind、apply显式改变this指向

   ```js
   function demo() {
   	console.log(this);
   }
   
   let user1 = {name:"user1"}
   let user2 = {name:"user2"}
   let user3 = {name:"user3"}
   
   // call，apply和bind会显式地改变this指向
   demo.call(user1);
   demo.apply(user2);
   
   const demoBind = demo.bind(user3);
   
   // bind的权重大于apply和call
   demoBind();
   
   demoBind.call(user1);
   demoBind.apply(user2);
   ```

5. new改变this指针

   通过new在创建对象的过程中，会自动改变对象的this指针，指向新创建的对象。同时return的结果也会影响this；

   ```js
   function fn(){
     this.user = "前端食堂";
     return {};
   }
   let a = new fn();
   console.log(a.user);	// undefined
   
   
   function fn(){
     this.user = "前端食堂";
     return 1;
   }
   let c = new fn;
   console.log(a.user); 
   
   // 如果返回的是引用类型对象，则this指向该对象
   // 否则就指向新建的实例
   // 另外，如果返回的是null，this也会指向新建的实例
   
   
   ```

6. 箭头函数

   箭头函数是唯一的例外，因为它本身并没有this这一说法，处于哪个环境，this就会指向谁。换言之，箭头函数的this由创建时的位置决定

   ```js
   function callback(qdx){
     qdx();
   }
   callback(()=>{console.log(this)});        // window
   
   var user = {
       name:"前端食堂",
       callback:callback,
       callback1(){
         callback(()=>{console.log(this)});
       }
   }
   user.callback(()=>{console.log(this)});  // still window
   user.callback1(()=>{console.log(this)}); // user
   ```

### 区分严格

​	**非严格模式下，顶层指向window；严格模式下，顶层指向undefined**

​	

### 