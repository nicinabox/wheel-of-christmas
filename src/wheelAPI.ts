import axios from 'axios'

export async function fetchGames() {
  return await axios.get('/api/games')
}

export async function createGame() {
  return await axios.post('/api/games')
}

export async function deleteGame(gameId: number) {
  return await axios.post(`/api/games/${gameId}`)
}
