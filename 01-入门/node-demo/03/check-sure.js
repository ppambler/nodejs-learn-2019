// timeout_vs_immediate.js
const fs = require('fs');
const start = Date.now()
fs.readFile(__filename, () => {
  // setTimeout(() => {
  //   console.log(Date.now()-start)
  //   console.log('timeout');
  // }, 0);
  setImmediate(() => {
    console.log(Date.now()-start)
    console.log('immediate');
  });
});
console.log(Date.now()-start+'ms')