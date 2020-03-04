## webpack优化配置：

#### 开发环境优化：

##### 	1.优化打包构建速度（HMR，热模块更新）

​		不设置HMR的情况下，每次修改某一模块都会使**所有的模块重新打包**，因此在**devServer**中加入**hot:true**的设置，从而使**一个模块变化时，只有这一个模块会重新打包**

​		**然而，HMR只针对css文件，js和html文件默认不能使用**

​		不过HTML文件只有一个，不需要HMR优化，只要把文件加入entry中即可自动更新；

​		js文件可以通过**监听/回调**的方式实现HMR，如：

```js
if (module.hot) {
  // module.hot为true则说明开启HMR功能
  module.hot.accept('./print.js', () => {
    // 方法监听print.js文件的变化，会调用回调函数
    console.log('print is update!');
  });
}
```

​	**不过要注意的是js文件实现热更新只能针对入口文件index.js以外的文件，否则相当于白设置**；

​	ps：development下完全可用，production下有蜜汁问题，只能更新js文件无法更新css文件

​				**production环境下HMR无意义，因为生产环境不需要调试**

##### 	2.代码调试优化（source-map）

​		提供源代码到构建后代码的映射技术（如果构建后代码出错，通过映射关系可以找到源代码中的错误）

```js
devtool: "source-map"	//直接在webpack.config.js中加入该配置项即可，最终生成一个.map文件
```

​	source-map会提示代码错误的**准确信息和错误位置**

​	**source-map配置：**	

​		1.inline-source-map：内联映射，只生成一个内联source-map，**调试第二快**

​		2.hidden-source-map：外部映射，报错时**会提示错误原因，不会提示错误位置，无法追踪到源代码错误，只能提示到构建后文件代码位置，防止源代码泄露**

​		3.eval-source-map：内联映射，每一个文件都会生成对应的source-map，都在eval函数中，**调试最快**

​		4.nosources-source-map：外部，报错时**会提示准确信息，但没有源代码信息 ，防止源代码泄露**

​		5.cheap-source-map：外部，报错**只能精确到行**

​		6.cheap-module-source-map：外部，会将loader的source-map加入

**内联和外部区别**：1.外部会生成文件，内联不会

​								2.内联构建速度更快，但体积很大；



开发环境：速度快（eval > inline > cheap），调试友好（source-map > cheap-module > cheap）

​	--> eval-source-map（精确到行和列）/eval-cheap-module-source-map（精确到行）



生产环境：源代码是否隐藏？调试是否更友好?

​	-->source-map / cheap-module-source-map



#### 生产环境优化：

##### 	1.优化打包速度(oneOf，避免重复处理loader)

```js
{
	oneOf:[
		//module配置
	]
}
```

​	**注意module配置中针对一个文件只能有一种配置，两种配置会有一个检测不到，**

​		应对方法：只需要把一个配置提取出来，放在oneOf之前即可

##### 	2.优化代码运行性能

​		**缓存：**

​			1.babel缓存：

​				由于js代码的数量巨大，所以当一个js文件更新后别的文件也不得不更新。为了解决这种问题，引入了babel的缓存机制。

```js
cacheDirectory:true	//在babel-loader的options中添加该项即可
```

​				缓存开启后，第二次构建时会读取缓存，对未改变js文件的会直接使用缓存中已兼容的代码，从而提升速度；

​			2.文件资源缓存：

​				搭建server服务器，并用static方法抛出要缓存的文件资源。由于server存在强制缓存机制，不会自动更新，所以要给文件名使用hash值的方式定义以便更新缓存。

server.js:

```js
const express = require("express");

const app = express();

app.use(express.static("build", { maxAge: 1000 * 3600 }));	//强制缓存设置

app.listen(3000, () => {
  // eslint-disable-next-line
  console.log("port 3000 is listened!");
});
```

webpack.config.js:

```js
output:{
	filename:'js/built.[hash:10].js',
	path:resolve(_dirname,"build")
}
```

问题：js和css同时使用一个hash值，改动一个文件就会导致重新打包，从而使所有缓存失效

**针对这个问题，引入chunkhash**

​		chunkhash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值一样。

​		然而此处css是被js引入的，同属于一个chunk，因此不能使用

**最终解决方案：contenthash（根据文件内容生成hash，不同文件hash一定不同）**

​	



#### tree shaking：

​	自动去除无用代码（**使用前提：es6模块化，production环境**）

```js
//	test.js
export function add(x,y){
	return x+y;
}
export function mul(a,b){
	return a+b;
}
//如果mul未被引用的文件使用，则mul方法不会被打包
```

作用：减小代码体积

ps：tree shaking可能会删除一些代码，如css、@babel/polyfill

​	可以在package.json中配置"sideEffects":[“*.css”,"*.less"]来规避删除这些文件



#### code split:

​	将打包的文件分割成多个文件，一方面并行加载可以提升速度，另一方面也实现了按需加载

**方式一：**

```js
{
	// 多入口写法，一个入口一个bundle
	entry:{
		main:'./src/js/index.js',
		test:'./src/js/test.js'
	},
	output:{
		// name即入口名称
		filename:'js/[name].[contenthash].js',
		path:resolve(__dirname,'build')
	}
}
```

