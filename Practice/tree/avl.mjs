import { Compare, defaultCompare } from '../unit.mjs';
import { Node } from '../node.mjs';
import { BinarySearchTree } from 'bst.mjs';
class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }


}