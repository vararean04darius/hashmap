import { LinkedList, Node } from "./linkedlist.js";

 

function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for(let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode = hashCode % 16;
    }
    console.log(hashCode);
    return hashCode;
}


class hashMap {
    constructor() {
        this.buckets = Array(16);
        this.length = 0;
        this.maxLength = 16;
        this.loadFactor = 0.75; 
    }
    set(key, value) {
        this.buckets[hash(key)] = value;
        this.length++;
        this.capacity = ((this.length * 100 ) / this.maxLength) / 100; 
    }
}

let list = new LinkedList();
let node = new Node("john");
console.log(node)