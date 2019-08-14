const test = require('tape');
const Gameboard = require('../src/game/gameboard.js');
const Ship = require('../src/game/ship.js');

test('Gameboard: initializes with correct dimensions', (t) => {
  const board = new Gameboard();
  for(let row of board.board) {
    t.equal(10, row.length, 'correct number of columns')
  }
  t.equal(10, board.board.length, 'correct number of rows');
  t.end();
})

test('Gameboard: placeShip', (t) => {
  const board = new Gameboard();
  board.placeShip(new Ship(3), [0, 0], true);
  t.deepEqual([0,0], board.get(0,0), 'board square has ship coordinate');
  t.notDeepEqual([0,3], board.get(0,3), 'board does not have extra coordinates');
  board.placeShip(new Ship(2), [4, 4], false);
  t.deepEqual([1,0], board.get(4,4), 'board square has ship coordinate for vertical 2nd ship');
  t.deepEqual([1,1], board.get(5,4), 'board square has ship coordinate for vertical 2nd ship');
  t.end();
})

test('Gameboard: validPlaceShip', (t) => {
  const board = new Gameboard();
  const ship = new Ship(4);

  t.equal(true, board.validPlaceShip(ship, [4,4], true), 'normal horizontal ship placement');
  t.equal(true, board.validPlaceShip(ship, [0,4], false), 'normal vertical ship placement');
  t.equal(false, board.validPlaceShip(ship, [0,7], true), 'ship placed off grid horizontally');
  t.equal(false, board.validPlaceShip(ship, [7,0], false), 'ship placed off grid vertically');
  t.equal(false, board.validPlaceShip(ship, [10,10], false), 'ship placed completely off grid');

  board.placeShip(ship, [4,4], true);
  
  t.equal(false, board.validPlaceShip(ship, [4,4], true), 'ship placed on top of another ship 1');
  t.equal(false, board.validPlaceShip(ship, [4,2], true), 'ship placed on top of another ship 2');
  t.equal(false, board.validPlaceShip(ship, [2,4], false), 'ship placed on top of another ship 3');

  t.end();
})

test('Gameboard: receiveAttack', (t) => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0,0], true);
  board.receiveAttack(0,0);
  board.receiveAttack(0,1);
  board.receiveAttack(1,2);
  t.equal('o', board.get(0,0), 'correct result in attacked square 1');
  t.equal('o', board.get(0,1), 'correct result in attacked square 2');
  t.equal('x', board.get(1,2), 'correct result in attacked square 3');
  t.deepEqual([0,2], board.get(0,2), 'correct result in unattacked square 1');
  t.equal(undefined, board.get(0,4), 'correct result in unattacked square 2');
  t.end();
})

test('Gameboard: validAttack', (t) => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0,0], true);
  t.equal(true, board.validAttack(0,0), 'valid if on ship square');
  t.equal(true, board.validAttack(1,0), 'valid if on empty square');
  board.receiveAttack(0,0);
  board.receiveAttack(1,0);
  t.equal(false, board.validAttack(0,0), 'invalid if on previously hit square');
  t.equal(false, board.validAttack(1,0), 'invalid if on previously missed square');
  t.end();
})

test('Gameboard: allSunk', (t) => {
  const board = new Gameboard();
  const ship1 = new Ship(2);
  const ship2 = new Ship(3);
  board.placeShip(ship1, [0,0], true);
  board.placeShip(ship2, [1,0], true);

  t.equal(false, board.allSunk(), 'false if all ships are not sunk 1');
  board.receiveAttack(0,0);
  board.receiveAttack(0,1);
  t.equal(false, board.allSunk(), 'false if all ships are not sunk 2');
  board.receiveAttack(1,0);
  board.receiveAttack(1,1);
  t.equal(false, board.allSunk(), 'false if all ships are not sunk 3');
  board.receiveAttack(1,2);
  t.equal(true, board.allSunk(), 'true if all ships are sunk');
  t.end();
})

// test('', (t) => {

//   t.equal(1, 1);
//   t.end();
// })