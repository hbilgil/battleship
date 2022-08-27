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

createGrid(10);