const test = require('tape');
const Ship = require('../src/game/ship.js');

test('default passing test', (t) => {
  t.equal(1, 1);
  t.end();
})

test('correct ship length with constructor', (t) => {
  const length = 4;
  const ship = new Ship(length);
  t.equal(length, ship.length);
  t.end();
})

test('ship isSunk function returns true when array is filled', (t) => {
  const ship = new Ship(3);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  t.equal(true, ship.isSunk());
  t.end();
})

test('ship isSunk function returns false when array is not filled', (t) => {
  const ship = new Ship(3);
  ship.hit(0);
  ship.hit(1);
  t.equal(false, ship.isSunk());
  t.end();
})