//1. loading http module
var http = require('http')

//2. http.createServer()
var server = http.createServer()

//3.Server for data
//  register ‘request’ event then callback function
/*  callback function{
    request -- get information : path
    response -- response information
}*/
server.on('request',function(request,response){
    console.log('ask path:'+request.url)
    //console.log('get request!')
    response.write('hello')
    //end is necessary！
    response.end()
})

//4. bind port num, start server
server.listen(3000,function(){
    console.log('http://127.0.0.1:3000 && http://localhost:3000')
})