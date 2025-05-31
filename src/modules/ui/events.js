import { gameController } from '../game-handler/gameController.js';
import { renderMessageDialog, renderNewMessage } from './render.js';

const handleGameStart = (player, computer) => {
  document.querySelector('#start-game').addEventListener('click', () => {
    gameController.startGame(player, computer);
  });
};

const handleNewBoard = (player) => {
  document.querySelector('#new-board').addEventListener('click', () => {
    gameController.changePlayerBoard(player);
  });
};

const showDialog = (message, dialogClassName) => {
  const messageDialog = document.querySelector('dialog');
  messageDialog.innerHTML = '';
  renderMessageDialog(message, dialogClassName);

  messageDialog.showModal();

  const closingElements = document.querySelectorAll(
    '.close-dialog-icon, .close-button'
  );

  closingElements.forEach((closingElement) => {
    closingElement.addEventListener('click', () => {
      messageDialog.close();
    });
  });

  if (dialogClassName === 'confirm') {
    const resetGameButton = document.querySelector('.reset-button');
    resetGameButton.addEventListener('click', () => {
      window.location.reload();
    });
  }
};

document.querySelector('#reset-game').addEventListener('click', () => {
  gameController.resetGame();
});

document.querySelector('#computer-board').addEventListener('click', (event) => {
  const target = event.target;
  try {
    const coordinate = target.dataset.coordinate;

    const coords = coordinate.split(',').map((coord) => Number(coord));

    target.style.pointEvents = 'none';

    gameController.playTurn(coords, target);
  } catch (err) {
    if (err.message === 'Cell already attacked!') {
      renderNewMessage('You have already attacked this grid! Try Again');
      target.classList.add('invalid-click');

      setTimeout(() => {
        renderNewMessage("Player's Turn");
        target.classList.remove('invalid-click');
      }, 500);
    }
  }
});

export { handleGameStart, handleNewBoard, showDialog };
