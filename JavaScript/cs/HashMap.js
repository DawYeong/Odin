const { LinkedList } = require("./LinkedList.js");

// no size adjustment
class HashMap {
  #buckets;
  #bucketSize;
  #numEntries;

  constructor() {
    this.#bucketSize = 64;
    this.#initBucket();
  }

  #initBucket() {
    this.#buckets = [];
    this.#numEntries = 0;
    for (let i = 0; i < 64; i++) {
      this.#buckets.push(new LinkedList());
    }
  }

  #getInd(key) {
    return this.hash(key) % this.#bucketSize;
  }

  hash(key) {
    // only handles strings
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const ind = this.#getInd(key);
    const node = this.#buckets[ind].findNodeByKey(key);
    if (node === null) {
      this.#buckets[ind].append(key, value);
      this.#numEntries += 1;
    } else {
      node.setValue(value);
    }
  }

  get(key) {
    const ind = this.#getInd(key);
    const node = this.#buckets[ind].findNodeByKey(key);

    return node === null ? node : node.getValue();
  }

  has(key) {
    const ind = this.#getInd(key);
    return this.#buckets[ind].findNodeByKey(key) != null;
  }

  remove(key) {
    const ind = this.#getInd(key);
    const nodeInd = this.#buckets[ind].find(key);

    if (nodeInd != 1) {
      this.#buckets[ind].removeAt(nodeInd);
      this.#numEntries -= 1;
    }
  }

  length() {
    return this.#numEntries;
  }

  clear() {
    this.#initBucket();
  }

  keys() {
    const keys = [];

    this.#buckets.forEach((bucket) => {
      keys.push(...bucket.getNodes().map((entry) => entry[0]));
    });

    return keys;
  }

  values() {
    const values = [];

    this.#buckets.forEach((bucket) => {
      values.push(...bucket.getNodes().map((entry) => entry[1]));
    });

    return values;
  }

  entries() {
    const entries = [];

    this.#buckets.forEach((bucket) => {
      entries.push(...bucket.getNodes());
    });

    return entries;
  }
}

module.exports = { HashMap };
