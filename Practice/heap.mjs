import { swap,Compare,defaultCompare,reverseCompare } from './unit.mjs'
class MinHeap {
    constructor( compareFn = defaultCompare , swapInHeap = swap ) {
        this.compareFn = compareFn;
        this.swapInHeap = swapInHeap;
        this.heap = [];
    }

    getLeftIndex(index){
        return 2 * index + 1;
    }

    getRightIndex(index){
        return 2 * index + 2;
    }

    getParentIndex(index){
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index-1) / 2);
    }

    insert(val){
        if (val != null) {
            this.heap.push(val);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }

    siftUp(index){
        let parent = this.getParentIndex(index);
        while(
            index > 0 &&
            this.compareFn(this.heap[parent],this.heap[index]) > Compare.BIGGER_THAN
        ){
            this.swapInHeap(this.heap,parent,index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }

    extract(){//移除最小值or最大值
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removeValue = this.heap.shift();
        this.siftDown(0);
        return removeValue;
    }

    siftDown(index){
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();

        if(
            left < size &&
            this.compareFn(this.heap[element],this.heap[left]) > Compare.BIGGER_THAN
        ){
            element = left;
        }

        if(
            right < size &&
            this.compareFn(this.heap[element],this.heap[right]) > Compare.BIGGER_THAN
        ){
            element = right;
        }

        if(index !== element){
            swap(this.heap,index,element);
            this.siftDown(element);
        }
    }

    findMinimum(){ //返回最小值或最大值
        return this.isEmpty() ? undefined : this.heap[0];
    }

    size(){
        return this.heap.length;
    }

    isEmpty(){
        return this.size === 0;
    }
}

const heap = new MinHeap();
for (var i = 0; i < 10; i++) {
    heap.insert(i);
}
console.log('MINheap'+heap.extract());

class Maxheap extends MinHeap {
    constructor( compareFn = defaultCompare, reverseCompare){
        super(compareFn);
        this.compareFn = reverseCompare(compareFn);
    }
}

