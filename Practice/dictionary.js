function defaultTosString(item){
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item == 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}

class ValuePair{
    constructor(key,val){
        this.key = key;
        this.val = val;
    }
    toString(){
        return `[#${this.key}:${this.val}]`
    }
}

class Dictionary {
    constructor(toStrFn = defaultTosString) {
        this.toStrFn = toStrFn;
        this.table = {};//table[key] = {key,val} 
        //[]可以直接获取对象属性
    }

    hasKey(key){
        return this.table[this.toStrFn(key)] != null;
    }

    set(key,val){
        if (key != null && val != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key,val);
            return true;
        }
        return false;
    }

    remove(key){
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
}