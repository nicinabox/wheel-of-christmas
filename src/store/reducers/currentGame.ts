import { AnyAction } from "redux";
import { SET_GAME_STATE, SET_GAME_STATUS } from "store/actions/gameActions";

export enum GameStatus {
  Played = 'played',
  Paused = 'paused',
  Active = 'active',
}

export interface CurrentGameState {
  gameId: number | null
  roundIndex: number | null
  status: GameStatus
}

export const intitialState: CurrentGameState = {
  gameId: null,
  roundIndex: null,
  status: GameStatus.Active,
}

export default function currentGame(state = intitialState, action: AnyAction) {
  switch(action.type) {
    case SET_GAME_STATE:
      return {
        ...state,
        gameId: action.gameId,
        roundIndex: action.roundIndex,
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
