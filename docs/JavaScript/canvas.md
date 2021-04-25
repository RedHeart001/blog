### Canvas

​	canvas本质可以看成是一块画布，可以通过各种已经制定好的api“绘图”

### 2d：

#### 获取上下文

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <canvas id="drawing" width="1000" height="500">drawing of something</canvas>
  </body>
  <script>
    (function () {
      let od = document.getElementById("drawing");
      // canvas标签的上下文对象
      let ctx = od.getContext("2d");
    })();
  </script>
</html>

```

#### 描边、填色

```js
ctx.strokeStyle = "#000"; // canvas描边
ctx.fillStyle = 'red';	// canvas填色
```

#### 绘制矩形

```js
//	绘制矩形（描边）
ctx.strokeStyle = 'red';	//描边颜色
ctx.lineWidth = '5';	//描边宽度
ctx.lineCap = 'butt';	//描边线条末端的形状，有平头（butt），圆头（round），方头（square）
ctx.lineJoin = 'round';	//描边线条相交方式，有圆交（round），斜交（bevel），斜接（miter）
ctx.strokeRect(10, 10, 100, 100);	//绘制矩形（描边），四个参数依次代表矩形的x坐标，y坐标，宽度，高度

// 绘制矩形（填色）
ctx.fillStyle = 'red';	//描边颜色
ctx.fillRect(10, 10, 100, 100);	//绘制矩形（填色），四个参数依次代表矩形的x坐标，y坐标，宽度，高度

ctx.clearRect(40, 40, 30, 30);	//清除矩形（在画布上清楚一个矩形区域），参数同上
```

#### 绘制路径

```js
ctx.beginPath(); //绘制路径必须先调用该api
ctx.arc(100, 100, 50, Math.PI / 12, Math.PI / 2, false); // 以x，y坐标为圆心绘制指定弧度的弧线，参数依次为圆心坐标，半径，起终弧度，是否逆时针
ctx.moveTo(10, 10); //光标移动到指定点
ctx.lineTo(40, 40); //从上一点开始画线，连接到指定坐标点
ctx.lineTo(35, 45);
ctx.lineTo(30, 50);
ctx.rect(200, 200, 50, 50); // 绘制一个矩形路径，参数依次为起始点x坐标，起始点y坐标，矩形宽高
ctx.closePath(); //使绘制的线条终点连接起点
ctx.strokeStyle = "blue"; //描边样式
ctx.lineWidth = "6"; //描边宽度
ctx.stroke(); //路径描边
ctx.fillStyle = "red";
ctx.fill(); //路径填充颜色
```

#### 绘制文本

```js
ctx.font = "bold 24px Arial"; //文本样式，依次为样式，大小以及字体
ctx.textAlign = "center"; //文本对齐方式，通常设置为center，start，end
ctx.textBaseline = "middle"; //文本基线，middle，top，bottom
ctx.fillText("hello", 100, 20); //填色绘制文本（实心文本）
ctx.strokeText("hello", 100, 20); //描边绘制文本（空心）
```

#### 图形变换

```js
ctx.translate(50, 50);	// 画布默认原点为（0，0），translate把原点移动到（50，50），之后任何操作都以（50，50）为核心
ctx.rotate(Math.PI / 4);	// 图形围绕原点，旋转pi/4个弧度
ctx.scale(3, 2);	//图形再x，y轴上各自缩放指定倍数
//根据执行命令的顺序先后，canvas最后渲染出的图形也不同
//transform可以修改变换矩阵，一个api可以同时实现旋转，缩放，平移三个操作，但过于复杂，以后有缘再看
```

#### 跟踪上下文变化状态

```js
// canvas以栈结构保存2d上下文的操作，核心方法有：save（保存），restore（回退）
ctx.fillStyle = "red";
ctx.save();	// 保存填色为red

ctx.strokeStyle = "yellow";
ctx.save();	// 保存描边为yellow

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 100, 100);	// 渲染蓝色矩形

ctx.restore();	// 状态回退，渲染黄色描边矩形
ctx.strokeRect(50, 50, 100, 100);

ctx.restore();	// 状态回退，渲染红色填色矩形
ctx.fillRect(100, 100, 100, 100);
```

#### 绘制图像

```js
// 获取图片模板对象
let oi = document.images[0];
// 在画布上绘制图片，第一个参数是图片模板（一个HTML对象），接下的参数依次代表x，y轴坐标，绘制图片的宽高
ctx.drawImage(oi, 0, 0, 200, 100);
// 在画布上绘制图片，第一个参数是图片模板，之后的四个参数依次代表源图片的x，y坐标，源图片的宽高，之后的四个参数代表最终绘制的图片的x，y坐标和宽高
// 源图片从模板图片上切取，最终绘制的图片由源图片编辑而成
ctx.drawImage(oi, 0, 0, 250, 316, 0, 0, 200, 200);
// 生成一个图片展示的URI
console.log(od.toDataURL("image/png"));
```

#### 绘制阴影

```js
ctx.shadowOffsetX = 5; // 绘制图形或路径的阴影在x轴上的偏移量
ctx.shadowOffsetY = 5; // 绘制图形或路径的阴影在y轴上的偏移量
ctx.shadowBlur = 4; //  阴影的模糊程度
ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // 阴影的颜色
ctx.fillStyle = "red";
ctx.fillRect(30, 30, 50, 50); // 此时绘制的红色矩形会产生一个阴影
ctx.strokeStyle = "blue";
ctx.strokeRect(70, 70, 50, 50); //  蓝色矩形路径产生一个阴影

