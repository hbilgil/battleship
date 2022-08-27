import './style.css';

function createGrid(value) { //allowing to create grid items (10*10) inside the boards dynamically
    const playerFleetContainer = document.getElementById('board-player');
    const enemyFleetContainer = document.getElementById('board-enemy');
    const choiceBoard = document.getElementById('choice-board');

    let boards = [playerFleetContainer, enemyFleetContainer, choiceBoard];

    boards.forEach((board) => { //array of boards handled one by one
        board.style.setProperty('--grid-rows', value);
        board.style.setProperty('--grid-cols', value);

        for (let i = 0; i < (value * value); i++) {
        let cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.dataset.id = i;
        board.appendChild(cell);
        if (board === enemyFleetContainer){
            cell.addEventListener('click', pushClick);
        }   else if (board === choiceBoard) {
                cell.addEventListener('mouseover', dragShip);
                cell.addEventListener('click', dropShip);
            }
        }
    })
};

function pushClick(e) { //allowing the players to click cells on the enemy board when mouse clicked
    let currentTurn = 'computer';
    const field = e.target; //the exact field element when clicked
    if(field.className.includes('miss') === true) return;
    const currentClass = 'miss';
    placeMark(field, currentClass);//placeMark method is called which is nested in the displayController to place X or O sign
    computerPlay(currentTurn);
    /*if(checkWinner(currentClass)){
      displayController.endGameMessage(false); //endGameMessage method is called which is nested in the displayController with false property if NOT a draw
    } else if(checkDraw()) {
      displayController.endGameMessage(true); //endGameMessage method is called which is nested in the displayController with true property if a draw
    } else {
      displayController.changeMark() //changeMark method is called which is nested in the displayController, if neither a win Nor a draw
      displayController.setBoardHovers() //setBoardHovers method is called which is nested in the displayController, if neither a win Nor a draw
    }*/
}

function placeMark(field, currentClass) { //allowing to manipulate DOM to add sign into the gameBoard
    field.classList.add(currentClass);
}

function computerPlay(currentTurn) {
    if (currentTurn === 'computer') {
    let fieldElements = document.querySelectorAll('#board-player [data-id]');

    const random = Math.floor(Math.random() * fieldElements.length);
    let randomField = fieldElements[random];
    if(randomField.className.includes('miss') === true) {
        computerPlay(currentTurn);
    } else {
        randomField.addEventListener('click', () => {
            randomField.classList.add('miss');
        })
        let result = randomField.click();//randomly chosen field will be clicked by click() method
        currentTurn = 'player';
        return result;
    }
    }
}

function dragShip() {

}

function dropShip() {

}

function openStartGameModal() { //allowing to create grid items (10*10) inside the boards dynamically
    const overlayWindow = document.getElementById('overlay-window');
    const startGameModal = document.getElementById('start-game-modal');

    overlayWindow.classList.add('active');
    startGameModal.classList.add('active');
};

function closeStartGameModal() {
    const overlayWindow = document.getElementById('overlay-window');
    const startGameModal = document.getElementById('start-game-modal');

    overlayWindow.classList.remove('active');
    startGameModal.classList.remove('active');
}

function openEndGameModal() {
    const overlayWindow = document.getElementById('overlay-window');
    const endGameModal = document.getElementById('end-game-modal');

    overlayWindow.classList.add('active');
    endGameModal.classList.add('active');
};

function closeEndGameModal() {
    const overlayWindow = document.getElementById('overlay-window');
    const endGameModal = document.getElementById('end-game-modal');

    overlayWindow.classList.remove('active');
    endGameModal.classList.remove('active');
};

function restartGame() {
    closeEndGameModal();
    makeContentsDefault();
    openStartGameModal();
}

function makeContentsDefault() {
    eraseAllColor();

    const playerFleetContainer = document.getElementById('board-player');
    const enemyFleetContainer = document.getElementById('board-enemy');
    const choiceBoard = document.getElementById('choice-board');

    let boards = [playerFleetContainer, enemyFleetContainer, choiceBoard];

    boards.forEach((board) => { //array of boards handled one by one
        while (board.firstChild) board.removeChild(board.firstChild); //we have to completely delete child nodes created as default for preventing rewriting
    });

    createGrid(10);
}

function eraseAllColor() {

    const playerFleetContainer = document.getElementById('board-player');
    const enemyFleetContainer = document.getElementById('board-enemy');
    const choiceBoard = document.getElementById('choice-board');

    let boards = [playerFleetContainer, enemyFleetContainer, choiceBoard];

    boards.forEach((board) => { //array of boards handled one by one
        let gridPixels = board.querySelectorAll('div');
        gridPixels.forEach(gridPixel => {
            gridPixel.style.backgroundColor = '#ffffff';
            gridPixel.textContent = null;
        });
    })
}

function clearChoiceBoard() {
    
    const shipsLeftCounter = document.querySelector('[value]');
    shipsLeftCounter.textContent = 7;

    const choiceBoard = document.getElementById('choice-board');
    let choiceBoardGridPixels = choiceBoard.querySelectorAll('div');
    choiceBoardGridPixels.forEach(gridPixel => {
        gridPixel.style.backgroundColor = '#ffffff';
        gridPixel.textContent = null;
    });

    while (choiceBoard.firstChild) choiceBoard.removeChild(choiceBoard.firstChild);

    choiceBoard.style.setProperty('--grid-rows', 10);
    choiceBoard.style.setProperty('--grid-cols', 10);

    for (let i = 0; i < (10 * 10); i++) {
    let cell = document.createElement('div');
    cell.classList.add('grid-item');
    cell.dataset.id = i;
    choiceBoard.appendChild(cell);
    cell.addEventListener('mouseover', dragShip);
    cell.addEventListener('click', dropShip);
    }
}

createGrid(10);