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
