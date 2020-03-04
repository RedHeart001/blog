module.exports = {
    title: '前端学习日志',  // 设置网站标题
  	description : 'my study log',
  	base : '/',
  	themeConfig : {
    	sidebarDepth: 4, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated' ,// 文档更新时间：每个文件git最后提交的时间,
        // 顶部导航栏
        nav:[
             // 单项 text：显示文字，link：指向链接
             // 这里的'/' 指的是 docs文件夹路径
             // [以 '/' 结尾的默认指向该路径下README.md文件]
            { text: 'Vue', link: '/Vue/动态组件/' },  // http://localhost:8080/Wiki1001Pro/FAQ/
            { text: 'JavaScript', link: '/JavaScript/javaScript对象的property理解' },
            { text: 'webpack', link: '/webpack/webpack基础配置/' },
            { text: 'CSS', link: '/CSS/' },
        ],
	    sidebar:{
	        '/Vue/':[
	            //多级菜单形式
	            ['/Vue/动态组件/','Component & keep-alive'],
	            ['/Vue/组件渲染/','transition & transition-group'],
	            ['/Vue/插槽组件/','插槽组件slot'],
	            ['/Vue/事件监听/','事件监听'],
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
	            }
	        ],
	        '/JavaScript/':[
	        	['/JavaScript/javaScript对象的property理解','javaScript对象的property理解'],
	        	['/JavaScript/javaScript中的Event Loop机制','javaScript中的Event Loop机制'],
	        	['/JavaScript/MockJs','MockJs'],
	        	['/JavaScript/遍历数组方式','遍历数组方式'],
	        	['/JavaScript/跨域问题','跨域问题'],
	        	['/JavaScript/判断数据类型','判断数据类型'],
	        	['/JavaScript/异步问题','异步问题']
	        ],
	        '/webpack/':[
	        	['/webpack/webpack基础配置','webpack基础配置'],
	        	['/webpack/webpack配置项详尽解析','webpack配置项详尽解析'],
	        	['/webpack/webpack优化配置','webpack优化配置'],
	        	['/webpack/webpack生产环境配置','webpack生产环境配置']
	        ]
	    }
    }
}