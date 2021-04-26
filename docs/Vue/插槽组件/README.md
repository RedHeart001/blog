## 插槽slot组件

### 理解：

​		属性传递可以用props接收，但是如果向组件传递内容（例如：<myComponent>lalala</Component>）时，组件就应使用slot接收与展示。

​		**传递的内容不限于文本，也可以传入html代码，甚至是组件**

​		例：

```javascript
<template>
  <div>
    <a :href='url'>		
      // vue中的a标签应使用:href的格式来设置，否则可能不会按预期跳转（此处进入/url）
      <slot></slot>
    </a>
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  name: "slotDemo",
  props: {
    url: {
      type: String
    }
  },
  data: function() {
    return {
      msg: this.url
    };
  }
};
</script>
```



### 作用域问题：

##### 	App.vue：

```js
<template>
  <div id="app">
    <slotDemo url='http://www.baidu.com'>
      click me to {{path}}
    </slotDemo>
  </div>
</template>

<script>
import slotDemo from "./components/slotDemo";
export default {
  name: "app",
  components: {
    slotDemo
  },
  data: function() {
    return {
      path: "App path"
    };
  }
};
</script>
```

##### 	slotDemo.vue：

```js
<template>
  <div>
    <a :href='url'>
      <slot></slot>
    </a>
  </div>
</template>
<script>
export default {
  name: "slotDemo",
  props: ["url"],
  data: function() {
    return {
      path: "son path"
    };
  }
};
</script>
```

此时显示的结果是‘**App path**’。有一条规则：**父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的**，故结果为此。



### 后备内容：

​		也可以看作默认值。当父级模板未向子级组件传递内容时，就会显示自己模板slot组件中预写的文本。

​		例：

```js
<template>
  <div>
    <a :href='url'>
      <slot>default slot</slot>
    </a>
  </div>
</template>
<script>
export default {
  name: "slotDemo",
  props: ["url"],
  data: function() {
    return {
      path: "son path"
    };
  }
};
</script>
```

​	此时若父级模板不传递内容，则最终显示的就是‘default slot’



### 插槽Name：

​		有时可能会遇到需要多个slot的时候，此时指定name就很重要，使用v-slot指令就很有必要。在子级模板的slot中设置name属性，父级模板以**<template v-slot:name>...</template>**的格式传入。例如：

##### 	App.vue下的template：

```js
<template>
  <div id="app">
    <slotDemo>
      <template v-slot:header>
        <p>i am header</p>
      </template>
      <p>i am container</p>
      <template v-slot:foot>
        <p>i am foot</p>
      </template>
    </slotDemo>
  </div>
</template>
```

##### 	slotDemo.vue：

```js
<template>
  <div>
    <slot name='header'></slot>
	//slot的name属性源于组件本身，不是vue用v-bind设置的
    <slot></slot>
    <slot name="foot"></slot>
  </div>
</template>
```

​	**slot组件的name属性默认为’default‘，所有父级中未指定的内容都会渲染到这个插槽中**



### 作用域插槽：

​	个人理解为子级模板向父级模板传入数据的手段。由于之前的规则（父级渲染父级数据，子级渲染子级数据）导致常规手段无法实现子级向父级传输数据，但作用域插槽解决了这个问题。

##### 	App.vue:

```
<template>
  <div id="app">
    <slotDemo>
      <template v-slot='slotProps'>
        <ul>
          <li v-for="item in slotProps.list"
              :key="item">
            {{item}}
          </li>
        </ul>
      </template>
    </slotDemo>
  </div>
</template>
```

##### 	slotDemo.vue:

```
<template>
  <div>
    <slot :list="list"></slot>
  </div>
</template>
<script>
export default {
  name: "slotDemo",
  props: ["url"],
  data: function() {
    return {
      list: [1, 2, 3, 4, 5, 6]
    };
  }
};
</script>
```

最终显示列表数据，也映证了**子级向父级传递数据**的能力。

​	ps：插槽作用域就是为了规避层级套用过多的问题，只需要基础模板向父级传递数据，父级负责渲染子级样式即可。

​	例：

​		App.vue：

```
<template>
  <div id="app">
    <slotDemo>
      <template v-slot:test='slotProps'>
        <h1>
          {{slotProps.item}}
        </h1>
      </template>
    </slotDemo>
  </div>
</template>
```

​		slotDemo.vue:

```
<template>
  <div>
    <ul>
      <li v-for="item in list"
          :key="item">
        <slot :item="item"
              name="test">
          {{item}}
        </slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "slotDemo",
  props: ["url"],
  data: function() {
    return {
      user: {
        firstName: "li",
        lastName: "ao"
      },
      list: [1, 2, 3, 4, 5, 6]
    };
  }
};
</script>
```

**如果将具名插槽和作用域插槽结合：**

##### App.vue

```html
<template>
  <div id="app">
    <father-demo>
      <son-demo>
        <!-- title插槽的props -->
        <template v-slot:title='slotProps'>
          <span>
            {{ slotProps.sonName}} title
          </span>
        </template>
        <!-- content插槽的props -->
        <template v-slot:content='slotProps'>
          <p>
            {{ slotProps.sonName}} title
          </p>
        </template>
      </son-demo>
     </father-demo>
    </div>
</template>
```

##### fatherDemo.vue

```html
<template>
  <ul>
    <slot></slot>
  </ul>
</template>
```

##### sonDemo.vue

```html
<template>
  <li @click="sonClick">
      <!-- title插槽，参数为sonName，统一存放于slotProps -->
    <slot name="title"
          :sonName='this.$options.name.substr(0,3)'></slot>
      <!-- content插槽，参数为sonName，统一存放于slotProps -->
    <slot name="content"
          :sonName='this.$options.name.substring(0,4)'></slot>
  </li>
</template>
```

