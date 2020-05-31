console.log('a.start')
//require('./b.js');
var req = require('./b') // 可以省略后缀名
console.log(req.foo)
console.log('a.end')
// modules can only compile in self scope, there is not global scope

// require -- loading module -- get obj of modules export