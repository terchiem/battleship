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
    for(let squareHit of this.body) {
      if(squareHit === undefined) return false;
    }
    return true;
  }
}

module.exports = Ship;