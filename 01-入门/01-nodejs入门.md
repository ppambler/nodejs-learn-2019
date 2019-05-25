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

### ◇概述

关于nodejs的学习，如果你是做前端的，那么3年以内其实你是不需要学的，如果要学也是为面试准备的，就像是高考满分150分的数学卷，总有20分是留给尖子生的！而在这里，面试时，涉及nodejs的考题也是类似于这20分，总之，你会nodejs，那么就是你面试前端的加分项！

> 之前学得Web性能优化，你得实践后才知晓，刚开始靠死记硬背是不可能学会的，所以那些刚从饥人谷毕业的学生想去面试阿里社招的，请打消这个念头！因为你得工作两年以上才去考虑！没有经验基本就是凉凉了，就算你是天才也不要你！

话又说回来，nodejs入门讲什么呢？——有以下这么几个东西：

1. fs 模块
2. http 模块
3. express 框架
4. koa 框架
5. Event Loop

主要就是讲两个本地模块、两个框架，以及最重要的Event Loop

> 前面4个内容半小时讲完，最后这个内容需要半小时讲解！

### ◇ fs 模块

我们之前学过一个套路，叫CRM套路！请记住，这个套路是芳芳学东西的唯一套路！即 copy run modify

接下来，你无须理会 fs 模块到底是什么，你需要知道的是芳芳是如何学习这个知识点的，如看了啥网站？看了啥文档？抄了啥代码？即可！

#### 怎么学？

1. 搜索nodejs官方文档，英文和中文都行

   ![1558757410514](img/01/1558757410514.png)

   > 加「文档」二字定位到中文版的文档， 不加就是英文的！

2. 找到有关fs的内容，可见它是文件系统模块！可以用于读写文件

   ![1558757454652](img/01/1558757454652.png)

3. fs模块旗下有很多API，你可以一个个看，也可以挑取几个你感兴趣的API来看！

   ![1558757504473](img/01/1558757504473.png)

4. ![1558757600786](img/01/1558757600786.png)

5. 点进去，直接看例子，抄代码，不要看文字描述！

   ```js
   fs.readFile('/etc/passwd', (err, data) => {
     if (err) throw err;
     console.log(data);
   });
   ```

   有JavaScript的基础，自己可以根据代码简单分析一下这例子需要怎样的输入，如需要一个路径，一个callback。进一步分析callback，readFile是个异步API，如果读取资源error，那么就会报错，否则就把资源的data给log出来！

6. 测试代码。找个合适的位置，创建node-demo这个目录，然后创建个test.js，直接把例子代码拷贝进去，啥也不需要管！然后运行：

   ![1558758212504](img/01/1558758212504.png)

7. 报错了说fs没定义，既然如此那就回去看该API的文档呗！然而文档没有写，没有告诉我们如何得到fs，可见这文档很贱啊！其实，文档有说，当然，这不是在某个API里边说的，而是一开始就说了：

   **➹：**[fs - Node.js API 文档](http://nodejs.cn/api/fs.html#fs_file_system)

   如果你找不到答案，那么你只能谷歌或问人了。

8. 解决bug：

   ![1558758574666](img/01/1558758574666.png)

   这句代码表示「它会去node里边去加载这个fs模块，而这个模块就是个对象」

   代码运行了，还是报错了，说咩有这样的文件或目录，既然如此，那我们就搞个有的呗！

   ![1558759230673](img/01/1558759230673.png)

   > 路径不要写 `~/desktop/`这样的，波浪线只对bash有用！所以你不能写波浪线哈！
   >
   > ![1558759638619](img/01/1558759638619.png)
   >
   > 不分盘的除外！

9. 拿到的data到底是什么？Buffer？LOL里边的蓝buffer、红buffer？

   那么这时就得回去看文档了。

   看文档知晓：

   > 回调会传入两个参数 `(err, data)`，其中 `data` 是文件的内容。
   >
   > 如果没有指定 `encoding`，则返回原始的 buffer。
   >
   > 如果 `options` 是字符串，则它指定字符编码：
   >
   > ```js
   > fs.readFile('/etc/passwd', 'utf8', callback);
   > ```

   所以可有：

   ![1558760024980](img/01/1558760024980.png)

   而此时的err值是null，当然如果你不用`utf8`参数也可以把data的值变成真正的字符串，直接 `data.toString()`即可！就像这样：

   ![1558776788371](img/01/1558776788371.png)

   至此这个 `fs.readFile()`API你也就学会了！

同理 `fs.readFileSync()`这个API也是这样学，直接CRM大法即可！

不过它跟异步的读还是有区别的！区别在于它没有callback，你要拿到data，直接拿到这个API的返回结果即可！如果咩有找到资源那么就会报错！当然这同样是边解析边执行的！

```js
const xxx = fs.readFileSync('../staic/test.txt');
console.log('readFileSync先执行！')
console.log(xxx.toString())
```

总之，它是同步的API，不需要callback。读完之后就会把读到的buffer给xxx。与异步的读，形式上写法不一样。

至此，两个API也就学会了！然后就去用即可！

[demo](./node-demo/01/01-test-fs.js)

接下来，就是学习fs的各类API，用CRM大法即可！

如：

1. 访问文件的路径
2. 完文件里边添加内容
3. 改变文件的执行权限
4. 改变文件拥有者
5. 复制文件
6. 判断一个文件存不存在
7. 获取文件信息
8. ……

总之，你要做的事，就是把文档看完，然后你的nodejs也就入门了

所有说这所谓的入门。其实就是看你有没有熟悉这些API

像JavaScript一样，对于nodejs来说，你已经学会了JavaScript，那么剩下的你要学的只有API了





## ★总结

## ★Q&A

### ①Buffer是什么？

在引入 [`TypedArray`](http://nodejs.cn/s/oh3CkV) 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。 `Buffer` 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。

也就是说它的存在可以让我们读取文件咯！

**➹：**[Buffer - Node.js API 文档](http://nodejs.cn/api/buffer.html)

**➹：**[Buffer对象 -- JavaScript 标准参考教程（alpha）](https://javascript.ruanyifeng.com/nodejs/buffer.html)









