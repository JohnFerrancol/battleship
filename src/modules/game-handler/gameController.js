import { renderHitCell, renderNewMessage } from '../ui/render';

const GameController = () => {
  let player, computer, isPlayerTurn;
  let isGameActive = false;

  const startGame = (playerObject, computerObject) => {
    player = playerObject;
    computer = computerObject;
    isPlayerTurn = true;
    isGameActive = true;

    renderNewMessage("Player's Turn");
  };

  const playTurn = (coords, targetElement) => {
    if (!isPlayerTurn) return;

    player.attack(computer.gameboard, coords);

    renderHitCell(
      targetElement,
      targetElement.classList.contains('grid-item-ship')
    );

    if (computer.gameboard.hasAllShipsSunk()) {
      renderNewMessage('Player has won! All ships from Computer has sunk!');
      const gridItems = document.querySelectorAll('.grid-item');
      gridItems.forEach((gridItem) => (gridItem.style.pointerEvents = 'none'));
      return;
    }

    isPlayerTurn = false;
    renderNewMessage("Computer's Turn");

    setTimeout(() => {
      const coords = computer.makeRandomAttack(player.gameboard);

      const playerGameboard = document.querySelector('#player-board');
      const gridItem = playerGameboard.querySelector(
        `[data-coordinate="${coords[0]}, ${coords[1]}"`
      );

      renderHitCell(gridItem, gridItem.classList.contains('grid-item-ship'));

      if (player.gameboard.hasAllShipsSunk()) {
        renderNewMessage('Computer has won! All ships from Player has sunk!');
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

  return { startGame, playTurn };
};

export const gameController = GameController();
