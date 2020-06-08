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
- 迭代方法
  - arr.forEach()
  - arr.every() return boolean
    ```js
    [12, 5, 8, 130, 44].every(x => x >= 10); // false
    [12, 54, 18, 130, 44].every(x => x >= 10); // true
    ```
  - map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一次提供的函数后的返回值
    ```js
    const array1 = [1, 4, 9, 16];
    // pass a function to map
    const map1 = array1.map(x => x * 2);
    console.log(map1);
    // expected output: Array [2, 8, 18, 32]
    ```
  - filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
    ```js
    const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
    const result = words.filter(word => word.length > 6);
    console.log(result);
    // expected output: Array ["exuberant", "destruction", "present"]
    ```
  - [reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值


## Math

[Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math) 用于 Number 类型。它不支持 BigInt。

- Math.abs(x) 返回一个数的绝对值。
- Math.sign(x) 返回一个数的符号，得知一个数是正数、负数还是 0。
- Math.pow(x, y) 返回一个数的 y 次幂。
- Math.floor(x) 返回一个表示小于或等于指定数字的最大整数的数字。
