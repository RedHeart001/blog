## MockJs

拦截Ajax请求，并返回模拟数据的工具，通常作为前端测试的手段

#### Mock.mock(url ?,type ?,function(options)|template):

​	url：要拦截的url或url正则；

​	type：要拦截的Ajax请求类型，如PUT、POST、GET、DELETE等；

​	template：返回的数据模板，可以是对象或字符串；

​	options：表示用于生成响应数据的函数；

```js
const Mock = require('mockjs');
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素，随机生成1-10不等
    // 'list|1-10':[{
    // 	'id|+1':1
    // }]

    //属性list是由三个元素组成，且一个元素范围在1-10以内，小数点后1-3位不等的随机数组
    // 'list|3':[{
    // 	'val|1-10.1-3':1
    // }]

    //返回StrStrStr
    // 'str|3':'Str' ,
    //随即返回1-3个Str字符串
    // 'str|1-3':'Str'

    //	true，false出现几率各为一半
    // 'name|1':false

    //	1/(1+3)概率为true
    // 'name|1-3':true

    // 从指定对象里抽取2-3个的属性
    // 'objectDemo|2-3':{
    // 	name:'liao',
    // 	age:18,
    // 	sex:'man',
    // 	hobby:'game'
    // }

    //顺序循环id后的数组，每次选取一次元素，且每次选取一个元素作为最终值
    // 'name|1-5':[{
    // 	'id|+1':[1,2,3]	
    // }]
 
    //属性值为函数
 	// 'name':function (argument) {
 	// 	console.log('console test');
 	// 	return 'return test';
 	// }	

 	//属性值为正则表达式，反向生成匹配规则的字符串
 	// 'regexp1':/^a\d{3,5}/
});
```

#### Mock.setup(settings)：

配置拦截 Ajax 请求时的行为。支持的配置项有：`timeout`。例：

```js
Mock.setup({
    timeout: 400	//指定被拦截的Ajax请求的响应时间
})
```

下一阶段的问题是Mockjs的启动问题