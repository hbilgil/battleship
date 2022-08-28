import './style.css';
import gameBoard from './factories/gameBoard';

//Global UI Variable Declarations

const choiceBoard = gameBoard();
const shipsLeftCounter = document.querySelector('[value]');

//MODULES

/*---Display Control Module---*/

const displayController = (() => {

//Local UI Variable Declarations

const overlayWindow = document.getElementById('overlay-window');
const startGameModal = document.getElementById('start-game-modal');
const endGameModal = document.getElementById('end-game-modal');
const rotateBtn = document.querySelector('[rotate-ship-btn]');
const clearBtn = document.querySelector('[clear-all-btn]');
const playAgainBtn = document.querySelector('[end-game-modal-btn]');

//Local Module Methods Declarations

const renderChoiceBoard = (choiceBoard) => { //allowing to create choiceBoard cells and their add event listeners
  const boardNode = document.getElementById('choice-board');

  //Removing old cells if it has any
  while (boardNode.firstChild) boardNode.removeChild(boardNode.firstChild); //we have to completely delete child nodes created as default for preventing rewriting
  
  //Setting board row and col numbers
  boardNode.style.setProperty('--grid-rows', 10);
  boardNode.style.setProperty('--grid-cols', 10);

  //Creating and setting board cells
  for (let i = 0; i < choiceBoard.body.length; i++) {
    const cell = document.createElement('div');
    cell.dataset.id = i;
    cell.classList.add('grid-item');
    if (choiceBoard.body[i].hasShip === true) { //checks whether the cell has ship or NOT
      cell.classList.add('has-ship');
    }
    boardNode.appendChild(cell);
  }

  //Setting event listeners for new cells
  const newCells = boardNode.querySelectorAll('.grid-item');
  newCells.forEach((cell) => {
    if (Number(shipsLeftCounter.textContent) === 0) return; //do nothing if all ships placed
    cell.addEventListener('mouseover', () => {
      let cellIndex = cell.getAttribute('data-id');
      const ship = choiceBoard.getNextShip();
      if (!ship) { return };
      if (rotateBtn.classList.contains('horizontal')) {
        ship.setHorizontally();
      } else {
        ship.setVertically();
      }
      for (let i = 0; i < ship.body.length; i++) {
        const cellNode = boardNode.querySelector(`[data-id = '${cellIndex}']`);
        if (!cellNode) { return };
        cellNode.classList.add('ship-show'); //shows ship shadow when mouseover
        if (ship.isHorizontal() === true) {
          cellIndex = Number(cellIndex) + 1; //shows cells that has sheep horizontally
          if (cellIndex === 10 || cellIndex === 20 || cellIndex === 30
            || cellIndex === 40 || cellIndex === 50 || cellIndex === 60
            || cellIndex === 70 || cellIndex === 80 || cellIndex === 90) { //does not allow ships overflow board borders
            return;
          }
        } else {
          cellIndex = Number(cellIndex) + 10;
        }
      }
    });
    cell.addEventListener('mouseout', () => {
      let cellIndex = cell.getAttribute('data-id');
      const ship = choiceBoard.getNextShip();
      if (!ship) { return };
      if (rotateBtn.classList.contains('horizontal')) {
        ship.setHorizontally();
      } else {
        ship.setVertically();
      }
      for (let i = 0; i < ship.body.length; i++) {
        const cellNode = boardNode.querySelector(`[data-id = '${cellIndex}']`);
        if (!cellNode) { return };
        cellNode.classList.remove('ship-show'); //does not show ship shadow when mouseout
        if (ship.isHorizontal() === true) {
          cellIndex = Number(cellIndex) + 1; //shows cells that has sheep horizontally
          if (cellIndex === 10 || cellIndex === 20 || cellIndex === 30
            || cellIndex === 40 || cellIndex === 50 || cellIndex === 60
            || cellIndex === 70 || cellIndex === 80 || cellIndex === 90) { //does not allow ships overflow board borders
            return;
          }
        } else {
          cellIndex = Number(cellIndex) + 10; //shows cells that has sheep vertically
        }
      }
    });
    cell.addEventListener('click', () => {
      let cellIndex = Number(cell.getAttribute('data-id')); //use Number method as cellIndex will be used as number in other methods
      const ship = choiceBoard.getNextShip();
      if (!ship) { return };
      if (rotateBtn.classList.contains('horizontal')) {
        ship.setHorizontally();
      } else {
        ship.setVertically();
      }
      if (choiceBoard.isPlaceable(cellIndex, ship) === true) { //checks available spaces for ships
        choiceBoard.placeShip(cellIndex, ship);
        renderChoiceBoard(choiceBoard);
        choiceBoard.removeShipFromArray();
        shipsLeftCounter.textContent = Number(shipsLeftCounter.textContent) - 1;
      }
    });
  });
};

const clearChoiceBoard = () => { //allowing to delete ships allocated to choiceBoard cells
  shipsLeftCounter.textContent = 7;
  if (rotateBtn.classList.contains('horizontal')) { //ships are always initially set vertical
    rotateBtn.classList.remove('horizontal'); 
    rotateBtn.textContent = 'Horizontal';
  }
  choiceBoard.resetBoard();
  renderChoiceBoard(choiceBoard);
};

const renderGameBoards = (board, boardName) => { //allowing to create gameBoard cells
  const boardNode = document.getElementById(`board-${boardName}`);

  //Removing old cells if it has any
  while (boardNode.firstChild) boardNode.removeChild(boardNode.firstChild); //we have to completely delete child nodes created as default for preventing rewriting 
  
  //Setting board row and col numbers
  boardNode.style.setProperty('--grid-rows', 10);
  boardNode.style.setProperty('--grid-cols', 10);
  
  //Creating and setting board cells
  for (let i = 0; i < board.body.length; i++) {
    const cell = document.createElement('div');
    cell.dataset.id = i;
    cell.classList.add('grid-item');
      if (board.showShips === true) {
        if (board.body[i].hasShip === true) { //checks whether the cell has ship or NOT
          cell.classList.add('has-ship');
        }
      }
      if (board.body[i].isShot === true) { //checks whether the cell has been shot or NOT
        if (board.body[i].hasShip === true) { //checks whether the cell has ship or NOT
          cell.classList.add('has-ship', 'hit'); //cells are colored by red color if any part of a ship is shot
        } else {
          cell.classList.add('miss'); //cells are colored by green color if an empty cell is shot
        }
      }
    boardNode.appendChild(cell);
  }
}

const restartGame = () => { //allowing to start a new game and clear boards
  closeEndGameModal();
  openStartGameModal();
  clearChoiceBoard();
  renderChoiceBoard(choiceBoard);
  gameController.initGameBoards(choiceBoard);
};

const openStartGameModal = () => { //allowing to open start game modal
  overlayWindow.classList.add('active');
  startGameModal.classList.add('active');
};

const closeStartGameModal = () => { //allowing to close start game modal
  overlayWindow.classList.remove('active');
  startGameModal.classList.remove('active');
};

const openEndGameModal = () => { //allowing to open end game modal
  overlayWindow.classList.add('active');
  endGameModal.classList.add('active');
};

const closeEndGameModal = () => { //allowing to close end game modal
  overlayWindow.classList.remove('active');
  endGameModal.classList.remove('active');
};

const toggleDirection = () => { //allowing to change direction of ships between vertical and horizontal
  rotateBtn.classList.toggle('horizontal');
  if(rotateBtn.textContent === 'Horizontal') {
    rotateBtn.textContent = 'Vertical';
  } else if (rotateBtn.textContent === 'Vertical') {
    rotateBtn.textContent = 'Horizontal';
  }
};

/*---Local Event Listeners---*/

rotateBtn.addEventListener('click', toggleDirection);
clearBtn.addEventListener('click', clearChoiceBoard);
playAgainBtn.addEventListener('click', restartGame);

return { renderChoiceBoard, renderGameBoards, restartGame, closeStartGameModal, openEndGameModal };

})();


