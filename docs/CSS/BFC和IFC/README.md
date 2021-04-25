## 什么是FC？

​	FC全程Formatting Context（格式化上下文），通俗点说就是页面里有一块区域，这块区域有自己的渲染规则，规则决定了这块区域的子元素的是如何排布呈现。CSS2.1中只有BFC和IFC，CSS3新增GFC和FFC。

## BFC（块级格式化上下文）

BFC触发条件（如何成为BFC）：

1. 根元素是body；
2. 绝对定位元素：position的值为absolute或fixed；
3. 浮动元素：float属性指定none以外的任何值；
4. overflow的值不为visible（auto，scroll，hidden任意一个）；
5. display的值为table-cell，table-caption，flex，inline-block；

BFC中的规则（子元素排布规则，这里只针对正常流）：

1. BFC中的子元素会在垂直方向上依次放置；
2. BFC中的两个相邻的块级元素上下margin会发生重叠（即外边距重叠问题，只要在这两个块级元素中的任意一个外套一个块级元素即可，你也可以选择把其中一个变成BFC）；
3. 计算BFC的高度时，浮动元素也会参与计算；
4. BFC中，每个子元素的左边与BFC的左边接触，即便是浮动元素也一样；
5. BFC区域不会与float重叠（事实上，之所以有重叠现象也是因为第4条规则作用）；

## IFC（内联格式化上下文）

#### line-box：

​	内部的元素从包含块的顶部开始，从左至右(默认)排列成一行形成的一个矩形盒子叫做line box，就像这样子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<p>
		text1
		<span>text2</span>
		text3
		<span>text4</span>
		text5
	</p>
    <!-- p内部形成一个由多个行内块构成的区域，那就是line-box -->
</body>
</html>
```

#### line-box特性：

1. line-box的宽度由浮动情况和它的包含块决定；
2.  line-box的高度由line-height的计算结果决定；
3. line-box从左至右排列成一行形成一个line box。如果不能一行排列，可能会生成多个垂直叠加的line-box。Line-boxs被叠加没；
4. 有垂直方向上的分离(特殊情况除外)，并且他们也不重叠。 通常line-box的左边缘挨着包含块的左边缘，右边缘挨着包含快的右边缘；
5.  当在一行中行内级盒子的总宽度比包含他们的line-box的宽度小，他们的在line-box中的水平放置位置由'text-align'属性决定；
6.  当一个行内盒子超过了line-box的宽度，则它被分割成几个盒子并且这些盒子被分配成几个横穿过的line-boxs。如果一个行内盒子不能被分割。则行内盒子溢出line-box。

#### IFC

​	IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)

​	IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同。 IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。

## GFC（网格布局格式化上下文）

​	当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。

​	那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

## FFC（自适应格式化上下文）

​	个人理解就是弹性盒子