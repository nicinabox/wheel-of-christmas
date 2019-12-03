import { AnyAction } from 'redux'
import API from 'interfaces/api'
import { RECEIVE_GAMES, RECEIVE_GAME } from 'store/actions/gamesActions';

export interface GamesState {
  [id: string]: API.Game
}

export const intitialState: GamesState = {}

export function byId(collection: Array<{ id: number }>) {
  return collection.reduce((acc, item) => ({
    ...acc,
    [item.id]: item
  }), {})
}

export default function games(state = intitialState, action: AnyAction): GamesState {
  switch(action.type) {
    case RECEIVE_GAMES:
      return {
        ...state,
        ...byId(action.games),
      }

    case RECEIVE_GAME:
      return {
        ...state,
        [action.game.id]: action.game,
      }

    default:
      return state
  }
}
