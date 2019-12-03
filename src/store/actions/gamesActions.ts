import API from 'interfaces/api'

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export const RECEIVE_GAME = 'RECEIVE_GAME'
export const REMOVE_GAME = 'REMOVE_GAME'

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

export function removeGame(gameId: number) {
  return {
    type: REMOVE_GAME,
    gameId
  }
}
