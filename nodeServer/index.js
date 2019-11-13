const http = require('http');
http.createServer(function(request,responce){
    responce.end("hello node.js");
}).listen(3000,"127.0.0.1",function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
});