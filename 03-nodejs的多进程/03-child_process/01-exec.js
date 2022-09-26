const exec = require('child_process').exec;

// 命令     错误   输出   
exec('lss', (err, stdout, stderr) => {
  if (err) {
    console.log('stderr', stderr)
  }
  console.log('stdout', stdout)
})

// 通过流的方式 
var child = exec('ls')
child.stdout.on('data', (data) => {
  console.log('data', data)
})
child.stderr.on('data', (err) => {
  // 打印err
})