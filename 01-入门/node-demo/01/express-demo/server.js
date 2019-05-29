const express = require('express')
const app = express()
const port = 9999
const path = require('path')

// app.use(express.static('public'))
// app.use('/static', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/xxx', (req, res) => res.send('我是/xxx'))

app.get('/', (req, res) => {
  // 当前路径与相对路径拼接，变成合理的路径
  console.log(__dirname)
  let p = path.join(__dirname,'./index.html')
  console.log(p)
  res.sendFile(p);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))