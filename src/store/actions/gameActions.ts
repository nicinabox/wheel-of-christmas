export const SET_GAME_STATE = 'SET_GAME_STATE'

export function setGameState(gameId: number, roundIndex: number) {
  return {
    type: SET_GAME_STATE,
    gameId,
    roundIndex
  }
}
