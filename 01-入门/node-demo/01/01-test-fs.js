const fs = require('fs');

fs.readFile('../static/test.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.readFile('../static/test.txt', (err, data) => {
  if (err) throw err;
  console.log(err)
  console.log(data.toString());
});
const yyy = fs.readFile('../static/test.txt', (err, data) => {
  if (err) throw err;
  console.log(err)
  console.log(data.toString());
});
// 由于是异步读取，所以你是拿不到yyy的，毕竟不等结果呀！等有了结果，也不会再次执行这个log了
console.log(yyy,'异步的读')
// 在 macOS、Linux 和 Windows 上：
// 相较于异步的读，它没有callback
fs.readFileSync('../static/test.txt', (err, data) => {
  if (err) throw err;
  console.log(err)
  console.log(data.toString());
});
console.log('报错前会执行吗？')
// 拿到输出，再log
const xxx = fs.readFileSync('../staic/test.txt');
console.log('readFileSync先执行！')
console.log(xxx.toString())
// => [Error: EISDIR: illegal operation on a directory, read <目录>]