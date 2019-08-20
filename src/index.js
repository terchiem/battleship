import '../src/styles/style.scss';
import Player from '../src/game/player.js';

const player = new Player();
const computer = new Player();
let gameStarted = true;
let playerTurn = true;

$(document).ready(() => {
  // create board cells
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
      const el = document.createElement('div');
      $(el).attr('data-row', i);
      $(el).attr('data-col', j);
      $(el).data({coord: [i,j]});
      $(el).addClass('cell');
      $('.board').append(el);
    }
  }

  // populate board
  player.board.initTestShips();
  computer.board.initTestShips();
  const playerShips = [];
  const compShips = [];
  player.board.board.map((row, i) => {
    row.map((cell, j) => {
      if(typeof cell === 'object') playerShips.push([i,j]);
    })
  });
  computer.board.board.map((row, i) => {
    row.map((cell, j) => {
      if(typeof cell === 'object') compShips.push(`${i},${j}`);
    })
  });
    playerShips.map((item) => {
    $(`.player [data-row=${item[0]}][data-col=${item[1]}]`).addClass('ship');
  })


  $('.cell').each(function() {
    $(this).html(`<p>${$(this).data('coord')}</p>`);
  })

  $('.computer .cell').each(function() {
    $(this).on('click', () => {
      if (!gameStarted || !playerTurn) return;

      const coord = `${$(this).data('row')},${$(this).data('col')}`;
      if (player.attack(computer, coord.split(','))) {
        if (compShips.includes(coord)) {
          $(this).addClass('hit');
          $('.computer .ships').text(computer.board.shipsLeft());
        } else {
          $(this).addClass('miss');
        }
      } else {
        console.log('invalid');
        return;
      }

      if (gameOver()) {
        console.log('player wins');
        gameStarted = false;
      } else {
        playerTurn = false;
        computerTurn();
      }
    })
  })


})

function gameOver() {
  return player.board.allSunk() || computer.board.allSunk();
}

function computerTurn() {
  const [ row, col ] = computer.randomAttack(player);
  const square = $(`.player [data-row=${row}][data-col=${col}]`)
  
  if (square.hasClass('ship')) {
    square.addClass('hit');
    $('.player .ships').text(player.board.shipsLeft());
  } else {
    square.addClass('miss');
  }

  if (gameOver()) {
    console.log('computer wins');
    gameStarted = false;
  } else {
    playerTurn = true;
  }
}