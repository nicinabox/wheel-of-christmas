import { GameStatus } from "store/reducers/currentGame"

export const SET_GAME_STATE = 'SET_GAME_STATE'
export const SET_GAME_STATUS = 'SET_GAME_STATUS'

export function setGameState(gameId: number, roundIndex: number) {
  return {
    type: SET_GAME_STATE,
    gameId,
    roundIndex
  }
}

export function setGameStatus(status: GameStatus) {
  return {
    type: SET_GAME_STATUS,
    status,
  }
}
