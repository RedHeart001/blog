## 事件监听机制：

#### 	vm.$on(eventName(String / Array<String>),callback):

​			监听当前实例上定义的自定义事件。事件可以有.$emit触发，回调函数的参数为.$emit传入的的参数。

#### 	vm.$once:

​			监听自定义事件，参数与前者相同，但只触发一次。一次之后监听器被移除。

#### 	vm.$off([eventName,callback]):

​			移除自定义事件监听器。

​			**分三种情况**：

​				1.若无提供参数，移除所有监听器；

​				2.若只提供了事件，则移除该事件上所有的监听器；

​				3.若提供事件和回调，则只移除这个回调的监听。

#### 	vm.$emit(eventName,[args]):

​				触发监听事件，允许向on的回调函数传入参数

例：

##### 	grandComponent.vue:

```js
<template>
  <div>
    <son-component v-on:grandClick="changeMsg" />
    <p>{{msg}}</p>
  </div>
</template>
<script>
import sonComponent from "./sonComponent";
export default {
  name: "grandComponent",
  components: {
  	//局部组件只有通过这种方式才能检测到
    sonComponent: sonComponent
  },
  data: function() {
    return {
      msg: "old message"
    };
  },
  methods: {
    changeMsg: function(message) {
      this.msg = message;
    }
  }
};
</script>
```

##### 	sonComponent.vue:

```js
<template>
  <button @click="sendMsg">
    click me
  </button>
</template>
<script>
export default {
  name: "sonComponent",
  data: function() {
    return {
      msg: "new message"
    };
  },
  methods: {
    sendMsg: function() {
      this.$emit("grandClick", this.msg);
    }
  }
};
</script>
```

