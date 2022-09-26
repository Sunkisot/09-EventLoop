const cluster = require('cluster')
const http = require('http')
const cpuNums = require('os').cpus().length

if (cluster.isMaster) { // 主进程
  for(var i = 0; i < cpuNums; i++) {
    cluster.fork()
  }

  // 1.当新的子进程被fork时，cluster模块将出发'fork'事件，可以被用来记录子进程的活动，产生一个自定义的timeout
  // cluster.on('fork', (worker) => {
  //   console.log('主进程fork了一个worker pid为：', worker.process.pid)
  // })

  // 2.当子进程调用listen()方法之后，子进程上的server会触发'listening'事件，同时主进程上的cluster也会触发'listening'事件
  // 事件处理器使用两个参数来执行，其中worker包含了子进程对象，address包含了以下连接属性：address、port、addressType，当子进程同时监听多个地址时，这些参数非常有用
  // cluster.on('listening', (worker) => {
  //   console.log('主进程fork了一个worker进行http服务的pid为：' + worker.process.pid)
  // })

  // 3.当cluster主进程接收任意子进程发送的消息后触发
  // cluster.on('message', (worker, data,handle) => {
  //   console.log(worker.process.pid, data)
  // })
  // // 或
  // Object.keys(cluster.workers).forEach(id => {
  //   cluster.workers[id].on('message', (data) => {
  //     console.log(data)
  //   })
  // })

  // 4. disconnect
  cluster.on('disconnect', (worker) => {
    console.log('有工作进程退出了', worker.process.pid)
    cluster.fork() // 进程守护
  })
}else { // 子进程 
  // http.createServer((req, res) => {
  //   res.end('hello world')
  // }).listen(3001)
  process.send(process.pid)
  process.disconnect() // 优雅退出
}