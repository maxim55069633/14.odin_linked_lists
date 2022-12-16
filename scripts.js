class Node extends Object {
  constructor(value = null) {
    let starter = new Object();
    starter.value = value;
    starter.nextNode = null;
    return starter;
  }
}

class LinkedList {
  constructor(starter = null) {
    this.starter = starter;
  }

  append(value) {
    if (this.starter == null) {
      this.starter = new Node(value);
      return value;
    }
    let tmp = this.starter; //shallow copy
    let new_starter = tmp;
    while (tmp.nextNode) {
      tmp = tmp.nextNode;
    }
    tmp.nextNode = new Node(value);
    this.starter = new_starter;
    // try to think a way to save the original tmp, not the tail tmp
    return value;
  }

  prepend(value) {
    if (this.starter == null) {
      this.starter = new Node(value);
      return value;
    }
    let new_starter = new Node(value);
    new_starter.nextNode = this.starter;
    this.starter = new_starter;
    return value;
  }

  size() {
    if (this.starter == null) return 0;
    let tmp = this.starter;
    let size = 1;
    while (tmp.nextNode) {
      tmp = tmp.nextNode;
      size += 1;
    }
    return size;
  }

  head() {
    if (this.starter == null) {
      console.error("This linkedlist doesn't contain any node");
      return;
    }
    let tmp = this.starter;
    return tmp;
  }

  tail() {
    if (this.starter == null) {
      console.error("This linkedlist doesn't contain any node");
      return;
    }
    let tmp = this.starter;
    while (tmp.nextNode) {
      tmp = tmp.nextNode;
    }
    return tmp;
  }

  at(index) {
    // index starts from 0
    if (this.starter == null) {
      console.error("This linkedlist doesn't contain any node");
      return;
    }

    const linkedlist_size = this.size();
    if (linkedlist_size <= index || index < 0) {
      console.error("The index is out of the allowed range");
      return;
    }

    let tmp = this.starter;
    for (let i = 0; i < index; i++) {
      tmp = tmp.nextNode;
    }
    return tmp;
  }

  pop() {
    const linkedlist_size = this.size();
    if (linkedlist_size == 0) {
      console.error("Can't pop since the linkedlist is empty.");
      return;
    }
    if (linkedlist_size == 1) {
      let value = this.starter.value;
      this.starter = null;
      return value;
    }
    let tmp = this.starter;
    let new_starter = tmp;
    let prev;
    for (let i = 0; i < linkedlist_size - 1; i++) {
      prev = tmp;
      tmp = tmp.nextNode;
    }
    let value = tmp.value;
    prev.nextNode = null;
    this.starter = new_starter;

    return value;
  }

  contains(value) {
    const linkedlist_size = this.size();
    if (linkedlist_size == 0) {
      return false;
    }
    let tmp = this.starter;
    for (let i = 0; i < linkedlist_size; i++) {
      if (tmp.value == value) return true;
      tmp = tmp.nextNode;
    }
    return false;
  }

  find(value) {
    const linkedlist_size = this.size();
    if (linkedlist_size == 0) {
      return null;
    }
    let tmp = this.starter;
    for (let i = 0; i < linkedlist_size; i++) {
      if (tmp.value == value) return i;
      tmp = tmp.nextNode;
    }
    return null;
  }

  toString() {
    let printout = "";
    let tmp = this.starter;
    while (true) {
      if (tmp != null) {
        printout += `( ${tmp.value} ) -> `;
        tmp = tmp.nextNode;
      } else {
        printout += `null`;
        break;
      }
    }
    console.log(printout);
  }

  insertAt(value, index) {
    const linkedlist_size = this.size();
    if (index > linkedlist_size || index < 0) {
      // when the index equals the linkedlist_size, it indicates we insert a new node after the last one.
      console.error("The index is out of the allowed range");
      return;
    }
    if (index == 0) {
      this.prepend(value);
      return;
    }
    if (index == linkedlist_size) {
      // be careful, the linkedlist_size could be 0, we need to add a return
      this.append(value);
      return;
    }
    let tmp = this.starter;
    let new_starter = tmp;
    let after;
    let prev;
    for (let i = 0; i < index; i++) {
      prev = tmp;
      tmp = tmp.nextNode;
    }
    after = tmp;
    tmp = prev;
    prev.nextNode = new Node(value);
    tmp = tmp.nextNode;
    tmp.nextNode = after;
    this.starter = new_starter;
  }

  removeAt(index) {
    const linkedlist_size = this.size();
    if (index >= linkedlist_size || index < 0) {
      console.error("The index is out of the allowed range");
      return;
    }
    // if the linkedlist is empty, it can't pass the previous if statement

    if (index == linkedlist_size - 1) {
      return this.pop();
    }

    if (index == 0) {
      let value = this.starter.value;
      this.starter = this.starter.nextNode;
      return value;
    }

    let value;

    let tmp = this.starter;
    let new_starter = tmp;
    let after;
    let prev;
    for (let i = 0; i < index; i++) {
      prev = tmp;
      tmp = tmp.nextNode;
    }
    after = tmp.nextNode;
    value = tmp.value;
    prev.nextNode = after;
    this.starter = new_starter;

    return value;
  }
}
