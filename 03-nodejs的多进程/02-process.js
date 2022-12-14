
// 属性
// 1. **process.argv** 属性，返回一个数组，包含了启动 node 进程时的命令行参数
// 2. **process.env** 返回包含用户环境信息的对象，可以在 脚本中对这个对象进行增删改查的操作
// 3. **process.pid** 返回当前进程的进程号
// 4. **process.platform** 返回当前的操作系统
// 5. **process.version** 返回当前 node 版本
console.log(process.argv) // 返回一个数组，包含了启动 node 进程时的命令行参数
console.log(process.env) // 返回包含`用户环境信息`的对象，可以在 脚本中对这个对象进行增删改查的操作
console.log(process.pid) // 返回当前进程的进程号
console.log(process.platform) // 返回当前的操作系统
console.log(process.version) // 返回当前 node 版本 

// 方法
// 1. **process.cwd()** 返回 node.js 进程当前工作目录
// 2. process.chdir() 变更 node.js 进程的工作目录
// 3. **process.nextTick(fn)** 将任务放到当前事件循环的尾部，添加到 ‘next tick’ 队列，一旦当前事件轮询队列的任务全部完成，在 next tick 队列中的所有 callback 会被依次调用
// 4. **process.exit()** 退出当前进程，很多时候是不需要的
// 5. process.kill(pid[,signal]) 给指定进程发送信号，包括但不限于结束进程

var cwd = process.cwd()
console.log(cwd) // 返回node.js进程当前工作目录 

// 事件
// 1. beforeExit 事件，在 Node 清空了 EventLoop 之后，再没有任何待处理任务时触发，可以在这里再部署一些任务，使得 Node 进程不退出，显示的终止程序时（process.exit()），不会触发
// 2. exit 事件，当前进程退出时触发，回调函数中只允许同步操作，因为执行完回调后，进程金辉退出
// 3. **uncaughtException** 事件，当前进程抛出一个没有捕获的错误时触发，可以用它在进程结束前进行一些已分配资源的同步清理操作，尝试用它来恢复应用的正常运行的操作是不安全的
//    > 重点关注
// 4. warning 事件，任何 Node.js 发出的进程警告，都会触发此事件


// 同步错误
// bbb()
// 异步错误
const http = require('http')
http.createServer((req, res) => {
  bbb()
  res.end('hello world')
}).listen(8002, () => {
  console.log('server is running 8002 port!')
})

process.on('uncaughtException', (err) => { // 专门捕捉异步代码的错误，兜底方案
  console.log('发生错误', err) 
})
