var http = require('http');

var server = http.createServer()

server.on('request',function(req,res){
/*     res.write('hello ')
    res.write('world') */
    var url = req.url
    //res.end(url)
    //console.log('req path:'+url)
    //example:
    if(url === '/'){
        res.end('home page')
    }else if (url === '/login') {
        res.end('login page')
    }else if(url === '/register'){
        res.end('register page')
    }else{
        res.end('404 not Found.')
    }

    //The contents of response cannot be array number boolen obj...
    //JSON.stringify()
})

server.listen(8080,function(){
    console.log('server start!')
})
