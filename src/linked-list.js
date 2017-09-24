const Node = require('./node');

class LinkedList {
  constructor() {
    this.length = 0;
  }

  append(data) {
    if (this.length === 0) {
      const node = new Node(data);
      this._head = node;
      this._tail = node;
    } else if (this.length === 1) {
      this._tail = new Node(data, this._head);
      this._head.next = this._tail;
    } else {
      const oldTail = this._tail;
      const newTail = new Node(data, oldTail);
      oldTail.next = newTail;
      this._tail = newTail;
    }
    this.length++;

    return this;
  }

  head() {
    return this._head.data;
  }

  tail() {
    return this._tail.data;
  }

  at(index) {
    return findNode(this, index).data;
  }

  insertAt(index, data) {
    findNode(this, index).data = data;

    return this;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this._head = new Node();
    this._tail = new Node();
    this.length = 0;

    return this;
  }

  deleteAt(index) {
    const elem = findNode(this, index),
          prevElem = elem.prev,
          nextElem = elem.next;

    if (prevElem && nextElem) {
      prevElem.next = nextElem;
      nextElem.prev = prevElem;
    }

    return this;
  }

  reverse() {
    let nodes = [],
        current = this._head;

    for (let i = 0; i < this.length; i++) {
      nodes.push(current.data);
      current = current.next;
    }
    nodes.reverse();
    this.clear();
    nodes.forEach(item => this.append(item));

    return this;
  }

  indexOf(data) {
    let current = this._head;
    for (let i = 0; i < this.length; i++) {
      if (current.data === data) return i;
      current = current.next;
    }

    return -1;
  }
}

function findNode(list, index) {
  let current = list._head;
  for (let i = 0; i < index; i++) {
    current = current.next;
  }

  return current;
}

module.exports = LinkedList;
