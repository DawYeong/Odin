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

  deleteItem(value) {
    // need to find node, as well as parent
    let parentNode = null;
    let currNode = this.#root;
    let dir = 0;
    while (currNode != null && currNode.getValue() != value) {
      parentNode = currNode;
      if (currNode.getValue() > value) {
        currNode = currNode.getLeft();
        dir = 0;
      } else {
        currNode = currNode.getRight();
        dir = 1;
      }
    }

    if (currNode === null) {
      // value does not exist
      return;
    }

    // check children
    const children = [];
    if (currNode.getLeft() != null) children.push(currNode.getLeft());
    if (currNode.getRight() != null) children.push(currNode.getRight());

    if (children.length === 0) {
      // just remove
      if (parentNode === null) {
        this.#root = null;
      } else {
        dir === 0 ? parentNode.setLeft(null) : parentNode.setRight(null);
      }
    } else if (children.length === 1) {
      // replace with immediate child
      if (parentNode === null) {
        this.#root = children[0];
      } else {
        dir === 0
          ? parentNode.setLeft(children[0])
          : parentNode.setRight(children[0]);
      }
    } else {
      // 2 children => find smallest greater value
      let rParent = null;
      let rCurr = children[1];

      while (rCurr.getLeft() != null) {
        rParent = rCurr;
        rCurr = rCurr.getLeft();
      }

      rParent != null ? rParent.setLeft(null) : currNode.setRight(null);
      currNode.setValue(rCurr.getValue());
    }
  }

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

  levelOrder() {
    const res = [];
    let workList = [this.#root];
    let newList = [];
    while (workList.length != 0) {
      newList = [];
      workList.forEach((item) => {
        res.push(item.getValue());
        if (item.getLeft() != null) newList.push(item.getLeft());
        if (item.getRight() != null) newList.push(item.getRight());
      });

      workList = newList;
    }

    return res;
  }

  inOrder(node = this.#root) {
    // left -> node -> right
    if (node === null) {
      return [];
    }

    const left = this.inOrder(node.getLeft());
    const right = this.inOrder(node.getRight());

    return [...left, node.getValue(), ...right];
  }

  preOrder(node = this.#root) {
    // node -> left -> right
    if (node === null) {
      return [];
    }

    const left = this.preOrder(node.getLeft());
    const right = this.preOrder(node.getRight());

    return [node.getValue(), ...left, ...right];
  }

  postOrder(node = this.#root) {
    // left -> right -> node;
    if (node === null) {
      return [];
    }

    const left = this.postOrder(node.getLeft());
    const right = this.postOrder(node.getRight());

    return [...left, ...right, node.getValue()];
  }

  height(node, height = 0) {
    if (node === null) return height - 1;
    const newHeight = height + 1;
    return Math.max(
      this.height(node.getLeft(), newHeight),
      this.height(node.getRight(), newHeight)
    );
  }

  depth(node, currNode = this.#root, depth = 0) {
    if (currNode === null || node === null) return -1; // node does not exist or tree is empty

    const newDepth = depth + 1;

    if (node.getValue() < currNode.getValue()) {
      return this.depth(node, currNode.getLeft(), newDepth);
    } else if (node.getValue() > currNode.getValue()) {
      return this.depth(node, currNode.getRight(), newDepth);
    } else {
      return depth;
    }
  }

  isBalanced() {}

  rebalance() {}
}
