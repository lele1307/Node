import Node from './node.mjs'
export default class LinkedList {
    constructor(){
        this._head = null;
        this._count = 0;
    }

    size(){
        return this._count;
    }

    isEmpty(){
        return this.size() === 0;
    }

    getHead(){
        return this._head;
    }

    push(element){
        const node = new Node(element);
        let current;
        if (this._head === null) {
            this._head = node;
        } else {
            current = this._head;
            while(current.next !== null){
                current = current.next;
            }
            current.next = node;
        }
        this._count++;
    }

    removeAt(index){
        if (index >= 0 && index <= this._count) {
            let current = this._head;

            if(index === 0){
                this._head = current.next;
            } else {
                /* let previous;
                for(let i=0; i<index;i++){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next; */
                const previous = this.getElementAt(index-1);
                current = previous.next;
            }
            this._count--;
            return current.element;
        }
        return undefined;
    }

    remove(element){
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    getElementAt(index){
        if (index >= 0 && index <= this._count) {
            let current = this._head;
            for (let i = 0; i < index && current != null; i++) {
                current = current.next;
            }
            return current;
        }
        return undefined;
    }

    indexOf(element){
        let current = this._head;
        for(let i=0; i<this._count && current!=null; i++){
            if (current.element === element) {
                return i;
            }
        }
        return -1;
    }

    toString(){
        if (this._head === null) {
            return '';
        }

        let objString = `${this._head.element}`;
        let current = this._head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}

const linkedList = new LinkedList();
linkedList.push(1);
linkedList.removeAt(0);
linkedList.push(1);
console.log(linkedList.toString());
