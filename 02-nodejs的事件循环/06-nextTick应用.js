// 1. 在多个事件里交叉执行CPU运算密集型的任务：
var http = require('http');

function compute() {

  process.nextTick(compute);//
}

http.createServer(function (req, res) {  // 服务http请求的时候，还能抽空进行一些计算任务
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
}).listen(5000, '127.0.0.1');

compute();


// 2. 保持回调函数异步执行的原则
var client = net.connect(8124, function () {
  console.log('client connected');
  client.write('world!\r\n');
});
// 在上面的代码里，如果因为某种原因，net.connect()变成同步执行的了，回调函数就会被立刻执行，因此回调函数写到客户端的变量就永远不会被初始化了。 



// 3. 用在事件触发过程中

var EventEmitter = require('events').EventEmitter;

function StreamLibrary(resourceName) {
  this.emit('start');
}
StreamLibrary.prototype.__proto__ = EventEmitter.prototype;   // inherit from EventEmitter

var stream = new StreamLibrary('fooResource');

stream.on('start', function () {
  console.log('Reading has started'); 
});

// 改 ***
function StreamLibrary(resourceName) {
  var self = this;

  process.nextTick(function () {
    self.emit('start');
  });  // 保证订阅永远在发布之前 

  // read from the file, and for every chunk read, do:        

}

