## Router:

​	改变路由，跳转页面，除了先前说过的router-link可以做到，我们也能用路由对象router的push方法(this.$router.push)完成，可分以下几种情况：

​	router.push({name , params}):路由表中需设置name属性；

​	router.push(path);

​	router.push({path}):path属性设置后，params属性就无意义，即便设置也只显示path；

​	router.push({path , query}):query为路径中‘？’后的参数；

例：

#### App.vue

```
<template>
  <div id="app">
    <h1>nestedDemo</h1>
    <!-- <router-link to="/user/user1">Go to user1</router-link>
    <router-link to="/user/user2">Go to user2</router-link>
    <router-link to="/user/user2/foo">Go to user2-foo</router-link>
    <router-link to="/user/user2/bar">Go to user2-bar</router-link> -->
    <button @click="goUser">go to user1</button>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data: function() {
    return {
      toMsg: "",
      frommsg: ""
    };
  },
  computed: {
    path: function() {
      return this.$route;
    }
  },
  methods: {
    goUser: function() {
      this.$router.push({
        name: "user"
        // params: {
        //   userName
        // }
        // path: `/user/${userName}`
      });
    }
  }
};
</script>
```

#### routes.js:

```
const routes = [
  {
    path: "/user",
    name: "user",
    component: userDemo
  },
  {
    path: "/user/:id",
    component: user,
    children: [
      {
        path: "foo",
        component: foo
      },
      {
        path: "bar",
        component: bar
      }
    ]
  },
  { path: "/demo1", component: demo1 },
  { path: "/demo2", component: demo2 }
];
```

#### 注意，push方法虽然能改换路径，但本质是向history记录栈增添数据，可以通过后退来翻看之前的页面。但如果使用replace方法则没有这个问题

router.go(n):在history中前进或后退多少步。n大于0则前进，否则后退