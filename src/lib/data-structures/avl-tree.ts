class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
  parent: Node<T> | null;
  height: number;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.height = 0;
  }
}

class AVLTree<T> {
  root: Node<T> | null;

  /**
   * Function used to determine the order of the elements.
   * It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise.
   *
   * @param a - The first item to compare.
   * @param b - The second item to compare.
   * @returns A negative number if `a` is less than `b`, 0 if they are equal,
   *          or a positive number if `a` is greater than `b`.
   */
  compareFn: (a: T, b: T) => Promise<number>;

  constructor(compareFn: (a: T, b: T) => Promise<number>) {
    this.root = null;
    this.compareFn = compareFn;
  }

  async insert(value: T) {
    // Define an inner helper function for the recursive insertion
    const insertHelper = async (
      node: Node<T> | null,
      parent: Node<T> | null = null
    ) => {
      // If the current node is null, this means we've found the place to insert the new value
      if (!node) {
        // Create a new node with the value
        const newNode = new Node(value);
        // Set the parent of the new node to be the passed in parent node
        newNode.parent = parent;
        // Return the newly created node
        return newNode;
      }

      [].sort();
      // If the value to insert is less than the value of the current node

      const comparisonResult = await this.compareFn(value, node.value);

      if (comparisonResult < 0) {
        // Recursively call 'insertHelper' on the left child, passing in the current node as the parent
        node.left = await insertHelper(node.left, node);
      } else if (comparisonResult >= 0) {
        // If the value to insert is greater than the value of the current node
        // Recursively call 'insertHelper' on the right child, passing in the current node as the parent
        node.right = await insertHelper(node.right, node);
      }
      // After the recursive calls, update the height of the current node
      // This is done after because the node's height may change due to the insert
      this._updateHeight(node);
      // Balance the node and return it. This is to ensure that AVL tree properties are maintained
      return this._balance(node);
    };
    // Call the 'insertHelper' function on the root node
    this.root = await insertHelper(this.root);
    // Ensure that the root node's parent is null after insertions
    if (this.root?.parent) {
      this.root.parent = null;
    }
  }

  //   delete(value:T) {
  //     // Define an inner helper function for the recursive deletion
  //     const deleteNode = (value:T, node:Node<T>|null) => {
  //       // If the current node is null, this means the value is not found in the tree
  //       if (!node) {
  //         return null;
  //       }
  //       // If the value to delete is less than the value of the current node
  //       if (value < node.value) {
  //         // Recursively call 'deleteNode' on the left child
  //         node.left = deleteNode(value, node.left);
  //       } else if (value > node.value) {
  //         // If the value to delete is greater than the value of the current node
  //         // Recursively call 'deleteNode' on the right child
  //         node.right = deleteNode(value, node.right);
  //       } else {
  //         // If the value is found
  //         // Case 1: Node is a leaf node
  //         if (!node.left && !node.right) {
  //           return null;
  //         } else if (!node.left) {
  //           // Case 2: Node has only right child
  //           // Assign the parent of the node to be deleted to its right child
  //           node.right!.parent = node.parent;
  //           // Return right child
  //           return node.right;
  //         } else if (!node.right) {
  //           // Case 3: Node has only left child
  //           // Assign the parent of the node to be deleted to its left child
  //           node.left.parent = node.parent;
  //           // Return left child
  //           return node.left;
  //         } else {
  //           // Case 4: Node has two children
  //           // Find the in-order successor (minimum value in right subtree)
  //           const successor = this._findMin(node.right)!;
  //           // Replace the value of the node to be deleted with the value of the successor
  //           node.value = successor.value;
  //           // Delete the successor
  //           node.right = deleteNode(successor.value, node.right);
  //         }
  //       }
  //       // After the recursive calls, update the height of the current node
  //       // This is done after because the node's height may change due to the delete
  //       this._updateHeight(node);
  //       // Balance the node and return it. This is to ensure that AVL tree properties are maintained
  //       return this._balance(node);
  //     };
  //     // Call the 'deleteNode' function on the root node
  //     this.root = deleteNode(value, this.root);
  //     // Ensure that the root node's parent is null after deletions
  //     // because root node parent should always be null.
  //     if (this.root && this.root.parent) {
  //       this.root.parent = null;
  //     }
  //   }

