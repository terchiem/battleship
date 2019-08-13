class Ship {
  constructor(length) {
    this.body = new Array(length);
  }

  get length() { 
    return this.body.length 
  }

  hit(index) {
    this.body[index] = 'x';
  }

  isSunk() {
    for(let index of this.body) {
      if(index === undefined) return false;
    }
    return true;
  }
}

module.exports = Ship;