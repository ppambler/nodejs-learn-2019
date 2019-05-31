---
typora-copy-images-to: img\03
---

# Event Loop

很多前端面试官根本就不知道什么是Event Loop，但是就是喜欢瞎问！既然你们问了，那芳芳就告诉一个标准答案给你们！

以前芳芳对event loop只是大概了解一下，而自从大概翻译了一下[官方文档](https://nodejs.org/de/docs/guides/event-loop-timers-and-nexttick/)之后（*晚上11点到深夜3点，4个小时*），就知道什么是event loop了。

> 芳芳的学习方式：你既然一定要让我学会，那我就花一晚上把相关文档全部看一遍，英文文档看不懂的话，那就翻译一遍，翻译完之后那就懂了！这就是芳芳的学习方式！

## ★什么是Event Loop？

### ◇概述

话说，什么是Event Loop呢？这跟前端有关系吗？——其实一毛钱关系也没有！因为它是后端的知识呀！而且这是nodejs后端的知识！

那么为啥面试官现在总喜欢问呢？——因为总得有一点「面试官觉得自己会而你不会」的知识点，然后就问你啦！而Event Loop就是它道听途说了几篇文章，然后觉得自己会了，然后就问你了，目的就是看你有没有看这几篇文章！

然而大部分文章，芳芳看了都是错的！甚至阮一峰写的都是错的！

很多人都不知道Event Loop是什么，但是其实官方文档已经讲得很清楚了，你稍微看一下官方给出的例子代码，都能搞清楚Event Loop到底是什么鬼东西了！

**在理解什么是Event Loop之前，先来说说什么是Nodejs？**

### ◇什么是Nodejs？

![1559273856706](img/03/1559273856706.png)

话说，nodejs和JavaScript是什么关系？

没啥关系，因为它是跟Chrome一个级别的呀！

为啥这样说呢？

官方文档说「nodejs是一个可以运行JavaScript的这么一个平台」

既然如此，那么未来的哪一天，nodejs会不会支持某门语言呢？

按照我们的说法，显然，这是可以的，nodejs并不一定要支持JavaScript，只是一开始就选择支持JavaScript罢了！

同理，Chrome也是一个可以运行JavaScript的这么一个平台

当然，除此之外，Chrome还有其它功能，比如：

- 渲染模块：把页面渲染成屏幕上可见的东西，主要是渲染HTML和CSS（这个渲染引擎比JavaScript引擎复杂了不知道多少倍）
- 网络模块：它的作用，比如说，我们输入一个网址，然后回车，你说发起的这个请求是谁干的？难道是JavaScript干的？——不是JS请求的，而是C++的一些库来请求的！所以说这跟JS没啥关系！
- JS引擎：它是干嘛的呢？——负责执行JavaScript代码的呀！可见，我们觉得很重要的JavaScript，占不到Chrome的三分之一功能，总之JS只是个很小很小的这么一个模块！
- UI模块
- 扩展模块（插件模块）
- ……

同样同理，nodejs也是这样的，它有以下这些模块：

- 文件模块（fs）
- HTTP模块
- ……

那么，我们怎样去使用这些模块呢？——nodejs给了你一个JS引擎呀！

这个JS引擎可以执行JavaScript代码，然后你还可以用JavaScript代码去调用诸如文件、HTTP等这些模块！

所以说，JS引擎的功能其实是很少的！可见，这就是JS引擎大概要干的事……

一般来说，JS引擎用的是V8引擎，nodejs用的是v8引擎，Chrome用的也是v8引擎，而Chrome的其它模块用的不是V8引擎的内容，那么用的是什么呢？——用的是一个叫做chromium的这么一个东西，即一个开源的渲染引擎！而Chrome则是一个在chromium的基础上然后包装了一些东西而存在的这么一个东西！这就是我们的JS引擎在nodejs和Chrome中所占的位置了！

> 浏览器的内核中主要分为渲染引擎和 javascript 引擎，而Chrome的浏览器内核是chromium，不过之后chrome的v8引擎从内核中独立开来的，即chromium主要表示的是渲染引擎了！

**➹：**[chrome浏览器页面渲染工作原理浅析 - 知乎](https://zhuanlan.zhihu.com/p/30134423)

**➹：**[浏览器渲染引擎 - 掘金](https://juejin.im/post/5ac45882518825558723c4fd)

**➹：**[主流浏览器内核介绍（前端开发值得了解的浏览器内核历史） - 前端 - 掘金](https://juejin.im/entry/57ff3cea0e3dd90057e5f25e)

**➹：**[认识 V8 引擎 - 知乎](https://zhuanlan.zhihu.com/p/27628685)

> 在nodejs下，写JavaScript代码的时候，很多时候我们需要require某个内置模块，或者一些第三方提供的包，就拿内置模块来说，使用的还是JavaScript代码，但是这些代码却具有可以让我们读取文件、启动http server等这样的能力，我们之前在浏览器跑的JavaScript的代码并不具备这样的能力，但是nodejs的存在却让我们看到了JavaScript这门语言在不同平台下，所具备的能力是不同的！你JavaScript在chrome这个平台下可以操作DOM，但不能读取文件等；你JavaScript在nodejs这个平台下可以读取文件等，但不能操作DOM，当然，下边这个库似乎可以让在nodejs环境运行的JavaScript具备操作的DOM的能力：
>
> **➹：**[cheerio - 为服务器特别定制的，快速、灵活、实施的jQuery核心实现](https://cheerio.js.org/)
>
> **➹：**[通读cheerio API - CNode技术社区](https://cnodejs.org/topic/5203a71844e76d216a727d2e)
>
> **➹：**[使用node.js cheerio抓取网页数据 - 奇舞团博客](https://75team.com/post/%E4%BD%BF%E7%94%A8node-js-cheerio%E6%8A%93%E5%8F%96%E7%BD%91%E9%A1%B5%E6%95%B0%E6%8D%AE.html)
>
> 或许我应该把编程语言脱离某个平台来看，因为这样一来，我学习编程语言的目的就是，找出所有编程语言的共性，然后去学习它，比如简单的赋值的？简单的循环怎么写？简单的判断怎么写？等等，学会这些之后，在让自己陷入某个平台去学其它诸如Java这样的语言，至此，对赋值、循环等代码书写姿势也就好理解得多了。像是之前我学习Java web的时候，简单用tomcat搞个http server，都得配置不知所云的东东，而用nodejs之后，就很快明白，http server到底是什么了！反正，很多时候我只想快速的拿到这个结果，然后去理解这个过程！而不是像tomcat那样需要配置这样那样的东西，然后再拿到这样的结果。不管如何，你理解这个东西，总得有个整体认识才能更好地去理解这个东西。
>
> **知识零碎，需看整再深入……而看整，需做项目**
>
> **➹：**[如何开始学习计算机编程 - OSCHINA](https://www.oschina.net/translate/how-to-start-programming-for-free)
>
> **➹：**[编程语言入门的共性 - 知乎](https://zhuanlan.zhihu.com/p/28965128)
>
> **➹：**[为什么计算机专业好多年了，就是学不会编程？ - 知乎](https://www.zhihu.com/question/57615231)

### ◇JS 引擎

























