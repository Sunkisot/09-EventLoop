const net = require('net')

process.on('message', (m, handle) => { // master 接受客户端的请求， worker去响应
  start(handle)
})

var buf = 'hello nodejs'
var res = ['HTTP/1.1 200 OK', 'content-length:' + buf.length].join('\r\n') + '\r\n\r\n' + buf

var data = {}

function start(server) { // 响应逻辑，重点关注鲸群效果，计数
  server.listen()
  server.onconnection = function (err, handle) {
    var pid = process.pid
    if (!data[pid]) {
      data[pid] = 0
    }
    data[pid]++
    console.log('got a connection on worker, pid = %d', process.pid, data[pid])

    var socket = new net.Socket({
      handle: handle
    })
    socket.readable = socket.writable = true
    socket.end(res)
  }
}
