import gameBoard from './gameBoard';
import ship from './ship';

describe('gameBoard factory function', () => {
    test('creates a gameBoard with a body length of 100 cells', () => {
        const board = gameBoard();
        expect(board.body.length).toBe(100);
    });

    test('creates a gameBoard with a false boolean constant showShip', () => {
        const board = gameBoard();
        board.showShips = false;
        expect(board.showShips).toBe(false);
    });

    test('showShip should be true when it is made true', () => {
        const board = gameBoard();
        board.showShips = true;
        expect(board.showShips).toBe(true);
    });

    test('has a receiveAttack method when it is called  a cell with a ShotIndex should be shot', () => {
        const board = gameBoard();
        board.receiveAttack(17);
        expect(board.body[17].isShot).toBe(true);
    });

    test('has a hasShip method when it is called before a ship is placed,  a cell with a ShotIndex does NOT have a ship part', () => {  
        const board = gameBoard();
        board.hasShip(76)
        expect(board.body[76].hasShip).toBe(false);
    });

    test('has a hasShip method when it is called after a ship is placed,  a cell with a ShotIndex has a ship part', () => {  
        const board = gameBoard();
        const newShip = ship(3);
        const shipArray = board.placeShip(2, newShip);
        expect(board.hasShip(shipArray[0])).toBe(true);
    });

    test('has a areAllShipsSunk method when it is called before a ship is placed, should return false', () => {
        const board = gameBoard();
        expect(board.areAllShipsSunk()).toBe(false);
      });

    test('has a areAllShipsSunk method when it is called, should return false if all the ships have NOT sunk', () => {
        const board = gameBoard();
        const newShip = ship(2);
        board.placeShip(18, newShip);
        board.receiveAttack(18);
        expect(board.areAllShipsSunk()).toBe(false);
    });

    test('has a areAllShipsSunk method when it is called, should return true if all the ships have sunk', () => {
        const board = gameBoard();
        const newShip = ship(1);
        board.placeShip(72, newShip);
        board.receiveAttack(72);
        expect(board.areAllShipsSunk()).toBe(true);
    });

    test('has a isPlacable method when it is called before setting a ship, should return true', () => {
        const board = gameBoard();
        const newShip = ship(2);
        expect(board.isPlaceable(13, newShip)).toBe(true);
    });

    test('has a isPlacable method when it is called after making a ship in horizontal direction, should return false', () => {
        const board = gameBoard();
        const newShip = ship(5);
        newShip.setHorizontally();
        expect(board.isPlaceable(8, newShip)).toBe(false);
    })

    test('has a isPlacable method when it is called after setting a ship, should return false', () => {
        const board = gameBoard();
        const newShip = ship(2);
        board.placeShip(7, newShip);
        expect(board.isPlaceable(7, newShip)).toBe(false);
    });

    test('has a placeShip method when it is called, should return array of the ship location in vertical direction(initially assigned)', () => {
        const board = gameBoard();
        const newShip = ship(4);
        expect(board.placeShip(7, newShip)).toEqual([7, 17, 27, 37]);
    });

    test('has a placeShip method when it is called after setting horizontal, should return array of the ship location in horizontal direction', () => {
        const board = gameBoard();
        const newShip = ship(5);
        newShip.setHorizontally();
        expect(board.placeShip(81, newShip)).toEqual([81, 82, 83, 84, 85]);
    });
});