import axios from 'axios'
import { FormValues } from 'components/Editor/FormFields'

export async function fetchGames() {
  return await axios.get('/api/games')
}

export async function createGame() {
  return await axios.post('/api/games')
}

export async function deleteGame(gameId: number) {
  return await axios.post(`/api/games/${gameId}`)
}

export async function getGamePuzzles(gameId: number) {
  return await axios(`/api/games/${gameId}/puzzles`)
}

export async function createGameRound(gameId: number, data: FormValues) {
  return await axios.post(`/api/games/${gameId}/puzzles`, data)
}