ctx.beginPath();
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 4; 
ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; 
ctx.moveTo(0, 0);
ctx.lineTo(120, 120);
ctx.stroke(); //路径描边，产生一个在x轴上偏移量为10的阴影
```

#### 渐变

```js
// 创建一个指定线性渐变区间的对象，此处指定画布从（30，30）开始渐变，到（70，70）结束渐变（注意坐标不要超过，否则无法显示完整的渐变色效果）
let linearGradient = ctx.createLinearGradient(0, 0, 70, 70);
linearGradient.addColorStop(0, "white"); // 起始色标，第一个参数为0~1之间的任意数，第二个参数为颜色
linearGradient.addColorStop(0.35, "red"); // 中间色标
linearGradient.addColorStop(0.7, "blue"); // 中间色标
linearGradient.addColorStop(1, "black"); //终点色标
ctx.fillStyle = linearGradient; //  填充样式指定为渐变
ctx.fillRect(0, 0, 100, 100); // 填色

// 创建一个放射渐变区间对象，前三个参数代表起始圆的圆心坐标和半径，后三个参数代表终点圆的圆心坐标和半径
let radialGradient = ctx.createRadialGradient(50, 150, 25, 50, 150, 50);
radialGradient.addColorStop(0, "white"); // 起始色标，第一个参数为0~1之间的任意数，第二个参数为颜色
radialGradient.addColorStop(0.35, "red"); // 中间色标
radialGradient.addColorStop(0.7, "blue"); // 中间色标
radialGradient.addColorStop(1, "black"); //终点色标
ctx.fillStyle = radialGradient; //  填充样式指定为渐变
ctx.fillRect(0, 100, 100, 100); // 填色
```

#### 图片数据

```js
let od = document.getElementById("drawing");
    let ctx = od.getContext("2d"); // 获取canvas上下文
    let oi = document.images[0],
      imageData,
      data,
      i,
      len,
      average,
      red,
      green,
      blue,
      alpha;

ctx.drawImage(oi, 0, 0); //  绘制源图片
imageData = ctx.getImageData(0, 0, oi.width, oi.height);
// getImageData获取源图片信息，具体包括源图片的宽高和像素数据，像素数据是一个数组，四个元素代表表一个像素，四个元素依次代表红，绿，蓝，透明度
data = imageData.data; //获取源图片像素数组
    // 循环遍历像素数组，图片置灰
    for (i = 0, len = data.length; i < len; i += 4) {
      red = data[i];
      green = data[i + 1];
      blue = data[i + 2];
      alpha = data[i + 3];

      average = Math.floor((red + green + blue) / 3);
      data[i] = average;
      data[i + 1] = average;
      data[i + 2] = average;
      alpha = 0.8;
    }
ctx.putImageData(imageData, 100, 100); // 把更新后的图像数据绘制到画布上
```

#### 合成

```js
//全局透明度控制（globalAlpha）
ctx.globalAlpha = 0.5; // 设置全局透明度为0.5
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 100, 100); // 透明度为0.5的红色矩形

ctx.globalAlpha = 0.75; // 设置全局透明度为0.75
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 100, 100); // 透明度为0.75的红色矩形

//绘制红色矩形
ctx.fillStyle = "#ff0000";
ctx.fillRect(10, 10, 50, 50);
//设置合成操作（控制后绘制图像和先绘制图像的结合方式，globalCompositeOperation）
//source下，后绘制的图像在上层
ctx.globalCompositeOperation = "source-over"; // 默认值，后绘制的图像默认在先绘制的图像的上方
ctx.globalCompositeOperation = "source-in"; // 只显示重叠部分（后绘制的图像在上），其余完全透明
ctx.globalCompositeOperation = "source-out"; // 只显示后绘制图像未重叠的部分，其余全部透明
ctx.globalCompositeOperation = "source-atop"; // 后绘制的图像与先绘制的图像的重叠部分可见（前者在上），先绘制图像不受影响

//destination下，先绘制的图像在上层
ctx.globalCompositeOperation = "destination-over"; // 后绘制的图像位于先绘制的图像的下方
ctx.globalCompositeOperation = "destination-in"; // 只显示重叠部分（后绘制的图像在下），其余完全透明
ctx.globalCompositeOperation = "destination-out"; // 只显示先绘制图像未重叠的部分，其余全部透明
ctx.globalCompositeOperation = "destination-atop"; // 后绘制的图像与先绘制的图像的重叠部分可见（后者在上），后绘制图像不受影响
//绘制蓝色矩形
ctx.fillStyle = "rgba(0,0,255,1)";
ctx.fillRect(30, 30, 50, 50);
```

### 3d（WebGL）



