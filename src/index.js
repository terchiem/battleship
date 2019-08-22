import '../src/styles/style.scss';
import Player from '../src/game/player.js';

let player = new Player();
let computer = new Player();
let gameStarted = true;
let playerTurn = true;
let compShips;

$(document).ready(() => {
  $('.results').hide();

  // create board cell elements
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
      const el = $(document.createElement('div'));
      el.attr('data-row', i);
      el.attr('data-col', j);
      el.addClass('cell');
      $('.board').append(el);
    }
  }

  // set up click event
  $('.computer .cell').each(function() {
    $(this).on('click', () => {
      if (!gameStarted || !playerTurn) return;

      const coord = `${$(this).data('row')},${$(this).data('col')}`;
      if (player.attack(computer, coord.split(','))) {
        if (compShips.includes(coord)) {
          $(this).addClass('hit');
          updateShipsLeft();
        } else {
          $(this).addClass('miss');
        }
      } else {
        return;
      }

      if (gameOver()) {
        $('.result-msg').text("You win!");
        $('.results').show();
        gameStarted = false;
      } else {
        playerTurn = false;
        computerTurn();
      }
    })
  })

  // set up button events
  $('.new-game').on('click', newGame);
  $('.close-result').on('click', () => $('.results').hide() );

  newGame();
})

function gameOver() {
  return player.board.allSunk() || computer.board.allSunk();
}

function computerTurn() {
  const [ row, col ] = computer.randomAttack(player);
  const square = $(`.player [data-row=${row}][data-col=${col}]`)
  
  if (square.hasClass('ship')) {
    square.addClass('hit');
    updateShipsLeft();
  } else {
    square.addClass('miss');
  }

  if (gameOver()) {
    $('.result-msg').text("You lose!");
    $('.results').show();
    gameStarted = false;
  } else {
    playerTurn = true;
  }
}

function resetBoard() {
  const cells = $('.cell')
  cells.removeClass('hit');
  cells.removeClass('miss');
  cells.removeClass('ship');
}

function newGame() {
  $('.results').hide();
  resetBoard();
  newComp();
  newPlayer();
  updateShipsLeft();
  gameStarted = true; // debug
  playerTurn = true;
}

function newComp() {
  computer = new Player();
  computer.randomShips();

  compShips = [];
  computer.board.board.map((row, i) => {
    row.map((cell, j) => {
      if(typeof cell === 'object') compShips.push(`${i},${j}`);
    })
  });
}

function newPlayer() {
  // show ship place menu

  player = new Player();
  player.randomShips();   // debug
  placePlayerShips();
}

function placePlayerShips() {
  const playerShips = [];
  player.board.board.map((row, i) => {
    row.map((cell, j) => {
      if(typeof cell === 'object') playerShips.push([i,j]);
    })
  });
  playerShips.map((item) => {
    $(`.player [data-row=${item[0]}][data-col=${item[1]}]`).addClass('ship');
  });
}

function updateShipsLeft() {
  $('.player .ships').text(player.board.shipsLeft());
  $('.computer .ships').text(computer.board.shipsLeft());
}
