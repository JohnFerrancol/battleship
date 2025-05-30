import closeDialogLogo from '../../assets/logos/close.svg';

const renderGameBoards = () => {
  const gameBoards = document.querySelectorAll('.game-board');
  gameBoards.forEach((gameBoard) => {
    // Select all of the divs with the class grid-item and remove them
    const gridDivs = gameBoard.querySelectorAll('.grid-item');
    gridDivs.forEach((grid) => {
      grid.className = 'grid-item';
      grid.remove();
    });

    const clientWidth = gameBoard.clientWidth;
    const cellSize = clientWidth / 10;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const gridItem = document.createElement('div');
        gridItem.style.width = `${cellSize}px`;
        gridItem.style.height = `${cellSize}px`;
        gridItem.classList.add('grid-item');
        gridItem.dataset.coordinate = `${i}, ${j}`;
        gameBoard.appendChild(gridItem);
      }
    }
  });
};

const renderShips = (boardId, boardArray) => {
  const gameBoard = document.querySelector(`#${boardId}`);
  gameBoard.querySelectorAll('.grid-item').forEach((gridItem) => {
    if (gridItem.classList.contains('grid-item-ship'))
      gridItem.classList.remove('grid-item-ship');
  });
  for (let i = 0; i < boardArray.length; i++) {
    for (let j = 0; j < boardArray.length; j++) {
      if (boardArray[i][j] !== null) {
        const gridItem = gameBoard.querySelector(
          `[data-coordinate="${i}, ${j}"`
        );
        gridItem.classList.add('grid-item-ship');
      }
    }
  }
};

const renderNewMessage = (message) => {
  const gameStatus = document.querySelector('.game-status');
  gameStatus.textContent = message;
};

const renderHitCell = (cellElement, isHit) => {
  if (isHit) cellElement.classList.remove('grid-item-ship');

  const line1 = document.createElement('div');
  line1.id = 'line1';
  line1.classList.add('line', isHit ? 'success' : 'miss');
  const line2 = document.createElement('div');
  line2.id = 'line2';
  line2.classList.add('line', isHit ? 'success' : 'miss');
  cellElement.appendChild(line1);
  cellElement.appendChild(line2);
};

const renderShipsSunk = (shipName, whichPlayer) => {
  const listToChange =
    whichPlayer === 'player'
      ? document.querySelector('#player-ships')
      : document.querySelector('#computer-ships');

  const shipToStrike = listToChange.querySelector(
    `li[data-ship="${shipName}"]`
  );
  shipToStrike.classList.add('sunk');
};

const renderMessageDialog = (message, className) => {
  const messageDialog = document.querySelector('dialog');
  messageDialog.classList.add(className);

  const closeDialogContainer = document.createElement('div');
  closeDialogContainer.classList.add('close-dialog-container');

  const closeDialogIcon = document.createElement('img');
  closeDialogIcon.classList.add('close-dialog-icon');
  closeDialogIcon.src = closeDialogLogo;
  closeDialogIcon.alt = 'Close Dialog';
  closeDialogContainer.appendChild(closeDialogIcon);
  messageDialog.appendChild(closeDialogContainer);

  const dialogMessage = document.createElement('p');
  dialogMessage.textContent = message;
  dialogMessage.classList.add('dialog-message');
  messageDialog.appendChild(dialogMessage);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  messageDialog.appendChild(buttonContainer);

  const utilityButton = document.createElement('button');
  utilityButton.classList.add(
    className === 'alert' ? 'close-button' : 'reset-button'
  );
  utilityButton.textContent = 'OK';
  buttonContainer.appendChild(utilityButton);

  if (className === 'confirm') {
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'Cancel';
    buttonContainer.appendChild(closeButton);
  }
};

export {
  renderGameBoards,
  renderShips,
  renderNewMessage,
  renderHitCell,
  renderShipsSunk,
  renderMessageDialog,
};
