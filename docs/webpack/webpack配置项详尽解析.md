## 配置项解析

1. #### entry

   ```js
   /*
      *entry：入口起点
      *  1.String  =>  './src/index.html'
      *    单入口，将所有文件打包成一个chunk，最终输出一个bundle文件
      *    此时chunk名称默认为main
      *  2.array   =>  ["./src/index.js", "./src/add.js"]
      *    多入口，所有入口文件最终只会打包成一个chunk，最终输出一个bundle文件
      *    也就是说，index.js以外的js文件会打包进index文件中
      *      --在HMR中让html文件热更新生效
      *  3.object  =>  "{index: "./src/index.js",add: "./src/add.js"}"
      *    多入口，几个入口文件打包几个chunk，最终输出几个bundle文件
      *    对象中采取键值对（key：value）存储形式，输出的chunk名即为key
      *
      *  -----特殊情况：dll
      *    entry:{
      *      多文件打包成一个chunk，最终输出一个bundle文件
      *      react:['react','react-router','redux',...],
      *      jquery:'jquery'
      *    }
      */
   ```

2. #### output

   ```js
    output: {
       //文件名称（目录+指定文件名称）
       filename: "js/[name].js",
       //输出文件目录（将来所有资源输出的公共目录）
       path: resolve(__dirname, "build"),
       //所有资源引入公共路径前缀，例如：public.js => /public.js
       // publicPath: "/",
       //非入口chunk名称 =>通过import方式引入的文件或optimization（存疑）
       //非入口文件的chunk都是数字，从0开始计
       chunkFilename: "js/[name]_chunk.js",
       library: "[name]", //整个库向外暴露的名称，可在打包完成后的main.js首行看到
       libraryTarget: "window" //变量添加到哪个平台上，此处自动暴露给window
     },
   ```

3. #### devServer

   ```js
   //开发环境专用，调试代码
     devServer: {
       //运行代码的目录
       contentBase: resolve(__dirname, "build"),
       //监视contentBase指定的目录，一旦变化则reload重载
       watchContentBase: true,
       //监视文件
       watchOptions: {
         //忽略文件
         ignored: /node_modules/
       },
       //启动gzip压缩
       compress: true,
       //指定监听端口号
       port: 7000,
       //指定域名
       host: "localhost",
       open: true,
       //开启HMR
       hot: true,
       //不要显示启动服务器的日志
       clientLogLevel: "none",
       //除基本启动信息以外，其他不打印
       quiet: true,
       //如果出错不要全屏提示
       overlay: false,
       //服务器代理解决跨域问题
       proxy: {
         //一旦devserver服务器(7000)接收到/api/xxx的请求，就会把请求转发到另外的服务器(3000)
         "/api"{
           target:"http://loaclhost:3000",
           //发送请求时，请求路径重写：将/api/xxx --> /xxx（去掉api）
          	pathRewrite: {
            	"^/api": ""
          	}    
         } 
       }
     }
   ```

4. #### optimization

   ```js
   optimization: {
       //提取公共代码成单独chunk
       splitChunks: {
         chunks: "all"
       },
       //将当前模块的记录其他模板的hash单独打包成一个文件runtime
       //只有runtime文件和手动更改的文件会变化，剩下的文件会保持不变（持久延长）
       //解决提取公共代码修改时别的文件缓存失效的问题
       runtimeChunk: {
         name: entrypoint => `runtime-${entrypoint.name}`
       },
       minimizer: [
         //生产环境压缩方案解决：主要是css和js,需要引入terster-webpack-plugin
         new TerserWebpackPlugin({
           //开启缓存
           cache: true,
           //多进程打包
           parallel: true,
           //启动source-map
           sourceMap: true
         })
       ]
     }
   ```

5. #### resolve

   ```js
   //解析模块规则
     resolve: {
       //配置解析模块路径别名,可以理解为给路径上别名
       alias: {
         //如此处'./src/css'路径别名为$css
         $css: resolve(__dirname, "src/css")
         //配置省略文件路径的后缀名
         extensions: [".js", ".css", ".json"],
         //解析模块时搜寻的目录
         modules: "node_modules"
       }
     },
   ```

   