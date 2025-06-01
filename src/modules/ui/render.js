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
    if (gridItem.classList.contains('grid-item-ship')) {
      gridItem.classList.remove('grid-item-ship');
      gridItem.innerHTML = '';
    }
  });

  for (let i = 0; i < boardArray.length; i++) {
    for (let j = 0; j < boardArray.length; j++) {
      if (boardArray[i][j] !== null) {
        const gridItem = gameBoard.querySelector(
          `[data-coordinate="${i}, ${j}"`
        );

        const shipObject = boardArray[i][j];

        if (
          shipObject.coords[0] === i &&
          shipObject.coords[1] === j &&
          boardId === 'player-mockup-board'
        ) {
          const shipElement = document.createElement('div');
          shipElement.classList.add('dialog-ship-element');
          shipElement.dataset.shipName = shipObject.name;
          shipElement.setAttribute('draggable', 'true');
          gridItem.appendChild(shipElement);

          shipElement.style.flexDirection = shipObject.isHorizontal
            ? 'row'
            : 'column';

          for (let i = 0; i < shipObject.length; i++) {
            const subGridItem = document.createElement('div');
            subGridItem.style.width = `50px`;
            subGridItem.style.height = `50px`;
            subGridItem.classList.add('grid-item', 'grid-item-ship');
            subGridItem.dataset.shipIndex = i;
            shipElement.appendChild(subGridItem);
          }
        }

        gridItem.classList.add('grid-item-ship');
        gridItem.id = shipObject.name;
      }
    }
  }
};

const renderShipsStatus = () => {
  const statusContainers = document.querySelectorAll(`.ships-status-container`);
  statusContainers.forEach((statusContainer) => {
    const shipList = [
      { shipName: 'carrier', length: 5 },
      { shipName: 'battleship', length: 4 },
      { shipName: 'cruiser', length: 3 },
      { shipName: 'submarine', length: 3 },
      { shipName: 'destroyer', length: 2 },
    ];

    for (let ship of shipList) {
      const shipWrapper = document.createElement('div');
      shipWrapper.classList.add('ship-wrapper');
      statusContainer.appendChild(shipWrapper);

      const shipNameDisplay = document.createElement('p');
      shipNameDisplay.classList.add('ship-name');
      shipNameDisplay.textContent = ship.shipName;
      shipWrapper.appendChild(shipNameDisplay);

      const shipStatusElement = document.createElement('div');
      shipStatusElement.classList.add('ship-status-element');
      shipStatusElement.dataset.shipName = ship.shipName;
      shipWrapper.appendChild(shipStatusElement);

      for (let i = 0; i < ship.length; i++) {
        const gridItem = document.createElement('div');
        gridItem.style.width = `20px`;
        gridItem.style.height = `20px`;
        gridItem.classList.add('grid-item', 'grid-item-ship');

        shipStatusElement.appendChild(gridItem);
      }
    }
  });
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
  const statusContainer = document.querySelector(
    `#${whichPlayer}-ships-status`
  );
  console.log(statusContainer);
  const shipElementToSink = statusContainer.querySelector(
    `[data-ship-name="${shipName}"]`
  );
  console.log(shipElementToSink);

  const gridItems = shipElementToSink.querySelectorAll('.grid-item');
  gridItems.forEach((gridItem) => gridItem.classList.add('sunk'));
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

const renderChangeShipsDialog = (playerObject) => {
  const changeShipsDialog = document.querySelector('dialog');
  changeShipsDialog.classList.add('change-ships-dialog');

  const closeDialogContainer = document.createElement('div');
  closeDialogContainer.classList.add('close-dialog-container');

  const closeDialogIcon = document.createElement('img');
  closeDialogIcon.classList.add('close-dialog-icon');
  closeDialogIcon.src = closeDialogLogo;
  closeDialogIcon.alt = 'Close Dialog';
  closeDialogContainer.appendChild(closeDialogIcon);
  changeShipsDialog.appendChild(closeDialogContainer);

  const dialogMessage = document.createElement('h3');
  dialogMessage.textContent = 'Change Ships';
  dialogMessage.classList.add('dialog-title');
  changeShipsDialog.appendChild(dialogMessage);

  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  gameBoard.id = 'player-mockup-board';
  changeShipsDialog.appendChild(gameBoard);
  setTimeout(() => {
    renderGameBoards();
    renderShips('player-mockup-board', playerObject.gameboard.board);
  }, 0);

  const shipsContainer = document.createElement('div');
  shipsContainer.classList.add('ships-container', 'vertical');
  changeShipsDialog.appendChild(shipsContainer);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  changeShipsDialog.appendChild(buttonContainer);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.textContent = 'Done';
  buttonContainer.appendChild(closeButton);

  const reorderButton = document.createElement('button');
  reorderButton.classList.add('reorder-button');
  reorderButton.textContent = 'Randomly Place Ships';
  buttonContainer.appendChild(reorderButton);
};

export {
  renderGameBoards,
  renderShips,
  renderShipsStatus,
  renderNewMessage,
  renderHitCell,
  renderShipsSunk,
  renderMessageDialog,
  renderChangeShipsDialog,
};
