import Gameboard from './Gameboard.js';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  placeShipsRandomly() {
    this.gameboard.randomlyPlaceShips();
  }

  attack(enemyGameboard, coords) {
    enemyGameboard.receiveAttack(coords);
  }

  hasLost() {
    return this.gameboard.hasAllShipsSunk();
  }
}

class Computer extends Player {
  constructor() {
    super();
  }

  getRandomCoords() {
    return [
      Math.floor(Math.random() * this.gameboard.size),
      Math.floor(Math.random() * this.gameboard.size),
    ];
  }

  makeRandomAttack(enemyGameboard) {
    while (true) {
      const coords = this.getRandomCoords();

      try {
        this.attack(enemyGameboard, coords);
        return coords;
      } catch (err) {
        if (err.message !== 'Cell already attacked!') {
          throw err;
        }
      }
    }
  }
}

export { Player, Computer };
