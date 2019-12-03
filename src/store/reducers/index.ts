import { combineReducers } from 'redux'
import games, { GamesState } from './games'
import currentGame, { CurrentGameState } from './currentGame'
import currentRound, { CurrentRoundState } from './currentRound'
import currentSound, { CurrentSoundState } from './currentSound'

export type RootState = {
  games: GamesState,
  currentSound: CurrentSoundState,
  currentGame: CurrentGameState,
  currentRound: CurrentRoundState,
}

const reducers = combineReducers({
  games,
  currentGame,
  currentRound,
  currentSound,
})

export default reducers
