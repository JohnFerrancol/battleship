import { gameState } from '../game-handler/gameState.js';
import { renderHitCell, renderNewMessage } from './render.js';

document.querySelector('#computer-board').addEventListener('click', (event) => {
  if (!gameState.isPlayerTurn) return;
  try {
    const target = event.target;

    const coordinate = target.dataset.coordinate;
    let arr = coordinate.split(',');
    arr = arr.map((coordinate) => Number(coordinate));

    gameState.player.attack(gameState.computer.gameboard, arr);

    renderHitCell(target, target.classList.contains('grid-item-ship'));

    if (gameState.computer.gameboard.hasAllShipsSunk()) {
      renderNewMessage('Player has won! All ships from Computer has sunk!');
      const gridItems = document.querySelectorAll('.grid-item');
      gridItems.forEach((gridItem) => (gridItem.style.pointerEvents = 'none'));
      return;
    }

    target.style.pointerEvents = 'none';
    gameState.isPlayerTurn = false;
    renderNewMessage("Computer's Turn");

    setTimeout(() => {
      const coords = gameState.computer.makeRandomAttack(
        gameState.player.gameboard
      );

      const playerGameboard = document.querySelector('#player-board');
      const gridItem = playerGameboard.querySelector(
        `[data-coordinate="${coords[0]}, ${coords[1]}"`
      );

      renderHitCell(gridItem, gridItem.classList.contains('grid-item-ship'));

      if (gameState.player.gameboard.hasAllShipsSunk()) {
        renderNewMessage('Computer has won! All ships from Player has sunk!');
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(
          (gridItem) => (gridItem.style.pointerEvents = 'none')
        );
        return;
      }

      gameState.isPlayerTurn = true;
      renderNewMessage("Player's Turn");
    }, 500);
  } catch (err) {
    console.log(err.message);
    if (err.message === 'Cell already attacked!') {
      alert('Cell already attacked!');
    }
  }
});
