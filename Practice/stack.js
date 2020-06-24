class Stack {
    constructor(){
        this.count = 0;
        this.item = {};
    }

    push(elem){
        this.item[this.count] = elem;
        this.count++;
    }

    pop(){
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        const result = this.item[this.count];
        delete this.item[this.count];
        return result;
    }

    isEmpty(){
        return this.count === 0;
    }

    peek(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.item[this.count-1];
    }

    clear(){
        this.item = {};
        this.coun  = 0;
    }
}

function decimalToBinary(decNum) {
    const remStack = new Stack();
    let num = decNum;
    let rem;
    let binaryStr = '';

    while (num > 0){
        rem = Math.floor(num % 2);
        remStack.push(rem);
        num = Math.floor(num / 2);
    }

    while (!remStack.isEmpty()){
        binaryStr += remStack.pop().toString();
    }
    
    return binaryStr;
}

console.log(decimalToBinary(233));