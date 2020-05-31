//1. require documents
var fs = require('fs');
//2. read
/*  path 
    callback_function{
        error--object/null
        data--data/null
    }
*/
fs.readFile('read.txt',function(error,data){
    //<Buffer 48 65 6c 6c 6f 20 6e 6f 64 65 20 6a 73>
    //binary data --> hex
    console.log(data.toString())
})

/*  1.bom&dom cannot be read in node 
    2.This readtxt.js cannot complie in Browser
    3.Both node and browser can complie EcmaScript JavaScript
*/

fs.writeFile('write.txt','hello write node js',function(error){
    if(error){
        console.log('write error')
    }else{
        console.log('write in succuss!')
    }
    
})