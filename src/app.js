import './styles/style.css';
import { renderGameBoards, renderShips } from './modules/ui/render.js';
import { Player, Computer } from './modules/classes/Player.js';
import { setPlayers } from './modules/data/gameState.js';
import './modules/ui/events.js';

(function () {
  renderGameBoards();

  const player = new Player();
  const computer = new Computer();
  player.placeShipsRandomly();
  computer.placeShipsRandomly();
  renderShips('player-board', player.gameboard.board);
  renderShips('computer-board', computer.gameboard.board);

  setPlayers(player, computer); // 🔥 make them globally accessible
})();
