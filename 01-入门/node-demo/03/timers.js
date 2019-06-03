const fs = require('fs'); //这个的执行需要大概119ms
const start = Date.now()

function someAsyncOperation(callback) {
  // 假设读取这个文件一共花费 95 毫秒
  fs.readFile('../xxx', callback);
}

function someAsyncOperation1(callback) {
  // 假设读取这个文件一共花费 95 毫秒
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  // 处理Event loop，来到第一个阶段大概需要15ms呀！此时已经有了callback，在timer队列里边了
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}毫秒后执行了 setTimeout 的回调`);
}, 0);
// 如果你设置为20,那么此时还没有timer队列里边还没有callback，于是继续往下走

// 执行一个耗时 95 毫秒的异步操作
someAsyncOperation(() => {
  const startCallback = Date.now();

  // 执行一个耗时 10 毫秒的同步操作
  while (Date.now() - startCallback < 20) {
    console.log('我是第一个耗时95ms')
  }
});
someAsyncOperation1(() => {
  const startCallback = Date.now();

  // 执行一个耗时 10 毫秒的同步操作
  while (Date.now() - startCallback < 20) {
    console.log('我是第二个耗时95ms')
  }
});
console.log(Date.now()-start) //5ms