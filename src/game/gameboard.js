class Gameboard {
  constructor() {
    this.ships = [];
    this.board = new Array(10);
    for(let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(10);
    }

  }

  get(row, col) {
    return this.board[row][col];
  }

  validPlaceShip(ship, coord, horizontal) {
    const [ row, col ] = coord;
    if(horizontal) {
      for(let i = 0; i < ship.length; i++) {
        if(col+i >= 10 || this.board[row][col+i]) return false;
      }
    } else {
      for(let i = 0; i < ship.length; i++) {
        if(row+i >= 10 || this.board[row+i][col]) return false;
      }
    }
    return true;
  }

  placeShip(ship, coord, horizontal) {
    const [ row, col ] = coord;
    this.ships.push(ship);
    const shipIndex = this.ships.length - 1;

    if(horizontal) {
      for(let i = 0; i < ship.length; i++) {
        this.board[row][col+i] = [shipIndex, i];
      }
    } else {
      for(let i = 0; i < ship.length; i++) {
        this.board[row+i][col] = [shipIndex, i];
      }
    }
  }

  validAttack(row, col) {
    const square = this.board[row][col];
    if(square === 'x' || square === 'o' || row >= 10 || col >= 10) {
      return false;
    } 
    return true;
  }

  receiveAttack(row, col) {
    const square = this.board[row][col];
    if(typeof square === "object") {
      const [index, cell] = square;
      this.ships[index].hit(cell);
      this.board[row][col] = 'o';
    } else {
      this.board[row][col] = 'x';
    }
  }

  allSunk() {
    for(let ship of this.ships) {
      if(!ship.isSunk()) return false;
    }
    return true;
  }
}

module.exports = Gameboard;