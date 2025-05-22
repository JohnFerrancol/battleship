import './styles/style.css';
import { renderGameBoards, renderShips } from './modules/ui/render.js';
import { Player, Computer } from './modules/classes/Player.js';
import './modules/ui/events.js';
import { handleGameStart } from './modules/ui/events.js';

(function () {
  renderGameBoards();

  const player = new Player();
  const computer = new Computer();

  player.placeShipsRandomly();
  computer.placeShipsRandomly();
  renderShips('player-board', player.gameboard.board);
  renderShips('computer-board', computer.gameboard.board);

  handleGameStart(player, computer);
})();
