import { LinkedList, Node } from "./linkedlist.js";

 

function hash(key, capacity) {
    let hashCode = 0;
    const primeNumber = 31;
    for(let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode = hashCode % capacity;
    }
    return hashCode;
}

class Pair{
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class hashMap {
    constructor() {
        this.maxLength = 16;
        this.buckets = Array(this.maxLength);
        this.length = 0;
        this.loadFactor = 0.75; 
    }
    resize() {
        let newArray = Array(this.maxLength * 2);
        for(let i = 0; i <= this.maxLength; i++) {
            if(this.buckets[i] != null) {
                let currentList = this.buckets[i];
                let tmp = currentList.firstNode;
                while(tmp != null) {
                    if(newArray[hash(tmp.value.key, this.maxLength*2)] === undefined) {
                        let currentList = new LinkedList();
                        let currentNode = new Node(tmp.value)
                        currentList.append(currentNode);
                        newArray[hash(tmp.value.key, this.maxLength*2)] = currentList;
                    } else {
                        let currentList = newArray[hash(tmp.value.key, this.maxLength*2)]
                        currentList.append(new Node(tmp.value))
                        newArray[hash(tmp.value.key, this.maxLength*2)] = currentList;
                    }
                    tmp = tmp.nextNode;
                }
            }
        }
        this.buckets = newArray;
        this.maxLength *= 2;
        this.capacity = this.length / this.maxLength;
    }
    set(key, value) {
        if (hash(key, this.maxLength) < 0 || hash(key, this.maxLength) >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if(this.capacity == this.loadFactor) {
            this.resize();
        }
        if(this.buckets[hash(key, this.maxLength)] === undefined) {
            let currentList = this.buckets[hash(key, this.maxLength)] = new LinkedList();
            let currentPair = new Pair(key, value);
            let currentNode = new Node(currentPair);
            currentList.append(currentNode)
            this.length++;
        } else {
            let currentList = this.buckets[hash(key, this.maxLength)];
            let tmp = currentList.firstNode;
            let foundFlag = false;
            while(tmp != null) {
                if(tmp.value.key == key) {
                    tmp.value.value = value;
                    foundFlag = true;
                }
                tmp = tmp.nextNode;
            }
            if(foundFlag == false) {
                let currentPair = new Pair(key, value);
                let currentNode = new Node(currentPair)
                currentList.append(currentNode);
                this.length++;
                this.capacity = this.length / this.maxLength
            }
        }  
    }
    get(key) {
        if(this.buckets[hash(key, this.maxLength)] != undefined) {
            let tmp = this.buckets[hash(key, this.maxLength)].firstNode;
            while(tmp != null) {
                if(tmp.value.key == key) {
                    return tmp.value.value;
                }
                tmp = tmp.nextNode;
            }
        }
        return null;
    }
    has(key) {
        if(this.buckets[hash(key, this.maxLength)] != undefined) {
            let tmp = this.buckets[hash(key, this.maxLength)].firstNode;
            while(tmp != null) {
                if(tmp.value.key == key) {
                    return true;
                }
                tmp = tmp.nextNode;
            }
        }
        return false;
    }
    remove(key) {
        if(this.buckets[hash(key, this.maxLength)] != undefined) {
            let tmp = this.buckets[hash(key, this.maxLength)].firstNode;
            let index = 0;
            while(tmp != null) {
                if(tmp.value.key == key) {
                    if(index == 0) {
                        this.buckets[hash(key, this.maxLength)].firstNode = this.buckets[hash(key, this.maxLength)].firstNode.nextNode;
                        this.buckets[hash(key, this.maxLength)].lastIndex--;
                        if(this.buckets[hash(key, this.maxLength)].lastIndex == 0) {
                            this.buckets[hash(key, this.maxLength)] = undefined;
                        }
                        this.length--;
                    } else {
                        let tmp = this.buckets[hash(key, this.maxLength)].firstNode;
                        let count = 0;
                        while(count != index-1) {
                            tmp = tmp.nextNode;
                        }
                        tmp.nextNode = tmp.nextNode.nextNode;
                        this.buckets[hash(key, this.maxLength)].lastIndex--;
                        this.length--;
                    }
                    return true;
                }
                index++;
                tmp = tmp.nextNode;
            }
        }
        return false;
    }
    length() {
        return this.length;
    }
    clear() {
        this.buckets = Array(this.maxLength);
        this.length = 0;
        this.capacity = 0;
    }
    keys() {
        let keysArray = [];
        this.buckets.forEach(element => {
            if(element != undefined) {
                let tmp = element.firstNode;
                while(tmp != null) {
                    keysArray.push(tmp.value.key)
                    tmp = tmp.nextNode;
                }
            }
        });
        return keysArray;
    }
    values() {
        let valuesArray = [];
        this.buckets.forEach(element => {
            if(element != undefined) {
                let tmp = element.firstNode;
                while(tmp != null) {
                    valuesArray.push(tmp.value.value)
                    tmp = tmp.nextNode;
                }
            }
        });
        return valuesArray;
    }
    entries() {
        let entriesArray = [];
        this.buckets.forEach(element => {
            if(element != undefined) {
                let tmp = element.firstNode;
                while(tmp != null) {
                    let duo = [tmp.value.key, tmp.value.value]
                    entriesArray.push(duo)
                    tmp = tmp.nextNode;
                }
            }
        });
        return entriesArray;
    }
}

const test = new hashMap();
console.log(test);
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test);
test.set('moon', 'silver')
console.log(test);
// console.log(test.remove('grape'));
console.log(test)
console.log(test.length);
// test.clear();
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.set('kite', 'maroon')

console.log(test)

