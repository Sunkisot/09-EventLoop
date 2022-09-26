const net = require('net')
const fork = require('child_process').fork

var workers = []
for (var i = 1; i < 4; i++) {
  workers.push(fork('./work.js'))
}

var handle = net._createServerHandle('0.0.0.0', 3001)
handle.listen()
handle.onconnection = function(err, handle) {
  var worker = workers.pop()
  worker.send({}, handle)
  workers.unshift(worker) // 通过pop 和 unshift实现简易的轮询
}