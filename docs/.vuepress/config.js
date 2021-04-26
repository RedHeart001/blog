module.exports = {
    title: '前端学习日志',  // 设置网站标题
  	description : 'my study log',
  	base : '/web-notes/',
  	themeConfig : {
    	sidebarDepth: 4, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated' ,// 文档更新时间：每个文件git最后提交的时间,
        // 顶部导航栏
        nav:[
             // 单项 text：显示文字，link：指向链接
             // 这里的'/' 指的是 docs文件夹路径
             // [以 '/' 结尾的默认指向该路径下README.md文件]
            { text: 'CSS', link: '/CSS/' },
            { text: 'JavaScript', link: '/JavaScript/' },
            { text: 'Vue', link: '/Vue/动态组件/' },
            { text: 'webpack', link: '/webpack/webpack基础配置' },
            { text: 'React', link: '/React/' },
            { text: 'MongoDB', link: '/MongoDB/MongoDB初识' },
            { text: 'Nodejs', link: '/Nodejs/Nginx' },
            { text: 'Openlayer', link: '/Openlayer/OpenLayer' }
        ],
	    sidebar:{
	     	'/CSS/':[
	     		['/CSS/盒模型/','盒模型'],
	     		['/CSS/BFC和IFC/','BFC和IFC']
	     	],
	        '/JavaScript/':[
	        	{
	        		title:'JavaScript数据类型',
	        		children:[
			        	['/JavaScript/JavaScript数据类型/JavaScript基础类型','JavaScript基础类型'],
			        	['/JavaScript/JavaScript数据类型/JavaScript引用类型','JavaScript引用类型'],
			        	['/JavaScript/JavaScript数据类型/遍历数组方式','遍历数组方式'],			
			        	['/JavaScript/JavaScript数据类型/javaScript对象的property理解','javaScript对象的property理解'],
	        			['/JavaScript/JavaScript数据类型/Iterator（遍历器）','Iterator遍历器']
	        		]
	        	},
	        	{
	        		title:'作用域和闭包',
	        		children:[
			        	['/JavaScript/作用域和闭包/js中的作用域和执行环境','js中的作用域和执行环境'],
			        	['/JavaScript/作用域和闭包/闭包初识','闭包初识']
	        		]
	        	},
	        	{
	        		title:'Ajax跨域',
	        		children:[
			        	['/JavaScript/异步操作/跨域问题','跨域问题'],
			        	['/JavaScript/异步操作/异步问题','异步问题'],
	        		]
	        	},
	        	{
	        		title:'每日习题',
	        		children:[
			        	['/JavaScript/每日习题/2020-8-29','2020-8-29'],
			        	['/JavaScript/每日习题/2020-8-31','2020-8-31'],
	        		]
	        	},
	        	['/JavaScript/new操作符和原型链','new操作符和原型链'],
	        	['/JavaScript/对象创建和继承','对象创建和继承'],
	        	['/JavaScript/URLSearchParams','查询条件封装对象URLSearchParams'],
	        	['/JavaScript/BOM相关','BOM相关'],
	        	['/JavaScript/DOM','DOM'],
	        	['/JavaScript/ES6','ES6'],
	        	['/JavaScript/函数中按值传递的理解','函数中按值传递的理解'],
	        	['/JavaScript/javaScript中的Event Loop机制','javaScript中的Event Loop机制'],
	        	['/JavaScript/MockJs','MockJs'],
	        	['/JavaScript/js使用技巧','js使用技巧'],
	        	['/JavaScript/拖拽API','拖拽API'],
	        ],
	        '/Vue/':[
	            {
	                title: 'vue-api',
	                children: [
	                    ['/Vue/Api/Vue的DOM选项','Vue的DOM选项'],
	                    ['/Vue/Api/Vue的数据选项','Vue的数据选项'],
	                    ['/Vue/Api/Vue的全局指令','Vue的全局指令'],
	                ]
	            },
	            {
	            	title:'路由Router',
	            	children:[
	            		['/Vue/路由Router/普通示例','普通示例'],
	            		['/Vue/路由Router/动态路由','动态路由'],
	            		['/Vue/路由Router/嵌套路由','嵌套路由'],	
	            		['/Vue/路由Router/命名视图','命名视图'],
	            		['/Vue/路由Router/重定向与别名','重定向与别名'],
	            		['/Vue/路由Router/路由对象Router','路由对象Router'],
	            		['/Vue/路由Router/路由传参','路由传参'],
	            		['/Vue/路由Router/导航守卫','导航守卫'],
	            		['/Vue/路由Router/过渡动效','过渡动效']
	            	]
	            },
	            //多级菜单形式
	            ['/Vue/动态组件/','Component & keep-alive'],
	            ['/Vue/组件渲染/','transition & transition-group'],
	            ['/Vue/插槽组件/','插槽组件slot'],
	            ['/Vue/事件监听/','事件监听'],
	            ['/Vue/emitter广播方法','emitter广播方法'],
	            ['/Vue/上下钻组件搜索','上下钻组件搜索'],
	            ['/Vue/应用场景','应用场景'],
	        ],
	        '/webpack/':[
	        	['/webpack/webpack基础配置','webpack基础配置'],
	        	['/webpack/webpack配置项详尽解析','webpack配置项详尽解析'],
	        	['/webpack/webpack优化配置','webpack优化配置'],
	        	['/webpack/webpack生产环境配置','webpack生产环境配置']
	        ],
	        '/React/':[
	        	['/React/React-router','React-router'],
	        	['/React/dva初识','dva初识'],
	        	['/React/React-01','React-01'],
	        	['/React/redux','redux'],	
	        	['/React/React数据流动方式','React数据流动方式'],	
	        	['/React/React生命周期（以React15和React16对比）','React生命周期理解'],	
	        ],
	        '/MongoDB/':[
	        	['/MongoDB/MongoDB初识','MongoDB初识']
	        ],
	        '/Nodejs/':[
	        	['/Nodejs/Nginx','Nginx']
	        ],
	        '/Openlayer/':[
	        	['/Openlayer/OpenLayer','OpenLayer'],	
	        	['/Openlayer/canvasTile（切片坐标纠错）','canvasTile（切片坐标纠错）'],
	        	['/Openlayer/Cluster（source，聚集矢量对象）','Cluster（source，聚集矢量对象）'],
	        	['/Openlayer/Control地图控件','Control地图控件'],
	        	['/Openlayer/Select（选中矢量图层，高亮）','Select（选中矢量图层，高亮）'],	
	        	['/Openlayer/Style渲染','Style渲染'],	
	        	['/Openlayer/必应地图（BingMap）展示','必应地图（BingMap）展示'],	
	        	['/Openlayer/动画特效（以添加矢量图层为例）','动画特效（以添加矢量图层为例）'],
	        	['/Openlayer/自定义触发时间（interaction）','自定义触发时间（interaction）'],	
	        ]
	    }
    }
}