import API from 'interfaces/api'

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export const RECEIVE_GAME = 'RECEIVE_GAME'

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
