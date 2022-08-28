import ship from './ship';

const gameBoard = function boardFactory() {

  let body = [];
  const showShips = false;

  for (let i = 0; i < 100; i++) {
    body.push({ isShot: false, hasShip: false });
  }

  function getRandomNumber(number) {
    return Math.floor(Math.random() * number);
  }

  function receiveAttack(shotIndex) {
    body[shotIndex].isShot = true;
  }

  function hasShip(shotIndex) {
    return body[shotIndex].hasShip;
  }

  function areAllShipsSunk() {
    if (!body.find((cell) => cell.hasShip === true)) {
      return false;
    }
    if (body.find((cell) => cell.hasShip === true && cell.isShot === false)) {
      return false;
    }
    return true;
  }

  function isPlaceable(startIndex, shipObject) {
    let testIndex = startIndex;
    if (shipObject.isHorizontal() === false) {
      if ((testIndex + shipObject.body.length * 10) > 99 && shipObject.body.length > 1) {
        return false;
      }
      for (let i = 0; i < shipObject.body.length; i++) {
        if (body[testIndex].hasShip === true) {
          return false;
        }
        testIndex += 10;
      }
    } else {
      let firstIteration = true;
      if ((startIndex + shipObject.body.length) > 99 && shipObject.body.length > 1) {
        return false;
      }
      for (let i = 0; i < shipObject.body.length; i++) {
        if (firstIteration === false) {
          switch (testIndex) {
            case 10:
              return false;
            case 20:
              return false;
            case 30:
              return false;
            case 40:
              return false;
            case 50:
              return false;
            case 60:
              return false;
            case 70:
              return false;
            case 80:
              return false;
            case 90:
              return false;
            default: break;
          }
        }
        firstIteration = false;
        if (body[testIndex].hasShip === true) {
          return false;
        }
        testIndex += 1;
      }
    }
    return true;
  }

  function placeShip(startIndex, ship) {
    const shipLocation = [];
    let index = startIndex;
    if (ship.isHorizontal() === false) {
      for (let i = 0; i < ship.body.length; i++) {
        shipLocation.push(index);
        body[index].hasShip = true;
        index += 10;
      }
    } else {
      for (let i = 0; i < ship.body.length; i++) {
        shipLocation.push(index);
        body[index].hasShip = true;
        index += 1;
      }
    }
    return shipLocation;
  }

  function placeShipsRandomly() {
    body.forEach((cell) => {
      cell.isShot = false;
      cell.hasShip = false;
    });

    const ships = {
        carrier: ship(5),
        battleship: ship(4),
        destroyer: ship(3),
        submarine_1: ship(2),
        submarine_2: ship(2),
        patrolBoat_1: ship(1),
        patrolBoat_2: ship(1),
      };

    const shipNames = Object.keys(ships);
    shipNames.forEach((shipName) => {
        if (getRandomNumber(2) === 0) {
          ships[shipName].setHorizontally();
        }
        let randomStartIndex = getRandomNumber(100);
        while (isPlaceable(randomStartIndex, ships[shipName]) === false) {
          randomStartIndex = getRandomNumber(100);
        }
        placeShip(randomStartIndex, ships[shipName]);
    });
  }

  const allShips = {
    carrier: ship(5),
    battleship: ship(4),
    destroyer: ship(3),
    submarine_1: ship(2),
    submarine_2: ship(2),
    patrolBoat_1: ship(1),
    patrolBoat_2: ship(1),
  };

  let shipNames = Object.keys(allShips);

  function getNextShip() {
    const nextShip = allShips[shipNames[0]];
    return nextShip;
  }

  function removeShipFromArray() {
    shipNames.splice(0, 1);
  }

  function resetBoard() {
    body.forEach((cell) => {
      cell.hasShip = false;
      cell.isShot = false;
    });
    shipNames = Object.keys(allShips);
  }

  function resetBoardHits() {
    body.forEach((cell) => {
      cell.isShot = false;
    });
  }

  return {
    body,
    showShips,
    receiveAttack,
    hasShip,
    areAllShipsSunk,
    isPlaceable,
    placeShip,
    placeShipsRandomly,
    getNextShip,
    removeShipFromArray,
    resetBoard,
    resetBoardHits,
  };
};

export default gameBoard;