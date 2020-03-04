Vue的DOM选项：

​	**el**：

​		指定一个页面上已经存在的dom元素作为Vue实例的挂载目标。可以是css选择器，也可以是一个HTMLElement实例。挂在后可以用vm.$el访问。

​		如果实例创建时有这个选项则进入编译过程，否则需显式调用vm.$mount()手动编译

​	**template**：

​			组件内容模板，里面的内容会被渲染到页面中

​	**render**：

​			字符串模板的替代方案（例如：template;'<div>hello world</div>'），以js编程的形式创建页面。且如果组件中有render，则Vue构造函数不会从template或el指定的挂载元素中提取出的HTML模板编译渲染函数，而是**先采用render函数的返回结果进行渲染**

​			**渲染函数creatElement**（也称h）返回的是一个虚拟节点

​			例：

​			

```javascript
<script>
export default {
  name: "renderDemo",
  el: "#app2",
  template: `<div>i am a template</div>`,
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  data: function() {
    return {
      msg: "message"
    };
  },
  render: function(creatElement) {
  	//此处的creatElement也已写成h
    return creatElement("div", {}, [
      "先写一些文字",
      creatElement("h1", "一则头条"),
      creatElement("h3", "third title!")
    ]);
  }
};
</script>
```

​	**renderError**：

​			当render函数渲染出错时，提供另一种渲染输出。其错误将作为renderError的参数传入。