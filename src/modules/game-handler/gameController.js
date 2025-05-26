import {
  renderShipsSunk,
  renderHitCell,
  renderNewMessage,
  renderShips,
} from '../ui/render.js';

const GameController = () => {
  let player, computer, isPlayerTurn;
  let isGameActive = false;

  const startGame = (playerObject, computerObject) => {
    if (isGameActive) {
      alert(
        'Game is currently ongoing! Reset Game instead if you want to start a new game.'
      );
      return;
    }
    player = playerObject;
    computer = computerObject;
    isPlayerTurn = true;
    isGameActive = true;

    renderNewMessage("Player's Turn");
  };

  const changePlayerBoard = (playerObject) => {
    if (isGameActive) {
      alert('Game is currently ongoing! You cannot change ship positions.');
      return;
    }
    playerObject.reorderShips();
    renderShips('player-board', playerObject.gameboard.board);
  };

  const resetGame = () => {
    if (!isGameActive) {
      alert('Game is has not started!');
      return;
    }

    if (confirm('Are you sure you want to restart the game?')) {
      window.location.reload();
    }
  };

  const playTurn = (coords, targetElement) => {
    if (!isPlayerTurn || !isGameActive) return;

    player.attack(computer.gameboard, coords);

    renderHitCell(
      targetElement,
      targetElement.classList.contains('grid-item-ship')
    );

    for (const shipKey in computer.gameboard.ships) {
      if (computer.gameboard.ships[shipKey].isSunk())
        renderShipsSunk(shipKey, 'computer');
    }

    if (computer.gameboard.hasAllShipsSunk()) {
      renderNewMessage('Player has won! Reset to Play Again!');

      const gridItems = document.querySelectorAll('.grid-item');
      gridItems.forEach((gridItem) => (gridItem.style.pointerEvents = 'none'));
      return;
    }

    isPlayerTurn = false;
    renderNewMessage("Computer's Turn");

    setTimeout(() => {
      const coords = computer.huntTarget(player.gameboard);

      const playerGameboard = document.querySelector('#player-board');
      const gridItem = playerGameboard.querySelector(
        `[data-coordinate="${coords[0]}, ${coords[1]}"`
      );

      renderHitCell(gridItem, gridItem.classList.contains('grid-item-ship'));

      for (const shipKey in player.gameboard.ships) {
        if (player.gameboard.ships[shipKey].isSunk())
          renderShipsSunk(shipKey, 'player');
      }

      if (player.gameboard.hasAllShipsSunk()) {
        renderNewMessage('Computer has won! Reset to Play Again!');
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(
          (gridItem) => (gridItem.style.pointerEvents = 'none')
        );
        return;
      }

      isPlayerTurn = true;
      renderNewMessage("Player's Turn");
    }, 500);
  };

  return { startGame, playTurn, changePlayerBoard, resetGame };
};

export const gameController = GameController();