/*---Game Control Module---*/

const gameController = (() => {

//Local UI Variable Declarations

const randomizeBtn = document.querySelector('[randomize-btn]');
const startBtn = document.querySelector('[start-btn]');

//Local Module Methods Declarations

const setGame = () => { //allowing to set ships allocated in choiceBoard into playerBoard
  if (Number(shipsLeftCounter.textContent) !== 0) return;
  choiceBoard.resetBoardHits();
  initGameBoards(choiceBoard);
  displayController.closeStartGameModal();
}

const initGameBoards = (playerBoard) => { //allowing to show ships allocated in playerBoard and randomly place ships in enemyBoard
  const playerBoardObj = playerBoard;
  playerBoardObj.showShips = true; //ships are shown in playerBoard
  const enemyBoard = gameBoard();
  enemyBoard.placeShipsRandomly(); //ships in enemyBoard are allocated randomly
  displayController.renderGameBoards(playerBoardObj, 'player');
  displayController.renderGameBoards(enemyBoard, 'enemy');
  handleAttackEvent('enemy', enemyBoard, playerBoardObj);
}

const handleAttackEvent = (boardName, enemyBoard, yourBoard) => { //allowing to handle clicks in gameBoards to hit ships
  const boardNode = document.getElementById(`board-${boardName}`);
  const cells = boardNode.querySelectorAll('.grid-item');
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if(e.currentTarget.classList.contains('miss') === true || e.target.classList.contains('hit')) return; //does NOT allow multiple clicks to already shot cells
      const cellIndex = e.currentTarget.getAttribute('data-id');
      enemyBoard.receiveAttack(cellIndex); //player starts the game
      displayController.renderGameBoards(enemyBoard, boardName);
      if (enemyBoard.areAllShipsSunk() === true) { //checks whether ALL ships are hit or NOT
        declareWinner(boardName);
      }
      if (enemyBoard.hasShip(cellIndex)) { //allowing to hit once again after successful shot
        handleAttackEvent(boardName, enemyBoard, yourBoard);
        if (boardName === 'player') { //computer's turn
          setTimeout(() => {
            const playerBoard = document.getElementById('board-player');
            let randomShotIndex = getRandomNumber(100);
            while (enemyBoard.body[randomShotIndex].isShot === true) {
              randomShotIndex = getRandomNumber(100);
            }
            playerBoard.querySelector(`[data-id='${randomShotIndex}']`).click();
          }, 300);
        }
        return;
      } 
      if (boardName === 'enemy') { //player's turn
        setTimeout(() => {
          handleAttackEvent('player', yourBoard, enemyBoard);
          const playerBoard = document.getElementById('board-player');
          let randomShotIndex = getRandomNumber(100);
          while (yourBoard.body[randomShotIndex].isShot === true) {
            randomShotIndex = getRandomNumber(100);
          }
          playerBoard.querySelector(`[data-id='${randomShotIndex}']`).click();
        }, 300);
      } else {
        setTimeout(() => { //allowing to hit once again after successful shot by computer
          handleAttackEvent('enemy', yourBoard, enemyBoard);
        }, 200);
      }
    });
  });
}

const declareWinner = (boardName) => { //allowing to show winner
  displayController.openEndGameModal();
  const endGameMessage = document.querySelector('[end-game-modal-message]');
  if (boardName === 'player') { //computer wins
    endGameMessage.textContent = '🙁 You Lost! 🙁';
  } else { //player wins
    endGameMessage.textContent = '🎉 You Won! 🎉';
  }
}

const randomizeChoiceBoardAllocation = () => { //allowing to allocate ships randomly at choiceBoard
  choiceBoard.placeShipsRandomly();
  shipsLeftCounter.textContent = 0;
  displayController.renderChoiceBoard(choiceBoard);
}

const getRandomNumber = (number) => { //allowing to choose a number randomly between 0-99 (data-ids)
  return Math.floor(Math.random() * number);
}

/*---Local Event Listeners---*/

randomizeBtn.addEventListener('click', randomizeChoiceBoardAllocation);
startBtn.addEventListener('click', setGame);

return { initGameBoards };

})();

displayController.restartGame(); //onload function invocation to start the game