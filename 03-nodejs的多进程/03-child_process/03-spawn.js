const { spawn } = require('child_process')


var child = spawn('ls', ['-c'])  

child.stdout.on('data', (data) => {
  console.log('data', data.toString('utf8'))
})
child.on('close', (code) => {
  console.log('closing code:' + code) 
})