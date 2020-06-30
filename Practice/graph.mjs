import { Dictionary } from './dictionary.mjs'
class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = []; //顶点
        this.adjList = new Dictionary();
    }
}