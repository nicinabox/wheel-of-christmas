import { GameStatus } from "store/reducers/currentGame"
import API from "interfaces/api"

export const SET_GAME_STATE = 'SET_GAME_STATE'
export const SET_CURRENT_GAME = 'SET_CURRENT_GAME'
export const SET_GAME_STATUS = 'SET_GAME_STATUS'

export function setGameState(gameId: number, roundIndex: number) {
  return {
    type: SET_GAME_STATE,
    gameId,
    roundIndex
  }
}

export function setCurrentGame(game: API.Game) {
  return {
    type: SET_CURRENT_GAME,
    game,
  }
}

export function setGameStatus(status: GameStatus) {
  return {
    type: SET_GAME_STATUS,
    status,
  }
}
