// timeout_vs_immediate.js
setImmediate(() => {
  console.log('immediate');
});
const start = Date.now()
setTimeout(() => {
  console.log(Date.now()-start)
  console.log('timeout');
}, 0); // 15~18
console.log(Date.now()-start+'ms')
// 不需要加第二个参数，如果要加的话，那么第二个参数就是其callback的实参值
// setImmediate((xxx) => {
//   console.log(xxx);
// },'immediate');