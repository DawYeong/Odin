class Node {
  #key;
  #val;
  #next;
  constructor(key, val) {
    this.#key = key;
    this.#val = val;
    this.#next = null;
  }

  getKey() {
    return this.#key;
  }

  getValue() {
    return this.#val;
  }

  setNext(next) {
    this.#next = next;
  }

  setValue(val) {
    this.#val = val;
  }

  getNext() {
    return this.#next;
  }
}

class LinkedList {
  #head;
  #size;
  #tail;
  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  #addToEmpty(key, value) {
    const newNode = new Node(key, value);
    this.#head = newNode;
    this.#tail = newNode;
  }

  #incrementSize() {
    this.#size += 1;
  }

  #decrementSize() {
    this.#size -= 1;
  }

  append(key, value) {
    // At to end of list (tail)
    if (this.#size === 0) {
      this.#addToEmpty(key, value);
    } else {
      const newNode = new Node(key, value);
      this.#tail.setNext(newNode);
      this.#tail = newNode;
    }

    this.#incrementSize();
  }

  prepend(value) {
    // Add to start of list (head)
    if (this.#size === 0) {
      this.#addToEmpty(key, value);
    } else {
      const newNode = new Node(key, value);
      newNode.setNext(this.#head);
      this.#head = newNode;
    }

    this.#incrementSize();
  }

  size() {
    return this.#size;
  }

  head() {
    return this.#head;
  }

  tail() {
    return this.#tail;
  }

  at(index) {
    let i = 0;
    let currNode = this.#head;
    while (currNode != null) {
      if (i === index) {
        return currNode;
      }
      i += 1;
      currNode = currNode.getNext();
    }

    return currNode;
  }

  pop() {
    // removes end of list
    if (this.#size === 0) return;

    if (this.#size === 1) {
      this.#head = null;
      this.#tail = null;
    } else {
      let currNode = this.#head;
      let nextNode = currNode.getNext();
      while (nextNode != this.#tail) {
        currNode = nextNode;
        nextNode = nextNode.getNext();
      }

      currNode.setNext(null);
      this.#tail = currNode;
    }
    this.#decrementSize();
  }

  contains(key) {
    let currNode = this.#head;
    while (currNode != null) {
      if (currNode.getKey() === key) {
        return true;
      }
      currNode = currNode.getNext();
    }
    return false;
  }

  find(key) {
    // finds first element
    let i = 0;
    let currNode = this.#head;
    while (currNode != null) {
      if (currNode.getKey() === key) {
        return i;
      }
      i += 1;
      currNode = currNode.getNext();
    }

    return -1;
  }

  findNodeByKey(key) {
    let currNode = this.#head;
    while (currNode != null) {
      if (currNode.getKey() === key) {
        return currNode;
      }
      currNode = currNode.getNext();
    }

    return null;
  }

  toString() {
    // (value) -> (value) -> (value) -> null
    let result = [];
    let currNode = this.#head;
    while (currNode != null) {
      result.push(`( ${currNode.getValue()} )`);
      currNode = currNode.getNext();
    }

    result.push("null");
    return result.join(" -> ");
  }

  insertAt(key, value, index) {
    this.#incrementSize();
    let currIndex = 0;
    let prevNode = null;
    let currNode = this.#head;
    const newNode = new Node(key, value);

    if (index >= this.#size) {
      this.#tail.nextNode(newNode);
      this.#tail = newNode;
      return;
    }

    while (currNode != null) {
      if (currIndex === index) {
        if (prevNode != null) {
          prevNode.setNext(newNode);
        } else {
          this.#head = newNode;
        }
        newNode.setNext(currNode);
        return;
      }
      currIndex += 1;
      prevNode = currNode;
      currNode = currNode.getNext();
    }
  }

  removeAt(index) {
    if (index >= this.#size) {
      console.log("Index out of range");
      return;
    }

    let currIndex = 0;
    let prevNode = null;
    let currNode = this.#head;

    while (currNode != null) {
      if (currIndex != index) {
        currIndex += 1;
        prevNode = currNode;
        currNode = currNode.getNext();
      } else {
        if (prevNode === null) {
          // replace head;
          this.#head = currNode.getNext();
        } else {
          prevNode.setNext(currNode.getNext());
        }
        break;
      }
    }

    this.#decrementSize();
  }

  getNodes() {
    const result = [];
    let currNode = this.#head;
    while (currNode != null) {
      result.push([currNode.getKey(), currNode.getValue()]);
      currNode = currNode.getNext();
    }

    return result;
  }
}

module.exports = { LinkedList };
