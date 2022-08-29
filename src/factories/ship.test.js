import ship from './ship';

describe('ship factory function', () => {
    test('creates a ship with a body length of "x" should have "x" cells', () => {
        const newShip = ship(5);
        expect(newShip.body.length).toBe(5);
    });

    test('creates a ship with a false boolean variable horizontal', () => {
        const newShip = ship(3);
        expect(newShip.horizontal).toBe(false);
    });

    test('has a isHorizontal method when it is called, returns initial horizontal variable value', () => {
        const newShip = ship(2);
        expect(newShip.isHorizontal()).toBe(false);
    });

    test('has a isHorizontal method when it is called, returns new horizontal variable value when setHorizontally method is called before', () => {
        const newShip = ship(2);
        newShip.setHorizontally();
        expect(newShip.isHorizontal()).toBe(true);
    });

    test('has a isHorizontal method when it is called, returns new horizontal variable value when setVertically method is called before', () => {
        const newShip = ship(2);
        newShip.setVertically();
        expect(newShip.isHorizontal()).toBe(false);
    });

    test('has a hit method when it is called, a part of a ship should be hit', () => {
        const newShip = ship(4);
        newShip.hit(3);
        expect(newShip.body[3]).toBe('hit');
    });

    test('has a isSunk method when called ALL parts of a ship have NOT been sunk, returns false', () => {
        const newShip = ship(3);
        newShip.hit(1);
        expect(newShip.isSunk()).toBe(false);
    });

    test('has a isSunk method when called ALL parts of a ship have already been sunk, returns true', () => {
        const newShip = ship(3);
        newShip.hit(1);
        newShip.hit(0);
        newShip.hit(2);
        expect(newShip.isSunk()).toBe(true);
    });
});