  _balance(node: Node<T> | null) {
    // The balance function is used to restore the balance of an AVL tree
    // after an insertion or deletion operation that might have caused imbalance.

    // If the node is null, simply return the null node
    if (!node) {
      return node;
    }

    // Compute the balance factor of the node
    // The balance factor of a node is the difference in height between its left and right subtrees
    const nodeBF = this._getBalanceFactor(node);

    // Check if the left subtree is heavy (balance factor > 1)
    if (nodeBF > 1) {
      // Check if the left subtree is right heavy
      // This is the case of Left-Right imbalance
      // which requires a Left-Right rotation to fix
      if (this._getBalanceFactor(node.left!) < 0) {
        return this._leftRightRotation(node);
      }
      // If the left subtree is left heavy, a simple Right rotation is enough to restore balance
      return this._rightRotation(node);
    }
    // Check if the right subtree is heavy (balance factor < -1)
    else if (nodeBF < -1) {
      // Check if the right subtree is left heavy
      // This is the case of Right-Left imbalance
      // which requires a Right-Left rotation to fix
      if (this._getBalanceFactor(node.right!) > 0) {
        return this._rightLeftRotation(node);
      }
      // If the right subtree is right heavy, a simple Left rotation is enough to restore balance
      return this._leftRotation(node);
    }

    // If the node is already balanced, no rotation is required, simply return the node
    return node;
  }

  _updateHeight(node: Node<T>) {
    // To update the height of a node in an AVL tree, we first calculate the height of its left and right subtrees using the '_getNodeHeight' method
    const leftSubtreeHeight = this._getNodeHeight(node.left);
    const rightSubtreeHeight = this._getNodeHeight(node.right);

    // The height of a node is defined as 1 plus the maximum height of its left or right subtree
    // This is based on the definition of the height of a node in a binary tree (the number of edges on the longest downward path from the node to a leaf)
    // We use the built-in 'Math.max' function to find the maximum between the heights of the left and right subtrees
    // Then, we add 1 to this maximum height to calculate the new height of the node
    node.height = Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
  }

  _getNodeHeight(node: Node<T> | null) {
    // Check if the node is null
    // This is important because we may call this method on a leaf node's child, which is null
    if (!node) {
      // If the node is null, return -1, as by convention, the height of a null node is considered -1
      return -1;
    }
    // If the node is not null, return its height property
    // The height of a node is stored in its 'height' property in our AVL Tree implementation
    return node.height;
  }

  _getBalanceFactor(node: Node<T>) {
    // Get the height of the left subtree of the given node
    // We use the '_getNodeHeight' method, which takes a node as an argument and returns its height
    // If the left child of the node is null, '_getNodeHeight' returns -1
    const leftSubtreeHeight = this._getNodeHeight(node.left);

    // Similarly, get the height of the right subtree of the given node
    const rightSubtreeHeight = this._getNodeHeight(node.right);

    // The balance factor of a node in an AVL tree is the difference between the height of its left subtree and the height of its right subtree
    // So, we calculate the balance factor by subtracting the height of the right subtree from the height of the left subtree
    // This can result in a negative number, zero, or a positive number
    // According to the AVL tree property, this value should always be -1, 0, or 1 for all nodes in a balanced AVL tree
    return leftSubtreeHeight - rightSubtreeHeight;
  }

  _leftRotation(node: Node<T>) {
    // A left rotation is performed when the right child of a node has a greater height than its left child
    // We start the rotation by creating a temporary reference to the node's right child because this node will become the new parent node after rotation
    const temp = node.right!;

    // The right child of the current node is then replaced by the left child of the 'temp' node (i.e., the node's right grandchild becomes its new right child)
    node.right = temp.left;

    // If the 'temp' node had a left child, we update its parent to be the 'node'
    if (temp.left) {
      temp.left.parent = node;
    }

    // The 'node' becomes the left child of the 'temp' node
    temp.left = node;

    // The parent of the 'temp' node becomes the parent of the 'node', which maintains the binary search tree property
    temp.parent = node.parent;

    // The parent of the 'node' is updated to be the 'temp' node because 'temp' is the new parent after rotation
    node.parent = temp;

    // If the 'temp' node has a parent (i.e., it's not the root of the tree), we update the parent's child reference to point to 'temp'
    if (temp.parent) {
      if (temp.parent.left === node) {
        temp.parent.left = temp;
      } else if (temp.parent.right === node) {
        temp.parent.right = temp;
      }
    }

    // After the rotation, we update the height of the 'node' and 'temp' nodes because their subtrees might have changed
    this._updateHeight(node);
    this._updateHeight(temp);

    // The 'temp' node is returned because it's the new parent node after the left rotation
    return temp;
  }

