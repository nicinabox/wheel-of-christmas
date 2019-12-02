import API from 'interfaces/api'

export interface GamesState {
  [id: string]: API.Game
}

const RECEIVE_GAMES = 'RECEIVE_GAMES'
const RECEIVE_GAME = 'RECEIVE_GAME'

export const initialGamesState: GamesState = {}

export function receiveGames(games: API.Game[]) {
  return {
    type: RECEIVE_GAMES,
    games,
  }
}

export function receiveGame(game: API.Game) {
  return {
    type: RECEIVE_GAME,
    game,
  }
}

export function byId(collection: Array<{ id: number }>) {
  return collection.reduce((acc, item) => ({
    ...acc,
    [item.id]: item
  }), {})
}

export const gamesReducer = (state: GamesState, action): GamesState => {
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
