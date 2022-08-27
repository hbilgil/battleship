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

function dragShip() {

}

function dropShip() {

}

createGrid(10);