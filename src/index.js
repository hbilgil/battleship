import './style.css';
import gameBoard from './factories/gameBoard';

const choiceBoard = gameBoard();
const rotateBtn = document.querySelector('[rotate-ship-btn]');
const clearBtn = document.querySelector('[clear-all-btn]');
const shipsLeftCounter = document.querySelector('[value]');
const randomizeBtn = document.querySelector('[randomize-btn]');
const startBtn = document.querySelector('[start-btn]');
const endGameModalBtn = document.querySelector('[end-game-modal-btn]');

function getRandomNumber(number) {
    return Math.floor(Math.random() * number);
}

function renderChoiceBoard(choiceBoard) {
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
      cell.addEventListener('mouseover', startDragShip(cell, choiceBoard, boardNode));
      cell.addEventListener('mouseout', endDragShip(cell, choiceBoard, boardNode));
      cell.addEventListener('click', dropShip(cell, choiceBoard));
    });
}

function startDragShip(cell, choiceBoard, boardNode) {

    let cellIndex = cell.getAttribute('data-id');
    const ship = choiceBoard.getNextShip();
    if (!ship) { return; }
    if (rotateBtn.classList.contains('horizontal')) {
        ship.setHorizontally();
    } else {
        ship.setVertically();
    }
    
    for (let i = 0; i < ship.body.length; i++) {
        const cellNode = boardNode.querySelector(`[data-id='${cellIndex}']`);
        if (!cellNode) return;
        cellNode.classList.add('ship-show');
        if (ship.isHorizontal() === true) {
            cellIndex = Number(cellIndex) + 1;
            if (cellIndex === 10 || cellIndex === 20 || cellIndex === 30
              || cellIndex === 40 || cellIndex === 50 || cellIndex === 60
              || cellIndex === 70 || cellIndex === 80 || cellIndex === 90) {
              return;
            }
        } else {
            cellIndex = Number(cellIndex) + 10;
        }
    }
}

function endDragShip(cell, choiceBoard, boardNode) {

    let cellIndex = cell.getAttribute('data-id');
    const ship = choiceBoard.getNextShip();
    if (!ship) { return; }
    if (rotateBtn.classList.contains('horizontal')) {
        ship.setHorizontally();
    } else {
        ship.setVertically();
    }
    
    for (let i = 0; i < ship.body.length; i++) {
        const cellNode = boardNode.querySelector(`[data-id='${cellIndex}']`);
        if (!cellNode) return;
        cellNode.classList.remove('ship-show');
        if (ship.isHorizontal() === true) {
            cellIndex = Number(cellIndex) + 1;
            if (cellIndex === 10 || cellIndex === 20 || cellIndex === 30
              || cellIndex === 40 || cellIndex === 50 || cellIndex === 60
              || cellIndex === 70 || cellIndex === 80 || cellIndex === 90) {
              return;
            }
        } else {
            cellIndex = Number(cellIndex) + 10;
        }
    }
}

function dropShip(cell, choiceBoard) {

    let cellIndex = Number(cell.getAttribute('data-id')); //use Number method as cellIndex will be used as number in other functions
    const ship = choiceBoard.getNextShip();

    if (!ship) return;
    if (rotateBtn.classList.contains('horizontal')) {
      ship.setHorizontally();
    } else {
      ship.setVertically();
    }
    if (choiceBoard.isPlaceable(cellIndex, ship) === true) {
      choiceBoard.placeShip(cellIndex, ship);
      renderChoiceBoard(choiceBoard);
      choiceBoard.removeShipFromArray();
      shipsLeftCounter.textContent = Number(shipsLeftCounter.textContent) - 1;
    }
}

function randomAllocation() {
    choiceBoard.placeShipsRandomly();
    shipsLeftCounter.textContent = 0;
    renderChoiceBoard(choiceBoard);
}

function clearChoiceBoard() {
    shipsLeftCounter.textContent = 7;
    choiceBoard.resetBoard();
    renderChoiceBoard(choiceBoard);
}

function initialEvent() {
    initGameBoards(choiceBoard);
    startBtn.addEventListener('click', setGame);
}

