var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http.createServer(function (req, res) {
  // 如果是 'text/plain'拿到的是咩有解析HTML的字符串源码了
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
  console.log(req)
  console.log(res)
}).listen(9999);

// log提示该server正在运行，不然咩有提示的话，用户可是不知道server正在跑
console.log('正在监听9999端口……')