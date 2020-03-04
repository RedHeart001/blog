## webpack基础配置

#### 以development环境为例

```js
/*
	webpack.config.js：配置文件
*/
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",		//入口文件
  output: {		//输出文件路径
    filename: "built.js",
    path: resolve(__dirname, "build")
  },
  module: {		//module模块主要是针对各种文件的兼容方式
    rules: [
      {
        test: /\.css$/,
        // 前者创建style标签，后者把css整合到js中
        //当使用多个loader时应使用use选项，否则如下即可
        //loader:'css-loader'
        //options:{
        	//各种loader的配置项
        //}
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|gif)$/,
        //处理图片loader
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          // url-loader用es6解析，但html本身引入图片是commonjs
          name: "[hash:10].[ext]",
          esModule: false
        }
      },
      {
        test: /\.html$/,
        //处理html中文件的图片
        loader: "html-loader"
      },
      {
        //排除html，js，css资源
        exclude: /\.(html|js|css|jpg|gif|png)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [	//插件主要作为各种文件的处理方式
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development",
  //开发服务器devServer，自动化（自动编译，自动打开浏览器，自动刷新浏览器
  //内存中打包，不会输出
  //启动指令为：webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, "build"),
    //启动gizp压缩
    compress: true,
    port: 3000,
    //自动打开默认浏览器
    open: true
  }
};

```

