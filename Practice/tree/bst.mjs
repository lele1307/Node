import { Compare, defaultCompare } from '../unit.mjs';
import { Node } from '../node.mjs';
export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null;
    }

    getRoot() {
        return this.root;
    }
    

    insert(key){
        if (this.root == null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root,key);
        }
    }

    insertNode(node,key){
        if (this.compareFn(key,node.key) === Compare.LESS_THAN) {
            if(node.left == null){
                node.left = new Node(key);
            } else {
                this.insertNode(node.left,key);
            }
        } else {
            if(node.right == null){
                node.right = new Node(key);
            } else {
                this.insertNode(node.right,key);
            }
        }
    }

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    
    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root,callback);
    }

    preOrderTraverseNode(node,callback){
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left,callback);
            this.preOrderTraverseNode(node.right,callback);
        }
    }

    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    min(){
        return this.minNode(this.root);
    }

    minNode(node){
        let curr = node;
        while (curr != null && curr.left != null) {
            curr = curr.left;
        }
        return curr;
    }

    max() {
        return this.maxNode(this.root);
    }
    
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }

    search(key){
        return this.searchNode(this.root,key);
    }

    searchNode(node,key){
        if (node == null) {
            return false;
        }
        if (this.compareFn(key,node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left,key);
        } else if (this.compareFn(key,node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right,key);
        } else {
            return true;
        }
    }
}

const bst = new BinarySearchTree();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);
const printNode = (val) => console.log(val);
//bst.inOrderTraverse(printNode);
//console.log('-----------------');
//bst.preOrderTraverse(printNode);
//console.log('-----------------');
//bst.postOrderTraverse(printNode);
console.log('-----------------');
console.log('MIN: '+bst.min()); 
console.log('MAX: '+bst.max());
console.log('-----------------');
console.log(bst.search(1));
console.log(bst.search(8));