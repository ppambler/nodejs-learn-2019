var http = require('http');

let server = http.createServer(function (req, res) {
  console.log(req.url) //http://localhost:9999/fuck，该值为/fuck
  res.statusCode = '201'
  res.write('hello')
  res.end()
})

server.listen(9999);
console.log('正在监听9999端口……')

