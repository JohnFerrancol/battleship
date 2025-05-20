import Ship from '../classes/Ship.js';

describe('Ship Class Unit Tests', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  it('creates and initialises the ship', () => {
    expect(ship.length).toBe(3);
    expect(ship.hitCount).toBe(0);
    expect(ship.isSunk()).toBeFalsy();
  });

  it('does not creates and initialises the ship if length < 0', () => {
    expect(() => new Ship(0)).toThrow('Ship length must be positive');
    expect(() => new Ship(-1)).toThrow('Ship length must be positive');
  });

  it('takes a hit', () => {
    expect(ship.hitCount).toBe(0);
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });

  it('sinks', () => {
    expect(ship.isSunk()).toBeFalsy();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });

  it('does not increase hit count when the ship is sunk', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();

    ship.hit();
    expect(ship.hitCount).toBe(3);
  });
});
