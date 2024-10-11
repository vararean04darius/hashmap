export class LinkedList{
    lastIndex = 0;
    firstNode = null;
    lastNode = null;
    constructor() {
        this.firstNode = null;
        this.lastNode = null;
    }
    // constructor(node) {
    //     this.firstNode = node;
    //     this.lastNode = node;
    //     this.lastIndex++;
    // }
    append(node) {
        if(this.firstNode == null) {
            this.firstNode = node;
            this.lastNode = node;
            this.lastIndex++;
        } else {
            let tmp = this.firstNode;
            while(tmp.nextNode != null) {
                tmp = tmp.nextNode;
            }
            tmp.nextNode = node;
            this.lastIndex++;
            this.lastNode = node;
        }
    }
    prepend(node) {
        if(this.firstNode == null) {
            this.firstNode = node;
            this.lastNode = node;
            this.lastIndex++;
        } else {
            node.nextNode = this.firstNode;
            this.firstNode = node;
            let tmp = node.nextNode;
            while(tmp != null) {
                tmp = tmp.nextNode;
            }
            this.lastIndex++;
        }
    }
    size() {
        return this.lastIndex;
    }
    head() {
        return this.firstNode;
    }
    tail() {
        return this.lastNode;
    }
    at(index) {
        if(index >= this.lastIndex || index < 0) {
            return alert("you're searching for an element that is outside of the list")
        }
        let tmp = this.firstNode;
        while(index) {
            tmp = tmp.nextNode;
            index--;
        }
        return tmp;
    }
    pop() {
        if(this.lastNode == null) {
            return alert("you're trying to pop the last element from an empty array")
        }
        let tmp = this.firstNode;
        while(tmp.nextNode.nextNode != null) {
            tmp = tmp.nextNode;
        }
        let popped = tmp.nextNode;
        tmp.nextNode = null;
        this.lastIndex--;
        this.lastNode = tmp;
        return popped;
    }
    contains(elem){
        if(this.lastNode == null) {
            return alert("you're searching for something inside an empty array")
        }
        let tmp = this.firstNode;
        while(tmp != null) {
            if(tmp.value === elem) {
                return true;
            } 
            tmp = tmp.nextNode;
        }
        return false;
    }
    find(val){
        if(this.lastNode == null) {
            return;
        }
        let tmp = this.firstNode;
        let index = 0;
        while(tmp != null) {
            if(tmp.value === val) {
                return index;
            }
            index++;
            tmp = tmp.nextNode;
        }
        return;
    }
    toString() {
        if(this.lastIndex == 0 ) {
            return alert("empty list")
        }
        let myString = "";
        let tmp = this.firstNode;
        while(tmp.nextNode != null) {
            myString +="( " + tmp.value + " ) -> "
            tmp = tmp.nextNode;
        }
        myString +="( " + tmp.value + " ) -> null";
        return myString;
    }
    insertAt(value, index) {
        if(this.lastNode == null) {
            return alert("can't insert to this value because list is empty")
        }
        if(this.lastIndex < index) {
            return alert("can't insert to this value because list is not that long")
        }
        if(index == 0) {
            let tempNode = new Node(value)
            tempNode.nextNode = this.firstNode;
            let tmp = this.firstNode
            this.firstNode = tempNode;
            while(tmp!=null) {
                tmp = tmp.nextNode;
            }
        } else {
            let tmp = myList.at(index-1);
            let oldNext = tmp.nextNode;
            let tempNode = new Node(value);
            tmp.nextNode = tempNode;
            if(oldNext == null) {
                this.lastNode = tempNode;
            }
            tempNode.nextNode = oldNext;
            tmp = tmp.nextNode
            while(tmp != null) {
                tmp = tmp.nextNode;
            }
        }
        this.lastIndex++;
    }
    removeAt(ind) {
        if(this.lastNode == null) {
            return alert("can't remove at this value because list is empty")
        }
        if(this.lastIndex <= ind) {
            return alert("can't remove at this value because list is not that long")
        }
        if(ind == 0) {
            this.firstNode = this.firstNode.nextNode;
            let tmp = this.firstNode;
            while(tmp != null) {
                tmp = tmp.nextNode;
            }
        } else {
            let curr = myList.at(ind-1);
            curr.nextNode = curr.nextNode.nextNode;
            if(curr.nextNode == null) {
                this.lastNode = curr;
            }
            let tmp = curr.nextNode;
            while(tmp != null) {
                if(this.lastNode == null) {
                    this.lastNode = tmp.nextNode;
                }
                tmp = tmp.nextNode;
            }
        }
        this.lastIndex--;
    }
}


export class Node{
    constructor(value = null, nextNode = null){
        this.value = value;
        this.nextNode = nextNode;
    }
}