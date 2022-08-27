import ship from './ship';

const gameBoard = function boardFactory() {

  let body = [];
  const showShips = false;

  for (let i = 0; i < 100; i += 1) {
    body.push({ isShot: false, hasShip: false });
  }

  function receiveAttack(shotIndex) {
    body[shotIndex].isShot = true;
  }

  function hasShip(shotIndex) {
    return body[shotIndex].hasShip;
  }

  function getRandomNumber(number) {
    return Math.floor(Math.random() * number);
  }

  function allShipsSunk() {
    let shipsSunk = true;
    body.forEach((cell) => {
      if (cell.hasShip === true && cell.isShot === false) {
        shipsSunk = false;
      }
    });
    return shipsSunk;
  }

  function areAllShipsSunk() {
    if (!body.find((x) => x.hasShip === true)) {
      return false;
    }
    if (body.find((x) => x.hasShip === true && x.isShot === false)) {
      return false;
    }
    return true;
  }

  function isPlaceable(startIndex, shipObj) {
    let testIndex = startIndex;
    if (shipObj.isHorizontal() === false) {
      if ((testIndex + shipObj.body.length * 10) > 99 && shipObj.body.length > 1) {
        return false;
      }
      for (let i = 0; i < shipObj.body.length; i++) {
        if (body[testIndex].hasShip === true) {
          return false;
        }
        testIndex += 10;
      }
    } else {
      let firstIteration = true;
      if ((startIndex + shipObj.body.length) > 99 && shipObj.body.length > 1) {
        return false;
      }
      for (let i = 0; i < shipObj.body.length; i++) {
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
    body.forEach((el) => {
      el.isShot = false;
      el.hasShip = false;
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
    body.forEach((el) => {
      el.hasShip = false;
      el.isShot = false;
    });
    shipNames = Object.keys(allShips);
  }

  function resetBoardHits() {
    body.forEach((el) => {
      el.isShot = false;
    });
  }

  return {
    body,
    showShips,
    receiveAttack,
    hasShip,
    allShipsSunk,
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