const renderGameBoards = () => {
  const gameBoards = document.querySelectorAll('.game-board');
  gameBoards.forEach((gameBoard) => {
    // Select all of the divs with the class grid-item and remove them
    const gridDivs = gameBoard.querySelectorAll('.grid-item');
    gridDivs.forEach((grid) => {
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

export { renderGameBoards, renderShips };
