class Node {
  #val;
  #left;
  #right;

  constructor(val) {
    this.#val = val;
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

    return createTree(uniqueArr, 0, uniqueArr.length);
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

  insert(value) {}

  deleteItem(value) {}

  find(value) {}

  levelOrder() {}

  inOrder() {}

  preOrder() {}

  postOrder() {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}
