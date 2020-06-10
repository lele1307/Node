var map = new Map();
map.set('name','Amy');
map.set('password','123456');
//console.log(map);
for (const [key,val] of map) {
    console.log(key);
    console.log(val);
}
//解构赋值