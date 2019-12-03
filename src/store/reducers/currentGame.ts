import { AnyAction } from "redux";
import { SET_GAME_STATE } from "store/actions/gameActions";

export interface CurrentGameState {
  gameId: number | null
  roundIndex: number | null
}

export const intitialState: CurrentGameState = {
  gameId: null,
  roundIndex: null,
}

export default function currentGame(state = intitialState, action: AnyAction) {
  switch(action.type) {
    case SET_GAME_STATE:
      return {
        ...state,
        gameId: action.gameId,
        roundIndex: action.roundIndex,
      }

    default:
      return state
  }
}
