export default class Ship {
  constructor(name, length) {
    if (length <= 0) throw new Error('Ship length must be positive');
    this.name = name;
    this.length = length;
    this.hitCount = 0;
  }

  hit() {
    if (this.hitCount < this.length) {
      this.hitCount++;
    }
  }

  isSunk() {
    return this.length === this.hitCount;
  }
}
