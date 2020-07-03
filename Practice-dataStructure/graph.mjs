import { Dictionary } from './dictionary.mjs'
import { initColor,Color } from './unit.mjs'
import { Queue } from './queue.mjs'
import { Stack } from './stack.mjs'
export class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = []; //顶点
        this.adjList = new Dictionary();
    }

    addVertex(v){
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v,[]);
        }
    }

    addEdge(v,w){
        if (!this.adjList.get(v)) {
            this.addVertex(v);
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w)
        }
        this.adjList.get(v).push(w);
        if (!this.isDirected) {
            this.adjList.get(w).push(v);
        }
    }

    getVertices(){
        return this.vertices;
    }

    getAdjList(){
        return this.adjList;
    }

    toString(){
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            s+= `${this.vertices[i]} ->`;
            const neighbors = this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s+= ` ${neighbors[j]} `;
            }
            s+= '\n';
        }
        return s;
    }
}

const graph = new Graph();
const myVertices = ['A','B','C','D','E','F','G','H','I'];
for (var i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A','D');
graph.addEdge('C','D');
graph.addEdge('C','G');
graph.addEdge('D','G');
graph.addEdge('D','H');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('E','I');

console.log(graph.toString());
console.log('-----------------------');

/**
*  BFS -> Queue
*  DFS -> Stack
*/
export const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initColor(vertices);
    const queue = new Queue();
    queue.enqueue(startVertex);

    while(!queue.isEmpty()){
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Color.GRAY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Color.WHITE) {
                color[w] = Color.GRAY;
                queue.enqueue(w);
            }
        }
        color[u] = Color.BLACK;
        if(callback){
            callback(u);
        }
    }
}

const printVertex = (value) => console.log('Visited Vertex: ' + value);
breadthFirstSearch(graph,myVertices[0],printVertex);

const BFS = (graph,startVertex) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initColor(vertices);
    const queue = new Queue();
    const distances = {};
    const predecessors = {}; //前溯点
    queue.enqueue(startVertex);

    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0;
        predecessors[vertices[i]] = null;
    }

    while(!queue.isEmpty()){
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Color.GRAY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Color.WHITE) {
                color[w] = Color.GRAY;
                distances[w] = distances[u]+1;
                predecessors[w] = u;
                queue.enqueue(w);
            }
        }
        color[u] = Color.BLACK;
    }
    return {
        distances,
        predecessors
    };
}
const shortestPathA = BFS(graph,myVertices[0]);
console.log(shortestPathA);
console.log('-----------------------');

const fromVertex = myVertices[0];
for (let i = 1; i < myVertices.length; i++) {
    const toVertex = myVertices[i];
    const path = new Stack();
    for (let v = toVertex; v !== fromVertex; v=shortestPathA.predecessors[v]) {
        path.push(v);
    }
    path.push(fromVertex);
    let s = path.pop();
    while(!path.isEmpty()){
        s+= ' - ' + path.pop()    
    }
    console.log(s);
}

const depthFirstSearch = ( graph , callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initColor(vertices);
    for (let i = 0; i < vertices.length; i++) {
        if(color[vertices[i]] === Color.WHITE) {
            depthFirstSearchVisit(vertices[i],color,adjList,callback);
        }
    }
}

const depthFirstSearchVisit = (u,color,adjList,callback) => {
    color[u] = Color.GRAY;
    if (callback) {
        callback(u);
    }
    const neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if (color[w] === Color.WHITE) {
            depthFirstSearchVisit(w,color,adjList,callback);
        }
    }
    color[u] = Color.BLACK;
}

//depthFirstSearch(graph,printVertex);