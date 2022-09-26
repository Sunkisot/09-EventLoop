// 鲸群现象：多个子进程去抢一个请求，谁先抢到谁处理

const net = require('net')
const fork = require('child_process').fork

var handle = net._createServerHandle('0.0.0.0', 3001)

for(var i = 0; i < 4; i++) {
  fork('./worker.js').send({}, handle)
}