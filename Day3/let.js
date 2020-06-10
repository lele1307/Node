var arr = [];
for (var i = 0; i < 2; i++) {
    arr[i] = function () {
        console.log(i);
    }
}
arr[0](); //2
arr[1](); //2
//执行输出的是全局作用域下的i值 此时跳出循环时 i = 2