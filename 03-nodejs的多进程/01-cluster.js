const cluster = require('cluster')
const http = require('http')
const numCpus = require('os').cpus().length

console.log(cluster, http)

if (cluster.isMaster) { // 是否是主进程
  for (var i = 0; i < numCpus; i++) {
    cluster.fork()
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker' + worker.process.pid + 'died')
  })
} else { // 是worker进程
  http.createServer((req, res) => {
    
    res.end('hello world')
  }).listen(8002, () => {
    console.log('server is running 8002 port!')
  })
} 