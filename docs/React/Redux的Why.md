## Redux的Why

### 前身Flux

Flux是一种设计思想，由Store（状态层）、Dispatch（派发层）、Action（操作层）、View（视图层）四个模块构成。用户在View中触发Action，进而引动Dispatch改变Store中的状态，改变后的结果会映射到View视图层。这是一种严格的**单向数据流**思想。

双向数据流操作会引发前端的混乱，model和view之间的关系将极为复杂。

Flux只有在复杂的项目中才有最大的效果。

### 设计思想的一脉相承

Redux由Store，Reducer，View，Action组成，也是严格实行了Flux的单向数据流思想

```js
const store = create(reducer,initval,middleWares) 	// 实际返回的是一个具有多个属性（getState，dispatch，subscribe等属性的对象）
```

