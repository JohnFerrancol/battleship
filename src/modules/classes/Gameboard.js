import Ship from './Ship.js';

export default class Gameboard {
  constructor() {
    this.size = 10;
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = {
      carrier: new Ship('carrier', 5),
      battleship: new Ship('battleship', 4),
      cruiser: new Ship('cruiser', 3),
      submarine: new Ship('submarine', 2),
      destroyer: new Ship('destroyer', 1),
    };
    this.missedAttacks = new Set([]);
    this.successfulAttacks = new Set([]);
  }

  isValidPlaceForShip(shipLength, coords, isHorizontal) {
    const [x, y] = coords;

    for (let i = 0; i < shipLength; i++) {
      const row = isHorizontal ? y : y + i;
      const col = isHorizontal ? x + i : x;

      if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
        return false;
      } else if (this.board[row][col] !== null) {
        return false;
      }
    }

    return true;
  }

  placeShip(ship, coords, isHorizontal) {
    const [x, y] = coords;

    if (!this.isValidPlaceForShip(ship.length, coords, isHorizontal)) {
      throw new Error('Invalid Ship Placement');
    }

    for (let i = 0; i < ship.length; i++) {
      const row = isHorizontal ? y : y + i;
      const col = isHorizontal ? x + i : x;
      this.board[row][col] = ship;
    }
  }

  randomlyPlaceShips() {
    for (const shipKey in this.ships) {
      const ship = this.ships[shipKey];
      let placed = false;

      while (!placed) {
        const isHorizontal = Math.random() < 0.5;
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const startingCoords = [x, y];

        if (
          this.isValidPlaceForShip(ship.length, startingCoords, isHorizontal)
        ) {
          this.placeShip(ship, [x, y], isHorizontal);
          placed = true;
        }
      }
    }
  }

  receiveAttack(coords) {
    const [x, y] = coords;

    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      throw new Error('Invalid coordinate');
    }

    const coordKey = `${x},${y}`;

    if (
      this.missedAttacks.has(coordKey) ||
      this.successfulAttacks.has(coordKey)
    ) {
      throw new Error('Cell already attacked!');
    } else {
      const cell = this.board[x][y];

      if (cell !== null) {
        if (!cell.isSunk()) {
          cell.hit();
          this.successfulAttacks.add(coordKey);
        }
      } else {
        this.missedAttacks.add(coordKey);
      }
    }
  }

  hasAllShipsSunk() {
    for (const shipKey in this.ships) {
      const ship = this.ships[shipKey];

      if (!ship.isSunk()) return false;
    }

    return true;
  }
}
