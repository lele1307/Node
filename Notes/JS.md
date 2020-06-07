# JavaScript

## [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

- 添加元素
  - 末尾添加 
    ```js
    let num = [1,2,3]
    num[num.length] = 4
    
    push()
    ```
  - 开头插入
    ```js
    unshift()
    ```
- 删除元素
  - 删除开头元素
    ```js
    shift()
    //shift & unshift 可以模拟队列数据结构
    ```
  - 删除末尾元素
    ```js
    pop() //pop、push可以数组模拟栈
    ```
  - 删除/插入指定元素 
    ```js
    splice(index, nums,insert exp1,exp2,...)
    ```


## Math

[Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 用于 Number 类型。它不支持 BigInt。

- Math.abs(x) 返回一个数的绝对值。
- Math.sign(x) 返回一个数的符号，得知一个数是正数、负数还是 0。
- Math.pow(x, y) 返回一个数的 y 次幂。
