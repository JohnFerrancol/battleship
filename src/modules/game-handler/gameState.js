export const gameState = {
  player: null,
  computer: null,
  isPlayerTurn: true,
};

export function setPlayers(p, c) {
  gameState.player = p;
  gameState.computer = c;
}
