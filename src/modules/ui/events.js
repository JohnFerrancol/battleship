import { player, computer } from '../data/gameState.js';

document.querySelector('#computer-board').addEventListener('click', (event) => {
  try {
    const target = event.target;

    const coordinate = target.dataset.coordinate;
    let arr = coordinate.split(',');
    arr = arr.map((coordinate) => Number(coordinate));

    player.attack(computer.gameboard, arr);
    console.log(computer.gameboard.hasAllShipsSunk());

    if (target.classList.contains('grid-item-ship')) {
      target.classList.remove('grid-item-ship');
      const line1 = document.createElement('div');
      line1.id = 'line1';
      line1.classList.add('line', 'success');
      target.appendChild(line1);
      const line2 = document.createElement('div');
      line2.id = 'line2';
      line2.classList.add('line', 'success');
      target.appendChild(line2);
    } else {
      const line1 = document.createElement('div');
      line1.id = 'line1';
      line1.classList.add('line', 'miss');
      target.appendChild(line1);
      const line2 = document.createElement('div');
      line2.id = 'line2';
      line2.classList.add('line', 'miss');
      target.appendChild(line2);
    }

    if (computer.gameboard.hasAllShipsSunk()) {
      document.querySelector('.game-status').textContent =
        'All Ships have sunk for the Computer! Player has won!';
    }
  } catch (err) {
    console.log(err.message);
    if (err.message === 'Cell already attacked!') {
      alert('Cell already attacked!');
    }
  }
});
