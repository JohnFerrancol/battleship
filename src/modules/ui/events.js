import { gameController } from '../game-handler/gameController.js';
import {
  renderMessageDialog,
  renderNewMessage,
  renderChangeShipsDialog,
  renderShips,
} from './render.js';

const handleGameStart = (player, computer) => {
  document.querySelector('#start-game').addEventListener('click', () => {
    gameController.startGame(player, computer);
  });
};

const handleNewBoard = (player, computer) => {
  document.querySelector('#new-board').addEventListener('click', () => {
    gameController.changePlayerBoard(player, computer);
  });
};

const showMessageDialog = (message, dialogClassName) => {
  const messageDialog = document.querySelector('dialog');
  messageDialog.innerHTML = '';
  renderMessageDialog(message, dialogClassName);

  messageDialog.showModal();

  closeDialog(messageDialog);

  if (dialogClassName === 'confirm') {
    const resetGameButton = document.querySelector('.reset-button');
    resetGameButton.addEventListener('click', () => {
      window.location.reload();
    });
  }
};

const showChangeShipsDialog = (playerObject) => {
  const changeShispDialog = document.querySelector('dialog');
  changeShispDialog.innerHTML = '';
  renderChangeShipsDialog(playerObject);

  changeShispDialog.showModal();

  closeDialog(changeShispDialog);

  setTimeout(() => {
    const randomlyPlaceShipsButton = document.querySelector('.reorder-button');
    randomlyPlaceShipsButton.addEventListener('click', () => {
      playerObject.reorderShips();
      renderShips('player-mockup-board', playerObject.gameboard.board);
      showChangeShipsDialog(playerObject);
    });

    const shipElements = document.querySelectorAll('.dialog-ship-element');
    shipElements.forEach((shipElement) => {
      const shipElementGrids = shipElement.querySelectorAll('.grid-item');

      shipElementGrids.forEach((shipElementGrid) => {
        shipElementGrid.addEventListener('pointerdown', () => {
          const shipIndex = shipElementGrid.dataset.shipIndex;
          shipElement.dataset.grabbedIndex = shipIndex;
        });
      });

      shipElement.addEventListener('dragstart', (event) => {
        shipElement.style.cursor = 'grabbing';

        event.dataTransfer.setData('shipName', event.target.dataset.shipName);
        event.dataTransfer.setData(
          'grabbedIndex',
          event.target.dataset.grabbedIndex
        );
      });
    });

    const gridItems = document.querySelectorAll(
      '#player-mockup-board > .grid-item'
    );
    gridItems.forEach((gridItem) => {
      gridItem.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      gridItem.addEventListener('drop', (event) => {
        event.preventDefault();
        const shipObjectName = event.dataTransfer.getData('shipName');
        const partIndex = parseInt(event.dataTransfer.getData('grabbedIndex'));

        let shipObject;
        const shipsList = playerObject.gameboard.ships;
        for (const shipKey in shipsList) {
          if (shipsList[shipKey].name === shipObjectName) {
            shipObject = shipsList[shipKey];
            break;
          }
        }

        const coordinate = gridItem.dataset.coordinate;
        const [x, y] = coordinate.split(',').map((coord) => Number(coord));
        const [xNew, yNew] = shipObject.isHorizontal
          ? [x, y - partIndex]
          : [x - partIndex, y];

        if (!shipObject) {
          console.error('Ship not found:', shipObjectName);
          return;
        }

        try {
          if (
            !playerObject.gameboard.isValidPlaceForShip(
              shipObject.length,
              [yNew, xNew],
              shipObject.isHorizontal
            )
          ) {
            alert('Invalid Ship Placement');
            return; // Stop before any mutation
          }
          playerObject.gameboard.removeShip(shipObject);
          playerObject.gameboard.placeShip(
            shipObject,
            [yNew, xNew],
            shipObject.isHorizontal
          );
          renderShips('player-mockup-board', playerObject.gameboard.board);
          showChangeShipsDialog(playerObject);
        } catch (error) {
          alert(error.message, 'alert');
        }
      });
    });
  }, 0);
};

const closeDialog = (dialog) => {
  const closingElements = document.querySelectorAll(
    '.close-dialog-icon, .close-button'
  );

  closingElements.forEach((closingElement) => {
    closingElement.addEventListener('click', () => {
      dialog.close();
      dialog.className = '';
    });
  });
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

export {
  handleGameStart,
  handleNewBoard,
  showMessageDialog,
  showChangeShipsDialog,
};
