---
typora-copy-images-to: img\01
---

# nodejs入门

## ★资源

> [Node.js 入门 - 写代码啦！](https://xiedaimala.com/tasks/b4070240-c8e9-4eee-9207-b8ddf330c402)

## ★课程简介

1. fs 模块
2. http 模块
3. express 框架
4. koa 框架
5. Event Loop

## ★Event Loop（文章）

> 这是篇很重要的文章：[Event Loop、计时器、nextTick - 掘金](https://juejin.im/post/5ab7677f6fb9a028d56711d0)

### ◇几张图

![å¾ç](img/01/FhlfEDoIjjwwy7l7l97aRrg_yLzi)

---

![å¾ç](img/01/FoD3ro6Lhd_YHaW7PwOoi7Mil4eI)

---

![å¾ç](img/01/Fuv8l1qBYFEPN3soNCsybRubjgaQ)



---

### ◇MacroTask 和 MicroTask

妈（Ma）咪 （Mi）

- macrotasks 有 setTimeout setInterval setImmediate I/O UI渲染
- microtasks 有 Promise process.nextTick Object.observe MutationObserver

1. 先执行 Ma 再执行 Mi。
2. new Promise(fn).then(success) 期中 fn 是立即执行的，success 会被放入 Mi 任务。

面试题：

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

let promise = new Promise((resolve, reject)=>{
    console.log(1)
    resolve()
})
promise.then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
```

请说出 log 的顺序。

答案自己运行一下就知道了。

---

## ★CRM法入门Node.js

