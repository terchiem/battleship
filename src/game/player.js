const Gameboard = require('./gameboard.js');

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
  }
}

module.exports = Player;