  _rightRotation(node: Node<T>) {
    // A right rotation is performed when the left child of a node has a greater height than its right child
    // We start the rotation by creating a temporary reference to the node's left child because this node will become the new parent node after rotation
    const temp = node.left!;

    // The left child of the current node is then replaced by the right child of the 'temp' node (i.e., the node's left grandchild becomes its new left child)
    node.left = temp.right;

    // If the 'temp' node had a right child, we update its parent to be the 'node'
    if (temp.right) {
      temp.right.parent = node;
    }

    // The 'node' becomes the right child of the 'temp' node
    temp.right = node;

    // The parent of the 'temp' node becomes the parent of the 'node', which maintains the binary search tree property
    temp.parent = node.parent;

    // The parent of the 'node' is updated to be the 'temp' node because 'temp' is the new parent after rotation
    node.parent = temp;

    // If the 'temp' node has a parent (i.e., it's not the root of the tree), we update the parent's child reference to point to 'temp'
    if (temp.parent) {
      if (temp.parent.left === node) {
        temp.parent.left = temp;
      } else if (temp.parent.right === node) {
        temp.parent.right = temp;
      }
    }

    // After the rotation, we update the height of the 'node' and 'temp' nodes because their subtrees might have changed
    this._updateHeight(node);
    this._updateHeight(temp);

    // The 'temp' node is returned because it's the new parent node after the right rotation
    return temp;
  }

  _leftRightRotation(node: Node<T>) {
    // A left-right rotation is performed when the right child of the left child of a node has a greater height than its left child
    // This situation creates an imbalance that cannot be fixed by a simple rotation

    // First, a left rotation is performed on the left child of the node
    // The purpose of this step is to convert the imbalance into a form that can be fixed by a simple rotation
    node.left = this._leftRotation(node.left!);

    // After converting the imbalance, we perform a right rotation on the original node
    // This step fixes the imbalance and restores the AVL tree property
    return this._rightRotation(node);
  }

  _rightLeftRotation(node: Node<T>) {
    // A right-left rotation is performed when the left child of the right child of a node has a greater height than its right child
    // This situation creates an imbalance that cannot be fixed by a simple rotation

    // First, a right rotation is performed on the right child of the node
    // The purpose of this step is to convert the imbalance into a form that can be fixed by a simple rotation
    node.right = this._rightRotation(node.right!);

    // After converting the imbalance, we perform a left rotation on the original node
    // This step fixes the imbalance and restores the AVL tree property
    return this._leftRotation(node);
  }

  _findMin(node = this.root) {
    // The _findMin method is used to find the node with the smallest value in a binary search tree.
    // By the properties of a binary search tree, the smallest node is the leftmost node.

    // We start from the given node, defaulting to the root of the tree if no node is provided.
    let currentNode = node;

    // While there is a node to inspect and that node has a left child
    while (currentNode && currentNode.left) {
      // Move to the left child of the current node
      // This is because in a binary search tree, all values in the left subtree are less than the value of the node
      currentNode = currentNode.left;
    }

    // When there are no more left children to move to, we've found the smallest value node
    // Return this node
    return currentNode;
  }

  inOrderTraversal() {
    // Create an empty array to store the traversed nodes
    const temp: T[] = [];
    // Define an inner helper function for the recursive in-order traversal
    const inOrder = (node: Node<T> | null) => {
      // If the node is null, return
      if (!node) {
        return;
      }
      // Recursively call 'inOrder' on the left child
      inOrder(node.left);
      // Push the value of the current node to the temp array
      temp.push(node.value);
      // Recursively call 'inOrder' on the right child
      inOrder(node.right);
    };
    // Call the 'inOrder' function on the root node
    inOrder(this.root);
    // Return the final temp array
    return temp;
  }

  getTreeHeight() {
    return this.root ? this.root.height : 0;
  }
}

export default AVLTree;

export async function createTreeFromArrayHelper<T>(
  arr: T[],
  compareFn: (a: T, b: T) => Promise<number>
) {
  const tree = new AVLTree(compareFn);

  for (const value of arr) {
    await tree.insert(value);
  }

  return tree;
}
