const test = require('tape');
const Ship = require('../src/game/ship.js');
const Player = require('../src/game/player.js');

test('Player: attack', (t) => {
  const player1 = new Player();
  const player2 = new Player();
  const ship = new Ship(3);

  player2.board.placeShip(ship, [0,0], true);

  t.equal(true, player1.attack(player2, [0,0]), 'valid move: player1 hits player2 ship');
  t.equal('o', player2.board.get(0,0), 'player2 has correct ship damage from attack');
  t.equal(true, player1.attack(player2, [4,4]), 'valid move: player1 misses player2');
  t.equal('x', player2.board.get(4,4), 'player2 has correct miss on board');
  t.equal(false, player1.attack(player2, [0,0]), 'invalid move: player1 hits player2 twice in same spot');
  t.equal(false, player1.attack(player2, [4,4]), 'invalid move: player1 misses player2 in same spot');
  t.equal(false, player1.attack(player2, [0,0]), 'invalid move: player1 hits out of bound');

  t.end();
})

test('Player: randomAttack', (t) => {
  const player1 = new Player();
  const player2 = new Player();

  for(let i = 0; i< 50; i++) {
    player1.randomAttack(player2);
  }

  let count = 0;
  for(let i = 0; i < player2.board.board.length; i++) {
    for(let j = 0; j < player2.board.board[i].length; j++) {
      if(player2.board.get(i,j) === 'x') count++;
    }
  }

  t.equal(50, count, 'correct number of attacks from loop');

  t.end();
})

test('Player: randomShips', (t) => {
  const player = new Player();

  t.equal(0, player.board.ships.length, 'player starts with no ships');
  player.randomShips();
  t.equal(5, player.board.ships.length, 'player has 5 ships after randomShips');
  t.end();
})