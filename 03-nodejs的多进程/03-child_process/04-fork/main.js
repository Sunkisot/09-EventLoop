const child_process = require('child_process')
const path = require('path')

// fork方法直接创建一个子进程，执行Node脚本，
// `fork('./child.js')` 相当于 `spawn('node', ['./child.js'])` 
// 与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道pipe，用于进程之间的通信,也是IPC通信的基础。
var child = child_process.fork(path.resolve(__dirname, './child.js'))

child.on('message', data => {  //main 去监听child的消息
  console.log('父进程接收到数据', data)
})


child.send('子进程，爸爸给你发消息了')