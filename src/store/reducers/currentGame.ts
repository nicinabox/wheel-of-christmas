import { AnyAction } from "redux";
import { SET_GAME_STATUS, SET_CURRENT_GAME } from "store/actions/gameActions";
import API from "interfaces/api";

export enum GameStatus {
  Played = 'played',
  Paused = 'paused',
  Active = 'active',
}

export interface CurrentGameState extends API.Game {
  status: GameStatus
}

export const intitialState: CurrentGameState = {
  id: 0,
  puzzles: [],
  status: GameStatus.Active
}

export default function currentGame(state = intitialState, action: AnyAction) {
  switch(action.type) {
    case SET_CURRENT_GAME:
      return {
        ...state,
        ...action.game
      }

    case SET_GAME_STATUS:
      return {
        ...state,
        status: action.status
      }

    default:
      return state
  }
}
