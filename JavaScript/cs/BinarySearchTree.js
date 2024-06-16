class Node {
  #val;
  #left;
  #right;

  constructor(val) {
    this.#val = val;
    this.#left = null;
    this.#right = null;
  }

  getValue() {
    return this.#val;
  }

  getRight() {
    return this.#right;
  }

  getLeft() {
    return this.#left;
  }

  setValue(val) {
    this.#val = val;
  }

  setRight(node) {
    this.#right = node;
  }

  setLeft(node) {
    this.#left = node;
  }
}

class Tree {
  #root;

  constructor(arr) {
    this.#root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    const uniqueArr = [...new Set(arr)];
    uniqueArr.sort(function (a, b) {
      return a - b;
    });

    const createTree = (a, start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(a[mid]);

      node.setLeft(createTree(a, start, mid - 1));
      node.setRight(createTree(a, mid + 1, end));

      return node;
    };

    return createTree(uniqueArr, 0, uniqueArr.length - 1);
  }

  prettyPrint(node = this.#root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.getRight() !== null) {
      this.prettyPrint(
        node.getRight(),
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getValue()}`);
    if (node.getLeft() !== null) {
      this.prettyPrint(
        node.getLeft(),
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  insert(value) {
    const insertRec = (node) => {
      if (node === null) {
        return new Node(value);
      }

      if (node.getValue() > value) {
        // move left
        node.setLeft(insertRec(node.getLeft(), value));
      } else if (node.getValue() < value) {
        node.setRight(insertRec(node.getRight(), value));
      }
      // if already in list, we stop traversal

      return node;
    };

    const newNode = insertRec(this.#root);

    if (this.#root === null) {
      this.#root = newNode;
    }
  }

  deleteItem(value) {}

  find(value) {
    const findRec = (node) => {
      if (node === null) return null;

      if (node.getValue() === value) {
        return node;
      } else if (node.getValue() > value) {
        return findRec(node.getLeft());
      } else {
        return findRec(node.getRight());
      }
    };

    return findRec(this.#root);
  }

  levelOrder() {}

  inOrder() {}

  preOrder() {}

  postOrder() {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}
