import { Player, Computer } from '../classes/Player.js';
import Gameboard from '../classes/Gameboard.js';
import Ship from '../classes/Ship.js';

describe('Player Class Initialisation Unit tests', () => {
  it('creates and initialises the Player', () => {
    const player = new Player();

    expect(player.gameboard).toEqual(new Gameboard());
  });
});

describe('Player Class Methods Unit tests', () => {
  let player1, player2, testerShip;
  beforeEach(() => {
    player1 = new Player();
    player1.placeShipsRandomly();
    player2 = new Player();
  });

  it('allows the player to attack an enemy board', () => {
    testerShip = new Ship('tester', 3);
    player2.gameboard.placeShip(testerShip, [0, 0], true);
    player1.attack(player2.gameboard, [0, 0]);
    expect(testerShip.hitCount).toBe(1);
  });

  it('allows to show whether a player has lost', () => {
    player2.placeShipsRandomly();
    expect(player2.hasLost()).toBeFalsy();

    for (let i = 0; i < player2.gameboard.size; i++) {
      for (let j = 0; j < player2.gameboard.size; j++) {
        player1.attack(player2.gameboard, [i, j]);
      }
    }

    expect(player2.hasLost()).toBeTruthy();
  });
});

describe('Computer Class Methods Unit tests for making a random attack', () => {
  let player, computer;
  beforeEach(() => {
    player = new Player();
    player.placeShipsRandomly();
    computer = new Computer();
    computer.placeShipsRandomly();
  });

  it('generates a valid random coordinates within bounds', () => {
    for (let i = 0; i < 100; i++) {
      const [x, y] = computer.getRandomCoords();
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(player.gameboard.size);
      expect(y).toBeLessThan(player.gameboard.size);
    }
  });

  it('successfully attacks a random cell', () => {
    for (let i = 0; i < 10; i++) {
      computer.makeRandomAttack(player.gameboard);
    }

    const totalAttacksCount =
      player.gameboard.missedAttacks.size +
      player.gameboard.successfulAttacks.size;

    expect(totalAttacksCount).toBe(10);
  });
});

describe('Computer class Unit tests for the huntTarget method', () => {
  let computer, player, makeRandomAttackSpy, attackSpy;

  beforeEach(() => {
    computer = new Computer();
    player = new Player();
    makeRandomAttackSpy = jest.spyOn(computer, 'makeRandomAttack');
    attackSpy = jest.spyOn(computer, 'attack');
  });

  it('calls makeRandomAttack method when the targetQueue is empty', () => {
    computer.huntTarget(player.gameboard);
    expect(makeRandomAttackSpy).toHaveBeenCalled();
  });

  it('calls attack on the right coordinates from the targetQueue', () => {
    player.gameboard.targetQueue = [[2, 3]];
    computer.huntTarget(player.gameboard);
    expect(attackSpy).toHaveBeenCalledWith(player.gameboard, [2, 3]);
    expect(makeRandomAttackSpy).not.toHaveBeenCalled();
  });
});
