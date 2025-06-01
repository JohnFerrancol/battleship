import {
  renderShipsSunk,
  renderHitCell,
  renderNewMessage,
  renderShips,
} from '../ui/render.js';
import { showMessageDialog, showChangeShipsDialog } from '../ui/events.js';

const GameController = () => {
  let player, computer, isPlayerTurn;
  let isGameActive = false;

  const startGame = (playerObject, computerObject) => {
    if (isGameActive) {
      showMessageDialog(
        'Game is currently ongoing! Reset the Game first!',
        'alert'
      );
      return;
    }
    player = playerObject;
    computer = computerObject;
    isPlayerTurn = true;
    isGameActive = true;

    renderNewMessage("Player's Turn");
  };

  const changePlayerBoard = (playerObject, computerObject) => {
    if (isGameActive) {
      showMessageDialog(
        'Game is currently ongoing! You cannot change ship positions!',
        'alert'
      );
      return;
    }

    showChangeShipsDialog(playerObject);
    document
      .querySelector('.change-ships-dialog')
      .addEventListener('close', () => {
        const isBoardIncomplete = (boardArray) => {
          const flattenedCells = boardArray.flat();
          const totalLengthOfShips = flattenedCells.filter(
            (cell) => cell !== null
          ).length;

          return totalLengthOfShips !== 17;
        };
        if (isBoardIncomplete(playerObject.gameboard.board))
          playerObject.reorderShips();
        renderShips('player-board', playerObject.gameboard.board);
        renderShips('computer-board', computerObject.gameboard.board);
      });
  };

  const resetGame = () => {
    if (!isGameActive) {
      showMessageDialog('Game is has not started!', 'alert');
      return;
    }

    showMessageDialog('Are you sure you want to restart the game?', 'confirm');
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
