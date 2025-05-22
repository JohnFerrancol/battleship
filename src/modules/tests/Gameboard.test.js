import Gameboard from '../classes/Gameboard.js';
import Ship from '../classes/Ship.js';

let gameboard;

describe('Gameboard Class Initialisation Unit tests', () => {
  it('creates and initialises the Gameboard', () => {
    gameboard = new Gameboard();

    expect(gameboard.size).toBe(10);
    expect(gameboard.ships).toEqual({
      carrier: new Ship('carrier', 5),
      battleship: new Ship('battleship', 4),
      cruiser: new Ship('cruiser', 3),
      submarine: new Ship('submarine', 2),
      destroyer: new Ship('destroyer', 1),
    });
  });
});

describe('Gameboard Class Unit Tests for isValidPlaceForShip method', () => {
  beforeEach(() => {
    gameboard = new Gameboard();
  });
  it('validates a valid ship position', () => {
    const testerShip = new Ship('tester', 3);
    const validateShipPosition = gameboard.isValidPlaceForShip(
      testerShip.length,
      [0, 0],
      true
    );
    expect(validateShipPosition).toBeTruthy();
  });

  it('invalidates a ship position that is out of bounds', () => {
    const testerShip = new Ship('tester', 3);
    const validateShipPosition = gameboard.isValidPlaceForShip(
      testerShip.length,
      [9, 9],
      true
    );
    expect(validateShipPosition).toBeFalsy();
  });
});

describe('Gameboard class Unit Tests for placeShip method', () => {
  beforeEach(() => {
    gameboard = new Gameboard();
  });
  it('places a ship', () => {
    const testerShip = new Ship('tester', 3);
    const validateShipPosition = gameboard.isValidPlaceForShip(
      testerShip.length,
      [0, 0],
      true
    );
    expect(validateShipPosition).toBeTruthy();
    gameboard.placeShip(testerShip, [0, 0], true);
    expect(gameboard.board[0][0]).toBe(testerShip);
    expect(gameboard.board[0][1]).toBe(testerShip);
    expect(gameboard.board[0][2]).toBe(testerShip);
    expect(gameboard.board[0][3]).toBe(null);
  });

  it('invalidates an overlapping ship placement', () => {
    const testerShip1 = new Ship('tester1', 3);
    const testerShip2 = new Ship('tester2', 4);
    const validateShip1Position = gameboard.isValidPlaceForShip(
      testerShip1.length,
      [0, 0],
      true
    );
    expect(validateShip1Position).toBeTruthy();
    gameboard.placeShip(testerShip1, [0, 0], true);

    const validateShip2Position = gameboard.isValidPlaceForShip(
      testerShip2.length,
      [0, 0],
      true
    );

    expect(validateShip2Position).toBeFalsy();
  });
});

describe('Gameboard class Unit tests for randomlyPlaceShips method', () => {
  let flattenedCells;
  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.randomlyPlaceShips();
    flattenedCells = gameboard.board.flat();
  });

  it('places the 5 ships in random locations', () => {
    const totalLengthOfShips = flattenedCells.filter(
      (cell) => cell !== null
    ).length;
    expect(totalLengthOfShips).toBe(15);
    for (const shipKey in gameboard.ships) {
      expect(flattenedCells).toContain(gameboard.ships[shipKey]);
    }
  });

  it('ensures that the length of each ship is correct', () => {
    for (const shipKey in gameboard.ships) {
      const shipCellsCount = flattenedCells.filter(
        (cell) => cell === gameboard.ships[shipKey]
      ).length;
      expect(shipCellsCount).toBe(gameboard.ships[shipKey].length);
    }
  });

  it('ensures that the ships do not overlap with each other', () => {
    const totalShipLength = Object.values(gameboard.ships).reduce(
      (acc, currentShip) => acc + currentShip.length,
      0
    );
    const totalNonNullCells = flattenedCells.filter(
      (cell) => cell !== null
    ).length;

    expect(totalNonNullCells).toBe(totalShipLength);
  });
});

