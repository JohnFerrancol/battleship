import { gameController } from '../game-handler/gameController.js';
import { renderNewMessage } from './render.js';

const handleGameStart = (player, computer) => {
  document.querySelector('#start-game').addEventListener('click', () => {
    gameController.startGame(player, computer);
  });
};

const handleGameStart = (player, computer) => {
  document.querySelector('#start-game').addEventListener('click', () => {
    gameController.startGame(player, computer);
  });
};

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

export { handleGameStart };
