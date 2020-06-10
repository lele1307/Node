var arr = [];
for (var i = 0; i < 2; i++) {
    arr[i] = function () {
        console.log(i);
    }
}
arr[0](); //2
arr[1](); //2
//执行输出的是全局作用域下的i值 此时跳出循环时 i = 2

var arr1 = [];
for (let i = 0; i < 2; i++) {
    arr1[i] = function () {
        console.log(i);
    }
}
arr1[0](); //0
arr1[1](); //1
//每次loop都有自己的块级作用域，每个作用域的变量都是不同的
//函数执行输出的是自己上一级作用域下的i值