describe('Gameboard class Unit tests for reorderShips method', () => {
  let flattenedCells;
  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.randomlyPlaceShips();
    flattenedCells = gameboard.board.flat();
  });

  test('whether the board has actually changed', () => {
    const oldBoard = gameboard.board.map((row) => [...row]);

    gameboard.reorderShips();

    const newBoard = gameboard.board;

    let isDifferent = false;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (oldBoard[i][j] !== newBoard[i][j]) {
          isDifferent = true;
          break;
        }
      }
      if (isDifferent) break;
    }
    expect(isDifferent).toBe(true);
  });

  it('still places the 5 ships in random locations', () => {
    gameboard.reorderShips();
    flattenedCells = gameboard.board.flat();

    const totalLengthOfShips = flattenedCells.filter(
      (cell) => cell !== null
    ).length;
    expect(totalLengthOfShips).toBe(15);

    for (const shipKey in gameboard.ships) {
      expect(flattenedCells).toContain(gameboard.ships[shipKey]);
    }
  });

  it('still ensures that the length of each ship is correct', () => {
    gameboard.reorderShips();
    flattenedCells = gameboard.board.flat();

    for (const shipKey in gameboard.ships) {
      const shipCellsCount = flattenedCells.filter(
        (cell) => cell === gameboard.ships[shipKey]
      ).length;
      expect(shipCellsCount).toBe(gameboard.ships[shipKey].length);
    }
  });
});

describe('Gameboard class Unit tests for receiveAttack method', () => {
  let testerShip;
  beforeEach(() => {
    gameboard = new Gameboard();
    testerShip = new Ship('tester', 3);
    gameboard.placeShip(testerShip, [0, 0], true);
  });

  it('ensures both missed and successful attacks are both empty when initialised', () => {
    expect(gameboard.missedAttacks).toEqual(new Set());
    expect(gameboard.successfulAttacks).toEqual(new Set());
  });

  it('throws an error for invalid coordinates', () => {
    expect(() => gameboard.receiveAttack([-1, 0])).toThrow(
      'Invalid coordinate'
    );
    expect(() => gameboard.receiveAttack([10, 10])).toThrow(
      'Invalid coordinate'
    );
  });

  it('handles when a ship is attacked', () => {
    gameboard.receiveAttack([0, 0]);
    expect(testerShip.hitCount).toBe(1);
    expect(gameboard.successfulAttacks).toContain('0,0');
  });

  it('handles when there is missed attack', () => {
    gameboard.receiveAttack([5, 5]);
    expect(gameboard.missedAttacks).toContain('5,5');
  });

  it('handles cases when the user wants to attack the same cell', () => {
    gameboard.receiveAttack([0, 1]);
    expect(testerShip.hitCount).toBe(1);
    expect(gameboard.successfulAttacks).toContain('0,1');

    gameboard.receiveAttack([5, 5]);
    expect(gameboard.missedAttacks).toContain('5,5');

    expect(() => gameboard.receiveAttack([0, 1])).toThrow(
      'Cell already attacked!'
    );
    expect(() => gameboard.receiveAttack([5, 5])).toThrow(
      'Cell already attacked!'
    );
  });
});

describe('Gameboard class Unit tests for hasAllShipsSunk method', () => {
  let flattenedCells;
  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.randomlyPlaceShips();
    flattenedCells = gameboard.board.flat();
  });

  it('returns false if not all ships are sunk', () => {
    expect(gameboard.hasAllShipsSunk()).toBeFalsy();
  });

  it('returns true if all ships are sunk', () => {
    for (let i = 0; i < gameboard.size; i++) {
      for (let j = 0; j < gameboard.size; j++) {
        gameboard.receiveAttack([i, j]);
      }
    }

    expect(gameboard.hasAllShipsSunk()).toBeTruthy();
  });
});
