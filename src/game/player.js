const Gameboard = require('./gameboard.js');
const Ship = require('./ship.js');

class Player {
  constructor() {
    this.board = new Gameboard();
  }

  attack(player, coord) {
    if(!player.board.validAttack(...coord)) return false;

    player.board.receiveAttack(...coord);
    return true;
  }

  randomAttack(player) {
    let row, col;

    do {
      row = Math.floor(Math.random() * Math.floor(10));
      col = Math.floor(Math.random() * Math.floor(10));
    } while (!player.board.validAttack(row, col))

    player.board.receiveAttack(row, col);
    return [ row, col ];
  }
  
  randomShips() {
    const shipSizes = [2, 3, 3, 4, 5];

    for (let size of shipSizes) {
      const ship = new Ship(size);
      let row, col, hor;

      do {
        row = Math.floor(Math.random() * Math.floor(10));
        col = Math.floor(Math.random() * Math.floor(10));
        hor = Math.floor(Math.random() * Math.floor(2));
      } while (!this.board.validPlaceShip(ship, [row,col], hor));

      this.board.placeShip(ship, [row,col], hor);
    }
  }
}

module.exports = Player;