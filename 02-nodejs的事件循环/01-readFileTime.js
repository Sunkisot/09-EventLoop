const fs = require('fs')
const path = require('path')

console.time('file')
fs.readFile(path.resolve('./read.txt'), 'utf-8', () => {
  console.timeEnd('file')
})