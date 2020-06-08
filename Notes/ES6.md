# ES6
## [let && const](https://es6.ruanyifeng.com/?search=map&x=0&y=0#docs/let)
ES6 明确规定，如果区块中存在let和const命令，则这个区块对这些命令的声明的变量从一开始就形成封闭作用域，只要在声明前使用这些变量，就会报错。（临时性死区，temporal dead zone，简称 TDZ）

- ```let```
  - let不像var那样会发生变量提升（hosting）现象，因此，变量一定要在声明后使用，否则会报错
  - 只要块级作用域内存在let命令，它所声明的变量就会被“绑定”（binding）在这个区域，不再受外部的影响
  - let不允许在相同作用域内重复声明同一个变量

- ```const```
  - 声明的时候就必须马上初始化，否则报错
  - 声明的值不能改变，不能重新进行赋值
  - 与let一样不存在变量提升
  - 与let一样不可重复进行声明

## [Map && Set](https://es6.ruanyifeng.com/?search=map&x=0&y=0#docs/set-map)
[如何利用Map提升性能](https://zhuanlan.zhihu.com/p/77897608)
- Map
  - 无限制的键（Key）
  - 直接遍历
  ```js
  for (let [key, value] of map) {
    console.log(key);
    console.log(value);
  };
  map.forEach((key, value) => {
    console.log(key);
    console.log(value);
  });
  ```

- Set
  
  Map的行为和Set非常相似，并且它们都包含一些相同的方法，包括：has、get、set、delete。它们两者都是键控集合，就是说你可以使用像forEach的方法来遍历元素，顺序是按照插入键值排列的。

  最大的不同是Map通过键值（key/value）成对出现，就像你可以把一个数组转换为Set，你也可以把二维数组转换为Map。

  Set 结构的实例有以下属性：

  - Set.prototype.constructor：构造函数，默认就是Set函数。
  - Set.prototype.size：返回Set实例的成员总数。
  - Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
    - Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
    - Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
    - Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
    - Set.prototype.clear()：清除所有成员，没有返回值。

## [Array](https://es6.ruanyifeng.com/?search=map&x=0&y=0#docs/array)

- Array.of() 用于将一组值，转换为数组
- keys()是对键名的遍历、values()是对键值的遍历，entries()
  ```js
    for (let index of ['a', 'b'].keys()) {
      console.log(index);
    }
    // 0
    // 1

  for (let elem of ['a', 'b'].values()) {
    console.log(elem);
  }
    // 'a'
    // 'b'

  for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
  }
    // 0 "a"
    // 1 "b"
  ```
- [from()](https://es6.ruanyifeng.com/?search=map&x=0&y=0#docs/array#Array-from) 用于将两类对象转为真正的数组
  ```js
  Array.from(arrayLike, x => x * x);
  // 等同于
  Array.from(arrayLike).map(x => x * x);

  Array.from([1, 2, 3], (x) => x * x)
  // [1, 4, 9]
  ```
- fill() 使用给定值，填充一个数组
  ```js
  ['a', 'b', 'c'].fill(7)
  // [7, 7, 7]

  new Array(3).fill(7)
  // [7, 7, 7]
  ```

- copyWithin() 在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组
  
  target（必需）：从该位置开始替换数据。如果为负值，表示倒数。

  start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。

  end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

  ```js
  // 将3号位复制到0号位
  [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
  // [4, 2, 3, 4, 5]

  // -2相当于3号位，-1相当于4号位
  [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
  // [4, 2, 3, 4, 5]

  // 将3号位复制到0号位
  [].copyWithin.call({length: 5, 3: 1}, 0, 3)
  // {0: 1, 3: 1, length: 5}

  // 将2号位到数组结束，复制到0号位
  let i32a = new Int32Array([1, 2, 3, 4, 5]);
  i32a.copyWithin(0, 2);
  // Int32Array [3, 4, 5, 4, 5]

  // 对于没有部署 TypedArray 的 copyWithin 方法的平台
  // 需要采用下面的写法
  [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
  // Int32Array [4, 2, 3, 4, 5]
  ```

- reverse() 反序输出
- sort() 排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变

常见的排序算法之中，插入排序、合并排序、冒泡排序等都是稳定的，堆排序、快速排序等是不稳定的。不稳定排序的主要缺点是，多重排序时可能会产生问题。假设有一个姓和名的列表，要求按照“姓氏为主要关键字，名字为次要关键字”进行排序。开发者可能会先按名字排序，再按姓氏进行排序。如果排序算法是稳定的，这样就可以达到“先姓氏，后名字”的排序效果。如果是不稳定的，就不行。

- indexOf() && lastIndexOf()
- find()--返回值（undefined） && findIndex()--返回索引（-1）
- toString() && join() 可以增加连接符


## [Iterator(遍历器) && for...of 迭代循环](https://es6.ruanyifeng.com/?search=map&x=0&y=0#docs/iterator)

Iterator 的遍历过程:

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
