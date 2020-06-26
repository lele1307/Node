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

    get(key){
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.val;
    }

    keyValues(){
        const valuePair = [];
        for (var k in this.table) {
            if (this.table.hasOwnProperty(k)) {
                valuePair.push(this.table[k])
            }
        }
        return valuePair;
    }

    keys(){
        return this.keyValues().map(valuePair => valuePair.key)
    }

    values(){
        return this.keyValues().map(valuePair => valuePair.val)
    }

    size(){
        return Object.keys(this.table).length;
    }

    isEmpty(){
        return this.size() === 0;
    }

    clear(){
        this.table = {};
    }
}