function initGameBoards(choiceBoard) {
    const playerBoard = choiceBoard;
    playerBoard.showShips = true;
    const enemyBoard = gameBoard();
    enemyBoard.placeShipsRandomly();
    renderBoard(playerBoard, 'player');
    renderBoard(enemyBoard, 'enemy');
    setAttackEvent('enemy', enemyBoard, playerBoard);
}

function renderBoard(board, boardName) {
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
        if (board.body[i].isShot === true) {
            if (board.body[i].hasShip === true) {
                cell.classList.add('has-ship');
                cell.classList.add('hit');
            }
        cell.classList.add('miss');
        }
    boardNode.appendChild(cell);
    }
}

function setGame() {
    if (Number(shipsLeftCounter.textContent) !== 0) return;
    choiceBoard.resetBoardHits();
    initGameBoards(choiceBoard);
    closeStartGameModal();
}

function closeStartGameModal() {
    const overlayWindow = document.getElementById('overlay-window');
    const startGameModal = document.getElementById('start-game-modal');

    overlayWindow.classList.remove('active');
    startGameModal.classList.remove('active');
}

function openStartGameModal() { //allowing to create grid items (10*10) inside the boards dynamically
    const overlayWindow = document.getElementById('overlay-window');
    const startGameModal = document.getElementById('start-game-modal');

    overlayWindow.classList.add('active');
    startGameModal.classList.add('active');
};

function closeEndGameModal() {
    const overlayWindow = document.getElementById('overlay-window');
    const endGameModal = document.getElementById('end-game-modal');

    overlayWindow.classList.remove('active');
    endGameModal.classList.remove('active');
};

function openEndGameModal() {
    const overlayWindow = document.getElementById('overlay-window');
    const endGameModal = document.getElementById('end-game-modal');

    overlayWindow.classList.add('active');
    endGameModal.classList.add('active');
};

function restartGame() {
    closeEndGameModal();
    openStartGameModal();
    renderChoiceBoard(choiceBoard);
    initialEvent();
}

function setAttackEvent(boardName, enemyBoard, yourBoard) {
    const boardNode = document.getElementById(`board-${boardName}`);
    const cells = boardNode.querySelectorAll('.grid-item');
    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        if(e.currentTarget.classList.contains('miss') === true || e.target.classList.contains('hit')) return;
        const cellIndex = e.currentTarget.getAttribute('data-id');
        enemyBoard.receiveAttack(cellIndex);
        renderBoard(enemyBoard, boardName);
        if (enemyBoard.areAllShipsSunk() === true) {
          declareWinner(boardName);
        }
        if (enemyBoard.hasShip(cellIndex)) { //allowing to hit once again after successful shot
          setAttackEvent(boardName, enemyBoard, yourBoard);
          if (boardName === 'player') {
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
        } if (boardName === 'enemy') {
          setTimeout(() => {
            setAttackEvent('player', yourBoard, enemyBoard);
            const playerBoard = document.getElementById('board-player');
            let randomShotIndex = getRandomNumber(100);
            while (yourBoard.body[randomShotIndex].isShot === true) {
              randomShotIndex = getRandomNumber(100);
            }
            playerBoard.querySelector(`[data-id='${randomShotIndex}']`).click();
          }, 300);
        } else {
          setTimeout(() => {
            setAttackEvent('enemy', yourBoard, enemyBoard);
          }, 200);
        }
      });
    });
}

function declareWinner(boardName) {
    openEndGameModal();
    const endGameMessage = document.querySelector('[end-game-modal-message]');
    if (boardName === 'player') {
        endGameMessage.textContent = 'You Lost!';
      } else {
       endGameMessage.textContent = '🎉 You Won! 🎉';
    }
}

function toggleDirection() {
    rotateBtn.classList.toggle('horizontal');
    if(rotateBtn.textContent === 'Horizontal') {
        rotateBtn.textContent = 'Vertical';
    }
    else if (rotateBtn.textContent === 'Vertical') {
        rotateBtn.textContent = 'Horizontal';
    }
}

restartGame();

/*---EVENT LISTENERS---*/

rotateBtn.addEventListener('click', toggleDirection);
clearBtn.addEventListener('click', clearChoiceBoard);
randomizeBtn.addEventListener('click', randomAllocation);
endGameModalBtn.addEventListener('click', restartGame);