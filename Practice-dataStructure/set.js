/* class Set {
    constructor() {
        this.items = {}
    }

    has(element){
        return Object.prototype.hasOwnProperty.call(this.items,element);
    }

    add(element){
        if (!this.has(element)) {
            this.items[element] = element; //key-val save
            return true;
        }
        return false;
    }

    delete(element){
        if (!this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }

    clear(){
        return this.items = {};
    }

    sizeLegacy(){
        let count = 0;
        for (const key in this.items) {
            if (this.items.hasOwnProperty(key)) {//包含额外属性 因此不能直接迭代
                count++;
            }
        }
        return count;
    }

    values(){
        //return Object.values(this.items);//ES2017
        let vals = [];
        for (var key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                vals.push(key);
            }
        }
        return vals;
    }

    union(otherSet){
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

    intersection(otherSet){
        const intersectionSet = new Set();
        const values = this.values();
        for (var i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }

    difference(otherSet){
        const differenceSet = new Set();
        const values = this.values();
        for (var i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    }

    isSubsetOf(otherSet){
        if (this.sizeLegacy() > otherSet.sizeLegacy()) {
            return false;
        }
        let isSubset = true;
        this.values().every(value =>{
            if (!otherSet.has(value)) {
                isSubset = false;
                return  false;//目的是停止迭代值
            }
            return true;
        });
        return isSubset;
    }
} */

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(5);
/* const intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values()); */

//扩展运算符的集合运算
console.log(new Set([...setA, ...setB]));
console.log(new Set([...setA].filter(x => setB.has(x))));
console.log(new Set([...setA].filter(x => !setB.has(x))));