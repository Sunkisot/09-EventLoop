setTimeout(function timeout () {
  console.log('timeout');
},1);

setImmediate(function immediate () {
  console.log('immediate');
});


//因为event loop的启动也是需要时间的，可能执行到poll阶段已经超过了1ms，此时setTimeout会先执行。反之setImmediate先执行