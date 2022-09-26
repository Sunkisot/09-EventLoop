process.on('message', data => {
  console.log('子进程接收到的消息', data)
})


process.send('父进程你好！')