**方式二：**

```js
// webpack.config.js中加入配置项
optimization:{
	splitChunks:{	// 此处使用插件SplitChunksPlugin，该插件在webpack4是无需下载的，此前使用的插件是CommonsChunkplugin
		chunks:'all'
	}
}
// 在此配置下，被引入的node_modules中的第三方库会单独打包成一个chunk最终输出
// 多入口应用下，会自动分析多入口chunk中是否有公共文件，如果有会自动打包成单独的chunk
```

**方式三：**

```js
// 单入口下，我们可以通过js代码让某个文件单独打包成一个chunk
// import动态导入语法，将某个文件单独打包
//这里有大坑！大坑！eslint的配置项有剧毒，要注意
import(/*webpackChunkName:'test'*/'./test') // 设置webpackChunkName以确定导出文件的名字
	.then((result) => {
		//文件加载成功
	})
	.catch(() => {
		//加载失败
	})
```



#### 懒加载：

​	也可以理解为一种按需加载策略，即所谓的“需要时引入”。例：

```js
//index.js
console.log("index is on!");
document.getElementById("btn").onclick = function() {
    //预加载：webpackPrefetch
  import(/*webpackChunkName:'test'*/ ,webpackPrefetch:true"./test").then(({ mul }) => {
    console.log(mul(3, 4));
  });
};
```

```js
//test.js
export function mul(x, y) {
  return x * y;
}
```

通常的脚本引入都是并行加载（同时加载所有），懒加载是按需引入，预加载是在所有的文件加载好以后再偷偷加载



#### PWA（渐进式网络开发应用程序，离线可访问）:

​	引入插件：workbox --》 workbox-webpack-plugin

```js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// webpack.config.js
plugins:[
    ...
	new WorkboxWebpackPlugin.GenerateSW({
      /*
        1.帮助serviceWorker快速启动；
        2.删除旧的serviceWorker
        生成一个serviceWorker文件
      */
      clientsClaim: true,
      skipWaiting: true
    })
]
```

```js
//index.js
// 注册ServiceWorker
// 处理兼容问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('serviceWorker is registered!');
      })
      .catch(() => {
        console.log('serviceWorker is not registered!');
      });
  });
}
```

此时需要安装serve，以server的形式启动打包好的build，完成后如下：

![image-20200226141046678](C:\Users\29315\AppData\Roaming\Typora\typora-user-images\image-20200226141046678.png)

此时在offline的情况下仍可加载出结果。

ps：由于eslint不认识window，所以package.json中的eslintConfig配置需要加入名为“env”的配置项：

```json
"eslintConfig": {
    "extends": "airbnb-base",
    //可识别浏览器中的对象
    "env": {
      "browser": true
    }
  }
```





#### 多线程打包

​	对于打包时间较长的模块（module），我们可以通过设置thread-loader来开启多线程打包，从而规避js单线程引擎的不足

```js
{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          //开启多进程打包
          //进程启动大概为600ms，进程通信也有消耗
          //只有工作消耗的时间比较长的时候才需要多进程打包
          {
            loader: "thread-loader",
            options: {
              workers:2 //进程2个
            }
          },
          ...
        ]
}
```

**不过thread-loader本身也比较消耗资源，如果打包的规模并不巨大，引入反而消耗资源**



#### externals：

​	防止将某些包输出到最终的bundle中，配置如下：

```js
externals: {
    //忽略库名--忽略包名，最终阻止jquery打包
    jquery: "JQuery"
  }
```

但要注意，我们必须在index页面中引入jquery的cdn链接，否则无法使用



#### dll：

​	对某些功能进行统一打包，形成一个文件（按需打包）。

​	**此处需要引入一个webpack.dll.js文件作为单独引包的依据：**

```js
// webpack.dll.js
/*
  使用dll技术，对某些库（第三方库：jquery，react。。。）进行单独打包
*/
const { resolve } = require("path");

const webpack = require("webpack");
module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库jquery
    jquery: ["jquery"]
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dll"),
    library: "[name]_[hash]" //打包的库向外暴露出去的内容叫什么名字
  },
  plugins: [
    //创建一个mainfest.json，提供一个jquery映射
    new webpack.DllPlugin({
      name: "[name]_[hash]", //映射库的暴露的内容名称
      path: resolve(__dirname, "dll/mainfest.json") //输出文件路径
    })
  ],
  mode: "production"
};

//webpack指令默认运行webpack.config.js文件
//webpack --config webpack.dll.js：运行本文件
```

```js
//webpack.coonfig.js

const webpack = require("webpack");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");


module.exports = {
	...
	plugins:[
		//读取mainfest映射文件，webpack会知道哪些库不参与打包，同时使用名称也变化
        new webpack.DllReferencePlugin({
          manifest: resolve(__dirname, "dll/mainfest.json")
        }),
        //将某个文件打包输出，并在html中引入资源
        new AddAssetHtmlWebpackPlugin({
          filepath: resolve(__dirname, "dll/jquery.js")
        })
	]
}
```

必须先运行**webpack --config webpack.dll.js**来单独封装第三方文件，然后在webpack.config.js中读取映射文件，决定打包过滤名单。最后再通过**add-asset-html-webpack-plugin**插件把第三方文件引入index.html