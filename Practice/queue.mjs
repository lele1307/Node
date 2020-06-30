export class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;//find first item
        this.items = {};
    }
    enqueue(elem){
        this.items[this.count] = elem;
        this.count++;
    }//队尾添加项

    dequeue(){
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }//移除首项，且返回被移除元素

    peek(){
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }

    isEmpty(){
        return this.count-this.lowestCount === 0;
    }

    size(){
        return this.count - this.lowestCount;
    }

    clear(){
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    toString(){
        if (this.isEmpty()) {
            return undefined;
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount+1; i< this.count; i++) {
            objString = `${objString},${items[i]}`;
        }
        return objString;
    }
}

class Deque extends Queue {
    constructor() {
        super();
    }

    addFront(elem){
        if (this.isEmpty()) {
            this.enqueue(elem);
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = elem;
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i-1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = elem;
        }
    }
    //addBack() === enqueue
    //removeFront() === dequeue
    removeBack() {
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    //peekFront() === peek
    //peekBack() === peekStack
}

function hotPotato(elemList,num) {
    const queue = new Queue();
    const elimitatedList = [];

    for (let i = 0; i < elemList.length; i++) {
        queue.enqueue(elemList[i]);
    }

    while (queue.size()>1){
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        elimitatedList.push(queue.dequeue());
    }

    return {
        eliminated:elimitatedList,
        winner:queue.dequeue()
    };
}

//test
const list = ['A','B','C','D','E','F'];
const result = hotPotato(list,7);
result.eliminated.forEach(name => {
    console.log(`${name} Out!`);
});
console.log(`Winner: ${result.winner}`);
console.log("------------------HOT POTATO END----------------");

function palindromeChecker(str){ //boolean
    if(str===undefined || str === null || (str !== null && str.length === 0)){
        return false;
    }

    const deque = new Deque();
    const lowestString = str.split(' ').join('').toLowerCase();
    let isEqual = true;
    let firstChar,lastChar;

    for (var i = 0; i < lowestString.length; i++) {
        deque.enqueue(lowestString.charAt(i));
    }

    while(deque.size() > 1 && isEqual){
        firstChar = deque.dequeue(); //removeFirst
        lastChar = deque.removeBack();
        if(firstChar !== lastChar){
            isEqual = false;
        }
    }

    return isEqual;
}

console.log('level: ',palindromeChecker('level'));