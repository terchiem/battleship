const test = require('tape');
const Ship = require('../src/game/ship.js');

test('Ship: correct ship length with constructor', (t) => {
  const length = 4;
  const ship = new Ship(length);
  t.equal(length, ship.length, 'ship is created with correct length');
  t.end();
})

test('Ship:  isSunk function returns correct result', (t) => {
  const ship = new Ship(3);
  ship.hit(0);
  ship.hit(1);
  t.equal(false, ship.isSunk(), 'ship is not sunk when not all sections hit');
  ship.hit(2);
  t.equal(true, ship.isSunk(), 'ship is sunk when all sections hit');
  t.end();
})