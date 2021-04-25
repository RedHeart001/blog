URLSearchParams：针对url的查询字符串封装的一个接口

构造函数：

```
const urlObj = new URLSearchParams(url || query)
```

常用方法：

- [`URLSearchParams.append()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/append)

  插入一个指定的键/值对作为新的搜索参数。

- [`URLSearchParams.delete()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/delete)

  从搜索参数列表里删除指定的搜索参数及其对应的值。

- [`URLSearchParams.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/entries)

  返回一个[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)可以遍历所有键/值对的对象。

- [`URLSearchParams.get()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/get)

  获取指定搜索参数的第一个值。

- [`URLSearchParams.getAll()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/getAll)

   获取指定搜索参数的所有值，返回是一个数组。

- [`URLSearchParams.has()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/has)

   返回 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 判断是否存在此搜索参数。

- [`URLSearchParams.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/keys)

  返回[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) 此对象包含了键/值对的所有键名。

- [`URLSearchParams.set()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/set)

   设置一个搜索参数的新值，假如原来有多个值将删除其他所有的值。

- [`URLSearchParams.sort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/sort)

  按键名排序。

- [`URLSearchParams.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/toString)

  返回搜索参数组成的字符串，可直接使用在URL上。

- [`URLSearchParams.values()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/values)

  返回[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) 此对象包含了键/值对的所有值。