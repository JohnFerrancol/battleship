import Gameboard from './Gameboard.js';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  placeShipsRandomly() {
    this.gameboard.randomlyPlaceShips();
  }

  reorderShips() {
    this.gameboard.reorderShips();
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
    this.targetQueue = [];
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

  huntTarget(enemyGameboard) {
    if (enemyGameboard.targetQueue.length === 0) {
      const randomCoords = this.makeRandomAttack(enemyGameboard);
      return randomCoords;
    } else {
      const targetCoords = enemyGameboard.targetQueue.shift();
      this.attack(enemyGameboard, targetCoords);
      return targetCoords;
    }
  }
}

export { Player, Computer };
