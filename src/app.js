import './styles/style.css';
import {
  renderGameBoards,
  renderShips,
  renderNewMessage,
} from './modules/ui/render.js';
import { Player, Computer } from './modules/classes/Player.js';
import { gameController } from './modules/game-handler/gameController.js';
import './modules/ui/events.js';

(function () {
  renderGameBoards();

  const player = new Player();
  const computer = new Computer();
  player.placeShipsRandomly();
  computer.placeShipsRandomly();
  renderShips('player-board', player.gameboard.board);
  renderShips('computer-board', computer.gameboard.board);

  gameController.startGame(player, computer);

  setTimeout(() => {
    renderNewMessage("Player's Turn");
  }, 1000);
})();
