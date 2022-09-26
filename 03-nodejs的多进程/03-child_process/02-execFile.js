const execFile = require('child_process').execFile

execFile('ls', ['-c'], (err, stdout, stderr) => {  // execFile会自动过滤掉一些敏感的字符串 比如"\ rm -f;"
  console.log('stdout', stdout)
})