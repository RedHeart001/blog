# Component与keep-alive

### Component:

​	内置组件component可通过改变is属性来改变渲染的组件，is的值可以是组件的id，也可以是已经注册的组件。例：

##### demo1.vue：

```html
<script>
export default {
  name: "demo1",
  render: h => {
    return h("p", "i am demo1");
  }
};
</script>
```

##### demo2.vue：

```html
<script>
export default {
  name: "demo2",
  render: h => {
    return h("p", "i am demo2");
  }
};
</script>
```

##### componentDemo.vue：

```vue
<template>
  <div>
    <component :is="currentComponent" />
      或
    <component :is="$options.components.child" />
      <!-- 点击更改组件 -->
    <button @click="Toggle">click and Toggle!</button>
  </div>
</template>
<script>
import demo1 from "./demo1";
import demo2 from "./demo2";
export default {
  name: "componentDemo",
  components: {
    demo1,
    demo2
  },
  data: function() {
    return {
      currentComponent: "demo1"
    };
  },
  methods: {
    Toggle: function() {
      this.currentComponent =
        this.currentComponent === "demo1" ? "demo2" : "demo1";
    }
  }
};
</script>
```



### keep-alive:

​	本身并不渲染元素，但在组件切换时不会销毁组件，而是会缓存keep-alive下组件的状态。当keep-alive下的组件切换时，会触发组件的**actived和deactived钩子函数**。

​	props：

​		include（String/Reg）：只有名称匹配者会被缓存；

​		exclude（String/Reg）：名称匹配者不会缓存；

​		max（number）：能可缓存的最大数目